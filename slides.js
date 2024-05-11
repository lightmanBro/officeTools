// JavaScript code to toggle sliding animation
const displayReceiptsBtn = document.getElementById('display-receipts-btn');
const bankDataDisplay = document.querySelector('.bank-data-display');
const receiptDisplay = document.querySelector('.receipt-display');
const banksDisplayBtn = document.getElementById('display-bank-btn');
// Function to slide the bank data display to the left
function slideBankDataLeft() {
    bankDataDisplay.classList.add('slide-left');
}

// Function to slide the bank data display to the right
function slideBankDataRight() {
    bankDataDisplay.classList.remove('slide-left');
}

// Function to slide the receipt display to the left
function slideReceiptLeft() {
    receiptDisplay.classList.add('slide-left');
}

// Function to slide the receipt display to the right
function slideReceiptRight() {
    receiptDisplay.classList.remove('slide-left');
}

displayReceiptsBtn.addEventListener('click', (e) => {
    displayReceiptsBtn.style.display = 'none';
    banksDisplayBtn.style.display = 'block';
    bankDataDisplay.classList.add('none');
    receiptDisplay.classList.remove('none');
})

banksDisplayBtn.addEventListener('click', (e) => {
    banksDisplayBtn.style.display = 'none';
    displayReceiptsBtn.style.display = 'block';
    receiptDisplay.classList.add('none');
    bankDataDisplay.classList.remove('none');
    bankDataDisplay.style.transform = 'rotate 90deg'
})