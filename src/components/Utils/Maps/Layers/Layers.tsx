import React from "react";

interface LayersProps {
  children: React.ReactNode;
}

export default function Layers({ children }: LayersProps) {
  return <div>{children}</div>;
}
