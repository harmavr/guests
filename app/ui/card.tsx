import React from "react";

interface CardProps {
  title: string;
  image: string;
}

export default function Card({ title, image }: CardProps) {
  return <div>{title}</div>;
}
