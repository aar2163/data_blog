
//chapter 08 : 06
			//Width and height
			var w = 900;
			var h = 520;
			var h2 = 200;
			var padding_r = 100;
			var padding_l = 70;
                        var padding_y_top = 110;
                        var padding_y = 70;
                        var padding_y2_top = 30;
                        var padding_y2 = 70;
			
			
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
                         var dataset2 = data.pib;

                         var domain2 = [];
                         var range2 = [];
                         var delta_x = (w-padding_l)/dataset2.length;

                         for (var i = 0; i < dataset2.length; i++)
                         {
                          domain2.push(dataset2[i][0]);
                          range2.push(padding_l + i*delta_x);
                         }

                         var size_x = padding_l + (dataset2.length-1)*delta_x;


			

		         //Create scale functions
		         var xScale = d3.scale.log()
		         					 //.domain([0, d3.max(dataset, function(d) { return d[0]; })])
		         					 .domain([Math.pow(10,7), Math.pow(10,12)])
		         					 .range([padding_l, w - padding_r * 2]);

		         var yScale = d3.scale.log()
		         					 //.domain([0, d3.max(dataset, function(d) { return d[1]; })])
		         					 .domain([Math.pow(10,7), Math.pow(10,12)])
		         					 .range([h - padding_y, padding_y_top]);

		         var rScale = d3.scale.linear()
		         					 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
		         					 .range([10, 15]);

		         var xScale2 = d3.scale.ordinal()
		         					 .domain(domain2)
		         					 //.domain([Math.pow(10,7), Math.pow(10,12)])
		         					 //.range([padding_l, w - padding_r * 2]);
		         					 .range(range2);

		         var yScale2 = d3.scale.linear()
		         					 .domain([0, 5e12])
		         					 //.domain([Math.pow(10,11), Math.pow(10,13)])
		         					 //.domain([Math.pow(10,7), Math.pow(10,12)])
		         					 .range([h2 - padding_y2, padding_y2_top]);
		         var xScale3 = d3.scale.ordinal()
		         					 .domain(domain2)
		         					 //.domain([Math.pow(10,7), Math.pow(10,12)])
		         					 //.range([padding_l, w - padding_r * 2]);
		         					 .range(range2);

		         var yScale3 = d3.scale.linear()
		         					 .domain([0, 1.5e12])
		         					 //.domain([Math.pow(10,11), Math.pow(10,13)])
		         					 //.domain([Math.pow(10,7), Math.pow(10,12)])
		         					 .range([h2 - padding_y2, padding_y2_top]);


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

		         //Define X axis
		         var xAxis2 = d3.svg.axis()
		         				  .scale(xScale2)
		         				  .orient("bottom")
                                                          //.innerTickSize(-h+padding*2)
		         				  .ticks(5);
                                                          //.tickFormat(function(d) { return make_log_bi(d) });
                                                          //.tickFormat(function(d) { return "$" + Math.round(d/1e06)});

		         //Define Y axis
		         var yAxis2 = d3.svg.axis()
		         				  .scale(yScale2)
		         				  .orient("left")
                                                          //.innerTickSize(-w+padding*3)
                                                           .tickPadding(10)
                                                          .tickFormat(function(d) {
                                                            return d/1e09;
                                                           })
		         				  .ticks(5);
                                                          //.tickFormat(function(d) { return make_log_bi(d) });

		         //Define X axis
		         var xAxis3 = d3.svg.axis()
		         				  .scale(xScale3)
		         				  .orient("bottom")
                                                          //.innerTickSize(-h+padding*2)
		         				  .ticks(5);
                                                          //.tickFormat(function(d) { return make_log_bi(d) });
                                                          //.tickFormat(function(d) { return "$" + Math.round(d/1e06)});

		         //Define Y axis
		         var yAxis3 = d3.svg.axis()
		         				  .scale(yScale3)
		         				  .orient("left")
                                                          //.innerTickSize(-w+padding*3)
                                                           .tickPadding(10)
                                                          .tickFormat(function(d) {
                                                            return d/1e09;
                                                           })
		         				  .ticks(5);


		         //Create SVG element
		         var svg = d3.select("#div1")
		         			.append("svg")
		         			.attr("width", w)
		         			.attr("height", h);

		         var svg2 = d3.select("#div2")
		         			.append("svg")
		         			.attr("width", w+20)
		         			.attr("height", h2);

		         var svg3 = d3.select("#div3")
		         			.append("svg")
		         			.attr("width", w+20)
		         			.attr("height", h2);




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


		         
                         var year_x = 380;
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

                         svg.append("image")
                                .attr("xlink:href", "forward.png")
                                .attr("class", "next_icon")
                                .attr("x", year_x+20)
                                .attr("y", padding_y_top-50)
                                .attr("width", "20")
                                .attr("height", "20");

                         svg.append("image")
                                .attr("xlink:href", "back.png")
                                .attr("class", "previous_icon")
                                .attr("x", year_x-70)
                                .attr("y", padding_y_top-50)
                                .attr("width", "20")
                                .attr("height", "20");

                         append_text(svg,520,15,"Gastos do Governo Brasileiro (2004-2011)");
                         append_text(svg,430,40,"Fonte: dados.gov.br");
                         var tyear = append_text(svg,year_x,padding_y_top-35,year);

                         do_label_pos(svg,xScale,yScale);
		         
		         
		         //Create X axis
		         svg.append("g")
		         	.attr("class", "axis")
		         	.attr("transform", "translate(0," + (h - padding_y) + ")")
		         	.call(xAxis);
		         
		         //Create Y axis
		         svg.append("g")
		         	.attr("class", "axis")
		         	.attr("transform", "translate(" + padding_l + ",0)")
		         	.call(yAxis);

		         //Create X axis
		         svg2.append("g")
		         	.attr("class", "axis")
		         	.attr("transform", "translate(0," + (h2 + - padding_l) + ")")
		         	.call(xAxis2);
		         
		         //Create Y axis
		         svg2.append("g")
		         	.attr("class", "axis")
		         	//.attr("transform", "translate(" + 900 + padding_l + ",0)")
		         	.attr("transform", "translate(" + padding_l   + ",0)")
		         	.call(yAxis2);

		         //Create X axis
		         svg3.append("g")
		         	.attr("class", "axis")
		         	.attr("transform", "translate(0," + (h2 + - padding_l) + ")")
		         	.call(xAxis3);
		         
		         //Create Y axis
		         svg3.append("g")
		         	.attr("class", "axis")
		         	//.attr("transform", "translate(" + 900 + padding_l + ",0)")
		         	.attr("transform", "translate(" + padding_l   + ",0)")
		         	.call(yAxis3);


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

                        //Make second chart

                         var cols = ["pib"];
                         do_second_plot(svg2,data,cols,year,xScale2,yScale2,h);

                         append_text(svg2,w-padding_r+40,padding_y2_top+17,"PIB");
                         /*append_text(svg2,w-padding_r+90, padding_y2_top + 150,"Gasto Total");
                         append_text(svg2,w-padding_r+120, padding_y2_top + 200,"Gasto c/ Pessoal");*/

                         svg2.append("text")
                            .attr("class", "xlabel")
                            .attr("text-anchor", "end")
                            .attr("x", w * 0.5)
                            .attr("y", h2 - padding_y2 + 40)
		            .attr("font-weight", "bold")
                            .text("Ano");

                         svg2.append("text")
                            .attr("class", "ylabel")
                            .attr("text-anchor", "end")
                            .attr("x", -w * 0.05)
                            .attr("y", 1)
                            .attr("dy", ".75em")
                            .attr("transform", "rotate(-90)")
		            .attr("font-weight", "bold")
                            .text("R$ (bi)");

                         var cols = ["total", "pessoal"];
                         do_second_plot(svg3,data,cols,year,xScale3,yScale3,h+h2);

                         //append_text(svg3,w-padding_r+40,padding_y2_top+30,"PIB");
                         append_text(svg3,w-padding_r+90, padding_y2_top + 20,"Gasto Total");
                         append_text(svg3,w-padding_r+120, padding_y2_top + 95,"Gasto c/ Pessoal");

                         svg3.append("text")
                            .attr("class", "xlabel")
                            .attr("text-anchor", "end")
                            .attr("x", w * 0.5)
                            .attr("y", h2 - padding_y2 + 40)
		            .attr("font-weight", "bold")
                            .text("Ano");

                         svg3.append("text")
                            .attr("class", "ylabel")
                            .attr("text-anchor", "end")
                            .attr("x", -w * 0.05)
                            .attr("y", 1)
                            .attr("dy", ".75em")
                            .attr("transform", "rotate(-90)")
		            .attr("font-weight", "bold")
                            .text("R$ (bi)");

                        //Transitions

                         d3.select(".next_icon")
                          .on("click", function() {
                           year = get_next_year(year,1);
                           vy = 'values' + year;
                           dataset = data[vy];

                           tyear.text(year);

		           svg.selectAll("circle")
		            .data(dataset);
                           do_circle_pos(svg,xScale,yScale);

		           svg.selectAll(".label")
		            .data(dataset);
                           do_label_pos(svg,xScale,yScale);
                           cols = ["pib"];
                           update_second_plot(svg2,data,cols,year,xScale2,yScale2);
                           cols = ["total", "pessoal"];
                           update_second_plot(svg3,data,cols,year,xScale3,yScale3);
                         });
                         d3.select(".previous_icon")
                          .on("click", function() {
                           year = get_next_year(year,-1);
                           vy = 'values' + year;
                           dataset = data[vy];

                           tyear.text(year);

		           svg.selectAll("circle")
		            .data(dataset);
                           do_circle_pos(svg,xScale,yScale);

		           svg.selectAll(".label")
		            .data(dataset);
                           do_label_pos(svg,xScale,yScale);
                           cols = ["pib"];
                           update_second_plot(svg2,data,cols,year,xScale2,yScale2);
                           cols = ["total", "pessoal"];
                           update_second_plot(svg3,data,cols,year,xScale3,yScale3);
                         });
                       };

