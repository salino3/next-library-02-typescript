"use client";

import { useEffect } from "react";
import { ServicesApp } from "@/app/service/service-app";
import { DashboardContent } from "../dashboard-content/dashboard-content.component";
import { DashboardSubContent } from "../dashboard-sub-content/dashboard-sub-content.component";
import { Footer } from "@/app/components/footer/footer.component";

export const DashboardPage = () => {
  useEffect(() => {
    ServicesApp.getAllBooks().then((res) => console.log("clog1", res));
  }, []);

  return (
    <div className="LayoutDashboard">
      <DashboardContent />
      <DashboardSubContent />
      <Footer />
    </div>
  );
};
