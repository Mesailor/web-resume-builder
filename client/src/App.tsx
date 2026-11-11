import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { ResumeForm } from "./components/resume-form";
import { SidebarProvider } from "./components/ui/sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ResumeRenderer } from "./components/resume-renderer";
import { useState } from "react";
import type { Resume } from "./types/resume";

function App() {
  const [resumeData, setResumeData] = useState<Resume | null>(null);

  const handleFormSubmit = (data: Resume) => {
    setResumeData(data);
  };

  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 flex overflow-hidden">
            <div className="w-1/2 p-4 border-r">
              <ResumeForm onSubmit={handleFormSubmit} />
            </div>
            <div className="w-1/2 overflow-auto p-4">
              <ResumeRenderer data={resumeData} />
            </div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
