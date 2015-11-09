
//chapter 08 : 06
			//Width and height
			var w = 900;
			var h = 500;
			var padding_r = 100;
			var padding_l = 70;
                        var padding_y = 70;
			
			
			//Static dataset

			/*var dataset = [
							[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
							[410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
							[600, 150]
						  ];*/

                        var dataset;


                        var data = d3.json("despesas.json", function(data) {
                         //alert(data.Presidencia);
                         make_chart(data);
                        });


                        function make_chart(data) {

                         var year = 2004;
                         var vy = 'values' + year;
                         var dataset = data[vy];


			

		         //Create scale functions
		         var xScale = d3.scale.log()
		         					 //.domain([0, d3.max(dataset, function(d) { return d[0]; })])
		         					 .domain([Math.pow(10,7), Math.pow(10,12)])
		         					 .range([padding_l, w - padding_r * 2]);

		         var yScale = d3.scale.log()
		         					 //.domain([0, d3.max(dataset, function(d) { return d[1]; })])
		         					 .domain([Math.pow(10,7), Math.pow(10,12)])
		         					 .range([h - padding_y, padding_y]);

		         var rScale = d3.scale.linear()
		         					 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
		         					 .range([10, 15]);

		         //Define X axis
		         var xAxis = d3.svg.axis()
		         				  .scale(xScale)
		         				  .orient("bottom")
                                                          //.innerTickSize(-h+padding*2)
		         				  .ticks(5)
                                                          .tickFormat(function(d) { return make_log_bi(d) });
                                                          //.tickFormat(function(d) { return "$" + Math.round(d/1e06)});

		         //Define Y axis
		         var yAxis = d3.svg.axis()
		         				  .scale(yScale)
		         				  .orient("left")
                                                          //.innerTickSize(-w+padding*3)
                                                           .tickPadding(10)
		         				  .ticks(5)
                                                          .tickFormat(function(d) { return make_log_bi(d) });


		         //Create SVG element
		         var svg = d3.select("body")
		         			.append("svg")
		         			.attr("width", w)
		         			.attr("height", h);

                         /*svg.selectAll("img")
                                .enter()
                                .append("img")
                                .attr("xlink:href", "@Url.Content("navigate-right.png")")
                                .attr("x", "60")
                                .attr("y", "60")
                                .attr("width", "20")
                                .attr("height", "20");*/


		         //Create circles
		         svg.selectAll("circle")
		            .data(dataset)
		            .enter()
		            .append("circle");


                         do_circle_pos(svg,xScale,yScale);

		         svg.selectAll("circle")
                            .on("mouseover", function(d) {

		         		//Get this bar's x/y values, then augment for the tooltip
		         		var xPosition = parseFloat(d3.select(this).attr("cx")) + 20;
		         		var yPosition = parseFloat(d3.select(this).attr("cy")) + 20;
		                        var percent = Math.round(100*d[0]/(d[0]+d[1]));

		         		//Update the tooltip position and value
		         		d3.select("#tooltip")
		         			.style("left", xPosition + "px")
		         			.style("top", yPosition + "px")						
		         			.select("#pessoal_p")
		         			.text(percent);

		         		d3.select("#tooltip")
		         			.select("#title")
		         			.text(d[3]);

		         		d3.select("#tooltip")
		         			.select("#pessoal_v")
		         			.text(Math.round(d[0]/1e09));

		         		d3.select("#tooltip")
		         			.select("#total")
		         			.text(Math.round((d[0]+d[1])/1e09));
		            
		         		//Show the tooltip
		         		d3.select("#tooltip").classed("hidden", false);

		            })
		            .on("mouseout", function() {
		            
		         		//Hide the tooltip
		         		d3.select("#tooltip").classed("hidden", true);
		         		
		            });

                         /*circle_legend(svg,0.8,100);
                         circle_legend(svg,0.5,150);
                         circle_legend(svg,0.2,200);*/


		         
		         //Create labels
		         svg.selectAll("text")
		            .data(dataset)
		            .enter()
		            .append("text")
                            .attr("class", "label")
		            .attr("font-family", "sans-serif")
		            .attr("font-size", "11px")
		            .attr("font-weight", "bold")
		            .attr("fill", "black");

                         do_label_pos(svg,xScale,yScale);
		         
		         
		         //Create X axis
		         svg.append("g")
		         	.attr("class", "axis")
		         	.attr("transform", "translate(0," + (h - padding_l) + ")")
		         	.call(xAxis);
		         
		         //Create Y axis
		         svg.append("g")
		         	.attr("class", "axis")
		         	.attr("transform", "translate(" + padding_l + ",0)")
		         	.call(yAxis);

                         rec_legend(svg,0.2,750,30);
                         rec_legend(svg,0.5,780,60);
                         rec_legend(svg,0.8,840,30);

                         append_text(svg,w-padding_r+40,70,"% Pessoal");
                         append_text(svg,785,120,"25");
                         append_text(svg,845,120,"75");
                         //append_text(svg,w-40,105,">= 75");
                         //append_text(svg,w-5,155,">= 25 e < 75");

                         svg.append("text")
                            .attr("class", "xlabel")
                            .attr("text-anchor", "end")
                            .attr("x", w * 0.58)
                            .attr("y", h - 6)
		            .attr("font-weight", "bold")
                            .text("Gasto com Pessoal e Encargos Sociais (R$ bi)");

                         svg.append("text")
                            .attr("class", "ylabel")
                            .attr("text-anchor", "end")
                            .attr("x", -w * 0.17)
                            .attr("y", 1)
                            .attr("dy", ".75em")
                            .attr("transform", "rotate(-90)")
		            .attr("font-weight", "bold")
                            .text("Outros Gastos (R$ bi)");

                        d3.select("p")
                         .on("click", function() {
                           year = get_next_year(year);
                           vy = 'values' + year;
                           dataset = data[vy];

		           svg.selectAll("circle")
		            .data(dataset);
                           do_circle_pos(svg,xScale,yScale);

		           var lala = svg.selectAll(".label")
		            .data(dataset);
                           do_label_pos(svg,xScale,yScale);
                         });
                       };

