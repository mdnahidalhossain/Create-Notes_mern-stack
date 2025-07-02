import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'

const NoteCard = ({ note, setNotes }) => {

    const deleteNote = async (event, id) => {
        event.preventDefault()

        if (!window.confirm("Are you sure you want to dele this note?")) return;

        try {
            await api.delete(`/notes/${id}`)

            // after deleting data from the Api/databse, update the state without refreshing the page by keeping the previos data
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success('Note deleted successfully!')
        } catch (error) {
            console.error('Execution failed!', error)
            toast.error('Failed to delete note!')
        }
    }
    return (
        <>
            <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>
                <div className='card-body'>
                    <h3 className='card-title text-base-content'>{note.title}</h3>
                    <p>{note.content}</p>

                    <div className='card-actions justify-between items-center mt-4'>
                        <span className='text-sm text-base-content/60'>
                            {formatDate(new Date(note.createdAt))}
                        </span>
                        <div className='flex items-center gap-1'>
                            <PenSquareIcon className='size-4'></PenSquareIcon>
                            <button className='btn btn-ghost text-error'>
                                <Trash2Icon className='size-4' onClick={(event) => deleteNote(event, note._id)}></Trash2Icon>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default NoteCard