import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { Button } from "./components/ui/button";
import { SidebarProvider } from "./components/ui/sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <div className="flex min-h-svh flex-col items-center justify-center">
              <Button>Click me</Button>
            </div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
