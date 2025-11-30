import { Bell, Search, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

export function TopBar() {
  return (
    <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-lg dashboard-gradient flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">ampéra</span>
            <span className="text-[10px] text-muted-foreground -mt-0.5">insight</span>
          </div>
        </NavLink>
        <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 ml-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search data, regions, metrics..."
            className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0 text-sm w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NavLink to="/reports">
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Reports & Export</span>
          </Button>
        </NavLink>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>
        <div className="w-8 h-8 rounded-full dashboard-gradient flex items-center justify-center">
          <span className="text-xs font-medium text-primary-foreground">SA</span>
        </div>
      </div>
    </header>
  );
}