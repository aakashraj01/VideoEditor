"use client";

import { fabric } from "fabric";
import React, { useContext, useEffect, useState } from "react";
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
import { Canvas } from "./Canvas";

export const EditorWithStore = () => {
  const [store] = useState(new Store());
  return (
    <StoreContext.Provider value={store}>
      <Editor></Editor>
    </StoreContext.Provider>
  );
}

export const Editor = observer(() => {
  const store = useContext(StoreContext);
  const selectedElement = store.selectedElement;
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
      <div id="grid-canvas-container" className="col-start-3 bg-slate-100 flex flex-col items-center">
        <Canvas selectedElement={selectedElement} />
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
