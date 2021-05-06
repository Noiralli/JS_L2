// 1. Вынести поиск в отдельный компонент.
// 2. Вынести корзину в отдельный компонент.
// 3. *Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.

const API_URL =
'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item v-for="good in goods" :good="good"></goods-item>
        </div>
    `
});
Vue.component('goods-item', {
    props: ['good'],
    template: `
        <div class="goods-item">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
        </div>
    `
});
Vue.component('search-input', {
    props:['searchLine'],
    template: `
            <input type="text" class="goods-search"
                 v-bind:searchLine="searchLine"
                 v-on:input="$emit('input', $event.target.searchLine)"
            >`
});
Vue.component('search-button', {
    inject: ['filterGoods'],
    template: `
        <button class="search-button" type="button" @click="filterGoods">Искать</button>
    `
});
Vue.component('basket-button', {
    inject:['stateBasket'],
    template: `
        <div>
            <button class="basket-button" type="button" @click="stateBasket">Корзина</button>
        </div>    
    `
});




const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: '',
        basketList: '',
        name: 'Frodo Bigi11111nnssss',
    },
    provide: function () {
        return {
            stateBasket: this.stateBasket,
            filterGoods: this.filterGoods
        }
    },
    methods: {
        makeGETRequest(url, callback) {
            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                    }
            }

            xhr.open('GET', url, true);
            xhr.send();
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        stateBasket () {
            this.isVisibleCart = !this.isVisibleCart; 
        }
        
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);        
        });
    },
    computed: {
        // filteredList() {
        //   return this.postList.filter(post => {
        //     return post.title.toLowerCase().includes(this.searchLine.toLowerCase())
        //   })
        // },
        // getFilteredGoods(searchLine){
        //     const regexp = new RegExp(searchLine, 'i');
        //     this.FilterGoods = this.filter(good => regexp.test(good.product_name));

        //     let filteredGoods = this.filteredGoods.filter( itemGoods => {
        //         return itemGoods.product_name.toLowerCase().includes(this.searchLine.toLowerCase());
        //     });
        //     return filteredGoods;
        // }
    }
});


