import React from "react";
interface ControlsProps {
  children: React.ReactNode;
}
export default function Controls({ children }: ControlsProps) {
  return <div>{children}</div>;
}
