import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='px-20'>
      <Button variant = "red" >Hello ScheHealth </Button>
    </div>
  )
}

export default App
