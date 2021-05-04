const API_URL =
'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: '',
        basketList: ''
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
