import React, { useContext, useState } from 'react';
import { StoreContext } from "@/store"; // Adjust path as needed
import { HexColorPicker } from "react-colorful";

const ToolBox = ({ selectedElement }) => {
    const store = useContext(StoreContext);

    const togglePicker = () => {
        store.setIsHexPickerOpen(!store.isHexPickerOpen);
    }
    const currentColor = selectedElement && selectedElement.fabricObject ? selectedElement.fabricObject.fill : store.selectedShapeColor;


    console.log(selectedElement)
    return (
        <div className={`bg-white text-black ${selectedElement ? 'p-2' : 'p-6'} w-full`}>
            <div className="">
                {selectedElement && <div className="h-8 w-8 border-[1px] border-gray" style={{ backgroundColor: currentColor }} onClick={togglePicker}></div>}
            </div>
        </div>
    );
};

export default ToolBox;
