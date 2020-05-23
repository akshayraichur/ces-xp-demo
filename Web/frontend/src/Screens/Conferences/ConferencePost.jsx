import React from "react";
import { useParams } from "react-router-dom";

export const ConferencePost = () => {
  const { cid } = useParams();
  return (
    <div>
      <h1>Conferences {cid}</h1>
    </div>
  );
};
