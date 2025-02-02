"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Bot, CreditCard, LayoutDashboard, Presentation } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { useProjects } from "@/hooks/useProjects";
import FullLogo from "./fullLogo";
import ShortLogo from "../svgs/shortLogo";

const SidebarApp = () => {
  const pathname = usePathname();

  const { open } = useSidebar();

  const { projects, projectId, setProjectId } = useProjects();

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Q&A",
      url: "/qa",
      icon: Bot,
    },
    {
      title: "Meetings",
      url: "/meetings",
      icon: Presentation,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className={`flex items-center ${!open && "justify-center"}`}>
          {open ? <FullLogo /> : <ShortLogo />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn({
                          "!bg-primary !text-white": pathname === item.url,
                        })}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects
                ?.filter((project) => project.role === "owner")
                .map((project) => {
                  return (
                    <SidebarMenuItem
                      key={project._id}
                      className="cursor-pointer"
                    >
                      <SidebarMenuButton asChild>
                        <div onClick={() => setProjectId(project._id)}>
                          <div
                            className={cn(
                              "rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary",
                              {
                                "bg-primary text-white":
                                  project._id === projectId,
                              }
                            )}
                          >
                            {project.projectName[0]}
                          </div>
                          <span>{project.projectName}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

              <div className="h-2"></div>
              <SidebarMenuItem>
                <Link href={"/create"}>
                  <Button size={"sm"} variant={"outline"} className="w-fit">
                    Create Project
                  </Button>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarApp;
