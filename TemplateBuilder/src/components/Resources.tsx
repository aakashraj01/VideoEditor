"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { ExportVideoPanel } from "./panels/ExportVideoPanel";
import { AnimationsPanel } from "./panels/AnimationsPanel";
import { AudioResourcesPanel } from "./panels/AudioResourcesPanel";
import { FillPanel } from "./panels/FillPanel";
import { ImageResourcesPanel } from "./panels/ImageResourcesPanel";
import { TextResourcesPanel } from "./panels/TextResourcesPanel";
import { VideoResourcesPanel } from "./panels/VideoResourcesPanel";
import { EffectsPanel } from "./panels/EffectsPanel";
import { ShapesPanel } from "./panels/ShapesPanel";
import { CustomizePanel } from "./panels/CustomizePanel";
import HexColorPickerComponent from "./common/ColorPicker";
export const Resources = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedMenuOption = store.selectedMenuOption;
  const selectedElement = store.selectedElement;

  const getCurrentColor = () => {
    if (!selectedElement) return '#000000'; 
    switch (selectedElement.type) {
      case 'shape':
        return store.selectedShapeColor;
      case 'text':
        return store.selectedTextColor;
      default:
        return '#000000'; // Fallback color if no type matches
    }
  };

  const handlePickerChange = (color: string) => {
    if (selectedElement) {
      switch (selectedElement.type) {
        case 'shape':
          store.setSelectedShapeColor(color);
          break;
        case 'text':
          store.setSelectedTextColor(color);
          break;
        // Add cases for other types as needed
        default:
          console.log('No handler for type:', selectedElement.type);
      }
    }
  };

  return (
    <div className="bg-slate-200 h-full p-1">
      {store.isHexPickerOpen && selectedElement ? (
        <HexColorPickerComponent
          heading="Path Fill"
          color={getCurrentColor()}
          onChange={handlePickerChange}
          presetColors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff', '#000000']}
        />
      ) : (
        <>
          {selectedMenuOption === "Video" ? <VideoResourcesPanel /> : null}
          {selectedMenuOption === "Customize" ? <CustomizePanel /> : null}
          {selectedMenuOption === "Elements" ? <ShapesPanel /> : null}
          {selectedMenuOption === "Audio" ? <AudioResourcesPanel /> : null}
          {selectedMenuOption === "Image" ? <ImageResourcesPanel /> : null}
          {selectedMenuOption === "Text" ? <TextResourcesPanel /> : null}
          {selectedMenuOption === "Animation" ? <AnimationsPanel /> : null}
          {/* {selectedMenuOption === "Effect" ? <EffectsPanel /> : null} */}
          {selectedMenuOption === "Export" ? <ExportVideoPanel /> : null}
          {/* {selectedMenuOption === "Fill" ? <FillPanel /> : null} */}
        </>
      )}
    </div>
  );
});
