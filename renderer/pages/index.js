import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSoundsContext } from "../contexts/SoundsContext";
import { PlayIcon } from "@heroicons/react/24/solid";

const HomePage = () => {
  const { sounds } = useSoundsContext();
  const [playingSound, setPlayingSound] = useState(null);
  const [deviceName, setDeviceName] = useState("");

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const sendPlayRequest = async (id) => {
    const res = await fetch(`${process.env.BACKEND_URL}/play/id/${id}`);
    const data = await res.json();
    console.log(data.sound);
  };

  const SoundCard = ({ sound }) => {
    const handleTogglePlay = () => {
      if (playingSound !== sound.id) {
        setPlayingSound(sound.id);
        sendPlayRequest(sound.id);
      }
    };

    return (
      <li className="flex flex-col p-4 bg-white rounded-md ring-2 ring-gray-200">
        <span className="text-lg font-semibold">{sound.title}</span>
        <span className="text-sm text-gray-500">
          This sound was added on {new Date(sound.createdAt).toDateString()}.
        </span>
        <button
          onClick={handleTogglePlay}
          className={`flex items-center justify-center w-full p-2 mt-2 rounded-md ${
            playingSound === sound.id ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <PlayIcon className="w-5 h-5 mr-2" />
          <span>Play</span>
        </button>
      </li>
    );
  };

  useEffect(() => {
    const fetchDeviceName = async () => {
      const res = await fetch(`${process.env.BACKEND_URL}/device-name`);
      const data = await res.json();
      console.log(data);
      setDeviceName(data.deviceName);
    };

    fetchDeviceName();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        duration={2}
        className="flex flex-col items-center justify-center pt-20 bg-waves"
      >
        <motion.h1 className="text-4xl font-bold">
          Welcome, {capitalize(deviceName)}! 👋
        </motion.h1>
        <div className="flex flex-col mt-4 px-20">
          {sounds?.length === 0 && (
            <span className="text-lg font-semibold">No sounds found</span>
          )}
          <ul className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
            {sounds?.length > 0 &&
              sounds?.map((sound, idx) => (
                <SoundCard key={idx} sound={sound} />
              ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
