const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  // console.log(firstName);
  // console.log(lastName);
  // console.log(email);
  const data = {
    members : [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ],
  }

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/889441138c"
  const options = {
    method:"POST",
    auth:"Aansh:759782cbffef23d1656c0121bfa13f1f-us21"
  }

  const requestHttp = https.request(url,options,function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    // response.on("data",function(datares){
    //   console.log(JSON.parse(datares));
    // });
  });

  requestHttp.write(jsonData);
  requestHttp.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
  console.log("Server up and running on port 3000");
});

// API Key : 759782cbffef23d1656c0121bfa13f1f-us21
// audience-id:889441138c
