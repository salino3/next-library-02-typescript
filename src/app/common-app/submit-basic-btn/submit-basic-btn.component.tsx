"use client";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import "./submit-basic-btn.styles.scss";

interface Props {
  searchTitle: string;
}

export function SubmitBasicBtn({ searchTitle }: Props) {
  const { pending, method, data } = useFormStatus();
  const title: FormDataEntryValue | null | undefined = data?.get("title");
  console.log("The typed title is:", title);
  console.log("method", method);

  const [liveValue, setLiveValue] = useState<string>("");

  useEffect(() => {
    const inputElement = document.getElementById("title") as HTMLInputElement;
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
      disabled={pending || searchTitle == liveValue}
      className="btnSubmitBasicBtn"
    >
      {pending ? "Loading..." : "Login User"}
    </button>
  );
}
