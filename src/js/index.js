import $ from 'jquery';
import 'select2';
import 'slick-carousel';
import noUiSlider from 'nouislider';
import wNumb from './wNumb';
import Tooltip from 'tooltip.js';
window.$ = window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');

const widthMd = 1270
const widthSm = 768

$(function() {
  init_zoom();
  select();
  toggle();
  naviDrop({
    currentClass: 'navbar__i_state_current',
    elHandler: '.js-m-i-handler',
    elI: '.js-m-i'
  });
  slider();
  oSlider();
  rangeSlider();
  toggleList();
  offerPictures();
  tooltip();
  fixedBtn();
  qnt();
  initCatalog();
})

function initCatalog() {
  var $items = $('.js-catalog-i');
  var $contents = $('.js-catalog-content')
  var actI = 'm-catalog__sidebar-i_state_active';
  var actContent = 'm-catalog__content-i_state_active';
  if ($items.length === 0) return
  $items.click(function() {
    var index = $($items).index(this);
    $items.removeClass(actI);
    $(this).addClass(actI);
    $contents.removeClass(actContent).eq(index).addClass(actContent);
  });
  $items[0].click();
}

function offerPictures() {
  var display = function(index) {
    $('.js-picture-preview').hide().eq(index).show()
  }
  var $elI = $('.offer-picture__i-preview');
  if ($elI.length == 0) return;
  $elI.on('click mouseenter', function() {
    var index = $elI.index($(this));
    display(index);
  });
  display(0);
}

function toggleList() {
  $('.js-list').each(function() {
    var $el = $(this);
    var num = $el.data('qnt')
    $el.find('.js-list-i').filter(function(i) { return i >= num }).hide()
    $el.find('.js-list-handler').click(function() {
      $(this).hide();
      $el.find('.js-list-i').slideDown();
    })
  })
}


function rangeSlider() {
  $('.js-range-slide').each(function() {
    var $el = $(this);
    var $elDrag = $(this).find('.js-range-slide-drag');
    var $elFrom = $el.find('.js-range-slide-from');
    var $elTo = $el.find('.js-range-slide-to');
    var min = parseInt($el.data('min'));
    var max = parseInt($el.data('max'));
    var slider = noUiSlider.create($elDrag[0], {
      start: [$elFrom.val(), $elTo.val()],
      connect: true,
      tooltips: false,
      step: 1,
      range: {
        'min': min,
        'max': max
      }
    });
    slider.on('change', function() {
      var range = slider.get();
      $elFrom.val(range[0]);
      $elTo.val(range[1]);
    });

    var change = function() {
      var nFrom = parseInt($elFrom.val());
      var nTo = parseInt($elTo.val());

      if (nFrom > max) nFrom = max;
      if (nFrom < min || isNaN(nFrom)) nFrom = min;

      if (nTo > max || isNaN(nTo)) nTo = max;
      if (nTo < min) nTo = min;

      if (nFrom > nTo) nTo = nFrom;

      $elFrom.val(nFrom);
      $elTo.val(nTo);

      slider.set([$elFrom.val(), $elTo.val()])
    }

    $elFrom.on('change', change);
    $elTo.on('change', change);
  });
}

function init_zoom() {
  $('.js-modal').fancybox();
}

function select() {
  $('select').each(function() {
    $(this).select2({
      theme: 'default ' + $(this).prop('class'),
      allowClear: false,
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
    var handlCl = $el.data('handler-class');
    var $block = $($el.data('toggle'));
    var $secondHandler = $($el.data('handler'));
    var handler = function(e) {
      e.stopPropagation();
      $block.toggleClass(actCl);
      if (handlCl) $(this).toggleClass(handlCl);
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
    }
    $el.click(handler);
    if ($secondHandler.length) $secondHandler.click(handler);
  });
}

function naviDrop(options) {
  $(options.elHandler).click(function() {
    $(options.elI).removeClass(options.currentClass)
    $(this).parents(options.elI).addClass(options.currentClass)
  });
}

function slider() {
  $('.js-slider').each(function() {
    $(this).find('.js-slider-list').slick({
      speed: 500,
      centerMode: false,
      centerPadding: 0,
      variableWidth: false,
      infinite: false,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: $(this).find('.js-slider-prev'),
      nextArrow: $(this).find('.js-slider-next')
    });
  });
}

function oSlider() {
  $('.js-o-slider').each(function() {
    $(this).find('.js-o-slider-list').slick({
      speed: 500,
      adaptiveHeight: true,
      prevArrow: $(this).find('.js-o-slider-prev'),
      nextArrow: $(this).find('.js-o-slider-next'),
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: widthMd,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: widthSm,
          settings: 'unslick'
        }
      ]
    })
  });
}

function tooltip() {
  $('[data-tooltip]').each(function() {
    var $el = $(this);
    var position = $el.data('tooltip-position') || 'top';
    var text = $el.data('tooltip');
    var contentSelector = $el.data('tooltip-el');
    if (contentSelector) text = $(contentSelector).html();
    new Tooltip($el, {
      placement: position,
      title: text,
      html: true
    });
  });
}

function fixedBtn() {
  var $el = $('.js-fixed-btn');
  if ($el.length === 0) return false;
  var h = $el.height()
  var classFixed = 'offer-info__cart-btn_type_fixed';
  var render = function() {
    var top = $(window).scrollTop();
    if ($el.offset().top < top - h) $el.addClass(classFixed);
    else $el.removeClass(classFixed);
  }
  render();
  $(window).on('scroll', render);
  $(window).on('resize', render);
}

function qnt() {
  $('.js-qnt').each(function() {
    var $el = $(this);
    var $elI = $el.find('.js-qnt-i');
    var $elV = $el.find('.js-qnt-v');
    var $elP = $el.find('.js-qnt-p');
    var $elM = $el.find('.js-qnt-m');
    var max = parseInt($elV.data('max'));
    var render = function() {
      $elV.text($elI.val())
    }
    render();
    $elP.click(function() {
      var value = parseInt($elI.val());
      if (max <= value) value = parseInt(max);
      else value++;
      $elV.text(value);
      $elI.val(value);
    });
    $elM.click(function() {
      var value = parseInt($elI.val());
      if (value < 2) value = 1;
      else value--;
      $elV.text(value);
      $elI.val(value);
    });
    $elV.on('input', function() {
      var value = parseInt($elV.text());
      if (max <= value) value = parseInt(max);
      if (value < 1 || isNaN(value)) value = 1;
      $elV.text(value);
      $elI.val(value);
    });
  });
}
