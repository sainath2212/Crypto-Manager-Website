const cryptoData = {
    Bitcoin: 10000,
    Ethereum: 3000,
    Ripple: 500,
    Crypto1: 2000,
    CryptoB: 50000,
    Litecoin: 250,
    Cardano: 1500,
    Polkadot: 800,
    Stellar: 300,
    Chainlink: 2200,
    Uniswap: 1000,
    Dogecoin: 0.5,
    Solana: 1300,
    Monero: 400,
    Tezos: 350,
    Cosmos: 900,
    Aave: 500,
    Maker: 2500,
    Compound: 750,
    Yearn: 9000
};

let balance = 100000;
let wishlist = [];
let holdings = {};

function navigate(page) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('wishlistPage').style.display = 'none';
    document.getElementById('holdingsPage').style.display = 'none';
    document.getElementById(`${page}Page`).style.display = 'block';

    if (page === 'home') {
        renderHomePage();
    } else if (page === 'wishlist') {
        renderWishlistPage();
    } else if (page === 'holdings') {
        renderHoldingsPage();
    }
}

function renderHomePage() {
    const homePage = document.getElementById('homePage');
    homePage.innerHTML = '';

    Object.keys(cryptoData).forEach(token => {
        const card = document.createElement('div');
        card.classList.add('card');

        const name = document.createElement('p');
        name.textContent = token;

        const price = document.createElement('p');
        price.textContent = `$${cryptoData[token]}`;

        const purchaseBtn = document.createElement('button');
        purchaseBtn.textContent = 'Purchase';
        purchaseBtn.addEventListener('click', () => {
            const amount = parseInt(prompt(`How many ${token} tokens do you want to buy?`));
            if (!isNaN(amount) && amount > 0 && balance >= amount * cryptoData[token]) {
                balance -= amount * cryptoData[token];
                if (holdings[token]) {
                    holdings[token] += amount;
                } else {
                    holdings[token] = amount;
                }
                alert(`You have successfully purchased ${amount} ${token} tokens.`);
                document.getElementById('balance').textContent = `Balance: $${balance}`;
                renderHoldingsPage();
            } else {
                alert('Invalid input or insufficient balance.');
            }
        });

        const wishlistBtn = document.createElement('button');
        wishlistBtn.textContent = 'Add to Wishlist';
        wishlistBtn.addEventListener('click', () => {
            if (!wishlist.includes(token)) {
                wishlist.push(token);
                alert('Successfully added to your wishlist.');
                renderWishlistPage();
            } else {
                alert('This token is already in your wishlist.');
            }
        });

        const profitLoss = document.createElement('p');
        profitLoss.textContent = ''; 

        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(purchaseBtn);
        card.appendChild(wishlistBtn);
        card.appendChild(profitLoss); 
        homePage.appendChild(card);
    });
}

function renderWishlistPage() {
    const wishlistPage = document.getElementById('wishlistPage');
    wishlistPage.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistPage.textContent = 'Wishlist is empty.';
    } else {
        wishlist.forEach(token => {
            const card = document.createElement('div');
            card.classList.add('card');

            const name = document.createElement('p');
            name.textContent = token;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                wishlist = wishlist.filter(item => item !== token);
                renderWishlistPage();
            });

            const purchaseBtn = document.createElement('button');
            purchaseBtn.textContent = 'Purchase';
            purchaseBtn.addEventListener('click', () => {
                const amount = parseInt(prompt(`How many ${token} tokens do you want to buy?`));
                if (!isNaN(amount) && amount > 0 && balance >= amount * cryptoData[token]) {
                    balance -= amount * cryptoData[token];
                    if (holdings[token]) {
                        holdings[token] += amount;
                    } else {
                        holdings[token] = amount;
                    }
                    alert(`You have successfully purchased ${amount} ${token} tokens.`);
                    wishlist = wishlist.filter(item => item !== token);
                    document.getElementById('balance').textContent = `Balance: $${balance}`;
                    renderHoldingsPage();
                    renderWishlistPage();
                } else {
                    alert('Invalid input or insufficient balance.');
                }
            });

            const profitLoss = document.createElement('p');
            profitLoss.textContent = ''; 

            card.appendChild(name);
            card.appendChild(removeBtn);
            card.appendChild(purchaseBtn);
            card.appendChild(profitLoss);
            wishlistPage.appendChild(card);
        });
    }
}

function renderHoldingsPage() {
    const holdingsPage = document.getElementById('holdingsPage');
    holdingsPage.innerHTML = '';

    if (Object.keys(holdings).length === 0) {
        holdingsPage.textContent = 'Holdings is empty.';
    } else {
        Object.keys(holdings).forEach(token => {
            if (holdings[token] > 0) {
                const card = document.createElement('div');
                card.classList.add('card');

                const name = document.createElement('p');
                name.textContent = token;

                const amount = document.createElement('p');
                amount.textContent = `Amount: ${holdings[token]}`;

                const currentPrice = document.createElement('p');
                currentPrice.textContent = `Current Price: $${cryptoData[token]}`;

                const sellBtn = document.createElement('button');
                sellBtn.textContent = 'Sell';
                sellBtn.addEventListener('click', () => {
                    const amountToSell = parseInt(prompt(`How many ${token} tokens do you want to sell?`));
                    if (!isNaN(amountToSell) && amountToSell > 0 && holdings[token] >= amountToSell) {
                        const isProfit = Math.random() >= 0.5; 
                        const percentage = Math.floor(Math.random() * 10) + 1; 
                        let profitLossAmount = 0;

                        if (isProfit) {
                            profitLossAmount = (cryptoData[token] * amountToSell * percentage) / 100;
                            balance += profitLossAmount;
                        } else {
                            profitLossAmount = (cryptoData[token] * amountToSell * percentage) / 100;
                            balance -= profitLossAmount;
                        }

                        balance += amountToSell * cryptoData[token];

                        alert(`You have successfully sold ${amountToSell} ${token} tokens. ${isProfit ? 'Profit' : 'Loss'}: $${profitLossAmount}.`);
                        holdings[token] -= amountToSell;
                        document.getElementById('balance').textContent = `Balance: $${balance}`;
                        renderHoldingsPage();
                    } else {
                        alert('Invalid input or insufficient holdings.');
                    }
                });

                const profitLoss = document.createElement('p');
                profitLoss.textContent = ''; 

                card.appendChild(name);
                card.appendChild(amount);
                card.appendChild(currentPrice);
                card.appendChild(profitLoss); 
                card.appendChild(sellBtn);
                holdingsPage.appendChild(card);
            } else {
                delete holdings[token]; 
            }
        });
    }
}

// Initial render
navigate('home');
