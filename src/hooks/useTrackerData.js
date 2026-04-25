import { useState, useEffect } from 'react';
import initialDb from '../../db.json';

const STORAGE_KEY = 'gateway_data';

const getStoredData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return initialDb;
};

export const useTrackerData = () => {
  const [data, setData] = useState(getStoredData);
  const [loading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const fetchData = () => {
    setData(getStoredData());
  };

  const addLog = (action) => {
    const logEntry = {
      id: Date.now(),
      action,
      timestamp: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      logs: [logEntry, ...(prev.logs || [])].slice(0, 50)
    }));
  };

  const updateStatus = (person_id, platform_id, status_id) => {
    const existing = data.account_statuses.find(
      s => s.person_id === person_id && s.platform_id === platform_id
    );
    const person = data.people.find(p => p.id === person_id)?.name;
    const platform = data.platforms.find(p => p.id === platform_id)?.name;
    const statusLabel = data.status_definitions.find(d => d.id === status_id)?.label;

    if (existing) {
      setData(prev => ({
        ...prev,
        account_statuses: prev.account_statuses.map(s =>
          s.id === existing.id ? { ...s, status_id } : s
        )
      }));
    } else {
      const created = {
        id: Date.now(),
        person_id, platform_id, status_id,
        tasker_id_1: null, tasker_id_2: null, notes: ''
      };
      setData(prev => ({
        ...prev,
        account_statuses: [...prev.account_statuses, created]
      }));
    }

    addLog(`${person} - ${platform}: ${statusLabel}`);
    return true;
  };

  const updateTasker = (person_id, platform_id, tasker_id, index) => {
    const existing = data.account_statuses.find(
      s => s.person_id === person_id && s.platform_id === platform_id
    );
    const person = data.people.find(p => p.id === person_id)?.name;
    const platform = data.platforms.find(p => p.id === platform_id)?.name;
    const tasker = data.taskers.find(t => t.id === tasker_id)?.name || 'None';

    if (existing) {
      setData(prev => ({
        ...prev,
        account_statuses: prev.account_statuses.map(s =>
          s.id === existing.id ? { ...s, [`tasker_id_${index}`]: tasker_id } : s
        )
      }));
    } else {
      const created = {
        id: Date.now(),
        person_id, platform_id, status_id: 1,
        notes: '', tasker_id_1: null, tasker_id_2: null,
        [`tasker_id_${index}`]: tasker_id
      };
      setData(prev => ({
        ...prev,
        account_statuses: [...prev.account_statuses, created]
      }));
    }

    addLog(`${person} - ${platform}: Assigned Tasker ${index} (${tasker})`);
    return { success: true };
  };

  const updateNote = (person_id, platform_id, notes) => {
    const existing = data.account_statuses.find(
      s => s.person_id === person_id && s.platform_id === platform_id
    );

    if (existing) {
      setData(prev => ({
        ...prev,
        account_statuses: prev.account_statuses.map(s =>
          s.id === existing.id ? { ...s, notes } : s
        )
      }));
    } else {
      const created = {
        id: Date.now(),
        person_id, platform_id, status_id: 1, notes,
        tasker_id_1: null, tasker_id_2: null
      };
      setData(prev => ({
        ...prev,
        account_statuses: [...prev.account_statuses, created]
      }));
    }
    return true;
  };

  const addPlatform = (name, url) => {
    const created = { id: Date.now(), name, url };
    setData(prev => ({
      ...prev,
      platforms: [...prev.platforms, created]
    }));
    return true;
  };

  const deletePlatform = (id) => {
    setData(prev => ({
      ...prev,
      platforms: prev.platforms.filter(p => p.id !== id)
    }));
    return true;
  };

  const addTasker = (name) => {
    const created = { id: Date.now(), name };
    setData(prev => ({
      ...prev,
      taskers: [...prev.taskers, created]
    }));
    return true;
  };

  const deleteTasker = (id) => {
    setData(prev => ({
      ...prev,
      taskers: prev.taskers.filter(t => t.id !== id)
    }));
    return true;
  };

  return {
    data,
    loading,
    error,
    updateStatus,
    updateNote,
    updateTasker,
    addPlatform,
    deletePlatform,
    addTasker,
    deleteTasker,
    refresh: fetchData
  };
};
