const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config()
require("./conn/conn")
const User = require("./Routes/User")
const Book = require("./Routes/Book")
const Library = require("./Routes/Library")
const borrower = require("./Routes/Borrower")

app.use(cors())
app.use(express.json())

//routes
app.use("/api/users", User)
app.use("/api/books", Book)
app.use("/api/libraries", Library)
app.use("/api/borrow", borrower)

const port = process.env.PORT 
app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`);
    
})