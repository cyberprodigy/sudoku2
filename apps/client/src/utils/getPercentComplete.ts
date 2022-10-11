export function getPercentComplete(cellsGiven: number, cellsComplete: number) {
    return Math.round(((cellsComplete - cellsGiven) / (81 - cellsGiven)) * 100)
}