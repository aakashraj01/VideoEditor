import { observer } from "mobx-react";
import React, { useState } from "react";
import Button from "../common/Button";
import { HexColorPicker } from "react-colorful";
import { StoreContext } from "@/store";
import ResizeTemplate from "../popups/resizeTemplate";

export const CustomizePanel = observer(() => {
  const store = React.useContext(StoreContext);
  const [isPickerOpen, setIsPickerOpen] = useState(false); // State to toggle HexColorPicker
  const [isResizeOpen, setIsResizeOpen] = useState(false); // State to toggle Resize Template

  const handleColorChange = (color) => {
    store.setBackgroundColor(color);
    setIsPickerOpen(false);
  }

  const handlePickerChange = (color) => {
    store.setBackgroundColor(color);
    setIsPickerOpen(true);
  }

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  }

  const colors = ["#ffffff", "#9B9B9B", "#4A4A4A", "#000000", "#A70C2C", "#DA9A15", "#F8E71D", "#47821A", "#4990E2"];

  return (
    <>
      <div className="text-lg p-2 pt-4 pb-2 font-semibold">
        Customize
      </div>
      <div className="flex flex-col gap-2 p-2 relative">
        <Button label="Resize Template" className="w-full py-2 bg-black text-white rounded-lg" onClick={() => setIsResizeOpen(true)} />
        <div className="flex flex-col gap-2 bg-gray-100 p-2">
          <span className="text-sm font-semibold">Background</span>
          <div className="grid grid-cols-4 gap-1">
            {colors.map((color) => (
              <div
                onClick={() => handleColorChange(color)}
                key={color}
                className="h-8 cursor-pointer rounded border border-gray-300"
                style={{ background: color }}
              ></div>
            ))}
            <div className="h-8 cursor-pointer rounded border border-gray-300 bg-[url('https://static.canva.com/web/images/788ee7a68293bd0264fc31f22c31e62d.png')] bg-center bg-cover" onClick={togglePicker}></div>
          </div>
          {isPickerOpen && (
            <div className="absolute top-52 left-20 z-10">
              <HexColorPicker onChange={handlePickerChange} />
            </div>
          )}
        </div>
      </div>
      {isResizeOpen && (
        <ResizeTemplate
          isOpen={isResizeOpen}
          onClose={() => setIsResizeOpen(false)}
        />
      )}
    </>
  );
});
