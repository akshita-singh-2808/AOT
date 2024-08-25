const express= require("express");
const app=express();
const port=8080;

const path= require("path");

//for patch request
const methodOverride = require('method-override');
app.use(methodOverride("_method"));


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());


const {v4:uuidv4}=require('uuid');
uuidv4();

let posts=[
    {
        id:uuidv4(),
        author:"Eren Yeager",
        content:"If you win, you live. If you lose, you die. If you don't fight, you can't win!",
        image:"https://th.bing.com/th/id/OIP.DH_ZRmNS8nUAPslorVel-QHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    
    },
    {
        id:uuidv4(),
        author:" Mikasa Ackerman",
        content:"This world is cruel. And yet, so beautiful.",
        image:"https://th.bing.com/th/id/OIP.3dTmA-A9TtIJKXJSSTUrmgHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    
    },
    {
        id:uuidv4(),
        author:" Levi Ackerman",
        content:"The only thing we're allowed to do is believe that we won't regret the choice we made.",
        image:"https://th.bing.com/th/id/OIP.OWGlIe7J_eM4CkbOOeYC4QHaDj?w=350&h=168&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    
    },
    {
        id:uuidv4(),
       author:"Armin Arlert",
        content:" The difference between your decision and ours is experience. But you don't have to rely on that",
        image:"https://th.bing.com/th/id/OIP.yzVDitKJ_Tmd1N4af-0MXwHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
// for see details link
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((q) => id === q.id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render("see", { post });
});

//for new post
//when you click create post new.ejs file will open


//when you click submit button in new.ejs file it will redirect you to "/posts"
//the post request will come from server
//in the get request=>the data of new post was sent to server

app.post("/posts",(req,res)=>{
    let{author,content,image}=req.body;
    let id=uuidv4();
    posts.push({author,content,image,id});
    res.redirect("/posts");
});

//for editing the post 

// - user click edit button the request to server goes throught get request - the edit form opens user cick submit button the values are updated and form redirects to Home Page

app.get("/posts/:id/edit",(req,res)=>{
   let {id}=req.params;
    let post=posts.find((q)=>id===q.id);
    res.render("edit.ejs",{post})
});

//upgrade
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((q)=>id===q.id);
    let newContent=req.body.content;
    post.content=newContent;
    res.redirect("/posts");

});

//delete
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((q)=>id===q.id);
    posts=posts.filter(p=>p.id!= id);
    res.redirect("/posts");

})

app.listen(port,()=>{
    console.log("app is listening on port",port)
});