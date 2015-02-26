 /*
 * sdAccordion
 * This script is a plugin for jQuery
 *
 * To be used to display nested objects as accordions
 *
 ** Example Uses **
 *
 * With defaults:
 *
 *	$('ul').sdAccordion();
 *
 * Custom Options:
 *
 *  $('ul').sdAccordion({
 *		multiPanel: 'yes'
 *	});
 *
 * Copyright (c) 2010 Sliced Design
 * Author: Jeremy Hamel
 * Version: 1.0 (OCT 6, 2010)
 * jQuery Version: 1.3.2 (tested)
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html 
 *
 * http://www.sliceddesign.com
 */

(function($){ 
	$.fn.sdAccordion = function(opts) {  
            var defaults = {  
                multiPanel: 'yes', //allow multiple panels open at once: 'yes' or 'no'
				startState: 'none', // default - current panel shown || all - show all panels || none - hide all panels
				activeClass: 'sdActive', //class added to active section(s)
				panelClass: 'sdPanel', //class added to panel
				headingWithPanelsClass: 'sdDisabled', //class added to first level items with panels
				headingWithoutPanelsClass: 'sdClickable', //class added to first level items without panels
				currentClasses: ['current', 'currentParent'] //default classes to check initial state, can be array or single item
            };  
            var opts = $.extend(defaults, opts);
			var menu = $(this);
			menu.children().each(function() {
				var obj = $(this);
				//give each panel a class and hide it
				obj.children(':not(a)').addClass(opts.panelClass).hide();
				//check to see if a panel exists for all headings
				if(obj.find('.'+opts.panelClass).length)
				{
					//add class to heading with panel
					obj.children('a:first').addClass(opts.headingWithPanelsClass);
				}
				else
				{
					//add class to heading without panel
					obj.children('a:first').addClass(opts.headingWithoutPanelsClass);
				}
				//check to see if current classes is an array
				if($.isArray(opts.currentClasses))
				{
					//loop through array of current classes to set initial active class
					$.each(opts.currentClasses, function(intIndex, objValue){
						if(obj.hasClass(objValue))
						{
							obj.addClass(opts.activeClass);
						}
					});
				}
				else
				{
					//set initial active class if current classes is not an array
					if(obj.hasClass((opts.currentClasses)))
					{
						obj.addClass(opts.activeClass);
					}
				}
			});
			//when a heading with a panel is clicked...
			$('.'+opts.headingWithPanelsClass).click(function() {
				//determines if will show multiple open panels at a time or not
				if(opts.multiPanel == 'yes')
				{
					displayMultiplePanels(menu, $(this).parent(), opts);
				}
				else
				{
					displayPanel(menu, $(this).parent(), opts);
				}
				return false;
			});
			//initialize for start
			displayPanel(menu, $('.'+opts.activeClass), opts);
			//determine start state
			if(opts.startState == 'all')
			{
				$('.'+opts.panelClass).show();
			}
			else if(opts.startState == 'none')
			{
				$('.'+opts.panelClass).hide();
			}
	};
	//function for displaying a single panel at a time
	function displayPanel(root, obj, opts)
	{
		$('.'+opts.panelClass).hide();
		$('.'+opts.panelClass, obj).show();
		root.children().removeClass(opts.activeClass);
		obj.addClass(opts.activeClass);
		return false;
	};
	//function for displaying multiple panels at a time
	function displayMultiplePanels(root, obj, opts)
	{
		if($('.'+opts.panelClass, obj).is(':hidden'))
		{
			$('.'+opts.panelClass, obj).show();
			obj.addClass(opts.activeClass);
		}
		else
		{
			$('.'+opts.panelClass, obj).hide();
			obj.removeClass(opts.activeClass);
		}
		return false;
	};
})(jQuery);      