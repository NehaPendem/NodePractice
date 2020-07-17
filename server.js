const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res) =>{
    //lodash

    const num = _.random(0,20);
    console.log(num);

    const greet  = _.once(() => {
        console.log('Hello');
    });
//won't run twice as we used lodash.once()
    greet();
    greet();

     //set header content type

     res.setHeader('Content-Type','text/html');

    let path = './views/';

    switch(req.url){
        case  '/':
            path += 'index.html';
            res.statusCode=200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode=200;
            break

        case '/about-me':
                
                res.statusCode=301;
                res.setHeader('Location','/about');
                res.end();
                //301 means that resorce we're trying to access has been permanently moved.
                break
        default: 
            res.statusCode=404;
            path+= '404.html';
            break;
    }


     // send an html file

     fs.readFile(path,(err,data) =>{
         if(err){
             console.log(err);
             res.end();
         }
         else{
             //res.write(data);

             res.end(data);
         }
     });

    
    
});

server.listen(3000, 'localhost',()=>{
    console.log('Listening for requests on Port 3000');


});