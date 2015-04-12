(function($){
  // Remove extra main nav wrap
  $('.main-nav-list > li').unwrap();

  // Highlight current nav item
  $('#main-nav > li > .main-nav-list-link').each(function(){
  	if($('.page-title-link').length > 0){
      if($(this).html().toUpperCase() == $('.page-title-link').html().toUpperCase()){
        $(this).addClass('current');
      } else if ($(this).attr('href') == $('.page-title-link').attr('data-url')){
        $(this).addClass('current');
      }
    }
  });

  // Sidebar expend
  $('#sidebar .sidebar-toggle').click(function(){
    if($('#sidebar').hasClass('expend'))
      $('#sidebar').removeClass('expend');
    else
      $('#sidebar').addClass('expend');
  });

  // Set thumbnail height
  function setThumbnailHeight(){
    var width = $('.article-summary .thumbnail').width();
    var height = 245 * width / 520;
    $('.article-summary .thumbnail').height(height);
  }
  setThumbnailHeight();

  // Auto hide main nav menus
  var autoHideMenus = (function () {
    var $main_nav = $('#main-nav');
    var $conatiner = $('.nav-container-inner');
    var sub_nav_width = $('#sub-nav').width();
    var min_nav_width = $main_nav.width() + sub_nav_width;

    var $items = $main_nav.children('.main-nav-list-item');
    var widths = $.makeArray($items.map(function () {
      return $(this).width();
    }));
    var itemCount = $items.length;

    var $nav_more = $('<li class="main-nav-list-item top-level-menu main-nav-more">' +
      '<a class="main-nav-list-link" href="javascript:;">' + $main_nav.data('more-text') + '</a>' +
      '<ul class="main-nav-list-child"></ul>' +
      '</li>').appendTo($main_nav);
    var nav_more_width = $nav_more.width();

    $nav_more.hide();

    return function () {
      var i;
      if($(window).width() < 480) {
        i = itemCount - 1;
      } else {
        var max_width = $conatiner.width() - 10;
        var width = sub_nav_width;
        for (i = 0; i < itemCount; i++) {
          width += widths[i];
          if (width > max_width) {
            width -= widths[i];
            while (width + nav_more_width > max_width && i > 0) {
              i--;
              width -= widths[i];
            }
            break;
          }
        }
      }

      // only change something, if there is something to change
      if ($main_nav.children('.main-nav-list-item:not(.main-nav-more)').length !== i) {
        $items.slice(0, i).prependTo($main_nav);
        if (i < itemCount - 1) {
          $items.slice(i).appendTo($nav_more.children('ul'));
          $nav_more.show();
        } else {
          $nav_more.hide();
        }
      }
    };
  }());
  autoHideMenus();

  // Fold second-level menu
  $('.main-nav-list-item').hover(
    function(){
      if($(window).width() < 480) return;
      $(this).children('.main-nav-list-child').slideDown('fast');
    },
    function(){
      if($(window).width() < 480) return;
      $(this).children('.main-nav-list-child').slideUp('fast');
    }
  );

  // Add second-level menu mark
  $('.main-nav-list-item').each(function(){
    if($(this).find('.main-nav-list-child').length > 0){
      $(this).addClass('top-level-menu');
    }
  });

  $(window).resize(function() {
    setThumbnailHeight();
    autoHideMenus();
  });

})(jQuery);