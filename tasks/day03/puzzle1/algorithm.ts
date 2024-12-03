import { readInput, writeOutput, } from "~/utils/io";

// DAY: 3
// PUZZLE: 1
// DATE OF COMPLETION: 2024-12-03

const INPUT_PATH = `./tasks/day03/puzzle1/INPUT`;
const OUTPUT_PATH = `./tasks/day03/puzzle1/OUTPUT`;

(await async function main() {
    const buffer = await readInput(INPUT_PATH)
    const cleanBuffer = buffer.replaceAll(/\s/g, "")
    const mulOpRegex = /mul\(\d+,\d+\)/g;
    const mulOps = cleanBuffer.match(mulOpRegex) || []

    const executeMulOp = (op: string) => {
        const [a, b] = op.match(/\d+/g)?.map(Number) || [];
        if (a && b) {
            return a * b
        }
        return 0;
    }

    let total: number = 0;
    for (let i = 0; i < mulOps.length; i++) {
        total += executeMulOp(mulOps[i])
    }

    // SOLUTION HERE
    await writeOutput(OUTPUT_PATH, total.toString())
})();