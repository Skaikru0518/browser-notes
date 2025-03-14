'use client';
import Header from '@/components/header';
import NotesSidebar from '@/components/notes-sidebar';
import { useEffect, useState } from 'react';
import { Note } from '@/lib/types';
import NoteView from '@/components/note-view';
import NoteEditor from '@/components/note-editor';
import EmptyState from '@/components/empty-state';
import { loadNotes, saveNotes } from '@/lib/storage';

export default function Home() {
    const [note, setNote] = useState<Note[]>([]);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setNote(loadNotes());
    }, []);

    useEffect(() => {
        saveNotes(note);
    }, [note]);

    console.log(note);

    const createNewNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: 'New note',
            content: '',
            createdAt: Date.now(),
        };
        // console.log(newNote);
        setNote([newNote, ...note]);
        setIsEditing(true);
        setActiveNote(newNote);
    };

    const selectNote = (note: Note) => {
        setActiveNote(note);
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    const saveNote = (updatedNote: Note) => {
        setNote(
            note.map((note) =>
                note.id === updatedNote.id ? updatedNote : note,
            ),
        );
        setIsEditing(false);
        setActiveNote(updatedNote);
    };

    const deleteNote = (id: string) => {
        setNote(note.filter((note) => note.id !== id));
        if (activeNote && activeNote.id === id) {
            setActiveNote(null);
            setIsEditing(false);
        }
    };

    const renderNoteContent = () => {
        if (!activeNote && note.length === 0) {
            return (
                <EmptyState
                    message="Create your first note"
                    buttonText="New Note"
                    onButtonClick={createNewNote}
                />
            );
        }

        if (activeNote && isEditing) {
            return (
                <NoteEditor
                    note={activeNote}
                    onSave={saveNote}
                    onCancel={cancelEdit}
                />
            );
        }

        if (activeNote) {
            return (
                <NoteView note={activeNote} onEdit={() => setIsEditing(true)} />
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header onNewNote={createNewNote} />
            <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                <div className=" md:col-span-1">
                    <NotesSidebar
                        notes={note}
                        onSelectNote={selectNote}
                        createNewNote={createNewNote}
                        onDeleteNote={deleteNote}
                        activeNoteId={activeNote?.id}
                    />
                </div>
                <div className="md:col-span-2">{renderNoteContent()}</div>
            </main>
        </div>
    );
}
