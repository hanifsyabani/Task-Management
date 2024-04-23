'use client'

import { createContext, useState, Dispatch, SetStateAction } from "react";

// Define a default value for the context
const defaultDarkModeValue = {
  darkMode: false,
  setDarkMode: () => {} // Placeholder function
};

type DarkModeContextType = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>; // Specify the correct type for setDarkMode
};

const DarkModeContext = createContext<DarkModeContextType>(defaultDarkModeValue);

export default function DarkModeProvider({ children }: any) {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const Darkmode = DarkModeContext;
