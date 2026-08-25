import React, { useState, useEffect } from 'react';
import { Heart, Plus, Search, Calendar, Image as ImageIcon } from 'lucide-react';
import { Button, Card, Input, Modal, Badge } from '../components';
import { getMemories, addMemory } from '../services/memoryService';
import type { Memory } from '../types';

export const MemoriesPage: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setMemories(getMemories());
  }, []);

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      setFormError('Please enter both a title and description.');
      return;
    }

    const created = addMemory({
      userId: 'elder-user-1',
      title: newTitle.trim(),
      description: newDescription.trim(),
    });

    setMemories((prev) => [created, ...prev]);
    setNewTitle('');
    setNewDescription('');
    setFormError('');
    setIsAddModalOpen(false);
  };

  const filteredMemories = memories.filter(
    (m) =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100 font-sans pb-24">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Your Memories
            </h1>
            <Badge variant="info">Memory Assistance</Badge>
          </div>
          <p className="text-lg text-slate-300 font-medium mt-1">
            Cherished family moments, photos, and stories.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          leftIcon={<Plus className="w-6 h-6" />}
          onClick={() => setIsAddModalOpen(true)}
          className="shrink-0"
        >
          Add New Memory
        </Button>
      </header>

      {/* Search Input */}
      <div className="max-w-md">
        <Input
          placeholder="Search memories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="w-5 h-5 text-slate-400" />}
        />
      </div>

      {/* Memories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMemories.map((mem) => (
          <Card
            key={mem.id}
            hoverable
            onClick={() => setSelectedMemory(mem)}
            className="flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-36 bg-gradient-to-br from-indigo-900/40 via-slate-800 to-teal-900/40 rounded-xl border border-slate-700/80 flex items-center justify-center">
                <div className="p-3 bg-slate-900/80 rounded-full border border-teal-500/40 text-teal-300">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-50">{mem.title}</h3>
              <p className="text-base text-slate-300 line-clamp-3 leading-relaxed">
                {mem.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 pt-4 border-t border-slate-700/60 mt-4">
              <Calendar className="w-4 h-4" />
              <span>{mem.createdAt}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* View Memory Detail Modal */}
      {selectedMemory && (
        <Modal
          isOpen={Boolean(selectedMemory)}
          onClose={() => setSelectedMemory(null)}
          title={selectedMemory.title}
          description={`Saved on ${selectedMemory.createdAt}`}
          footer={
            <Button variant="primary" onClick={() => setSelectedMemory(null)}>
              Close Memory
            </Button>
          }
        >
          <div className="space-y-4 text-slate-200">
            <div className="h-48 bg-gradient-to-br from-indigo-900/60 via-slate-800 to-teal-900/60 rounded-2xl border border-slate-700 flex items-center justify-center">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-teal-400 text-teal-300">
                <ImageIcon className="w-12 h-12" />
              </div>
            </div>
            <p className="text-lg leading-relaxed text-slate-100">
              {selectedMemory.description}
            </p>
          </div>
        </Modal>
      )}

      {/* Add Memory Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Memory"
        description="Save a special memory or story for easy viewing."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateMemory}>
              Save Memory
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateMemory} className="space-y-4">
          <Input
            label="Memory Title"
            placeholder="e.g. Birthday with Family"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-base font-semibold text-slate-200">
              Memory Story / Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe this special moment..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 text-slate-100 placeholder-slate-500 rounded-xl border border-slate-700 text-base focus:outline-none focus:ring-4 focus:ring-teal-500/30"
            />
          </div>
          {formError && <p className="text-sm font-medium text-rose-400">{formError}</p>}
        </form>
      </Modal>
    </div>
  );
};
