const express = require("express");
const req = require("express/lib/request");
var cors = require("cors");
//const https = require("https");
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require("fs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// var key = fs.readFileSync("./selfsigned.key");
// var cert = fs.readFileSync("./selfsigned.crt");

// var options = {
//   key: key,
//   cert: cert,
// };

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/json", cors(), (req, res) => {
  res.json({ msg: "This is CORS-enabled for a single route." });
});

app.post("/web_history", cors(), (req, res) => {
  console.log(req.body);

  let buffer, fileName;

  fileName = "./data.json";
  buffer = fs.readFileSync(fileName);
  bufferString = buffer.toString();
  bufferObject = JSON.parse(bufferString);

  console.log(bufferObject);

  bufferObject.push(req.body);
  var jsonBuffer = JSON.stringify(bufferObject, null, 4);

  fs.writeFile("data.json", jsonBuffer, (err) => {
    if (err) throw err;
    console.log("File written sucessfully");
  });

  res.send("request done...");
});

// var server = https.createServer(options, app);

// server.listen(port, () => {
//   console.log(`Server starting on port : ${port}`);
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
