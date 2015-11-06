
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
                          return "#0D50AB";
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
