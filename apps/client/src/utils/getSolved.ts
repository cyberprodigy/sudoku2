import { CellDto } from './../activities/play/models/CellDto';
export function getSolved(cells: CellDto[][]) {
    return cells.flat().filter(cell => cell.value === cell.correctValue).length
}