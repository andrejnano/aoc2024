import { readInputLines, writeOutput, readInputAsGrid, readInputAsNumbers } from "~/utils/io";

// DAY: 4
// PUZZLE: 2
// DATE OF COMPLETION: 2024-12-05

const INPUT_PATH = `./tasks/day04/puzzle2/INPUT`;
const OUTPUT_PATH = `./tasks/day04/puzzle2/OUTPUT`;

(await async function main() {
    const lines = await readInputLines(INPUT_PATH)
    const grid = lines.map((line) => line.split(""))

    const addPaddingToGrid = (grid: string[][], padding: number) => {

        const originalGridHeight = grid.length
        const originalGridWidth = grid[0].length

        const blankRow = new Array(originalGridWidth + 2 * padding).fill(".")

        // add padding to sides of the original grid
        for (let i = 0; i < grid.length; i++) {
            for (let p = 0; p < padding; p++) {
                grid[i].unshift(".")
                grid[i].push(".")
            }
        }

        // add blank rows to the top and bottom
        for (let i = 0; i < padding; i++) {
            grid.unshift(blankRow)
            grid.push(blankRow)
        }

        return grid
    }

    const paddedGrid = addPaddingToGrid(grid, 4)

    // .M.S......
    // ..A..MSMS.
    // .M.S.MAA..
    const checkPattern = (grid: string[][], row: number, col: number) => {

        if (grid[row][col] !== "A") return false;


        // diagonal L -> R 
        const diagonalLR =
            (
                grid[row - 1][col - 1] === "M" &&
                grid[row + 1][col + 1] === "S"
            )
            ||
            (
                grid[row - 1][col - 1] === "S" &&
                grid[row + 1][col + 1] === "M"
            )
        const diagonalRL =
            (
                grid[row - 1][col + 1] === "M" &&
                grid[row + 1][col - 1] === "S"
            )
            ||
            (
                grid[row - 1][col + 1] === "S" &&
                grid[row + 1][col - 1] === "M"
            )

        if (diagonalLR && diagonalRL) {
            return true
        }
        return false
    }

    let patternCount: number = 0;

    for (let i = 0; i < paddedGrid.length; i++) {
        for (let j = 0; j < paddedGrid.length; j++) {

            if (checkPattern(paddedGrid, i, j)) {
                patternCount++;
            }

        }
    }


    // SOLUTION HERE
    await writeOutput(OUTPUT_PATH, patternCount.toString())
})();