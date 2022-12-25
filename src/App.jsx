import { useState } from 'react'
import './App.css'
import Text from './components/Text'
import { supabase } from "./supabaseClient"

const authors = [
  {
    name: 'William Shakespeare',
    image: '/shakespeare.jpg',
    id: 'shakespeare'
  },
  {
    name: 'Jane Austen',
    image: '/austen.jpg',
    id: 'austen'
  },
  {
    name: 'C.S. Lewis',
    image: '/lewis.jpg',
    id: 'lewis'
  },
  {
    name: 'Mary Shelby',
    image: '/shelby.jpg',
    id: 'shelby'
  }
]

function App() {
  const [active, setActive] = useState('shakespeare')
  const [number, setNumber] = useState(1)
  const [text, setText] = useState('text goes here')

  function selectAuthor(e) {
    console.log(e)
    setActive(e)
  }

  function handleChange(e) {
    setNumber(e.target.value)
    console.log(number)
  }

  async function getData() {
    const response = await supabase.from('shakespeare').select()
    console.log(response.data)
    setText(response.data[0].content)
  }

  const authorSelection = authors.map(author => {
    return <>
      <img
        src={author.image}
        alt={author.name}
        id={author.id}
        key={author.id}
        onClick={(e) => { selectAuthor(e.target.id) }}
        className={active === author.id ? 'active' : ''}
      />
    </>
  })

  return (
    <div className="App">
      <h1 onClick={() => { console.log('test') }}>Swanky Ipsum</h1>
      <p>Lorem ipsum for those who prefer the finer things in life.</p>
      <div className='author-selection'>
        {authorSelection}
      </div>
      <label htmlFor="number">Number of paragraphs:</label>
      <input
        id="number"
        type="number"
        name="number"
        value={number}
        onChange={handleChange}
      />
      <Text active={active} number={number} />
      <button onClick={getData}>Generate</button>
      {text}
    </div>
  )
}

export default App
