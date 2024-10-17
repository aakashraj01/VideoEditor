"use client";

import { fabric } from "fabric";
import { observer } from "mobx-react";
import ToolBox from "./toolbox/ToolBox";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/store";

export const Canvas = observer(({ selectedElement }) => {
    const store = useContext(StoreContext);

    useEffect(() => {
        const initialWidth = 800; // Define the initial width
        const aspectRatio = 16 / 9; // Landscape aspect ratio
        const initialHeight = initialWidth / aspectRatio; // Calculate height based on the aspect ratio

        const canvas = new fabric.Canvas("canvas", {
        height: initialHeight,
        width: initialWidth,
        backgroundColor: "#ededed",
        });
    
        // Setup drag and drop
        const handleDrop = (event) => {
          event.preventDefault();
          const data = JSON.parse(event.dataTransfer.getData("application/resource"));
          const rect = canvas.getElement().getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
    
          console.log(`Adjusted coordinates: x=${x}, y=${y}`);
          switch (data.type) {
            case 'image':
              fabric.Image.fromURL(data.src, (img) => {
                img.set({
                  left: x,
                  top: y,
                  originX: 'center',
                  originY: 'center'
                });
                canvas.add(img);
                canvas.renderAll();
              });    
              store.addImage(data.index, x, y);
              break;
              case 'shape':
                const shape = store.createShape({ 
                  properties: { shapeType: data.shapeType },
                  placement: {
                    x: x,  // Use the adjusted x, y values here
                    y: y,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0
                  }
                });
                canvas.add(shape);
                canvas.renderAll();
                store.addShapeResource(data.shapeType, x, y);
                break;
          }
        };
    
        const setupCanvas = () => {
          canvas.on("mouse:down", function (e) {
            if (!e.target) {
              store.setSelectedElement(null);
            }
          });
    
          // Enable dropping on the canvas
          const canvasContainer = document.getElementById('grid-canvas-container');
          canvasContainer.addEventListener('dragover', (e) => e.preventDefault());
          canvasContainer.addEventListener('drop', handleDrop);
    
          store.setCanvas(canvas);
          fabric.util.requestAnimFrame(function render() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(render);
          });
        };
    
        setupCanvas();
    }, []);
    return (
        <>
            <ToolBox selectedElement={selectedElement}/>
            <canvas id="canvas" />
        </>
    )
})