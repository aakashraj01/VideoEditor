import React from 'react';
import { HexColorPicker } from 'react-colorful';

interface HexColorPickerProps {
  heading: string;
  color: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

const HexColorPickerComponent: React.FC<HexColorPickerProps> = ({ heading, color, onChange, presetColors }) => {
  return (
    <div className="p-4">
      {heading && <div className="mb-4 font-bold text-lg">{heading}</div>}
      <HexColorPicker color={color} onChange={onChange} />
      {presetColors && (
        <div className="mt-4 flex justify-start gap-2">
          {presetColors.map((presetColor, index) => (
            <button 
              key={index} 
              className="w-6 h-6 rounded-full cursor-pointer"
              style={{ backgroundColor: presetColor }}
              onClick={() => onChange(presetColor)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HexColorPickerComponent;
