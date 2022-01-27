const express = require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const LastName=req.body.LName;
    const email=req.body.Mail;
    const data= {
        members:[
            {
             email_address: email,
             status: "subscribed",
             merge_fields:{
                FNAME: firstName,
                LNAME: LastName,   
             } 
            }
        ]
    };

    const jsonData= JSON.stringify(data);
    const url= "https://us20.api.mailchimp.com/3.0/lists/7071fefeba";
    const Options={
        method: "POST",
        auth: "ashish:7b82e80a08fc4c1ecb4cb7fb50f0abe7-us20",
    }

    const request= https.request(url, Options,function(response){
        if(response.statusCode === 200){
                res.sendFile(__dirname+"/success.html");
        }
        else{
                res.sendFile(__dirname+"/failure.html");       
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();


})
app.listen(3000, function(){
    console.log("server is running on port 3000");
})

app.post("/failure",function(req,res){
    res.redirect("/");
});





// 7b82e80a08fc4c1ecb4cb7fb50f0abe7-us20

//7071fefeba.

//-url "https://$API_SERVER.api.mailchimp.com/3.0/lists/$list_id/members" \