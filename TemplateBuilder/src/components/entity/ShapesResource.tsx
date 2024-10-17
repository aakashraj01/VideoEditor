"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { fabric } from 'fabric';

type ShapeResourceProps = {
  type: string;
  index: number;
};

export const ShapeResource = observer(({ type, index }: ShapeResourceProps) => {
    const store = React.useContext(StoreContext);
  
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData("application/resource", JSON.stringify({
        type: 'shape',
        shapeType: type,
        index: index
      }));
    };
  
    const handleAddShape = () => {
      store.addShapeResource(type);
    };
  
    // Generate a small preview of the shape based on its type
    const shapeStyle = {
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
  
    const renderShapePreview = () => {
      const shapeProps = {
        width: 50,
        height: 50,
        fill: 'transparent',
        stroke: 'white',
        strokeWidth: 2
      };
  
      switch (type) {
        case 'circle':
          return <svg style={shapeStyle}><circle cx="25" cy="25" r="20" {...shapeProps} /></svg>;
        case 'square':
          return <svg style={shapeStyle}><rect x="10" y="10" {...shapeProps} /></svg>;
        case 'rectangle':
          return <svg style={shapeStyle}><rect x="5" y="15" {...shapeProps} /></svg>;
        case 'triangle':
          return <svg style={shapeStyle}><polygon points="25,5 45,45 5,45" {...shapeProps} /></svg>;
        case 'parallelogram':
          return <svg style={shapeStyle}><polygon points="15,10 45,10 35,40 5,40" {...shapeProps} /></svg>;
        default:
          return null;
      }
    };
  
    return (
      <div
        className="rounded-lg overflow-hidden items-center bg-slate-800 m-[15px] flex flex-col relative p-2 cursor-pointer"
        draggable="true"
        onDragStart={handleDragStart}
        onClick={handleAddShape}
      >
        {renderShapePreview()}
      </div>
    );
  });
  