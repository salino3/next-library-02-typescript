"use client";
import { ServicesApp } from "@/app/service/service-app";
import { useEffect } from "react";

export const LayoutDashboard = () => {
  useEffect(() => {
    ServicesApp.getAllBooks().then((res) => console.log("clog1", res));
  }, []);

  return <div className="LayoutDashboard">hola</div>;
};
