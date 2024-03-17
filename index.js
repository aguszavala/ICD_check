import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const URL = "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&maxList&"

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/search", async (req,res)=>{
    const terms = req.body.content
    const response = await axios.get(URL+`terms=${terms}`)
    const result = response.data[3]
    console.log(result.length)
    const codes = result.length
    res.render("index.ejs",{data: result,numberOfCodes: codes})
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})