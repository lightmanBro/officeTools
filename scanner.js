
const createDetailsBtn = document.querySelector('.create-btn'),
closeEntryBtn = document.querySelector('#close-details-entry button'),
createNewDetailsContainer = document.querySelector('.new-details-entry'),
displayBox = document.querySelector('.display'),
deleteDetailsBtn = document.getElementById('delete-details-btn'),
deleteBox = document.querySelector('.delete-box'),
deleteBoxCancelBtn = document.getElementById('cancel');

deleteDetailsBtn.addEventListener('click',(e)=>{
    deleteBox.style.display = 'block';
})
deleteBoxCancelBtn.addEventListener('click',(e)=>{
    deleteBox.style.display = 'none';
})
createDetailsBtn.addEventListener('click',(e)=>{
    createNewDetailsContainer.style.display = 'block';
    createDetailsBtn.style.display = 'none'
})
closeEntryBtn.addEventListener('click',(e)=>{
    createNewDetailsContainer.style.display = 'none';
    createDetailsBtn.style.display = 'block'
})
 


document.getElementById('generate-button').addEventListener('click', () => {
    const qrText = document.getElementById('qr-text').value;
    if (qrText.trim() !== '') {
        // Send text to backend to generate QR code
        generateQRCode(qrText);
    } else {
        alert('Please enter text for QR code');
    }
});

// Function to capture image from video stream and save it
async function captureImage(videoElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const { videoWidth, videoHeight } = videoElement;

    // Set canvas dimensions to match video dimensions
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Draw current frame of video onto the canvas
    context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

    // Convert canvas content to a blob with PNG format
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Failed to capture image: Blob is null.'));
            }
        }, 'image/png');
    });
}

// Event listener for capture button click
document.getElementById('capture-button').addEventListener('click', async () => {
    const videoElement = document.getElementById('video-element');

    try {
        // Get user media stream from camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        displayBox.style.display = 'block'
        videoElement.style.display = 'block';

        // Wait for video metadata to load
        await videoElement.play();
        
        // Capture image from video stream
        const blob = await captureImage(videoElement);

        // Create a new FormData object
        const formData = new FormData();
        // Append the captured image blob to the FormData with a specified filename
        formData.append('file', blob, 'image.png');
        // Upload the image using the uploadImage function
        uploadImage(formData);
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
})

document.getElementById('upload-button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior (page reload)
    const fileInput = document.getElementById('file-input');
    fileInput.click(); // Trigger file input click to open file picker
});

document.getElementById('file-input').addEventListener('change', function(event) {
    event.preventDefault(); // Prevent default behavior (page reload)
    
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            displayBox.style.display = 'block'
            displayBox.style.backgroundColor = '#f2f5fc';
            const previewImage = document.getElementById('preview-image');
            previewImage.style.display = 'block';
            previewImage.src = event.target.result;
        }
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('file', file);
        uploadImage(formData);
    }
});

// document.getElementById("generate").addEventListener("click",(e)=>{
//     e.preventDefault();
    
//     setTimeout(() => {
//         console.log(localStorage.getItem('qr-code'));        
//     }, 2000);
// })
const vid = document.getElementById('video-element');
function uploadImage(formData) {
    fetch('http://127.0.0.1:3000/scan', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        vid.style.display = 'none';
        document.querySelector('.qr').style.display = 'block';
        data.data ? document.querySelector('.qr').innerHTML = `${data.data}` : document.querySelector('.qr').innerHTML = `${data.error}`
        console.log(data);
        // Handle the response here without reloading the page
    })
    .catch(error => {
        vid.style.display = 'none';
        console.error('Error scanning QR code:', error);
    });
}


function generateQRCode(text) {
    fetch('http://127.0.0.1:3000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => {
        // Extract base64-encoded image data from JSON response
        console.log(data);
        // Create data URL from base64-encoded image data
        
        // Render QR code image
        const qrImage = document.getElementById('qr-image');
        qrImage.src = data;
        qrImage.style.display = 'block';
        const downloadLink = document.getElementById('download-link');


        // Set the href attribute and display the download link
        downloadLink.href = data;
        downloadLink.style.display = 'block';
    })
    .catch(error => {
        console.error('Error generating QR code:', error);
    });
}

