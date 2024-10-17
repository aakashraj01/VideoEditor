"use client";
import React from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import { HexColorPicker } from "react-colorful";
import { TextResource } from "../entity/TextResource";

const TEXT_RESOURCES = [
  { name: "Title", fontSize: 28, fontWeight: 600 },
  { name: "Subtitle", fontSize: 16, fontWeight: 600 },
  { name: "Body", fontSize: 14, fontWeight: 400 },
  { name: "Caption", fontSize: 12, fontWeight: 400 },
  { name: "Heading 1", fontSize: 24, fontWeight: 800 },
  { name: "Heading 2", fontSize: 20, fontWeight: 800 },
  { name: "Heading 3", fontSize: 18, fontWeight: 800 },
  { name: "Heading 4", fontSize: 16, fontWeight: 800 },
  { name: "Heading 5", fontSize: 14, fontWeight: 800 },
  { name: "Heading 6", fontSize: 12, fontWeight: 800 },
];

export const TextResourcesPanel = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedElement = store.selectedElement; // assuming selectedElement can be text

  const handlePickerChange = (color) => {
    if (selectedElement && selectedElement.type === 'text') {
      store.setSelectedTextColor(color); // Assuming such a method exists
    }
  };

  return (
    <div className="bg-slate-200 h-full">
      {store.isHexPickerOpen && selectedElement?.type === 'text' ? (
        <div className="flex flex-col gap-2 p-2">
          <span className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">Text Colors</span>
          <HexColorPicker color={store.selectedTextColor} onChange={handlePickerChange} />
        </div>
      ) : (
        <>
          <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold text-black">
            Text
          </div>
          <ul>
            {TEXT_RESOURCES.map((resource) => (
              <li key={resource.name}>
                <TextResource
                  sampleText={resource.name}
                  fontSize={resource.fontSize}
                  fontWeight={resource.fontWeight}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
});
