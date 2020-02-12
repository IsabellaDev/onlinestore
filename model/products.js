const fakeDB={
    categories: [],
    bestsellers: [],
    productList: [],
    setCategories(){
        this.categories.push({description: "Shop Valentine's Day gifts", src: "/img/category-1.jpg", link: "See more"});
        this.categories.push({description: "Baby nursery", src: "/img/category-2.jpg", link: "Shop now"});
        this.categories.push({description: "Shop deals in Tools", src: "/img/category-3.jpg", link: "Learn more"});
        this.categories.push({description: "Nutrition & Wellness", src: "/img/category-4.jpg", link: "Shop now"});
    },
    displayCategories(){
        return this.categories;
    },

    setBestsellers(){
        this.bestsellers.push({des: "no1", src: "/img/bestseller-1.jpg"});
        this.bestsellers.push({des: "no1", src: "/img/bestseller-2.jpg"});
        this.bestsellers.push({des: "no1", src: "/img/bestseller-3.jpg"});
        this.bestsellers.push({des: "no1", src: "/img/bestseller-4.jpg"});
        this.bestsellers.push({des: "no1", src: "/img/bestseller-5.jpg"});
        this.bestsellers.push({des: "no1", src: "/img/bestseller-6.jpg"});
        this.bestsellers.push({des: "no1", src: "/img/bestseller-7.jpg"});
    },

    displayBestsellers(){

        return this.bestsellers;
    },

    setProductList(){
        this.productList.push({src: "/img/list-1.jpg", des: "Fire TV Stick 4K with Alexa Voice Remote, streaming media player", price: 59.99, hot: true});
        this.productList.push({src: "/img/list-2.jpg", des: "Fire TV Stick with Alexa Voice Remote, streaming media player", price: 39.99, hot: true});
        this.productList.push({src: "/img/list-3.jpg", des: "Echo Dot (3rd gen) - Smart speaker with Alexa - Charcoal", price: 44.99, hot: true});
        this.productList.push({src: "/img/list-4.jpg", des: "Kindle Paperwhite – Now Waterproof with 2x the Storage", price: 114.99, hot: true});
        this.productList.push({src: "/img/list-5.jpg", des: "Fire HD 8 Tablet | 8\" HD Display, 16 GB, Black", price: 99.99, hot: true});
        this.productList.push({src: "/img/list-6.jpg", des: "Echo Dot (3rd gen) - Smart speaker with Alexa - Plum", price: 44.99, hot: true});
    },
    displayProductList(){
        return this.productList;
    }

};

fakeDB.setCategories();
fakeDB.setBestsellers();
fakeDB.setProductList();
module.exports=fakeDB;
