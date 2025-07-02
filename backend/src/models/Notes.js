import mongoose from 'mongoose'

// 1. Create a schema
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true //to get the date a note has been created
    }

);

// 2. a model based on that schema
const Note = mongoose.model("Note", noteSchema)

export default Note