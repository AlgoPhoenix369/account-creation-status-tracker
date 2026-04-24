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

  const updateStatus = async (person_id, platform_id, status_id) => {
    const existing = data.account_statuses.find(
      s => s.person_id === person_id && s.platform_id === platform_id
    );

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
          body: JSON.stringify({ person_id, platform_id, status_id, tasker_id: null, notes: '' })
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

  const updateTasker = async (person_id, platform_id, tasker_id) => {
    const existing = data.account_statuses.find(
      s => s.person_id === person_id && s.platform_id === platform_id
    );

    try {
      if (existing) {
        const response = await fetch(`${API_URL}/account_statuses/${existing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tasker_id })
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
          body: JSON.stringify({ person_id, platform_id, status_id: 1, tasker_id, notes: '' })
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
