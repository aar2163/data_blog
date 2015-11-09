
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
                          return "#7887AB";
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
