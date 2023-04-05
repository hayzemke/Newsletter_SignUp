const express = require("express");
const bodyParset = require("body-parser");
const bodyParser = require("body-parser");
const https = require("https");
const dotnev = require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/0814f061ef";


  const options = {
    method: "POST",
    auth: "haley1:" + MC_API_Key,
  };

  const request = https.request(url, options, function (response) {

     if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
     }

     else res.sendFile(__dirname + "/failure.html");

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
  });

request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
  })

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on Port 3000");
});

// API KEY
// 9ee76d117b9749d4d19cf3692ca83e9e-us9

//audience id
// 0814f061ef
