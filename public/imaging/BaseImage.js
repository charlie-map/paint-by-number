class BaseImage {
    /**
     * Constructs the image system. It's a lot...
     *
     * @param {number} width
     * @param {number} height
     * @param {{ centroid: { R: number, G: number, B: number }, foundPoints: number }[]} centroids All of the colors for this image
     * @param {{ r: number, g: number, b: number, centroidIndex: number }[]} pixels Each of the given pixels. We only care about the
     *   centroidIndex for the sake of rendering.
     * @param {number} pixelSize The side of all pixels.
     */
    constructor(width, height, centroids, pixels, pixelSize) {
        this.width = width;
        this.height = height;

        this.centroids = centroids;
        this.constructColorHolder();
        this.pixels = pixels;
        this.pixelSize = pixelSize;
        this.constructImageHolder();
    }

    constructColorHolder() {
        const colorHolder = $cwqs('#color-holder');
        let doubleElement = [];

        this.centroids.forEach(({ centroid }, centroidIndex) => {
            const color = $gencwqs('div');
            color.className = 'color montserrat';
            color.style = `background: rgba(${centroid.R}, ${centroid.G}, ${centroid.B}, 255)`;
            color.innerHTML = `${centroidIndex + 1}`;

            color.addEventListener('click', function () {
                console.log('clicked somethin', centroid);
            });

            doubleElement.push(color);
            if (doubleElement.length === 2) {
                const twoColorHolder = $gencwqs('div');
                twoColorHolder.className = 'color-column';
                doubleElement.forEach((el) => twoColorHolder.append(el));
                colorHolder.append(twoColorHolder);
                doubleElement = [];
            }
        });
    }

    constructImageHolder() {
        const imageHolder = $cwqs('#image-container');
        let currentRow = null;
        let row = 0;

        console.log(this.width, this.centroids, this.pixels);

        this.pixels.forEach((pixel, index) => {
            if (index >= this.width * row) {
                currentRow = $gencwqs('div');
                currentRow.className = 'pixel-row';
                currentRow.id = `pixel-row-${row}`;
                imageHolder.append(currentRow);
                row++;
            }

            const { R, G, B } = this.centroids[pixel].centroid;
            const pix = new Pixel(index, R, G, B, pixel, this.pixelSize);
            const pixLoc = pix.buildWrapper();

            pixLoc.addEventListener('click', function () {
                console.log('pixel presses');
                pix.paint();
                pixLoc.innerHTML = pix.render();
            });

            currentRow.append(pixLoc);
            pixLoc.innerHTML = pix.render();
        });
    }
}