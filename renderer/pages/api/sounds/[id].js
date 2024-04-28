import portAudio from "naudiodon";
import { getSound } from "../../../utils";

export const config = {
  api: {
    responseLimit: false,
  },
};

const audioConfig = {
  rate: "16000",
  channels: "1",
};

const pipeToMic = (pathOfAudio) => {};

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      const { id } = req.query;
      console.log(portAudio.getDevices());
      console.log(`=> Playing sound ${id}`);
      const { path, sound } = getSound(id);

      pipeToMic(path);

      res.setHeader("Content-Type", "audio/mpeg");
      res.send(sound);
      break;
    default:
      res.status(405).end();
      break;
  }
};

export default handler;
