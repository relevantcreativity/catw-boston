$.event.special.dragSnap = {
	setup: function(e, ui) {
		var $el = $(this),
			transitionSwap = function($el, tog) {
				var speed = .3,
					transition = ( tog ) ? "margin-left " + speed + "s ease" : 'none';

				$el.css({
					"-webkit-transition": transition,
					"-moz-transition": transition,
					"-ms-transition": transition,
					"-o-transition": transition,
					"transition": transition
				});
			},
			move = function($slider, moveTo) {
				var dStyle = document.body.style,
				 	transitionSupport = dStyle.webkitTransition !== undefined || 
						dStyle.mozTransition !== undefined ||
						dStyle.msTransition !== undefined ||
						dStyle.oTransition !== undefined ||
						dStyle.transition !== undefined;

				if( transitionSupport ) {
					$slider.css('marginLeft', moveTo + "%");
				} else {
					$slider.animate({ marginLeft: moveTo + "%" }, opt.speed);
				}
			},
			snapBack = function(e, ui) {
				var $el = ui.target,
					currentPos = ( $el.attr('style') != undefined ) ? $el.attr('style').match(/margin\-left:(.*[0-9])/i) && parseInt(RegExp.$1) : 0,
					leftmargin = (ui.left === false) ? carousel.roundDown(currentPos) - 100 : carousel.roundDown(currentPos);

				transitionSwap($el, true);
				move($el, leftmargin);	
			};

		$el
			.bind("snapback", snapBack)
			.bind("touchstart", function(e) {
				var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
					start = {
						time: (new Date).getTime(),
						coords: [ data.pageX, data.pageY ],
						origin: $(e.target).closest('.slidewrap')
					},
					stop,
					$tEl = start.origin.find('.slider'),
					currentPos = ( $tEl.attr('style') != undefined ) ? $tEl.attr('style').match(/margin\-left:(.*[0-9])/i) && parseInt(RegExp.$1) : 0;
				
				transitionSwap($tEl, false);

				function moveHandler(e) {
					var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
					stop = {
							time: (new Date).getTime(),
							coords: [ data.pageX, data.pageY ]
					};
					
					if(!start || Math.abs(start.coords[0] - stop.coords[0]) < Math.abs(start.coords[1] - stop.coords[1]) ) {
						return;
					}

					$tEl.css({"margin-left": currentPos + ( ( (stop.coords[0] - start.coords[0]) / start.origin.width() ) * 100 ) + '%' });						

					// prevent scrolling
					if (Math.abs(start.coords[0] - stop.coords[0]) > 10) {
						e.preventDefault();
					}
					
				};

				$el
					.bind("gesturestart", function(e) {
						$el
							.unbind("touchmove", moveHandler)
							.unbind("touchend", moveHandler);
					})
					.bind("touchmove", moveHandler)
					.one("touchend", function(e) {

						$el.unbind("touchmove", moveHandler);
						
						transitionSwap($tEl, true);
						
						if (start && stop ) {

							if (Math.abs(start.coords[0] - stop.coords[0]) > 10
								&& Math.abs(start.coords[0] - stop.coords[0]) > Math.abs(start.coords[1] - stop.coords[1])) {
								e.preventDefault();
							} else {
								$el.trigger('snapback', { target: $tEl, left: true });
								return;
							}

							if (Math.abs(start.coords[0] - stop.coords[0]) > 1 && Math.abs(start.coords[1] - stop.coords[1]) < 75) {
								var left = start.coords[0] > stop.coords[0];

							if( -( stop.coords[0] - start.coords[0]) > ( start.origin.width() / 4 ) || ( stop.coords[0] - start.coords[0]) > ( start.origin.width() / 4 ) ) {

								start.origin.trigger("dragSnap", {direction: left ? "left" : "right"});

								} else {								
									$el.trigger('snapback', { target: $tEl, left: left });
								}

							}
						}
						start = stop = undefined;
					});
			});
	}
};


/* jquery mobile virtual mouse events */
(function(w,D,d,l){var C="virtualMouseBindings",b="virtualTouchID",a="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),v="clientX clientY pageX pageY screenX screenY".split(" "),y={},E=0,r=0,q=0,o=false,H=[],f=false,O=false,t=w.support.eventCapture,s=w(d),B=1,K=0;w.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};function p(i){while(i&&typeof i.originalEvent!=="undefined"){i=i.originalEvent}return i}function g(Q,R){var Y=Q.type;Q=w.Event(Q);Q.type=R;var Z=Q.originalEvent;var X=w.event.props;if(Z){for(var U=X.length,P;U;){P=X[--U];Q[P]=Z[P]}}if(Y.search(/^touch/)!==-1){var S=p(Z),Y=S.touches,V=S.changedTouches,T=(Y&&Y.length)?Y[0]:((V&&V.length)?V[0]:l);if(T){for(var U=0,W=v.length;U<W;U++){var P=v[U];Q[P]=T[P]}}}return Q}function M(R){var P={};while(R){var i=w.data(R,C);for(var Q in i){if(i[Q]){P[Q]=P.hasVirtualBinding=true}}R=R.parentNode}return P}function z(Q,P){while(Q){var i=w.data(Q,C);if(i&&(!P||i[P])){return Q}Q=Q.parentNode}return null}function F(){O=false}function j(){O=true}function N(){K=0;H.length=0;f=false;j()}function n(){F()}function u(){x();E=setTimeout(function(){E=0;N()},w.vmouse.resetTimerDuration)}function x(){if(E){clearTimeout(E);E=0}}function m(R,S,i){var Q=false;if((i&&i[R])||(!i&&z(S.target,R))){var P=g(S,R);w(S.target).trigger(P);Q=P.isDefaultPrevented()}return Q}function h(i){var P=w.data(i.target,b);if(!f&&(!K||K!==P)){m("v"+i.type,i)}}function L(Q){var S=p(Q).touches;if(S&&S.length===1){var R=Q.target,i=M(R);if(i.hasVirtualBinding){K=B++;w.data(R,b,K);x();n();o=false;var P=p(Q).touches[0];r=P.pageX;q=P.pageY;m("vmouseover",Q,i);m("vmousedown",Q,i)}}}function G(i){if(O){return}if(!o){m("vmousecancel",i,M(i.target))}o=true;u()}function c(S){if(O){return}var Q=p(S).touches[0];var P=o,R=w.vmouse.moveDistanceThreshold;o=o||(Math.abs(Q.pageX-r)>R||Math.abs(Q.pageY-q)>R);var i=M(S.target);if(o&&!P){m("vmousecancel",S,i)}m("vmousemove",S,i);u()}function e(Q){if(O){return}j();var i=M(Q.target);m("vmouseup",Q,i);if(!o){if(m("vclick",Q,i)){var P=p(Q).changedTouches[0];H.push({touchID:K,x:P.clientX,y:P.clientY});f=true}}m("vmouseout",Q,i);o=false;u()}function A(P){var Q=w.data(P,C),i;if(Q){for(i in Q){if(Q[i]){return true}}}return false}function J(){}function k(i){var P=i.substr(1);return{setup:function(R,Q){if(!A(this)){w.data(this,C,{})}var S=w.data(this,C);S[i]=true;y[i]=(y[i]||0)+1;if(y[i]===1){s.bind(P,h)}w(this).bind(P,J);if(t){y.touchstart=(y.touchstart||0)+1;if(y.touchstart===1){s.bind("touchstart",L).bind("touchend",e).bind("touchmove",c).bind("scroll",G)}}},teardown:function(R,Q){--y[i];if(!y[i]){s.unbind(P,h)}if(t){--y.touchstart;if(!y.touchstart){s.unbind("touchstart",L).unbind("touchmove",c).unbind("touchend",e).unbind("scroll",G)}}var S=w(this),T=w.data(this,C);if(T){T[i]=false}S.unbind(P,J);if(!A(this)){S.removeData(C)}}}}for(var I=0;I<a.length;I++){w.event.special[a[I]]=k(a[I])}if(t){d.addEventListener("click",function(U){var Q=H.length;var V=U.target;if(Q){var X=U.clientX,W=U.clientY,T=w.vmouse.clickDistanceThreshold;var Y=V;while(Y){for(var S=0;S<Q;S++){var P=H[S],R=0;if((Y===V&&Math.abs(P.x-X)<T&&Math.abs(P.y-W)<T)||w.data(Y,b)===P.touchID){U.preventDefault();U.stopPropagation();return}}Y=Y.parentNode}}},true)}})(jQuery,window,document);