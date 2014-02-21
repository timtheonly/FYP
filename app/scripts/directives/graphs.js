'use strict';
/* Idea for directive based method from
 * http://briantford.com/blog/angular-d3.html
 */
angular.module('fypApp').directive('d3BarGraph',function(){
	return{
		restrict:'E',
		scope:{
			values :'=',
			width:'=',
			height:'='
		},
		link:
		function(scope, element){
			element.append('<div class="chart"><svg width="'+scope.width+'" height="'+scope.height+'"></svg></div>');
			scope.$watch('values',function(newVal){
				if(!newVal){
					return;
				}
				/* Based on example from
				*  http://nvd3.org/ghpages/discreteBar.html
				*/
				nv.addGraph(function(){
					var chart = nv.models.discreteBarChart()
					.x(function(d){
						console.log(d);
						return d.answer;
					})
					.y(function(d){
						console.log(d);
						return d.response;
					})
					.staggerLabels(true)
					.showValues(true);

					d3.select('.chart')
					.datum([
						{
							values:newVal
						}])
					.call(chart);

					nv.utils.windowResize(chart.update);
					return chart;
				});
			});
		}
	};
});