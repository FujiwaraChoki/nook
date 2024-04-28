import fs from "fs";
import path from "path";

import { randomUUID } from "crypto";

const getSoundsDirectory = () => {
  return path.join("/", "nook", "sounds");
};

const getDBPath = () => {
  return path.join("/", "nook", "db.json");
};

const buildSoundPath = (soundId) => {
  return path.join(getSoundsDirectory(), `${soundId}.mp3`);
};

export const getSound = (id) => {
  const soundPath = buildSoundPath(id);

  return { path: soundPath, data: fs.readFileSync(soundPath) };
};

export const saveSound = (soundTitle, soundData) => {
  const soundId = randomUUID();
  const soundPath = buildSoundPath(soundId);

  console.log(`=> Saving sound to ${soundPath}`);

  // Turn base64 data into a buffer
  const data = Buffer.from(soundData, "base64");

  fs.writeFileSync(soundPath, data);

  const dbReady = {
    id: soundId,
    title: soundTitle,
    filePath: soundPath,
    createdAt: new Date(),
  };

  // Save sound to database
  const dbPath = getDBPath();
  const db = JSON.parse(fs.readFileSync(dbPath));
  db.push(dbReady);

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  return dbReady;
};

export const deleteSound = (soundId) => {
  // Delete sound from database
  const dbPath = getDBPath();
  const db = JSON.parse(fs.readFileSync(dbPath));

  delete db[soundId];

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  const soundPath = buildSoundPath(soundId);

  fs.unlinkSync(soundPath);
};

export const listSounds = () => {
  const dbPath = getDBPath();
  // If doens't exist, create
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }

  const db = JSON.parse(fs.readFileSync(dbPath));

  return db;
};

export const findSound = (title) => {
  const dbPath = getDBPath();
  const db = JSON.parse(fs.readFileSync(dbPath));

  const sound = Object.keys(db).find((soundId) => {
    return db[soundId].title === title;
  });

  return sound;
};
