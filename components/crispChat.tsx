"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0f181d57-3c79-47d6-a0d3-ea033e7f0941");
  }, []);
  return null;
};
