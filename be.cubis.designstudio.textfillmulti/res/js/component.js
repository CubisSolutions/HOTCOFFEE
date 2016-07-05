// counter voor id van objecten.
var counter = 1;

sap.designstudio.sdk.Component.subclass("be.cubis.designstudio.textfillmulti.textFillMulti", function() 
{
      
      console.log("initialization of function class");
      
      var me = this;

      //Properties
      me._text = "Cubis";
      me._percentage = null;
      me._meta_data = null;
      me._tuple = null;
      me._size = "50";
  	  
      
      //Methods
      me.init = function() 
      {
            console.log("init method");
            me.redraw();
      };
      
      me.redraw = function() 
      {
            console.log("redraw method");
            var my2Div = me.$()[0];
            
            // Clear any existing gauges.  We'll redraw from scratch
            d3.select(my2Div).selectAll("*").remove();
            
            if (me._percentage === null || me._percentage === "") 
            {
                  me._size = "50";
                  me._text = "Cubis";
                  
                  var svgText = d3.select(my2Div)
                  .append("svg:svg")
                  .attr("width", "100%")
                  .attr("height", "100%");
      
                  //append text to svg
                  svgText.append("text")
                  .style("font-size", "24")
                  .style("font-family", "Verdana")
                  .attr("x", 10)
                  .attr("y", 40)
                  .text(me._text);
            }
            else 
            {
                  console.log(me._percentage.tuples.length+"");
                  var tuple = me._percentage.tuples;
                  
                  
                  for(i=0 ; i < me._percentage.tuples.length; i++)
                  {
                	  	me._ID = counter;                  	  
                	  	counter = counter + 1 ;
                        me._size = me._percentage.formattedData[i];
                        me._text = me._meta_data.dimensions[1].members[tuple[i][1]].text;
                        console.log(me._text);
                        console.log(me._size);
                        if(me._meta_data.dimensions[1].members[tuple[i][1]].type !== "RESULT")
                        {
                             var svgText = d3.select(my2Div)
                             .append("svg:svg")
                             .attr("width", "100%")
                             .attr("height", "100%");
                             
                          // Gradient for masking.
                     		svgText.append("linearGradient")
                             .attr("id","gradientGradient" + me._ID)
                             .attr("x1",0)
                             .attr("y1","50%")
                             .attr("x2", "100%")
                             .attr("y2", "50%")
                             .selectAll("stop")
                             .data([
                               {offset: "0%", color: me._progressColorCode, opacity:1},
                               {offset: (me._size + "%"), color: me._progressColorCode, opacity:1},
                               {offset: (me._size + "%"), color: me._textcolorCode, opacity:1},
                               {offset: "100%", color: me._textcolorCode , opacity:1} 
                             ])
                             .enter().append("stop")
                             .attr("offset", function(d) {return d.offset})
                             
                             .attr("stop-color", function(d) {return d.color})
                             .attr("stop-opacity", function(d){return d.opacity});
                     		
                     		// clipping path
                             svgText.append("clipPath")
                             .attr("id","clip-clip"+ me._ID)
                             .append("text")
                             .text(me._text)
                             .attr("x", 5)
                             .attr("y", 40)
                             .style("font-size", "35px");
                             
                             // masking frame
                             svgText.append("rect")
                             .attr("x",0)
                             .attr("y",0)
                             .attr("height","100%")
                             .attr("width", "100%")
                             .attr("fill", "url(#gradientGradient"+ me._ID +")")
                             .attr("clip-path","url(#clip-clip"+ me._ID +")");
                  
//                             //append text to svg
//                             svgText.append("text")
//                             .style("font-size", me._size + "px") // fixed zetten
//                             .style("font-family", "Verdana")
//                             .attr("x", 10)
//                             .attr("y", 10)
//                             .text(me._text);
                        }
                  }
            }
            
            
      }
                  
      me.percentage = function(value) 
      {
            
            console.log("percentage method");
            
          if (value === undefined) {
            return me._percentage;
          } else {
            me._percentage = value; 
            return me;
          }
        };
        
      me.metadata = function(value) 
      {
            console.log("metadata method");
            
            if (value === undefined) {
                  return me._meta_data;
            } else {
                  me._meta_data = value;
                  me.redraw();
                  return me;
            }
      };
      
   // Colorcode
  	me.textcolorCode = function(value) 
  	{
  	  if (value === undefined)
  	  {
  		  return me._textcolorCode;
  	  } 
  	  else
  	  {
  		  me._textcolorCode = value;
  		  me.redraw();
  		  return me;
  	  }
  	};
  	
  	// ProgressColorcode
  	me.progressColorCode = function(value) 
  	{
  	  if (value === undefined)
  	  {
  		  return me._progressColorCode;
  	  } 
  	  else
  	  {
  		  me._progressColorCode = value;
  		  me.redraw();
  		  return me;
  	  }
  	};
});

		