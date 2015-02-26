// JavaScript Document

(function($){
	
    $(document).ready(function() {
		if($(window).width() < 600)	{

			$('header[role=banner] nav a').click(function(){
				var parent = $(this).parent('li');
				$(this).toggleClass('active');

				if($(this).hasClass('active')){
					parent.children('ul').slideDown('slow');
				}
				else{
					parent.children('ul').slideUp('slow');
				}
				return false;
			});
		}
		else{
			if(!navigator.userAgent.match(/iPad/i))
			{
				$('header[role=banner] nav ul:first').children().hover(
					function(){
						$(this).addClass('hover').find('ul').hide();
						$('ul:first', this).slideDown();
						$('ul:first', this).children().hover(
							function(){
								$(this).addClass('hover');
							},
							function(){
								$(this).removeClass('hover');
							}
						);
						$('ul:first', this).slideDown();	
					},
					function(){
						if($(this).has('ul').length)
						{
							$('ul', this).slideUp('fast', function(){
								$(this).parent('li').removeClass('hover');
							});
						}
						else {
							$(this).removeClass('hover');
						}
					}
				);
			}
			else
			{
				$('header[role=banner] nav ul:first').children().bind('touchstart', function(){
					var obj = $(this);

					$('header[role=banner] nav ul:first li ul').each(function(){
						if($(this).length){
							$(this).slideUp('fast', function(){
								$(this).parent('li').removeClass('hover');
							});
						}
						else
							if($(this) != obj)
								$(this).removeClass('hover');
					});

					if(!obj.hasClass('hover'))
					{
						$(this).addClass('hover').find('ul').hide();
						$('ul:first', this).slideDown();
						$('ul:first', this).children().hover(
							function(){
								$(this).addClass('hover');
							},
							function(){
								$(this).removeClass('hover');
							}
						);
						$('ul:first', this).slideDown();	
					}
					else
					{
						if($(this).has('ul').length)
						{
							$('ul', this).slideUp('fast', function(){
								$(this).parent('li').removeClass('hover');
							});
						}
						else {
							$(this).removeClass('hover');
						}
					}
				});
			}
		}

		$('#mobile-nav').click(function(){
			var link = $(this);
			var obj = $('header nav ul#main-nav');

			if(link.hasClass('expanded')) {
				obj.slideUp();
				link.removeClass('expanded');
			}
			else{
				obj.slideDown();
				link.addClass('expanded');
			}
			return false;
		});
		
		if($('#hero').length > 0)
		{
			$('#hero').width($('#wrapper').width());
			var ratio = $('#hero').width() / 2.5;
			$('#hero').height(ratio);
			$(window).resize(function(){
				$('#hero').width($('#wrapper').width());
				var ratio = $('#hero').width() / 2.5;
				$('#hero').height(ratio);
			});
			$('#hero').cycle({
				  fx: 'fade',
				  speed: 'slow',
				  timeout: 10000,
				  containerResize: 0,
				  slideResize: 0,
				  cleartype: true,
				  cleartypeNoBg: true,
				  pager: '#hero-nav',
				  pagerAnchorBuilder: function(idx, slide) { 
				  	return '#hero-nav li:eq(' + idx + ') a'; 
				  } 
			});
		}
		$('a[href=#]').click(function(){return false;});
    });
})(jQuery);