class BaseImage {
    /**
     * Constructs the image system. It's a lot...
     *
     * @param {number} width
     * @param {number} height
     * @param {{ centroid: { R: number, G: number, B: number }, foundPoints: number }[]} centroids All of the colors for this image
     * @param {{ r: number, g: number, b: number, centroidIndex: number }[]} pixels Each of the given pixels. We only care about the
     *   centroidIndex for the sake of rendering.
     */
    constructor(width, height, centroids, pixels) {
        console.log(this.width, this.height, this.centroids, this.pixels);
        this.width = width;
        this.height = height;
        
        this.centroids = centroids;
        this.constructColorHolder();
        this.pixels = pixels;
    }

    constructColorHolder() {
        const colorHolder = $cwqs('#color-holder');

        this.centroids.forEach((centroid, centroidIndex) => {
            const color = $gencwqs('div');
            color.className = 'color'
            color.style = `background: rgba(${centroid.centroid.R}, ${centroid.centroid.G}, ${centroid.centroid.B}, 255)`;
            color.innerHTML = `${centroidIndex + 1}`;

            console.log('set color element', color);
            colorHolder.append(color);
        });
    }
}