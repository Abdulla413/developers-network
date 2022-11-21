const express = require('express');
const app = express();
const connectDB=require('./config/db.js');
const path=require('path')
const cors = require('cors')



// connect DataBase
connectDB();

// Init Middleware

app.use(express.json({ extended: false }));
app.use(cors())

// app.get("/", (req, res)=>{
  
//   res.send("api running")

// })

// Define Routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/build/index.html)`))
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
console.log(`Server running on ${PORT}`)
})