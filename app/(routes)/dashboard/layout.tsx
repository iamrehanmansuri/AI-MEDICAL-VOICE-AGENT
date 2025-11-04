import { div } from "motion/react-client";
import React from "react";
import AppHeader from "./_components/AppHeader";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <div>
        <AppHeader />
        <div className="px-10 md:px-20 lg:px40 py-10">
          {children}
          </div>
      </div>
    );

}

export default DashboardLayout;
