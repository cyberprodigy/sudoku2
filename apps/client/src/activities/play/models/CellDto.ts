export interface CellDto {
    id: string;
    cellX: number;
    cellY: number;
    value: number | undefined;
    correctValue: number;
    helperInputs: number[];
}
