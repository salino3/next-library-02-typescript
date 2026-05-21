"use client";

import { useEffect } from "react";
import { ServicesApp } from "@/app/service/service-app";
import "./dashboard.styles.scss";

export const LayoutDashboard = () => {
  useEffect(() => {
    ServicesApp.getAllBooks().then((res) => console.log("clog1", res));
  }, []);

  return (
    <div className="LayoutDashboard">
      <div className="homeContent">
        <h1>Library with Next</h1>
      </div>
    </div>
  );
};
