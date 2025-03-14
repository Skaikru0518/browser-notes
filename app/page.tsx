'use client';
import Header from '@/components/header';
import NotesSidebar from '@/components/notes-sidebar';
import { useState } from 'react';
import { Note } from '@/lib/types';
import NoteView from '@/components/note-view';
import NoteEditor from '@/components/note-editor';

export default function Home() {
    const [note, setNote] = useState<Note[]>([]);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // console.log(note);
    console.log(activeNote);
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

    const renderNoteContent = () => {
        if (activeNote && isEditing) {
            return <NoteEditor note={activeNote} />;
        }

        if (activeNote) {
            return <NoteView note={activeNote} />;
        }
        return null;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header onNewNote={createNewNote} />
            <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className=" md:col-span-1">
                    <NotesSidebar notes={note} onSelectNote={selectNote} />
                </div>
                <div className="md:col-span-2">{renderNoteContent()}</div>
            </main>
        </div>
    );
}
