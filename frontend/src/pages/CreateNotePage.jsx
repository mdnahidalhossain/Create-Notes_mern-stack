import axios from 'axios'
import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'

const CreateNotePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(title)
    console.log(content)

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setIsLoading(true)

    // posting a new note to database
    // to be able to fetch/get and display that data on homepage
    try {
      await axios.post('http://localhost:5001/api/notes', {
        title,
        content
      })

      // a popup dialog to show noted has been created successfully
      toast.success('Note created successfully!')

      // after creating a note successfully, navite to home page
      navigate('/')

    } catch (error) {
      if (error.response.status === 429) {
        console.error("Execution failed!", error)
        toast.error("Slow down! You're creating notes too fast.", {
          duration: 2000,
        })
      } else {
        console.error("Execution failed!", error)
        toast.error('Failed to create note! Plase try again.')
      }
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='conatainer mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit} action="">
                <div className='form-control mb-4'>
                  <label className='label'>Title</label>
                  <input type="text" placeholder='Note Title' className='input input-bordered' value={title} onChange={(event) => { setTitle(event.target.value), console.log(event.target.value) }} />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>Content</label>
                  <textarea type="text" placeholder='Write your note here...' className='textarea textarea-bordered h-32' value={content} onChange={(event) => { setContent(event.target.value), console.log(event.target.value) }} />
                </div>

                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNotePage