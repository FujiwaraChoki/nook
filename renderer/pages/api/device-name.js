const cp = require("child_process");
const os = require("os");

function getComputerName() {
  switch (process.platform) {
    case "win32":
      return process.env.COMPUTERNAME;
    case "darwin":
      return cp.execSync("scutil --get ComputerName").toString().trim();
    case "linux":
      const prettyname = cp.execSync("hostnamectl --pretty").toString().trim();
      return prettyname === "" ? os.hostname() : prettyname;
    default:
      return os.hostname();
  }
}

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      const deviceName = getComputerName();

      return res.json({ deviceName });
    default:
      return res.status(405).end();
  }
};

export default handler;
