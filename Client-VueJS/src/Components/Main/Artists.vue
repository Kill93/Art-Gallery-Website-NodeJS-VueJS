<template>
  <div id="Artists">
    <h2>Artists</h2>
    <div id = "search"><select v-model="selected">
      <option disabled value="">Please select an Artist</option>
      <option v-for="artist in artistsNames"> {{ artist.name }}</option>
    </select>
    <br><br>
      <a href="#" class="btn btn-info btn-lg" v-on:click="searchArt(selected)">
        <span class="glyphicon glyphicon-search"></span> Search
      </a>
    </div>

    <div class="rowA">
      <div class="col-lg-3 col-sm-6">

        <div class="card hovercard" v-for="artist in results">
          <div class="avatar">
            <img alt="" v-if="artist.gender == 'Male'" src="http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/man-artist.png">
            <img alt="" v-if="artist.gender == 'Female'" src="http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/woman-artist-medium-skin-tone.png">
          </div>
          <div class="info">
            <div class="title">
              <h2>{{ artist.name }}</h2>
            </div>
            <table class="table table-bordered">
              <tr>
                <th class="blue-grey lighten-4">Name</th>
                <td>{{ artist.name }}</td></tr>
              <tr>
                <th>Gender</th>
                <td>{{ artist.gender }}</td></tr>
              <tr>
                <th>Year Of Birth</th>
                <td>{{ artist.yearOfBirth }}</td></tr>
              <tr>
                <th>Year Of Death</th>
                <td>{{ artist.yearOfDeath }}</td></tr>
              <tr>
                <th>URL</th>
                <td><a href {{ artist.url }} </td></tr>
            </table>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

  import axios from "axios";
  import vSelect from "vue-select"

  export default {
    name: 'app',
    components: {vSelect},
    data() {
      return {
        artistsNames: [],
        options: [],
        results: [],
        selected: null,
      }
    },
      mounted() {
        axios({method: "GET", "url": "http://localhost:3000/artists"}).then(result => {

          this.artistsNames = result.data;

        }, error => {
          console.error(error);
        });
      },
      methods: {
        searchArt(selected) {
          axios({method: "GET", "url": "http://localhost:3000/artists"}).then(result => {
            var results = [];
            var i = 0;

            for (i = 0; i < result.data.length; i++) {

              if (result.data[i].name == selected) {
                var artistData = {
                  "id": result.data[i].id,
                  "name": result.data[i].name,
                  "gender": result.data[i].gender,
                  "date": result.data[i].date,
                  "yearOfBirth": result.data[i].yearOfBirth,
                  "yearOfDeath": result.data[i].yearOfDeath,
                  "placeOfBirth": result.data[i].placeOfBirth,
                  "placeOfDeath": result.data[i].placeOfDeath,
                  "url": result.data[i].url,
                }
                results.push(artistData);
              }
            }
            this.results = results;
          }).catch(error => {
            console.log(error);
          });
        },
      }
  }
</script>

<style>
  #Artists {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    margin-top: 60px;
    min-height: 400px;
    height: 900px;
  }


  h1, h2 {
    font-weight: normal;
    color: #00FFFF;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }


.rowA {
  margin-left: 400px;
  margin-bottom: 100px;
}
  .card {
    padding-top: 20px;
    width: 600px;
    height: 500px;
    margin: 10px 0 20px 0;
    background-color: rgba(214, 224, 226, 0.2);
    border-top-width: 0;
    border-bottom-width: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: 3px 3px grey, -.1em 0 0.4em grey;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .card .card-heading.image img {
    display: inline-block;
    width: 46px;
    height: 46px;
    margin-right: 15px;
    vertical-align: top;
    border: 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .card .card-heading.image .card-heading-header h3 {
    margin: 0;
    font-size: 14px;
    line-height: 16px;
    color: #262626;
  }

  .card .card-heading.image .card-heading-header span {
    font-size: 12px;
    color: #999999;
  }

  .card .card-media img {
    max-width: 100%;
    max-height: 100%;
  }

  .card .card-comments .comments-collapse-toggle a,
  .card .card-comments .comments-collapse-toggle span {
    padding-right: 5px;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card.people .card-info .title {
    display: block;
    margin: 8px 14px 0 14px;
    overflow: hidden;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    color: #404040;
  }

  .card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: rgba(214, 224, 226, 0.2);
  }

  .card.hovercard .avatar {
    position: relative;
    top: -50px;
    margin-bottom: -50px;
  }

  .card.hovercard .avatar img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255,255,255,0.5);
  }

  .card.hovercard .info {
    padding: 4px 8px 10px;
  }

  .card.hovercard .info .title {
    margin-bottom: 4px;
    font-size: 24px;
    line-height: 1;
    color: #262626;
    vertical-align: middle;
  }

  .avatar {
    margin-top: 100px;
  }

  table {
    margin:auto;
    margin-top: 50px;
  }
</style>
