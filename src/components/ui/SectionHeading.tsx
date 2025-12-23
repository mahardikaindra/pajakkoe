// src/components/ui/SectionHeading.tsx
import React from "react";
import Typography from "@mui/material/Typography";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default SectionHeading;
