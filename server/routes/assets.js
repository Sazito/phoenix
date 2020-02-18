import path from "path";
import fs from "fs";
const BASEPATH = process.env.BASEPATH;

const assets = (req, res) => {
  let filePath = req.originalUrl;
  if (BASEPATH) {
    filePath = req.originalUrl.replace(`/${BASEPATH}`, ``);
  }
  const file = path.resolve(`./dist${filePath}`);
  fs.readFile(file, () => {
    return res.sendFile(file);
  });
};

export default assets;
