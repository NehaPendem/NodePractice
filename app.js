const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan=require('morgan');

const { result } = require('lodash');

const blogRoutes = require('./routes/blogRoutes');

const dbURI = 'mongodb+srv://NehaPendem:pinklumos@cluster0-h9xzy.mongodb.net/node-db?retryWrites=true&w=majority';
//connect to mongoDB
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology:true})
    .then((result) => app.listen(3000))
    .catch((err)=> console.log(err));

//register view engine

app.set('view engine','ejs'); 

//mongoose and mongo sandbox routes


//blogroutes

app.use('/blogs',blogRoutes);



//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));


app.get('/',(req, res) => {

    res.redirect('/blogs');

});

app.get('/about',(req,res) =>{
    //res.send('<p>About Page</p>');
    //res.sendFile('./views/about.html',{root: __dirname});
    res.render('about',{title: 'About'});
});



//404 page

app.use((req,res)=>{
    res.render('404',{title: '404'});
    //res.status(404).sendFile('./views/404.html',{root:__dirname});
});