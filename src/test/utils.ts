export function memory(): number {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100; // Convert to MB
}
