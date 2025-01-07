import React, { ReactNode } from 'react';
import {AppSidebarAdmin} from "@/components/app-sidebar1";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
      </header>

      <main>
        <SidebarProvider>
          <AppSidebarAdmin />
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </main>

      <footer>
      </footer>
    </div>
  );
};

export default Layout;