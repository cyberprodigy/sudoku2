
import { createTheme } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';

export const palette = createPalette({
    primary: {
        dark: '#26234e',
        main: '#30297b',
        light: '#6258d1'
    },
    secondary: {
        dark: '#FF0000',
        main: '#FF0000',
        light: '#FF0000',
    },

});

export default function buildTheme() {
    return createTheme({
        palette: palette,
    })
};
