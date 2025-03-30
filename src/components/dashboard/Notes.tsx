import React, { useState, useEffect } from 'react';
import { Save, Trash2, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const saveNote = async () => {
    if (!currentNote) return;

    try {
      if (currentNote.id) {
        const { error } = await supabase
          .from('notes')
          .update({
            title: currentNote.title,
            content: currentNote.content,
          })
          .eq('id', currentNote.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('notes')
          .insert([{
            title: currentNote.title,
            content: currentNote.content,
          }]);

        if (error) throw error;
      }

      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const createNewNote = () => {
    setCurrentNote({
      id: '',
      title: 'New Note',
      content: '',
      created_at: new Date().toISOString(),
    });
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotes(notes.filter(note => note.id !== id));
      if (currentNote?.id === id) {
        setCurrentNote(null);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      {/* Notes List */}
      <div className="col-span-4 terminal-card overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-accent">Notes</h2>
          <button onClick={createNewNote} className="btn btn-primary p-2">
            <Plus size={20} />
          </button>
        </div>
        
        <div className="space-y-2 overflow-y-auto max-h-[calc(100%-4rem)]">
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => setCurrentNote(note)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                currentNote?.id === note.id
                  ? 'bg-accent/20 border border-accent'
                  : 'bg-secondary hover:bg-accent/10 border border-accent/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-accent">{note.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="text-accent/60 hover:text-accent"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="col-span-8 terminal-card">
        {currentNote ? (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                className="text-xl font-bold bg-transparent text-accent focus:outline-none"
                placeholder="Note Title"
              />
              <button
                onClick={saveNote}
                className="btn btn-primary flex items-center gap-2"
              >
                <Save size={18} />
                Save
              </button>
            </div>
            <textarea
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              className="flex-1 bg-secondary rounded-lg p-4 text-gray-300 focus:outline-none resize-none"
              placeholder="Start typing your note..."
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a note or create a new one
          </div>
        )}
      </div>
    </div>
  );
};