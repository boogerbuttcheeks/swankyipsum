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
    name: 'Mary Shelley',
    image: '/shelley.jpg',
    id: 'shelley'
  }
]

function App() {
  const [active, setActive] = useState('shakespeare')
  const [number, setNumber] = useState(1)
  const [text, setText] = useState(['Test', 'Test2'])
  const allParagraphs = []

  function selectAuthor(e) {
    console.log(e)
    setActive(e)
  }

  function handleChange(e) {
    setNumber(e.target.value)
  }

  async function getData() {
    const response = await supabase.from(`${active}`).select('content')

    for (let i = 0; i < number; i++) {
      let randomNumber = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
      allParagraphs.push(response.data[randomNumber].content)
    }
    setText(allParagraphs)
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

  const textElements = text.map((paragraph, index) => {
    return <>
      <p key={index}>{paragraph}</p>
      <br />
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
      <div className='text'>
        {textElements}
      </div>
    </div>
  )
}

export default App
