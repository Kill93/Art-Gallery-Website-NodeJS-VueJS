<template>
  <div id = 'Home'>
      <div class ="main header-filter" :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div class="brand">
              <h1>Tate Gallery</h1>
              <h3>Welcome to Our Gallery!</h3>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        backgroundImage: 'http://www.desktop-screens.com/data/out/14/2592597-black-tiger-wallpapers.jpg',
        user: 'guest'
      }
    },
  }
</script>

<style>
  #Home {
    min-height: 400px;
    margin-top: -250px;
    font-style: oblique;
    color: white;
  }

  .brand {
    margin-top: 450px;
    margin-left: -200px;
  }

  .main {
    height: 900px;
  }


</style>
