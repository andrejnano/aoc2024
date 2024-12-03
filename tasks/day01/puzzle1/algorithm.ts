import { readInputLines, writeOutput, readInputAsGrid, readInputAsNumbers } from "~/utils/io";

// DAY: 1
// PUZZLE: 1
// DATE OF COMPLETION: 2024-12-03

const INPUT_PATH = `./tasks/day01/puzzle1/INPUT`;
const OUTPUT_PATH = `./tasks/day01/puzzle1/OUTPUT`;

(await async function main() {
    const lines = await readInputLines(INPUT_PATH)
    const pairs = lines
        .map((line) => line.split("   "))
        .map((pair) => [Number(pair[0]), Number(pair[1])])
    const left = pairs.map((pair) => pair[0]).sort((a, b) => a - b)
    const right = pairs.map((pair) => pair[1]).sort((a, b) => a - b)

    let distances: number[] = [];
    for (let i = 0; i < left.length; i++) {
        distances.push(Math.abs(left[i] - right[i]))
    }

    let total: number = 0;
    for (let i = 0; i < distances.length; i++) {
        total += distances[i]
    }

    await writeOutput(OUTPUT_PATH, total.toString())
})();