import React from "react";

export const useAppFunctions = () => {
  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    vertical: boolean = true,
  ) => {
    const target = e.currentTarget;

    // Construct the explicit path matching your public folder file names exactly
    const fileName = vertical
      ? "error-img-book-vertical.png"
      : "error-img-book-horizontal.png";

    const fallbackSrc = `/error-images/${fileName}`;

    // Prevent an infinite rendering loop if the fallback image itself is missing or corrupted
    // If the image current source ALREADY ends with our fallback filename...
    if (target.src.endsWith(fileName)) {
      return; // ...stop executing. Do not try to re-assign it.
    }

    target.src = fallbackSrc;
  };

  return {
    handleImgError,
  };
};
