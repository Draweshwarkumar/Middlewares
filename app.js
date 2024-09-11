const express = require('express');
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

app.use("/api", (req, res, next) =>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    res.send("ACCESS DENIED!");
})

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

app.use((req, res) =>{
    res.send("Page not found !!");
})

app.listen(port , () =>{
    console.log(`sever is listening to ${port}`);
});