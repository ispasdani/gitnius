import React from "react";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return <div>{children}</div>;
};

export default SidebarLayout;
