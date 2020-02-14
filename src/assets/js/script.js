$(document).ready(function () {

  /*** page miun plus and default starts  ***/
  //  hidemenub();
  //dateform();
  if ($('.cus-scroll').length > 0) {
    $('.cus-scroll').mCustomScrollbar({
      theme: "my-theme",
      autoHideScrollbar: true
    });
  }
  $('.sh-inicon .ch-btns').click(function () {
    $(this).parents('.sh-inicon').find('.inside-micons').slideToggle(300);
    $(this).parents('.sh-inicon').toggleClass('open');
  });
  $("input[type=checkbox], input[type=radio]").each(function () {
    $(this).wrap('<span class="check">');
    $(this).after("<span></span>");
  });
  setInterval(function () { $('header').click(); }, 300);
  $('.reports .lform-submit').click(function () {
    $('.reports .denomination').toggle();
  });
  $('.ctrl-none a').click(function (e) {
    e.preventDefault();
    $('body').css('font-size', '1rem');
  });
  // $('#trigger').click(function () {

  // });
  /*** search function starts ***/
  $('.searchForm').submit(function (e) {
    colsedw();
    var searchResult = $("#search-bar").val();
    if (searchResult == '') {
      $('#search-bar').toggleClass('search-bar-expanded');
      e.preventDefault();
    }
    if (searchResult != '') {
      $('#search-bar').removeClass('search-bar-expanded');
    }
  });
  /*** search function ends ***/


  $('.error').hide();
  $('.ctrl-minus a').click(function (e) {
    e.preventDefault();
    var str = $('body').css('font-size');
    var res = str.replace("px", "");
    if (res > 10) {
      $('body').css('font-size', parseInt(res - 1));
    } else {
      $('.ctrl-minus a').css("opacity", " 0.3");
    }
  });

  $('.ctrl-plus a').click(function (e) {
    e.preventDefault();
    var str = $('body').css('font-size');
    var res = str.replace("px", "");
    if (res < 25) {
      $('body').css('font-size', parseInt(res) + 1);
    } else {
      $('.ctrl-plus').css("opacity", " 0.3");
    }
  });
  /*** page miun plus and default ends  ***/

  /*** easy scroll starts  ***/
  $("html").easeScroll({
    frameRate: 60,
    animationTime: 1000,
    stepSize: 120,
    pulseAlgorithm: 1,
    pulseScale: 8,
    pulseNormalize: 1,
    accelerationDelta: 20,
    accelerationMax: 1,
    keyboardSupport: true,
    arrowScroll: 50,
    touchpadSupport: true,
    fixedBackground: true
  });
  /*** easy scroll ends  ***/



  $('.close-btn').click(function () {
    $('body').removeClass('mactive');
  });


  /*** login form validation starts ***/
  /*$("#loginForm").validate({
    rules: {
      username: {
        required: true
      },
      password: {
        required: true
      }
    },
    messages: {
      password: "<strong>Your Username or password was incorrect.</strong> <br><a href='javascript:void(0)' class='forgot-pswd'>Forgot Password?</a>"
    },
    tooltip_options: {
      username: {
        // trigger:'focus',
        placement: 'bottom',
      },
      password: {
        placement: 'bottom',
        html: true
      }
    },
  });*/
  /*** login form validation ends ***/


  //Initialize tooltips
  //Wizard
  $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    var $target = $(e.target);
    if ($target.parent().hasClass('disabled')) {
      return false;
    }
  });

  $(".next-step").click(function (e) {
    if (!$("#chat_email").val().match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)) {
      $('.error').show();
    } else {
      var $active = $('.wizard .nav-tabs li.active');
      $('.wizard .nav-tabs li.active').addClass('open');
      $active.next().removeClass('disabled');
      nextTab($active);
    }
  });

  $(".prev-step").click(function (e) {
    var $active = $('.wizard .nav-tabs li.active');
    prevTab($active);

  });

  /* Same Height Start
  if ($(window).width() >= 992) {
    var highestBox = 0;
    $('.same-height', this).each(function () {
      if ($(this).height() > highestBox) {
        highestBox = $(this).height();
      }
    });
    $('.same-height', this).height(highestBox);
    // $('.same-height').css('min-height','+ +');
  }
  /*same Height End */
  $('.same-height').makeSameHeight();
  $(document).click(function () {
    $('.same-height').makeSameHeight();
  });

  /* Sliders */
  $('.footer-slider').slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
      breakpoint: 9999,
      settings: "unslick"
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        prevArrow: false,
        nextArrow: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        prevArrow: false,
        nextArrow: false
      }
    }
    ]
  });


  $('.exp-imp-list').slick({
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
      }
    },
    {
      breakpoint: 768,
      settings: 'unslick',
    }
    ]
  });


  $('.banner-slider').slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    autoplay: true,
    asNavFor: '.ban-slidefor'
  });
  $('.ban-slidefor').slick({
    slidesToShow: 1,
    slidesToScro0ll: 1,
    asNavFor: '.banner-slider',
    dots: true,
    autoplay: true,
    prevArrow: false,
    nextArrow: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        dots: false,
        arrows: false
      }
    }]
  });

  //$(".date").datepicker();
  // sameHeight();
  // $('.close').click(function(){
  //   sameHeight();
  // });
  $(".close-chart").click(function () {
    $('.same-height').makeSameHeight();
    if (!$(this).hasClass('close2chart')) {
      $(this).parent('.dashboard-tab').addClass('chrtopn');
      $(this).parent('.dashboard-tab').find('.chart-wrap').slideToggle("slow", function () {
        $('.same-height').makeSameHeight();
      });
    } else {
      $("html,body").animate({
        scrollTop: 0
      }, "slow");
      $(this).parent('.dashboard-tab').removeClass('chrtopn');
      $(this).parent('.dashboard-tab').find('.chart-wrap').slideToggle("slow", function () {
        $('.same-height').makeSameHeight();
      });

    }

  });

  /*   $(".close-chart.close2chart").click(function(){    
      $(this).parent('.dashboard-tab').removeClass('chrtopn');
      $(this).parent('.dashboard-tab').find('.dashboard-chart').slideUp();
          $(this).parent('.dashboard-tab').find('.chart-wrap').height('0');
    }); */

  // setInterval(function(){ 
  //    $('.same-height').makeSameHeight();

  //  }, 1000);
  $('.same-height').makeSameHeight();
  /**** for chat box starts ***/
  $('.chat-body .no-send').hide();
  $('.chat-body .no-send-user').hide();
  $('.chat-body .first-child').hide();
  $('.btn-chat').click(function () {
    $('.chat-wrap,.bg-ovrlay').fadeIn();
    $('.onbl').addClass("noshow");
    $('.chat-fbtn ul').slick('refresh');
    $('.card-scrol ul').slick('refresh');
    $('body').addClass("noscr");
    setTimeout(function () {
      $('.chat-body .first-child').show();
      $('.chat-body .first-child').removeClass('first-child');
    }, 1000);
  });

  // $( "input[type=checkbox], input[type=radio]" ).each(function() {
  // 	$(this).wrap('<span class="check">');
  // 	$(this).after("<span></span>");
  //       });

  $('.close-cbtn').click(function () {
    $('.chat-wrap,.bg-ovrlay').fadeOut();
    $('.onbl').removeClass("noshow");
    $('body').removeClass("noscr");
  });
  $('.clse-opwin').click(function () {
    $('.chat-wrap,.bg-ovrlay').fadeOut();
    $('.onbl').removeClass("noshow");
    $('body').removeClass("noscr");
  });
  $('.minimize-btn').click(function () {
    $('.chat-wrap').toggleClass('btn-plus');
  });
  /*** button slide inside popup starts  ***/
  $('.chat-fbtn ul').slick({
    dots: false,
    infinite: true,
    arrows: true,
    speed: 300,
    slidesToShow: 2,
    centerMode: false,
    responsive: [{
      breakpoint: 680,
      settings: {
        centerMode: true,
        arrows: false,
        slidesToShow: 2,
      }
    },]
  });
  /*** button slide inside popup ends  ***/

  $(".cf-typeing textarea").on('keyup', function (e) {
    if (e.keyCode == 13) {
      displayMsg();
    }
  });
  $(".send-msg").click(function (event) {
    displayMsg();
  });
  /*** for chat box ends ***/

  /***  notification box hide show starts ***/
  if ($('.notification-box').length > 0) {
    $('.hd-alort').click(function () {
      $('body').toggleClass('nactive');
      if ($('body').hasClass('nactive')) {
        $('.notification-box').fadeIn();
      } else {
        $('.notification-box').fadeOut();
      }
    });
  }
  /***  notification box hide show ends ***/


  $('.i-info').tooltip({
    'trigger': 'click',
    'animation': false,
    'title': "<strong>Your Banks IFSC code mismatch.</strong> <br>Forgot your Bank's IFSC code<a href='javascript:void(0)' class='forgot-pswd'> Find Here?</a>",
    'data-toggle': 'tooltip',
    'placement': 'bottom',
    'html': true
  });
  $(".radio-tool, .cmtclose").click(function () {
    $(this).parent().parent().find('.popbox').toggle();
  });

  $(".cmtclosee").click(function () {
    $('.popbox').hide();
  });
  /* Filter List Drop Down start */
  $(".items-lists").click(function (e) {
    e.preventDefault();
    $(".reference-list").not($(this).parent('.ref-list').toggleClass('open').parents('.reference-div').find('.reference-list').slideToggle()).slideUp().parent('.ref-list').parents('.reference-div').removeClass("open");
    $(".file-drop-ul").hide().parent('.dt-list').removeClass('open');
    $(".user-info").hide().parent('.user-list').removeClass('open');
    $(".notification-box").hide().parent('.logo-list').removeClass('open');
  });
  /* Filter List Drop Down End */

  /* List Drop Down start */
  $(".dt-list-item").click(function (e) {
    e.preventDefault();
    $(".file-drop-ul").not($(this).parent('.dt-list').toggleClass('open').find('.file-drop-ul').slideToggle()).slideUp().parent('.dt-list').removeClass("open");
    $(".user-info").hide().parent('.user-list').removeClass('open');
    $(".notification-box").hide().parent('.logo-list').removeClass('open');
    $(".reference-list").hide().parents('.reference-div').find('.ref-list').removeClass('open');
  });
  /* List Drop Down End*/

  /* Top Menu Drop Down start */
  $(".logo-list-item").click(function (e) {
    e.preventDefault();
    $(".notification-box").not($(this).parent('.logo-list').toggleClass('open').find('.notification-box').toggle()).hide().parent('.logo-list').removeClass('open');
    // $(this).parent('.dt-list').find('.file-drop-ul').toggle('open');
    $(".user-info").hide().parent('.user-list').removeClass('open');
    $(".file-drop-ul").hide().parent('.dt-list').removeClass('open');
    $(".reference-list").hide().parents('.reference-div').find('.ref-list').removeClass('open');
  });
  $(".user-list-item").click(function (e) {
    e.preventDefault();
    $(".user-info").not($(this).parent('.user-list').toggleClass('open').find('.user-info').toggle()).hide().parent('.user-list').removeClass('open');
    $(".notification-box").hide().parent('.logo-list').removeClass('open');
    $(".file-drop-ul").hide().parent('.dt-list').removeClass('open');
    $(".reference-list").hide().parents('.reference-div').find('.ref-list').removeClass('open');
  });
  /* Top Menu List Drop Down End*/

  /* Easy Responsive */
  if ($('#horizontalTab').length > 0) {
    $('#horizontalTab').easyResponsiveTabs({
      type: 'default', //Types: default, vertical, accordion           
      width: 'auto', //auto or any width like 600px
      fit: true, // 100% fit in a container
      closed: 'accordion', // Start closed if in accordion view
      activate: function (event) { // Callback function if tab is switched
        var $tab = $(this);
        var $info = $('#tabInfo');
        var $name = $('span', $info);
        $name.text($tab.text());
        $info.show();
      }
    });
  }
  /* Easy Responsive End*/
  /* Tab Start */
  if ($('.tab-slider').length > 0) {
    if ($('.tab-slider li').length < 4) {
      $('body').addClass("hide-controls")
    }
    if ($('.tab-slider li').length > 4) {
      $('.tab-slider').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: $('.top-tab .next-arrow'),
        prevArrow: $('.top-tab .prev-arrow'),
      });
    }
  }
  /* Tab Start */
});
// document End 

function nextTab(elem) {
  $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
  $(elem).prev().find('a[data-toggle="tab"]').click();
}

/**** Make Same height listing page start ****/
$.fn.makeSameHeight = function () {
  $(this).css('height', 'auto');
  if ($(window).width() > 992) {
    var maxHt = 0;
    var oldHt = 0;
    $(this).removeAttr('style');
    $(this).each(function (i) {
      maxHt = Math.max(oldHt, $(this).outerHeight());
      oldHt = maxHt;
    });
    $(this).css('height', maxHt);
  }
};


function sameHeight() {
  if ($(window).width() >= 992) {
    var highestBox = 0;
    $('.same-height', this).each(function () {
      if ($(this).height() > highestBox) {
        highestBox = $(this).height();
      }
    });
    $('.same-height', this).height(highestBox);
  }
}

/*** chat box starts  ***/
function displayMsg() {
  var clicks = $('.send-msg').data('clicks');
  if ($(".cf-typeing textarea").val().length > 1) {
    var dd = $(".cf-typeing textarea").val().replace(/\n/g, "<br />");
    if ($(".chat-body .no-send").first().hasClass('user')) {
      $(".chat-body .no-send:first").before('<div class="cbody-row cuser-right"><img class="uimg" src="assets/images/john.png" alt="user"><div class="ucha-text wauto"><div class="arrows"></div><p>' + dd + '</p></div></div>');
    } else {
      $(".chat-body .no-send:first").before('<div class="cbody-row cuser-right"><img class="uimg" src="assets/images/user.png" alt="user"><div class="ucha-text wauto"><div class="arrows"></div><p>' + dd + '</p></div></div>');
    }
    $(".cf-typeing textarea").val('');
    $(this).data("clicks", !clicks);
    setTimeout(function () {
      $(".chat-body .no-send:first").show();
      $(".chat-body .no-send:first").addClass('send');
      $(".chat-body .no-send:first").removeClass('no-send');
    }, 3000);
  }
}
/*** chat box ends  ***/


/**** Password show and hide start ****/
$('#loginForm #password').bind('blur', function () {
  if ($(this).val() == "") {
    $('.ban-frm form .ban-fpas .pasview img').css('opacity', 0.2)
  }
});
$('#loginForm #password').bind('focus', function () {
  $('.ban-frm form .ban-fpas .pasview img').css('opacity', 1)
});
$('.ban-frm form .ban-fpas .pasview img').click(function () {
  if (!$(this).hasClass('pas-eye')) {
    $(this).attr('src', 'assets/images/icons/Password_View.svg');
    $(this).addClass('pas-eye');
    $('#password').attr('type', 'text');
  } else {
    $(this).attr('src', 'assets/images/icons/password_hide.svg');
    $(this).removeClass('pas-eye');
    $('#password').attr('type', 'password');
  }
});
/**** Password show and hide end ****/
/*** Chart modal open and close start ***/
// $('#chartmodal').on('show.bs.modal', function (event) {
//   var canvasid = $(event.relatedTarget).closest('.cbar_wrap').find('canvas').attr('id') // Button that triggered the modal
//   if (canvasid === undefined) {
//     var canvasid = $(event.relatedTarget).closest('.chart').find('canvas').attr('id')
//   }
//   $('#chartmodal').data('canvasid', canvasid)
//   $(this).find('.modal-body').html('').append('<div class="col-sm-12 cha-pop" data-id="' + canvasid + '"><canvas id="popupchart" width="100" height="40"></canvas></div><div class="col-sm-12"><div id="legend" class="legend"></div></div>');
//   $('#chartmodal .modal-header .cha-mod-head').remove();
//   if (canvasid === undefined) {
//     $('#chartmodal').addClass('sm-chart');
//     runFunction('chart_c2', ['popupchart']);
//     $('#chartmodal').data('canvasid', 'linechart');
//     $('#chartmodal .modal-header').append('<p class="cha-mod-head"><strong>Pending Tasks</strong></p>');
//     return;
//   }
//   runFunction('chart_' + canvasid, ['popupchart']);
//   colsedw();
// });

// $('#chartmodal').on('hidden.bs.modal', function (event) {
//   var canvasid = $('#chartmodal').data('canvasid');
//   runFunction('chart_' + canvasid, []);
//   if ($('#chartmodal').hasClass('sm-chart')) {
//     $('#chartmodal').removeClass('sm-chart');
//   }
// });

/*** Chart modal open and close end ***/
$(document).mouseup(function (e) {
  var container = $(".notification-box");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $(".notification-box").hide().parent('.logo-list').removeClass('open');
  }
  var container1 = $(".file-drop-ul");
  if (!container1.is(e.target) && container1.has(e.target).length === 0) {
    $(".file-drop-ul").hide().parent('.dt-list').removeClass('open');
  }
  var container2 = $(".user-info");
  if (!container2.is(e.target) && container2.has(e.target).length === 0) {
    $(".user-info").hide().parent('.user-list').removeClass('open');
  }
});
function colsedw() {
  $(".user-info").hide().parent('.user-list').removeClass('open');
  $(".notification-box").hide().parent('.logo-list').removeClass('open');
  $(".file-drop-ul").hide().parent('.dt-list').removeClass('open');
  $(".reference-list").hide().parents('.reference-div').find('.ref-list').removeClass('open');
}

/* Weak Menu Active */
if ($('.sh-weak').length > 0) {

}
$(window).resize(function () {
  hidemenub();
});

function dateform() {
  if ($('.date-form').length > 0) {
    var d = new Date();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = d.getFullYear();
    var t = d.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    var dt = (mm < 10 ? '0' : '') + mm + '/' + (dd < 10 ? '0' : '') + dd + '/' + yy + " - " + t;
    $('.date-form').html(dt);
  }
}

/*** get query string from the url starts  ***/
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

window.onload = function () {
  var searchRes = getUrlVars()["search"];
  if (searchRes != '') {
    $('#search-bar').addClass('search-bar-expanded sres');
    $('#search-bar').val(searchRes);
    $("body").addClass("preload");
  }
  if (searchRes == undefined) {
    $('#search-bar').removeClass('search-bar-expanded');
    $("body").removeClass("preload");
  }
}
/*** get query string from the url ends  ***/
function toggleFullScreen() {

  if (!document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
  $("#ToggleFullScreen").toggleClass("fa-expand");
  $("#ToggleFullScreen").toggleClass("fa-compress");

}