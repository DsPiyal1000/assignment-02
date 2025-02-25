// variables
let totalBalance = 0;
let totalDeposit = 0;
let totalWithdrawal = 0;
let transactionHistory = [];

//DOM
const amountInput = document.getElementById('amount');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const totalBalanceDisplay = document.getElementById('total-balance');
const totalDepositDisplay = document.getElementById('total-deposit');
const totalWithdrawalDisplay = document.getElementById('total-withdrawal');
const transactionHistoryList = document.getElementById('transaction-history');

// Deposit
depositBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (amount <= 0 || isNaN(amount)) {
        alert('Amount must be a positive number');
        return;
    }
    totalDeposit += amount;
    totalBalance += amount;
    addTransaction('Deposit', amount);
    updateDisplay();
    amountInput.value = '';
});

// Withdraw 
withdrawBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (amount <= 0 || isNaN(amount)) {
        alert('Amount must be a positive number');
        return;
    }
    if (amount > totalBalance) {
        alert('Insufficient Balance');
        return;
    }
    totalWithdrawal += amount;
    totalBalance -= amount;
    addTransaction('Withdrawal', amount);
    updateDisplay();
    amountInput.value = '';
});

// Add Transaction
function addTransaction(type, amount) {
    const date = new Date().toLocaleString();
    const transaction = {
        type,
        amount,
        date,
    };
    transactionHistory.push(transaction);
    renderTransactionHistory();
}

//Transaction History
function renderTransactionHistory() {
    transactionHistoryList.innerHTML = '';
    transactionHistory.forEach((transaction) => {
        const li = document.createElement('li');
        li.textContent = `${transaction.date} - ${transaction.type}: $${transaction.amount.toFixed(2)}`;
        transactionHistoryList.appendChild(li);
    });
}

// Update
function updateDisplay() {
    totalBalanceDisplay.textContent = `$${totalBalance.toFixed(2)}`;
    totalDepositDisplay.textContent = `$${totalDeposit.toFixed(2)}`;
    totalWithdrawalDisplay.textContent = `$${totalWithdrawal.toFixed(2)}`;
}