import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/config/apiConfig";

interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    statusFilter: string;
    fetchTasks: (page: number, status: string) => Promise<void>;
    createTask: (data: {
        title: string;
        description: string;
    }) => Promise<boolean>;
    updateTask: (
        id: string,
        data: { title: string; description: string }
    ) => Promise<boolean>;
    deleteTask: (id: string) => Promise<boolean>;
    toggleTaskStatus: (id: string) => Promise<boolean>;
    setPage: (page: number) => void;
    setFilter: (status: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchTasks = useCallback(async (page: number, status: string) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${API_ENDPOINTS.tasks.list}?page=${page}&status=${status}`,
                { credentials: "include" }
            );
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.error || "Failed to fetch tasks");
            setTasks(data.todos);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(error.message || "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    }, []);

    const setPage = (page: number) => {
        setCurrentPage(page);
        fetchTasks(page, statusFilter);
    };

    const setFilter = (status: string) => {
        setStatusFilter(status);
        setCurrentPage(1);
        fetchTasks(1, status);
    };

    const createTask = async (data: { title: string; description: string }) => {
        try {
            const response = await fetch(API_ENDPOINTS.tasks.create, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const newTask = await response.json();
            if (!response.ok)
                throw new Error(newTask.error || "Failed to create task");

            toast.success("Task created successfully");
            await fetchTasks(currentPage, statusFilter);

            return true;
        } catch (error) {
            toast.error(error.message || "Failed to create task");
            return false;
        }
    };

    const updateTask = async (
        id: string,
        data: { title: string; description: string }
    ) => {
        try {
            const response = await fetch(API_ENDPOINTS.tasks.update(id), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const updatedTask = await response.json();

            if (!response.ok)
                throw new Error(updatedTask.errors || "Failed to update task");

            await fetchTasks(currentPage, statusFilter);
            toast.success("Task updated successfully");
            return true;
        } catch (error) {
            toast.error(error.message || "Failed to update task");
            return false;
        }
    };

    const toggleTaskStatus = async (id: string) => {
        try {
            const response = await fetch(API_ENDPOINTS.tasks.toggle(id), {
                method: "PATCH",
                credentials: "include",
            });

            const updatedTask = await response.json();
            if (!response.ok)
                throw new Error(
                    updatedTask.errors || "Failed to toggle task status"
                );

            await fetchTasks(currentPage, statusFilter);
            toast.success("Task status updated");
            return true;
        } catch (error) {
            toast.error(error.message || "Failed to update task status");
            return false;
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const response = await fetch(API_ENDPOINTS.tasks.delete(id), {
                method: "DELETE",
                credentials: "include",
            });

            const deletedTask = await response.json();

            if (!response.ok)
                throw new Error(deletedTask.errors || "Failed to delete task");
            await fetchTasks(currentPage, statusFilter);
            toast.success("Task deleted successfully");
            return true;
        } catch (error) {
            toast.error(error.message || "Failed to delete task");
            return false;
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                currentPage,
                totalPages,
                statusFilter,
                fetchTasks,
                createTask,
                updateTask,
                deleteTask,
                toggleTaskStatus,
                setPage,
                setFilter,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export const useTask = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTask must be used within a TaskProvider");
    }
    return context;
};
