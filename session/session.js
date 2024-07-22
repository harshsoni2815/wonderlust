const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
//
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    /* cookie: { secure: true }  */
   
  }));
  
  app.get('/home',(req,res)=>{
   
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count =1;
    }
    res.send(`number of req ${req.session.count}`);
  });

app.listen(port,()=>{console.log(`port${port}`)});
