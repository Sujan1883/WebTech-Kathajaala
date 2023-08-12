const express = require("express")
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("/currentUser",(req,res)=>{
  MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err) throw err
    else{
      let db = client.db("Kathajaala")
      db.collection("users").findOne({CurrField:"Yes"},(err,obj)=>{
        res.json(obj)
        client.close()
      })}})
})

app.get("/like/:book",(req,res)=>{
  MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err) throw err
    else{
      let db = client.db("Kathajaala")
      db.collection("books").updateOne({name:req.params.book},{$inc:{likes:1}},()=>{
        res.send("Done")
        client.close()
      })
    }
  })
})

app.get("/author/:name",(req,res)=>{
  MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err) throw err
    else{
      let db = client.db("Kathajaala")
      db.collection("users").findOne({username:req.params.name},{projection:{bio:1}},(err,obj)=>{
        res.json(obj)
        client.close()
      })
    }
  })
})

app.get("/book/:name",(req,res)=>{
  MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err) throw err
    else{
      let db = client.db("Kathajaala")
      db.collection("books").findOne({name:req.params.name},(err,obj)=>{
        res.json(obj)
        client.close()
      })
    }
  })
})

app.get("/search/:input",(req,res)=>{
  MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err) throw err;
    else{
      let db = client.db("Kathajaala")
      db.collection("books").find({$text:{$search:req.params.input}}).toArray((err,objs)=>{
        res.json({bookData:objs})
        client.close()
      })
    }
  })
})

app.get("/:genre",(req,res)=>{
  MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err) throw err;
    else{
      let db = client.db("Kathajaala")
      db.collection("books").find({genre:req.params.genre}).toArray((err,objs)=>{
        res.json({bookData:objs})
        client.close()
      })
    }
  })
})

app.post("/login",(req,res)=>{
  MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err) throw err
    else{
      let db = client.db("Kathajaala")
      db.collection("users").findOne({username:req.body.username},(err,response1)=>{
        if(response1!=null){
          db.collection("users").findOne({username:req.body.username,password:req.body.password},(err,response2)=>{
            if(response2==null){
              client.close()
              res.send("11")
            }
            else{
              db.collection("users").updateOne({CurrField:"Yes"},{$set:{currentUser:response1.username}},()=>{
                
            client.close()
            res.send("20");
              })
            }}
          )
        }
        else{
          client.close()
          res.send("10");
        }
        
      })
    }
  })
})

app.post("/signup",(req,res)=>{
  MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err) throw err
    else{
      let db = client.db("Kathajaala")
      db.collection("users").findOne({username:req.body.username},(err,response1)=>{
        if(response1==null){
          db.collection("users").findOne({emailId:req.body.emailId},(err,response2)=>{
            if(response2==null){
              db.collection("users").insertOne(req.body,(err,result)=>{
                db.collection("users").updateOne({CurrField:"Yes"},{$set:{currentUser:req.body.username}},()=>{
                client.close()
                res.send("20")
              })
            })}
            else{
            client.close()
            res.send("11");
            }}
          )
        }
        else{
          client.close()
          res.send("10");
        }
        
      })
    }
  })
})

app.post("/create",(req,res)=>{
  
  MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err) throw err
    else{
      let db = client.db("Kathajaala")
      req.body.likes = 0
      db.collection("books").insertOne(req.body,(err,result)=>{
        if(err) throw err
        else{
          client.close()
        }
      })
    }
  })
  res.send("Done")
})

app.listen(8080)