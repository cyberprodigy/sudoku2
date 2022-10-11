import { useSelector } from 'react-redux';
import { AppState } from '../../../models/Nouns';
import { InputType } from '../components/NumberPicker';
import { CellDto } from '../models/CellDto';

const useIconPreNumberInputMethod = (
    penInput: (cell: CellDto, value: number | undefined) => void,
    pencilInput: (cell: CellDto, value: number | undefined) => void,
    cellSelected: (cellId: string) => void,
    inputValueSelected: (num: number) => void
) => {

    const state = useSelector((state: AppState) => state.play);

    const handleCellClick = (cell: CellDto, e: React.MouseEvent<Element, MouseEvent>) => {
        cellSelected(cell.id);
        state.inputType === InputType.PEN ? penInput(cell, state.selectedInput) : pencilInput(cell, state.selectedInput);
    }

    const handleNumberClick = (num: number) => {
        inputValueSelected(num)
    }

    return { handleCellClick, handleNumberClick }
}

export default useIconPreNumberInputMethod