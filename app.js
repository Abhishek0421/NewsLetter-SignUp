//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html");
})

app.post("/" , function(req,res){
    const firstName = req.body.Firstname;
    const lastName = req.body.Lastname;
    const email = req.body.Email;
    
    const data = {
        members:[
            {
                email_address: email,
                status : "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/{list-id}";

    const options = {
        method: "POST",
        auth: "abhishek:{api-key}"
    }



    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
})

app.listen(process.env.PORT ||3000,function(){
    console.log("Server is Live");
});

// API Key


// audiance Id
