import { useEffect, useState } from "react";

export const useToClose = (elementRef, handleOC) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        handleOC(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return {};
};
