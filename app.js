const express = require("express");
const mongoose = require("mongoose");

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


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/testListings", async(req, res) => {
    let sampleListing = new Listing({
        title : "My New Villa",
        description : "By the Beach",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTaPgON7MfinJtGYnJxT-1LDC5PgQpEZmoRw&s",
        price : 1200,
        location : "Goa",
        country : "India",
    });

    await sampleListing.save();
    console.log("Sample Was Saved");
    res.send("Successful Testing");
})

app.listen(8080, () =>{
    console.log("Server is started on http://localhost:8080/");
});