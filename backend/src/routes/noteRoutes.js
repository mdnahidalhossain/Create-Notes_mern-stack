import express from 'express'
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from '../controller/noteController.js';

const router = express.Router();

router.get('/', getAllNotes)

//get note by Id
router.get('/:id', getNoteById)

router.post('/', createNote)

// we need to update sepcific data among other data
//to update sepecific data based on their * id *
router.put('/:id', updateNote)

// we need to delete sepcific data among other data
//to delete sepecific data based on their * id *
router.delete('/:id', deleteNote)

export default router