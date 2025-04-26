
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <section className="py-16 md:py-24 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Simple Task Management
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mb-8">
            Get organized, stay productive, and never miss a deadline with SmartTodo.
            The simple, intuitive way to manage your tasks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              onClick={() => navigate("/register")}
              className="text-base"
            >
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/login")}
              className="text-base"
            >
              Login
            </Button>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why choose SmartTodo?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">Simple & Fast</h3>
                <p className="text-muted-foreground">
                  Clean interface with powerful functionality. Get started in seconds.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">Stay Organized</h3>
                <p className="text-muted-foreground">
                  Filter and sort your tasks to focus on what matters most.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your data is protected with modern security practices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SmartTodo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
