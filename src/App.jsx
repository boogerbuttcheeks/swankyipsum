import { useState } from 'react'
import './App.css'
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
  const [authorName, setAuthorName] = useState('William Shakespeare')
  const [number, setNumber] = useState(1)
  const [text, setText] = useState(["To be or not to be, that is the question. Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles and by opposing end them? To die, to sleep no more, and by a sleep to say we end the heartache and the thousand natural shocks that flesh is heir to? 'Tis a consummation devoutly to be wished. To die, to sleep, to sleep, perchance to dream. Ay, there's the rub, for in that sleep of death what dreams may come, when we have shuffled off this mortal coil, must give us pause. There's the respect that makes calamity of so long life."])
  const [loading, setLoading] = useState(false)
  const allParagraphs = []

  function selectAuthor(e) {
    setActive(e)
  }

  function handleChange(e) {
    setNumber(e.target.value)
  }

  async function getData() {
    setLoading(true)
    const response = await supabase.from(`${active}`).select('content')
    setText([''])
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    let maxNumber = 14

    for (let i = 0; i < number; i++) {
      let randomNumber = Math.floor(Math.random() * (maxNumber - 1 + 1)) + 1;
      let index = numbers.indexOf(randomNumber)
      allParagraphs.push(response.data[numbers[randomNumber]].content)
      numbers.splice(index, 1)
      maxNumber -= 1
    }
    setText(allParagraphs)
    setLoading(false)
  }

  const authorSelection = authors.map(author => {
    return <>
      <img
        src={author.image}
        alt={author.name}
        id={author.id}
        key={author.id}
        onClick={(e) => {
          selectAuthor(e.target.id)
          setAuthorName(author.name)
        }}
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
      <p className='desc'>Lorem ipsum for those who prefer the finer things in life.</p>
      <p className='me'>Made by <a href='https://www.trevortylerlee.com/'>Trevor Lee</a></p>
      <div className='author-selection'>
        {authorSelection}
      </div>
      <p className='author'>{authorName}</p>
      <label htmlFor="number">Number of paragraphs: </label>
      <input
        id="number"
        type="number"
        name="number"
        value={number}
        min='1'
        max='10'
        onChange={handleChange}
      />
      {/* <Text active={active} number={number} /> */}
      <button onClick={getData}>{loading ? 'Generating...' : 'Generate'}</button>
      <hr />
      <div className='text'>
        {textElements}
      </div>
    </div>
  )
}

export default App
