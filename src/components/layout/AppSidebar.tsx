import {
  Zap,
  Sun,
  Wind,
  Flame,
  Battery,
  Car,
  Atom,
  Network,
  Lightbulb,
  Info,
  ChevronDown,
  FileText,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mainNavItems = [
  { title: "Energy Overview", url: "/energy-overview", icon: Zap },
];

const energyCategoryItems = [
  { title: "Solar", url: "/energy-categories/solar", icon: Sun },
  { title: "Wind", url: "/energy-categories/wind", icon: Wind },
  { title: "Heat / Wärmepumpen", url: "/energy-categories/heat", icon: Flame },
  { title: "Storage", url: "/energy-categories/storage", icon: Battery },
  { title: "Mobility", url: "/energy-categories/mobility", icon: Car },
  { title: "Hydrogen", url: "/energy-categories/hydrogen", icon: Atom },
  { title: "Grid Infrastructure", url: "/energy-categories/grid", icon: Network },
];

const bottomNavItems = [
  { title: "Recommendation Engine", url: "/recommendations", icon: Lightbulb },
  { title: "Reports & Export", url: "/reports", icon: FileText },
  { title: "About", url: "/about", icon: Info },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (items: { url: string }[]) =>
    items.some((item) => location.pathname === item.url);

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg dashboard-gradient flex items-center justify-center">
            <Zap className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">ampéra</span>
              <span className="text-xs text-sidebar-foreground/60">insight</span>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen={isGroupActive(energyCategoryItems)} className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {!collapsed && <span>Energy Categories</span>}
                </div>
                {!collapsed && (
                  <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {energyCategoryItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.url)}
                        tooltip={item.title}
                        className="pl-6"
                      >
                        <NavLink to={item.url}>
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground/50">
            © 2024 SAB Sachsen
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}