// src/components/ui/Card.tsx
import React from "react";
import CardMUI, { CardProps as MUICardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface CardProps extends MUICardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content, ...props }) => {
  return (
    <CardMUI {...props}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </CardMUI>
  );
};

export default Card;
