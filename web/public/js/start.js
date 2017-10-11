(function( $ ) {
/**
 * START - ONLOAD - JS
 * Updated by Minh Nguyen
 * Date: 30/05/2017
 *
 * 1. Slide Header nav                                          : slideHeaderNav()
 * 2. Tab Header                                                : tabHeader()
 * 3. Show Profile popup                                        : showPrf()
 * 4. Show tooltip                                              : showTool();
 * 5. Show tooltip in detail page                               : showToolDetail(arrayTool)
 * 6. Click submenu Left sidebar                                : submenuSidebar()
 * 7. Increase progress bar after each pathway step is clicked  : progrBar()
 * 8. Move to next step when next button is clicked             : nextStep()
 * 9. Menu mobile                                               : menuMob()
 * 10. Collapse leftsidebar                                     : collapseLeftSb();
 * 11. Click hide logo & leftsidebar                            : hideLogoAndLeftSb();
 */
/* ----------------------------------------------- */
/* ------------- FrontEnd Functions -------------- */
/* ----------------------------------------------- */

// 1. Slide Header nav
function slideHeaderNav() {
    if(!$('.h-nav-slide').length) { return; }

    $('.h-nav-slide').slick({
        infinite: false,
        rows: 1,
        slidesToShow: 7,
        slidesToScroll: 1,
        prevArrow: '<a href="javascript:;" class="slick-prev slick-arrow"><i class="fa fa-angle-left"></i></a>',
        nextArrow: '<a href="javascript:;" class="slick-next slick-arrow"><i class="fa fa-angle-right"></i></a>'
    });

}

// 2. Tab Header
function tabHeader() {
    if(!$('.h-nav-slide li.slick-slide').length) { return; }

    $('.h-nav-slide li.slick-slide > a').on('click', function(e) {
        e.preventDefault();
        var tabId = $(this).attr('href');

        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');

        $(tabId).siblings().removeClass('active');
        $(tabId).addClass('active');

        // setTimeout(function(e) {
        //     $('body').scrollTop(0);
        // }, 30);
    });
}

// 3. Show Profile popup
function showPrf () {
    if(!$('.user-nav').length) { return; }

    $('.user-nav').on('click', function(e) {
        e.preventDefault();
        if($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
        }
    });

    $('.user-nav').on('clickoutside', function(e) {
        $(this).removeClass('active');
    });
}

// 4. Show tooltip
function showTool (arrTool) {
    if($(window).width() < 768 || navigator.userAgent.match(/Android|iPad|iPhone|iPod|Windows Phone|Lumia|Blackberry/i)) { return; }
    if(!$('.sub-lesson .pathway-circle').length) { return; }

    $('.sub-lesson .pathway-circle').tooltip({
        title: function() {
            var html = `<div class="tooltip-body">
                            <div class="tooltip-ttl">${$(this).data('title')}</div>
                            <div class="tooltip-desc">${$(this).data('desc')}</div>
                        </div>
                        <div class="tooltip-footer">Click to start</div>`
            return html
        },
        html: true
    });
}

// 5. Show tooltip in detail page
function showToolDetail(arrayTool) {
    if($(window).width() < 768 || navigator.userAgent.match(/Android|iPad|iPhone|iPod|Windows Phone|Lumia|Blackberry/i)) { return; }
    arrayTool.forEach(function(item) {
        if(!$(item).length) { return; }

        $(item).tooltip();
    });
}

// 6. Click submenu Left sidebar
function submenuSidebar() {
    if(!$('.has-sub-menu > a').length) { return; }
    $('.has-sub-menu > a').on('click', function(e) {
        e.preventDefault();
        var $parent = $(this).parent();

        if($parent.hasClass('open')) {
            $parent.removeClass('open');
        } else {
            $parent.addClass('open');
        }
    });
}

// 7. Increase progress bar after each pathway step is clicked
function progrBar() {
    if(!$('.pathway .pathway-itm .pathway-circle').length) { return; }

    $('.pathway .pathway-itm .pathway-circle').on('click', function(e) {
        if(!$(this).parent().hasClass('pw-learned')) {
            $(this).parent().addClass('pw-learned');
        }

        var totalSteps      = $(this).closest('.pathway').find('.pathway-itm').length,
            learnedSteps    = $(this).closest('.pathway').find('.pw-learned').length,
            progr           = learnedSteps/totalSteps*100;

        $('.lesson-progress .l-line .lprog-bar').css('width', progr + '%');
    });
}

// 8. Move to next step when next button is clicked
function nextStep() {
    if(!$('.ldtail-next').length) { return; }

    $('.ldtail-next').on('click', function(e) {
        e.preventDefault();
        // not the last step
        if($('.pathway .pathway-itm.active').next().length) {
            $('.pathway .pathway-itm.active').next().find('a').click();
        }
    });
}

// 9. Menu mobile
function menuMob() {
    if(!$('.mnav-btn').length) { return; }

    $('.mnav-btn').on('click', function(e) {
        e.preventDefault();
        var $parent = $(this).closest('.mob-nav');
        if($parent.hasClass('active')) {
            $('.mnav-ct').animate({
                opacity: 0
            }, 150, 'swing', function() {
                $parent.removeClass('active');
                $('body').removeClass('bodyover');
                $('.mnav-ct').css({'opacity': ''});
            });
        } else {
            $parent.addClass('active');
            $('body').addClass('bodyover');
        }
    });
}


 // 10. Collapse leftsidebar
function collapseLeftSb() {
    if(!$('.sidebar-tgl').length) { return; }

    $('.sidebar-tgl').on('click', function(e) {
        e.preventDefault();
        var $parent = $(this).closest('.wrapper');

        if($parent.hasClass('lsbar-closed')) {
            $parent.removeClass('lsbar-closed');
            $(this).find('.fa').removeClass('fa-caret-right');
            $(this).find('.fa').addClass('fa-caret-left');
            setTimeout(function(e) {
                $('.sidebar-nav > ul > li > a').find('.title').show();
            }, 300)
        } else {
            if($('.has-sub-menu').hasClass('open')) {
                $('.has-sub-menu').removeClass('open');
                $('.has-sub-menu').find('.sub-menu').removeClass('in');
            }
            $parent.addClass('lsbar-closed');
            $('.sidebar-nav > ul > li > a').find('.title').hide();
            $(this).find('.fa').removeClass('fa-caret-left');
            $(this).find('.fa').addClass('fa-caret-right');
        }
    });
}
// Click hide logo & leftsidebar
function hideLogoAndLeftSb() {
    if(!$('.mn-close').length) { return; }

    $('.mn-close').on('click', function(e) {
        e.preventDefault();

        let $a_click        =      $(this),
            $logo           =   $a_click.siblings('.logo'),
            $logo_wrap      =   $a_click.closest('.logo-wrap'),
            $header_menu    =   $logo_wrap.siblings('.header-inner'),
            $header         =   $a_click.closest('.header'),
            $sidebar_wrap   =   $header.siblings('.wrapper');

        if($a_click.hasClass('active')) {
            $a_click.removeClass('active');
            $logo.show();
            $logo_wrap.removeClass('off');
            $header_menu.removeClass('add');

            // sidebar
            $sidebar_wrap.removeClass('lsbar-closed');
            setTimeout(function(e) {
                $('.sidebar-nav > ul > li > a').find('.title').show();
            }, 300)
        } else {
            $a_click.addClass('active');
            $logo.hide();
            $logo_wrap.addClass('off');
            $header_menu.addClass('add');

            // sidebar
            $sidebar_wrap.addClass('lsbar-closed');
            $('.sidebar-nav > ul > li > a').find('.title').hide();
        }
    });
}
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* OnLoad Page */
$(document).ready(function($){
    // slideHeaderNav();
    // tabHeader();
    // showPrf();
    // showTool();
    // showToolDetail(['.ldtail-guide .pathway-circle', '.ldtail-down', '.ldtail-next']);
    // submenuSidebar();
    progrBar();
    // nextStep();
    // menuMob();
    // collapseLeftSb();
    // hideLogoAndLeftSb();
});
/* OnLoad Window */
var init = function () {
};
window.onload = init;

})(jQuery);
