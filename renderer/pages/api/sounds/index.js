import { listSounds } from "../../../utils";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      const sounds = listSounds();

      return res.status(200).json({ sounds });
    default:
      return res.status(405).end();
  }
};

export default handler;
