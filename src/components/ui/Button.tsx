// src/components/ui/Button.tsx
import React from "react";
import ButtonMUI, { ButtonProps as MUIButtonProps } from "@mui/material/Button";

interface ButtonProps extends MUIButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return <ButtonMUI {...props}>{label}</ButtonMUI>;
};

export default Button;
