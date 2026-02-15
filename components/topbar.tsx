"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { getInitials } from "@/lib/utils";
import { Menu, Bell, Search, Settings, LogOut, User } from "lucide-react";

interface TopbarProps {
  onMenuToggle: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
      <button
        onClick={onMenuToggle}
        className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
        aria-label="Toggle navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="hidden flex-1 md:flex">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students, teachers, classes..."
            className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <button
          className="relative rounded-md p-2 text-muted-foreground hover:bg-accent"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* Settings */}
        <button
          onClick={() => router.push("/settings")}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>

        {/* User Menu */}
        <div className="group relative">
          <button
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent"
            aria-label="User menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {user ? getInitials(`${user.firstName} ${user.lastName}`) : "?"}
            </div>
            <span className="hidden text-sm font-medium text-foreground md:inline">
              {user ? user.firstName : "Guest"}
            </span>
          </button>

          {/* Dropdown */}
          <div className="invisible absolute right-0 top-full mt-1 w-48 rounded-lg border border-border bg-card p-1 opacity-0 shadow-lg transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
            <button
              onClick={() => router.push("/settings")}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
            >
              <User className="h-4 w-4" />
              Profile
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <div className="my-1 h-px bg-border" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
