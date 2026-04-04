import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Input, Textarea } from '../components/Input';
import { StickyNote, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

interface Note {
    id: string;
    title: string;
    content: string;
    date: string;
}

export default function NotesApp() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('devverse-notes');
        if (saved) {
            try {
                setNotes(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load notes', e);
            }
        }
    }, []);

    const saveNotes = (updatedNotes: Note[]) => {
        setNotes(updatedNotes);
        localStorage.setItem('devverse-notes', JSON.stringify(updatedNotes));
    };

    const handleSaveNote = () => {
        if (!title.trim() && !content.trim()) return;

        if (editingId) {
            const updatedNotes = notes.map(note =>
                note.id === editingId ? { ...note, title, content, date: new Date().toISOString() } : note
            );
            saveNotes(updatedNotes);
            setEditingId(null);
        } else {
            const newNote: Note = {
                id: Date.now().toString(),
                title: title.trim() || 'Untitled',
                content,
                date: new Date().toISOString()
            };
            saveNotes([newNote, ...notes]);
        }

        setTitle('');
        setContent('');
    };

    const editNote = (note: Note) => {
        setEditingId(note.id);
        setTitle(note.title);
        setContent(note.content);
    };

    const deleteNote = (id: string) => {
        const updatedNotes = notes.filter(n => n.id !== id);
        saveNotes(updatedNotes);
        if (editingId === id) {
            setEditingId(null);
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col space-y-6">
            <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <StickyNote className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Notes App</h1>
                    <p className="text-gray-400 text-sm">Save your ideas and snippets locally</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 p-6 flex flex-col h-[calc(100vh-14rem)]">
                    <h2 className="text-lg font-bold text-white mb-4">{editingId ? 'Edit Note' : 'New Note'}</h2>
                    <div className="space-y-4 flex-1 flex flex-col">
                        <Input
                            placeholder="Note Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Textarea
                            placeholder="Write your note content here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1 resize-none h-full"
                        />
                    </div>
                    <div className="mt-4 flex space-x-3">
                        <Button onClick={handleSaveNote} className="flex-1">
                            {editingId ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Update</> : <><Plus className="w-4 h-4 mr-2" /> Add Note</>}
                        </Button>
                        {editingId && (
                            <Button onClick={() => { setEditingId(null); setTitle(''); setContent(''); }} variant="secondary">
                                Cancel
                            </Button>
                        )}
                    </div>
                </Card>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-14rem)] overflow-y-auto pr-2 custom-scrollbar content-start">
                    {notes.length === 0 ? (
                        <div className="col-span-full h-full flex flex-col items-center justify-center text-gray-500 opacity-50 p-12">
                            <StickyNote className="w-16 h-16 mb-4" />
                            <p>No notes yet. Create your first one!</p>
                        </div>
                    ) : (
                        notes.map((note) => (
                            <Card key={note.id} className="p-5 flex flex-col group h-[250px]">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white truncate pr-4 text-lg">{note.title}</h3>
                                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => editNote(note)} className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => deleteNote(note.id)} className="p-1 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm flex-1 overflow-hidden font-mono whitespace-pre-wrap line-clamp-6">{note.content}</p>
                                <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-500 flex justify-between items-center">
                                    <span>{new Date(note.date).toLocaleDateString()}</span>
                                    <span>{new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
