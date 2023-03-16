const express = require('express')
const app= express()
const mongoose =require('mongoose')
const URL = require("./models/shortUrl")
mongoose.connect('mongodb://localhost/urlShortner',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) 
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.set('view engine','ejs')
app.listen(process.env.PORT||5000,()=>{
    console.log("server starting at 5000")
})    
 
app.get("/",(req,res)=>{
    const result="" 
    res.render('index',{result})
    
})   
function generateShortId() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 7; i++) { 
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
app.post('/shorten',async(req,res)=>{
    try {
        const { longUrl } = req.body;
        console.log(longUrl);
        let url = await URL.findOne({ longUrl });
        if (url) {
            const result= {
                longUrl:url.longUrl,
                shortUrl:url.shortUrl
            }
            res.render('index', {result})
        }
        else{
            const shortId = generateShortId();
            const short = `www.myshorten.${shortId}`
            url = await URL.create({
                longUrl,
                shortUrl:short ,
              });
              const result= {
                longUrl:url.longUrl,
                shortUrl:url.shortUrl
            }
            res.render('index',{ result})
             
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
          msg: 'Server Error',
        });
    }

},
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await URL.findOne({ shortUrl: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
    else{
        res.redirect(shortUrl.longUrl)

    }
  
  })

)