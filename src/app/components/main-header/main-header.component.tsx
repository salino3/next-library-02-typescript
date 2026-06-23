"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProviderSelector } from "@/app/store/provider";
import { AsideProps, routesApp } from "@/app/store/interface";
import "./main-header.styles.scss";

interface LinkApp {
  pathName: string;
  title: string;
}

// Links <nav>
const linksApp: LinkApp[] = [
  {
    pathName: routesApp.dashboard,
    title: "Dashboard",
  },
  {
    pathName: routesApp.books,
    title: "Books",
  },
  {
    pathName: routesApp.authors,
    title: "Authors",
  },
];

export const MainHeader = () => {
  const pathName = usePathname();

  const { setAsideValue, aside } = useProviderSelector(
    "setAsideValue",
    "aside",
  );

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
      <div className="containerMainHeader">
        <div className="boxDBConnStatus">
          <h5>Next.js Direct DB Connection Status:</h5>
          {dbTime ? (
            <small>
              Server time from DB:{" "}
              {new Date(dbTime).toLocaleDateString("it-IT")} -
              {new Date(dbTime).toLocaleTimeString("it-IT", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              h
            </small>
          ) : (
            <small>Loading...</small>
          )}
        </div>
        <h3 className="title">Next App Library</h3>
        <nav>
          <ul>
            {linksApp.map((link) => (
              <li key={link.pathName}>
                <Link
                  style={
                    {
                      "--link-selected":
                        pathName === link.pathName ? "underline" : "none",
                    } as React.CSSProperties
                  }
                  href={link.pathName}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={() => setAsideValue && setAsideValue()}
          className="btnAside"
        >
          {aside === AsideProps.open ? AsideProps.close : AsideProps.open}
        </button>
      </div>
    </div>
  );
};
