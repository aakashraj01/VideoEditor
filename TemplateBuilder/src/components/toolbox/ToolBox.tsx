import React, { useContext, useState } from 'react';
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import { FiBold, FiItalic, FiUnderline } from 'react-icons/fi';
import { TbCircleHalf2 } from "react-icons/tb";

const commonFontSizes = Array.from({ length: 67 }, (_, i) => i + 6);
const fontList = ['Noto Sans', 'Inter', 'Poppins', 'Helvetica Neue', 'Montserrat', 'Roboto', 'Sora', 'Playfair Display', 'Libre Franklin'];


const ToolBox = observer(() => {
    const store = useContext(StoreContext);
    const [opacityControlVisible, setOpacityControlVisible] = useState(false);

    const {
        selectedElement,
        selectedShapeColor,
        selectedTextColor,
        setSelectedTextFont,
        setSelectedTextFontSize,
        setSelectedTextFontWeight,
        setSelectedTextFontStyle,
        setSelectedOpacity,
        setSelectedTextTextDecoration
    } = store;

    const togglePicker = () => {
        store.setIsHexPickerOpen(!store.isHexPickerOpen);
    };

    const toggleOpacityControl = () => {
        setOpacityControlVisible(!opacityControlVisible);
    };

    const handleOpacityChange = (event) => {
        const opacity = parseInt(event.target.value, 10);
        if (selectedElement) {
            setSelectedOpacity(opacity, selectedElement.type);
        }
    };

    const handleFontChange = (event) => {
        setSelectedTextFont(event.target.value);
    };

    const handleFontSizeSelect = (event) => {
        setSelectedTextFontSize(parseInt(event.target.value, 10));
    };

    const toggleBold = () => {
        const newWeight = selectedElement?.properties?.fontWeight === 'bold' ? 'normal' : 'bold';
        setSelectedTextFontWeight(newWeight);
    };

    const toggleItalic = () => {
        const newStyle = selectedElement?.properties?.fontStyle === 'italic' ? 'normal' : 'italic';
        setSelectedTextFontStyle(newStyle);
    };

    const toggleUnderline = () => {
        const newDecoration = selectedElement?.properties?.textDecoration === 'underline' ? 'none' : 'underline';
        setSelectedTextTextDecoration(newDecoration);
    };

    let currentColor = selectedShapeColor; 
    if (selectedElement?.type === "text") {
        currentColor = selectedTextColor; 
    } else if (selectedElement?.type === "shape") {
        currentColor = selectedShapeColor;
    }

    return (
        <div className={`bg-white text-black ${selectedElement ? 'p-2' : 'p-6'} w-full`}>
            {selectedElement && (
                <div className="flex justify-between w-full">
                    <div className="flex items-center space-x-2">
                        <div
                            className="h-8 w-8 border-[1px] border-gray-300 shadow-md"
                            style={{ backgroundColor: currentColor }}
                            onClick={togglePicker}
                        ></div>
                        {selectedElement.type === 'text' && (
                            <div className="flex items-center space-x-2">
                                <select onChange={handleFontChange} value={selectedElement.properties.fontFamily} className="border p-1 rounded">
                                    {fontList.map(font => (
                                        <option key={font} value={font}>{font}</option>
                                    ))}
                                </select>
                                <select onChange={handleFontSizeSelect} value={selectedElement.properties.fontSize} className="border p-1 rounded w-20">
                                    {commonFontSizes.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                                <button onClick={toggleBold} className={`p-1 ${selectedElement.properties.fontWeight === 'bold' ? 'bg-gray-300' : ''}`}>
                                    <FiBold />
                                </button>
                                <button onClick={toggleItalic} className={`p-1 ${selectedElement.properties.fontStyle === 'italic' ? 'bg-gray-300' : ''}`}>
                                    <FiItalic />
                                </button>
                                <button onClick={toggleUnderline} className={`p-1 ${selectedElement.properties.textDecoration === 'underline' ? 'bg-gray-300' : ''}`}>
                                    <FiUnderline />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={toggleOpacityControl} className="p-1">
                            <TbCircleHalf2 />
                        </button>
                        {opacityControlVisible && (
                            <div className="absolute mt-2 bg-white p-2 shadow-lg rounded border right-64 top-20 z-10">
                                <div className="flex flex-col gap-2items-center">
                                    <div className="flex items-center justify-betweengap-2">
                                    <label className="mr-2">Opacity:</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={(selectedElement.properties.opacity || 1) * 100}
                                            onChange={handleOpacityChange}
                                            className="w-20 ml-2 border p-1 rounded"
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={(selectedElement.properties.opacity || 1) * 100}
                                        onChange={handleOpacityChange}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div> 
                </div>
            )}
        </div>
    );
});

export default ToolBox;
