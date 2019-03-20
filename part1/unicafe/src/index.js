import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}> {text} </button>
)

const Taulukko = ({ good, neutral, bad, allClicks }) => {

    if (allClicks.length === 0){
        return <p>Ei yhtään palautetta annettu</p>
    }

    return (    
        <table>
            <tbody>
                <tr>
                    <td>hyvä</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>neutraali</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>huono</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>yhteensä</td>
                    <td>{good + neutral + bad}</td>
                </tr>
                <tr>
                    <td>keskiarvo</td>
                    <td>{allClicks.reduce((a,b) => a+b, 0) / allClicks.length}</td>
                </tr>
                <tr>
                    <td>positiivisia</td>
                    <td>{100 * (good / allClicks.length)} %</td>
                </tr>
            </tbody>    
        </table>
    )    
}

// const Statistics = ({ good, neutral, bad, allClicks }) => {

//     if (allClicks.length === 0){
//         return <p>Ei yhtään palautetta annettu</p>
//     }

//     return (
//         <div>
//             <Statistic text='hyvä' value={good}/>
//             <Statistic text='neutraali' value={neutral}/>
//             <Statistic text='huono' value={bad}/>
//             <Statistic text='yhteensä' value={good + neutral + bad}/>
//             <Statistic text='keskiarvo' value={allClicks.reduce((a,b) => a+b, 0) / allClicks.length}/>
//             <Statistic text='positiivisia' value={100 * (good / allClicks.length)}/>
//         </div>
//     )    
// }

// const Statistic = ({text, value}) => {
//     return <p>{text} {value}</p>
// }

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleGood = () => {
        setAll(allClicks.concat(1))
        setGood(good + 1)
    }

    const handleNeutral = () => {
        setAll(allClicks.concat(0))
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
        setAll(allClicks.concat(-1))
        setBad(bad + 1)
    }
  
    return (
        <div>

        <h1>anna palautetta</h1>
        <Button handleClick={handleGood} text='hyvä'></Button>
        <Button handleClick={handleNeutral} text='neutraali'></Button>
        <Button handleClick={handleBad} text='huono'></Button>

        <h1>statistiikka</h1>
        {/* <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} /> */}
        <Taulukko good={good} neutral={neutral} bad={bad} allClicks={allClicks}></Taulukko>
        </div>
    )
  }
  

ReactDOM.render(<App />, document.getElementById('root'));