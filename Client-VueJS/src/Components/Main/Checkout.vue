<template>
  <div id = "Checkout">
    <div id = "orderSuccess" v-if = "items == ''">
      <h2> Thanks for Ordering!</h2>
    </div>

  <div class="container" v-if="user != 'guest' && user !='Admin' && items != ''" >
    <div class="row">
      <div class="col-xs-8">
        <div class="panel panel-info">
          <div class="panel-heading">
            <div class="panel-title">
              <div class="row">
                <div class="col-xs-6">
                  <h5><span class="glyphicon glyphicon-shopping-cart" ></span> Shopping Cart</h5>
                </div>
                <div class="col-xs-6">
                  <button type="button" class="btn btn-primary btn-sm btn-block">
                    <span class="glyphicon glyphicon-share-alt"></span> Continue shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <hr>
            <div class="row" v-for="item in items">
              <div class="col-xs-2"><img :src="item.thumbnailUrl" >
              </div>
              <div class="col-xs-4">
                <h4 class="product-name"><strong>{{ item.title }}</strong></h4>
              </div>
              <div class="col-xs-6">
                <div class="col-xs-6 text-right">
                  <h6><strong>€ {{ item.price }} <span class="text-muted">x</span></strong></h6>
                </div>
                <div class="col-xs-4">
                  {{item.quantity}}
                </div>
                <div class="col-xs-2">
                  <button type="button" class="btn btn-link btn-xs">
                    <span @click="removeFromCart(item)" class="glyphicon glyphicon-trash"> </span>
                  </button>
                </div>
              </div>
            </div>
            <hr>
          </div>
          <div class="panel-footer">
            <div class="row text-center">
              <div class="col-xs-9">
                <h4 class="text-right">Total <strong>{{ total }}</strong></h4>
              </div>
              <div class="col-xs-3">
                <button type="button" class="btn btn-success btn-block" v-on:click="checkout()">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>

  import axios from "axios";

  export default {
    props: ['items', 'user' ],
    data (){
      return {
        verified: false,
        order: 'due',
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
      removeFromCart(item) {
        this.$emit('removeFromCart', item);
      },
      checkout() {
        var order = {
          "user": this.user,
          "total": this.total,
        }

        axios({
          url: 'http://localhost:3000/checkout',
          method: 'post',
          contentType: 'application/json',
          data: order,
        }).then(result => {
          console.log("Order Submitted!")
          this.$emit('checkout');
          this.order='complete'
        }).catch(error => {
          console.log(error);
        });
      },
    },
  }


</script>

<style>

  #Checkout
  {
    min-height: 900px;
  }

  .container{
    margin-top: 100px;
    margin-left: 250px;
  }

  .panel {
    width:850px;
  }

  #orderSuccess h2 {
    color: white;
    margin-top: 200px;
    margin-left: 500px;
  }
</style>


