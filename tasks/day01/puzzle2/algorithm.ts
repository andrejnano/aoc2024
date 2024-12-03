import { readInputLines, writeOutput, readInputAsGrid, readInputAsNumbers } from "~/utils/io";

// DAY: 1
// PUZZLE: 2
// DATE OF COMPLETION: 2024-12-03

const INPUT_PATH = `./tasks/day01/puzzle2/INPUT`;
const OUTPUT_PATH = `./tasks/day01/puzzle2/OUTPUT`;


// NOTE: this has O(n^2) time and could be improved by using a Hash map
// for the calculation of similarity score
// ```    
//     const frequencyMap = new Map<number, number>();
//     for (const num of right) {
//         frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
//     }
//     const getSimilarityScore = (target: number) => {
//         const appearanceCount = frequencyMap.get(target) || 0;
//         return appearanceCount * target;
//      }
// ```
(await async function main() {
    const lines = await readInputLines(INPUT_PATH)
    const pairs = lines
        .map((line) => line.split("   "))
        .map((pair) => [Number(pair[0]), Number(pair[1])])

    const left = pairs.map((pair) => pair[0]);
    const right = pairs.map((pair) => pair[1]);

    const getSimilarityScore = (target: number, list: number[]) => {
        let appearanceCount: number = 0;
        for (let i = 0; i < list.length; i++) {
            if (target === list[i]) {
                appearanceCount++;
            }
        }
        return appearanceCount * target;
    }

    let total: number = 0;
    for (let i = 0; i < left.length; i++) {
        total += getSimilarityScore(left[i], right)
    }

    await writeOutput(OUTPUT_PATH, total.toString())
})();