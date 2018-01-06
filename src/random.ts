export function randInt(n: number): number {
    return Math.floor(Math.random() * Math.floor(n))
}

export function shuffle<T>(ts: T[]): T[] {
    const array = ts.slice()
    let i = 0
    let j = 0
    let temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}
