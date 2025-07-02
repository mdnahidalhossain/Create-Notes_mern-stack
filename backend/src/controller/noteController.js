// http requests from database through API: 
// GET(Read/fetch data for a post), 
// POST(Create a post in the databse), 
// PUT(update a post in the databse), 
// DELETE(dete a post in the database)

import Note from "../models/Notes.js"
export async function getAllNotes(_, res) {
    //sending successful status fetching status to the database
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in 'getAllNotes' controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getNoteById(req, res) {
    //sending successful status fetching status to the database
    try {
        const noteById = await Note.findById(req.params.id)

        if (!noteById) {
            return res.status(404).json({message: "Note not found"})
        }

        res.status(200).json(noteById)

    } catch (error) {
        console.error("Error in 'getNoteById' controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const newNote = new Note({ title: title, content: content })
        await newNote.save();
        res.status(201).json({ 
            message: 'Note created successfully!', note: newNote }
        );
    } catch (error) {
        console.error("Error in 'createNote' controller", error)
        res.status(500).json({ error: error.message });
    }
}

export async function updateNote(req, res) {
    // res.status(200).json({message: 'Note is updated!'})

    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title: title, content: content }, {new: true}
        )

        if (!updatedNote) {
            return res.status(404).json({message: "Note not found"})
        }

        res.status(200).json({
            message: 'Note is updated!', note: updatedNote},  
        )
    } catch (error) {
        console.error("Error in 'updateNote' controller", error)
        res.status(500).json({ error: error.message });
    }
}

export async function deleteNote(req, res) {
    // res.status(200).json({ message: 'Note is deleted!' })

    try {
        const { title, content } = req.body
        const deleteNote = await Note.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: 'Note is deleted!', note: deleteNote},  
        )

    } catch (error) {
        console.error("Error in 'deleteNote' controller", error)
        res.status(500).json({ error: error.message });
    }
}