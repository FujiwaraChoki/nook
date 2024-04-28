import time
import socket

from db import *
from flask_cors import CORS
from flask import Flask, request, jsonify
from pygame import mixer, _sdl2 as devicer

init_db()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/device-name", methods=["GET"])
def get_device_name_path():
    return jsonify({
        "deviceName": socket.gethostname()
    }), 200

@app.route("/sounds", methods=["GET"])
def get_sounds_path():
    return jsonify({
        "sounds": get_sounds(),
        "message": "Sounds retrieved successfullcy."
    }), 200

@app.route("/devices", methods=["GET"])
def get_devices_path():
    mixer.init()
    devices = devicer.get_audio_device_names(True)
    return jsonify({
        "devices": devices,
        "message": "Devices retrieved successfully."
    }), 200

@app.route("/sounds", methods=["POST"])
def add_sound_path():
    data = request.get_json()
    sound_title = data["title"]
    sound_data = data["data"]
    sound = add_sound(sound_title, sound_data)
    return jsonify({
        "sound": sound,
    }), 201

@app.route("/play/<by>/<value>", methods=["GET"])
def play_sound_path(by, value):
    sound = get_sound(by, value)
    print(f"Playing sound: {sound['title']}")

    mixer.init(devicename = get_config()["mic"] or "CABLE Input (VB-Audio Virtual Cable)")
    print(sound["filePath"])
    mixer.music.load(sound["filePath"])
    mixer.music.play()

    while mixer.music.get_busy(): # wait for music to finish playing
        time.sleep(1)

    return jsonify({
        "sound": sound,
    }), 200

@app.route("/sounds", methods=["DELETE"])
def remove_sound_path():
    data = request.get_json()
    sound = remove_sound(data["by"], data["value"])
    return jsonify(sound), 200

@app.route("/device", methods=["GET"])
def get_device_path():
    return jsonify({
        "mic": get_config()["mic"]
    }), 200

@app.route("/device", methods=["POST"])
def set_device_path():
    data = request.get_json()
    set_config(data["mic"])
    return jsonify(get_config()), 200

if __name__ == "__main__":
    app.run(port=8000, debug=True)
