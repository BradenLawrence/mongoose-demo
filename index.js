var mongoose = require("mongoose")

// Connect mongoose to your server
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/tastyFood_app")

// Define schema, or the basic layout of your collection entries
var recipeSchema = new mongoose.Schema({
    name: String,
    origin: String,
    cost: Number, //In dollars
})

// Define model, the model is the compiled version of your schema. 
// It now have methods you can use to interact with it.
// The name you give it should be the "singular" version of the collection name.
// Mongoose will take that and make the collection the plural version of that name.
// The model below for example will use db.Recipies.insert(), db.Recipies.find(), etc.
var Recipe = mongoose.model("Recipe", recipeSchema)

// There are two ways to add things to our Recipies collection:
// 1. Saving a variable
var myRecipe = new Recipe({
    name: "Cochinita Pibil",
    origin: "Yucatan",
    cost: 20
})

myRecipe.save(function(error, dbResponse){
    if(error){
        console.log("Something went wrong!")
    } else {
        console.log("Successfully saved to the database")
        console.log(myRecipe)   // This is our locally stored javaScript variable
        console.log(dbResponse) // Similar to myRecipe, but this is the actual entry from the db
    }
})

// 2. create(), saves a new entry in one step.
Recipe.create({
    name: "Pasta Putanesca",
    origin: "Italian",
    cost: 5
}, function(error, dbResponse){
    if(error){
        console.log("Something went wrong!")
    } else {
        console.log("Successfully saved to the database")
        console.log(dbResponse)
    }
})

// Retrieve the contents of your collection just like we do from the mongo shell
Recipe.find({}, function(error, dbResponse){
    if(error){
        console.log("Something went wrong!")
    } else {
        console.log("Successfully searched the database")
        console.log(dbResponse) // Should be a list of all recipies in the collection
    }
})