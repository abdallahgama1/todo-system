import { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTask } from "@/context/TaskContext";
import { formatDistanceToNow } from "date-fns";

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
    const { toggleTaskStatus, updateTask, deleteTask } = useTask();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleToggleStatus = async () => {
        await toggleTaskStatus(task.id);
    };

    const handleEdit = async () => {
        if (title.trim() === "") return;

        const success = await updateTask(task.id, {
            title,
            description,
        });

        if (success) {
            setIsEditDialogOpen(false);
        }
    };

    const handleDelete = async () => {
        const success = await deleteTask(task.id);
        if (success) {
            setIsDeleteDialogOpen(false);
        }
    };

    const getTimeAgo = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), {
                addSuffix: true,
            });
        } catch (error) {
            return "some time ago";
        }
    };

    return (
        <>
            <Card
                className={`w-full transition-all duration-200 ${
                    task.completed ? "bg-muted" : ""
                }`}
            >
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id={`task-${task.id}`}
                                checked={task.completed}
                                onCheckedChange={handleToggleStatus}
                                className="mt-1"
                            />
                            <CardTitle
                                className={`text-lg ${
                                    task.completed
                                        ? "line-through text-muted-foreground"
                                        : ""
                                }`}
                            >
                                {task.title}
                            </CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p
                        className={`text-sm ${
                            task.completed ? "text-muted-foreground" : ""
                        }`}
                    >
                        {task.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                        Created {getTimeAgo(task.createdAt)}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditDialogOpen(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        Delete
                    </Button>
                </CardFooter>
            </Card>

            {/* Edit Task Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>
                        Are you sure you want to delete this task? This action
                        cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
