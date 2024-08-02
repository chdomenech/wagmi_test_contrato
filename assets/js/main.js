/*
1. back to top script
2. progressbar
3. tab js
4. For Chart
5. For Expired Timer
6. horizontal timeline
7. video-popup
8. owlcarusel initialization
9. carousel resize js
10. animation wow
11. app preloader js
12. fat-nav js
*/

jQuery(function() {

    /*===================================================================================*/
    /*  back to top script
    /*===================================================================================*/
    var offset = 500;
    var back_top = jQuery('.skip_swing');
    jQuery(window).scroll(function(){
        (jQuery(this).scrollTop() > offset) ? back_top.addClass('show_icon') :  back_top.removeClass('show_icon');
    });

    jQuery('a.skip_swing').on('click', function() {
        var Lochref = jQuery(this).attr('href');
        jQuery("html, body").stop().animate({
            scrollTop: jQuery(Lochref).offset().top
        }, 1500);
        return false;
    });

    /*===================================================================================*/
    /*  progressbar
    /*===================================================================================*/
    if (jQuery('#progressbar').length > 0) {
        jQuery( "#progressbar" ).progressbar({
            value: 70
        });
    }
    if (jQuery('#progressbar2').length > 0) {
        jQuery( "#progressbar2" ).progressbar({
            value: 70
        });
    }

    /*===================================================================================*/
    /*  tab js
    /*===================================================================================*/
    if (jQuery('#horizontalTab').length > 0) {
        jQuery('#horizontalTab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true,   // 100% fit in a container
            //closed: 'accordion', // Start closed if in accordion view
            activate: function() { // Callback function if tab is switched
                var $tab = jQuery(this);
                var $info = jQuery('#tabInfo');
                var $name = jQuery('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
    }
    /*===================================================================================*/
    /*  animation wow
    /*===================================================================================*/
    if (jQuery('.wow').length > 0) {
        jQuery(function(){
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true,
                scrollContainer: null,
            });
            wow.init();
        });
    }


});

jQuery(window).on('load', function() {

    /*===================================================================================*/
    /*  website loader js
    /*===================================================================================*/
    setTimeout(function(){ 
        jQuery('.unicrypt-pre-con').fadeOut('slow');
    }, 500);

});

jQuery(document).ready(function() {

    jQuery.fatNav(); 

    /*===================================================================================*/
    /*  fat-nav js
    /*===================================================================================*/
   /* if (jQuery('.fat-nav').length > 0) {
        (function() { jQuery.fatNav(); }());
        var fatContent = jQuery( '.main-menu ul').html();
        var fatHeaderRight = jQuery( '.header-right').html();
        var fatNav = '<div class="fat-nav__wrapper" id="fatmenu"><ul>' + fatContent + '<div class="header-right">' + fatHeaderRight + '</div></ul></div>';
        jQuery( '.fat-nav' ).html( fatNav );
        jQuery('#fatmenu ul li.menu-item-has-children').append("<span class='toggle_button'><small></small></span>");
        jQuery('#fatmenu ul ul').hide();

    }

    jQuery('.main-menu ul li ul').parent('li').addClass('menuarrow');*/

});

jQuery(window).resize(function() {
    var win_width = jQuery(window).width();
    if (win_width > 1099) {
        jQuery('.fat-nav').removeClass('active').css("display", "none");
        jQuery('.hamburger').removeClass('active');
    }
});

/*$( function() {
    var endDate = "October  10, 2023 12:00:00";

    $('.countdown.simple').countdown({ date: endDate });

    $('.countdown.styled').countdown({
      date: endDate,
      render: function(data) {
        $(this.el).html("<div>" + this.leadingZeros(data.days, 3) + " <span>days</span></div><div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div><div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div><div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>");
      }
    });

    $('.countdown.callback').countdown({
      date: +(new Date) + 10000,
      render: function(data) {
        $(this.el).text(this.leadingZeros(data.sec, 2) + " sec");
      },
      onEnd: function() {
        $(this.el).addClass('ended');
      }
    }).on("click", function() {
      $(this).removeClass('ended').data('countdown').update(+(new Date) + 10000).start();
    });    
  });*/