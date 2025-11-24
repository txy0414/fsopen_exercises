import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)
const StatisticLine = ({ text, value, symbol }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{symbol}</td>
    </tr>
  )
}
const Statistic = ({good, neutral, bad, all, average, positive}) => {
  if(all){
    return(
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} symbol="%" />
      </tbody>
    </table>
    )
  }
  return "No feedback given"
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const header1 = 'give feedback'
  const header2 = 'statistic'
  const goodScore = 1
  const neutralScore = 0
  const badScore = -1

  const statHelper = (good, neutral, bad) => {
    const all = good + neutral + bad
    setAll(all)
    setAverage((goodScore * good + neutralScore * neutral + badScore * bad) / all)
    setPositive((good / all) * 100)
  }

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    statHelper(updatedGood, neutral, bad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    statHelper(good, updatedNeutral, bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    statHelper(good, neutral, updatedBad)
  }

  return (
    <div>
      <Header text={header1} />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header text={header2} />
      <Statistic good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App