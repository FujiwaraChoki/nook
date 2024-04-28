import os
import json
import base64

from uuid import uuid4
from typing import List
from datetime import datetime

def get_db_path() -> str:
    """
    Get the path to the database file.

    Returns:
        str: The path to the database file.
    """
    return os.path.join("/", "nook", "db.json")

def get_config_path() -> str:
    """
    Get the path to the config file.

    Returns:
        str: The path to the config file.
    """
    return os.path.join("/", "nook", "config.json")

def init_db() -> None:
    """
    Initialize the database file.
    """
    if not os.path.exists(get_db_path()):
        with open(get_db_path(), "w") as f:
            json.dump([], f, indent=4)

    if not os.path.exists(get_config_path()):
        with open(get_config_path(), "w") as f:
            json.dump({"mic": ""}, f, indent=4)

def get_sounds() -> List[dict]:
    """
    Get all sounds from the database.

    Returns:
        List[dict]: A list of all sounds in the database.
    """
    with open(get_db_path(), "r", encoding="utf8", errors="ignore") as f:
        return json.load(f)

def get_sound(by: str, value: str) -> dict:
    """
    Get a sound from the database by a specific key.

    Args:
        by (str): The key to search by.
        value (str): The value to search for.

    Returns:
        dict: The sound that was found.
    """
    sounds = get_sounds()
    for sound in sounds:
        if sound[by] == value:
            return sound
    return None

def add_sound(title: str, data: any) -> dict:
    """
    Add a sound to the database.

    Args:
        title (str): The title of the sound.
        data (any): The data of the sound.

    Returns:
        dict: The sound that was added.
    """
    id = str(uuid4())

    path = os.path.join("/", "nook", "sounds", f"{id}.mp3")

    # Base64 decode the data and write it to a file
    data = base64.b64decode(data)

    with open(path, "wb") as f:
        f.write(data)

    sounds = get_sounds()
    sound = {
        "id": id,
        "title": title,
        "filePath": path,
        "createdAt": str(datetime.now())
    }

    if not get_sound("title", title):
        sounds.append(sound)
        with open(get_db_path(), "w") as f:
            json.dump(sounds, f, indent=4)

    return sound

def remove_sound(by: str, value: str) -> dict:
    """
    Remove a sound from the database by a specific key.

    Args:
        by (str): The key to search by.
        value (str): The value to search for.

    Returns:
        dict: The sound that was removed.
    """
    sounds = get_sounds()
    sound = get_sound(by, value)
    if sound:
        sounds.remove(sound)
        with open(get_db_path(), "w", errors="ignore") as f:
            json.dump(sounds, f, indent=4)
    return sound

def get_config() -> dict:
    """
    Get the config from the database.

    Returns:
        dict: The config from the database.
    """
    with open(get_config_path(), "r", errors="ignore") as f:
        return json.load(f)
    
def set_config(mic: str) -> dict:
    """
    Set the config in the database.

    Args:
        mic (str): The microphone to use.

    Returns:
        dict: The config that was set.
    """
    config = get_config()
    config["mic"] = mic
    with open(get_config_path(), "w", errors="ignore") as f:
        json.dump(config, f, indent=4)
    return config
