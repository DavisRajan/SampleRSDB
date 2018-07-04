const express = require('express');
const cors=require('cors')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());



var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json())
// POST /login gets urlencoded bodies
app.post('/api/hello', urlencodedParser, function (req, res) {
  var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/";
 
 MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("JobPortal");
   console.log(req.body.pwd);
      var query = { UserName: req.body.user,Password:req.body.pwd  };
   console.log("API invoked successfully...." +query);
   dbo.collection("Users").find(query).toArray(function(err, result) {
    if (!result) return result.sendStatus(400)
     if (err) throw err;
     if(result.length>0){
     MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("JobPortal");
      console.log(req.body.pwd);
         var query = { UserName: req.body.user,Password:req.body.pwd  };
      console.log("API invoked successfully...." +query);
      //dbo.collection("JobDetails").find({}, function(err, jobresult) {
        var sort = { JobId: 1 };
  dbo.collection("JobDetails").find().sort(sort).toArray(function(err, jobresult) {

        res.send({ jobresult,result });
        console.log(jobresult);
        db.close();
      });
    });
  }
     
   });
 });
});




 

app.listen(port, () => console.log(`Listening on port ${port}`));