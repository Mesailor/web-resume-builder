import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { ResumeForm } from "./components/resume-form";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ResumeRenderer } from "./components/resume-renderer";
import { useState } from "react";
import type { Resume } from "./types/resume";
import { useIsMobile } from "./hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ModeToggle } from "./components/theme/mode-toggle";
import { cn } from "@/lib/utils";

function App() {
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 flex flex-col h-dvh overflow-hidden">
            <Header tab={tab} onTabChange={setTab} />
            <Content tab={tab} onTabChange={setTab} />
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

const Header = ({
  tab,
  onTabChange,
}: {
  tab: "edit" | "preview";
  onTabChange: (tab: "edit" | "preview") => void;
}) => {
  const isMobile = useIsMobile();

  return (
    <header
      className={cn(
        "bg-background py-3 px-6 border-b sticky top-0 z-10 space-y-3",
        {
          "px-3": isMobile,
        },
      )}
    >
      <div className="flex items-center justify-between">
        <SidebarTrigger />
        <ModeToggle />
      </div>
      {isMobile && (
        <div>
          <Tabs value={tab}>
            <TabsList className="w-full">
              <TabsTrigger value="edit" onClick={() => onTabChange("edit")}>
                Edit
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                onClick={() => onTabChange("preview")}
              >
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
    </header>
  );
};

const Content = ({
  tab,
  onTabChange,
}: {
  tab: "edit" | "preview";
  onTabChange: (tab: "edit" | "preview") => void;
}) => {
  const [resumeData, setResumeData] = useState<Resume | null>(null);

  const isMobile = useIsMobile();

  const handleFormSubmit = (data: Resume) => {
    setResumeData(data);
    onTabChange("preview");
  };

  if (isMobile) {
    return (
      <Tabs value={tab} className="flex-1 flex flex-col h-dvh overflow-hidden">
        <TabsContent value="edit" className="overflow-auto p-4">
          <ResumeForm onSubmit={handleFormSubmit} data={resumeData} />
        </TabsContent>
        <TabsContent value="preview" className="overflow-auto p-4">
          <ResumeRenderer data={resumeData} />
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <div className="flex-1 flex">
      <div className="w-1/2 p-4 border-r">
        <ResumeForm onSubmit={handleFormSubmit} data={resumeData} />
      </div>
      <div className="w-1/2 overflow-auto p-4">
        <ResumeRenderer data={resumeData} />
      </div>
    </div>
  );
};

export default App;
