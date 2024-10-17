"use client";

import { fabric } from "fabric";
import React, { useEffect, useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Resources } from "./Resources";
import { ElementsPanel } from "./panels/ElementsPanel";
import { Menu } from "./Menu";
import { TimeLine } from "./TimeLine";
import { Store } from "@/store/Store";
import "@/utils/fabric-utils";
import Navbar from "./navbar/Navbar";
import ToolBox from "./toolbox/ToolBox";

export const EditorWithStore = () => {
  const [store] = useState(new Store());
  return (
    <StoreContext.Provider value={store}>
      <Editor></Editor>
    </StoreContext.Provider>
  );
}

export const Editor = observer(() => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 800,
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
    <div className="grid grid-rows-[auto_500px_1fr_20px] grid-cols-[72px_300px_1fr_250px] h-[100vh]">
      <div className="col-span-4">
        <Navbar />
      </div>
      <div className="tile row-span-2 flex flex-col">
        <Menu />
      </div>
      <div className="row-span-2 flex flex-col overflow-scroll">
        <Resources />
      </div>
      <div id="grid-canvas-container" className="col-start-3 bg-slate-100 flex flex-col justify-center items-center">
        <ToolBox />
        <canvas id="canvas" className="!h-[100%] w-[800px]" />
      </div>
      <div className="col-start-4 row-start-2">
        <ElementsPanel />
      </div>
      <div className="col-start-3 row-start-3 col-span-2 relative px-[10px] py-[4px] overflow-scroll">
        <TimeLine />
      </div>
      <div className="col-span-4 text-right px-2 text-[0.5em] bg-black text-white">
        Crafted By Aakash Raj
      </div>
    </div>
  );
});
