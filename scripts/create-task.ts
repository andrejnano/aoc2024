import { mkdir } from 'node:fs/promises';

const createTask = async (day: number) => {
    const tasksBaseDir = 'tasks';
    const taskDir = `${tasksBaseDir}/day${String(day).padStart(2, '0')}`;

    // Ensure base directory exists
    try {
        await mkdir(tasksBaseDir, { recursive: true });
    } catch (error) {
        if ((error as any).code !== 'EEXIST') {
            throw error;
        }
    }

    // Check if task directory already exists
    const dirExists = await Bun.file(taskDir).exists();
    if (dirExists) {
        console.error(`Task directory ${taskDir} already exists!`);
        process.exit(1);
    }

    try {
        // Create task directory
        await mkdir(taskDir);

        // Define puzzle directories
        const puzzles = ['puzzle1', 'puzzle2'];

        for (const puzzle of puzzles) {
            const puzzleDir = `${taskDir}/${puzzle}`;
            await mkdir(puzzleDir);

            // Copy template files for each puzzle
            const templateFiles = [
                ['algorithm.ts', 'algorithm.ts'],
                ['INPUT', 'INPUT'],
                ['OUTPUT', 'OUTPUT']
            ];

            for (const [src, dest] of templateFiles) {
                const sourceFile = Bun.file(`template/${puzzle}/${src}`);
                const destPath = `${puzzleDir}/${dest}`;

                if (src === 'algorithm.ts') {
                    // Read and modify algorithm.ts content
                    const content = await sourceFile.text();
                    const today = new Date().toISOString().split('T')[0];
                    const updatedContent = content
                        .replace('// DAY: [X]', `// DAY: ${day}`)
                        .replace('// DATE OF COMPLETION: [Y]', `// DATE OF COMPLETION: ${today}`);
                    await Bun.write(destPath, updatedContent);
                } else {
                    // Direct file copy for other files
                    await Bun.write(destPath, sourceFile);
                }
            }
        }

        console.log(`✨ Created task directory for day ${day} with puzzles 1 and 2`);
    } catch (error) {
        console.error('Failed to create task:', error);
        process.exit(1);
    }
}

// Get day number from command line argument
const day = parseInt(process.argv[2]);
if (!day || isNaN(day) || day < 1 || day > 25) {
    console.error('Please provide a valid day number (1-25)');
    process.exit(1);
}

createTask(day);