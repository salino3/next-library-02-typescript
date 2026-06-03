"use client";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { GlassMagnifyningIcon } from "@/app/icons/magnifying-glass-icon";
import "./submit-basic-btn-authors.styles.scss";

interface Props {
  searchName: string;
}

export function SubmitBasicBtnAuthors({ searchName }: Props) {
  const { pending } = useFormStatus();

  const [liveValue, setLiveValue] = useState<string>("");

  useEffect(() => {
    const inputElement = document.getElementById("name") as HTMLInputElement;
    if (!inputElement) return;

    const handleTyping = (event: Event) => {
      const target = event.target as HTMLInputElement;
      setLiveValue(target.value);
    };

    inputElement.addEventListener("input", handleTyping);

    return () => {
      inputElement.removeEventListener("input", handleTyping);
    };
  }, []);

  return (
    <button
      type="submit"
      disabled={pending || searchName == liveValue}
      className="btnSubmitBasicBtnAuthors"
    >
      {pending ? "Loading..." : "Search Authors"}
      <GlassMagnifyningIcon />
    </button>
  );
}
