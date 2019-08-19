export class Page {
    size;
    current;
    total;
    sizeList = [10, 20, 50, 100];

    constructor(total = 0, size = 20, current = 1) {
        this.total = total;
        this.size = size;
        this.current = current;
    }
    getQueryParam() {
        return { page: this.current, pageSize: this.size };
    }
    setSize(val) {
        this.size = this.size;
    }
    setCurrent(val) {
        this.current = this.current;
    }
    setTotal(val) {
        this.total = this.total;
    }
    unset() {
        this.current = 1;
    }
}
