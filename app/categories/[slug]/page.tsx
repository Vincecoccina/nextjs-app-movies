import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function singleMoviePage({ params }: Props) {
  const { slug } = params;
  
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
