// Defining a single data entry into the database (Recipe)
const mongoose = require("mongoose")
const recipeSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a title for this recipe"]
        },
        description: {
            type: String,
            required: [true, "Please enter a brief description for this recipe"]
        },
        ingredients: {
            type: [String],
            required: true
        },
        servingSize: {
            type: Number,
            required: true
        },
        cookTime: {
            type: Number,
            required: true
        },
        instructions: {
            type: [String],
            required: true
        },
        tags: {
            type: [String],
            required: false
        },
        link: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;