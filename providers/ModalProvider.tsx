"use client";
import AuthModal from "@/components/AuthModal";
import PlaylistModal from "@/components/PlaylistModal";
import UploadModal from "@/components/UploadModal";

import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
      <PlaylistModal />
    </>
  );
};

export default ModalProvider;
