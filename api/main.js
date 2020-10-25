const express = require("express");
const base64 = require("byte-base64");
var stream = require("stream");
var cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());

app.get("/midi", (req, response) => {
  var fileContents = Buffer.from(req.query["v"], "base64");

  // Website you wish to allow to connect

  console.log(fileContents);

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.writeHead(200, {
    "Content-Disposition": `attachment; filename="generated.midi"`,
    "Content-Type": "audio/midi",
  });

  response.end(fileContents);
});

app.listen(port, () => {});
