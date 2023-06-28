export class tqdm {

    private counter = 0;
    private startTime = 0;

    constructor(private totalItems: number, private progressBarSize: number = 40) { }

    public update(add: number = 1): void {

        this.counter += add;

        if (this.startTime == 0) this.startTime = Date.now();

        const elapsedTime = Date.now() - this.startTime;
        const itemsPerSec = this.counter / (elapsedTime / 1000);
        const msPerItem = elapsedTime / this.counter;
        const estimatedTimeLeft = (this.totalItems - this.counter) * msPerItem / 1000;
        const percent = this.counter / this.totalItems;
        const progressBarValue = Math.trunc(this.progressBarSize * percent);
        const progressBar = `[${''.padStart(progressBarValue, '.')}${''.padStart(this.progressBarSize - progressBarValue, ' ')}]`;
        process.stdout.write(`\x1b[0G[macro] ${progressBar} ${this.counter}/${this.totalItems} [${itemsPerSec.toFixed(4)}it/s ${estimatedTimeLeft.toFixed(4)}es]`);
    }
}
