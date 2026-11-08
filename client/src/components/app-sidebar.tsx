import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { ModeToggle } from "./theme/mode-toggle";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="items-end">
        <ModeToggle />
        <NavUser
          user={{
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "/avatars/john-doe.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
