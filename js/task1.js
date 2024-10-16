const Chance = require('chance');
const chance = new Chance();


let selectPersonCount = 5;

class Customer {
    constructor(name, card, money) {
        this.name = name,
        this.card = card,
        this.money = money
    }
}
const buyers = [];

class Product {
    constructor(name, price, count) {
        this.name = name,
        this.price = price,
        this.count = count
    }
}

const products = [new Product("mouse", 1000, 10), new Product("keyboard", 1500, 15), new Product("microphone", 2000, 5)];

function createBuyer(person, count) {
    for (let i = 0; i < count; i++) {
        const buyer = new person;
        buyer.name = chance.first();
        buyer.card = Math.floor(Math.random() * 1000) + 1;
        buyer.money = Math.floor(Math.random() * 10000) + 1;
        buyer.moneySpend = 0;
        buyer.productsBought = 0;
        buyers.push(buyer);
        console.log(buyer);
    }
}
createBuyer(Customer, selectPersonCount);

let shopProfit = 0;

function buy(buyer, product) {
    product.count -= 1;
    buyer.money = buyer.money - product.price;
    shopProfit += product.price;
    buyer.productsBought += 1;
    buyer.moneySpend += product.price;
}
// buy(buyers[0], products[0]);

while (true) {
    let smth = false;

    buyers.forEach(buyer => {
        products.forEach(product => {
            if (buyer.money >= product.price) {
                buy(buyer, product);
                smth = true;
            }
        })
    })
    if (smth === false) {
        break;
    }
}
console.log("Прибуток магазину складає " + shopProfit);
// console.log(JSON.stringify(buyers));
// console.log(JSON.stringify(products));

console.log("Більше всього товарів купив:");
console.log(buyers.sort((a, b) => b.productsBought - a.productsBought)[0]);
console.log("Більше всього витратив грошей:");
console.log(buyers.sort((a, b) => b.moneySpend - a.moneySpend)[0]);


// const numOfCard = Math.floor(Math.random() * 1000) + 1;
// console.log(numOfCard);

// const startMoney = Math.floor(Math.random() * 10000) + 1;
// console.log(startMoney);

// const randomName = chance.first();
// console.log(randomName);

// let arr = [1, 2, 3, 4, 5];
// const found = arr.find((3));
// console.log(found);


// Сортування

// class Buyer{
 
//     constructor(name, count){
// 	this.name = name;
// 	this.count = count;
//     }
// }
 
 
// function bubbleSort(array,   compareFunction){
//     for(let i = 0; i < array.length ;i++){
// 	for(let j = i+1; j < array.length; j ++){
// 	    if(compareFunction(array[i], array[j]) < 0){
// 		let temp = array[j];
// 		array[j] = array[i];
// 		array[i] = temp;
// 	    }
// 	}
//     }
// }
 
// const buyers = [new Buyer("serhii",123) , new Buyer("Artem", 434), new Buyer('Maxim', 343)];
 
 
// bubbleSort(buyers, (a,b)=>a.count - b.count);
// console.log(buyers);
