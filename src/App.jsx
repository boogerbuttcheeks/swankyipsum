import { useState } from 'react'
import './App.css'
import Text from './components/Text'

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

  function selectAuthor(e) {
    console.log(e)
    setActive(e)
  }

  function handleChange(e) {
    setNumber(e.target.value)
    console.log(number)
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
      <button>Generate</button>

    </div>
  )
}

export default App
