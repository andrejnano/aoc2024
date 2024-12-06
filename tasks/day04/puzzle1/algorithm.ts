import { readInputLines, writeOutput, readInputAsGrid, readInputAsNumbers } from "~/utils/io";

// DAY: 4
// PUZZLE: 1
// DATE OF COMPLETION: 2024-12-05

const INPUT_PATH = `./tasks/day04/puzzle1/INPUT`;
const OUTPUT_PATH = `./tasks/day04/puzzle1/OUTPUT`;


//This word search allows words to be:
// - horizontal, 
// - vertical, 
// - diagonal, 
// - written backwards, 
// - or even overlapping other words.

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

    const word = "XMAS"

    const vectors = [
        [
            [ // horizontal
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3]
            ],
            [ // vertical
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0]
            ],
            [ // diagonal
                [0, 0],
                [1, 1],
                [2, 2],
                [3, 3]
            ]
        ]
    ]

    const countWord = (word: string): number => {
        let count: number = 0;
        for (let i = 0; i < paddedGrid.length; i++) {
            for (let j = 0; j < paddedGrid.length; j++) {
                // horizontal
                if (
                    paddedGrid[i][j + 0] === word[0] &&
                    paddedGrid[i][j + 1] === word[1] &&
                    paddedGrid[i][j + 2] === word[2] &&
                    paddedGrid[i][j + 3] === word[3]
                ) {
                    count++
                }

                // vertical
                if (
                    paddedGrid[i + 0][j] === word[0] &&
                    paddedGrid[i + 1][j] === word[1] &&
                    paddedGrid[i + 2][j] === word[2] &&
                    paddedGrid[i + 3][j] === word[3]
                ) {
                    count++
                }

                // DIAGONAL 1
                if (
                    paddedGrid[i + 0][j + 0] === word[0] &&
                    paddedGrid[i + 1][j + 1] === word[1] &&
                    paddedGrid[i + 2][j + 2] === word[2] &&
                    paddedGrid[i + 3][j + 3] === word[3]
                ) {
                    count++
                }

                // DIAGONAL 2
                if (
                    paddedGrid[i + 0][j + 0] === word[0] &&
                    paddedGrid[i + 1][j - 1] === word[1] &&
                    paddedGrid[i + 2][j - 2] === word[2] &&
                    paddedGrid[i + 3][j - 3] === word[3]
                ) {
                    count++
                }

            }
        }
        return count;
    }


    const foundCount = countWord("XMAS") + countWord("SAMX")


    // SOLUTION HERE
    await writeOutput(OUTPUT_PATH, foundCount.toString())
})();