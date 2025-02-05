import pixels from 'image-pixels';

// Everything is arbitrary, blow me.
const difficulties = {
    extreme: 0.0034722,
    hard: 0.01041667,
    medium: 0.01736111,
    easy: 0.02083333,
    simple: 0.02256944,
};

/**
 * @param {number[]} imageData All of the image data
 * @param {'extreme' | 'hard' | 'medium' | 'easy' | 'simple'} difficulty The specific difficulty level chosen by user
 */
export async function generate(imageData, difficulty = 'medium') {
    const { data, width, height } = await pixels(imageData);

    let pixelSize = width < height ? width * difficulties[difficulty] : height * difficulties[difficulty];
    const postWidth = Math.ceil(width / pixelSize);
    const postHeight = Math.ceil(height / pixelSize);
    pixelSize = Math.ceil(pixelSize);

    // Generate simple cells.
    const amountOfPixels = postWidth * postHeight;
    const amountOfCentroids = Math.ceil(amountOfPixels / 150);
    const centroids = Array.from(new Array(amountOfCentroids), (_centroid) => ({
        R: Math.floor(Math.random() * 255),
        G: Math.floor(Math.random() * 255),
        B: Math.floor(Math.random() * 255),
    }));

    const averageCells = getAverageCells(data, width, height, pixelSize, centroids);

    const centroidMovingAverages = [];
    centroids.forEach((centroid) => {
        centroidMovingAverages.push({
            centroid,
            foundPoints: 0,
        })
    });

    calculateCentroidAverages(averageCells, amountOfPixels, centroidMovingAverages);
    migratePixelsToBetterCentroids(averageCells, amountOfPixels, centroidMovingAverages)

    const baseCells = averageCells.map(cell => cell.centroidIndex);

    return {
        width: postWidth,
        height: postHeight,
        centroids: centroidMovingAverages,
        pixels: baseCells,
    };
}

/**
 * Re-calculate each centroids average.
 *
 * @param {Pixel[]} averageCells
 * @param {number} amountOfPixels
 * @param {{ centroid: { R: number, G: number, B: number }, foundPoints: number }[]} centroidMovingAverages
 */
function calculateCentroidAverages(averageCells, amountOfPixels, centroidMovingAverages) {
    // Average the centroids around a few times to even things out
    for (let pixelIndex = 0; pixelIndex < amountOfPixels; pixelIndex++) {
        const cell = averageCells[pixelIndex];
        // TODO: this needs to be fixed when we compute averageCells!
        if (!cell) {
            continue;
        }

        const currentCentroid = centroidMovingAverages[cell.centroidIndex];

        //TWO different averages for both x and y(3 averages for color)
        currentCentroid.centroid.R = (currentCentroid.centroid.R * currentCentroid.foundPoints + cell.r) / (currentCentroid.foundPoints + 1);
        currentCentroid.centroid.G = (currentCentroid.centroid.G * currentCentroid.foundPoints + cell.g) / (currentCentroid.foundPoints + 1);
        currentCentroid.centroid.B = (currentCentroid.centroid.B * currentCentroid.foundPoints + cell.b) / (currentCentroid.foundPoints + 1);
        currentCentroid.foundPoints += 1;
    }
}

/**
 * Re-calculate each Pixel's centroid.
 *
 * @param {Pixel[]} averageCells 
 * @param {number} amountOfPixels
 * @param {{ centroid: { R: number, G: number, B: number }, foundPoints: number }[]} centroids
 */
function migratePixelsToBetterCentroids(averageCells, amountOfPixels, centroids) {
    for (let pixelIndex = 0; pixelIndex < amountOfPixels; pixelIndex++) {
        const cell = averageCells[pixelIndex];
        // TODO: this needs to be fixed when we compute averageCells!
        if (!cell) {
            continue;
        }

        cell.findNewCentroid(centroids);
    }
}

/**
 * 
 * @param {number[]} data
 * @param {number} width
 * @param {number} height
 * @param {number} pixelSize
 * @param {number[][]} centroids
 *
 * @returns {Pixel[]}
 */
function getAverageCells(data, width, height, pixelSize, centroids) {
    const simpleImageData = [];

    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
            const pixelPosition = 4 * ((y * width) + x);

            simpleImageData.push(new Pixel(
                data[pixelPosition],
                data[pixelPosition + 1],
                data[pixelPosition + 2],
                Math.floor(Math.random() * centroids.length)
            ));
        }
    }

    return simpleImageData;
}

/**
 * √[(x2 - x1)² + (y2 - y1)² + (z2 - z1)²]
 *
 * @param {number} r1
 * @param {number} g1
 * @param {number} b1
 * @param {number} r2
 * @param {number} g2
 * @param {number} b2
 *
 * @returns {number} the distance from each point.
 */
function calculateDistance(r1, g1, b1, r2, g2, b2) {
    const rdiff = r2 - r1;
    const gdiff = g2 - g1;
    const bdiff = b2 - b1;

    return Math.sqrt((rdiff * rdiff) + (gdiff * gdiff) + (bdiff * bdiff));
}

class Pixel {
    /**
     * 
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} centroidIndex
     */
    constructor(r, g, b, centroidIndex) {
        this.r = r;
        this.g = g;
        this.b = b;

        this.centroidIndex = centroidIndex;
    }

    /**
     * @param {{ centroid: { R: number, G: number, B: number }, foundPoints: number }[]} centroids
     */
    findNewCentroid(centroids) {
        let minCentroidIndex = 0;
        let minDistance = Infinity;

        for (let centroidIndex = 0; centroidIndex < centroids.length; centroidIndex++) {
            const distance = calculateDistance(this.r, this.b, this.g, centroids[centroidIndex].centroid.R, centroids[centroidIndex].centroid.G, centroids[centroidIndex].centroid.B);

            if (distance < minDistance) {
                minDistance = distance;
                minCentroidIndex = centroidIndex;
            }
        }

        this.centroidIndex = minCentroidIndex;
    }
}
