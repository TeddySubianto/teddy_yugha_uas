/***
 * Inititialization & Page Specific Functions
 *
 * Purposes: Keep the document.ready() clean.
 *           Improves performance esp. on older IEs.
 *
 * Note: Keep scope in mind while defining function here.
 *       When code was migrated here scoping was preserved.
 *       Many of the functions should be refactored as plugins.
 *
 * Please comment all functions with purpose.
 ***/

/** BEGIN GLOBAL FUNCTIONS: Should be kept at a minimum**/
function adjustHomeCarousel(pw) {
    var hc = $('ul#home-carousel'),
        margin_left = 0,
        page_width = pw.width();

    switch (true) {
        case (page_width <= 1400):
			margin_left = (page_width-hc.find('img:first').width())/2 +'px';
            break;
        case (page_width > 1400):
            margin_left = 'auto';
            break;
    }

	hc.find('li img').each(function() {
		$(this).css('margin-left',margin_left);
    });
}

function galleryGoTo(gallery, detailedView, currI, nextI, numPerRow) {
    var activeImageWrap = detailedView.find('ul > li:visible');
    var detailViewClasses = detailedView[0].className;
    var detailViewClassesArray = detailViewClasses.split(" ");
    var rowNum = 0;
	$.each(detailViewClassesArray,function(index,value) {
        if (3 == value.split('-').length) {
            rowNum = parseInt(value.split('-')[2]);
            rowNum = isNaN(rowNum) ? 1 : rowNum;
        }
    });
    var nextDetailedView;
	var nextRowNum = Math.ceil(nextI/numPerRow);

    if (nextRowNum < rowNum & nextI < currI) {
        nextDetailedView = $('.detail-view-' + (rowNum - 1));
    }
    else if (nextRowNum > rowNum & nextI > currI) {
        nextDetailedView = $('.detail-view-' + (rowNum + 1));
    }
    //remove active class from previous thumb and add it to the next
    addRemoveActive(gallery.find('> li a[rel="' + currI + '"]'), true);
    //gallery.find('li:eq('+ (((rowNum)*3)-1+nextI) +') a').addClass('active');

    addRemoveActive(gallery.find('> li a[rel="' + nextI + '"]'));

    if (!gallery.hasClass('celebrity-gallery')) {
        var imageLink = gallery.find("> li a[rel='" + nextI + "']");
        var fullImage = imageLink.attr("href");
        detailedView.find("li[rel='" + nextI + "'] .img-view-wrap img").attr("src", fullImage);
    }

    if (detailedView.is(':visible') && rowNum == nextRowNum) {
		activeImageWrap.fadeOut('fast', function() {
            detailedView.find('ul > li[rel="' + nextI + '"]').fadeIn();
        });
    }
    else if (nextRowNum != rowNum) {
        //hide current gallery item row
        hideShowDetailed(gallery, detailedView, currI, [nextDetailedView, nextI], numPerRow);
    }
}

//Variable to ensure animation does not run more than once, especially with phone swipe.
var aniRun = false;
function hideShowDetailed(gallery, detailedView, i, nextItems, numPerRow) {
    if (!detailedView.is(':visible')) {
        //check if any other detailed view is visible
        //if so, hide it
        if (gallery.find('.detail-view:visible').length > 0) {
            hideShowDetailed(gallery, gallery.find('.detail-view:visible'), i, [detailedView, i], numPerRow);
            return;
        }

        detailedView.find('ul > li[rel="' + i + '"]').show(0, function() {
            addRemoveActive(gallery.find('> li a[rel="' + i + '"]'));
            gallery.addClass('opaque');
        });

        addRemoveActive(detailedView);
        if (!gallery.hasClass('celebrity-gallery')) {
            var imageLink = gallery.find("> li a[rel='" + i + "']");
            var fullImage = imageLink.attr("href");
            detailedView.find("li[rel='" + i + "'] .img-view-wrap img").attr("src", fullImage);
        }

        if (galleryInstantAnimate) {
            detailedView.show();
            $('html, body').scrollTop($(this).offset().top - 30);
        }
        else {
            detailedView.slideDown(400, function() {
                $('html, body').animate({scrollTop: $(this).offset().top - 30}, 800);
            });
        }
        galleryInstantAnimate = false;
    }
    else {
        var selectedIndex = detailedView.find('ul > li:visible').attr('rel');
        var selectedRowNum = Math.ceil(selectedIndex / numPerRow);
        var curRowNum = Math.ceil(i / numPerRow);

        if (!gallery.hasClass('celebrity-gallery')) {
            var imageLink = gallery.find("> li a[rel='" + i + "']");
            var fullImage = imageLink.attr("href");
            detailedView.find("li[rel='" + i + "'] .img-view-wrap img").attr("src", fullImage);
        }

        if (selectedIndex == i || i == 0 || selectedRowNum != curRowNum) {
            addRemoveActive(detailedView, true);
            if (aniRun == false) {
                //Slide up then hide the visible card to not cause a jump
                aniRun = true;
                detailedView.slideUp(400, function() {
                    addRemoveActive(gallery.find('> li a[class="active"]'), true);
                    gallery.removeClass('opaque');

                    detailedView.find('ul > li').hide();

                    if (nextItems != undefined)
                        hideShowDetailed(gallery, nextItems[0], nextItems[1]);
                    aniRun = false;
                });
            }
        }
        else {
            detailedView.find('ul > li').hide(0, function() {
                addRemoveActive(gallery.find('> li a[class="active"]'), true);

                detailedView.find('ul > li[rel="' + i + '"]').show(0, function() {
                    addRemoveActive(gallery.find('> li a[rel="' + i + '"]'));
                });
            });
        }
    }
}

function addRemoveActive(item, remove) {
    if (remove != undefined) {
        item.removeClass('active');
        return;
    }

    item.addClass('active');
}

function adjustRoomCards(cardList, forceHeight) {
    var rowList = new Array();
    var cardNum = 0;
    var largestHeight = 0;

    if (!forceHeight) {
        var cardListItems = cardList.children('li');

        cardListItems.each(function() {
            var last = $(this).index() == cardListItems.length - 1;
            rowList.push($(this));
            cardNum++;

            if (cardNum <= 3 && !last) {
                var titleHeight = $(this).find('h2').height();

                if (titleHeight > largestHeight)
                    largestHeight = titleHeight;
            } else if (parseInt(cardNum) > 3 || last) {
                adjustRoomCards(rowList, largestHeight);
                cardNum = 0;
            }
        });
    } else {
        $(cardList).each(function() {
            $(this).find('h2').height(forceHeight);
        });
    }
}

function filterGalleryItems(node, val) {
    document.location = val;
}
/*
* puts the detail gallery carousels caption in the pager bar
* checks image for alt tag also checks for figcaption tag
*/ 
function showCaption(element, numCaptions) {
    //The image caption is populated with the ALT tag on the image
    var $Element = null;
    if ($('#detail-cycle img').length > 1) {
        $Element = $(element);
        // MOHGS-650
        //check if a figure element
        if ($Element.length > 0 && $Element[0].tagName == "FIGURE") {
            //$Element = $Element.find("img");
            $Element = $Element.find('figcaption');
            if ($Element.length > 0) {
                $('#pagerCaption').html($Element.html());
                if ($.trim($Element.html()) != '') {
                    $('#pagerBar').fadeIn('fast');
                }
            }
        }else if (typeof $Element.attr('alt') !== 'undefined' && $Element.attr('alt') !== '') {
            $('#pagerCaption').html($Element.attr('alt'));
            $('#pagerBar').fadeIn('fast');
        }
        else {
            $("#pagerCaption").html("");
        }
    }
    else if ($('#detail-cycle img').length == 1) {
        //check if it should be a figure check
        if ($('#detail-cycle figure').length == 1) {
            $Element = $('#detail-cycle figure figcaption');
            if ($Element.length > 0) {
                $('#pagerCaption').html($Element.html());
                if ($.trim($Element.html()) != '') {
                    $('#pagerBar').fadeIn('fast');
                }
            }

        } else {
            $Element = $('#detail-cycle img');
            if (typeof $Element.attr('alt') !== 'undefined' && $Element.attr('alt') !== '') {
                $('#pagerCaption').html($Element.attr('alt'));
                if ($.trim($Element.attr('alt')) != '') {
                    $('#pagerBar').fadeIn('fast');
                }
            }
        }
    }
    //$('#pagerCaption').html($Image.attr('alt'));
}

function showCelebrityCaption(detailCycle) {
    //The image caption is populated with the ALT tag on the image
    var pagerBar = detailCycle.siblings('.pagerBar');
    var pagerCaption = pagerBar.find('.pagerCaption');
    var image = detailCycle.find('img');
    if (image.length > 1) {
        image = $(this);
        if (typeof image.attr('alt') !== 'undefined' && image.attr('alt') !== '') {
            pagerCaption.html(image.attr('alt'));
            pagerBar.fadeIn('fast');
        }
        else {
            pagerCaption.html("");
        }
    }
    else if (image.length == 1) {
        if (typeof image.attr('alt') !== 'undefined' && image.attr('alt') !== '') {
            pagerCaption.html(image.attr('alt'));
            pagerBar.fadeIn('fast');
        }
    }
}
//this sets up the proper caption to show for the homepage carousel
function showHomeCaption($next) {
    // prevent this from running on Destination MO pages.
    if ($('.byline_no_border').length > 0) { return; }
    var fadeTime = 1000,
        $slideCaption = $next.find('.slide-caption'),
        $pagerCaption = $('#pager-caption'),
        $pagerPos = $('#pager-wrap-pos'),
        $pagerWrap = $('#pager-wrap');
    if ($('body').hasClass('mobile')) {
        // speed things up to match swipe motions.
        var fadeInTime = 0,
            fadeOutTime = 0;
    } else {
        var fadeInTime = fadeTime,
            fadeoutTime = fadeTime;
    }
    /**
     *  Since the caption is only being shown and  updated during
     *  pagination we need to make sure that caption is displayed
     *  if there is only one slide in the list.  THIS is supposed
     *  to be the context of the 'current slide' and will need to
     *  fail to the first list item when manually called.
     **/
    if ($pagerCaption.is(':empty')) {
        // when cycle first inits, remove the pointless hang time before caption and pager appear.
        $pagerCaption.append($slideCaption.clone().removeAttr('style'));
        return;
    }
    if ($slideCaption.attr('style') == null) {
//		$pagerPos.removeAttr('style')
    }
    else {
//		$pagerPos.attr('style', $slideCaption.attr('style'));
    }
    $pagerCaption.fadeOut(fadeOutTime, function() {
        $("#pager-caption").empty();

    });
    $pagerCaption.queue(function() {
        $(this).append($slideCaption.clone().removeAttr('style'));
        $(this).dequeue();
    });
    $pagerCaption.queue(function() {
        $(this).fadeIn(fadeInTime);
        $(this).dequeue();
    });
}

function ie6ImgSwap(picArg) {
    for (var a = 0; a < picArg.length; a++) {
        $(picArg[a][0]).attr("src", picArg[a][1]);
    }
}

function gotoGalleryImg(goto, $gallery) {
    $gallery.find(".active").removeClass("active");
    $gallery.find(goto).addClass("active");
}

function hideBlock($block) {
    $block.find(".wrap").slideUp(800);
    $block.removeClass("active");
    $block.find(".toggle").text("Show Details");

    return false;
}

function showBlock($block, f) {
    if (typeof f != "function") {
        $block.find(".wrap").slideDown(800);
    } else {
        $block.find(".wrap").slideDown(800, f);
    }
    $block.addClass("active");
    $block.find(".toggle").text("Hide Details");

    return false;
}

function checkRequestorLocation(countryCode, callback) {
    if (!$.isArray(countryCode)) { countryCode = [countryCode]; }
    $.ajax({
        url: '/country-code.aspx',
        data: {
            'nocache':''
        },
        success: function(data) {
            if ($.inArray(data, countryCode) > -1) {
                callback();
            }
        }
    });
}

// the following two functions are used for the currency converter sidebar module widget.

function generateCurrencyDropdown() {
    var fromCurrencyDropdownHtml = "";
    var toCurrencyDropdownHtml = "";

    var currencyUrl = window.location.protocol + "//" + window.location.host + "/currency.xml";

    $.ajax({
        type: "GET",
        url: currencyUrl,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('currency').each(function() {
                // get the rate and symbol from the currently processed node.
                var currencyValue = $(this).find('crate').text();
                var currencySymbol = $(this).find('csymbol').text();

                var startOptionString = "<option value='" + currencyValue;
                var endOptionString = "'>" + currencySymbol + "</option>";

                // generate html. USD and EUR are defaults.
                fromCurrencyDropdownHtml += startOptionString;
                toCurrencyDropdownHtml += startOptionString;
                if (currencySymbol == "USD") {
                    fromCurrencyDropdownHtml += "' selected='selected";
                }
                else if (currencySymbol == 'EUR') {
                    toCurrencyDropdownHtml += "' selected='selected";
                }
                fromCurrencyDropdownHtml += endOptionString;
                toCurrencyDropdownHtml += endOptionString;

            });
            // put the generated html into the respective options.
            $('[name="fromCurrency"]').html(fromCurrencyDropdownHtml);
            $('[name="toCurrency"]').html(toCurrencyDropdownHtml);

            $.uniform.update(".cconverter select");

        }

    });

}

function calcNewConversion(direction) {
    // get the variables we need for the calculation and calculate the new field value

    // selectors change based on the direction of the conversion
    var originField;
    var destinationField;
    var originDropdown;
    var destinationDropdown;

    if (direction == "rtol") {
        originField = $('[name="toCurrencyTextField"]');
        destinationField = $('[name="fromCurrencyTextField"]');
        originDropdown = 'toCurrency';
        destinationDropdown = 'fromCurrency';
    }
    else {
        originField = $('[name="fromCurrencyTextField"]');
        destinationField = $('[name="toCurrencyTextField"]');
        originDropdown = 'fromCurrency';
        destinationDropdown = 'toCurrency';
    }

    var calculatedEquivalent = 0;
    var currentFieldValue = originField.prop('value');
    var fromValue = $('[name="' + originDropdown + '"] option:selected').val();
    var toValue = $('[name="' + destinationDropdown + '"] option:selected').val();
    calculatedEquivalent = ((currentFieldValue * toValue) / fromValue).toFixed(2);

    // handle if bad input is entered.
    if (isNaN(parseFloat(calculatedEquivalent))) {
        destinationField.attr('value', "Please Enter a Proper Number");
    }
    else {
        destinationField.attr('value',calculatedEquivalent);
    }

}

// MOWEB-776 MOPRO Validation : BEGIN : Patrick D'Souza (6/20/2012)
// Retrieve Error Messages from XML file on server for localization support

var MOPROErrorMessages = {};
var myProfileErrorMessagesUrl = window.location.protocol + "//" + window.location.host + "/myprofileerrormessages.xml"
$(document).ready(function () {
    MOPROErrorMessages = $.ajax({
        type: "GET",
        url: myProfileErrorMessagesUrl,
        dataType: "text",
        global: false,
        async: false,
        success: function (data) {
            return data;
        }
    });
});

// Extract localized error message text from XML
function LookupError(key, defaultError) {
    var msg = '';
    var xml = '';
    try {
        if (typeof MOPROErrorMessages != 'undefined') {
            if (typeof MOPROErrorMessages.responseText != 'undefined') {
                xml = MOPROErrorMessages.responseText;
            }
        }
        // 1. need to escape tcm:component using "\\" escape character
        // 2. use CSS selector syntax, "animal > dog > beagle to drill down to the key values
        // 3. find the sckey for the given key and extract the value in scValue from the siblings collection
        /*find('//tcm\\:component/tcm\\:data/tcm\\:content').*/
        msg = $(xml).find('systemcomponent > systemcomponentkeyvalues > sckey:contains("' + key + '")').siblings().text();
        if (msg == '') msg = defaultError; // set default error message if not found in xml file
    }
    catch (m) {
        msg = defaultError;
    }
    return msg;
}
// MOWEB-776 MOPRO Validation : END : Patrick D'Souza (6/20/2012)

/** END GLOBAL FUNCTIONS **/

/** BEGIN JQUERY FUNCTIONS **/
(function($) {

/*	if ($('#mystays-react .tab1 .filters .fieldset.contact-filters .field-full-width .no-box-select option')) {
        $('#mystays-react .tab1 .filters .fieldset.contact-filters .field-full-width .no-box-select option').text().toLowerCase();
        $('#mystays-react .tab1 .filters .fieldset.contact-filters .field-full-width .no-box-select option').css("text-transform", "capitalize");
    }*/
/*	if ($("#mystays-react #sort-all")) {
        $("#mystays-react #sort-all").attr("checked", "checked");
    }
    
    if ($('.my-profile .field-full-width>input')) {
        $('.my-profile .field-full-width>input').css("text-transform", "capitalize");
        $('.my-profile .field-full-width>input').each(function() {
            $(this).attr("placeholder", $(this).attr("placeholder").toLowerCase());
        });
    }*/

    // #Matt
    $.fn.imgSwap = function(path) {
        $(this).attr("src", path);
    } // end $.fn.imgSwap

    $.fn.initSlidingMenu = function() {
        var $gallery = $(".gallery");
        var $slide_link = $(this).find("a.slide");
        var $nav = $(this).find(".secondary-nav");
        var $close = $(this).find("a.close");
        var $this = this;
        // localize direction of animated effects when page content is flopped.
        var rtlizer = function(ltr) { // returns string, assumes input is either 'right' or 'left'
            if ($('html').attr('lang') != 'ar' && $('html').attr('dir') != 'rtl') { return ltr; }
            if (ltr.match(/left/i)) { return 'right'; }
            return 'left';
        }
        $slide_link.click(function(e) {
            var $clicked = $(this);
            var target = this.hash;
            // start closing the active drawer before opening a new one.
            if ($('.slide.active') && $('.slide.active').attr('href') != target) {
                var closeThis = $('.slide.active').attr('href');
                $('.slide.active').removeClass("active");
                $(closeThis).animate({
                    width: '0px'
                }, 1000, function() {
                    // waiting for hide()'s callback to remove '.active'
                    //    causes race conditions.
                });
            }
            if ($clicked.hasClass("active")) {
                $nav.removeClass("active");
                $(target).animate({
                    width: '0px'
                }, 1000, function() {
                });
                $clicked.removeClass("active");
            } else {
                $nav.addClass("active");
                $(target).animate({
                    width: '350px'
                }, 1000, function() {
                    if ($gallery.length > 0 && $(this).hasClass("gallery-menu-item")) {
                        if (!$gallery.is(":visible"))
                            $gallery.fadeIn("fast");
                    }
                });
                $clicked.addClass("active");
            }
            //reset scroll panel to top
            $($this).find($(this).attr("href") + " .wrap-contents").each(function() {
                var api = $(this).data('jsp');
                api.scrollToY(0);
            });

            return false;
        });

        $close.click(function(e) {
            e.preventDefault();
            $(this).parents(".slide-menu-item").animate({ width: '0px' }, 1000, function() {
                $nav.find("a.active").removeClass("active");
                $nav.removeClass("active");
            });

            return false;
        });

        //initialize scroll panel
        $(this).find(".slide-menu-item .wrap .wrap-contents").each(function() {
            $(this).parent().parent().show();
            $(this).jScrollPane();
            // $(this).parent().parent().hide();
        });
    }

    $.fn.initGallery = function() {

//		if ($(window).width() > 1800) {
//			$(this).css("left","43.333333%");
//		}

        var $gallery = $(this).find(".gallery");
        var $nav = $(".gallery-nav");

        $nav.find("li").hover(
			function() {
			    $(this).find(".rollover").fadeOut("fast");
			},
			function() {
			    if (!$(this).hasClass("active"))
			        $(this).find(".rollover").fadeIn("fast");

			}
		).find("a").click(function() {
		    $nav.find(".active").removeClass("active");
		    $(this).parent("li").addClass("active");
		    $nav.find("li:not(.active) .rollover").fadeIn("fast");
		    gotoGalleryImg(this.hash, $gallery);


		    return false;
		});

    } //initGallery

    $.fn.initAccordion = function() {

        var $container = $(this);
        var $toggle = $container.find("a.toggle");

        $toggle.click(function() {

            var $block = $(this).parents(".block");

            if ($block.hasClass("active")) {
                hideBlock($block);
                $("html, body").animate({scrollTop: 0}, 800);
            } else {
                showBlock($block);
                $("html, body").animate({scrollTop: ($block.offset().top) - 10}, 800);
            }

            return false;
        });

    } // $.fn.initAccordion

    $.fn.initFilters = function() {

//		var $blocks = $(this).parent().find(".block");

        // Find all blocks that don't include a child element with the contact-filters (radio button list)
        if ($('body').hasClass('mobile')) { return; }
        var $blocks = $(this).parents('.contact-us').find('.block > .wrap > .sub-block').children(':not(.contact-filters,:hidden)').parents('.block')
        var $target = $(this).find("input");

        $target.change(function() {
            var goto = $(this).val();
            var scrollto = "";
            if (goto == "all") {
                $blocks.each(function() {
                    if (!$(this).hasClass("active")) { // Block is not already showing
                        showBlock($(this), false); // set animate scroll to false
                    }
                });
                scrollto = ".block:eq(0)";
                $("html, body").animate({scrollTop: ($(scrollto).offset().top) - 10}, 800);

            } else {

                $blocks.each(function() {
                    if ($(this).hasClass("active")) {
                        hideBlock($(this), true); // set animate scroll to false
                    }
                });

                scrollto = "#" + goto;
                showBlock($(scrollto), function() {$("html, body").animate({scrollTop: ($(scrollto).offset().top) - 60}, 800)}); //set scroll towards top of the page
            }

        });

    } // $.fn.contactFilter
})(jQuery)
/** END JQUERY FUNCTIONS **/

// MOHGS-665 - execute scripts "synchronously"
if (typeof __scriptCount__ != 'undefined') { __scriptCount__ += 1; }
