import { CellDto } from './../models/CellDto';
import { useDispatch, useSelector } from 'react-redux';
import { InputMethod } from '../../settings/model/InputMethod';
import { AppState } from '../../../models/Nouns';
import { actions } from "../features/play";
import useDoubleTapInput from './useDoubleTapInput';
import { gsap } from "gsap";
import useIconPreNumberInputMethod from './useIconPreNumberInputMethod';
import useIconPostNumberInputMethod from './useIconPostNumberInputMethod';

const useInputMethod = () => {

    const dispatch = useDispatch();
    const inputMethod = useSelector(
        (state: AppState) => state.settings.inputMethod
    );



    const pencilInput = (data: CellDto, value: number | undefined) => {
        if (data.value === data.correctValue) {
            return;
        }
        if (!data.value) {
            dispatch(
                actions.inputCellHelper({
                    cell: data,
                    value: value,
                })
            );
        }
    };


    const penInput = (data: CellDto, value: number | undefined) => {
        if (data.value === data.correctValue) {
            return;
        }
        if (!data.value) {
            dispatch(
                actions.inputCellValue({
                    cell: data,
                    value: value,
                })
            );
        } else {
            dispatch(
                actions.inputCellValue({
                    cell: data,
                    value: undefined,
                })
            );
        }
        const effectDivId = `#${data.id} .effect`;
        gsap.to(effectDivId, {
            scale: 3,
            duration: 0.7,
            opacity: 0,
            onComplete: () => {
                gsap.set(effectDivId, { scale: 0, opacity: 1 });
            },
        });
    };

    const numberSelected = (num: number) => {
        dispatch(actions.setSelectedInputValue({ value: num }))
    }

    const cellSelected = (cellId: string) => {
        dispatch(actions.setSelectedCell({ cellId }))
    }

    const doubleTap = useDoubleTapInput(penInput, pencilInput, cellSelected, numberSelected)
    const iconPreNumber = useIconPreNumberInputMethod(penInput, pencilInput, cellSelected, numberSelected)
    const iconPostNumber = useIconPostNumberInputMethod(penInput, pencilInput, cellSelected, numberSelected)

    switch (inputMethod) {
        case InputMethod.DOUBLE:
            return doubleTap;
        case InputMethod.ICON_POST_NUMBER:
            return iconPostNumber;
        default:
            return iconPreNumber;
    }

};

export { useInputMethod };
