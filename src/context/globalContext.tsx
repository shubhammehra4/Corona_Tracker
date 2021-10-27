import React, { createContext, useContext, useState } from "react";
import SpeechRecognition, {
  SpeechRecognitionOptions,
  useSpeechRecognition,
} from "react-speech-recognition";

type GlobalContext = {
  tab: number;
  setTab: (value: React.SetStateAction<number>) => void;
  listening: boolean;
  transcript: string;
  resetTranscript: () => void;
  startListening: () => void;
  stopListening: () => void;
};

const GlobalContext = createContext<GlobalContext>(null!);

interface GloabContextWrapperProps {
  children: React.ReactChild[] | React.ReactChild;
}

const GloabContextWrapper = ({ children }: GloabContextWrapperProps) => {
  const [tab, setTab] = useState<number>(0);
  const commands: SpeechRecognitionOptions["commands"] = [
    {
      command: "statistics of :city",
      callback: (c, city, ...rest) => {
        console.log(c);
        console.log(city);
        console.log(rest);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.3,
    },
    {
      command: ":status cases in *",
      callback: (status: string, city: string) => {
        const validStatus = ["active", "inactive", "total"];

        if (validStatus.indexOf(status.toLowerCase()) != -1) {
          console.log(status, city);
        } else {
          console.log("Invalid status", status, city);
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.3,
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: "close",
      callback: ({ resetTranscript }) => {
        resetTranscript();
        SpeechRecognition.stopListening();
      },
    },
  ];

  const { transcript, resetTranscript, listening } = useSpeechRecognition({
    commands,
  });

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopListening = () => {
    resetTranscript();
    SpeechRecognition.stopListening();
  };

  return (
    <GlobalContext.Provider
      value={{
        tab,
        setTab,
        listening,
        transcript,
        resetTranscript,
        startListening,
        stopListening,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GloabContextWrapper;
export const useGlobalContext = () => useContext(GlobalContext);
