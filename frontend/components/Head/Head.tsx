import React from "react";
import NextHead from "next/head";

interface HeadProps {
  title: string;
  description: string;
}

const Head: React.FC<HeadProps> = ({ title, description }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
    </NextHead>
  );
};

export default Head;
