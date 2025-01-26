/**
 * Sends request to backend.
 *
 * @param {} input
 *  - imageData: string (image data)
 *  - onProgress: (event) => {}
 *  - onLoad: (event) => {}
 *  - onError: (event) => {}
 *  - onAbort: (event) => {}
 */
function generateImageData(input) {
    const { imageData, onProgress, onLoad, onError, onAbort } = input;
    console.log('generate', imageData);

    Meta.xhr.send({
        type: "POST",
        url: "/image/generate",

        data: JSON.stringify({ image: imageData }),

        headers: {
            "Content-type": "application/json"
        },

        success: (res) => {
            console.log(res);
        },

        failure: (e) => {
            console.log('fail', e);
        }
    })
}

// progress on transfers from the server to the client (downloads)
// function updateProgress(event) {
//   if (event.lengthComputable) {
//     const percentComplete = (event.loaded / event.total) * 100;
//     // …
//   } else {
//     // Unable to compute progress information since the total size is unknown
//   }
// }