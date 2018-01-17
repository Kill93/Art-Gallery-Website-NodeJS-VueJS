<template>
  <footer>
    <div class="container">
      <div class="row2">
        <div class="col-sm-4">
          <div class="footer-block">
            <ul class="list-inline footer-menu">
              <li><a href="http://www.tate.org.uk/">Tate Gallery</a></li>
              <li><a href="">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="footer-block text-center">
            <p class="copyright">
              © 2017 Killian Nolan. All rights reserved.
            </p>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="footer-block">
            <ul class="list-inline pull-right social-icon">
              <li><a href=""><i class="fa fa-facebook"></i></a></li>
              <li><a href=""><i class="fa fa-twitter"></i></a></li>
              <li><a href=""><i class="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
  footer{
    background: #383838;
    padding: 20px 20px;
    color: #188b87;
  }

  footer p {
    color: #188b87;
  }
  footer ul, footer p{
    margin-bottom: 0;
  }
  footer .footer-block{
    margin-bottom: 30px;
  }
  footer a{
    color: #188b87;
  }
  footer .footer-menu a{
    text-transform: uppercase;
  }
  @media (max-width: 767px){
    footer .footer-menu{
      text-align: center;
    }
    footer .social-icon{
      float: none !important;
      text-align: center;
    }
  }

</style>
