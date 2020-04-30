import path from "path";
import fs from "fs";
const BASEPATH = process.env.BASEPATH;

// From: https://github.com/pillarjs/send/blob/master/index.js#L63
var UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;

const assets = (req, res) => {
  let filePath = req.originalUrl;

  try {
    filePath = decodeURIComponent(filePath);
  } catch (err) {
    return res.status(400).send(new Error("invalid url"));
  }
  if (~filePath.indexOf("\0")) {
    return res.status(401).send(new Error("null byte attack dedected!!"));
  }
  if (UP_PATH_REGEXP.test(filePath)) {
    return res.status(403).send(new Error("LFI attack dedected!!!"));
  }

  if (BASEPATH) {
    filePath = req.originalUrl.replace(`/${BASEPATH}`, ``);
  }
  const file = path.resolve(`./dist${filePath}`);
  fs.readFile(file, () => {
    return res.sendFile(file);
  });
};

export default assets;
