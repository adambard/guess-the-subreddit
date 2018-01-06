import * as React from 'react'
import { randInt, shuffle } from '../random'

interface OwnProps {
    subreddit: string
    subreddits: string[]
    revealAnswer: boolean
    onCorrect: () => void
    onWrong: () => void
}

interface OwnState {
    opts: string[]
}

export default class Options extends React.PureComponent<OwnProps, OwnState> {
    constructor(props: OwnProps) {
        super(props)
        this.state = {
            opts: guesses(props.subreddit, props.subreddits)
        }
    }

    componentWillReceiveProps(nextProps: OwnProps) {
        if (nextProps.subreddit !== this.props.subreddit) {
            this.setState((state) => ({
                opts: guesses(nextProps.subreddit, nextProps.subreddits)
            }))
        }
    }

    render() {
        const { revealAnswer, subreddit, onCorrect, onWrong } = this.props
        return <div className="options">
            {this.state.opts.map((opt, ii) => {
                const isCorrect = (opt === subreddit)
                const onClick = revealAnswer ? () => null : (isCorrect ? onCorrect : onWrong)
                const className = `option ${revealAnswer ? (isCorrect ? 'correct' : 'incorrect') : ''}`
                return <div key={ii} className={className} onClick={onClick}>{opt}</div>
            })}
        </div>
    }
}

function guesses(subreddit: string, subreddits: string[]): string[] {
    if (subreddits.length < 4) {
        return []
    }

    let sub1: string | undefined
    let sub2: string | undefined
    let sub3: string | undefined

    while (sub1 === undefined || sub1 === subreddit) {
        sub1 = subreddits[randInt(100)]
        console.log('SUB1', sub1)
    }

    while (sub2 === undefined || sub2 === subreddit || sub2 === sub1) {
        sub2 = subreddits[randInt(100)]
        console.log('SUB2', sub2)
    }

    while (sub3 === undefined || sub3 === subreddit || sub3 === sub1 || sub3 === sub2) {
        sub3 = subreddits[randInt(100)]
        console.log('SUB3', sub3)
    }

    return shuffle([subreddit, sub1, sub2, sub3])
}
