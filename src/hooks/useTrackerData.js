import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useTrackerData = () => {
  const [data, setData] = useState({
    people: [],
    taskers: [],
    status_definitions: [],
    platforms: [],
    account_statuses: [],
    logs: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const [
        { data: people, error: e1 },
        { data: taskers, error: e2 },
        { data: status_definitions, error: e3 },
        { data: platforms, error: e4 },
        { data: account_statuses, error: e5 }
      ] = await Promise.all([
        supabase.from('people').select('*').order('id'),
        supabase.from('taskers').select('*').order('name'),
        supabase.from('status_definitions').select('*').order('id'),
        supabase.from('platforms').select('*').order('name'),
        supabase.from('account_statuses').select('*')
      ]);
      const err = e1 || e2 || e3 || e4 || e5;
      if (err) throw err;
      setData(prev => ({ ...prev, people, taskers, status_definitions, platforms, account_statuses }));
    } catch (err) {
      setError(err.message);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'account_statuses' }, () => fetchData(true))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'platforms' }, () => fetchData(true))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'taskers' }, () => fetchData(true))
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const addLog = async (action) => {
    const logEntry = { id: Date.now(), action, timestamp: new Date().toISOString() };
    await supabase.from('logs').insert(logEntry);
    setData(prev => ({
      ...prev,
      logs: [logEntry, ...(prev.logs || [])].slice(0, 50)
    }));
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
        const { data: updated, error } = await supabase
          .from('account_statuses').update({ status_id }).eq('id', existing.id).select().single();
        if (error) throw error;
        setData(prev => ({
          ...prev,
          account_statuses: prev.account_statuses.map(s => s.id === updated.id ? updated : s)
        }));
      } else {
        const { data: created, error } = await supabase
          .from('account_statuses')
          .insert({ person_id, platform_id, status_id, tasker_id_1: null, tasker_id_2: null, notes: '' })
          .select().single();
        if (error) throw error;
        setData(prev => ({ ...prev, account_statuses: [...prev.account_statuses, created] }));
      }
      await addLog(`${person} - ${platform}: ${statusLabel}`);
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
    const updatePayload = { [`tasker_id_${index}`]: tasker_id };

    try {
      if (existing) {
        const { data: updated, error } = await supabase
          .from('account_statuses').update(updatePayload).eq('id', existing.id).select().single();
        if (error) throw error;
        setData(prev => ({
          ...prev,
          account_statuses: prev.account_statuses.map(s => s.id === updated.id ? updated : s)
        }));
      } else {
        const payload = { person_id, platform_id, status_id: 1, notes: '', tasker_id_1: null, tasker_id_2: null, ...updatePayload };
        const { data: created, error } = await supabase
          .from('account_statuses').insert(payload).select().single();
        if (error) throw error;
        setData(prev => ({ ...prev, account_statuses: [...prev.account_statuses, created] }));
      }
      await addLog(`${person} - ${platform}: Assigned Tasker ${index} (${tasker})`);
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
        const { data: updated, error } = await supabase
          .from('account_statuses').update({ notes }).eq('id', existing.id).select().single();
        if (error) throw error;
        setData(prev => ({
          ...prev,
          account_statuses: prev.account_statuses.map(s => s.id === updated.id ? updated : s)
        }));
      } else {
        const { data: created, error } = await supabase
          .from('account_statuses')
          .insert({ person_id, platform_id, status_id: 1, notes, tasker_id_1: null, tasker_id_2: null })
          .select().single();
        if (error) throw error;
        setData(prev => ({ ...prev, account_statuses: [...prev.account_statuses, created] }));
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const addPlatform = async (name, url) => {
    try {
      const { data: created, error } = await supabase
        .from('platforms').insert({ name, url }).select().single();
      if (error) throw error;
      setData(prev => ({ ...prev, platforms: [...prev.platforms, created] }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deletePlatform = async (id) => {
    try {
      const { error } = await supabase.from('platforms').delete().eq('id', id);
      if (error) throw error;
      setData(prev => ({ ...prev, platforms: prev.platforms.filter(p => p.id !== id) }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const addTasker = async (name) => {
    try {
      const { data: created, error } = await supabase
        .from('taskers').insert({ name }).select().single();
      if (error) throw error;
      setData(prev => ({ ...prev, taskers: [...prev.taskers, created] }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deleteTasker = async (id) => {
    try {
      const { error } = await supabase.from('taskers').delete().eq('id', id);
      if (error) throw error;
      setData(prev => ({ ...prev, taskers: prev.taskers.filter(t => t.id !== id) }));
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
