import { Note } from './types';

const STORAGE_KEY = 'notes';

export function saveNotes(notes: Note[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function loadNotes(): Note[] {
    if (typeof window === 'undefined') return [];

    const savedNote = localStorage.getItem(STORAGE_KEY);
    if (savedNote) {
        try {
            return JSON.parse(savedNote);
        } catch (error) {
            console.error('Failed to parese notes from localStorage', error);
            return [];
        }
    }
    return [];
}

export function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
