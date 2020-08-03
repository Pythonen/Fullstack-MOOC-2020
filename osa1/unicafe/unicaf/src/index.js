import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleOnClick, text }) => {
  return (
  <button onClick={handleOnClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const average = (good - bad) /(good + neutral + bad);
  const all = good + neutral + bad;
  const positive = (good/(good + bad + neutral))*100;
  if(all === 0){
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>

    )
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={all}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive}/>
          </tbody>
      </table>
    </>

  )
} 

const StatisticLine = ({ text, value }) => {
  return (
   <tr><td>{text}: {value}</td></tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" handleOnClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleOnClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleOnClick={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)