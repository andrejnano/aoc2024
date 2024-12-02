export const readInputLines = async (fileName: string): Promise<string[]> => {
    try {
        const input = Bun.file(fileName);
        const text = await input.text();
        const lines = text.trim().split("\n");
        return lines
    } catch (error) {
        throw new Error(`Reading file failed: ${error}`);
    }
}

export const writeOutput = async (fileName: string, data: string): Promise<void> => {
    const output = Bun.file(fileName)

    try {
        await Bun.write(output, data);
    } catch (error) {
        throw new Error(`Writing to file failed: ${error}`)
    }
}

export const readInputAsNumbers = async (fileName: string): Promise<number[]> => {
    const lines = await readInputLines(fileName);
    return lines.map(Number);
}

export const readInputAsGrid = async (fileName: string): Promise<string[][]> => {
    const lines = await readInputLines(fileName);
    return lines.map(line => line.split(''))
}
