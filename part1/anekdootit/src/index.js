import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}> {text} </button>
)

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votes = new Uint8Array(6)

const TodaysAnecdote = ({selectedVote, selectedAnecdote}) => {
    return (
    <div>
        <h3>Anecdote of the day</h3>
        <p>
            {selectedAnecdote}
        </p>
        <p>
            has {selectedVote} votes
        </p>
    </div>
    )
}

const BestAnecdote = ({bestIndex, bestVotes}) => {
    return (
        <div>
            <h3>Anecdote with most votes</h3>
            <p>
                {bestIndex}
            </p>
            <p>has {bestVotes} votes</p>
        </div>
    )
}

const App = ({votes, anecdotes}) => {
    const [selected, setSelected] = useState(0)
    const [maxVotes, setMaxVotes] = useState(0)
    const [index, setIndex] = useState(0)
    
    const nextAnecdote = () => {
        const numero = Math.floor(Math.random() * anecdotes.length)
        setSelected(numero)
    }

    const handleVote = () => {        
        votes[selected] += 1
        const maxAanet = Math.max(...votes)
        setMaxVotes(maxAanet)
        const maxIn = votes.indexOf(maxAanet)
        setIndex(maxIn)
        // some console logs for debugging
        // console.log(votes)
        // console.log(maxAanet)
        // console.log(maxIn)
    }    

    return (
        <div>
            <TodaysAnecdote selectedVote={votes[selected]} selectedAnecdote={anecdotes[selected]}/>
            <Button handleClick={handleVote} text="vote"/>
            <Button handleClick={nextAnecdote} text="next anecdote" />
            <BestAnecdote bestIndex={anecdotes[index]} bestVotes={maxVotes} />
        </div>
    )
}

ReactDOM.render(
    <App anecdotes={anecdotes} votes={votes}/>,
    document.getElementById('root')
)