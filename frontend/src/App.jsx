import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreateNotePage from './pages/CreateNotePage'
import NoteDetailPage from './pages/NoteDetailPage'

function App() {

  return (
    <>
      <div className="relative h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 " />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/create-note' element={<CreateNotePage />}></Route>
          <Route path='/note/:id' element={<NoteDetailPage />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
