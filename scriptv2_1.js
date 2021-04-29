class GoodsItem {
    constructor (title, price){
        this.title = title;
        this.price = price;
    }
    render() {
        return `
                <div class="goods-item">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                </div>
                `;
    }
}

// let PriceSum = 0;

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods () {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 11250 },
            { title: 'Shoes', price: 1250 },
            { title: 'Shoes', price: 3250 }
        ];
    }
    render () {
        let listHtml = '';
        this.goods.forEach(good => {
                const goodItem = new GoodsItem(good.title, good.price);
                listHtml += goodItem.render();
            });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    TotalPriceSum () {
        let PriceSum = 0;
        this.goods.forEach((itemPrice) => PriceSum += itemPrice.price);
        return PriceSum;
    }
}

class BasketItem extends GoodsItem {
    constructor() {
        super();
    }
    addItemOne(){}
    addItemFive(){}
    deleteAll(){}
    deleteItemOne(){}
    deleteItemFive(){}
}

class GoodsBasket extends GoodsList {
    constructor () {
        super()
    }
    deleteAllBasket(){}
    buyAllBasket(){}
}


const list = new GoodsList();
list.fetchGoods();
list.render(); 
let test = list.TotalPriceSum();

// setTimeout(() => {
//     alert('Сумма всех товаров' + test)    
// }, 4000);

