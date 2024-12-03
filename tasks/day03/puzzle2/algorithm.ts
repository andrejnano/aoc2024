import { readInput, writeOutput } from "~/utils/io";

// DAY: 3
// PUZZLE: 2
// DATE OF COMPLETION: 2024-12-03

const INPUT_PATH = `./tasks/day03/puzzle2/INPUT`;
const OUTPUT_PATH = `./tasks/day03/puzzle2/OUTPUT`;

(await async function main() {
    const buffer = await readInput(INPUT_PATH)
    const cleanBuffer = buffer.replaceAll(/\s/g, "")
    const mulOpRegex = /mul\(\d+,\d+\)/;
    const doOpRegex = /do\(\)|don\'t\(\)/;
    const mulDoOpRegex = new RegExp(mulOpRegex.source + "|" + doOpRegex.source, "gm")
    const ops = cleanBuffer.match(mulDoOpRegex) || [];

    const executeMulOp = (op: string) => {
        const [a, b] = op.match(/\d+/g)?.map(Number) || [];
        if (a && b) {
            return a * b
        }
        return 0;
    }

    let total = 0;
    let enabled = true;
    for (let i = 0; i < ops.length; i++) {
        const currentOp = ops[i];
        if (currentOp === "do()") {
            enabled = true;
        } else if (currentOp === "don't()") {
            enabled = false;
        } else {
            if (enabled) {
                total += executeMulOp(ops[i])
            }
        }
    }

    // SOLUTION HERE
    await writeOutput(OUTPUT_PATH, total.toString())
})();