"use client";

import { useEffect } from "react";
import { ServicesApp } from "@/app/service/service-app";
import { MainHeader } from "@/app/components/main-header/main-header.component";

export const LayoutDashboard = () => {
  useEffect(() => {
    ServicesApp.getAllBooks().then((res) => console.log("clog1", res));
  }, []);

  return (
    <div className="LayoutDashboard">
      <MainHeader />
    </div>
  );
};
