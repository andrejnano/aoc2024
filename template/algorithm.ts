import { readInputLines, writeOutput, readInputAsGrid, readInputAsNumbers } from "~/utils/io";

// DAY: [X]
// PUZZLE: [Z]
// DATE OF COMPLETION: [Y]

const INPUT_PATH = `./tasks/day[XX]/puzzle[Z]/INPUT`;
const OUTPUT_PATH = `./tasks/day[XX]/puzzle[Z]/OUTPUT`;

(await async function main() {
    const lines = await readInputLines(INPUT_PATH)
    // SOLUTION HERE
    await writeOutput(OUTPUT_PATH, "")
})();