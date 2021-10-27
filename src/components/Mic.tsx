import { motion } from "framer-motion";
import React from "react";
import mic from "../Images/mic.svg";

interface MicProps {
  transcript: string;
  stop: () => void;
}

export const Mic: React.FC<MicProps> = ({ stop, transcript }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      key={"mic"}
      className="absolute bottom-8 right-8 z-20 bg-[#E45E5E] p-2 px-8 rounded-full flex justify-center items-center"
    >
      <div role="button" onClick={() => stop()} className="w-16 animate-pulse">
        <img className="w-12" src={mic} />
      </div>
      <div className="h-16">
        <p className="font-semibold text-2xl">Start Speaking...</p>
        <p className="max-w-xl text-lg">{transcript}</p>
      </div>
    </motion.div>
  );
};
