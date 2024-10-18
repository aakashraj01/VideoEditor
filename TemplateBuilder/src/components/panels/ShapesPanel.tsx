"use client";
import React from "react";
import { observer } from "mobx-react";
import { ShapeResource } from "../entity/ShapesResource";

const shapeTypes = ['square', 'rectangle', 'triangle', 'circle', 'parallelogram'];

export const ShapesPanel = observer(() => {

  return (
    <>
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
        Shapes
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {shapeTypes.map((type, index) => (
          <ShapeResource key={index} type={type} index={index} />
        ))}
      </div>
    </>
  );
});
