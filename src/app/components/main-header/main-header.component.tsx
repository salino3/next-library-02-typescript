"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import "./main-header.styles.scss";

//*
//  import { useRouter } from "next/navigation";
//  const router = useRouter();
//  If URL is: /store/shoes?color=blue
//  const { pathname, query } = router;
//  router.replace(pathname);

export const MainHeader = () => {
  const pathName = usePathname();
  console.log("clog2", pathName);
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
            <small>Server time from DB: {dbTime}</small>
          ) : (
            <small>Loading...</small>
          )}
        </div>
        <h3 className="title">Next App Library</h3>
        <nav>
          <ul>
            <li>
              <Link
                style={
                  {
                    "--link-selected": pathName === "/" ? "underline" : "none",
                  } as React.CSSProperties
                }
                href={"/"}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                style={
                  {
                    "--link-selected":
                      pathName === "/books" ? "underline" : "none",
                  } as React.CSSProperties
                }
                href={"/books"}
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                style={
                  {
                    "--link-selected":
                      pathName === "/authors" ? "underline" : "none",
                  } as React.CSSProperties
                }
                href={"/authors"}
              >
                Authors
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
