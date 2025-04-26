
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            SmartTodo
          </h1>
        </div>
        
        <nav>
          <ul className="flex items-center space-x-2 md:space-x-4">
            {isAuthenticated ? (
              <>
                <li>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button 
                    variant="ghost"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </li>
                <li>
                  <Button 
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
