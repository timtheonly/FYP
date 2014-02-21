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
			element.append('<svg class="chart"width="'+scope.width+'" height="'+scope.height+'"></svg>');
			/* Based on example from
			*  http://nvd3.org/ghpages/discreteBar.html
			*/
			var chart;
			nv.addGraph(function(){
				chart = nv.models.discreteBarChart()
				.x(function(d){
					return d.answer;
				})
				.y(function(d){
					return d.response;
				})
				.staggerLabels(false)
				.showValues(false)
				.width(scope.width)
				.height(scope.height);

				d3.select('.chart')
				.datum([
					{
						values:[{'answer':'yes', 'response':9}, {'answer':'no', 'response':10}]
					}])
				.call(chart);

				return chart;
			});
		}
	};
});