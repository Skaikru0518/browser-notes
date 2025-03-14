import { Note } from '@/lib/types';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import { formatDate } from '@/lib/storage';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface NoteViewProps {
    note: Note;
    onEdit: () => void;
}

export default function NoteView({ note, onEdit }: NoteViewProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {formatDate(note.createdAt)}
                </p>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-350px)]">
                <CardContent>{note.content}</CardContent>
            </ScrollArea>

            <CardFooter className="flex justify-end">
                <Button onClick={onEdit}>Edit note</Button>
            </CardFooter>
        </Card>
    );
}
