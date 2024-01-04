import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) =>{
    res.render("index.ejs");
})

app.post("/", async(req,res) => {
    const Name = req.body.user;
    console.log(req.body.user);
    try{
        const result = await axios.get("https://v2.jokeapi.dev/joke/Any?contains="+Name+"&amount=1");
        res.render("index.ejs", {content: result.data});
        console.log(result.data);
    }
    catch(error){
        res.render("index.ejs", {content: JSON.parse(error.response.data)});
    }

})