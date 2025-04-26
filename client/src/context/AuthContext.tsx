import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/config/apiConfig";
import { Cookie } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (
        name: string,
        email: string,
        password: string,
        phone?: string
    ) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.auth.me, {
                    credentials: "include",
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(API_ENDPOINTS.auth.login, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const userData = await response.json();
            if (!response.ok) throw new Error(userData.error || "Login failed");

            setUser(userData);
            setIsAuthenticated(true);
            toast.success("Logged in successfully");
            return true;
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.message || "Login failedf");
            return false;
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        phone?: string
    ) => {
        try {
            const response = await fetch(API_ENDPOINTS.auth.register, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone }),
            });

            const userData = await response.json();
            if (!response.ok)
                throw new Error(userData.error || "Registration failed");

            setUser(userData);
            setIsAuthenticated(true);
            toast.success("Registered successfully");
            return true;
        } catch (error) {
            toast.error(error.message || "Registration failed");
            return false;
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        try {
            const response = await fetch(API_ENDPOINTS.user.profile, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const updatedUser = await response.json();
            if (!response.ok)
                throw new Error(updatedUser.error || "Profile update failed");

            setUser((prev) => ({ ...prev, ...updatedUser }));
            toast.success("Profile updated successfully");
            return true;
        } catch (error) {
            toast.error(error.message || "Profile update failed");
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch(API_ENDPOINTS.auth.logout, {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            toast.success("Logged out successfully");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                register,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
