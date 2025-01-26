class Pixel {
    /**
     * Constructs a basic pixel object
     *
     * @param {number} id - Pixel identifier for individual row
     * 
     * Each color for this pixel.
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     *
     * @param {number} number - The number of this paint by color
     *
     * @param {boolean} painted - If the pixel has been painted already
     */
    constructor(id, red, green, blue, number, painted = false) {
        this.id = id;

        this.red = red;
        this.green = green;
        this.blue = blue;

        this.number = number;
        this.canShowNumber = false;
        this.painted = painted;
    }

    buildWrapper() {
        const wrapper = document.createElement('pixel-wrapper');
        wrapper.id = `p-${this.id}`;
        return wrapper;
    }

    render() {
        const averageColor = (this.red + this.green + this.blue) / 3;

        return `
        <pixel style="
            cursor: pointer;
            width: calc(100% - 2px);
            height: calc(100% - 2px);
            display: flex;
            justify-content: center;
            align-items: center;
            ${this.painted ?
                `background-color: rgba(${this.red}, ${this.green}, ${this.blue}, 255); border: 1px solid rgba(${this.red}, ${this.green}, ${this.blue}, 255)` :
                `background-color: rgba(${averageColor}, ${averageColor}, ${averageColor}, 255); border: 1px solid rgba(${averageColor}, ${averageColor}, ${averageColor}, 255)`}"
                >${this.painted ? "" : this.canShowNumber ? `<h4 class="${averageColor < 150 ? 'high-contrast' : ''}">${this.number}</h4>` : ''}</pixel>
        `;
    }

    paint() {
        this.painted = true;
    }
}
