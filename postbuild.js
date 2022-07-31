/* eslint-disable */

const fs = require("fs");
const path = require("path");
const dtsPath = path.join(__dirname, "./dist/index.d.ts");
const esmdtsPath = path.join(__dirname, "./dist/esm/index.d.ts");
let dts = fs.readFileSync(dtsPath, "utf-8");
dts = dts.replace(/declare enum GuidoErrCode \{[\s\S]*?\}/, "");
dts = dts.replace(/declare enum PianoRollType \{[\s\S]*?\}/, "");
fs.writeFileSync(dtsPath, dts);
fs.writeFileSync(esmdtsPath, dts);
