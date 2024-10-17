import React, { useState } from 'react';
import Modal from '../common/Modal'; 
import Button from '../common/Button';
import { StoreContext } from '@/store';

interface ResizeTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  onResize: (aspectRatio: string) => void;
}

const ResizeTemplate: React.FC<ResizeTemplateProps> = ({ isOpen, onClose, onResize }) => {
  const store = React.useContext(StoreContext);
  const [selectedOption, setSelectedOption] = useState<"16/9" | "9/16">("16/9");

  const handleResize = () => {
    store.setCanvasAspectRatio(selectedOption);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Choose a format and resize your template.</h2>
        <div className="flex">
          {/* Using the common Button component */}
          <Button
            label="Landscape (16:9)"
            onClick={() => setSelectedOption('16/9')}
            className={`flex-1 m-2 text-center rounded-lg ${selectedOption === '16/9' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          />
          <Button
            label="Portrait (9:16)"
            onClick={() => setSelectedOption('9/16')}
            className={`flex-1 m-2 text-center rounded-lg ${selectedOption === '9/16' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          />
        </div>
        {/* Main action button using common Button component */}
        <Button
          label="Resize"
          onClick={handleResize}
          className="w-full py-2 bg-blue-500 text-white rounded-lg"
        />
      </div>
    </Modal>
  );
};

export default ResizeTemplate;
