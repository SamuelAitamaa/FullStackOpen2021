import React, { useState } from 'react'

const Header = (props) => {
  return (
    <h1> {props.header} </h1>
  )
}


const StatisticLine = (props) => {
    return (
      <div>
      <p>{props.text} {props.value}</p>
      </div>
    )
}

const Statistics = (props) => {
  <h1> {props.header} </h1>

  if (props.all > 0) {
    return(
      <div>
        <StatisticLine text="Good: " value ={props.good} />
        <StatisticLine text="Neutral: " value ={props.neutral} />
        <StatisticLine text="Bad: " value ={props.bad} />
        <StatisticLine text="All: " value ={props.all} />
        <StatisticLine text="Average: " value ={props.average} />
        <StatisticLine text="Positive: " value ={props.positive} />
      </div>
  )
    } else {
      return (
        <div>
        <p>No feedback given</p>
      </div>
      )
    }
}

const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = ((good * 1) + (bad * -1)) / all
  const positive = (good / all) * 100 + ' %'

  const handleGood = () => {
    setGood(good + 1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header = 'Give feedback'/>
      <Button handleClick = {handleGood} text = 'Good'/>
      <Button handleClick = {handleNeutral} text = 'Neutral'/>
      <Button handleClick = {handleBad} text = 'Bad'/>
      <Statistics header = 'Statistics' good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} positive = {positive}/>
    </div>
  )
}

export default App