import { useEffect, useState, createContext, useContext } from "react";

export const SoundsContext = createContext({});

export const useSoundsContext = () => useContext(SoundsContext);

export const SoundsContextProvider = ({ children }) => {
  const [sounds, setSounds] = useState([]);

  return (
    <SoundsContext.Provider value={{ sounds, setSounds }}>
      {children}
    </SoundsContext.Provider>
  );
};

export const useSounds = () => {
  const { sounds, setSounds } = useSoundsContext();

  useEffect(() => {
    const fetchSounds = async () => {
      const response = await fetch(`${process.env.BACKEND_URL}/sounds`);
      const data = await response.json();

      setSounds(data.sounds);
    };

    fetchSounds();
  }, []);

  return { sounds, setSounds };
};
