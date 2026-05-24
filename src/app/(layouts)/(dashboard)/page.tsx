"use client";

import { useEffect } from "react";
import { ServicesApp } from "@/app/service/service-app";
import { DashboardContent } from "./components/dashboard-content/dashboard-content.component";
import { Footer } from "@/app/components/footer/footer.component";
import "./dashboard.styles.scss";

export const LayoutDashboard = () => {
  useEffect(() => {
    ServicesApp.getAllBooks().then((res) => console.log("clog1", res));
  }, []);

  return (
    <div className="LayoutDashboard">
      <DashboardContent />
      <Footer />
    </div>
  );
};
