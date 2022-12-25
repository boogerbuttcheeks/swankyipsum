import { useState } from 'react'
import './App.css'

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

  function selectAuthor(e) {
    console.log(e)
    setActive(e)
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
    </div>
  )
}

export default App
