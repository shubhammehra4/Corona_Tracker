import React from "react";
import close from "../Images/close.svg";
import mic from "../Images/mic.svg";
import reseticon from "../Images/reset.svg";

interface MicProps {
  transcript: string;
  reset: () => void;
  stop: () => void;
}

export const Mic: React.FC<MicProps> = ({ reset, stop, transcript }) => {
  return (
    <div className="absolute bottom-8 right-8 z-20 bg-[#E45E5E] p-2 px-8 rounded-full flex justify-center items-center">
      <div role="button" onClick={() => stop()} className="w-16 animate-pulse">
        <img className="w-12" src={mic} />
      </div>
      <div className="h-16">
        <p className="font-semibold text-2xl">Start Speaking...</p>
        <p className="max-w-xl text-lg">{transcript}</p>
      </div>
    </div>
  );

  // return (
  // <div className="h-screen w-screen fixed inset-0 bg-black bg-opacity-70 z-20 flex justify-center items-center">
  //   <div className="relative flex flex-col justify-center items-center max-w-xl w-full">
  //     <div className="bg-[#E45E5E] rounded-full p-4 animate-pulse w-40">
  //       <img className="w-40" src={mic} />
  //     </div>
  //     <div className="text-2xl font-semibold my-8 ">{transcript}</div>
  //     <button className="absolute top-[-70px] right-[-30px]" onClick={stop}>
  //       <img className="w-[50px]" src={close} />
  //     </button>
  //     <button className="absolute top-[-70px] left-[-30px]" onClick={reset}>
  //       <img className="w-[50px]" src={reseticon} />
  //     </button>
  //   </div>
  // </div>
  // );
};
