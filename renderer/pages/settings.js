import { useState, useEffect } from "react";

const SettingsPage = () => {
  const [chosenDevice, setChosenDevice] = useState("");
  const [devices, setDevices] = useState([]);

  const setDevice = async (device) => {
    const res = await fetch(`${process.env.BACKEND_URL}/device`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mic: device }),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    const fetchDevices = async () => {
      const res = await fetch(`${process.env.BACKEND_URL}/devices`);
      const data = await res.json();
      console.log(data);
      setDevices(data.devices);
    };

    const fetchDevice = async () => {
      const res = await fetch(`${process.env.BACKEND_URL}/device`);
      const data = await res.json();
      console.log(data);
      setChosenDevice(data.device);
    };

    fetchDevices();
    fetchDevice();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Settings</h1>
      <p className="text-lg text-gray-500">Tweak the settings</p>
      <ul className="mt-8 space-y-4">
        {devices.map((device, idx) => (
          <li
            key={idx}
            className={`flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-all duration-100 linear p-4 bg-white rounded-md ring-2 ring-gray-200 ${
              device === chosenDevice ? "bg-green-500" : ""
            }`}
            onClick={() => setDevice(device)}
          >
            <span className="text-lg font-semibold">{device}</span>
            <span className="text-sm text-gray-500">{device.idx}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPage;
