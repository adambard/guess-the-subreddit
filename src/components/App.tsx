import * as React from 'react'
import { getSubreddits } from '../fetch'
import { randInt } from '../random'
import Options from './Options'
import Result from './Result'
import Title from './Title'

interface OwnState {
    idx: number
    subreddits: string[]
    score: number
    question: number
    revealAnswer: boolean
}

export default class App extends React.PureComponent<{}, OwnState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            idx: randInt(100),
            subreddits: [],
            score: 0,
            question: 1,
            revealAnswer: false
        }
    }

    componentDidMount() {
        getSubreddits().then((subreddits) => {
            this.setState((state) => ({ ...state, subreddits }))
        })
    }

    restart() {
        this.setState((state) => ({
            ...state,
            score: 0,
            question: 1,
            idx: randInt(100)
        }))
    }

    next(n: number) {
        this.setState((state) => ({
            ...state,
            score: state.score + n,
            revealAnswer: true
        }))
        window.setTimeout(
            () => {
                this.setState((state) => ({
                    ...state,
                    revealAnswer: false,
                    question: state.question + 1,
                    idx: randInt(100)
                }))
            }, 1000
        )
    }

    render() {
        const { question, score, subreddits, revealAnswer } = this.state
        const subreddit = this.state.subreddits[this.state.idx]

        if (!subreddit) {
            return <div>
                Loading...
            </div>
        }

        if (question > 20) {
            return <Result score={score} restart={this.restart.bind(this)} />
        }

        return <div>
            <div className="score">
                <span>Score</span>
                {score} {score > 0 ? '/ ' + (question - 1) : ''}
            </div>
            <h1>Guess the Subreddit</h1>

            <Title subreddit={subreddit} />

            <h3 className="sub">Which subreddit was this posted to?</h3>
            <Options subreddit={subreddit}
                subreddits={subreddits}
                revealAnswer={revealAnswer}
                onCorrect={() => this.next(1)}
                onWrong={() => this.next(0)} />
        </div>
    }
}
