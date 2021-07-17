import React from "react";
import Skeleton from "react-loading-skeleton";
// import { CardActionArea, CardContent, Divider } from "@material-ui/core";

export default function SkeletonCard() {
  const skeleton = Array.from({ length: 6 }).map((item, index) => (
    <div className="customCard">
      <div>
        <Skeleton height={200} width={300} />
        <div className="customCard_content">
          <Skeleton height={50} width={300} />
        </div>
      </div>
    </div>
  ));

  return skeleton;
}
