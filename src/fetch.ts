function getCache<T>(k: string): T | null {
    const serialized = localStorage.getItem(k)
    try {
        if (serialized) {
            return JSON.parse(serialized)
        }
    } catch (e) {
        // console.error(e)
    }
    return null
}

function setCache<T>(k: string, v: T): T {
    localStorage.setItem(k, JSON.stringify(v))
    return v
}

async function throughCache<T>(k: string, loader: () => Promise<T>): Promise<T> {
    return getCache(k) || setCache(k, await loader())
}

function dayNonce(): string {
    return Math.floor((new Date()).getTime() / 86400).toString()
}

export function getSubreddits(): Promise<string[]> {
    return throughCache(`gts:subreddits:${dayNonce()}`, async () => {
        const resp = await fetch('https://www.reddit.com/subreddits.json?limit=100')
        const body = await resp.json()

        return body.data.children.map(({ data }: any) => data.display_name)
    })
}

export async function getTitles(subreddit: string): Promise<string[]> {
    return throughCache(`gts:titles:${dayNonce()}:${subreddit}`, async () => {
        const resp = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?t=month&limit=100`)
        const body = await resp.json()

        return body.data.children.map(({ data }: any) => data.title)
    })
}
