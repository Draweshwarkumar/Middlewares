const express = require('express');
const ExpressError = require('./ExpressError');
const app = express();
const port = 8080;

// app.use((req, res, next) =>{
//     console.log("Hi, I am 1st middleware");
//    next();
// });
// app.use((req, res, next) =>{
//     console.log("Hi, I am 2nd middleware");
//     next();
// });

const checkToken =  (req, res, next) =>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
     throw new ExpressError(401,"ACCESS DENIED");
};
app.get("/api", checkToken, (req,res) =>{
    res.send("data");
});

app.use((req, res, next) =>{
    console.log("I am only for random");
    next();
})
app.use((req,res,next) =>{
    req.time = Date.now();
    console.log(req.method, req.hostname, req.path, req.time);
    next();
});

app.get("/" , (req,res) =>{
    res.send("Hi, I am root.");
});

app.get("/random", (req,res) =>{
    res.send("This is random page");

});

app.get("/err", (req,res) =>{
    abcd = abcd;
});

app.get("/admin", (req, res) =>{
    throw new ExpressError(403, "Access to admin is Forbidden");
});

// app.use((err,req, res, next) =>{
//     console.log("-----ERROR------");
//     res.send(err);
// });

app.use((err, req, res, next) =>{
    let {status, message} = err;
    res.status(status).send(message);
})

// app.use((req, res) =>{
//     res.status(404).send("Page not found !!");
    
// });

app.listen(port , () =>{
    console.log(`sever is listening to ${port}`);
});