import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Input, Modal, Badge, ReminderItem } from '../components';
import {
  getReminders,
  toggleReminderStatus,
  addReminder,
} from '../services/reminderService';
import type { Reminder } from '../types';

export const RemindersPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>(() => getReminders());
  const [filterFilter, setFilterFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [type, setType] = useState<Reminder['type']>('medication');
  const [formError, setFormError] = useState('');

  const handleToggle = (id: string) => {
    const updated = toggleReminderStatus(id);
    setReminders(updated);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter a reminder title.');
      return;
    }

    const updated = addReminder({
      userId: 'elder-user-1',
      title: title.trim(),
      time,
      type,
      repeatDaily: true,
    });

    setReminders(updated);
    setTitle('');
    setTime('10:00 AM');
    setType('medication');
    setFormError('');
    setIsAddModalOpen(false);
  };

  const filteredReminders = reminders.filter((r) => {
    if (filterFilter === 'pending') return !r.completed;
    if (filterFilter === 'completed') return r.completed;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100 font-sans pb-24">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Daily Reminders
            </h1>
            <Badge variant="info">Reminder System</Badge>
          </div>
          <p className="text-lg text-slate-300 font-medium mt-1">
            Configured schedules for medication, water, and activities.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          leftIcon={<Plus className="w-6 h-6" />}
          onClick={() => setIsAddModalOpen(true)}
          className="shrink-0"
        >
          Add Reminder
        </Button>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/80 p-4 border border-slate-700/80 rounded-2xl">
        <div className="flex items-center gap-2">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterFilter(f)}
              className={`px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wide transition-all min-h-[44px] ${
                filterFilter === f
                  ? 'bg-teal-600 text-white border border-teal-500'
                  : 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="text-sm text-slate-300 font-medium">
          {reminders.filter((r) => r.completed).length} of {reminders.length} Done Today
        </div>
      </div>

      {/* Reminder List */}
      <div className="space-y-4">
        {filteredReminders.map((rem) => (
          <ReminderItem
            key={rem.id}
            title={rem.title}
            time={rem.time}
            category={rem.type}
            completed={rem.completed}
            onToggle={() => handleToggle(rem.id)}
          />
        ))}
      </div>

      {/* Add Reminder Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Reminder"
        description="Schedule a friendly daily reminder."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Save Reminder
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Reminder Title"
            placeholder="e.g. Morning Water Glass"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            label="Reminder Time"
            placeholder="e.g. 10:30 AM"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-base font-semibold text-slate-200">
              Reminder Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Reminder['type'])}
              className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-xl border border-slate-700 text-base focus:outline-none focus:ring-4 focus:ring-teal-500/30"
            >
              <option value="medication">Medication Reminder</option>
              <option value="water">Water Reminder</option>
              <option value="family">Family Call Reminder</option>
              <option value="activity">Cognitive Activity</option>
            </select>
          </div>

          {formError && <p className="text-sm font-medium text-rose-400">{formError}</p>}
        </form>
      </Modal>
    </div>
  );
};
