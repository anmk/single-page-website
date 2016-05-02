/** ===================================================================================
  *  Project: Single Page Website
  *  Author: Andrzej Kałowski
  *  $id: main.js
  *  ==================================================================================
  */

(function($) {

  'use strict';

  var App = {

    /**
      * Menu and sliders animations
      */

    viewAnimations: function() {

      var oldId,
        win = $(window),
        site = $('html, body'),
        menu = $("#nav-top"),
        topSlider = $("#top-bx-slider"),
        bottomSlider = $("#owl-carousel"),
        menuItems = menu.find("a"),
        topSliderItems = topSlider.find("a"),
        bottomSliderItems = bottomSlider.find("a"),
        marginTop = 120,
        siteHeight = menu.outerHeight()+marginTop;

      /* Anchors for menu items */

      var scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        try { 
            if (item.length) { return item;}
        } catch(e) {
          window.alert(e);
        }
      });
      
      /* Animations when you click on a menu and sliders */

      function Move(i){
        var link = $(this).attr("href");
        var offsetPos;
        try {
          offsetPos = link === "#" ? 0 : $(link).offset().top-siteHeight+1;
        } catch(e) {
          window.alert(e);
        }

        try {
          site.stop().animate({ 
            scrollTop: offsetPos
          }, 1000);
        } catch(e) { 
          window.alert(e);
        }
        i.preventDefault();
      }

      menuItems.on("click", Move);
      topSliderItems.on("click", Move);
      bottomSliderItems.on("click", Move);
      /* / Animations when you click on a menu and sliders */

      /* After you scroll view */

      win.scroll(function(){

        /* Obtain position */

        var position = $(this).scrollTop()+siteHeight+1;
        var current;
        try { 
          current = scrollItems.map(function(){
            var offTop = $(this).offset().top;
            if (offTop < position) {
              return this;
            }
          });
        } catch(e) { 
          window.alert(e); 
        }
    
        current = current[current.length-1];
        var id = current && current.length ? current[0].id : "";

        /* Set or remove active */

        try {
          if (oldId !== id) {
             oldId = id;
             menuItems.parent().removeClass("active").end().filter("[href=#"+id+"]").parent().addClass("active");
          }
        } catch(e) { 
          window.alert(e);
        }

      });
      /* / After you scroll view */

    },
    /* / viewAnimations */

    /**
      * Sliders script
      */

    sliders: function() {

      /* Bx Slider */

      $("#top-bx-slider").bxSlider({
        speed: 1000,
        mode: 'fade',
        auto: true,
        autoControls: true,
        startText: '',
        stopText: '',
        controls: false,
        pager: true,
        pagerType: 'full'
      });
      
      /* Owl Carousel */

      $("#owl-carousel").owlCarousel({
        autoPlay: 4000, //Set AutoPlay to 4 seconds
        items: 3,
        itemsDesktopSmall: [1182,2],
        itemsTablet: [767,1]
      });

    },
    /* / Sliders script */

    /**
      * SlickNav script
      */

    slickNav: function() {

      /* SlickNav */

      $("#nav-top").slicknav({
        label: '',
        prependTo: '#mobile-menu',
        easingOpen: "easeOutBounce",
        closeOnClick: true,
        duration: 500
      });

    }
    /* / SlickNav */

  };
  /* / App */

  $(function() {
    App.viewAnimations();
    App.sliders();
    App.slickNav();
  });

})(jQuery);