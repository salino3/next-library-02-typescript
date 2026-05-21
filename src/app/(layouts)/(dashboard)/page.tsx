"use client";

import { useEffect } from "react";
import { ServicesApp } from "@/app/service/service-app";
import { MainHeader } from "@/app/components/main-header/main-header.component";
import "./dashboard.styles.scss";
export const LayoutDashboard = () => {
  useEffect(() => {
    ServicesApp.getAllBooks().then((res) => console.log("clog1", res));
  }, []);

  return (
    <div className="LayoutDashboard">
      <MainHeader />
      <div className="homeContent">
        <h1>Library with Next</h1>
      </div>
    </div>
  );
};
