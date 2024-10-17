import { observer } from "mobx-react";
import React from "react";
import Button from "../common/Button";

export const CustomizePanel = observer(() => {
  
  return (
    <>
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
        Customize
      </div>
      <Button label="Resize Template" className="w-full p-2 bg-black text-white rounded-lg" onClick={() => {}} />
    </>
  );
});
