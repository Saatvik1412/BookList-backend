const express = require('express');
const router = express.Router();
const Book = require("../models/books");

router.route("/create").post((req, res) => {
    const title = req.body.title;
    const username = req.body.username;
    const read = req.body.read;
    const author = req.body.author;
    const uid = req.body.uid;
    const sDate = req.body.sDate;
    const eDate = req.body.eDate;
    const rating = req.body.rating;
    const thumbnail = req.body.thumbnail;
    const newBook = new Book({
        title, 
        username,
        author,
        uid,
        read , 
        sDate, 
        eDate, 
        rating,
        thumbnail
    })

    newBook.save();
})

router.route("/viewbooks").get((req,res) =>{
    Book.find()
        .then(foundBooks => res.json(foundBooks))
})

router.delete("/deletebook/:id", async (req, res) => {
       const id = req.params.id;
    await Book.findByIdAndRemove(id).exec();    
    res.send("deleted")
})


router.put("/update", async (req, res) => {
    const newread = req.body.read;
    const newsDate = req.body.sDate;
    const neweDate = req.body.eDate;
    const newrating = req.body.rating;
    const id=req.body.id;
    try{
        await Book.findById(id, (err,updatedBook) => {
            updatedBook.read=newread;   
            updatedBook.sDate=newsDate;
            updatedBook.eDate=neweDate;
            updatedBook.rating=newrating;

            updatedBook.save();
            console.log(updatedBook.sDate, newsDate);
            console.log(updatedBook.eDate, neweDate);
            console.log(updatedBook.rating, newrating);
        });
    } catch(err){
        console.log(err);
    }
});
module.exports = router;