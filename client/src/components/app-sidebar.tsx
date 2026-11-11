import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="items-end">
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
