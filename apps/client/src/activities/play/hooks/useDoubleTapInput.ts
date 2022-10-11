import { useSelector } from 'react-redux';
import { AppState } from '../../../models/Nouns';
import { tap } from "../../../utils/tap";
import { CellDto } from './../models/CellDto';

const useDoubleTapInput = (penInput: (cell: CellDto, value: number | undefined) => void,
    pencilInput: (cell: CellDto, value: number | undefined) => void,
    cellSelected: (cellId: string) => void,
    inputValueSelected: (num: number) => void
) => {
    const state = useSelector((state: AppState) => state.play);

    const handleCellClick = (cell: CellDto, e: React.MouseEvent<Element, MouseEvent>) => {
        tap(e, { onSingleTap: () => pencilInput(cell, state.selectedInput), onDoubleTap: () => penInput(cell, state.selectedInput) });
        cellSelected(cell.id)
    }

    const handleNumberClick = (num: number) => {
        inputValueSelected(num)
    }

    return { handleCellClick, handleNumberClick }
}

export default useDoubleTapInput