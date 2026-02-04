const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Listing = require("./models/listing.js")

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"


main().then(() => {
    console.log("Connected");
}).catch(err => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/listings", async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", {listings})
})

// app.get("/testListings", async(req, res) => {
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the Beach",
//         image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTaPgON7MfinJtGYnJxT-1LDC5PgQpEZmoRw&s",
//         price : 1200,
//         location : "Goa",
//         country : "India",
//     });

//     await sampleListing.save();
//     console.log("Sample Was Saved");
//     res.send("Successful Testing");
// })

app.listen(8080, () =>{
    console.log("Server is started on http://localhost:8080/");
});