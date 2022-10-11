import { AppState } from './../../../models/Nouns';
import { Store } from '@reduxjs/toolkit';
import netSocket from '../../../utils/NetworkSocket';
export class OutputStreamEmitter {
    private unsubscribe: Function | null = null;
    constructor(private store: Store<AppState>, private mistakes: number = 0, private solved: number = 0) {
        this.store.subscribe(() => {
            const state = this.store.getState().play;

            const hasProgressChanged = state.myProgress.mistakes !== this.mistakes || state.myProgress.solved !== this.solved;
            const isPlaying = state.gameLifeCycle === 'started'
            if (isPlaying && hasProgressChanged) {
                this.mistakes = state.myProgress.mistakes;
                this.solved = state.myProgress.solved;
                netSocket.emit('informProgress', { mistakes: this.mistakes, solved: this.solved })
            }
        })
    }

    dispose() {
        this.unsubscribe?.();
    }
}