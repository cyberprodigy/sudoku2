import { useSelector } from 'react-redux';
import { AppState } from '../../../models/Nouns';
import { InputType } from '../components/NumberPicker';
import { CellDto } from '../models/CellDto';

const useIconPostNumberInputMethod = (
    penInput: (cell: CellDto, value: number | undefined) => void,
    pencilInput: (cell: CellDto, value: number | undefined) => void,
    cellSelected: (cellId: string) => void,
    inputValueSelected: (num: number) => void
) => {

    const state = useSelector((state: AppState) => state.play);

    const handleCellClick = (cell: CellDto, e: React.MouseEvent<Element, MouseEvent>) => {
        cellSelected(cell.id)
    }

    const handleNumberClick = (num: number) => {
        const selectedCell = state.board.cells.flat().find(c => c.id === state.selectedCellId);
        if (selectedCell) {
            state.inputType === InputType.PEN ? penInput(selectedCell, num) : pencilInput(selectedCell, num);
        }
    }

    return { handleCellClick, handleNumberClick }
}

export default useIconPostNumberInputMethod