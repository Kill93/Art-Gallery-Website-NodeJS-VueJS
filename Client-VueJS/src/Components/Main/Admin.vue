<template>
  <div class = "adminPage">
    <h1> Choose an Option!</h1>
    <div id = "buttonDiv">
      <button type="button" class="btn btn-default btn-sm" @click="showArtistForm=!showArtistForm;showPaintingForm=false" v-show="!verifiedA" > Upload an Artist!
    </button>

      <button type="button" class="btn btn-default btn-sm" @click="showPaintingForm=!showPaintingForm;showArtistForm=false" v-show="!verifiedP"> Upload a Painting!
      </button>

    </div>

    <div class="page" v-show="showArtistForm">
      <form>
        <div class="form-group">
          <div class="form-group">
            <label for="exampleInputEmail1" >Artist</label>
            <input type="text" name="Artist.name" v-model="Artist.name" class="form-control" placeholder="..">
          </div>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Gender</label>
          <select class="form-control" name = "Artist.gender" v-model="Artist.gender">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Year Of Birth</label>
          <input type="number" class="form-control" name="Artist.yearOfBirth" v-model="Artist.yearOfBirth" placeholder="Year">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Year Of Death</label>
          <input type="number" class="form-control" name="Artist.yearOfDeath" v-model="Artist.yearOfDeath" placeholder="Year">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">URL</label>
          <input type="text" class="form-control" name ="Artist.url" v-model="Artist.url" placeholder="www.">
        </div>
        <a href="#/artists" class="btn btn-primary" v-on:click="addArtist">Add Artist</a>
      </form>
    </div>

    <div class="page" v-show="showPaintingForm">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1" >Artist Name</label>
          <div id = "search"><select v-model="Artwork.artist" >
            <option disabled value="">Please select an Artist</option>
            <option name = "Artwork.artist" v-for="artistA in artistsNames"> {{ artistA.name }}</option>
          </select>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1" >Title</label>
          <input type="text" name="Artwork.title" v-model="Artwork.title" class="form-control" placeholder="..">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Dimensions</label>
          <input type="text" class="form-control" name="Artwork.dimensions" v-model="Artwork.dimensions" placeholder="00x00">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Image</label>
          <input type="text" class="form-control" name ="Artwork.thumbnailUrl" v-model="Artwork.thumbnailUrl" placeholder="..">
        </div>
        <a href="#/artwork" class="btn btn-primary" v-on:click="addPainting">Add Painting</a>
      </form>
    </div>

  </div>
</template>

<script>

  import axios from "axios";
  import vSelect from "vue-select"

  export default {
    components: {vSelect},
    data() {
      return {
        showArtistForm: false,
        showPaintingForm: false,
        verifiedA: false,
        verifiedP: false,
        artistsNames: [],
        selected: null,
        Artist: {
          name: '',
          gender: '',
          yearOfBirth: '',
          yearOfDeath: '',
          url: ''
        },
        Artwork: {
          artist: '',
          title: '',
          dimensions: '',
          thumbnailUrl: '',
        },
      }
    },
    mounted() {
      axios({method: "GET", "url": "http://localhost:3000/artists"}).then(result => {

        this.artistsNames = result.data;

      }, error => {
        console.error(error);
      });
    },
    ready: function(){
      this.fetchArtists();
    },
    methods: {
      addArtist() {

        var id = Math.floor((Math.random() * 100000) + 1);

        var newA = {
          "id": id,
          "name": this.Artist.name,
          "gender": this.Artist.gender,
          "yearOfBirth": this.Artist.yearOfBirth,
          "yearOfDeath": this.Artist.yearOfDeath,
          "url": this.Artist.url,
        }

        axios({
          url: 'http://localhost:3000/newArtist',
          method: 'post',
          contentType: 'application/json',
          data: newA
        })
        console.log(newA)
      },

      addPainting() {

        var id = Math.floor((Math.random() * 100000) + 1);

        var newArt = {
          "id": id,
          "artist": this.Artwork.artist,
          "title": this.Artwork.title,
          "dimensions": this.Artwork.dimensions,
          "thumbnailUrl": this.Artwork.thumbnailUrl,
        }

        axios({
          url: 'http://localhost:3000/newArtwork',
          method: 'post',
          contentType: 'application/json',
          data: newArt
        })
        console.log (newArt)
      }
    },
  }
</script>

<style>

.adminPage {
  width: 50%;
  margin: auto;
      margin-top: 60px;
  height: 1000px;
  text-align: center;
}

.adminPage h1 {
color: #00FFFF;
}

.adminPage form {
color: white;
margin-top: 100px;
}

.buttonDiv button {
  width: 10px;
  margin-bottom: 100px;
}

#search {
color: black;
text-align:center;
}
</style>
