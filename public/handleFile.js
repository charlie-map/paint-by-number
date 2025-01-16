
function handleFileUpload() {
    var canvas = document.getElementById('mycanvas');
    var c = canvas.getContext("2d");

    var img = new Image();
    img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
    img.crossOrigin = "Anonymous";

    img.onload = function () {
        c.drawImage(img, 0, 0);
    }

    var myImageData = c.getImageData(0, 0, 500, 500);
    var numBytes = myImageData.data.length;
    var pixelData = myImageData.data;
    console.log(numBytes);
    console.log(pixelData);
}

$cwqs('#new-image-upload', (uploader) => {
    const canvas = $cwqs('#image-canvas');
    const ctx = canvas.getContext('2d');

    uploader.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            // Too many files uploaded!!
        }

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Get pixel data
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;

                // Process pixel values
                for (let i = 0; i < pixels.length; i += 4) {
                    const red = pixels[i];
                    const green = pixels[i + 1];
                    const blue = pixels[i + 2];
                    const alpha = pixels[i + 3];

                    // Do something with the pixel values
                    console.log("Pixel", i / 4, ": R=", red, "G=", green, "B=", blue, "A=", alpha);
                }
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);

    });
});
