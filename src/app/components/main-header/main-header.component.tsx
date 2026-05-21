"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "./main-header.styles.scss";

export const MainHeader = () => {
  const [dbTime, setDbTime] = useState<string | null>(null);

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
    <div className="rootMainHeader">
      <div className="boxDBConnStatus">
        <h5>Next.js Direct DB Connection Status:</h5>
        {dbTime ? (
          <small>Server time from DB: {dbTime}</small>
        ) : (
          <small>Loading...</small>
        )}
      </div>
    </div>
  );
};
