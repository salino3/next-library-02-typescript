"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ServicesApp } from "@/app/service/service-app";

export const LayoutDashboard = () => {
  const [dbTime, setDbTime] = useState<string | null>(null);

  useEffect(() => {
    ServicesApp.getAllBooks().then((res) => console.log("clog1", res));
  }, []);

  useEffect(() => {
    // Calls your local Next.js Route Handler endpoint directly
    axios
      .get("/api/db-status")
      .then((res) => {
        if (res.data.success) {
          setDbTime(res.data.timestamp);
        }
      })
      .catch((err) => console.error("Error checking Next.js local API:", err));
  }, []);

  return (
    <div className="LayoutDashboard">
      <div>
        <h3>Next.js Direct DB Connection Status:</h3>
        {dbTime ? <p>Server time from DB: {dbTime}</p> : <p>Loading...</p>}
      </div>
    </div>
  );
};
