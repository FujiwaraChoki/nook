import { saveSound } from "../../../utils";

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const { soundTitle, soundData } = req.body;
      const sound = saveSound(soundTitle, soundData);

      return res
        .status(201)
        .json({ sound: sound, message: "Sound uploaded successfully!" });
    default:
      return res.status(405).end();
  }
};

export default handler;
