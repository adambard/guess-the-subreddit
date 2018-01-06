import * as React from 'react'
import { getTitles } from '../fetch'
import { randInt } from '../random'

interface OwnProps {
    subreddit: string
}

interface OwnState {
    idx: { [k: string]: number }
    titles: string[]
}

export default class Title extends React.PureComponent<OwnProps, OwnState> {
    constructor(props: OwnProps) {
        super(props)
        this.state = {
            idx: { [props.subreddit]: randInt(100) },
            titles: []
        }
    }

    loadTitles(subreddit: string) {
        getTitles(subreddit).then((titles) => {
            console.log(subreddit, titles)
            this.setState((state) => ({
                ...state,
                idx: {
                    ...state.idx,
                    [subreddit]: randInt(100)
                },
                titles
            }))
        })
        this.setState((state) => ({ ...state, titles: [] }))
    }
    componentDidMount() {
        this.loadTitles(this.props.subreddit)
    }

    componentWillReceiveProps(nextProps: OwnProps) {
        if (nextProps.subreddit !== this.props.subreddit) {
            this.loadTitles(nextProps.subreddit)
        }
    }
    render() {
        const title = this.state.titles[this.state.idx[this.props.subreddit]]
        return <div className="title">
            {title || 'Loading...'}
        </div>
    }
}
