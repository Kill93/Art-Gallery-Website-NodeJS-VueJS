<template>
  <div id="app">
    <app-header :items="items" :user="user" @removeFromCart="removeFromCart" @login="login"></app-header>
    <router-view @itemAdded="itemAdded" @checkout="checkout" @removeFromCart="removeFromCart" :user="user" :items="items" ></router-view>
    <app-footer></app-footer>
    </div>
</template>

<script>

  import Artwork from './Components/Main/Artwork.vue';
  import Header from './Components/Header.vue';
  var icons = require('glyphicons')

export default {
//  name: 'app',
  data() {
    return {
      items: [],
      user: 'guest'
    }
  },
  methods: {
    itemAdded(item) {
      var i =0;
      var add = 1;
        if (this.items.length == 0){
          this.items.push({id: item.id, title: item.title, thumbnail: item.thumbnailUrl, price: item.price, quantity: item.quantity})
        }
        else  {
          for (i = 0; i < this.items.length; i++) {
            if (item.id == this.items[i].id) {
              this.items[i].quantity+= 1;
              console.log("Added to Items Quantity")
              add = 1;
            }
            else {
              console.log("Added to Items List")
              add = 2;
            }
          }
          if (add == 2) {
            this.items.push({id: item.id, title: item.title, price: item.price, quantity: item.quantity})
          }
      }
    },
    login(username) {
      this.user= username
    },
    checkout() {
      this.items = []
    },
    removeFromCart(item) {
      var i =0;
      for (i = 0; i < this.items.length; i++) {
        if (item.id == this.items[i].id) {
          if(this.items[i].quantity == 1) {
            this.items.splice(i, 1);
          } else {
            this.items[i].quantity -= 1;
          }
        }
      }
    }
  },
    components: {
      appHeader: Header,
      appArtwork: Artwork
    }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';

  #app
  {
    background-color: black;
  }
</style>
