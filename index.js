import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

const app = express();

app.use(express.static(__dirname + '/public'));

let arr = [];

class Blog{
    constructor(title,time,content,description,id){
        this.title = title;
        this.time = time;
        this.content = content;
        this.description = description;
        this. id = id;
    }

    toString(){
        return `\ttitle : ${this.title},
        time : ${this.time},
        content : ${this.content},
        id : ${this.id}`
    }
}

function generateId(){
    
    let randid = Math.floor(Math.random()*100);
    if(searchId(randid)===false){
        return randid;
    }
    return generateId();
}

function searchId(id){
    for (const blog of arr) {
        if (blog.id === id) {
            return blog;
        }
    }
    return false;
}

app.get("",(req,res)=>{
    // const  d = new Date();
    // const date = `${(d.getFullYear()).toString()}-${(d.getMonth()).toString()}-${(d.getDay()).toString()}-${(d.getHours()).toString()}:00 `;
    // let content = `st placesque nec namd nisi lacus. Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices.`;
    // let obj = new Blog("far",date, content, "this is the descirption", "12");
    // let obj1 = new Blog("far",date, content,"this is the descirption", "12");
    // let obj2 = new Blog("far",date, content,"this is the descirption", "12");
    // arr.push(obj);
    // arr.push(obj1);
    // arr.push(obj2);

    res.render(__dirname + "/views/home.ejs",{arr});
});

app.get('/block', (req, res) => {
    const id = Number(req.query.id);
    console.log(id);
    let obj = searchId(id);
    if (obj) {
        console.log("inside the block query " + obj.id);
        res.render(__dirname + "/views/showblog.ejs", obj);
    } else {
        console.log("Blog not found");
        res.status(404).send("Blog not found");
    }
});

app.get('/newblog',(req,res)=>{
    res.render(__dirname+ "/views/createblog.ejs");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/submit',(req,res)=>{
    const  d = new Date();
    const date = `${(d.getFullYear()).toString()}-${(d.getMonth()).toString()}-${(d.getDay()).toString()}-${(d.getHours()).toString()}:00 `;
    // let obj = new Blog(req.body.title,date,req.body.content,req.body.description,generateId());
    let obj1 = {title: req.body.title,time : date, content:req.body.content,description : req.body.description,id:generateId()};
    console.log(obj1.id);
    console.log(obj1.time);
    arr.push(obj1);
    let temp = searchId(obj1.id);
    console.log("after search "+temp.id);
    res.redirect('/');
});
app.listen(port,()=> console.log(`listening at port number ${port}`));