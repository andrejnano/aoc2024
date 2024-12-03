import { existsSync } from 'node:fs';
import { join } from 'node:path';

const runTask = async (day: number, puzzle: number) => {
    const taskDir = join('tasks', `day${String(day).padStart(2, '0')}`);
    const puzzleDir = join(taskDir, `puzzle${puzzle}`);
    const algorithmPath = join(puzzleDir, 'algorithm.ts');

    // Validate inputs
    if (!existsSync(taskDir)) {
        console.error(`❌ Task directory for day ${day} doesn't exist!`);
        console.log(`💡 Try creating it first with: bun run create-task ${day}`);
        process.exit(1);
    }

    if (!existsSync(puzzleDir)) {
        console.error(`❌ Puzzle ${puzzle} directory doesn't exist for day ${day}!`);
        process.exit(1);
    }

    if (!existsSync(algorithmPath)) {
        console.error(`❌ Algorithm file not found at: ${algorithmPath}`);
        process.exit(1);
    }

    try {
        console.log(`🚀 Running day ${day}, puzzle ${puzzle}...`);
        const startTime = performance.now();

        // Execute the algorithm
        await import(`../${algorithmPath}`);

        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        console.log(`✨ Completed in ${executionTime}ms`);
    } catch (error) {
        console.error('❌ Error running task:', error);
        process.exit(1);
    }
};

// Parse command line arguments
const day = parseInt(process.argv[2]);
const puzzle = parseInt(process.argv[3]);

// Validate arguments
if (!day || isNaN(day) || day < 1 || day > 25) {
    console.error('Please provide a valid day number (1-25)');
    process.exit(1);
}

if (!puzzle || isNaN(puzzle) || ![1, 2].includes(puzzle)) {
    console.error('Please provide a valid puzzle number (1 or 2)');
    process.exit(1);
}

runTask(day, puzzle);
