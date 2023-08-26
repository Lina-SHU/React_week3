import { useState } from 'react'
import Form from './Form'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Form />
    </>
  )
}

export default App
