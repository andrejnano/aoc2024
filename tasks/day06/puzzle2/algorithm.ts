import { readInputLines, writeOutput, readInputAsGrid, readInputAsNumbers } from "~/utils/io";

// DAY: 6
// PUZZLE: 2
// DATE OF COMPLETION: 2024-12-06

const INPUT_PATH = `./tasks/day06/puzzle2/INPUT`;
const OUTPUT_PATH = `./tasks/day06/puzzle2/OUTPUT`;

// very slow and unoptimal solution
// a better way would be to record the original guard's path with both position and direction
// and somehow determining loop-causing obstructions without resimulating the whole path
(await async function main() {
    const grid = await readInputAsGrid(INPUT_PATH)

    let start: [number, number] = [0, 0];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === "^") {
                start = [i, j]
            }
        }
    }

    const isOutside = (nextPos: [number, number], grid: string[][]): boolean => {
        return nextPos[0] < 0 ||
            nextPos[0] >= grid.length ||
            nextPos[1] < 0 ||
            nextPos[1] >= grid[nextPos[0]].length
    }

    const UP: [number, number] = [-1, 0]
    const RIGHT: [number, number] = [0, 1]
    const DOWN: [number, number] = [1, 0]
    const LEFT: [number, number] = [0, -1]

    const rotateRight = (dir: [number, number]): [number, number] => {
        switch (dir) {
            case UP: return RIGHT;
            case RIGHT: return DOWN;
            case DOWN: return LEFT;
            case LEFT: return UP;
            default: throw new Error("NON-STANDARD DIRECTION")
        }
    }

    const moveForward = (pos: [number, number], dir: [number, number]): [number, number] => {
        return [pos[0] + dir[0], pos[1] + dir[1]]
    }

    const collisionAhead = (pos: [number, number], dir: [number, number], grid: string[][]): boolean => {
        if (isOutside([pos[0] + dir[0], pos[1] + dir[1]], grid)) {
            return false;
        }
        const target = grid?.[pos[0] + dir[0]][pos[1] + dir[1]]
        return target === "#"
    }

    const simulate = (start: [number, number], simGrid: string[][]): {
        visitedPath: [number, number][],
        causesLoops: boolean;
    } => {
        const visitedPath = new Array<[number, number]>();
        let pos: [number, number] = start
        let dir: [number, number] = UP;
        let causesLoops = false;

        while (!isOutside(pos, simGrid)) {
            const alreadyVisitedIndex = visitedPath.findIndex((pathPos) => pathPos[0] === pos[0] && pathPos[1] === pos[1])
            if (alreadyVisitedIndex >= 0) {
                const nextPos = moveForward(pos, dir)
                const nextPosOnPath = visitedPath.at(alreadyVisitedIndex + 1)
                if (nextPosOnPath) {
                    if (nextPosOnPath[0] === nextPos[0] && nextPosOnPath[1] === nextPos[1]) {
                        causesLoops = true;
                        break;
                    }
                }
            } else {
                visitedPath.push(pos)
            }
            if (collisionAhead(pos, dir, simGrid)) {
                dir = rotateRight(dir)
            } else {
                pos = moveForward(pos, dir)
            }
        }
        return { visitedPath, causesLoops }
    }

    const originalRun = simulate(start, grid)
    let loopCandidates = 0;
    for (let i = 0; i < originalRun.visitedPath.length; i++) {
        const gridCopy = grid.map((row) => [...row]);
        const pathPos = originalRun.visitedPath[i];
        gridCopy[pathPos[0]][pathPos[1]] = "#";
        const run = simulate(start, gridCopy);
        if (run.causesLoops) {
            loopCandidates++;
        }
    }


    // SOLUTION HERE
    await writeOutput(OUTPUT_PATH, loopCandidates.toString())
})();