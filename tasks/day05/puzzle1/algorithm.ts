import type { TupleType } from "typescript";
import { readInputLines, writeOutput, readInputAsGrid, readInputAsNumbers } from "~/utils/io";

// DAY: 5
// PUZZLE: 1
// DATE OF COMPLETION: 2024-12-06

const INPUT_PATH = `./tasks/day05/puzzle1/INPUT`;
const OUTPUT_PATH = `./tasks/day05/puzzle1/OUTPUT`;

(await async function main() {
    const lines = await readInputLines(INPUT_PATH)

    const rulesSectionEnd = lines.findIndex((value) => value === "")
    const rulesSection = lines.slice(0, rulesSectionEnd)
    const updatesSection = lines.slice(rulesSectionEnd + 1)

    const rules = rulesSection.map((line) => line.split("|")).map((splitLine) => [Number(splitLine[0]), Number(splitLine[1])])
    const updates = updatesSection.map((line) => line.split(",")).map((updates) => updates.map((page) => Number(page)))


    const getMiddle = (update: number[]) => {
        const middleIdx = Math.floor(update.length / 2);
        return update[middleIdx];
    }

    const satRules = (update: number[]) => {
        for (let i = 0; i < update.length; i++) {
            for (let j = i; j < update.length; j++) {
                for (let k = 0; k < rules.length; k++) {
                    if (update[i] === rules[k][1] && update[j] === rules[k][0]) {
                        return false
                    }
                }
            }
        }
        return true;
    }

    const sumOfMiddles = updates
        .filter((update) => satRules(update))
        .map((update) => getMiddle(update))
        .reduce((acc, curr) => acc + curr, 0)

    // SOLUTION HERE
    await writeOutput(OUTPUT_PATH, sumOfMiddles.toString())
})();