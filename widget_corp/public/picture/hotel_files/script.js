/* Author:
	chaught, tshvueli Siteworx Inc.
*/

var addThisInitialized = false;
var currentGalleryDetail = null;
var galleryInstantAnimate = false;
var currentOpenProfileBlock = null;
var profileInstantAnimate = false;
var denyImageZoomClosing = false;
var passwordRegex = /^[^0-9][A-Za-z0-9]{7,}$/;
var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var videoViewer = null;

var isMobile = {A: function() {return navigator.userAgent.match(/Android/i);},
    B: function() {return navigator.userAgent.match(/BlackBerry/i);},
    iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    O: function() {return navigator.userAgent.match(/Opera Mini/i);},
    W: function() {return navigator.userAgent.match(/IEMobile/i);},
    any: function() {return (isMobile.A() || isMobile.B() || isMobile.iOS() || isMobile.O() || isMobile.W());}
};

// fix Win Phone 8 viewport scaling bug https://coderwall.com/p/zk_2la
(function() {
	if ("-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style");
		msViewportStyle.appendChild(
			document.createTextNode("@-ms-viewport{width:auto!important}")
		);
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
	}
})();
var hoverTimeouts = {};
(function($) {
    $(document).ready(function () {
        //on update panel update, make sure to call uniform.js again
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);
        function endRequestHandler(sender, args) {
            if ($('body.mobile').length < 1) {
                $('body').find('.fieldset select, .callout-inner select, select, .fieldset input[type=radio], .fieldset input[type=checkbox]').uniform();
            }
            $('.newsletter').find(".primary, .button").addClass("loader-button");
        }
        ///add placeholder text for unsupported browsers
        $('input[placeholder], textarea[placeholder]').placeholder();
        //checking if ipad or ipad mini
        if ($("body.mobile").length == 0) {
            if (navigator.userAgent.toString().toLowerCase().indexOf("ipad") >= 0) {
                var viewport = document.querySelector("meta[name=viewport]");
                if (typeof viewport != 'undefined' && viewport != null) {
                    viewport.setAttribute('content', '');
                }
            }
        } else {
            //if in mobile we need to setup action of go to full site link
            if ($('.gotoFullSite').length > 0) {
                $('.gotoFullSite').click(function (event) {
			event.preventDefault();
			var domain="mandarinoriental.com";
			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000;
			now.setTime(time);
			if(window.location.href.indexOf("mandarin-oriental.ru") > 0) { domain="mandarin-oriental.ru"; }
			if(window.location.href.indexOf("siteworx.com") > 0) { domain="siteworx.com"; }
		    document.cookie = "view_desktop=true; expires=" + now.toUTCString() + "; Domain=" + domain + "; path=/";
		    if(window.location.href.indexOf("siteworx") > 0) {
	                    setTimeout(function() {window.location = window.location.href.replace("-m", "");}, 500);
		    } else {
			setTimeout(function() { if(window.location.search.indexOf("?") != -1) {window.location.search+="&reload=true";} else {window.location.search = "?reload=true";} }, 500);
		    }
                });
            }
        }

        //below finds your location in the site by hotel you are on
        //e.g. /london puts you in london location
        ///this is used for the residences dropdown to add a location marker
	    var myloc='';
	    var pn=window.location.pathname;
	    var pnarr=pn.split('/');
	    if(pnarr.length>0) {
	      myloc=pnarr[1];
	    }
	    if (myloc != '') {
	        $('nav li a[href*="residences/' + myloc + '/"]').parent().addClass("res-marker");
	    }

        // MOHGS-665 - "force" plugins.js/init.js/script.js scripts to execute "synchronously"
		if (typeof __scriptCount__ != 'undefined') {
			setTimeout(function() { scriptDelay(); }, 100);
			function scriptDelay() {
				if(__scriptCount__ !== 2) {
					// wait
					setTimeout(function() { scriptDelay(); }, 100);
				} else {
					$('body').mohginit();
				}
			}
		} else {
			$(window).load(function() {
				$('body').mohginit();
			});
		}
		// add this configuration
		var addthis_config =
		{
		   // ... members go here
		   //pubid : 'ra-4e80c55d6a278822'
		}

	}); // window.load

	$.fn.mohginit = function() {
		var $this = $(this);

		//console.log("this", $this);

		var home_speed = 2000,
			home_timeout = 4000,
			page_wrap = $('#page-wrap'),
			has_homecarousel = false;

		$(window).resize(function(e){
			if (has_homecarousel) {
				adjustHomeCarousel(page_wrap);
			}
		});
        
        if($.inArray($('html').attr('lang'), ['en','zh']) != -1) {
            $('#footer-wrap .unionpay-footer + li').addClass('first');
            checkRequestorLocation(['CN','HK','MO'], function() {
                if($('body').hasClass('home-page')) {
                    $('#footer-wrap .unionpay-banner').show();
                    $('#footer-wrap .unionpay-footer').hide();
                }
                else {
                    $('#footer-wrap .unionpay-banner').hide();
                    $('#footer-wrap .unionpay-footer').addClass('first').show();
                    $('#footer-wrap .unionpay-footer + li').removeClass('first');
                }
            });
        }

		var mouseInGallery = false;
		var mouseInImageZoom = false;

		$(".image-gallery").hover(function(){
			mouseInGallery=true;
		}, function(){
			mouseInGallery=false;
		});

		$("body").unbind("mouseup");

		$("body").bind("mouseup", function() {
			//if(!$(this).hasClass("image-gallery") && !($(this).parents(".image-gallery").length > 0)) {
			if(mouseInGallery == false && mouseInImageZoom == false) {
				resetGallery($(".image-gallery"));
			}
			//}
		});
		
        $this.find('#header-lists ul > li.more-action').on('mouseover', function(e) {
            // desktop browsers - hover-over
            if (!$(this).hasClass('touched')) {
                //make sure only one is over at a time
                $this.find('#header-lists ul > li.more-action.hover').removeClass('hover');
                $(this).addClass('hover');
                clearTimeout(hoverTimeouts[$(this).uniqueId()[0].id]);
            }
            
            
        });
        //ie 10 and ie11 were having issues on clicks in the hover
        $this.find('#header-lists ul > li.more-action *').on('click', function (e) {
            // desktop browsers - hover-over
            if (!$(this).parents('.more-action').hasClass('touched')) {
                //make sure only one is over at a time
                $this.find('#header-lists ul > li.more-action.hover').removeClass('hover');
                $(this).parents('.more-action').addClass('hover');
                clearTimeout(hoverTimeouts[$(this).parents('.more-action').uniqueId()[0].id]);
            }

        });
        $this.find('#header-lists ul > li.more-action input').on('focus', function (e) {
            clearTimeout(hoverTimeouts[$(this).parents('.more-action').uniqueId()[0].id]);
        });
        $this.find('#header-lists ul > li.more-action').on('mouseout', function(e) {
            // desktop browsers - hover-out
            var me = $(this);
            if (!me.hasClass('touched')) {
                hoverTimeouts[me.uniqueId()[0].id] = setTimeout(function () {
                    me.removeClass('hover');
                }, 750);
            }
        });
        $this.find('#header-lists ul > li.more-action').on('touchend', function(e) {
            // iOS/Android - touch
            if($(event.target).is("a") && !$(event.target).parents().is("section")) {
                e.preventDefault();
                if(!$(this).hasClass('touched')) { $(this).addClass('hover touched'); }
                else { $(this).removeClass('hover touched'); }
            }
        });
        $this.find('#header-lists ul > li.more-action').on('pointerup MSPointerUp', function(e) {
            // Surface/IE - touch
            if(!$(this).hasClass('touched')) { $(this).addClass('hover touched'); }
            else { $(this).removeClass('hover touched'); }
        });
	$this.find('.book-restaurant').each(function() {
		$(this).attr('target','_blank'); 
        });
	$this.find('.book-restaurant-reservation').each(function() {
		$(this).attr('target','_blank'); 
        });
	if ($('.gotoMobileSite').length > 0) {
                $('.gotoMobileSite').click(function (event) {
		    event.preventDefault();
		    var domain="mandarinoriental.com";
		    if(window.location.href.indexOf("mandarin-oriental.ru") > 0) { domain="mandarin-oriental.ru"; }
		    if(window.location.href.indexOf("siteworx.com") > 0) { domain="siteworx.com"; }
		    document.cookie = "view_desktop=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + domain + "; path=/";
		    if(window.location.href.indexOf("siteworx") > 0) {
			if(window.location.href.indexOf("-") > 0) {
	                    setTimeout(function() {window.location = window.location.href.replace("-", "-m-");}, 500);
			} else {
	                    setTimeout(function() {window.location = window.location.href.replace(".siteworx", "-m.siteworx");}, 500);
			}
		    } else {
			setTimeout(function() { if(window.location.search.indexOf("?") != -1) {window.location.search+="&reload=true";} else {window.location.search = "?reload=true";} }, 500);
		    }
                });
		if (document.cookie.indexOf("view_desktop") == -1) {	
			$('.gotoMobileSite').hide();
		}  
	}

		//delight accordian
		if ($("#delight-accordion").length > 0) {
			$('#delight-accordion').hrzAccordion({
				fixedWidth : 556,
				handleClass : "heading",
				handlePosition: "left",
				contentInnerWrapper: "accord-inner-wrapper",
				listItemSelected: "list-item-selected",
				openOnLoad: false,
				numPanels: $('#delight-accordion li').length,
				containerWidth: $('#delight-accordion').width()
			});
		}

		//MOHG-946
		$(".modalImg").click(function(e){
			e.preventDefault();
			//edit image source url
			var source = $('.modal img').attr('src');
			//calculate image height
			var winHeight = $(window).height() - 200;
			if(source.indexOf('hei') == -1) {
				source += "&hei=" + winHeight;
				source = source.replace("$DetailSidebarLandscapeHeight$&", "");
				$('.modal img').attr('src', source);
			}
			$(window).scrollTop(0);
			// show modal
			$(".modal").show();

		});

		$(window).resize(function() {
			if($(".modal img").length > 0) {
				var imgSrc = $(".modal img").attr("src");
				var imgPresetStart = imgSrc.indexOf("&hei");
				imgSrc = imgSrc.substring(0, imgPresetStart);
				var winHeight = $(window).height() - 200;
				$(".modal img").attr("src", imgSrc + '&hei=' + winHeight);
			}
		});

		$(".modal .close").click(function(){
			// hide modal
			$(".modal").hide();
		});

		$('.modal .print').click(function(event) {
			event.preventDefault();
			var container = $(this).attr('rel');
			// print using jquery.printArea.js
			$('.' + container).printArea();
			return false;
		});

		$(window).scroll(function() {
			if($('.modal').css('display') != 'none') {
				$(".modal").css("top", $(window).scrollTop() + "px");
			}
		});
		//end MOHG-946

		//related images zoom
		$this.delegate('.right-rail .module.relatedImg li a', 'click', function(ev)
		{
			ev.preventDefault();
			openImageZoom($($(this).find('img')[0]).attr('src'));
		});

		// Celebrity gallery carousel
		if ($('.celebrity-gallery').length > 0) {
			$this.find('.detail-cycle').each(function() {
				var detailCycle = $(this);
				var numCaptions = 0;
				detailCycle.find("img").each(function() {
					if (typeof $(this).attr('alt') !== 'undefined' && $(this).attr('alt') !== '') {
						numCaptions++;
					}
				});

				if (numCaptions > 0) {
					detailCycle.siblings(".pagerBar").show();
					if (detailCycle.children("img").length == 1) {
						detailCycle.siblings(".pagerBar").find(".pager").hide();
					}
				}
				else {
					detailCycle.parent(".sub-page-carousel").hover(
						function() {
							$(this).children(".pagerBar").fadeIn();
						},
						function() {
							$(this).children(".pagerBar").fadeOut();
						}
					);
				}

				if($this.find('.detail-cycle figure').length > 0) {
					detailCycle.cycle({
						log: false, // to write events to console.log, comment this line or set to true
						fx: 'fade',
						speed:  home_speed,
						timeout: home_timeout,
						pager: detailCycle.siblings(".pagerBar").children(".pager"),
						slides: 'figure'
					}).on('cycle-before',function() {
					    showCelebrityCaption(detailCycle);
					});
				}
				else {
					detailCycle.cycle({
						log: false, // to write events to console.log, comment this line or set to true
						fx: 'fade',
						speed:  home_speed,
						timeout: home_timeout,
						pager: detailCycle.siblings(".pagerBar").children(".pager"),
						slides: 'img'
					}).on('cycle-before',function() {
					    showCelebrityCaption(detailCycle);
					});
				}

				detailCycle.find("img").css("visibility", "visible");
				detailCycle.siblings(".pagerBar").find(".pagerZoom").click(function() {
					$("#image-zoom").click(function() {
						detailCycle.cycle("resume");
					});
					detailCycle.cycle("pause");

					var imgSrc = detailCycle.find("img:visible:first").attr("src");

					openImageZoom(imgSrc);
				});
			});
		}
		// Details Page Carousel
		else if ($this.find('#detail-cycle img').length > 0) {
		    $this.find('#detail-cycle').each(function() {
		        var detailCycle = $(this);
		        var firstImage = detailCycle.find("img");
		        var checkHeight = function() {
		            var z = firstImage.height();
		            if (z>0) {
		                detailCycle.height(z);
		                detailCycle.width(detailCycle.find("img").width());
		                detailCycle.closest(".sub-page-carousel").height(z);
		            } else {
		                p++;
		                if (p>20) { return; } // prevent deadlocking
		                setTimeout(checkHeight,100);
		            }
		            return;
		        };
		        var p = 0;
		        checkHeight();
		        var numCaptions = 0;
		        detailCycle.children("img, figure").each(function () {
		            if ((typeof $(this).attr('alt') !== 'undefined' && $(this).attr('alt') !== '') || ($(this).find('figcaption').length > 0 && $.trim($(this).find('figcaption').html()) != ''))
		            {
		                numCaptions++;
		            }
		        });

		        if (numCaptions > 0) {
		            detailCycle.siblings("#pagerBar").show();
		        }
				else {
					detailCycle.parent(".sub-page-carousel").hover(
						function() {
							$(this).children("#pagerBar").fadeIn();
						},
						function() {
							$(this).children("#pagerBar").fadeOut();
						}
					);
				}

				if ($this.find('#detail-cycle figure').length > 0) {
                    //setup post cycle initialization event has to be done before cycle() init
				    detailCycle.on('cycle-post-initialize', function (event, optionHash) {
				        //after init show the first caption
				        showCaption($this.find('#detail-cycle figure').get(0));
				    });
				    detailCycle.cycle({
				        log: false, // to write events to console.log, comment this line or set to true
				        fx: 'fade',
				        speed: 750,
				        timeout: home_timeout,
				        pager: '#pager',
				        slides: 'figure',
				        swipe: true
				    }).on('cycle-before', function (event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
				        showCaption(incomingSlideEl);
				    });
				}
				else {
				    //setup post cycle initialization event has to be done before cycle() init
				    detailCycle.on('cycle-post-initialize', function (event, optionHash) {
				        //after init show the first caption
				        showCaption($this.find('#detail-cycle figure').get(0));
				    });
				    detailCycle.cycle({
				        log: false, // to write events to console.log, comment this line or set to true
				        fx: 'fade',
				        speed: 750,
				        timeout: home_timeout,
				        pager: '#pager',
				        slides: 'img',
				        swipe: true
				    }).on('cycle-before', function (event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
				        showCaption(incomingSlideEl);
				    });
				}

				detailCycle.find("img").css("visibility", "visible");
				detailCycle.siblings("#pagerBar").find("#pagerZoom").click(function() {
					$("#image-zoom").click(function() {
						detailCycle.cycle("resume");
					});
					detailCycle.cycle("pause");

					var imgSrc = detailCycle.find("img:visible:first").attr("src");

					openImageZoom(imgSrc);
				});
			});
		}
		else
		{
            //if only 1 item in the carousel
		    if ($('#detail-cycle figure').length == 1) {
                showCaption($this.find('#detail-cycle figure').get(0));
		    } else {
		        showCaption($this.find('#detail-cycle img').get(0));
		    }
		}

		//signature carousel
		//should be stopped and pager hidden on page load.
		//activated by 'restaurant images' link on sidebar, deactivated by other sidebar links
		if($this.find(".restaurants-gallery #detail-cycle").length > 0)
		{
			$this.find("#pagerBar").hide();
			$this.find(".restaurants-gallery #detail-cycle").hide();
			$this.find(".restaurants-gallery #detail-cycle").cycle("pause");
			$this.find(".restaurants-splash .slide").click(function() {
				if($(this).hasClass("carouselToggle") && !$(this).hasClass("active"))
				{
					$this.find(".restaurants-gallery-background").hide();
					$this.find("#pagerBar").show();
					$this.find(".restaurants-gallery #detail-cycle").show();
					$this.find(".restaurants-gallery #detail-cycle").cycle("resume");
				}
				else
				{
					$this.find(".restaurants-gallery-background").show();
					$this.find("#pagerBar").hide();
					$this.find(".restaurants-gallery #detail-cycle").hide();
					$this.find(".restaurants-gallery #detail-cycle").cycle("pause");
				}
			});
		}

		// MOHGS-119 Show select boxes in teasers if not using a mobile device
		if( !(isMobile.any()) && $this.find("#pickersFields").length > 0 )
		{
			$this.find("#pickersFields").show();
		}
		// Set Up Image Zoom
		setupImageZoom();
	    /*
        *   the following links swipe events to go to a next/previous page
        */
        //setup swipe left and right on 


		if ($('.details-buttons .button-clear').length > 0) {
            //found right button go to next, add event for swipeleft,swiperight
		    $('.details-buttons,.sub-content .module-body').swipe({
		        swipe:function(event, direction, distance, duration, fingerCount) {
		            if ($('.details-buttons .button-clear.right').length > 0) {
		                if (direction == 'left') {
		                    document.location.href = $('.details-buttons .button-clear.right').get(0).href;
		                }
		            }
		            if ($('.details-buttons .button-clear.left').length > 0) {
		                if (direction == 'right') {
		                    document.location.href = $('.details-buttons .button-clear.left').get(0).href;
		                }
		            }
		        },
		        threshold: 100,
		        allowPageScroll: 'vertical'
		    });
		}
	    
	    /*
        * if we are on a gallery type page we want to be able to swipe left and
        * right in it's area to go to the next and previous gallery item
        */
		if ($('.detail-view').length > 0) {
		    $('.detail-view > ul').swipe({
		        swipe: function (event, direction, distance, duration, fingerCount) {
		            if (direction == 'left') {
		                $(this).parent('.detail-view').find('.action-wrap .next').click();
		            }
		            if (direction == 'right') {
		                $(this).parent('.detail-view').find('.action-wrap .prev').click();
		            }
		        },
		        threshold: 100,
                allowPageScroll: 'vertical'
		    });
		}

	    function setupImageZoom() {
			if($("#image-zoom").length == 0) {
				$("body").append('<div id="image-zoom" style="display:none;"><div class="close"></div></div>');
				$("#image-zoom").click(function() {
					closeImageZoom();
				});

				$(window).resize(function() {
					if($("#image-zoom img").length > 0) {
						var imgSrc = $("#image-zoom img").attr("src");
						var imgPresetStart = imgSrc.indexOf("?hei");
						if(imgPresetStart == -1) {
							imgPresetStart = imgSrc.indexOf("?wid");
						}
						imgSrc = imgSrc.substring(0, imgPresetStart);
						var winHeight = $(window).height();
						$("#image-zoom").css("top", $(window).scrollTop() + "px");
						$("#image-zoom img").attr("src", imgSrc + '?hei=' + winHeight);
						imageZoomOnImageLoad(imgSrc);
					}

					if($("#image-zoom .zoom_video_cont").length > 0) {
						var winHeight = $(window).height();
						var contHeight = $(this).height();
						var newTop = (winHeight / 2) - (contHeight / 2);
						$(this).css("margin-top", newTop + "px");
					}
				});

				$(window).scroll(function() {
					if($("#image-zoom").length > 0) {
						$("#image-zoom").css("top", $(window).scrollTop() + "px");
					}
				});



				$("#image-zoom").hover(function(){
					mouseInImageZoom=true;
				}, function(){
					mouseInImageZoom=false;
				});
			}
		}

		//Details Page Availability widget
		function dateGen(t) {
			var weekDay = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
			var monthDay = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
			return weekDay[t.getDay()] + ', ' + monthDay[t.getMonth()] + ' ' + t.getDate() + ', ' + t.getFullYear();
		}

		// ***** Added on 11/09/2012 Brian Flaherty for MOHGS-169 *****
		var PageURL = document.URL;
		var pageDateFormat = 'DD, d MM yy';
		if ((PageURL.indexOf("mandarinoriental.co.jp") >=0) || (PageURL.indexOf("jp.siteworx.com") >=0 ))
		{
			pageDateFormat = 'yy年, MM dD';
		}
		else if ((PageURL.indexOf("mandarinoriental.com.cn") >=0) || (PageURL.indexOf("cn.siteworx.com") >=0 ) ||
				 (PageURL.indexOf("mandarinoriental.com.hk") >=0) || (PageURL.indexOf("hk.siteworx.com") >=0 ))
		{
			pageDateFormat = 'yy年 m月 d日';
		}
		// ***** End addition MOHGS-169

		// ***** Added on 11/26/2012 Brian Flaherty for MOHGS-75 *****
		function TranlateDateString(inputDate) {
			var transDate = inputDate;
			if(typeof globalLang !== 'undefined')
			{
				var weekDays = $.datepicker.regional[globalLang].dayNames;
				var months = $.datepicker.regional[globalLang].monthNames;
				var englishDayNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
				var englishMonthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

				if(globalLang.indexOf("zh") > -1)
				{
					// MOHGS-741
					months = months.reverse();
					englishMonthNames = englishMonthNames.reverse();
				}

				for (var i=0; i < 12; i++)
				{
					if(inputDate.indexOf(weekDays[i])>=0)
					{
						transDate = transDate.replace(weekDays[i], englishDayNames[i]);
					}
					if(inputDate.indexOf(months[i])>=0)
					{
						transDate = transDate.replace(months[i], englishMonthNames[i]);
					}
				}
			}
			return transDate;
		}
		// ***** End addition MOHGS-75

		function dateCalendar() {
			// date has to be pre-inserted into FROM and TO fields.
			var arrivalDate = new Date();
			var ddTime = parseInt(arrivalDate.getTime()) + 172800000;
			var departureDate = new Date(parseInt(ddTime));
			var imageLocation = "/static/images/icons/calendar-icon-20x19.gif";
			$this.find('.room-availability input[name*="from"]').val(dateGen(arrivalDate));
			$this.find('.room-availability input[name*="to"]').val(dateGen(departureDate));
			$this.find('.room-availability input[name*="Date"]').val(dateGen(arrivalDate));
            //if under residences we use different icon
			if ($('body.residences').length > 0) {
			    imageLocation = '/static/images/icons/residences-cal-icon.png';
			}
			var dates = $( ".room-availability input[name*='from'],.room-availability input[name*='to']" ).datepicker({
//				defaultDate: "",
				minDate:'0',
				changeMonth: true,
				changeYear: true,
				yearRange: "c:c+1",
				maxDate: "+1y",
				numberOfMonths: 1,
				dateFormat: pageDateFormat,
				showOn: "button",
				buttonImage: imageLocation, // for server dev
//				buttonImage: "static/images/icons/calendar-icon-20x19.gif", // for front-end demo
				buttonImageOnly: true,
				onSelect: function( selectedDate ) {
					var option = $(this).attr('name').indexOf("from") >-1 ? "minDate" : "",
						instance = $(this).data( "datepicker" ),
						date = $.datepicker.parseDate(
							instance.settings.dateFormat ||
							$.datepicker._defaults.dateFormat,
							selectedDate, instance.settings );
					var conJPDate = selectedDate;
					var PageURL = document.URL;
					if ((PageURL.indexOf("mandarinoriental.co.jp") >=0) || (PageURL.indexOf("jp.siteworx.com")>=0))	{
						var numberPattern = /\d+/g;
						var datestr = conJPDate.match(numberPattern).toString();
						var datesarr = datestr.split(",");
						if (datesarr.length > 2) {
							var myMonth = datesarr[1];
							var myDay = datesarr[2];
							var myYear = datesarr[0];
							conJPDate = myYear + " " + myMonth + " " + myDay;
						}

						var nextDate = new Date(conJPDate + ",00:00:00");
					}
					else
					{
						var nextDate = new Date(TranlateDateString(selectedDate));  // Changed to call the new function for MOHGS-75 Brian Flaherty 11/26/2012
					}
					nextDate.setDate(nextDate.getDate() + minStay);
					dates.not(this).datepicker( "option", option, nextDate );
				}
			});
			// override datepicker's attempt to place the calendar icon in the wrong place on pages with RTL read order.
			if ($('body').hasClass('mobile') && ($('html').attr('dir')==='rtl' || $('html').attr('lang')==='ar')) {
				// jQui datepicker puts icon BELOW input on LTR pages, and icon ABOVE input on RTL pages.
				// this forces the icon to ALWAYS be below input.
				// and thus CSS is made easy.
				dates.datepicker('option','isRTL',false);
			}
			// associate label FOR with datepicker-assigned field ID.
			$('[for="from"],[for="to"]').attr('for',function(){
				return $(this).siblings('input[name="'+$(this).attr('for')+'"]').attr('id');
			});

            // MOWEB-906: create datepicker without any onSelect restrictions for normal dates (not from..to dates)
            var otherdates = $(".room-availability input[name*='Date']" ).datepicker({
//				defaultDate: "",
				numberOfMonths: 1,
				minDate:"-10y",
				changeMonth: true,
				changeYear: true,
				yearRange: "1998:2098",
				maxDate: "+10y",
				dateFormat: pageDateFormat,
				showOn: "button",
				buttonImage: imageLocation, // for server dev
//				buttonImage: "static/images/icons/calendar-icon-20x19.gif", // for front-end demo
				buttonImageOnly: true,
				onSelect: function( selectedDate ) {
						instance = $(this).data( "datepicker" ),
						date = $.datepicker.parseDate(
							instance.settings.dateFormat ||
							$.datepicker._defaults.dateFormat,
							selectedDate, instance.settings );
				}
			});

			if(typeof overrideAvailabilityDates != 'undefined') {
				setRoomAvailabilityDates(overrideAvailabilityDates);
			}
		}
		dateCalendar();

		// setRoomAvailabilityDates
		// This function sets the dates in the room availability components, based on the order they appear on the page.
		// The first range object in the array will be used to fill in the dates of the first component, the second range
		// the second, etc.
		// params
		// -dateRanges - an array of JavaScript objects, in this format:
		//				 [{from:"03/20/2012", to:"03/23/2012"},{from: "03/11/2012", to: "03/15/2012"}]
		//				 if you only have one date range, still put it in an array like so:
		//				 [{from: "03/11/2012", to: "03/15/2012"}]
		function setRoomAvailabilityDates(dateRanges) {
			if(dateRanges) {
				var availModules = $(".room-availability");

				if(availModules.length > 0) {
					availModules.each(function(index) {
						if(dateRanges[index] != undefined) {
							var tempRangeObject = dateRanges[index];
							if(tempRangeObject.from != undefined && $(this).find("input[id*='_from']").length > 0) {
								$(this).find("input[id*='_from']").datepicker("setDate", new Date(tempRangeObject.from));
							}
							if(tempRangeObject.to != undefined && $(this).find("input[id*='_to']").length > 0) {
								$(this).find("input[id*='_to']").datepicker("setDate", new Date(tempRangeObject.to));
							}
						}
					});
				}
			}
		}

		// Featured Carousel
		if ($this.find('ul#home-carousel li').length > 0) {
			has_homecarousel = true;

			// prevent this from running on Destination MO pages.
			if ($('.byline_no_border').length == 0) {
				//adjust carousel offset
				adjustHomeCarousel(page_wrap);
			}

			//show the carousel
			$this.find('#home-carousel-wrap').css('visibility','visible');
			var $carousel = $this.find('#home-carousel');
			if ($carousel.find('li').length > 1) {
			    var $phantom = {};
                //homepage carousel
				if ($this.hasClass('mobile')) {
					var cycle_fx = 'scrollHorz',
						cycle_speed = 750, // slides move faster to track finger movement
						cycle_timeout = 5000; // slides only move on user action
					// $phantom is a shadow carousel of invisible GIFs to capture the swipe events and transmit them to the visible carousel.
					// the visible carousel also has to talk back to the phantom in case of timed events or pager actions.
					$('#pager-wrap-pos').prepend('<div class="phantom-home-carousel" />');
					$phantom = $('#pager-wrap-pos .phantom-home-carousel');
					$phantom.append(function(){
						var l = $carousel.find('li').length,
							imgs = '';
						for (var a=0;a<l;a++) {
							// x.gif is a boring ol' 1x1 transparent GIF.
							imgs += '<img src="/static/images/bg/x.gif" class="" />';
						}
						return imgs;
					}).cycle({
						log: false, // to write events to console.log, comment this line or set to true
						speed:  0,
						timeout: 0,
						slides: '>img',
						swipe: true // for mobile devices. requires swipe plugin
					});
				    //add hammer to capture the swipe next on rtl pages
                    if ($('html.rtl').length > 0) {
                        $('#pager-wrap-pos .phantom-home-carousel > img').hammer().on("swipeleft", function (event) {
                            $($('.cycle-slide-active')[0]).trigger('swipeleft');
                        });
                    }
				    //in mobile we need to add class to pager wrap to display it after load
                    $carousel.on('cycle-post-initialize', function (event, optionHash) {
                        //
                        $('#pager-wrap').addClass('mobile-show-pager');
                    });
				} else {
				    var cycle_fx = 'scrollHorz',
						cycle_speed = 750,
						cycle_timeout = home_timeout;
				    
				    //test to see if we are on the homepage or not...if on not on homepage (e.g. www.mandarinoriental.com) 
				    //then we dont' show the pager-caption on carousel
				    if ((!$('body').hasClass('mobile')) && window.location.pathname.split('/').length != 2) {
				        $('#pager-caption').hide();
				    }
				}
			    //homepage carousel
				
			    
				$carousel.on('cycle-bootstrap',function(event,opts) {
					if ($('body').hasClass('mobile')) {
						// strip linebreaks from the slide captions. they break the layout.
						$this.find('.slide-caption br').remove();
					}
					var $li = $(this).find('li').not('.cycle-sentinel').eq(0);
					showHomeCaption($li);
				}).cycle({
					log: false, // to write events to console.log, comment this line or set to true
					fx: cycle_fx,
					speed:  cycle_speed,
					timeout: cycle_timeout,
					pager:  '#pager',
					pagerTemplate: '<a>&bull;</a>',
					pagerActiveClass: 'activeSlide',
					slides: 'li',
					swipe: true // for mobile devices. requires swipe plugin
				}).on('cycle-before', function (event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
				    //test to see if we are on the homepage or not...if on not on homepage (e.g. www.mandarinoriental.com) 
                    //check mobile first
				    //then we dont' show the pager-caption on carousel
				    if (!$('body').hasClass('mobile')) {
				        if (window.location.pathname.split('/').length == 2 || $('body').hasClass('residences')) {
				            //cguy: removal of following line, was making items double call showHomeCaption
				            showHomeCaption($(incomingSlideEl));
				        } else {
				            $('#pager-caption').hide();
				        }
				    } else {
				        //cguy: removal of following line, was making items double call showHomeCaption
				        showHomeCaption($(incomingSlideEl));
				    }

				});
				if ($this.hasClass('mobile')) {
					// make the shadow carousel trigger the visible carousel.
					// make any events in the visible carousel trigger the shadow carousel.
					var triggered = false; // prevent a feedback loop.
					var $slidewrappers = $('.phantom-home-carousel,#home-carousel');
					$('#home-carousel,.phantom-home-carousel').on('cycle-before', function(e,h,outslide,inslide,ff) {
						if (triggered) { return; } // prevent a feedback loop.
						triggered = true;
						if ($(this).hasClass('phantom-home-carousel')) {
							var dir = (ff) ? 'next' : 'prev';
							$carousel.cycle(dir);
						} else {
							var i = $(inslide).index() - 1;
							$('.phantom-home-carousel').cycle('goto',i);
						}
						triggered = false;
					});
				}
			} else {
				var $li = $carousel.find('li').not('.cycle-sentinel').eq(0);
				if ($('body').hasClass('mobile')) {
					// strip linebreaks from the slide captions. they break the layout.
					$this.find('.slide-caption br').remove();
				}
				showHomeCaption($li);
			}
		}

		/* for new gallery */
		if($this.find('ul.gallery-filters li').length > 0)
		{
			$this.find('ul.gallery-filters > li > input').change(function(e){
				if($(this).val() == "*") {
					$('ul.image-gallery > li:not(.detail-view').show();
				} else {
					$('ul.image-gallery > li:not(.detail-view').show();
					$('ul.image-gallery > li:not(.' +$(this).val()+')').hide();
				}
				$(".image-gallery-loader").hide();
			});
		}
		
		/*
		$this.find('ul.gallery-filters li:not(.hotel-gallery-selector)').click(function () {
			galleryLoading();
		});
		*/

		$this.find('.hotel-gallery-selector select').change(function() {
			galleryLoading();
			window.location.search = "?loc=" + $(this).val();
			
		});

		function galleryLoading() {
			currentGalleryDetail = null;
			$(".image-gallery-loader").show();
		}

		if($this.find('ul.image-gallery li').length > 1) {
			var numPerRow = 3;
			//for mobile, we need to divide by 2 instead
			if($this.find('ul.image-gallery.mobile').length > 0) {
			    numPerRow = 2;
			    if (!$('html').hasClass("rtl")) {
			    	$('ul.image-gallery > li:not(.detail-view):odd').css('margin-right', '0');
			   	} else {
			   		$('ul.image-gallery > li:not(.detail-view):odd').css('margin-left', '0');
			   	}
			}

			// set up the document to manage keyboard events
			//    and restrict key event behaviors to when...
			//    ...user attention is on the gallery
			$(document).bind('keyup',function(e){galleryKeyboardNav(e);});
			$this.find('ul.image-gallery img,ul.image-gallery span,.gallery-navigation').click(function(){
				$('.image-gallery').addClass('has-keyboard-focus');
			});
			$this.find('header *,footer *').click(function(){
				$this.find('.image-gallery').removeClass('has-keyboard-focus').unbind('focus').children('img').unbind('focus');
			});
			$this.find('input,textarea,button,#side-contents a,header a,footer a').focus(function(){
				$this.find('.image-gallery').removeClass('has-keyboard-focus').unbind('focus').children('img').unbind('focus');
			});
			// add arrow interaction:
			// traversing rows retains position in column
			// navigating beyond the first or last item (l/r keys) or first or last row (u/d keys) exits the gallery
			function galleryKeyboardNav(event) {
				if (!$('.image-gallery').hasClass('has-keyboard-focus')) {
					return;
				}
				var activeDetailItemCount = $this.find('ul.image-gallery>li.detail-view>ul>li').length;
				var rowCount = $this.find('ul.image-gallery>li.detail-view').length;
				// is there an existing active item?
				var activeDetailRow = [];
				var newActiveDetailRow = [];
				var activeDetailItemRel = 0;
				var newActiveDetailItemRel = 0;
				var arrowPress = false;
				if ($this.find('ul.image-gallery>li.detail-view>ul>li:visible')) {
					activeDetailItemRel = parseInt($this.find('ul.image-gallery>li.detail-view>ul>li:visible').attr('rel'));
				}
				if (activeDetailItemRel && $this.find('ul.image-gallery>li.detail-view').hasClass('active')) {
					activeDetailRow = $this.find('ul.image-gallery>li.detail-view.active');
					switch (event.which) {
						case (27): // esc key
							// for those used to esc as a default quit/close.
							arrowPress = true;
							// exit the gallery
							break;
						case (37): // left arrow
							arrowPress = true;
							if (activeDetailItemRel==1) {
								// exit the gallery
							} else if (activeDetailItemRel>=2) {
								// previous image
								newActiveDetailItemRel = activeDetailItemRel - 1;
							}
							break;
						case (38): // up arrow
							arrowPress = true;
							if (Math.ceil(activeDetailItemRel/3)==1) {
								// exit the gallery
							} else if (Math.ceil(activeDetailItemRel/3)>=2) {
								// previous row
								newActiveDetailItemRel = activeDetailItemRel - 3;
							}
							break;
						case (39): // right arrow
							arrowPress = true;
							// next gallery item
							var nADIR = activeDetailItemRel + 1;
							if ($this.find('ul.image-gallery>li.detail-view>ul>li[value="'+nADIR+'"]')) {
								newActiveDetailItemRel = nADIR;
							} else {
								// gotcha! available row != complete row.
								// exit the gallery
							}
							break;
						case (40): // down arrow
							arrowPress = true;
							// next gallery row
							var nADIR = activeDetailItemRel + 3;
							if ($this.find('ul.image-gallery>li.detail-view>ul>li[value="'+nADIR+'"]')) {
								newActiveDetailItemRel = nADIR;
							} else {
								// gotcha! available row != complete row.
								// exit the gallery
							}
							break;
					}
					if (arrowPress) {
						currentGalleryDetail = $this.find('.image-gallery li a[rel='+newActiveDetailItemRel+']');
						galleryGoTo($this.find('ul.image-gallery'),activeDetailRow,activeDetailItemRel,newActiveDetailItemRel, numPerRow);
					}
				}
			};
			$this.find('ul.gallery-navigation>li>a').each(function(i){
				$(this).attr('rel',(i+1));
			});
			$this.find('ul.gallery-navigation>li>a').click(function (e) {
				e.preventDefault;
				$this.find('.image-gallery li a[rel='+$(this).attr('rel')+']').click().focus();
			});
		    //below is for new style mobile galleries
		    var lightboxStyleGalleryCarousel = null,
                overlayTimeout = null;
			if ($('.lightbox-type-gallery #hotel-gallery-overlay-items ul').length > 0) {
			    lightboxStyleGalleryCarousel = $('.lightbox-type-gallery #hotel-gallery-overlay-items ul');
			}
		    //set scale for when we are in landscape view of 
            //lightbox image gallery
			function setScale() {
			    if ($('.image-gallery-overlay:visible').length > 0 && !(navigator.userAgent.match(/(iPhone|iPod|iPad)/i))) {
			        switch (window.orientation) {
			            case -90:
			            case 90:
			                $('meta[name=viewport]').attr('content', 'width=device-width,initial-scale=0.5');
			                break;
			            default:
			                $('meta[name=viewport]').attr('content', 'width=device-width');
			                break;
			        }
			    }
			}
            //gallery on click action
			$this.find('ul.image-gallery > li > a').click(function (e) {
			    //if lightbox style we go to the element of the carousel
			    if (lightboxStyleGalleryCarousel != null) {
			        $('.image-gallery-overlay').show();
			        $('nav, header').css('z-index', '0');
			        $('#hotel-gallery-overlay-items').show();
			        var relIndex = $(this).attr('rel');
			        //-1 below because zero index on goto
			        lightboxStyleGalleryCarousel.cycle('goto', parseInt(relIndex) - 1);
			        overlayTimeout = setTimeout(function () { hideLightboxOverlay(); }, 3000);
                    //set scale if we are in landscape
			        setScale();
			    } else {
			        currentGalleryDetail = $(this);
			        e.preventDefault();
			        $("ul.image-gallery > li > a").removeClass("active");
			        var relIndex = $(this).attr('rel');
			        var detailedView = $this.find('ul.image-gallery li.detail-view-' + Math.ceil(relIndex / numPerRow));
			        hideShowDetailed($this.find('ul.image-gallery'), detailedView, relIndex, null, numPerRow);
			    }
				return false;
			});
		    
		    //if we have the lightboxstylegallery 
		    //setup the carousel for it
		    //this includes the onclick actions for the next/prev
			var isSwipeEvent = false,
                overlayIsVisible = true,
                overlayTimeoutTime = 2000;
			    
			if (lightboxStyleGalleryCarousel != null) {
			    //detect orientation to change scale
			    //in landscape go to half
			    $(window).on("orientationchange", function (event) {
			        setScale();
			    });
			    //call set scale initially
			    setScale();
			    //new style gallery carousel setup	
			    lightboxStyleGalleryCarousel.cycle({
			        log: false, // to write events to console.log, comment this line or set to true
			        fx: 'scrollHorz',
			        speed: 750,
			        paused: true,
			        timeout: 750,
			        next: '.cycle-next',
			        prev: '.cycle-prev',
			        slides: '> li'
			    }).on('cycle-after', function (event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
			        //here we will setup event to fade out navigation if we are not coming from swipe event
			        if (!isSwipeEvent || overlayIsVisible) {
			            clearTimeout(overlayTimeout);
			            overlayTimeout = setTimeout(function () { hideLightboxOverlay(); }, overlayTimeoutTime);
			        } else {
			            clearTimeout(overlayTimeout);
			        }
                    //now we are done knowing if swipe event put to false
			        isSwipeEvent = false;
                    //show title after
			        lightboxStyleGalleryCarousel.find('.img-title').fadeIn('fast');
                    //only show arrows if they are supposed to be visisble
			        if (overlayIsVisible) {
			            //shows arrows for after
			            $('.wrap-cycle-prev, .wrap-cycle-next').show();
			        }
			        //show lower information
			        lightboxStyleGalleryCarousel.find('.detail-wrap').show();
			        //show close button
			        lightboxStyleGalleryCarousel.find('.close').show();

			    }).on('cycle-before', function (event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
			        //fade out image title
			        lightboxStyleGalleryCarousel.find('.img-title').fadeOut('fast');
			        //hide arrows till after
			        $('.wrap-cycle-prev, .wrap-cycle-next').hide();
                    //hide lower information
			        lightboxStyleGalleryCarousel.find('.detail-wrap').hide();
			        //hide close button
			        lightboxStyleGalleryCarousel.find('.close').hide();
			    });
			    //function to show the next/prev link
			    //show the close button and show other
                //text over the image
			    function showLightboxOverlay() {
			        clearTimeout(overlayTimeout);
			        $('.bottom-gradient, .upper-gradient, .wrap-cycle-prev, .wrap-cycle-next').fadeIn('fast', function () {
			            overlayIsVisible = true;
			        });
			    }
			    //function to hide the next/prev link
			    //show the close button and show other
			    //text over the image
			    function hideLightboxOverlay() {
			        clearTimeout(overlayTimeout);
			        $('.bottom-gradient, .upper-gradient, .wrap-cycle-prev, .wrap-cycle-next').fadeOut('fast', function () {
			            overlayIsVisible = false;
			        });
			    }
			    lightboxStyleGalleryCarousel.find('.share-this-wrap .share').on('click', function (event) {
			        event.stopPropagation();
			        clearTimeout(overlayTimeout);
			    });
			    /*
                * determin where hotspots are or are not if we listen to tap 
                * don't want to do stuff if parents is addshare and so on
                */
			    function showHideLightboxOverlay(target) {
			        if ($(target).parents('.addShare, .wrap-cycle-prev, .wrap-cycle-next, .close-wrap, .action-wrap').length == 0) {
			            if (!overlayIsVisible) {
			                showLightboxOverlay();
			            } else {
			                hideLightboxOverlay();
			            }
			        }
			    }
			    //Enable swiping for lightboxstyle gallery
			    //taps make the overlay appear
			    //swipe goes left or right
                //set var isSwipeEvent so we can tell the cycle after event to do stuff
			    $(lightboxStyleGalleryCarousel).swipe({
			        tap: function (event, target) {
			            showHideLightboxOverlay(target);
			        },
			        doubleTap: function (event, target) {
			            showHideLightboxOverlay(target);
			        },
			        longTap: function (event, target) {
			            showHideLightboxOverlay(target);
			        },
			        swipe: function (event, direction, distance, duration, fingerCount) {
			            if (direction == 'left') {
			                isSwipeEvent = true;
			                lightboxStyleGalleryCarousel.cycle('next');
			            }
			            if (direction == 'right') {
			                isSwipeEvent = true;
			                lightboxStyleGalleryCarousel.cycle('prev');
			            }
			        },
			        threshold: 100
			    });
			    //close button in lightboxgallery
			    lightboxStyleGalleryCarousel.find('.close').click(function (event) {
			        event.stopImmediatePropagation();                    
			        $('.image-gallery-overlay').fadeOut('fast');
			        $('nav').css('z-index', '4');
			        $('header').css('z-index', '3');
			        $('#hotel-gallery-overlay-items').fadeOut('fast');
			        showLightboxOverlay();
			        clearTimeout(overlayTimeout);
			        //reset the viewport
			        if (!(navigator.userAgent.match(/(iPhone|iPod|iPad)/i))) {
			            $('meta[name=viewport]').attr('content', 'width=device-width');
			        }
			    });
			    /* ios zoom fixer */
			    /* https://github.com/scottjehl/iOS-Orientationchange-Fix */
			    if ((navigator.userAgent.match(/(iPhone|iPod|iPad)/i))) {
			        /*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/(function (a) { function m() { d.setAttribute("content", g), h = !0 } function n() { d.setAttribute("content", f), h = !1 } function o(b) { l = b.accelerationIncludingGravity, i = Math.abs(l.x), j = Math.abs(l.y), k = Math.abs(l.z), (!a.orientation || a.orientation === 180) && (i > 7 || (k > 6 && j < 8 || k < 8 && j > 6) && i > 5) ? h && n() : h || m() } var b = navigator.userAgent; if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(b) && b.indexOf("AppleWebKit") > -1)) return; var c = a.document; if (!c.querySelector) return; var d = c.querySelector("meta[name=viewport]"), e = d && d.getAttribute("content"), f = e + ",maximum-scale=1", g = e + ",maximum-scale=10", h = !0, i, j, k, l; if (!d) return; a.addEventListener("orientationchange", m, !1), a.addEventListener("devicemotion", o, !1) })(this);
			    }
			}
		    

			if(currentGalleryDetail != null) {
				galleryInstantAnimate = true;
				currentGalleryDetail.click();
			}

			$this.find('ul.image-gallery > li > a').hover(
				function(e){ $(this).addClass('hover'); },
				function(e){ $(this).removeClass('hover'); }
			);
            //handle click of next/prev and close of gallery
			$('ul.image-gallery .detail-view > .action-wrap a, .mobile .image-gallery-content #hotel-gallery.image-gallery .action-wrap a').click(function (e) {
				e.preventDefault();

				var activeDetailItemCount = $this.find('ul.image-gallery>li.detail-view>ul>li').length;
				var detailedView = $(this).closest('.detail-view');
				var relIndex = parseInt(detailedView.find('ul > li:visible').attr('rel'));
				var gallery = $this.find('ul.image-gallery');
				var newIndex;

				if ($(this).hasClass('prev'))
				{
					newIndex = relIndex - 1;
				} else {
					newIndex = relIndex + 1;
				}

				if(newIndex < 1 || newIndex > activeDetailItemCount || $(this).hasClass("close"))
				{
					resetGallery($(this).parents(".image-gallery"));
					return false;
				}
				currentGalleryDetail = $this.find('.image-gallery li a[rel='+newIndex+']');

				galleryGoTo(gallery, detailedView, relIndex, newIndex, numPerRow);
				return false;
			});

			$this.find('ul.image-gallery .detail-view .img-view-wrap').hover(
				function(e){ $(this).closest('div').addClass('hover'); },
				function(e){ $(this).closest('div').removeClass('hover'); }
			);
			
		}

		//MOHGS-281
		if($this.find(".image-gallery").length > 0 && window.location.hash != "") {

			if(s.prop2 == "english")
			{
				$(".thumb-" + window.location.hash.replace("#", "")).click();
			}
			else if(s.prop2 == "spanish")
			{
				$(".thumb-" + window.location.hash.replace("#17", "328")).click();
			}
			else if(s.prop2 == "german")
			{
				$(".thumb-" + window.location.hash.replace("#17", "334")).click();
			}
			else if(s.prop2 == "french")
			{
				$(".thumb-" + window.location.hash.replace("#17", "330")).click();
			}
			else if(s.prop2 == "traditional chinese")
			{
				$(".thumb-" + window.location.hash.replace("#17", "332")).click();
			}
			else if(s.prop2 == "simplified chinese")
			{
				$(".thumb-" + window.location.hash.replace("#17", "331")).click();
			}
			else if(s.prop2 == "japanese")
			{
				$(".thumb-" + window.location.hash.replace("#17", "329")).click();
			}
		}

		if($this.find('ul#rooms-suites-list li').length > 2)
		{
			adjustRoomCards($this.find('ul#rooms-suites-list'));
		}

		//Uniform activator
		if ($('body.mobile').length<1) {
			// limit uniform.js to styling SELECT elements on desktop
		    // this is because we can get what we need using CSS on mobile.
		    $this.find('.fieldset select, .callout-inner select, select, .fieldset input[type=radio], .fieldset input[type=checkbox]').uniform();
		}

		//Create Multivalue list functionality
		$this.find('.multivalue-select').each(function() {
			var multivalList = null;
			if($(this).parents(".form-wrap").children(".multivalue-select-list").length == 0) {
				$(this).parents(".form-wrap").append("<ul class=\"multivalue-select-list\"></ul>");
			}

			multivalList = $(this).parents(".form-wrap").children(".multivalue-select-list");

			if($(this).parents(".form-wrap").children("input[type=hidden]").length > 0) {
				var selectedHotelsString = $(this).parents(".form-wrap").children("input[type=hidden]").val();
				var selectedHotels = selectedHotelsString.split("|");
				for(var i in selectedHotels) {
					if(selectedHotels[i] != "") {
						var selectedHotelInDropdown = $(this).children("option[value='" + selectedHotels[i] + "']");
						if(selectedHotelInDropdown) {
							addMultivalueSelection($(this), multivalList, selectedHotelInDropdown);
							buildMultivalueFieldValue($(this));
						}
					}
				}
			}

			$(this).change(function() {
				var hotelSelect = $(this);
				var selectedHotel = hotelSelect.children("option:selected:first");
				if(selectedHotel.val() != "") {
					addMultivalueSelection(hotelSelect, multivalList, selectedHotel);
					buildMultivalueFieldValue(hotelSelect);
					hotelSelect.children("option:first").prop("selected",true);
					hotelSelect.siblings("span").html(" -- Select -- ");
				}
			});
		});

		function addMultivalueSelection(select, list, selectedOption) {
			var newHotel = list.append("<li><span class=\"remove\"></span><span class=\"text\">" + selectedOption.text() + "</span><span class=\"value\">" + selectedOption.val() + "</span></li>");
			list.children(":last").find(".remove").click(function() {
				var hotelName = $(this).siblings(".text").html();
				var hotelValue = $(this).siblings(".value").html();
				select.append("<option value=\"" + hotelValue + "\">" + hotelName + "</option>");
				$(this).parent().remove();
				reorderMultivalueSelectOptions(select);
				buildMultivalueFieldValue(select);
			});
			selectedOption.remove();
		}

		function reorderMultivalueSelectOptions(select) {
			var options = select.children("option");
			var selectOptions = [];
			var orderedOptions = [];
			options.each(function() {
				selectOptions.push({"name" : $(this).text(), "value" : $(this).val()});
				orderedOptions.push($(this).text());
			});

			orderedOptions.sort();

			select.children("option").remove();

			for(var i in orderedOptions) {
				for(var j in selectOptions) {
					if(selectOptions[j].name == orderedOptions[i]) {
						select.append("<option value=\"" + selectOptions[j].value + "\">" + selectOptions[j].name + "</option>");
						break;
					}
				}
			}
		}

		function buildMultivalueFieldValue(select) {
			var selectedValues = select.parents(".form-wrap").find(".multivalue-select-list:first").children("li");
			var hiddenInput = select.parents(".form-wrap").children("input[type=hidden]");
			var optionValues = [];
			selectedValues.each(function() {
				optionValues.push($(this).find(".value").html());
			});

			hiddenInput.val(optionValues.join("|"));
		}
	    //setup error message logic for nav-login
		$this.find('.nav-login .email').blur(function (e) {
		    var me = $(this);
		    if (me.val().length > 0) {
		        if (!emailRegex.test(me.val())) {
		            //fail
		            me.parent().find('.error_message').show();
		        } else {
		            //pass
		            me.parent().find('.error_message').hide();
		        }
		    } else {
		        //pass
		        me.parent().find('.error_message').hide();
		    }
		});
		//Toggle for footer sitemaplink
		$this.find('#footer a.sitemap').attr('title',$this.find('#footer a.sitemap span').text()).bind('click.togglesitemap',
			function(e){
				e.preventDefault();
				var $sitemap = $('#footer nav.sitemap');
				var $thislink = $(this);
				var $thistitle = $thislink.find('span');
				var title = $thislink.attr('title');

                // MOWEB-1315 Translate: Show/Hide - initialize variable from system component
                var ShowSiteMapLabel = LookupError("ctFooter_ShowLocalSiteMap", "Show Sitemap");
                var HideSiteMapLabel = LookupError("ctFooter_HideLocalSiteMap", "Hide Sitemap");
				var fnGetTitle = (function(){return ($sitemap.is(':hidden') ? ShowSiteMapLabel : HideSiteMapLabel)});
				if ($sitemap.length > 0) {  /* make sure the element exists */
					if ($(this).hasClass('init')) { /* don't animate on first run */
						$sitemap.slideToggle(800, function(){
							$thistitle.text(fnGetTitle);
							$thislink.toggleClass('active');
						});
						$('html, body').animate({scrollTop: $sitemap.offset().top}, 800);
					}
					else { /* flag that this has run */
						$thistitle.text(fnGetTitle);
						$thislink.addClass('init');
					}
				}
				else { /* safety: hide this link if element doesn't exist */
					$thislink.hide();
				}
			}).trigger('click.togglesitemap');

		//Toggle for special codes
		$this.find('a.specialcodes').attr('title',$this.find('a.specialcodes span').text()).bind('click.togglespecialcodes',
			function(e){
				e.preventDefault();
				var $specialcodes = $('#codes');
				var $thislink = $(this);
				var $thistitle = $thislink.find('span');
				var title = $thislink.attr('title');
				if ($specialcodes.length > 0) {  /* make sure the element exists */
					if ($(this).hasClass('init')) { /* don't animate on first run */
						$specialcodes.slideToggle(800, function(){
							$thislink.toggleClass('active');
						});
						//$('html, body').animate({scrollTop: $specialcodes.offset().top}, 800);
					}
					else { /* flag that this has run */
						$thislink.addClass('init');
					}
				}
				else { /* safety: hide this link if element doesn't exist */
					$thislink.hide();
				}
			}).trigger('click.togglespecialcodes');

	//Toggle for search slide
		$this.find('#search a.slide').bind('mouseover.togglesearch',
			function(e){
				e.preventDefault();
				var $search = $('#search #slide-search');
				var $thislink = $(this);

				if ($search.length > 0) {  /* make sure the element exists */
					if (!$(this).hasClass('open')) { /* only run if not open */
						var setRight = parseInt($("#header").width()) - parseInt($thislink.position().left) - 2;
						$search.css("right", setRight + "px");
						$search.animate({
							width: 'toggle'
						});
						$('#search').addClass('active');
						$thislink.addClass('open');
						$('input.focus').focus();
					}
				}
				else { /* safety: hide this link if element doesn't exist */
					$thislink.hide();
				}
			}
		);

		$this.find('#search a.slide').bind('click.togglesearch',
			function(e){
				e.preventDefault();
				var $search = $('#search #slide-search');
				var $thislink = $(this);

				if ($search.length > 0) {  /* make sure the element exists */
					if ($(this).hasClass('open')) { /* only function if open */
						$search.animate({
							width: 'toggle'
						});
						$('#search').removeClass('active');
						$thislink.removeClass('open'); /* set to closed */
						$thislink.blur();
					}
				}
				else { /* safety: hide this link if element doesn't exist */
					$thislink.hide();
				}
			}
		);

		$this.find(".img-view-wrap .close").click(function() {
			resetGallery($(this).parents(".image-gallery"));
		});

		function resetGallery(gallery) {
			gallery.find(".detail-view.active").slideUp(400, function() {
				addRemoveActive(gallery.find('> li a[class="active"]'),true);
				gallery.removeClass('opaque');

				$(this).find('ul > li').hide();
				if ($('.mobile #hotel-gallery').length > 0) {
				    //debugger;
				    $('.image-gallery-overlay').hide();
				    $('nav').css('z-index', '4');
				    $('header').css('z-index', '3');
				}
			});
		}

		$(".right-two-col-container").each(function() {
			if($(this).children().length == 0) {
				$(this).remove();
			}
		});

		//Add RIGHT to three-col groupings
		$threeCol = $this.find('section:has(.three-col)').not('.residences section.section-row');

		var sectionCount = 0;
		var insideRightTwoColCont = false;
		
		for (var i=0; i <= $threeCol.length-1; i++) {

			// $($threeCol[i]).find('.three-col').addClass('right');
			if($threeCol.eq(i).parent(".right-two-col-container").length > 0) {
				insideRightTwoColCont = true;
			}
			else {
				if(insideRightTwoColCont == true) {
					insideRightTwoColCont = false;
					sectionCount = sectionCount + 2;
				}
				if(sectionCount % 3 == 0) {
					$threeCol.eq(i).find('.module.three-col').addClass('clear-section');
				}
				else if(sectionCount % 3 == 2) {
					$threeCol.eq(i).find('.module.three-col').addClass('right');
				}
				//console.log(sectionCount);
				sectionCount++;
			}
		};

		//Add RIGHT to three-col groupings with col-1 being text and col 2 and 3 being in a single container
		$threeColInContainer = $this.find('.right-two-col-container section:has(.three-col)');

		for (var i=1; i <= $threeColInContainer.length-1; i=i+2) {
			// $($threeCol[i]).find('.three-col').addClass('right');
			$threeColInContainer.eq(i).find('.module.three-col').addClass('right');
		};

		$this.find('.module.three-col').each(function() {
			var adjacentRightTwoCol = $(this).parent().next();
			if(adjacentRightTwoCol.length > 0 && adjacentRightTwoCol.hasClass("right-two-col-container")) {
				$(this).removeClass("module");
				$(this).addClass("module-tall");
			}
		});

		//Normalize Module Height
		$this.normalizeHeight('.module', '.clear .single-col .right-rail');

		$this.find('.module-tall').each(function() {
			var adjacentRightTwoCol = $(this).parent().next();
			if(adjacentRightTwoCol.length > 0 && adjacentRightTwoCol.hasClass("right-two-col-container")) {
				var thisHeight = $(this).outerHeight();
				var rightTwoColHeight = adjacentRightTwoCol.outerHeight();
				var marginBottom = parseInt($(this).css("margin-bottom").replace("px",""));
				if(thisHeight < rightTwoColHeight) {

					$(this).height(rightTwoColHeight - marginBottom);
				}
				else if(thisHeight > rightTwoColHeight) {
					var firstChild = adjacentRightTwoCol.find(".module.three-col:first");
					var colGroup = "";
					if(firstChild.length > 0) {
						$(firstChild.attr("class").split(" ")).each(function() {
							if (this.match(/js-colgroup-/)){
								colGroup = this;
							}
						});
					}
					//alert($("." + colGroup).height());
					$("." + colGroup).css("min-height", $("." + colGroup).height() + (thisHeight - rightTwoColHeight) + marginBottom);
				}
			}
		});


		// Restaurants Gallery
		$this.find(".restaurants-gallery").initGallery();
		$this.find(".restaurants-splash").initSlidingMenu();

		// Contact Us Accordions
		$this.find(".contact-us").initAccordion();
		$this.find(".contact-us .contact-filters").initFilters();


		//Pre-IE 8 PNG support
		$this.find('#main').supersleight({shim: 'static/images/bg/x.gif', apply_positioning: true});
		$this.find('header').children().each(function(){$(this).supersleight({shim: 'static/images/bg/x.gif', apply_positioning: true});});


		// PNG Image Swaps
		/*
		var infoLoc = ".ie6 #info #logo a img";
		var infoUrl = "static/images/logo-vegas.gif";
		var splashLoc = ".ie6 .restaurants-splash .logo";
		var splashUrl = "static/images/logo-twist.gif";
		*/

		// Load PNG Image Swaps into Arry
		/*
		swapPics = new Array(
			[infoLoc,infoUrl],
			[splashLoc,splashUrl]
		);
		*/

		// Run PNG Image Swaps function
		/*
		ie6ImgSwap(swapPics);
		*/

		// #Matt jQuery functions for swapping images
		//$(".ie6 #info #logo a img").imgSwap("static/images/logo-vegas.gif");
		/*
		$(".ie6 .restaurants-splash .logo").imgSwap("static/images/logo-twist.gif");
		*/

        // MOWEB-1314 Translate: "Enter" - initialize variable from system component, then use this variable throughout this script
        var DefaultErrorLabel = LookupError("defaultErrorMessageLabel", "Enter");


		// Currency Converter

		function currencyConverter() {

			// data handling
			$this.find('[name="fromCurrencyTextField"]').numeric({negative : false});
			$this.find('[name="toCurrencyTextField"]').numeric({negative : false});

			generateCurrencyDropdown();

			// Insert and remove the "Enter Amount" text in the text field.
			$this.find('[name="fromCurrencyTextField"]').focus(function() {
				if ($this.find('[name="fromCurrencyTextField"]').attr('value') == DefaultErrorLabel + " amount") {
					$this.find('[name="fromCurrencyTextField"]').attr('value',"");
				}
			}).blur(function() {
				if ($this.find('[name="fromCurrencyTextField"]').attr('value') == "") {
					$this.find('[name="fromCurrencyTextField"]').attr('value', DefaultErrorLabel + " amount");
				}
			});

			//calculate a new number total on keyup
			$this.find('[name="fromCurrencyTextField"]').keyup(function(event) {
					calcNewConversion();
			});
			$this.find('[name="toCurrencyTextField"]').keyup(function(event) {
					calcNewConversion('rtol'); //right to left
			});


			//calculate a new number when a new currency is selected
			$this.find('[name="fromCurrency"]').change( function() {
				calcNewConversion();
			});
			$this.find('[name="toCurrency"]').change( function() {
				calcNewConversion();
			});
		}

		if($this.find('.cconverter').length > 0) { currencyConverter(); }


        // select box eyebrow navigation

        function eyebrowNavigation() {
            // bind our action to whenever the dropdown is changed
            $('#select-nav-dropdown').change(function() {
                // only change the url of the window if we are selecting an option different than the default
                if ( $('#select-nav-dropdown').val() != "" ) {
                    window.location = $('#select-nav-dropdown').val();
                }
            });

        }
        if ($this.find('.select-nav').length > 0) { eyebrowNavigation(); }

	    // new (2014) Share This popup menu.
        //shows the popup menu
        $('.share-this-wrap .share').on('click', function (e) {
			e.preventDefault();
			$('.share-this-wrap.active').removeClass('active');
			var $d = $('#page-wrap, #page-wrap div, .share-this-wrap .share-this a');
            //unbind events for close, as it doesn't need to be clicked sometimes
			$d.unbind('click');
			$(this).closest('.share-this-wrap').find('.share-this').fadeIn(500, function () {
				$(this).closest('.share-this-wrap').addClass('active');
				$d.on('click.shareThisCloser', function (e) {
					e.preventDefault();
					e.stopPropagation();
					if ($(this).hasClass('share-this')) {
						// ensure that misclicks on nonlink parts of the ShareThis box...
						// ...(eg, the 'CONNECT' and 'SHARE' titles)...
						// ...do not close the box.
						return;
					}
					$d.off('click.shareThisCloser');
					$('.share-this').fadeOut(500,function() {
						$('.share-this-wrap.active').removeClass('active');
					});
				});
			});
		});

		$this.find('.modal-link').click(function() {
			var matchingWindow = $(this).siblings('.modal-window');
			// MMSP-57 $.browser is removed.
			// if($.browser.msie) {
			if ($('html').hasClass('oldie')) {
				// var browserVersion = $.browser.version
				matchingWindow.addClass($('html').attr('class').replace(/.*\b(ie\d).*/,'$1'));
			}

			if(!matchingWindow.is(':visible')) {
				var modalLeft = $(this).position().left - matchingWindow.outerWidth();
				var modalTop = $(this).position().top;
				matchingWindow.css("left", modalLeft + "px").css("top", modalTop + "px").show();
			}
			else {
				matchingWindow.hide();
			}
		});

		$this.find('.modal-window-close').click(function() {
			$(this).parent('.modal-window').hide();
		});

		$this.find('.relatedContent').each(function() {
			$(this).parents(".module").addClass("relatedImg");
		});

		$this.find('a.expand').click(function() {
			if(!$(this).hasClass("open")) {
				$(this).addClass("open");
			}
			else {
				$(this).removeClass("open");
			}
			$(this).siblings('.expand_content').slideToggle();
		});

		$this.find('.my-profile .profile-block-views .radio').click(function() {
			currentOpenProfileBlock = $(this).attr("id");
			$(".error_message").remove();
			var inputId = $(this).find("input").attr("id").replace("bv-", "");
			if(inputId == "all") {
				if(profileInstantAnimate) {
					$(".my-profile .block .wrap").show();
				}
				else {
					$(".my-profile .block .wrap").slideDown();
				}
			}
			else {
				$(".my-profile .block").each(function() {
					if($(this).attr("id") == inputId) {
						if(profileInstantAnimate) {
							$(this).find(".wrap").show();
						}
						else {
							$(this).find(".wrap").slideDown();
						}
					}
					else {
						if(profileInstantAnimate) {
							$(this).find(".wrap").hide();
						}
						else {
							$(this).find(".wrap").slideUp();
						}
					}
				});
			}

			profileInstantAnimate = false;
		});

		$this.find('.my-profile .block .header').hover(function() {
			$(this).find("h3").addClass("hover");
		},
		function() {
			$(this).find("h3").removeClass("hover");
		});

		$this.find('.my-profile .block .header').click(function()
		{
			inputId = $(this).parent().attr("id");
            // MOHGS-339 : Save currently open profile block for future postback (e.g. country dropdown autopostback) : Patrick D'Souza : 4/8/2013
            currentOpenProfileBlock = "uniform-bv-" + inputId;
            // MOHGS-339 : End
			$(".error_message").remove();
			$('.my-profile .profile-block-views .radio span.checked').removeClass("checked");
			$("#uniform-bv-" + inputId + " span").addClass("checked");

			$(".my-profile .block").each(function()
			{
				if($(this).attr("id") == inputId) {
					if(profileInstantAnimate) {
						$(this).find(".wrap").show();
					}
					else {
						$(this).find(".wrap").slideDown();
					}
				}
				else {
					if(profileInstantAnimate) {
						$(this).find(".wrap").hide();
					}
					else {
						$(this).find(".wrap").slideUp();
					}
				}
			});
		});

		$this.find('.my-profile .block .all-regions').click(function() {
			var checkboxInput = null;
			if($(this).attr("type") != "") {
				checkboxInput = $(this).find("input[type='checkbox']:first");
			}
			else if($(this).find("input[type='checkbox']").length > 0) {
				checkboxInput = $(this);
			}
			if(checkboxInput.is(":checked")) {
				checkboxInput.parents(".checkboxes:first").find("input[type='checkbox']").each(function() {
					if($(this).attr("id") != checkboxInput.attr("id")) {
						$(this).prop("checked", true);
						$(this).parent("span").addClass("checked");
					}
				});
			}
			else {
				checkboxInput.parents(".checkboxes:first").find("input[type='checkbox']").each(function() {
					if($(this).attr("id") != checkboxInput.attr("id")) {
						$(this).prop("checked", false);
						$(this).parent("span").removeClass("checked");
					}
				});
			}
		});

		if(currentOpenProfileBlock != null) {
			profileInstantAnimate = true;
			$('.my-profile .profile-block-views .radio span.checked').removeClass("checked");
			$("#" + currentOpenProfileBlock + " span").addClass("checked");
			$("#" + currentOpenProfileBlock).click();
		}
		else
		{
			$this.find('.my-profile .profile-block-views .radio span.checked').parent(".radio").click();
		}
        //cguy removing enter button submit...it isn't working as we want is becoming a problem
		$(".login-module input").keyup(function(event) {
			if (event.which == 13) {
				var submitButton = $(this).parents(".login-module:first").find(".module-footer .loader-button");
				submitButton.click();
				eval(submitButton.attr("href").replace("javascript:",""));
			}
		});

        // MOWEB-776 MOPRO Validation : BEGIN : Patrick D'Souza (6/20/2012)


        // On blur method to give user instant validation when they tab from a input field that is immediately followed by an element with a ".req-field" css class
        // Extract the label from the corresponding input label, lookup the error xml and present a validation message to the user if the input fails validation
        // Includes special handling for email and password fields to validate against a regular expression
		var isLoginModule = (($('.login-module').not('.newsletter .login-module').length > 0 || $('.resetPassword').length > 0) ? true : false);
		var isRequired = [];
        $this.find('.req-field').prev('input').blur(function(e) {
				    var reqField = $(this).next('.req-field');
                    var this_section = $(this).parents('section:first');
				    var blankFields = [];
                    var numErrors = 0;
					var labelId = $(this).attr("id");
					isRequired[labelId] = true;
					if($(this).val() == "") {
					    var label = $(this).parent().siblings(".label-wrap").find("label[for=" + labelId + "]");
					    if (typeof $(this).attr('data-validationkey') != "undefined" && $(this).attr('data-validationkey').length > 0) {
					        blankFields.push($(this).attr('data-validationkey'));
					    } else if(label.length > 0) {
							blankFields.push(label.html().replace(":", ""));
						}
                    }

					//console.log(numErrors);
				    if(blankFields.length > 0) {
						reqField.removeClass("error");
						$("#em_" + labelId).remove();
					    numErrors += blankFields.length;
					    reqField.addClass("error");
						reqField.show();
                        var keyfield = blankFields.join(", ");
                        var key = keyfield + ':Required';
                        var msg = LookupError(key, DefaultErrorLabel + " " + keyfield);
                        DisplayError($(this), msg);
				    }
				    else {
				        if (isLoginModule || this_section.parents('header').length > 0) {
							$(this).parent(".form-wrap").find(".error_message").remove();
						}
					    reqField.removeClass("error");
						$("#em_" + labelId).remove();
				    }

			    if(numErrors > 0) {
				    e.preventDefault();
			    }
            });

        // validation for English-only (single-byte) fields
        $this.find('.single-byte').blur(function(e) {
                    var this_section = $(this).parents('section:first');
                    var numErrors = 0;
					var labelId = $(this).attr("id");
			        if($(this).val() != "") {
                        var this_section = $(this).parents('section');
                        var reg = /^[\x20-\x7F]+$/; // only allow ascii characters x20-x7f
				        var field = $(this).val();
				        if (reg.test(field) == false) {
							var reqField = $(this).next('.req-field');
							reqField.removeClass("error");
							$("#em_" + labelId).remove();
					        numErrors = numErrors + 1;
                            reqField.addClass("error");
                            $(this).show();
                            var msg = LookupError("EnglishOnlyError", "English characters only");
                            DisplayError($(this), msg);
				        }
                    }
					else {
						// this is if the field is also required to not be blank.
						if(isRequired[labelId] == true) {
							numErrors = numErrors + 1;
						}
					}

			        if(numErrors > 0) {
				        e.preventDefault();
			        } else {
                        $(this).removeClass("error");
						$("#em_" + labelId).remove();
                    }
            });

        // MOWEB-981 on blur method for radio button lists : Patrick D'Souza : 7/24/2012
        $this.find('.req-field').prev().find('input:radio').bind('blur change', function (e) {
            var reqField = $(this).parents('.form-wrap').next('.req-field');
            var this_section = $(this).parents('section:first');
            var blankFields = [];
            var numErrors = 0;
            var labelId = $(this).attr("id");
            var IsChecked = false;
            reqField.prev().find('input:radio').each(function() {
                        if ($(this).is(':checked')) IsChecked = true;
            });


            if (!IsChecked) {
                var label = $(this).parents('.form-wrap').find(".RadioButtonErrorLabel").val();
                if (typeof $(this).attr('data-validationkey') != "undefined" && $(this).attr('data-validationkey').length > 0) {
                    blankFields.push($(this).attr('data-validationkey'));
                } else if (label.length > 0) {
                    blankFields.push(label);
                }
            }

            if (blankFields.length > 0) {
                numErrors += blankFields.length;
                reqField.addClass("error");
                reqField.show();
                var keyfield = blankFields.join(", ");
                var key = keyfield + ':Required';
                var msg = LookupError(key, DefaultErrorLabel + " " + keyfield);
                DisplayError($(this), msg);
            }

            if (numErrors > 0) {
                e.preventDefault();
            } else {
                if (reqField) {
                    reqField.removeClass("error");
                }
                $("#em_" + labelId).remove();
            }
        });
        // End: MOWEB-981


        // MOWEB-1017 on blur method for drop down lists : Patrick D'Souza : 7/20/2012
        $this.find('.req-field').prev().find('select').bind('blur change', function (e) {
            var reqField = $(this).parent().next('.req-field');
            var this_section = $(this).parents('section:first');
            var blankFields = [];
            var numErrors = 0;
            var labelId = $(this).attr("id");
            var defaultvalue = $(this).siblings().find('input[id$=DefaultValue]').val();
            if (!defaultvalue) defaultvalue = ''; // if undefined, set it to empty string
            if ($(this).val() == defaultvalue) {
                var label = $(this).parents('.sub-block').find(".label-wrap").find("label[for=" + labelId + "]");
                if (typeof $(this).attr('data-validationkey') != "undefined" && $(this).attr('data-validationkey').length > 0) {
                    blankFields.push($(this).attr('data-validationkey'));
                } else if (label.length > 0) {
                    blankFields.push(label.html().replace(":", ""));
                }
            }

            if (blankFields.length > 0) {
                numErrors += blankFields.length;
                reqField.addClass("error");
                reqField.show();
                var keyfield = blankFields.join(", ");
                var key = keyfield + ':Required';
                var msg = LookupError(key, DefaultErrorLabel + " " + keyfield);
                DisplayError($(this), msg);
            }

            if (numErrors > 0) {
                e.preventDefault();
            } else {
                if (reqField) {
                    reqField.removeClass("error");
                }
                $("#em_" + labelId).remove();
            }
        });

        // on blur method for middle initial
        $(this).find('input[id$=MiddleInitial]').blur(function(e) {
            var numErrors = 0;
			if($(this).val() != "") {
				var reg = /^[A-Za-z]$/;
				var midInitial = $(this).val();
				if (reg.test(midInitial) == false) {
					numErrors = numErrors + 1;
                    var msg = LookupError("MiddleInitialError", "Middle Initial must be one alpha character.");
                    DisplayError($(this), msg);
				}
			    if(numErrors > 0) {
				    e.preventDefault();
			    } else {
					$("#em_" + labelId).remove();
                }
            }
        });

            // on blur method for email fields
            $(this).find('input[id$=Email]').blur(function(e) {
                var numErrors = 0;
				var labelId = $(this).attr("id");
			    if($(this).val() != "")
				{
					$(this).val($(this).val().replace(/ /g, "")); //trim whitespace
                    var this_section = $(this).parents('section');
                    var reg = emailRegex;
				    var address = $(this).val();
				    if (reg.test(address) == false) {
					    numErrors = numErrors + 1;
					    var reqField = $(this).next(".req-field");
					    if (reqField) {
							reqField.addClass("error");
							reqField.show();
						}
                        var msg = LookupError("EmailFormattingError", "Please enter a valid Email Address.");
                        DisplayError($(this), msg);
				    }

			        if(numErrors > 0) {
				        e.preventDefault();
			        } else {
					    var reqField = $(this).next(".req-field");
					    if (reqField) {
                            reqField.removeClass("error");
                        }
						$("#em_" + labelId).remove();
                    }
                }
            });

            // on blur method for phone area codes and numbers
            $(this).find('input[id$=PhoneAreaCode], input[id$=PhoneNumber]').blur(function(e) {
                var numErrors = 0;
				var labelId = $(this).attr("id");
			    if($(this).val() != "") {
                    var this_section = $(this).parents('section');


					if(this.id.indexOf("AreaCode") >= 0) {
						var reg = /^([0-9\-\.]|N\/A)+$/;
					}
					else {
						// MOHGS-944
						var reg = /^.+$/; // /^[0-9\-\.]+$/;
					}

				    var areaCode = $(this).val();
				    if (reg.test(areaCode) == false) {
					    numErrors = numErrors + 1;
					    var reqField = $(this).next(".req-field");
					    if (reqField) {
							reqField.addClass("error");
							reqField.show();
						}
                        var msg = LookupError("PhoneFormattingError", "Please enter a valid phone number.");
                        DisplayError($(this), msg);
				    }
			        if(numErrors > 0) {
				        e.preventDefault();
			        } else {
					    var reqField = $(this).next(".req-field");
					    if (reqField) {
                            reqField.removeClass("error");
                        }
						$("#em_" + labelId).remove();
                    }
                }
            });

			$(this).find(".phoneCtryCode").change(function(e)
			{
				var labelId = $(this).attr("id");
				if($(this).val() != "")
				{
					$("#em_" + labelId).remove();
				}
			});

            // on blur method for password fields
            $(this).find('input[id$=Password]').blur(function(e) {
                // wait a second, is this the confirmation?
                if ($(this).attr('id').match(/ConfirmPassword$/))
                {
                    var p2 = $(this).parents('section').find('input[id$=txtPassword]')
                    VerifyPasswords($(this), p2);
                    return;
                }

               // wait a second, is this the retyped password?
                if ($(this).attr('id').match(/RetypePassword$/))
                {
                    var p2 = $(this).parents('section').find('input[id$=txtNewPassword]');
                    VerifyPasswords($(this), p2);
                    return;
                }

                var numErrors = 0;
			    if($(this).val() != "") {
                    var this_section = $(this).parents('section');
					// MOHGS-846
					if(document.URL.toString().toLowerCase().indexOf("fan-club-log-in") >=0 )
					{
						var reg = /^.+$/;
					}
					else
					{
						var reg = passwordRegex;
					}
					// End MOHGS-343
					var pwd = $(this).val();
					var reqField = $(this).next(".req-field");
					if (reg.test(pwd) == false) {
					    numErrors = numErrors + 1;
					    if (reqField) {
							reqField.addClass("error");
							reqField.show();
						}
                        var msg = LookupError("FailedPasswordRequirements", "Please ensure password meets requirements: 8 characters, alphanumeric");
                        DisplayError($(this), msg);
				    } else {
					    if (isLoginModule || this_section.parents('header').length > 0) {
							$(this).parent(".form-wrap").find(".error_message").remove();
						}
					    reqField.removeClass("error");
						$("#em_pass_reqs").remove();
				    }
			    }
			    if(numErrors > 0) {
				    e.preventDefault();
			    }
            });

			// ********* MOHGS-265 Brian Flaherty 01/31/2013 *********
			// This is not the only spot where code was added for this ticket.
			// Each other location will have a comment with the ticket number above it.

			var condReq = false;

			$(this).find("#optional-information .sub-block.home-address-block input[type=text]").blur(function(e)
			{
				checkFieldsForValue($("#optional-information .sub-block.home-address-block:first input[type=text], #optional-information .sub-block.home-address-block:first select[id$='ddlSecCountry'], #optional-information .sub-block.home-address-block:first select[id$='ddlSecState']"));

				condReq = true;
			});

			$("#optional-information .form-wrap.radio-buttons").change(function()
			{
				checkFieldsForValue($("#optional-information .sub-block.home-address-block:first input[type=text], #optional-information .sub-block.home-address-block:first select[id$='ddlSecCountry'], #optional-information .sub-block.home-address-block:first select[id$='ddlSecState']"));

				condReq = true;
			});

			// ******* End MOHGS-265 ***********

			if(document.URL.toString().indexOf("edit-profile") > 0)
			{
				var CountryDropList = $(".fieldset.personal-details .form-wrap-sub.select-long .selector select").val();
			}
			else
			{
				var CountryDropList = "EMPTY";
			}

			//Phone number conditional validation
			//For preferred/additional phone, if country code, area code, or number are entered, all 3 become required
			$(this).find(".home-phone-block input[type=text]").blur(function(e)
			{
				if((CountryDropList.indexOf("HK") >= 0)||(CountryDropList.indexOf("SG") >= 0))
				{
					$(".home-phone-block .short-input").val("N/A");
					checkFieldsForValue($(".home-phone-block .phoneCtryCode,.home-phone-block .medium-input"));
				}
				else
				{
					checkFieldsForValue($(".home-phone-block .phoneCtryCode,.home-phone-block input[type=text]"));
				}
			});

			$(this).find(".home-phone-block .phoneCtryCode").change(function(e)
			{
				if((CountryDropList.indexOf("HK") >= 0)||(CountryDropList.indexOf("SG") >= 0))
				{
					$(".home-phone-block .short-input").val("N/A");
					checkFieldsForValue($(".home-phone-block .phoneCtryCode,.home-phone-block .medium-input"));
				}
				else
				{
					checkFieldsForValue($(".home-phone-block .phoneCtryCode,.home-phone-block input[type=text]"));
				}
			});

// MOHGS-340
/*			$(this).find(".additional-phone-block input[type=text]").blur(function(e)
			{
				if((CountryDropList.indexOf("HK") >= 0)||(CountryDropList.indexOf("SG") >= 0))
				{
					$(".additional-phone-block .short-input").val("N/A");
					checkFieldsForValue($(".additional-phone-block .phoneCtryCode,.additional-phone-block .medium-input"));
				}
				else
				{
					checkFieldsForValue($(".additional-phone-block .phoneCtryCode,.additional-phone-block input[type=text]"));
				}
			});

			$(this).find(".additionalphone-block .phoneCtryCode").change(function(e)
			{
				if((CountryDropList.indexOf("HK") >= 0)||(CountryDropList.indexOf("SG") >= 0))
				{
					$(".additional-phone-block .short-input").val("N/A");
					checkFieldsForValue($(".additional-phone-block .phoneCtryCode,.additional-phone-block .medium-input"));
				}
				else
				{
					checkFieldsForValue($(".additional-phone-block .phoneCtryCode,.additional-phone-block input[type=text]"));
				}
			});
*/
			// ********* MOHGS-265 Brian Flaherty 02/06/2013 *********
			// This function has had a lot added for the ticket.
			function checkFieldsForValue(fields)
			{
				var fieldFilled = false;
				var radioBtnChecked = false;
				var errors = 0;

				if ($("#optional-information [id$='rbResidentialSecondary']").is(":checked")) {
					fieldFilled = true;
					radioBtnChecked = true;
				}
				if ($("#optional-information [id$='rbBusinessSecondary']").is(":checked")) {
					fieldFilled = true;
					radioBtnChecked = true;
				}

				fields.each(function()
				{
					if($.trim($(this).val()) != "")
					{
						// ********* MOHGS-265 Brian Flaherty 01/31/2013 *********
						if ( !(($(this).attr("id").indexOf("txtSecAddress2") >= 0) || ($(this).attr("id").indexOf("txtSecAddress3") >= 0)) )
						{
							fieldFilled = true;
						}
					}
				});
				if(fieldFilled)
				{
					if ( (!$("#optional-information [id$='rbResidentialSecondary']").is(":checked")) && (!$("#optional-information [id$='rbBusinessSecondary']").is(":checked")) ) {

						var secAddHasVal = false;

						$("#optional-information .sub-block.home-address-block:first input[type=text], #optional-information .sub-block.home-address-block:first select[id$='ddlSecCountry'], #optional-information .sub-block.home-address-block:first select[id$='ddlSecState']").each(function()
						{
							if(($(this).val() != null) && ($(this).val() != ""))
							{
								secAddHasVal = true;
							}
						});

						if(secAddHasVal)
						{
							var radioBtnMsg = LookupError("SecAddRadioBtn", "Type of address must be selected");
							DisplayError($("#optional-information [id$='rbResidentialSecondary']"), radioBtnMsg);
							errors = errors + 1;
						}
					}
					else
					{
						$(".right-rail.my-profile-right .error_messages .error_message.radioBtnErrMsg").remove();
						//errors = errors - 1;
					}

					if ($("#optional-information select[id$='ddlSecState']").val() != "")
					{
						$(".right-rail.my-profile-right .error_messages [id$='ddlSecState'].error_message").remove();
						//errors = errors - 1;
					}

					fields.each(function()
					{
						if($.trim($(this).val()) == "")
						{
							// ********* MOHGS-265 Brian Flaherty 01/31/2013 *********
							var msgErr = GetValErrMsg($(this).attr("id"));

							if ( !(($(this).attr("id").indexOf("txtSecAddress2") >= 0) || ($(this).attr("id").indexOf("txtSecAddress3") >= 0)) )
							{
								DisplayError($(this), msgErr);
								errors = errors + 1;
							}
						}
					});
				}
				return errors;
			}

			// ********* MOHGS-265 Brian Flaherty 01/31/2013 *********
			function GetValErrMsg(elem)
			{
				var message = LookupError("SecAddDefault", "Please fill in required fields");

				if(elem.indexOf("phone") >= 0)
				{
					message = LookupError("PhoneFields", "All phone fields must be filled");
				}
				if(elem.indexOf("txtSecAddress1") >= 0)
				{
					message = LookupError("SecAddLine", "Address line must be filled");
				}
				if(elem.indexOf("ddlSecCountry") >= 0)
				{
					message = LookupError("SecAddCountry", "Country must be selected");
				}
				if(elem.indexOf("txtSecCity") >= 0)
				{
					message = LookupError("SecAddCity", "City must be filled");
				}
				if(elem.indexOf("ddlSecState") >= 0)
				{
					message = LookupError("SecAddState", "State must be selected");
				}
				if(elem.indexOf("txtSecZip") >= 0)
				{
					message = LookupError("SecAddZip", "Postal Code must be filled");
				}

				return message;
			}

            function DisplayError(elem, msg) {
                if (isLoginModule || elem.parents('section:first').parents('header').length > 0 || elem.parents('section:first').find('.newsletter .nav-login.signup-module').length > 0 || elem.parents('section:first').parents('.newsletter-unsubscribe').length > 0) {
						elem.parent(".form-wrap").find(".error_message").remove();
						elem.parent(".form-wrap").append('<div class="error_message">' + msg + '</div>');
						elem.parent(".form-wrap").find(".error_message").show();
					}
					else {
                        var labelId = elem.attr("id");
                        var this_section = elem.parents('section:first');
						if($("#em_" + labelId).length == 0) {
                            if ($(this_section).find('.module.my-profile').length > 0) {
                                // insert the message in the DOM below the form element that's thrown the error.
						        elem.closest(".fieldset").append('<div id="em_' + labelId + '" class="error_message" style="top:' + elem.parent().position().top + 'px;">' + msg  + '</div>');
                            } else {
				if (labelId.indexOf('fanclub') > 0) {
					var mrgn=0;
					var dispErr = true;
					if(labelId.indexOf('ddlTitle') > 0 || labelId.indexOf('ddlGuestTitle') > 0) {
						mrgn=4;
						var otherId=labelId.replace('ddlTitle', 'txtFirstName');
						otherId=labelId.replace('ddlGuestTitle', 'txtGuestFirstName');
						msg="Enter Title / First Name";
					        var otherLbl = $(this_section).find(".error_messages").find("#em_" + otherId);
						if(otherLbl.length>0) {dispErr=false;}
					}
					if(labelId.indexOf('txtFirstName') > 0 || labelId.indexOf('txtGuestFirstName') > 0) {
						var otherId=labelId.replace('txtFirstName', 'ddlTitle');
						otherId=labelId.replace('txtGuestFirstName', 'ddlGuestTitle');
						msg="Enter Title / First Name";
					        var otherLbl = $(this_section).find(".error_messages").find("#em_" + otherId);
						if(otherLbl.length>0) {dispErr=false;}
					}
					if(dispErr) {
						$(this_section).find(".error_messages").append('<div id="em_' + labelId + '" class="error_message" style="top:' + (elem.parent().position().top + mrgn) + 'px;"><ul><li> ' + msg  + '</li></ul></div>');
					}
				} else {
					// ********* MOHGS-265 Brian Flaherty 01/31/2013 *********
					if(elem.attr("id").indexOf("txtSecZip")>=0)
					{
						var spacing = elem.parent().position().top + 30;
						$(this_section).find(".error_messages").append('<div id="em_' + labelId + '" class="error_message" style="top:' + spacing + 'px;"><ul><li> ' + msg  + '</li></ul></div>');
					}
					else if(elem.attr("id").indexOf("rbResidentialSecondary")>=0)
					{
						$(this_section).find(".error_messages").append('<div id="em_' + labelId + '" class="error_message radioBtnErrMsg" style="top:' + elem.parent().position().top + 'px;"><ul><li> ' + msg  + '</li></ul></div>');
					}
					else if((elem.attr("id").indexOf("brpSubmission")>=0) && (elem.attr("id").indexOf("ddlTitle")>=0))
					{
						var spacing = elem.parent().position().top - 20;
						$(this_section).find(".error_messages").append('<div id="em_' + labelId + '" class="error_message" style="top:' + spacing + 'px;"><ul><li> ' + msg  + '</li></ul></div>');
					}
					else
					{
						$(this_section).find(".error_messages").append('<div id="em_' + labelId + '" class="error_message" style="top:' + elem.parent().position().top + 'px;"><ul><li> ' + msg  + '</li></ul></div>');
					}
				}
							}
            			}
					}
            }

            function VerifyPasswords(p1, p2) {
				var reqField = p2.next(".req-field");
				if (p1.val() != p2.val()) {
                    var msg = LookupError("FailedPasswordConfirmation", "Passwords must match exactly!");
                    var this_section = p2.parents('section');

					if (reqField) {
						reqField.addClass("error");
						reqField.show();
					}
                    DisplayError(p2, msg);

				} else {
				    if(isLoginModule || p2.parents('section:first').parents('header').length > 0) {
						p2.parent(".form-wrap").find(".error_message").remove();
					}
					reqField.removeClass("error");
                    var labelId = p2.attr("id");
    				$("#em_" + labelId).remove();
				}
            }

        // attach "loader-button" class for all tags with .primary or .button class - this will be used for displaying ajax loader images for long running actions
            $this.find(".primary, .button").not('.newsletter .nav-login .alt.button').addClass("loader-button");

        // Rewrote Jim's original handler slightly to allow multiple error_message div's on page (e.g. Sign In use case)
        // Attaching the click handler to loader-button, which is programmatically attached to all tags with '.primary' or '.button' (see above)
        // Enhanced handler to display ajax loader image if validations are successful
        $this.find('.loader-button').click(function (e) {
				//show all sections so error messages get written correctly
				$(".my-profile .block .wrap").show();
				$('.my-profile .profile-block-views .radio span.checked').removeClass("checked");
				$('#uniform-bv-all span').addClass("checked");

				var isLoginModule = (($('.login-module').not('.newsletter .login-module').length > 0 || $('.resetPassword').length > 0) ? true : false);
                var this_section = $(this).parents('section:first');
			    $(this_section).find(".error_message").remove();
			    var numErrors = 0;
                // find required fields within this section (grandparent)

			    $(this_section).find(".req-field").each(function() {
					var labelIdToUse = null;
				    var reqField = $(this);
				    var blankFields = [];
                    reqField.prev('input').each(function() {
                        if($(this).val() == "") {
                            var labelId = $(this).attr("id");
							labelIdToUse = labelId;
							var label = $(this).parent().siblings(".label-wrap").find("label[for=" + labelId + "]");
							if (typeof $(this).attr('data-validationkey') != "undefined" && $(this).attr('data-validationkey').length > 0) {
							    blankFields.push($(this).attr('data-validationkey'));
							}else if(label.length > 0) {
							    blankFields.push(label.html().replace(":", ""));
						    } else if ($(this).attr('placeholder').length > 0) {
						        blankFields.push($(this).attr('placeholder').replace(":", ""));
						    } else {
							    switch(labelId) {
							        case "home-address-city":
								        blankFields.push("City");
								        break;
								    case "home-address-zip":
							            blankFields.push("Postal Code");
								        break;
								    default:
									    blankFields.push("this field");
									    break;
							    }
						    }
                        }
				    });

                    // MOWEB-1017 validate requred drop down lists : Patrick D'Souza : 7/20/2012
                    reqField.prev().find('select').each(function() {
                        if($(this).val() == "") {
                            var labelId = $(this).attr("id");
							labelIdToUse = labelId;
							var label = $(this_section).find("label[for=" + labelId + "]");
							if (typeof $(this).attr('data-validationkey') != "undefined" && $(this).attr('data-validationkey').length > 0) {
							    blankFields.push($(this).attr('data-validationkey'));
							} else if(label.length > 0) {
							    blankFields.push(label.html().replace(":", ""));
						    } else {
								blankFields.push("this field");
                            }
                        }
				    });

                    // MOWEB-981 valid required rado button lists : Patrick D'Souza : 7/24/2012
                    reqField.prev().find('input:radio:first').each(function() {
                        var NextReqField = $(this).parents('.form-wrap').next('.req-field');
                        var IsChecked = false;
                        NextReqField.prev().find('input:radio').each(function() {
                            if ($(this).is(':checked')) IsChecked = true;
                        });

                        if (!IsChecked) {
                            var labelId = $(this).attr("id");
							labelIdToUse = labelId;
							var label = $(this).parents('.form-wrap').find(".RadioButtonErrorLabel").val();
							if (typeof $(this).attr('data-validationkey') != "undefined" && $(this).attr('data-validationkey').length > 0) {
							    blankFields.push($(this).attr('data-validationkey'));
							} else if (label.length > 0) {
                                blankFields.push(label);
                            }
                        }
				    });
                    // End: MOWEB-981

                    if (blankFields.length > 0) {
					    numErrors += blankFields.length;
					    reqField.addClass("error");
						reqField.show();
                        var keyfield = blankFields.join(", ");
                        var key = keyfield + ':Required';
                        var msg = LookupError(key, DefaultErrorLabel + " " + keyfield);

                        // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                        var elem = document.getElementById(labelIdToUse);
                        if (elem) {
                           DisplayError($(elem), msg);
                        }
                        // End: Reuse DisplayError() function for consistent error messaging
//						if(isLoginModule) {
//							$(this).parent(".form-wrap").find(".error_message").remove();
//							$(this).parent(".form-wrap").append('<div class="error_message">' + msg  + '</div>');
//						}
//						else {
//							if($("#em_" + labelIdToUse).length == 0) {
//								$(this_section).find(".error_messages").append('<div id="em_' + labelIdToUse + '" class="error_message" style="top:' + reqField.prev().position().top + 'px;"><ul><li> ' + msg  + '</li></ul></div>');
//							}
//						}
                        // End: Reuse DisplayError() function for consistent error messaging
				    }
				    else {
						if(isLoginModule) {
							$(this).parent(".form-wrap").find(".error_message").remove();
						}
					    reqField.removeClass("error");
						$("#em_" + labelIdToUse).remove();
				    }
			    });

                // validation for English-only (single-byte) fields
                $(this_section).find(".single-byte").each(function() {
			        if($(this).val() != "") {
                        var reg = /^[\x20-\x7F]+$/; // only allow ascii characters x20-x7f
				        var field = $(this).val();
				        if (reg.test(field) == false) {
					        numErrors = numErrors + 1;
                            var msg = LookupError("EnglishOnlyError", "English characters only");
                            DisplayError($(this), msg);
				        }
                    }
                });

                // validation for middle initial
                $(this_section).find('input[id$=MiddleInitial]').each(function() {
			        if($(this).val() != "") {
				        var reg = /^[A-Za-z]$/;
				        var midInitial = $(this).val();
				        if (reg.test(midInitial) == false) {
					        numErrors = numErrors + 1;
                            var msg = LookupError("MiddleInitialError", "Middle Initial must be one alpha character.");
                            // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                            DisplayError($(this), msg);
                            // End: Reuse DisplayError() function for consistent error messaging
                            //$(this_section).find(".error_messages").append('<div class="error_message" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
				        }
                    }
                });

			    $(this_section).find("input[id$=Email]").each(function() {
				    if($(this).val() != "") {
						$(this).val($(this).val().replace(/ /g, "")); //trim whitespace
					    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					    var address = $(this).val();
					    if(reg.test(address) == false) {
						    numErrors = numErrors + 1;
						    var reqField = $(this).next(".req-field");
						    reqField.addClass("error");
							reqField.show();
                            var msg = LookupError("EmailFormattingError", "Please enter a valid Email Address");
                            // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                            DisplayError($(this), msg);
                            // End: Reuse DisplayError() function for consistent error messaging
						    //$(this_section).find(".error_messages").append('<div class="error_message" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
					    }
				    }
			    });

                $(this_section).find('input[id$=PhoneAreaCode], input[id$=PhoneNumber]').each(function() {
			        if($(this).val() != "") {



						if(this.id.indexOf("AreaCode") >= 0) {
							var reg = /^([0-9\-\.]|N\/A)+$/;
						}
						else {
							// MOHGS-944
							var reg = /^.+$/; // /^[0-9\-\.]+$/;
						}

				        var areaCode = $(this).val();
				        if (reg.test(areaCode) == false) {
					        numErrors = numErrors + 1;
					        var reqField = $(this).next(".req-field");
					        if (reqField) {
							    reqField.addClass("error");
							    reqField.show();
						    }
                            var msg = LookupError("PhoneFormattingError", "Please enter a valid phone number.");
                            // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                            DisplayError($(this), msg);
                            // End: Reuse DisplayError() function for consistent error messaging
                            //$(this_section).find(".error_messages").append('<div class="error_message" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
				        }
                    }
                });

			    $(this_section).find("input[id$=Password]").each(function() {
                    // wait a second, is this the confirmation?
                    if ($(this).attr('id').match(/ConfirmPassword$/))
                    {
                           var p2 = $(this).parents('section').find('input[id$=txtPassword]');
						   var reqField = p2.next(".req-field");
                           if ($(this).val() != p2.val()) {
    						    numErrors = numErrors + 1;
								if (reqField) {
									reqField.addClass("error");
									reqField.show();
								}
                                var msg = LookupError("FailedPasswordConfirmation", "Passwords must match exactly!");
                                // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                                DisplayError($(this), msg);
                                // End: Reuse DisplayError() function for consistent error messaging
//                                var this_section = p2.parents('section');
//
//					            if(isLoginModule) {
//									$(this).parent(".form-wrap").find(".error_message").remove();
//									$(this).parent(".form-wrap").append('<div class="error_message">' + msg  + '</div>');
//								}
//								else {
//									if($(".em_pass_match").length == 0) {
//										$(this_section).find(".error_messages").append('<div "class="error_message em_pass_match" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
//									}
//								}
                           } else {
								if(isLoginModule) {
									$(this).parent(".form-wrap").find(".error_message").remove();
								}
								reqField.removeClass("error");
								$(".em_pass_match").remove();
						   }
                    }
                    // wait a second, is this the retyped password?
                    else if ($(this).attr('id').match(/RetypePassword$/))
                    {
                           var p2 = $(this).parents('section').find('input[id$=txtNewPassword]');
						   var reqField = p2.next(".req-field");
                           if ($(this).val() != p2.val()) {
								if (reqField) {
									reqField.addClass("error");
									reqField.show();
								}
    						    numErrors = numErrors + 1;
                                var msg = LookupError("FailedPasswordConfirmation", "Passwords must match exactly!");
                                // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                                DisplayError($(this), msg);
                                // End: Reuse DisplayError() function for consistent error messaging
//                                var this_section = p2.parents('section');
//
//					            if(isLoginModule) {
//									$(this).parent(".form-wrap").find(".error_message").remove();
//									$(this).parent(".form-wrap").append('<div class="error_message">' + msg  + '</div>');
//								}
//								else {
//									if($(".em_pass_match").length == 0) {
//										$(this_section).find(".error_messages").append('<div "class="error_message em_pass_match" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
//									}
//								}
                           } else {
								if(isLoginModule) {
									$(this).parent(".form-wrap").find(".error_message").remove();
								}
								reqField.removeClass("error");
								$(".em_pass_match").remove();
						   }
                    }
			        else if ($(this).val() != "") {
                        var this_section = $(this).parents('section');
						// MOHGS-846
						if(document.URL.toString().toLowerCase().indexOf("fan-club-log-in") >=0 )
						{
							var reg = /^.+$/;
						}
						else
						{
							var reg = /^([A-Za-z])([A-Za-z0-9]{7,11})$/;
						}
						// End MOHGS-343
					    var pwd = $(this).val();
					    var reqField = $(this).next(".req-field");
					    if (reg.test(pwd) == false) {
					        numErrors = numErrors + 1;
					        if (reqField) {
								reqField.addClass("error");
								reqField.show();
							}
                            var msg = LookupError("FailedPasswordRequirements", "Please ensure password meets requirements: 8 characters, alphanumeric");
                            // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                            DisplayError($(this), msg);
                            // End: Reuse DisplayError() function for consistent error messaging
//							if(isLoginModule) {
//								$(this).parent(".form-wrap").find(".error_message").remove();
//								$(this).parent(".form-wrap").append('<div class="error_message">' + msg  + '</div>');
//							}
//							else {
//								if($("#em_pass_reqs").length == 0) {
//									$(this_section).find(".error_messages").append('<div id="em_pass_reqs" "class="error_message" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
//								}
//							}
				        } else {
							if(isLoginModule) {
								$(this).parent(".form-wrap").find(".error_message").remove();
							}
							reqField.removeClass("error");
							$("#em_pass_reqs").remove();
						}
			        }
			    });

                $(this_section).find("input[id$=chkAcceptTerms]").each(function() {
                    if (!$(this).is(':checked')) {
    				    numErrors = numErrors + 1;
                        var msg = LookupError("Terms_Not_Accepted", "Must be 'checked' to proceed with Registration");
                        // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                        DisplayError($(this), msg);
                        // End: Reuse DisplayError() function for consistent error messaging
//						if(isLoginModule) {
//							$(this).parents(".label-wrap:first").find(".error_message").remove();
//							$(this).parents(".label-wrap:first").append('<div class="error_message">' + msg  + '</div>');
//						}
//						else {
//							$(this_section).find(".error_messages").append('<div class="error_message" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
//						}
                    }
                });

                // MOWEB-1155 : Best Rate Promise checkboxes : Patrick D'Souza : 8/31/2012
                $(this_section).find("input[id$=chkIncludeWebsiteBRP]").each(function() {
                    if (!$(this).is(':checked')) {
    				    numErrors = numErrors + 1;
                        var msg = LookupError("BRP:WebsiteNotAccepted", "Must be 'checked' to process your claim");
                        // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                        DisplayError($(this), msg);
                        // End: Reuse DisplayError() function for consistent error messaging
//						if(isLoginModule) {
//							$(this).parents(".label-wrap:first").find(".error_message").remove();
//							$(this).parents(".label-wrap:first").append('<div class="error_message">' + msg  + '</div>');
//						}
//						else {
//							$(this_section).find(".error_messages").append('<div class="error_message" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
//						}
                    }
                });

                $(this_section).find("input[id$=chkAcceptTermsBRP]").each(function() {
                    if (!$(this).is(':checked')) {
    				    numErrors = numErrors + 1;
                        var msg = LookupError("BRP:TermsNotAccepted", "Must be 'checked' to process your claim");
                        // Reuse DisplayError() function for consistent error messaging : Patrick D'Souza (6/20/2012)
                        DisplayError($(this), msg);
                        // End: Reuse DisplayError() function for consistent error messaging
//						if(isLoginModule) {
//							$(this).parents(".label-wrap:first").find(".error_message").remove();
//							$(this).parents(".label-wrap:first").append('<div class="error_message">' + msg  + '</div>');
//						}
//						else {
//							$(this_section).find(".error_messages").append('<div class="error_message" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
//						}
                    }
                });
                // MOWEB-1155 : End

                $(this_section).find("input[id$=chkAcceptTermsGiveaway]").each(function() {
                    if (!$(this).is(':checked')) {
    				    numErrors = numErrors + 1;
                        var msg = LookupError("Giveaway:TermsNotAccepted", "Accept the Terms &amp; Conditions to proceed with submission");
                        DisplayError($(this), msg);
                    }
                });

                //check phone numbers
				if((CountryDropList.indexOf("HK") >= 0)||(CountryDropList.indexOf("SG") >= 0))
				{
					numErrors = numErrors + checkFieldsForValue($this.find(".home-phone-block .phoneCtryCode,.home-phone-block .medium-input"));
				}
				else
				{
					// ********* MOHGS-265 Brian Flaherty 02/06/2013 *********
					if(!condReq)
					{
						numErrors = numErrors + checkFieldsForValue($this.find(".home-phone-block .phoneCtryCode,.home-phone-block input[type=text]"));
					}
				}
// MOHGS-340
/*				if((CountryDropList.indexOf("HK") >= 0)||(CountryDropList.indexOf("SG") >= 0))
				{
					numErrors = numErrors + checkFieldsForValue($this.find(".additional-phone-block .phoneCtryCode,.additional-phone-block .medium-input"));
				}
				else
				{
					// ********* MOHGS-265 Brian Flaherty 02/06/2013 *********
					if(!condReq)
					{
						numErrors = numErrors + checkFieldsForValue($this.find(".additional-phone-block .phoneCtryCode,.additional-phone-block input[type=text]"));
					}
				}
*/

				// ********* MOHGS-265 Brian Flaherty 02/06/2013 *********
				//Check for secondary address required fields.
				if(condReq)
				{
					numErrors = numErrors + checkFieldsForValue($("#optional-information .sub-block.home-address-block:first input[type=text], #optional-information .sub-block.home-address-block:first select[id$='ddlSecCountry'], #optional-information .sub-block.home-address-block:first select[id$='ddlSecState']"));
				}

			    if(numErrors > 0) {
					e.preventDefault();

				    $(this_section).find(".req-field:first").show();
                    $(this).parents('div:first').find('.ajaxloader').remove(); // hide ajaxloaders, just in case

					element = $(".error_messages div:first")
					if(element.length > 0)
					{
						//get element with error
						var errElem = $("#" + $(element).attr("id").substr(3))[0];
						//focus on element and scroll page to it
						$(errElem).focus();
						$('html, body').stop().animate({ scrollTop: $(errElem).offset().top - 50 }, 0);
					}
			    }
			    else {
					if(isLoginModule) {
						$(this).parent(".form-wrap").find(".error_message").remove();
					}
				    $(this_section).find(".req-field").hide();
                    // MOWEB-877 Show visual feedback to user for long running actions: Patrick D'Souza (7/2/2012)
                    // hide any previous ajaxloaders, then show the ajaxloader
                    $(this).parents('div:first').find('.ajaxloader').remove();
                    $(this).parents('div:first').append(' <div class="ajaxloader"><img src="/static/images/ajax-loader.gif" alt="Please wait..." /></div>');
                    // MOWEB-877 Show visual feedback: END : Patrick D'Souza (7/2/2012)
               }
	    });

		$this.find('input[id$=btnCancel]').click(function(e) {
			var confirmCancel = confirm("Are you sure you want to cancel?");
			if(confirmCancel == true) {
				return;
			}
			else {
				e.preventDefault();
			}
		});

		$this.find('[id$=lbForgotPassword],[id$=lblLoginForgotPassword]').click(function (e) {
            var isLoginModule = (($(this).parents('.login-module')) ? true : false);
            var this_section = $(this).parents('section');
			$(this_section).find("input[id$=Email]").each(function() {
                var numErrors = 0;
				var reqField = $(this).next('.req-field');
                if($(this).val() == "") {
				    var blankFields = [];
                    var labelId = $(this).attr("id");
                    var label = $(this).parent().siblings(".label-wrap").find("label[for=" + labelId + "]");
                    if (typeof $(this).attr('data-validationkey') != "undefined" && $(this).attr('data-validationkey').length > 0) {
                        blankFields.push($(this).attr('data-validationkey'));
                    } else if(label.length > 0) {
					    blankFields.push(label.html().replace(":", ""));
				    } else if ($(this).attr('placeholder').length > 0) {
				        blankFields.push($(this).attr('placeholder').replace(":", ""));
				    }
				    if(blankFields.length > 0) {
					    numErrors += blankFields.length;
					    reqField.addClass("error");
						reqField.show();
                        var keyfield = blankFields.join(", ");
                        var key = keyfield + ':Required';
                        var msg = LookupError(key, DefaultErrorLabel + " " + keyfield);
						if(isLoginModule) {
							$(this).parent(".form-wrap").find(".error_message").remove();
							$(this).parent(".form-wrap").append('<div class="error_message">' + msg + '</div>');
							$(this).parent(".form-wrap").find(".error_message").show();
						}
						else {
							$(this_section).find(".error_messages").append('<div class="error_message" style="top:' + $(this).position().top + 'px;"><ul><li> ' + msg  + '</li></ul></div>');
						}
				    }
                }
                else {
					var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					$(this).val($(this).val().replace(/ /g, "")); //trim whitespace
					var address = $(this).val();
					if(reg.test(address) == false) {
						numErrors = numErrors + 1;
						reqField.addClass("error");
						reqField.show();
                        var msg = LookupError("EmailFormattingError", "Please enter a valid Email Address");
						if(isLoginModule) {
							$(this).parent(".form-wrap").find(".error_message").remove();
							$(this).parent(".form-wrap").append('<div class="error_message">' + msg + '</div>');
							$(this).parent(".form-wrap").find(".error_message").show();
						}
						else {
							$(this_section).find(".error_messages").append('<div class="error_message" style="top:' + $(this).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
						}
					}
				}

			    if(numErrors > 0) {
				    e.preventDefault();
			    }
			});
        });
        // MOWEB-776 MOPRO Validation : END : Patrick D'Souza (6/20/2012)

        // if the booking widget is on a global page, we need to validate the dropdown.
		if ( $('.room-availability .long-picker').length > 0 ) {
			var initclick=$('.room-availability .button').attr('onclick');
			$('.room-availability .button').attr('onclick',null);
			$('.room-availability .button').click(function() {
				if ($('.room-availability [name*="ddlHotels"]').val() == "" ) {
		                        var msg = LookupError("CheckAvailabilitySelectHotelError", "Please select a hotel.");
					alert(msg);
					return false;
				} else {
					eval(initclick.replace("javascript:","").replace("return false;",""));
					return false;
				}
			});

		}

		//clear search field on focus - set handlers
		$("#search input[type=text]").focus(clearText);
		$("#search input[type=text]").blur(clearText);

		// connect page
		$this.find('select[id$=ConnectSelect]').change(function() {
			var connectUrl = $(this).val();
			if(connectUrl != "/") {
				connectUrl += "/";
			}
			window.location.href = connectUrl + 'connect/';
		});

		// Press Kit page
		$this.find('select[id$=PressKitSelect]').change(function() {
			var pkUrl = $(this).val();
			window.location.href = '/media/press-kits' + pkUrl;
		});

	    //resets the AddThis stuff on page load / when AJAX reloads a portion of the page.
		if (window.addthis) {
			if(addThisInitialized == false) {
				addthis.init();
				addThisInitialized = true;
			}
			else {
				var script = window.location.protocol + '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4e80c55d6a278822';
				window.addthis = null;
				window._adr = null;window._atc = null;window._atd = null;window._ate = null;window._atr = null;window._atw = null;
				$("script[src*='addthis']").remove();

				/*
				gPlus = document.getElementById('gplus-button');
				if(gPlus != null) {
					gPlus.setAttribute('g:plusone:href', 'https://plus.google.com/104884118980642305721/');
				}
				gPlusOne = document.getElementById('google-plus-one');
				if(gPlusOne != null) {
					gPlusOne.setAttribute('g:plusone:size', 'medium');
					gPlusOne.setAttribute('g:plusone:count', 'false');
				}
				pinButton = document.getElementById('google-plus-one');
				if(pinButton != null) {
					pinButton.setAttribute('pi:pinit:media', 'http://YOUR-DOMAIN.com/IMAGE.jpg');
					pinButton.setAttribute('pi:pinit:layout', 'horizontal');
				}
				*/

				$.getScript( script );
			}
		}

		// MOHGS-593
		if(s.prop2 != null && (s.prop2 == "traditional chinese" || s.prop2 == "simplified chinese")) {
		    // Needed to reload the HK/CK characters
		    if (typeof MonoTypeWebFonts != "undefined") {
		        MonoTypeWebFonts.renderPartial('hotel-gallery');
		    }
			// Adding a timeout to delay hiding the loader image because it takes some time to re-load the HK/CN characters
			// occassionally the captions were empty temporariliy until the characters loaded.  The timeout should eliminate that problem
			setTimeout(function(){$(".image-gallery-loader").hide()},2500);
		} else {
			$(".image-gallery-loader").hide();
		}
		// Rewrite DOM node insertions to be specific and cut down on the DOMNode errors jQuery is generating. -- 20140411
		$('.room-availability').on('DOMNodeInserted','.ui-datepicker-trigger',function() {
			if ($('.ui-datepicker-trigger').length==2) {
				// rewrite of MOHGS-75
				// hotel room availability rail element (desktop)
				// hotel room availability page (mobile)
			    $(".ui-datepicker-trigger").each(function(index) {
			        $(this).addClass("picker" + index);
			    });
			}
			if (document.URL.indexOf("reserve-a-table") >= 0) {
				// rewrite of MOHGS-271
				// retaurant reservation page (desktop)
				$(".hasDatepicker").datepicker("setDate", $(".hasDatepicker").val());
			}
		});
		// the prev/next buttons are not used on mobile any more. the following is commented out but not needed.
//		$('#main-contents').on('DOMNodeInserted','.details-buttons',function(){
			// rewrite of MOHGS-121
// 			if ($("#main-contents .offers-nav").length > 0 && $(".details-buttons.details-button-only").hasClass('room-availability')) {
// 				$("#main-contents>.details-buttons:first").append($("#main-contents .offers-nav"));
// 				$(".details-buttons.details-button-only.room-availability").css("padding-bottom", "0");
// 			}
// 		});

		//MOHGS-945
		$("#info-list>li>a, #global-list>li>a").each(function() { 
			if(window.location.pathname == $(this).attr("href")) { 
				$(this).addClass("active"); 
			}
			//this is yucky, but special case the homepage
			else if(window.location.pathname == "/" && $(this).attr("href") == "/default.aspx") {
				$(this).addClass("active"); 
			}
		});
		
		$('.headernav > li > a').each(function () { 
			if($(this).attr('href').length > 1 && window.location.pathname.indexOf($(this).attr('href')) > -1) {
				$(this).addClass('alternate_color');
			}
		});
	}

	// temporary functions for .testvideo
	function centerVideo()
	{
		if($(".testvideo").length > 0) {
			var newVideoLeft = ($(".testvideo").width() / 2) - ($(".testvideo video").width() / 2);
			$(".testvideo video").css("left", newVideoLeft + "px");
		}
	}

	$(window).resize(function() {
		centerVideo();
	});

	$(document).ready(function() {
		centerVideo();

        // MOWEB-1049: Dining enquiry form
        $('a.DiningForm[rel^=]').each(function() {
                var href = $(this).attr('href');
                var rel = $(this).attr('rel');
                $(this).attr('href',href + rel);
        });

	});
	// BEGIN MOHGS-1003 Judson Abts change 140430
	// Fix for IE issue
	var isIE = function(){
		return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
	}
	//Fix for email Dialogs
	$("<style type='text/css'> .s7emaildialog{ z-index:111111!important;} .hideIEScrollbar{-ms-overflow-style:none}</style>").appendTo("head");
	var script = document.createElement('script');
	script.src = window.location.protocol+'//s7d9.scene7.com/s7viewers/html5/js/VideoViewer.js';
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
	var exmp;
	var flagfirstOpen=1;
	// Video open function
	window.openVideoZoom = function (playerUrl, videoSrc) {
		exmp=videoSrc;
		var last = exmp.split('/')[exmp.split('/').length-1];
		var assetID = "MandarinOriental/"+last.replace('.mp4','');
		if ("https:" == document.location.protocol) {
           playerUrl = playerUrl.replace("http:", "https:");
        }
		$("#image-zoom").css("top", $(window).scrollTop() + "px");
		if (navigator.appVersion.indexOf('MSIE 8')>-1) {
			$("#image-zoom").append('<div class="zoom_video_cont"><div id="zoom_video"></div></div>');
			$("#image-zoom").show();
			if (isMobile.any()) {
				window.location = videoSrc;
			} else {
				//Get time is for IE9 to load the player properly
				swfobject.embedSWF(playerUrl + "?t=" + new Date().getTime(), 'zoom_video', '640', '480', "9.0.0", false, {'videoURL': videoSrc, useFullScreen : "false",useShareButtons : "false",useInfoButton : "false",playerBackgroundColor : "47413a",playerBackgroundAlpha : "100",controlsColor : "c39122",controlsAlpha : "100",controlsSeparation : "15",use3Dstyle : "false",initialVol : "70",volBackgroundColor : "9c998e",volBarColor : "c39122",timelineDownloadColor : "c39122",timelineBackgroundColor : "9c998e",timelineBackgroundColor : "9c998e",timelineBackgroundAlpha : "100"});
			}
			var winHeight = $(window).height();
			var contHeight = $("#image-zoom .zoom_video_cont").height();
			var newTop = (winHeight / 2) - (contHeight / 2);
			$("#image-zoom .zoom_video_cont").css("margin-top", newTop + "px");
		} else {
			if (flagfirstOpen==1) {
				$("body").append('<div id="s7_videoview"></div>');
				var v_width=$(window).width()/2-320;
				var v_height=$(window).height()/2-240;
				var Style = {
					'position' : 'fixed',
					'top' : v_height,
					'z-index': '100001',
					'left':v_width
				};
				$('#s7_videoview').css(Style)
				$( window ).resize(function() {
					v_width=$(window).width()/2-320;
					v_height=$(window).height()/2-240;
					Style = {
						'position' : 'fixed',
						'top' : v_height,
						'z-index': '100001',
						'left':v_width
					}
					$('#s7_videoview').css(Style)
					$('.s7emaildialog').css({'z-index':'100002!important'});
				});
				videoViewer = new s7viewers.VideoViewer();
				videoViewer.setContainerId("s7_videoview");
				videoViewer.setParam("serverurl", window.location.protocol+"//s7d9.scene7.com/is/image/");
				videoViewer.setParam("contenturl", window.location.protocol+"//s7d9.scene7.com/skins/");
				videoViewer.setParam("videoserverurl", window.location.protocol+"//s7d9.scene7.com/is/content/");
				videoViewer.setParam("asset", assetID);
				videoViewer.setParam("config", "MandarinOriental/AutoPlayPreset_HTML5_Social_final");
				videoViewer.setParam("emailurl", window.location.protocol+"//s7d9.scene7.com/s7/emailFriend");
				videoViewer.setParam("stagesize", "640,480");
				videoViewer.init();
				flagfirstOpen=0;
			} else {
				$("body").append('<div id="s7_videoview"></div>');
				var v_width=$(window).width()/2-320;
				var v_height=$(window).height()/2-240;
				var Style = {
					'position' : 'fixed',
					'top' : v_height,
					'z-index': '100001',
					'left':v_width,
					'color':'black'
				};
				$('#s7_videoview').css(Style)
				$( window ).resize(function() {
					v_width=$(window).width()/2-320;
					v_height=$(window).height()/2-240;
					Style = {
						'position' : 'fixed',
						'top' : v_height,
						'z-index': '100001',
						'left':v_width,
						'color':'black'
					};
					$('#s7_videoview').css(Style)
					$('.s7emaildialog').css({'z-index':'100002!important'});
				});
				videoViewer = new s7viewers.VideoViewer();
				videoViewer.setContainerId("s7_videoview");
				videoViewer.setParam("serverurl", window.location.protocol+"//s7d9.scene7.com/is/image/");
				videoViewer.setParam("contenturl", window.location.protocol+"//s7d9.scene7.com/skins/");
				videoViewer.setParam("videoserverurl", window.location.protocol+"//s7d9.scene7.com/is/content/");
				videoViewer.setParam("asset", assetID);
				videoViewer.setParam("config", "MandarinOriental/AutoPlayPreset_HTML5_Social_final");
				videoViewer.setParam("emailurl", window.location.protocol+"//s7d9.scene7.com/s7/emailFriend");
				videoViewer.setParam("stagesize", "640,480");
				videoViewer.init();
				//videoViewer.videoplayer.loadAsset(assetID);
			}
			//
			//videoViewer.videoplayer.setParam("autoplay", "0");
			/*
			*/
			$('#s7_videoview').click(function(e) {
				e.stopPropagation();
			});
			$("#image-zoom").show();
			// videoViewer.videoplayer.play();
			if(isMobile.any()) {
			} else {
			}
			//else {
				//Get time is for IE9 to load the player properly
			//	swfobject.embedSWF(playerUrl + "?t=" + new Date().getTime(), 'zoom_video', '640', '480', "9.0.0", false, {'videoURL': videoSrc, useFullScreen : "false",useShareButtons : "false",useInfoButton : "false",playerBackgroundColor : "47413a",playerBackgroundAlpha : "100",controlsColor : "c39122",controlsAlpha : "100",controlsSeparation : "15",use3Dstyle : "false",initialVol : "70",volBackgroundColor : "9c998e",volBarColor : "c39122",timelineDownloadColor : "c39122",timelineBackgroundColor : "9c998e",timelineBackgroundColor : "9c998e",timelineBackgroundAlpha : "100"});
			//}
			var winHeight = $(window).height();
			var contHeight = $("#image-zoom .zoom_video_cont").height();
			var newTop = (winHeight / 2) - (contHeight / 2);
			$("#image-zoom .zoom_video_cont").css("margin-top", newTop + "px");
			if (isIE()) {
				$('body').addClass('hideIEScrollbar');
			}
		}
	}
	window.closeImageZoom = function() {
		try {
			if(isIE()) {
				$('body').removeClass('hideIEScrollbar');
			}
			$('#s7_videoview').hide();
			$("#s7_videoview").remove();
		} catch(e) {
		}
		if(denyImageZoomClosing == false) {
			$("#image-zoom").find("img").remove();
			$("#image-zoom").find(".zoom_video_cont").remove();
			$("#image-zoom").hide();
		}
	}
    // END MOHGS-1003 Judson Abts change 140430


})(jQuery);


//clear search field on focus
function clearText(arg)
{
	var a = arg.target;
    if (a.defaultValue == a.value) {
        a.value = ""
    }
    else {
        if (a.value == "") {
            a.value = a.defaultValue
        }
    }
}

//function DisplayWelcomeMessage(elemId, msg) {
//    var elem = document.getElementById(elemId);
//    if (elem) {
//        var this_section = $(elem).parents('section');
//		$(this_section).find(".error_messages").append('<div class="error_message" style="top:' + $(elem).position().top + 'px;"><ul><li>' + msg + '</li></ul></div>');
//    }
//}

function openImageZoom(imgSrc) {
	if(imgSrc.indexOf("?") > -1) {
		var endOfBaseImg = imgSrc.indexOf("?");
		imgSrc = imgSrc.substring(0, endOfBaseImg);
	}
	$("#image-zoom").css("top", $(window).scrollTop() + "px");
	var winHeight = $(window).height();
	$("#image-zoom").show();
	// MOHGS-451
	//$("#image-zoom").append('<img src="' + imgSrc + '?fmt=png-alpha&hei=' + winHeight + '" />');
	$("#image-zoom").append('<img src="' + imgSrc + '?fmt=jpg&hei=' + winHeight + '" />');
	imageZoomOnImageLoad(imgSrc);
}

/*
// MOHGS-1003
// replaced by Judson Abts 041422
function openVideoZoom(playerUrl, videoSrc) {
		if ("https:" == document.location.protocol){
           playerUrl = playerUrl.replace("http:", "https:");
        }
	$("#image-zoom").css("top", $(window).scrollTop() + "px");
	$("#image-zoom").append('<div class="zoom_video_cont"><div id="zoom_video"></div></div>');
	$("#image-zoom").show();

	if(isMobile.any()) {
		window.location = videoSrc;
	}
	else {
		//Get time is for IE9 to load the player properly
		swfobject.embedSWF(playerUrl + "?t=" + new Date().getTime(), 'zoom_video', '640', '480', "9.0.0", false, {
			'videoURL': videoSrc,
			useFullScreen : "false",
			useShareButtons : "false",
			useInfoButton : "false",
			playerBackgroundColor : "47413a",
			playerBackgroundAlpha : "100",
			controlsColor : "c39122",
			controlsAlpha : "100",
			controlsSeparation : "15",
			use3Dstyle : "false",
			initialVol : "70",
			volBackgroundColor : "9c998e",
			volBarColor : "c39122",
			timelineDownloadColor : "c39122",
			timelineBackgroundColor : "9c998e",
			timelineBackgroundColor : "9c998e",
			timelineBackgroundAlpha : "100"
		});
	}

	var winHeight = $(window).height();
	var contHeight = $("#image-zoom .zoom_video_cont").height();
	var newTop = (winHeight / 2) - (contHeight / 2);
	$("#image-zoom .zoom_video_cont").css("margin-top", newTop + "px");
}

function closeImageZoom() {
	if(denyImageZoomClosing == false) {
		$("#image-zoom").find("img").remove();
		$("#image-zoom").find(".zoom_video_cont").remove();
		$("#image-zoom").hide();
	}
}
*/

function imageZoomOnImageLoad(imgSrc) {
	$("#image-zoom img").load(function() {
		var imgWidth = $(this).width();
		if(imgWidth > $(window).width()) {
			$(this).remove();
			$("#image-zoom").append('<img src="' + imgSrc + '?wid=' + $(window).width() + '" />');

			$("#image-zoom img").load(function() {
				var winHeight = $(window).height();
				var imgHeight = $(this).height();
				var marginTop = (winHeight / 2) - (imgHeight / 2);
				$("#image-zoom img").css("margin-top", marginTop + "px");
				$("#image-zoom img").css("visibility", "visible");
			});
		}
		$("#image-zoom img").css("visibility", "visible");
	});
}

function openLogoutNotification(logoutMessage, loginText) {
	if(!logoutMessage) {
		logoutMessage = "You've been logged out due to inactivity.";
	}

	if(!loginText) {
		loginText = "Login";
	}

	$("#image-zoom .close").hide();
	$("#image-zoom").find("img").remove();
	denyImageZoomClosing = true;
	$("#image-zoom").show();
	$("#image-zoom").append('<div class="logout-notify"><p>' + logoutMessage + '</p><p><a class="button-light">' + loginText + '</a></p></div>');
}

function displayWelcomeMessage(selector, msg)
{
	if ($(selector).length > 0)
	{
		$(selector).after("<div class=\"welcome-message\">" + msg + "</div>");
		$(".welcome-message").delay(5000).fadeOut(1000);
	}
}

var idleTime = 0;  // <-- ***** MOHGS-42 Added by Brian Flaherty 11/21/2012 ********

$(document).ready(function() {

	// When the first input box is clicked look for the first unique class created above.
	$("input[id$='from']").click(function() {
		$(".ui-datepicker-trigger.picker0").click();
		//alert("From clicked");
	});

	// When the second input box is clicked look for the second unique class created above.
	$("input[id$='to']").click(function() {
		$(".ui-datepicker-trigger.picker1").click();
		//alert("To clicked");
	});

	//********* MOHGS-42 Added by Brian Flaherty 11/21/2012 ********
	var URLpattern = /my-profile\/.*/;  // this will match only if the user is logged in
	if (URLpattern.test(document.URL.toString()))
	{
		var URLSnippet = document.URL.match(URLpattern).toString();
		if(URLSnippet.length > 11)
		{
			//Increment the idle time counter every minute.
			var idleInterval = setInterval("timerIncrement()", 60000); // 1 minute

			//Zero the idle timer on mouse movement and keypress.
			$(this).click(function (e) {
				idleTime = 0;
			});
			$(this).keypress(function (e) {
				idleTime = 0;
			});
		}
	}
	//********* MOHGS-42 End addition ********

	//********* MOHGS-121 Added by Brian Flaherty 11/29/2012 ********
		// if the below variable is not null then the we are expecting its there.
		var mobileButtonOnly = $(".details-buttons.details-button-only.room-availability");

		if ((mobileButtonOnly != null))
		{
			// Move the prev and next buttons into the sibling div above it.
			$("#main-contents .details-buttons:first").append($("#main-contents .offers-nav"));
			// Remove the padding bottom so the buttons line up.
			$(".details-buttons.details-button-only.room-availability").css("padding-bottom", "0");
		}
	//********* MOHGS-121 End addition ********

	//********* MOHGS-168 *********
	$(".last.sitemap.navgroup ul:first").append("<li id='footerLangNav' class='navgroup'><p class='footerLang'>Languages</p></li>");
    $("#language .small section ul").clone().appendTo(".last.sitemap.navgroup ul #footerLangNav.navgroup");
	//********* MOHGS-168 End **********

	//********* MOHGS-214 ********
	/*
	$("a[id$='lbCheckAvail']").click(function()
	{
		var AccountNum = "";

		AccountNum = $("[id$='account_code']").val();

		if(AccountNum == "")
		{
			alert("Please enter an account number to Check Availability");
			document.location.href = document.URL;
		}
	});
	*/
	//********* MOHGS-214 End addition ********

	//******* MOHGS-246 ******
	$("#footer .navgroup .first.social a").each(function(index){
		if($(this).attr("href").toString() == "")
		{
			$(this).css("display", "none");
		}
	});
	//****** MOHGS-246 End addition ******

	//***** MOHGS-282 ******
	var lang = "";

	if (s.prop2 !== undefined)
	{
		lang = s.prop2;
	}

	if (typeof window.keepLanguages !== 'undefined' && window.keepLanguages !== null && window.keepLanguages !== "") {
		if (!(window.keepLanguages.indexOf(lang) >= 0)) {
			$("ul#promo-wrap").css("display", "none");
		}
	}
	//***** End MOHGS-282 ******

	//***** MOHGS-290 ******
	$("#header-lists li a#fanClubLogout").css("display", "none");

	if((document.URL.indexOf("/fanclub/") >=0) && !(document.URL.indexOf("/fan-club-log-in/") >=0))
	{
		$("#page-wrap #main-nav li.first").append("<a id=\"fanClubLogout\" href=\"/fanclub/fan-club-log-in/\">SIGN OUT</a>");
		$("#page-wrap #main-nav li.first a").css("display", "inline");
		$("#page-wrap #main-nav li.first a#fanClubLogout").css("margin-left", "24px");
	}

	$("#page-wrap #main-nav li.first a#fanClubLogout").click(function()
	{
		var date = new Date();
		date.setTime(date.getTime()+(-1*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();

		document.cookie = "profile_email="+expires+"; path=/";
	});
	//***** End MOHGS-290 ******

	// MOHGS-326
	$("#page-wrap div[id$='UpdateSearchResultsPanel1']").addClass("GalleryFooterFix");

	// MOHGS-528
	if ($('.celebrity-gallery').length > 0)
	{
		$('.detail-cycle').each(function() {
			var detailCycle = $(this);
			var firstImage = detailCycle.find("img").first();
			detailCycle.parents(".sub-page-carousel").height( $('.celebrity-gallery .port-img').height() );
		});
	}

	// new hat and menus for mobile-only
	var openHatMenu = function($t) {
		// $t is the menu label that was triggered. it is required.
		if ($t.hasClass('active')) { return; } // already open, ignore further progress.
		var $a = $t.add($('.hat')).add($t.closest('.nav-menu,.lang-menu')).add($t.siblings('ul'));
		// hat-menu-spacer is an invisible GIF between the menu and the rest of the page, to intercept clicks and dismiss menu.
		$('.hat').after('<img src="/static/images/bg/space.png" class="hat-menu-spacer">');
		$('.hat-menu-spacer').on('click', function(e) {
			e.preventDefault();
			closeHatMenu();
		}).width(function() {
			return ($(document).width() > $(window).width()) ? $(document).width() : $(window).width();
		}).height(function() {
			return ($(document).height() > $(window).height()) ? $(document).height() : $(window).height();
		});
		$t.siblings('ul').fadeIn( 200, function(){
			$a.addClass('active');
		});
	}
	var closeHatMenu = function($t) {
		// $t is the menu label that was triggered. it is optional.
		var $o = $('.hat .current-lang.active,.hat .menu-label.active'); // despite appearances, this will be only one menu label.
		var $a = $('.hat.active, .hat .active');
		if ($o.length==0) { return; }
		$('.hat-menu-spacer').remove();
		$o.siblings('ul').eq(0).fadeOut( 200, function() {
			$a.removeClass('active');
		});
		if (typeof $t !== 'undefined' && $t && $t.length>0) {
			openHatMenu($t);
		}
	}
	$('.hat .menu-label, .hat .current-lang').on('click.hatMenu', function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (!$('body').hasClass('mobile')) { return; }
		if ($('.hat').hasClass('active')) {
			// one of the menus is already open.
			closeHatMenu($(this));
		} else {
			openHatMenu($(this));
		}
	});
	// group directory SELECT menu: change auto-open-on-dropdown to click-"download"-to-open
	$('.group-directory-selection').click(function(e){
		e.preventDefault();
		var o = $('#rs-dropdown-example').find('option:selected').val();
		if (o && o.match(/http/)) {
			window.open(o);
		}
	});
	// Populate form element placeholders when there are labels but no placeholders.
	// for mobile site only.
	var formLabelToPlaceholder = function() {
		if (!$('body').hasClass('mobile')) { return; }
		$('fieldset input, fieldset textarea').each(function() {
			var $t = $(this);
			if ($t.is('textarea') || $t.attr('type').match(/(text|password)/)) {
				if (!$t.attr('placeholder') && $('label[for="'+$t.attr('id')+'"]').length==1) {
					$t.attr('placeholder',$('label[for="'+$t.attr('id')+'"]').text());
				}
			}
		});
	}
	formLabelToPlaceholder();
	// contact page navigator
	var contactUsPageNavigator = function () {
		if (!$('body').hasClass('mobile')) { return; }
		var b = $('#contact-picker option:selected').val();
		$('.contact-us .block:not(:has(#contact-picker))').removeClass('active');
	    if (b == 'all') {
	        $('.contact-us .block').addClass('active');
	    } else {
	        $('#' + b).show().addClass('active');
	    }
	    $('#contact-picker').change(function () {
		    b = $(this).find('option:selected').val();
		    if (b == 'all') {
		        $('.contact-us .block').addClass('active');
		    } else {
		        $('.contact-us .block:not(:has(#contact-picker))').removeClass('active');
		        $('#' + b).show().addClass('active');
		    }
		});
	}
	contactUsPageNavigator();
	if ($('body').hasClass('mobile')) {
	    $('.contact-us .sub-block .column').not('.right,:first-of-type').addClass('not-first-column');
	}
	// watch the Add To My Profile modal and fix layering when it's triggered...
	// convoluted binding syntax ensures that events will register regardless of how the DOM is manipulated.
	$.fn.addToProfileLayerFix = function() {
		var rrZ, mainZ;
		$(this).on('click.atpl','.addToProfile',function(){
		    // modal has opened. ensure the modal covers everything else.
			rrZ = $('.right-rail').css('z-index');
			mainZ = $('#main').css('z-index');
			$('.right-rail').css('z-index',999);
			$('#main').css('z-index',999);
		}).on('click.atpl', '.atp-modal-window a', function () {
			// modal has closed. restore previous z-index values.
			$('.right-rail').css('z-index',rrZ);
			$('#main').css('z-index',mainZ);
		});
	}
	$('.GalleryFooterFix').addToProfileLayerFix();
	
	//Add to Profile Logic for Mobile Footer
	var headerZ, navZ;
	$('.addToProfile').click(function (event) {
		headerZ = $('#header').css('z-index');
		navZ = $('nav').css('z-index');
		if ($('body.mobile').length > 0) {
		    $('header').css('z-index', 1);
		    $('nav').css('z-index', 1);
		} else {
		    $('header').css('z-index', 105);
		    $('nav').css('z-index', 105);
		}
		$(this).siblings('.atp-modal-window').show();
		closeModalFunction();
	});
	$('.book-restaurant').click(function(event) {
		event.preventDefault();
		var width = 400;
		var height = 600;
		var left = parseInt((screen.availWidth/2) - (width/2));
		var top = parseInt((screen.availHeight/2) - (height/2));
		var w=window.open($(this).attr("href"),'_blank','height=600,width=400,left=' + left + ',top=' + top + 'screenX=' + left + ',screenY=' + top);		
		setTimeout(function(){$('.book-restaurant').parents('div:first').find('.ajaxloader').remove();},2000);	
	});
	$('.book-restaurant-reservation').click(function(event) {
		event.preventDefault();
		var width = 400;
		var height = 600;
		var left = parseInt((screen.availWidth/2) - (width/2));
		var top = parseInt((screen.availHeight/2) - (height/2));
		var w=window.open($(this).attr("href"),'_blank','height=600,width=400,left=' + left + ',top=' + top + 'screenX=' + left + ',screenY=' + top);		
		setTimeout(function(){$('.book-restaurant-reservation').parents('div:first').find('.ajaxloader').remove();},2000);
	});
	function closeModalFunction(){
	$('.modal-window-close-icon').click(function(e){
		$('.atp-modal-window').hide();
		$('.booking-modal-window').hide();
		$('header').css('z-index', headerZ);
		$('nav').css('z-index', navZ);
	});
	}
	
	closeModalFunction();
	//migrate markup from slide element  via clone method
	function moveModalMarkup(){
		var modalMarkup = $('.booking-modal-window').clone().wrap('<p>').parent().html();
		$ (".booking-modal-window").remove();
		$(modalMarkup).appendTo("#page-wrap");
		$("#page-wrap .booking-modal-window").hide();
	}
	if ($("#slide-menu-item-5 .booking-modal-window:hidden").length > 0) {
		moveModalMarkup();
	}

	
}); // End (document).ready
//********* MOHGS-75 End addition ********

//********* MOHGS-42 Added by Brian Flaherty 11/21/2012 ********
var LoggedInFlag = true;
function timerIncrement() {
	idleTime = idleTime + 1;
	if ((idleTime > 29) && LoggedInFlag) { // 30 minutes
		openLogoutNotification();
		LoggedInFlag = false;
		$(".button-light").click(function(){
			$("#image-zoom").hide();
			javascript:__doPostBack('ctl00$cphTopContent$top1$lbMyProfileSignOut$signoutLink','');
		});
	}
}
//********* MOHGS-42 End addition ********

//********* MOHGS-206 Added by Brian Flaherty 01/29/2013 ********
$("#header-lists #language a:first").attr("href", "#");
//********* MOHGS-206 End addition ********

function tabLogic() {
    // tabbed content
    // http://www.entheosweb.com/tutorials/css/tabs.asp
    $(".tab-content").hide();
    $(".tab-content:first").show();

    /* if in tab mode */
    $("ul.tabs li").click(function () {
        $(".tab-content").hide();
        var activeTab = $(this).attr("data-rel");
        $("#" + activeTab).fadeIn();
        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");

    });
}

$(window).load(function() {
	if ($(".tabs").length > 0) {
		tabLogic();
	}
});

function closeModalNavHeadReset() {
    if ($('body.mobile').length > 0) {
        $('header').css('z-index', '3');
        $('nav').css('z-index', '4');
    } else {
        $('header').css('z-index', 'initial');
        $('nav').css('z-index', 'initial');
    }
}


/* explore.js here now */

var exploreRegionButton = null;
var currentMapSlideNum = 0;
var currentDetailPage = null;


$(document).ready(function () {
    window.activateMap = function () {
        $("#explore-map").delay(1000).slideDown("normal", function () {
            $("#maptray").fadeIn();
            $("#info .explore_tempting_offers").fadeIn();
        });
    }

    window.setupRegionList = function () {
        $(".region-selector>li span").click(function () {
            if ($(this).parent("li").hasClass("active")) {
                $(this).siblings("ul.location-list").slideUp();
                $(this).parent("li").removeClass("active");
                exploreRegionButton = null;
                changeMapSlides(0);
            }
            else {
                if (exploreRegionButton != null) {
                    exploreRegionButton.siblings("ul.location-list").slideUp();
                    exploreRegionButton.parent("li").removeClass("active");
                }
                $(this).parent("li").addClass("active");
                $(this).siblings("ul.location-list").slideDown();
                exploreRegionButton = $(this);

                var slideNum = parseInt($(this).attr("id").replace("explore-map-link-", ""));
                changeMapSlides(slideNum);
            }
        });
    }

    window.setupMapSlides = function () {
        $(window).resize(function () {
            resetMapSlides();
        });

        resetMapSlides();

        $(".region-information .view-full").click(function () {
            $(".region-selector .active span").click();
        });
    }

    window.setupMapLinks = function () {
        $("#explore-map-reel .explore-map-slide .explore-pin, .location-list a").click(function () {
            var cityClass = $(this).attr("class").replace("explore-pin", "").replace(/\s/, "");
            var detailPageClass = cityClass + "-detail";
            var detailPage = $("." + detailPageClass);
            if (currentDetailPage != null && !currentDetailPage.hasClass(detailPageClass)) {
                currentDetailPage.fadeOut("fast", function () {
                    currentDetailPage = null;
                    showNewDetailPage(cityClass);
                });
            }
            else {
                showNewDetailPage(cityClass);
            }
        });

        $(".location-detail-single .close, .location-detail-multi .close").click(function () {
            hideCurrentDetailPage();
        });

        $(".region-information-fade").click(function () {
            if ($(".region-information-fade").is(":visible")) {
                $(".region-information-fade").hide();
                hideCurrentDetailPage();
            }
        });
    }

    window.showNewDetailPage = function (cityClass) {
        var detailPageClass = cityClass + "-detail";
        var detailPage = $("." + detailPageClass);

        if (detailPage.length > 0) {
            $(".location-list .active").removeClass("active");
            $(".location-list a." + cityClass).parent().addClass("active");
            if (!$(".location-list a." + cityClass).parents(".location-list").parent().hasClass("active")) {
                setTimeout(function () { $(".location-list a." + cityClass).click() }, 500);
                $(".location-list a." + cityClass).parents(".location-list").siblings("span").click();
            }

            detailPage.fadeIn("fast");
            currentDetailPage = detailPage;

            if (!$(".region-information-fade").is(":visible")) {
                $(".region-information-fade").fadeIn();
            }
        }
    }

    window.hideCurrentDetailPage = function () {
        $(".location-list .active").removeClass("active");
        if (currentDetailPage != null) {
            currentDetailPage.fadeOut("fast");
        }
        if ($(".region-information-fade").is(":visible")) {
            $(".region-information-fade").fadeOut();
        }
    }

    window.resetMapSlides = function () {
        var windowWidth = $(window).width();

        // localize direction of animated effects when page content is flopped.
        var rtlizer = function (ltr) { // returns string, assumes input is either 'right' or 'left'
            if ($('html').attr('lang') != 'ar' && $('html').attr('dir') != 'rtl') { return ltr; }
            if (ltr.match(/left/i)) { return 'right'; }
            return 'left';
        }

        slideDir = rtlizer('left');

        $("#explore-map-reel .explore-map-slide").width(windowWidth);

        var reelWidth = 0;
        $("#explore-map-reel .explore-map-slide").each(function () {
            reelWidth += parseInt($(this).outerWidth());

            var offset = parseInt($(this).find(".slide-container").width() / 2) - parseInt($(this).width() / 2);

            if (offset < 0) {
                offset = 0;
            }

            $(this).find(".slide-container").css(slideDir, "-" + offset + "px");
        });
        $("#explore-map-reel").width(reelWidth);
        changeMapSlides(currentMapSlideNum, true);
    }

    window.changeMapSlides = function (slideNum, instant) {
        if (slideNum == 0) {
            $(".region-information .view-full").hide();
        }
        else {
            $(".region-information .view-full").show();
        }

        var newSlide = $("#explore-map-slide-" + slideNum);
        if (newSlide.length > 0) {
            var newLeft = newSlide.position().left;
            if (instant == true) {
                $("#explore-map-reel").css("left", (newLeft * -1) + "px");
            } else {
                $("#explore-map-reel").animate({ left: (newLeft * -1) }, 500);
            }
        }

        currentMapSlideNum = slideNum;
    }

    window.openSetLoc = function () {
        var query = "loc";
        query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var expr = "[\\?&]" + query + "=([^&#]*)";
        var regex = new RegExp(expr);
        var results = regex.exec(window.location.href);
        if (results !== null) {
            var locationToOpen = decodeURIComponent(results[1].replace(/\+/g, " "));
            locationToOpen = locationToOpen.toLowerCase();
            $(".region-selector ." + locationToOpen + ":first").click();
        }
    }



    setupRegionList();
    setupMapSlides();
    setupMapLinks();

    activateMap();

    openSetLoc();

});
