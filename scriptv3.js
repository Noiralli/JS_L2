const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
      let xhr;
  
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) resolve(xhr.responseText)
          else reject('Error')
        }
      }
  
      xhr.open('GET', `${API_URL}${url}`, true);
      xhr.send();
    })
  };

class GoodsItem {
    constructor (product_name, price){
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `
                <div class="goods-item">
                    <h3>${this.product_name}</h3>
                    <p>${this.price}</p>
                    <span id="${this.id_product}">ID Product</span>
                </div>
                `;
    }
};
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods () {
        return makeGETRequest('/catalogData.json')
        .then((goods) => {
            this.goods = JSON.parse(goods);
        })
    }
    render () {
        let listHtml = '';
        this.goods.forEach(good => {
                const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
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
  getListGoods(){}
}


const list = new GoodsList();
list.fetchGoods()
  .then(() => list.render());
