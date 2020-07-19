const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan=require('morgan');
const Blog= require('./models/blog');
const { result } = require('lodash');

const dbURI = 'mongodb+srv://NehaPendem:pinklumos@cluster0-h9xzy.mongodb.net/node-db?retryWrites=true&w=majority';
//connect to mongoDB
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology:true})
    .then((result) => app.listen(3000))
    .catch((err)=> console.log(err));

//register view engine

app.set('view engine','ejs'); 

//mongoose and mongo sandbox routes






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

//blog routes

app.get('/blogs',(req,res)=>{
    Blog.find().sort({ createdAt: -1 }) //blogs shown in descending order of insertion
        .then((result)=>{
            res.render('index',{title: 'All Blogs',blogs:result});
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.post('/blogs',(req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result)=>{
            res.render('details',{title:'Blog Details',blog:result});
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.delete('/blogs/:id',(req,res)=>{
    const id= req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result =>{
            //send json

            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.log(err);
        })
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'Create a New Blog'});
});

//404 page

app.use((req,res)=>{
    res.render('404',{title: '404'});
    //res.status(404).sendFile('./views/404.html',{root:__dirname});
});