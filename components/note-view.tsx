import { Note } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatDate } from '@/lib/storage';

interface NoteViewProps {
    note: Note;
}

export default function NoteView({ note }: NoteViewProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {formatDate(note.createdAt)}
                </p>
            </CardHeader>
            <CardContent>{note.content}</CardContent>
        </Card>
    );
}
