<template>
  <div id = "Header">

    <img src="../assets/tate-logo2.jpg"/>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header"><a href="#/" class="navbar-brand">TATE</a></div>
        <ul class="nav navbar-nav">
          <li><a href="#/artwork">Collection</a></li>
          <li><a href="#/artists">Artists</a></li>
          <li v-if="user == 'Admin'"><a href="#/admin">Admin</a></li>
          <div id = cartButton v-if="user != 'guest' && user !='Admin'" >
            <button type="button" class="btn btn-default btn-sm" @click="showCart = !showCart" v-show="!verified">
              <span class="glyphicon glyphicon-shopping-cart"></span> {{ items.length + (items.length > 1 || items.length === 0 ? " items" : " item") }}
            </button>
          </div>

        </ul>
        <ul class="nav navbar-nav navbar-right" v-if="user != 'guest'">
          <li>
            <a href="#" data-toggle="modal" v-on:click="logout(username)">logout</a>
          </li>
        </ul>

      <form id="signin" class="navbar-form navbar-right" role="form" v-if="user == 'guest'">
        <div class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
          <input id="text" type="text" class="form-control" name="username" v-model="username" value="" placeholder="Username">
        </div>
        <div class="input-group" v-if="user == 'guest'" >
          <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
          <input id="password" type="password" class="form-control" name="password" v-model="password" value="" placeholder="Password">
        </div>
        <button type="button" class="btn btn-primary" v-on:click="login" >Submit</button>
      </form>

      </div>

      <div class="cart" v-show="showCart">
        <div>
        <div v-show="items.length > 0">
          <ul>
            <li v-for="item in items" transition="fade">
              <p><strong>€{{ item.price }}</strong> - {{ item.title }} - QTY :{{item.quantity}} <i class="fa fa-trash" @click="removeFromCart(item)"></i></p>
              <i><span @click="removeFromCart(item)">REMOVE</span></i>
            </li>
          </ul>
          €{{ total }}
          <a href="#/checkout">Check out</a></div>
        </div>
        <div v-show="items.length === 0">
          <p>Nothing in your cart!</p>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>

  import Artwork from './Main/Artwork.vue';
  import axios from "axios";

  export default {
    props: ['items', 'user' ],
    data (){
      return {
        showCart: false,
        verified: false,
        username: '',
        password: ''
      }
    },
    computed: {
      total: function () {
        var total = 0;
        for(var i = 0; i < this.items.length; i++) {
          var a = parseFloat((this.items[i].price * this.items[i].quantity).toFixed(2))
          total += a;
        }
        return total;
      }
    },
    methods: {
      removeFromCart(item) {
        this.$emit('removeFromCart', item);
      },
      logout(username) {
        var username1 = 'guest';
        this.$emit('login', username1);
        console.log("hi");
      },
      login() {

        var logUser = {
          "username": this.username,
          "password": this.password,
        }

        axios({
          url: 'http://localhost:3000/login',
          method: 'post',
          contentType: 'application/json',
          data: logUser,
        }).then(result => {
          if (result.data.success) {
            this.$emit('login', result.data.name);
          }
        }).catch(error => {
          console.log(error);
        });
      }
    },
  }

</script>

<style>

  #Header img{
    margin-left: 400px;
    height: 200px;
    width: 550px;
  }

#cartButton
{
  margin-left: 1200px;
  margin-top: 10px;
}

.cart div {
  z-index: 100;
  background: #fff;
  padding: 20px 30px;
  position: absolute;
  right: 30px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 250px;

}
.cart ul, li, p {
  margin-bottom: 0;
  color: white;
}

p {
  color: black;
}
.cart button {
  margin: 20px 0 10px;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 2px;
}

  i {
    color:black;
  }

</style>


