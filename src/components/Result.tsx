import * as React from 'react'

interface OwnProps {
    score: number
    restart: () => void
}

export default function Result(props: OwnProps) {
    return <div className="result">
        <h1>You scored {props.score} / 20</h1>
        <div className="restart">
            <a className="button" onClick={props.restart}>Play again!</a>
        </div>
    </div>
}
