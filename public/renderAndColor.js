
function renderImage(width, height, data, scale = 1) {
    console.log(scale);
    const step = 50;
    const outerContainer = $cwqs('#image-container');

    const container = $gencwqs('div');
    container.style = `width: ${width}px; height: ${height}px;`;

    outerContainer.append(container);

    for (let y = 0; y < height * step; y += step) {
        const rowNum = y / step;
        const row = $gencwqs('div');
        row.className = 'pixel-row';
        row.id = `row-${rowNum}`;
        container.append(row);

        for (let x = 0; x < width * step; x += step) {
            const loc = (y * width) + x;
            const number = Math.ceil(Math.random() * 10);

            const pixelIdentifier = x / step;

            const pixel = new Pixel(pixelIdentifier, data[loc], data[loc + 1], data[loc + 2], number, true);

            row.append(pixel.buildWrapper());
            const pixelEl = row.$cwqs(`#p-${pixelIdentifier}`);
            pixelEl.style = `width: ${step}px; height: ${step}px`;
            pixelEl.innerHTML = pixel.render();

            pixelEl.onclick = () => {
                pixel.paint();
                pixelEl.innerHTML = pixel.render();
            };
        }
    }
}

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
        this.painted = painted;
    }

    buildWrapper() {
        const wrapper = document.createElement('pixel');
        wrapper.className = 'pixel-wrapper';
        wrapper.id = `p-${this.id}`;
        return wrapper;
    }

    render() {
        const averageColor = (this.red + this.green + this.blue) / 3;

        return `
        <div class="pixel" style="
            cursor: pointer;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            ${this.painted ?
                `background-color: rgba(${this.red}, ${this.green}, ${this.blue}, 255)` :
                `background-color: rgba(${averageColor}, ${averageColor}, ${averageColor}, 255)`}">
            ${this.painted ? "" : `<h4 class="${averageColor < 180 ? 'high-contrast' : ''}">${this.number}</h4>`}
        </div>
        `;
    }

    paint() {
        this.painted = true;
    }
}
