export default function Text({ active, number, text }) {
  return <>
    <h1>{active}</h1>
    <h1>{number}</h1>
    <p>{text}</p>
  </>
}