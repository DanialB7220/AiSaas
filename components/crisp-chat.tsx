"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("62dd95a1-e980-49a8-953b-5a9bcf416835");
  }, []);

  return null;
}; 