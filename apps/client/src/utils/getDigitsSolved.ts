import { CellDto } from '../activities/play/models/CellDto';
export function getDigitsSolved(cells: CellDto[][], digitToCount: number) {
    return cells.flat().filter(cell => cell.value === cell.correctValue && cell.correctValue === digitToCount).length
}