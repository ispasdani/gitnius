import React from "react";
import ShortLogo from "../svgs/shortLogo";

const FullLogo = () => {
  return (
    <div className="flex justify-center items-center">
      <ShortLogo />
      <p className="font-roboto leading-none text-3xl font-extrabold ml-1.5 mt-0.5">
        <span className="text-[#EC4D37]">GIT</span>NIUS
      </p>
    </div>
  );
};

export default FullLogo;
