// Bank name to deep link mapping (example)
const bankDeepLinks = {
    'Bank A': 'banka://',
    'Bank B': 'bankb://',
    // Add more banks and their deep links here
};

// Function to open bank app using deep link
function openBankApp(bankName) {
    const deepLink = bankDeepLinks[bankName];
    if (deepLink) {
        // Check if the bank's app is installed
        window.location.href = deepLink; // Redirect to bank app
    } else {
        // Bank app not found, handle accordingly
        alert(`Bank app for ${bankName} not found.`);
    }
}

// Example usage
const scannedBankName = 'Bank A'; // Assume this is the bank name scanned from QR code
openBankApp(scannedBankName);
