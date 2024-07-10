function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function show() {
    let x = 10;
     delay(2000);  // Wait for 2 seconds
    x = 20;             // Change x after the delay
    console.log(x);     // Log x after it has been updated
}

show();
