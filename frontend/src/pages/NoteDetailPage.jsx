import axios from 'axios'
import { ArrowBigLeftIcon, ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router'
import api from "../lib/axios"

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()
  // console.log({ id })

  const fetchNoteData = async () => {
    try {
      const fetchNote = await api.get(`/notes/${id}`)
      // console.log({ id })

      setNote(fetchNote.data)

    } catch (error) {
      console.error("Error fetching data!", error)
      toast.error('Failed to fetch data!')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNoteData()
  }, [id])

  console.log({ note })

  const deleteNote = async () => {
    event.preventDefault()

    if (!window.confirm("Are you sure you want to dele this note?")) return;

    try {
      await api.delete(`/notes/${id}`)

      // after deleting data from the Api/databse, navigate to home page
      navigate('/')
      toast.success('Note deleted successfully!')
    } catch (error) {
      console.error('Execution failed!', error)
      toast.error('Failed to delete note!')
    }
  }

  const saveNote = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setIsSaving(true)
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully!")
      navigate('/')
    } catch (error) {
      console.error("Error saving note!", error)
      toast.error("Failed to update note!")
    } finally {
      setIsSaving(fasle)
    }
  }


  if (isLoading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to={'/'} className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' />
              Back to Notes
            </Link>
            <button onClick={deleteNote} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Note
            </button>
          </div>

          <div className='card bg-base-200'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>Title</label>
                <input type="text" placeholder='Note Title' className='input input-bordered' value={note.title} onChange={(event) => { setNote({ ...note, title: event.target.value }), console.log(event.target.value) }} />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>Content</label>
                <textarea type="text" placeholder='Write your note here...' className='textarea textarea-bordered h-32' value={note.content} onChange={(event) => { setNote({ ...note, content: event.target.value }), console.log(event.target.value) }} />
              </div>

              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={isLoading} onClick={saveNote}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage