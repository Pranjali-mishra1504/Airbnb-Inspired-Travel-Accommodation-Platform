const express=require("express");
const app=express();
const users=require("./routes/user.js")
const posts=require("./routes/post.js")
const cookieParser=require("cookie-parser")
const session=require("express-session")
const flash=require("connect-flash")

// app.use(cookieParser("secretcode"))


// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello")
//     res.send("Sent your cookie")
// })

// app.get("/getSignedCookies",(req,res)=>{
//     res.cookie("Good","Evening",{signed:true})
//     res.send("Sent your Signed cookie")
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies)
//     res.send("hi")
// })

// app.get("/greet",(req,res)=>{
//     let {name="anonymous"}=req.cookies;
//     res.send(`${name} heyyyyyy!`)
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies)
//     res.send("Hi I am root!")
// })



// app.use("/users",users);
// app.use("/posts",posts);


//Phase2-part(c)
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); //to find views folder

const sessionOptions={
        secret:"mysupersecretcode",
        resave:false,
        saveUninitialized:true
    }


app.use(session(sessionOptions))
app.use(flash())

// app.use(
//     session({
//         secret:"mysupersecretcode",
//         resave:false,
//         saveUninitialized:true
//     }
// ))

app.use((req,res,next)=>{
    res.locals.msgSuccess=req.flash("success");
    res.locals.msgError=req.flash("error");
    next()
})
app.get("/register",(req,res)=>{
    let{name="anonymous"}=req.query
    req.session.name=name
    console.log(req.session.name)
    if(name==="anonymous"){
        req.flash("error","user not registered")
    }else{
        req.flash("success","user registered successfully")
    }
    // res.send(`hi ${name}`);
    res.redirect("/hello")
})
app.get("/hello",(req,res)=>{
    // res.send(`hello ${req.session.name}`);
    // res.locals.msgSuccess=req.flash("success");
    // res.locals.msgError=req.flash("error");
    res.render('page.ejs',{name:req.session.name});
    // res.render('page.ejs',{name:req.session.name,msg:req.flash("success")});
})

app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    res.send(`you send request ${req.session.count} times`)
})

app.get("/test",(req,res)=>{
    res.send("Test successfull")
})

app.listen(3000,()=>{
    console.log("app is listening on port 3000")
})