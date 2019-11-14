import $ from 'jquery';
import 'select2';
import 'slick-carousel';
window.$ = window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');

$(function() {
  init_zoom();
  select();
  toggle();
  mNavi();
})

function init_zoom() {
  $('.js-modal').fancybox();
}

function select() {
  $('select').each(function() {
    $(this).select2({
      allowClear: true,
      minimumResultsForSearch: -1,
      placeholder: $(this).attr('placeholder')
    });
  });
}

function toggle() {
  $(document).on('click.toggle', function(e) {
    $('.js-toggle[data-outer-click]').each(function() {
      var $el = $(this);
      var actCl = $el.data('class');
      var $block = $($el.data('toggle'));
      if ($(e.target).closest($block).length == 0) $block.removeClass(actCl);
    })
  });

  $('.js-toggle').each(function() {
    var $el = $(this);
    var actCl = $el.data('class');
    var $block = $($el.data('toggle'));
    $el.click(function(e) {
      e.stopPropagation();
      $block.toggleClass(actCl);
      var groupName = $el.data('group');
      if (groupName) {
        $('.js-toggle').filter(function() {
          return $(this).data('group') === groupName && $(this).data('toggle') !== $el.data('toggle')
        }).each(function() {
          var $elSecond = $(this);
          var $blockSecond = $($elSecond.data('toggle'));
          var actCl = $elSecond.data('class');
          $blockSecond.removeClass(actCl);
        });
      }
    });
  });
}

function mNavi() {
  var currentClass = 'm-header__i_state_current'
  $('.js-m-i-handler').click(function() {
    $('.js-m-i').removeClass(currentClass)
    $(this).parents('.js-m-i').addClass(currentClass)
  });
}
