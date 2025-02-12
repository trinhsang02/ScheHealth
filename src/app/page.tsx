'use client'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LoginForm } from "./auth/login";
import { RegisterForm } from "./auth/register";
import { useRouter } from 'next/navigation'


export default function Page() {
  const router = useRouter();

  return (
    <SidebarProvider>
      <LoginForm />
    </SidebarProvider> 
  );
}
