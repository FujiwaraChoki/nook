import React from "react";
import Link from "next/link";

import { useSoundsContext } from "../contexts/SoundsContext";
import {
  CogIcon,
  PlusCircleIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";

const SidebarItem = ({ text, link, icon, type, onFileChange }) => {
  if (type === "file_upload") {
    return (
      <label
        htmlFor="file"
        className="flex items-center w-full transition-all duration-100 linear py-2 pr-5 pl-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
      >
        {icon}
        <span>{text}</span>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={onFileChange}
          accept="audio/*"
        />
      </label>
    );
  }

  return (
    <Link
      href={link}
      className="flex items-center w-full transition-all duration-100 linear py-2 pr-5 pl-2 bg-gray-200 rounded-md hover:bg-gray-300"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

const Layout = ({ children }) => {
  const { sounds, setSounds } = useSoundsContext();

  const sidebarItems = [
    {
      text: "Sounds",
      link: "/",
      icon: <MusicalNoteIcon className="w-5 h-5 mr-2" />,
    },
    {
      text: "Settings",
      link: "/settings",
      icon: <CogIcon className="w-5 h-5 mr-2" />,
    },
    {
      text: "Add Sound",
      link: "/new",
      icon: <PlusCircleIcon className="w-5 h-5 mr-2" />,
      type: "file_upload",
    },
  ];

  const sendFile = async (title, data) => {
    const res = await fetch(`${process.env.BACKEND_URL}/sounds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        data: data,
      }),
    }).then((res) => res.json());

    const newSound = res.sound;
    setSounds([...sounds, newSound]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    const soundTitleFull = file.name;
    // Remove file extension from title
    const soundTitle = soundTitleFull.split(".").slice(0, -1).join(".");
    let soundData;

    reader.onload = (event) => {
      soundData = event.target.result.split(",")[1];

      console.log(soundTitle, soundData.substring(0, 10) + "...");
      sendFile(soundTitle, soundData);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="flex flex-col p-5 space-y-2">
        {/* Sidebar content */}
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            text={item.text}
            link={item.link}
            icon={item.icon}
            type={item.type}
            onFileChange={handleFileChange}
          />
        ))}
      </div>
      <div className="w-[2px] bg-gray-200" />
      {/* Main content */}
      <div className="w-3/4 bg-white">{children}</div>
    </div>
  );
};

export default Layout;
