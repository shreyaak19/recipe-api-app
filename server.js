const express = require("express")
const mongoose = require("mongoose")
const Recipe = require("./models/recipeModel")

const app = express()
app.use(express.json())

// routes

// default request
app.get('/', (req, res) => {
    res.send('Hello Node API')
})

// route to handle request to get all recipes stored in the database
app.get('/recipes', async(req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// route to handle request to get a specific recipe by its ID from the database
app.get('/recipes/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const recipes = await Recipe.findById(id);
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// route to handle request to insert a new recipe into the database
app.post('/recipes', async(req, res) => {
    try {
        const recipe = await Recipe.create(req.body)
        res.status(200).json(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// route to handle request to update a recipe (one/all of its fields) in the database
app.put('/recipes/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const recipe = await Recipe.findByIdAndUpdate(id, req.body);
        if (!recipe) {
            return res.status(404).json({message: "cannot find any recipe with given ID"})
        }
        const updatedRecipe = await Recipe.findById(id);
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// route to handle request to delete a recipe given its ID from the database
app.delete('/recipes/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const recipe = await Recipe.findByIdAndDelete(id);
        if (!recipe) {
            return res.status(404).json({message: 'cannot find any recipe with given ID'});
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
require('dotenv').config();
// Establish connection to MongoDB database
mongoose.set("strictQuery", false)
mongoose
.connect(process.env.MONGODB_URI).then(() => {
    console.log("connection to MongoDB established")
    app.listen(3000, ()=> {
        console.log("Node API app is running on port 3000")
    });
}).catch((error) => {
    console.log(error)
})