import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
    onNewNote: () => void;
}

export default function Header({ onNewNote }: HeaderProps) {
    return (
        <div className="border-b p-4 bg-card">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Browser Notes</h1>
                <Button
                    className="cursor-pointer"
                    size={'sm'}
                    onClick={onNewNote}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New note
                </Button>
            </div>
        </div>
    );
}
