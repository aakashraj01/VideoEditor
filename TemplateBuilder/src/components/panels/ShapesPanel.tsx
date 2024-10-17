"use client";
import React from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store"; // Make sure you import StoreContext
import { HexColorPicker } from "react-colorful"; // Assuming HexColorPicker is imported from this package
import { ShapeResource } from "../entity/ShapesResource";

const shapeTypes = ['square', 'rectangle', 'triangle', 'circle', 'parallelogram'];

export const ShapesPanel = observer(() => {
  const store = React.useContext(StoreContext); // Using StoreContext to access store
  const selectedElement = store.selectedElement;

  const handlePickerChange = (color: string) => {
    store.setSelectedShapeColor(color); // Assuming store has a method to set color
  };

  return (
    <div> {/* The root element should be a div or suitable container */}
      {store.isHexPickerOpen && selectedElement ? (
        <div className="flex flex-col gap-2 p-2">
          <span className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">Shapes</span>
          <HexColorPicker color={store.selectedShapeColor} onChange={handlePickerChange} />
        </div>
      ) : (
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
      )}
    </div>
  );
});
