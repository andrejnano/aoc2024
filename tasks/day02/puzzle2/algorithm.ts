import { readInputLines, writeOutput, readInputAsGrid, readInputAsNumbers } from "~/utils/io";

// DAY: 2
// PUZZLE: 2
// DATE OF COMPLETION: 2024-12-03

const INPUT_PATH = `./tasks/day02/puzzle2/INPUT`;
const OUTPUT_PATH = `./tasks/day02/puzzle2/OUTPUT`;

(await async function main() {
    const lines = await readInputLines(INPUT_PATH)
    const reports = lines.map((line) => line.split(" ").map(Number))

    const isDecreasing = (report: number[]): boolean => {
        for (let i = 1; i < report.length; i++) {
            if (report[i] > report[i - 1]) {
                return false
            }
        }
        return true;
    }

    const isIncreasing = (report: number[]): boolean => {
        for (let i = 1; i < report.length; i++) {
            if (report[i] < report[i - 1]) {
                return false
            }
        }
        return true;
    }

    const isSafeAdjacentDiff = (report: number[]): boolean => {
        for (let i = 1; i < report.length; i++) {
            const diff = Math.abs(report[i] - report[i - 1])
            if (diff < 1 || diff > 3) {
                return false
            }
        }
        return true;
    }

    const isSafeReport = (report: number[]): boolean => {
        if ((isDecreasing(report) || isIncreasing(report)) && isSafeAdjacentDiff(report)) {
            return true
        }

        // PROBLEM DAMPENING
        // we can tolerate a single bad level
        for (let i = 0; i < report.length; i++) {
            const shadowReport = report.toSpliced(i, 1)
            if ((isDecreasing(shadowReport) || isIncreasing(shadowReport)) && isSafeAdjacentDiff(shadowReport)) {
                return true
            }
        }

        return false
    }

    let numberOfSafeRecords = 0;
    for (let i = 0; i < reports.length; i++) {
        if (isSafeReport(reports[i])) {
            numberOfSafeRecords++;
        }
    }

    await writeOutput(OUTPUT_PATH, numberOfSafeRecords.toString())
})();