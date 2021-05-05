const express = require('express');
const port = 3000;
const path=require('path');             //used for views(ejs) ,   inbuilt module of npm
const db=require('./config/mongoose');
const Contact=require('./models/contact');  
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());  // things that use app.use are middlewares.it has access to both req and res. we need it for req.body
app.use(express.static('assets'));

// //middleware 1.we can make our own middlewares
// app.use(function(req,res,next)
// {
//   //console.log('middleware1 called');
//   req.myName="vardaan";
//   next(); //it is important as it calls next middleware or controller
// });

// //middleware 2
// app.use(function(req,res,next)
// {
//   console.log('my name from middleware1', req.myName);
//   //console.log('middleware2 called');
//   next();
// })


app.get('/',function(req,res)
{
  Contact.find({},function(err,contacts)
  {
    if(err)
    {
      console.log('error in fetching contacts from db');
      return;
    }
    return res.render('home',{
      title:"my contact list",
      contact_list: contacts
    }); // it will automatically go and for home file in views
  });
     
});



app.post('/create-contact',function(req,res)
{
  
  Contact.create({
    name:req.body.name,
    phone:req.body.phone
  },function(err,newContact){
    if(err)
    {
      console.log('error in creating database');
      return;
    }
    console.log('******',newContact);
    return res.redirect('back');

  });
  
});


app.get('/delete-contact',function(req,res)
{
  let id=req.query.id;

  Contact.findByIdAndDelete(id,function(err)
  {
    if(err)
    {
      console.log('error in deleting contact');
      return;
    }
    return res.redirect('back');

  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})