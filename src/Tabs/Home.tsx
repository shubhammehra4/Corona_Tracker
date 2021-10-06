import { motion } from "framer-motion";
import { useState } from "react";
import SpeechRecognition, {
  SpeechRecognitionOptions,
  useSpeechRecognition,
} from "react-speech-recognition";
import { Mic } from "../Components/Mic";
import corona from "../Images/corona.svg";
import mic from "../Images/mic.svg";

const commands: SpeechRecognitionOptions["commands"] = [
  {
    command: "(get) stats of *",
    callback: (_c, city) => {
      alert(`Get stats of ${city}`);
    },
    isFuzzyMatch: true,
    fuzzyMatchingThreshold: 0.5,
  },
  {
    command: "(get) :status cases of *",
    callback: (status: string, city: string) => {
      const validStatus = ["active", "inactive", "total"];

      if (validStatus.indexOf(status.toLowerCase()) != -1) {
        alert(`Get ${status} cases of ${city}`);
      } else {
        alert("Invalid status");
      }
    },
  },
  {
    command: "clear",
    callback: ({ resetTranscript }) => resetTranscript(),
  },
];

export default function Home() {
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState<boolean>(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert(
      "Browser doest not Support Speech Recognition, please switch to the latest version!"
    );
    return <></>;
  }

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const resetListening = () => {
    resetTranscript();
    // stopListening();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        key={0}
        className="flex flex-col md:flex-row justify-between items-center px-3"
      >
        <div className="flex flex-col">
          <p className="md:text-[30px] text-[#B4FFFF] font-semibold">
            Get Vaccinated, Boost You Health
          </p>
          <h1 className="text-2xl md:text-5xl lg:text-[80px] leading-none font-bold my-5 lg:my-10">
            Track the Corona <br /> Stats in Your City
          </h1>
          <p className="font-semibold text-lg lg:text-2xl">
            Be aware of the trends of corona around you and take neccessary
            measures
          </p>

          <button
            onClick={startListening}
            className="my-4 lg:my-10 bg-[#E45E5E] w-[fit-content] px-5 lg:px-16 py-1 lg:py-3 rounded-full text-lg md:text-xl font-bold hover:opacity-90 flex items-center"
          >
            <span className="mr-3">
              <img className="text-white w-[1.2em] h-[1.2em]" src={mic} />
            </span>
            Voice Search
          </button>
        </div>
        <div>
          <img src={corona} className="h-[240px]  md:h-[480px] md:w-[500px]" />
        </div>
      </motion.div>
      {isListening && (
        <Mic
          transcript={transcript}
          stop={stopListening}
          reset={resetListening}
        />
      )}
    </>
  );
}
