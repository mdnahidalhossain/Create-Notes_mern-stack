
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    try {
      const notesApi = await axios.get('http://localhost:5001/api/notes')

      console.log(notesApi.data)
      setNotes(notesApi.data)
      setIsRateLimited(false)

    } catch (error) {
      console.log("Error fetching API", error)
      if (error.response?.status === 429) {
        setIsRateLimited(true)
      } else {
        toast.error("Failed to load notes")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])


  return (
    <div className='min-h-screen'>
      <Navbar></Navbar>
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {isLoading && <div className='text-center text-primary py-10'>
          Loding notes...
        </div>}

        {notes.length === 0 && !isRateLimited &&
          <NotesNotFound />
        }
        {/* making a responsive grid layout for each note card */}
        {notes.length > 0 && !isRateLimited &&
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard note={note} key={note._id} setNotes={setNotes}></NoteCard>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default HomePage