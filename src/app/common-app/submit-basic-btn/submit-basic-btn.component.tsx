"use client";
import "./submit-basic-btn.styles.scss";
import { useFormStatus } from "react-dom";

export function SubmitBasicBtn() {
  const { pending, method } = useFormStatus();
  console.log("method", method);
  return (
    <button type="submit" disabled={pending} className="btnSubmitBasicBtn">
      {pending ? "Loading..." : "Login User"}
    </button>
  );
}
