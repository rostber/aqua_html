import $ from 'jquery';
import 'select2';
import 'slick-carousel';
window.$ = window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');

$(function() {
  init_zoom();
  select();
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
