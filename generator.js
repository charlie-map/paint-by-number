import pixels from 'image-pixels';

const difficulties = {
    extreme: 0.0034722,
    hard: 0.01041667,
    medium: 0.01736111,
    easy: 0.02083333,
    simple: 0.02256944,
};

export async function generate(imageData, difficulty = 'medium') {
    const { data, width, height } = await pixels(imageData);

    let pixelSize = width < height ? width * difficulties[difficulty] : height * difficulties[difficulties];
    const postWidth = Math.ceil(width / pixelSize);
    const postHeight = Math.ceil(height / pixelSize);

    // Generate simple cells.
    const averageCells = getAverageCells(data, width, height, pixelSize);

    const amountOfPixels = postWidth * postHeight;

    for (let y = 0; y < postHeight; y++) {
        for (let x = 0; x < postWidth; x++) {
            const index = (y * width) + x;
            const cell = averageCells[index];


        }
    }

    console.log('some stuff', data, width, height);
}

function chooseCentroids() {

}

function getAverageCells(data, width, height, pixelSize) {
    const simpleImageData = [];

    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
            const pixelPosition = 4 * ((y * width) + x);

            simpleImageData.push([
                data[pixelPosition],
                data[pixelPosition + 1],
                data[pixelPosition + 2],
                data[pixelPosition + 3],
            ]);
        }
    }

    return simpleImageData;
}
