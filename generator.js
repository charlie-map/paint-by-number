import pixels from 'image-pixels';

export async function generate(imageData) {
    const { data, width, height } = await pixels(imageData);

    console.log('some stuff', data, width, height);
}
