import path from "path";
import fs from "fs";

const assets = (req, res) => {
  const file = path.resolve(`./dist${req.originalUrl}`);
  fs.readFile(file, () => {
    return res.sendFile(file);
  });
};

export default assets;
