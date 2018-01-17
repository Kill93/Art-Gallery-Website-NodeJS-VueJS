<template>
  <div id = "Artwork">
    <h2>Artwork Collection</h2>
    <div id = "search"><select v-model="selected">
      <div id = "searchBar">
      <option disabled value="">Please select an Artist</option>
      </div>
      <option v-for="artist in artistsNames"> {{ artist.artist }}</option>
    </select><br><br>
      <span><p><b>Selected:</b> {{ selected }}</p></span><br><br>
    <a href="#" class="btn btn-info btn-lg" v-on:click="searchArt(selected)">
      <span class="glyphicon glyphicon-search"></span> Search
    </a>
    </div>

    <div class="container">

        <div class="support-grid">

        <section class="grid-1">
          <div class="item-1"v-for="result in results">
            <div id = "img"><img :src="result.thumbnailUrl" >
            </div>

          <div class="caption">
            <h4 class="group inner list-group-item-heading">
              {{ result.title }}</h4> <br>
            <p class="group inner list-group-item-text">
              {{ result.dimensions }}</p>
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <p class="lead">
                  <b>€{{ result.price }}</b></p>
              </div><br>
                <a class="btn btn-success" v-if="user != 'guest' && user !='Admin'" v-on:click="addToCart(result)">Add to cart</a>
            </div>
          </div>
          </div>
        </section>
        </div>
    </div>
  </div>
</template>

<script>

  import axios from "axios";
  import vSelect from "vue-select"
  import Header from '../Header.vue'

  export default {
    props: ['items', 'user'],
    name: 'app',
    components: {vSelect},
    data() {
      return {
        artwork: [],
        artistsNames: [],
        results: [],
        selected: null,
        showCart: false,
        verified: false,
      }
    },
    computed: {
      total() {
        var total = 0;
        for(var i = 0; i < this.items.length; i++) {
          total += this.items[i].price;
        }
        return total;
      }
    },
    mounted() {
      axios({ method: "GET", "url": "http://localhost:3000/artworkArtists" }).then(result => {

        this.artistsNames = result.data;

      }, error => {
        console.error(error);
      });
    },
    methods: {
      searchArt(artistName) {
        axios({ method: "GET", "url": "http://localhost:3000/artwork" }).then(result => {
          var results = [];
          var i =0;

          for (i = 0; i < result.data.length; i++) {

            if (result.data[i].artist == artistName) {
              var art = {
                "id": result.data[i].id,
                "title": result.data[i].title,
                "thumbnailUrl": result.data[i].thumbnailUrl,
                "dimensions": result.data[i].dimensions,
                "price": result.data[i].price,
                "quantity": 1,
              }
              results.push(art);
            }
          }
          this.results = results;
        }).catch( error => { console.log(error); });
      },
      addToCart(item) {
        this.$emit('itemAdded', item);
      },
      removeFromCart(item) {
        item.quantity -= 1;
        this.items.splice(this.items.indexOf(item), 1);
      }
    }
  };
</script>

<style>

  #Artwork {
    min-height: 800px;
    margin:auto;
    margin-top: 70px;
    text-align: center;
    color: white;
  }

  .container {
    max-width: 900px;
    margin-top: 20px;
  }

  .support-grid {
    width: 100px;
  }

  .grid-1 {
    padding-top: 40px;
    display: grid;
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    text-align: center;
  }

  /* items */

  .grid-1 div {
    font-size: 20px;
    padding: 20px;
    text-align:center;
    margin-left: -15px;
  }

  .row a {
    text-align:center;
    margin-left: -100px;
    margin-top: 60px;
    position:absolute;
  }

  .row p {
    text-align:center;
    margin-left: 90px;
  }

  #search {
    margin: auto;
    margin-top:50px;
    margin-bottom: 20px;
    color: black;
  }

  #search p{
    color: white;
  }

  #img {
    height:300px;
    text-align:center;
  }

  #img img {
    max-height: 300px;
    max-width: 300px;
  }

  #Artwork p {
    color: white;
  }

</style>
