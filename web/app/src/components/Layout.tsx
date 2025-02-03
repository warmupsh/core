import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Navigation from '@/components/Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />

      {/* Main content wrapper */}
      <div className="flex-1 w-0">
        {/* Header */}
        <header className="h-16 border-b bg-card sticky top-0 z-10">
          <div className="flex items-center justify-end h-full px-4 md:px-6">
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 max-w-7xl mx-auto w-full">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}