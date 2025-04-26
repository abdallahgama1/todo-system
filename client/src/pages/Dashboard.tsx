import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { useAuth } from "@/context/AuthContext";
import { useTask } from "@/context/TaskContext";

export default function Dashboard() {
    const { isAuthenticated, user } = useAuth();
    const {
        tasks,
        loading,
        currentPage,
        totalPages,
        statusFilter,
        fetchTasks,
        setPage,
        setFilter,
    } = useTask();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        fetchTasks(currentPage, statusFilter);
    }, [currentPage, statusFilter]);
    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="space-y-6 md:sticky md:top-6">
                            <h1 className="text-3xl font-bold">
                                Hi, {user.name}
                            </h1>
                            <p className="text-muted-foreground">
                                Manage your tasks and stay organized with
                                SmartTodo.
                            </p>

                            <TaskForm />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-2xl font-semibold">
                                Your Tasks
                            </h2>

                            <Select
                                value={statusFilter}
                                onValueChange={(value) => setFilter(value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Tasks
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Incomplete
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <Card
                                        key={i}
                                        className="w-full animate-pulse"
                                    >
                                        <CardContent className="p-6">
                                            <div className="h-4 w-3/4 bg-muted rounded mb-4"></div>
                                            <div className="h-3 w-full bg-muted rounded mb-2"></div>
                                            <div className="h-3 w-4/5 bg-muted rounded"></div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : tasks.length === 0 ? (
                            <Card className="w-full">
                                <CardContent className="p-6 text-center">
                                    <p className="text-muted-foreground">
                                        {statusFilter === "all"
                                            ? "You don't have any tasks yet. Create your first task!"
                                            : statusFilter === "completed"
                                            ? "You don't have any completed tasks."
                                            : "You don't have any incomplete tasks."}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {tasks.length > 0 &&
                                    tasks.map((task) => {
                                        const { _id, ...rest } = task;
                                        return (
                                            <TaskCard
                                                key={_id}
                                                task={{ id: _id, ...rest }}
                                            />
                                        );
                                    })}

                                {totalPages > 1 && (
                                    <Pagination className="mt-8">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        setPage(
                                                            Math.max(
                                                                1,
                                                                currentPage - 1
                                                            )
                                                        )
                                                    }
                                                    disabled={currentPage === 1}
                                                >
                                                    Previous
                                                </Button>
                                            </PaginationItem>

                                            {Array.from({
                                                length: totalPages,
                                            }).map((_, index) => (
                                                <PaginationItem key={index}>
                                                    <Button
                                                        variant={
                                                            currentPage ===
                                                            index + 1
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        size="icon"
                                                        onClick={() =>
                                                            setPage(index + 1)
                                                        }
                                                    >
                                                        {index + 1}
                                                    </Button>
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        setPage(
                                                            Math.min(
                                                                totalPages,
                                                                currentPage + 1
                                                            )
                                                        )
                                                    }
                                                    disabled={
                                                        currentPage ===
                                                        totalPages
                                                    }
                                                >
                                                    Next
                                                </Button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
