
                        function make_log_bi(d) {
                         var l = Math.log10(d); 
                         if(l == Math.round(l))
                         { 
                          return d/1e09;
                         }
                         else
                         {
                          return "";
                         }
                        };
                        
                        function choose_color(d) {
                         if(d > 0.75)
                         { 
                          return "#FF3D00";
                         }
                         else if(d > 0.25)
                         {
                          return "#FBFE00";
                         }
                         else
                         {
                          return "#CDDAFB";
                         }
                        };

                        function circle_legend(svg, v, y) {
                         svg.append("circle")
                          .attr("cx", 800)
                          .attr("cy", y)
                          .style("fill", function(d) {
                            return choose_color(v);
                           })
                          .attr("r", 10);
                        };

                        function rec_legend(svg, v, x, w) {
                           svg.append("rect")
                            .attr("x", x)
                            .attr("y", 90)
                            .attr("width", w)
                            .style("fill", function(d) {
                             return choose_color(v);
                            })
                            .attr("height", 15);
                        };

                        function append_text(svg,x,y,t) {
                         var t = svg.append("text")
                            .attr("text-anchor", "end")
                            .attr("x", x)
                            .attr("y", y)
		            .attr("font-weight", "bold")
                            .text(t);
                         return t;
                        };

                        function do_circle_pos(svg,xScale,yScale) 
                        {
		         svg.selectAll("circle")
		            .attr("cx", function(d) {
		            		return xScale(d[0]);
		            })
		            .attr("cy", function(d) {
		            		return yScale(d[1]);
		            })
		            .attr("r", function(d) {
		            		return 17;
		            })
                            .style("fill", function(d) { return choose_color(d[0]/(d[0]+d[1])); });
                        };

                        function do_label_pos(svg,xScale,yScale) 
                        {
		         svg.selectAll("text").filter(".label")
		            .text(function(d) {
		            		//return d[0] + "," + d[1];
                                         return d[2];
		            })
		            .attr("x", function(d) {
		            		return xScale(d[0]) - 7;
		            })
		            .attr("y", function(d) {
		            		return yScale(d[1]) + 4;
		            })
                        };
                        function get_next_year(year, delta)
                        {
                         var years = [2004,2005,2006,2007,2008,2009,2011];
                         var idf = years.indexOf(year);
                         var idf1 = idf + delta;
                         if (idf1 >= 0 && idf1 < years.length)
                         {
                          return years[idf1];
                         }
                         else
                         {
                          return years[idf];
                         }
                         
                        };
                        function do_second_plot(svg,data,cols,year,xScale,yScale,h1)
                        {
                         var line = d3.svg.line()
                           .x(function(d) { return xScale(d[0]); })
                           .y(function(d) { return yScale(d[1]); });


                         for (var i = 0; i < cols.length; i++)
                         {

                          var color = "#7887AB";
                          var cl = cols[i];
                          var dataset2 = data[cl];

		          svg.selectAll("." + cl)
		            .data(dataset2)
		            .enter()
		            .append("circle")
                            .attr("class", cl)
		            .attr("cx", function(d) {
		            		return xScale(d[0]);
		            })
		            .attr("cy", function(d) {
		            		return yScale(d[1]);
		            })
		            .attr("r", function(d) {
                             if (d[0] == year)
                             {
                              return 8;
                             }
                             else
                             {
                              return 5;
                             }
                            })
                            .style("fill", color);

	         	   svg.selectAll("." + cl)
                            .on("mouseover", function(d) {

		         		//Get this bar's x/y values, then augment for the tooltip
		         		var xPosition = parseFloat(d3.select(this).attr("cx")) + 20;
		         		var yPosition = h1 + parseFloat(d3.select(this).attr("cy")) + 20;

		         		//Update the tooltip position and value
		         		d3.select("#tooltip2")
		         			.style("left", xPosition + "px")
		         			.style("top", yPosition + "px")						
		         			.select("#value")
		         			.text(Math.round(d[1]/1e09));

		                        d3.select("#tooltip2")
		                        	.select("#text")
		                        	.text(d3.select(this).attr("class"));
		            
		         		//Show the tooltip
		         		d3.select("#tooltip2").classed("hidden", false);


		            })
		            .on("mouseout", function() {
		            
		         		//Hide the tooltip
		         		d3.select("#tooltip2").classed("hidden", true);
		         		
		            });

                          svg.append("path")
                          .datum(dataset2)
                          .attr("d", line)
                          .attr("stroke", color)
                          .attr("stroke-width" , 3)
                          .attr("fill", "none");
                         }
                        }
                        function update_second_plot(svg,data,cols,year,xScale,yScale)
                        {
                         for (var i = 0; i < cols.length; i++)
                         {

                          var cl = cols[i];
                          var dataset2 = data[cl];

		          svg.selectAll("." + cl)
		            .attr("r", function(d) {
                             if (d[0] == year)
                             {
                              return 8;
                             }
                             else
                             {
                              return 5;
                             }
                            });

                         }
                        }

