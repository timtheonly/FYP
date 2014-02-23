'use strict';
/* Idea for directive based method from
 * http://briantford.com/blog/angular-d3.html
 */
angular.module('fypApp')
    .directive('d3BarChart',function(){//bar graph
	return{
		restrict:'E',
		scope:{
			values :'=',
			width:'=',
			height:'='
		},
		link:
		function(scope, element){
			element.append('<svg class="bar" width="'+scope.width+'" height="'+scope.height+'"></svg>');
			/* Based on example from
			*  http://nvd3.org/ghpages/discreteBar.html
			*/
			var chart;
            scope.$watch('values', function(newVal){
               if(!newVal)
               {
                   return;
               }
               nv.addGraph(function(){
                    chart = nv.models.discreteBarChart()
                        .x(function(d){
                            return d.answer;
                        })
                        .y(function(d){
                            return d.response;
                        })
                        .staggerLabels(false)
                        .width(scope.width)
                        .tooltips(false)
                        .height(scope.height);

                    d3.select('.bar')
                        .datum([
                            {
                                values:scope.values
                            }])
                        .call(chart);

                    return chart;
                });
            });

		}
	};
})
    .directive('d3PieChart',function(){//pie chart
    return{
        restrict:'E',
        scope:{
            values :'=',
            width:'=',
            height:'='
        },
        link:function(scope,element){
            element.append('<svg class="pie" width="'+scope.width+'" height="'+scope.height+'"></svg>');
            /* Based on example from
             * http://nvd3.org/ghpages/pie.html
             */
            var chart;
            scope.$watch('values', function(newVal){
                if(!newVal)
                {
                    return;
                }
                nv.addGraph(function(){
                    chart = nv.models.pieChart()
                        .x(function(d){return d.answer;})
                        .y(function(d){ return d.response;})
                        .width(scope.width)
                        .height(scope.height)
                        .tooltips(false)
                        .options({
                            showControls:false,
                            showLegend:false
                        });;

                    d3.select('.pie')
                        .datum(scope.values)
                        .call(chart);

                    return chart;
                });
            });
        }
    }
})
    .directive('d3DonutChart',function(){
        return{
            restrict:'E',
            scope:{
                values :'=',
                width:'=',
                height:'='
            },
            link:function(scope,element){
                element.append('<svg class="donut" width="'+scope.width+'" height="'+scope.height+'"></svg>');
                /* Based on example from
                 * hhttp://nvd3.org/ghpages/pie.html
                 */
                var chart;
                scope.$watch('values', function(newVal){
                    if(!newVal)
                    {
                        return;
                    }
                    nv.addGraph(function(){
                        chart = nv.models.pieChart()
                            .x(function(d){return d.answer;})
                            .y(function(d){ return d.response;})
                            .donut(true)
                            .width(scope.width)
                            .height(scope.height)
                            .tooltips(false)
                            .options({
                                showControls:false,
                                showLegend:false
                            });

                        d3.select('.donut')
                            .datum(scope.values)
                            .call(chart);

                        return chart;
                    });
                });
            }
        }
});