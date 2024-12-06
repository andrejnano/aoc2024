import { readInputLines, writeOutput, readInputAsGrid, readInputAsNumbers } from "~/utils/io";

// DAY: 6
// PUZZLE: 1
// DATE OF COMPLETION: 2024-12-06

const INPUT_PATH = `./tasks/day06/puzzle1/INPUT`;
const OUTPUT_PATH = `./tasks/day06/puzzle1/OUTPUT`;

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

    const collisionAhead = (pos: [number, number], dir: [number, number]): boolean => {
        return grid[pos[0] + dir[0]][pos[1] + dir[1]] === "#"
    }

    const visited = new Set<string>();
    let pos: [number, number] = start
    let dir: [number, number] = UP;

    while (!isOutside(pos, grid)) {
        if (collisionAhead(pos, dir)) {
            dir = rotateRight(dir)
        } else {
            visited.add(`${pos[0]},${pos[1]}`)
            pos = moveForward(pos, dir)
        }
    }

    await writeOutput(OUTPUT_PATH, visited.size.toString())
})();