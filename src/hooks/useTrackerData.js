import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001';

export const useTrackerData = () => {
  const [data, setData] = useState({
    people: [],
    taskers: [],
    status_definitions: [],
    platforms: [],
    account_statuses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [people, taskers, status_definitions, platforms, account_statuses] = await Promise.all([
        fetch(`${API_URL}/people`).then(res => res.json()),
        fetch(`${API_URL}/taskers`).then(res => res.json()),
        fetch(`${API_URL}/status_definitions`).then(res => res.json()),
        fetch(`${API_URL}/platforms`).then(res => res.json()),
        fetch(`${API_URL}/account_statuses`).then(res => res.json())
      ]);
      setData({ people, taskers, status_definitions, platforms, account_statuses });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addLog = async (action) => {
    try {
      const logEntry = {
        id: Date.now(),
        action,
        timestamp: new Date().toISOString()
      };
      await fetch(`${API_URL}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry)
      });
      setData(prev => ({
        ...prev,
        logs: [logEntry, ...(prev.logs || [])].slice(0, 50) // Keep last 50
      }));
    } catch (err) {
      console.error('Logging failed', err);
    }
  };

  const updateStatus = async (person_id, platform_id, status_id) => {
    const existing = data.account_statuses.find(
      s => s.person_id === person_id && s.platform_id === platform_id
    );

    const person = data.people.find(p => p.id === person_id)?.name;
    const platform = data.platforms.find(p => p.id === platform_id)?.name;
    const statusLabel = data.status_definitions.find(d => d.id === status_id)?.label;

    try {
      if (existing) {
        const response = await fetch(`${API_URL}/account_statuses/${existing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status_id })
        });
        const updated = await response.json();
        setData(prev => ({
          ...prev,
          account_statuses: prev.account_statuses.map(s => s.id === updated.id ? updated : s)
        }));
      } else {
        const response = await fetch(`${API_URL}/account_statuses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ person_id, platform_id, status_id, tasker_id_1: null, tasker_id_2: null, notes: '' })
        });
        const created = await response.json();
        setData(prev => ({
          ...prev,
          account_statuses: [...prev.account_statuses, created]
        }));
      }
      
      addLog(`${person} - ${platform}: ${statusLabel}`);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateTasker = async (person_id, platform_id, tasker_id, index) => {
    const existing = data.account_statuses.find(
      s => s.person_id === person_id && s.platform_id === platform_id
    );

    const person = data.people.find(p => p.id === person_id)?.name;
    const platform = data.platforms.find(p => p.id === platform_id)?.name;
    const tasker = data.taskers.find(t => t.id === tasker_id)?.name || 'None';

    const updateData = {};
    updateData[`tasker_id_${index}`] = tasker_id;

    try {
      if (existing) {
        const response = await fetch(`${API_URL}/account_statuses/${existing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData)
        });
        const updated = await response.json();
        setData(prev => ({
          ...prev,
          account_statuses: prev.account_statuses.map(s => s.id === updated.id ? updated : s)
        }));
      } else {
        const payload = { person_id, platform_id, status_id: 1, notes: '', tasker_id_1: null, tasker_id_2: null };
        payload[`tasker_id_${index}`] = tasker_id;
        const response = await fetch(`${API_URL}/account_statuses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const created = await response.json();
        setData(prev => ({
          ...prev,
          account_statuses: [...prev.account_statuses, created]
        }));
      }

      addLog(`${person} - ${platform}: Assigned Tasker ${index} (${tasker})`);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Database error occurred' };
    }
  };

  const updateNote = async (person_id, platform_id, notes) => {
    const existing = data.account_statuses.find(
      s => s.person_id === person_id && s.platform_id === platform_id
    );

    try {
      if (existing) {
        const response = await fetch(`${API_URL}/account_statuses/${existing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes })
        });
        const updated = await response.json();
        setData(prev => ({
          ...prev,
          account_statuses: prev.account_statuses.map(s => s.id === updated.id ? updated : s)
        }));
      } else {
        const response = await fetch(`${API_URL}/account_statuses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ person_id, platform_id, status_id: 1, notes })
        });
        const created = await response.json();
        setData(prev => ({
          ...prev,
          account_statuses: [...prev.account_statuses, created]
        }));
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const addPlatform = async (name, url) => {
    try {
      const response = await fetch(`${API_URL}/platforms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url })
      });
      const created = await response.json();
      setData(prev => ({
        ...prev,
        platforms: [...prev.platforms, created]
      }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deletePlatform = async (id) => {
    try {
      await fetch(`${API_URL}/platforms/${id}`, { method: 'DELETE' });
      setData(prev => ({
        ...prev,
        platforms: prev.platforms.filter(p => p.id !== id)
      }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const addTasker = async (name) => {
    try {
      const response = await fetch(`${API_URL}/taskers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const created = await response.json();
      setData(prev => ({
        ...prev,
        taskers: [...prev.taskers, created]
      }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deleteTasker = async (id) => {
    try {
      await fetch(`${API_URL}/taskers/${id}`, { method: 'DELETE' });
      setData(prev => ({
        ...prev,
        taskers: prev.taskers.filter(t => t.id !== id)
      }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
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
