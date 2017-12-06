		
define(["sap/designstudio/sdk/component", "d3", "../js/ckeditor/ckeditor", "css!../css/component.css"], function foo(Component, d3, ckeditor, css) {
	Component.subclass("be.cubis.designstudio.commentbox.CommentBox", function faa() {	
		
		var that = this;
		var me = this;

		var testcdk = '';
		var getFilters = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
		var NOD = 0;
		
		//variablen voor properties (in volgorde)
		me._width 	 	= 300;
		me._height   	= 250;
		me._commentPathWrite = 'http://server:portnumber/hostpath/service';
		me._serviceParameter = 'filter';
		me._btnMarginR	= 10;
		me._btnMarginB	= 10;
		me._btnRadius	= 20;
		me._colorSave	= '#27ae60';
		me._colorEdit	= '#3498db';
		me._colorDel	= '#e74c3c';
		var colorCurrent= '';
		
		//variabelen voor javascript	
		var iconSave 	= "https://www.materialui.co/materialIcons/content/save_white_192x192.png";
		var iconEdit 	= "https://www.materialui.co/materialIcons/image/edit_white_192x192.png";
		var iconDel 	= "https://www.materialui.co/materialIcons/action/delete_white_192x192.png";
		var iconCurrent = "";
		var animationDuration = 200;
		var opacityZoom = 0.2;
		var btnRadiusZoom = 10;
		var btnRadiusClick = 3;
		var btnSpacing = 7;
		var theDiagram;
		var textGroup;
		var editorTop;
		var editorTopL;
		var editorTopH = 40;
		var editorBtnSave;
		var editorBtnSend;
		var editorIconSave;
		var editorBtnDel;
		var editorIconDel;
		var isReadOnly = false;
		var isAnimating = false;
		//border width of the editor
		var CKborderW = '2'; //2x1

		//start functie
		me.init = function() {
			this.CKReplacedOnce = false;
			iconCurrent = iconEdit;
			colorCurrent= me._colorEdit;
			me.redraw();
		};
		
		//Set width
		me.setWidth = function() {
			me._width = this.$().width();
			return me;
		};
		
		//Set height
		me.setHeight = function(value) {
			me._height = this.$().height();
			return me;
		};
				  
		//Getters and Setters hostpath
		me.commentPathWrite = function(value) {
			if (value === undefined) 
			{
				return me._commentPathWrite;
			} 
			else 
			{
				me._commentPathWrite = value;
				me.redraw();
				return me;
			}
		};
		
		//Getters and Setters filtet parameter
		me.serviceParameter = function(value) {
			if (value === undefined) 
			{
				return me._serviceParameter;
			} 
			else 
			{
				me._serviceParameter = value;
				me.redraw();
				return me;
			}
		};
				  
		//Getters and Setters margin right button
		me.btnMarginR = function(value) {
			if (value === undefined) 
			{
				return me._btnMarginR;
			} 
			else 
			{
				me._btnMarginR = value;
				me.redraw();
				return me;
			}
		};
				  
		//Getters and Setters margin bottom button
		me.btnMarginB = function(value) {
			if (value === undefined) 
			{
				return me._btnMarginB;
			} 
			else 
			{
				me._btnMarginB = value;
				me.redraw();
				return me;
			}
		};
				  
		//Getters and Setters button radius
		me.btnRadius = function(value) {
			if (value === undefined) 
			{
				return me._btnRadius;
			} 
			else 
			{
				me._btnRadius = value;
				btnSpacing = me._btnRadius/3;
				me.redraw();
				return me;
			}
		};
				  
		//Getters and Setters color save button
		me.colorSave = function(value) {
			if (value === undefined) 
			{
				return me._colorSave;
			} 
			else 
			{
				me._colorSave = value;
				colorCurrent = me._colorSave;
				iconCurrent = iconSave;
				me.redraw();
				return me;
			}
		};
				  
		//Getters and Setters color edit button
		me.colorEdit = function(value) {
			if (value === undefined) 
			{
				return me._colorEdit;
			} 
			else 
			{
				me._colorEdit = value;
				colorCurrent = me._colorEdit;
				iconCurrent = iconEdit;
				me.redraw();
				return me;
			}
		};
				  
		//Getters and Setters color edit button
		me.colorDel = function(value) {
			if (value === undefined) 
			{
				return me._colorDel;
			} 
			else 
			{
				me._colorDel = value;
				me.redraw();
				return me;
			}
		};
			
		//functie voor het heraanmaken van de component
		me.redraw = function(){
			me.setWidth();
			me.setHeight();
			
			//alles verwijderen en hertekenen
			var myDiv = me.$()[0];
			d3.select(myDiv).selectAll("*").remove();
			theDiagram = d3.select(myDiv)
								.append("svg:svg")
								.attr("width", "100%")
								.attr("height", "100%");
			//aanmaken van een textgroup voor het overlappen van figuren
			textGroup = theDiagram.append("g");
			//rechthoek ter visualisatie van de editor
			editorBody = textGroup.append("rect")
				.attr("x", 0)
				.attr("y", 0)
			    .attr("width", me._width)
			    .attr("height", me._height)
				.attr("fill", 'white')
				.attr("stroke", '#ccc');
			//extra rechthoek voor toolbar
			editorTop = textGroup.append("rect")
				.attr("x", 1)
				.attr("y", 1)
			    .attr("width", me._width - 2)
			    .attr("height", editorTopH)
				.attr("fill", '#f8f8f8');
			//extra lijn voor onder de toolbar
			editorTopL = textGroup.append("line")
				.attr("x1", 1)
				.attr("x2", me._width - 1)
				.attr("y1", 42)
				.attr("y2", 42)
				.attr("stroke", '#d1d1d1')
				.attr("stroke-width", 1);
			//aanmaken van textarea voor comments
			editorFO = textGroup.append("foreignObject")
				.attr("x", 0)
				.attr("y", 0)
			    .attr("width", me._width)
			    .attr("height", me._height)
			    .append("xhtml:body")
			    .html('<textarea id="tekstvak" name="tekstvak" class="tekstvak"></textarea>');
			//delete knop
			editorBtnDel = textGroup.append("circle")
				.attr("cx", me._width - me._btnRadius - me._btnMarginR)
				.attr("cy", me._height - (3 * me._btnRadius) - me._btnMarginB - btnSpacing)
				.attr("r", 0)
				.attr("fill", me._colorDel);
			editorIconDel = textGroup.append("image")
				.attr("xlink:href", iconDel)
				.attr("x", me._width - me._btnRadius - me._btnMarginR)
				.attr("y", me._height - (3 * me._btnRadius) - me._btnMarginB - btnSpacing)
			    .attr("width", 0)
			    .attr("height", 0);
			//send knop
			editorBtnSend = textGroup.append("circle")
				.attr("cx", me._width - (me._btnRadius + me._btnMarginR))
				.attr("cy", me._height - (me._btnRadius + me._btnMarginB))
				.attr("r", me._btnRadius)
				.attr("fill", colorCurrent);
			editorIconSend = textGroup.append("image")
				.attr("xlink:href", iconCurrent)
				.attr("x", me._width - ((1.7 * me._btnRadius) + me._btnMarginR))
				.attr("y", me._height - ((1.7 * me._btnRadius) + me._btnMarginB))
			    .attr("width", (1.4 * me._btnRadius))
			    .attr("height", (1.4 * me._btnRadius));
		};
		
		function initHandlers() {
			// mouseOver editor
			textGroup
				.on("mouseover", editorMouseOver)
				.on("mouseout", editorMouseOut);
			
			// onClick send button
			editorBtnSend
				.on("mousedown", handleClickSend);
			editorIconSend
				.on("mousedown", handleClickSend);
			
			// onClick delete button
			editorBtnDel
				.on("mousedown", animateClickDel)
			editorIconDel
				.on("mousedown", animateClickDel)
				
				
		}
		
		function handleClickSend() {
			CKEDITOR.instances['tekstvak'].setReadOnly( isReadOnly );
			// Animations start now
			isAnimating = true;
			if(isReadOnly)
			{
				animateSendOut();
				animateDelOut();
				
				
//				that.fireEvent("onclick");		// Robin
				var allFilters = getFilters.join("");	// Robin
				
				var myVar = setTimeout(myTimer, 500);
				function myTimer() {
					//creating variables for sending to the db
					if(allFilters != ""){
						var details = {
						    'COMMENT': testcdk.getData() == "" ? "<!--empty string-->" : testcdk.getData(),
						    'filter': allFilters
						};
						var formBody = [];
						for (var property in details) {
						  var encodedKey = encodeURIComponent(property);
						  var encodedValue = encodeURIComponent(details[property]);
						  formBody.push(encodedKey + "=" + encodedValue);
						}
						formBody = formBody.join("&");
						fetch(me._commentPathWrite, {
						  method: 'POST',
						  headers: {
						    'Accept': 'application/json',
						    'Content-Type': 'application/x-www-form-urlencoded'
						  },
						  body: formBody
						})
						//success
//						alert("your annotation has been send to the server");
					}else{
						//failure
						alert("Geen filters geselecteerd!");
					}
				}	
		    } 			
			else
			{
				animateSendIn();
				animateDelIn();				
			}
			isReadOnly = !isReadOnly;
		}
		
		function handleClickDel() {
			if(isReadOnly)
			{
				CKEDITOR.instances['tekstvak'].setData('');
			}
		}
		
		function endAnimation() {
			isAnimating = false;
		}
		
		function animateSendIn() {
			editorBtnSend
				.transition()
				.duration(animationDuration/2)
				.attr("r", me._btnRadius - btnRadiusClick)
				.transition()
				.delay(animationDuration/2)
				.duration(animationDuration/2)
				.attr("fill", me._colorSave)
				.attr("r", me._btnRadius);
			colorCurrent = me._colorSave;
			editorIconSend
				.transition()
				.duration(animationDuration/2)
				.attr("x", me._width - me._btnRadius - me._btnMarginR)
				.attr("y", me._height - me._btnRadius - me._btnMarginB)
				.attr("width", 0)
				.attr("height", 0)
				.transition()
				.delay(animationDuration/2)
				.duration(animationDuration/2)
				.attr("xlink:href",iconSave)
				.attr("x", me._width - ((1.7 * me._btnRadius) + me._btnMarginR))
				.attr("y", me._height - ((1.7 * me._btnRadius) + me._btnMarginB))
			    .attr("width", (1.4 * me._btnRadius))
			    .attr("height", (1.4 * me._btnRadius))
			    .each("end", endAnimation);
		}
		
		function zoomSendIn() {
			editorBtnSend
				.transition()
				.duration(animationDuration)
				.attr("fill", isReadOnly ? me._colorSave : me._colorEdit)
				.attr("opacity", 1)
				.attr("r", me._btnRadius);
			editorIconSend
				.transition()
				.duration(animationDuration)
				.attr("x", me._width - ((1.7 * me._btnRadius) + me._btnMarginR))
				.attr("y", me._height - ((1.7 * me._btnRadius) + me._btnMarginB))
			    .attr("width", (1.4 * me._btnRadius))
			    .attr("height", (1.4 * me._btnRadius));
		}
		
		function animateSendOut() {
			editorBtnSend
				.transition()
				.duration(animationDuration/2)
				.attr("r", me._btnRadius - btnRadiusClick)
				.transition()
				.delay(animationDuration/2)
				.duration(animationDuration/2)
				.attr("fill", me._colorEdit)
				.attr("r", me._btnRadius);
			colorCurrent = me._colorEdit;
			editorIconSend
				.transition()
				.duration(animationDuration/2)
				.attr("x", me._width - me._btnRadius - me._btnMarginR)
				.attr("y", me._height - me._btnRadius - me._btnMarginB)
				.attr("width", 0)
				.attr("height", 0)
				.transition()
				.delay(animationDuration/2)
				.duration(animationDuration/2)
				.attr("xlink:href",iconEdit)
				.attr("x", me._width - ((1.7 * me._btnRadius) + me._btnMarginR))
				.attr("y", me._height - ((1.7 * me._btnRadius) + me._btnMarginB))
			    .attr("width", (1.4 * me._btnRadius))
			    .attr("height", (1.4 * me._btnRadius))
			    .each("end", endAnimation);
		}

		function zoomSendOut() {
			editorBtnSend
				.transition()
				.duration(animationDuration)
				.attr("fill", isReadOnly ? me._colorSave : me._colorEdit)
				.attr("opacity", opacityZoom)
				.attr("cx", me._width - me._btnRadius - me._btnMarginR)
				.attr("cy", me._height - me._btnRadius - me._btnMarginB)
				.attr("r", btnRadiusZoom);
			editorIconSend
				.transition()
				.duration(animationDuration)
				.attr("x", me._width - me._btnRadius - me._btnMarginR)
				.attr("y", me._height - me._btnRadius - me._btnMarginB)
			    .attr("width", 0)
			    .attr("height", 0);
		}
		
		function animateClickDel() {
			isAnimating = true;
			editorBtnDel
				.transition()
				.duration(animationDuration/2)
				.attr("r", me._btnRadius - btnRadiusClick)
				.transition()
				.delay(animationDuration/2)
				.duration(animationDuration/2)
				.attr("r", me._btnRadius);
			editorIconDel
				.transition()
				.duration(animationDuration/2)
				.attr("x", me._width - ((1.7 * me._btnRadius) + me._btnMarginR - (0.7 * btnRadiusClick)))
				.attr("y", me._height - ((1.7 * me._btnRadius) + me._btnMarginB - (0.7 * btnRadiusClick)) - ((2 * me._btnRadius) + btnSpacing))
			    .attr("width", (1.4 * (me._btnRadius - btnRadiusClick)))
			    .attr("height", (1.4 * (me._btnRadius - btnRadiusClick)))
				.transition()
				.delay(animationDuration/2)
				.attr("x", me._width - ((1.7 * me._btnRadius) + me._btnMarginR))
				.attr("y", me._height - ((1.7 * me._btnRadius) + me._btnMarginB) - ((2 * me._btnRadius) + btnSpacing))
			    .attr("width", (1.4 * me._btnRadius))
			    .attr("height", (1.4 * me._btnRadius))
			    .each("end", endAnimation);
			handleClickDel();
		}
		
		function animateDelIn() {
			editorBtnDel
				.transition()
				.duration(animationDuration)
				.attr("fill", me._colorDel)
				.attr("cx", me._width - (me._btnRadius + me._btnMarginR))
				.attr("cy", me._height - (me._btnRadius + me._btnMarginB) - ((2 * me._btnRadius) + btnSpacing))
				.attr("r", me._btnRadius);
			editorIconDel
				.transition()
				.duration(animationDuration)
				.attr("x", me._width - ((1.7 * me._btnRadius) + me._btnMarginR))
				.attr("y", me._height - ((1.7 * me._btnRadius) + me._btnMarginB) - ((2 * me._btnRadius) + btnSpacing))
			    .attr("width", (1.4 * me._btnRadius))
			    .attr("height", (1.4 * me._btnRadius));
		}
		
		function zoomDelIn() {
			editorBtnDel
				.transition()
				.duration(animationDuration)
				.attr("opacity", 1)
				.attr("cx", me._width - (me._btnRadius + me._btnMarginR))
				.attr("cy", me._height - (me._btnRadius + me._btnMarginB) - ((2 * me._btnRadius) + btnSpacing))
				.attr("r", me._btnRadius);
			editorIconDel
				.transition()
				.duration(animationDuration)
				.attr("x", me._width - ((1.7 * me._btnRadius) + me._btnMarginR))
				.attr("y", me._height - ((1.7 * me._btnRadius) + me._btnMarginB) - ((2 * me._btnRadius) + btnSpacing))
			    .attr("width", (1.4 * me._btnRadius))
			    .attr("height", (1.4 * me._btnRadius));
		}
		
		function animateDelOut() {
			editorBtnDel
				.transition()
				.duration(animationDuration)
				.attr("cx", me._width - me._btnRadius - me._btnMarginR)
				.attr("cy", me._height - (3 * me._btnRadius) - me._btnMarginB - btnSpacing)
				.attr("r", 0);
			editorIconDel
				.transition()
				.duration(animationDuration)
				.attr("x", me._width - me._btnRadius - me._btnMarginR)
				.attr("y", me._height - (3 * me._btnRadius) - me._btnMarginB - btnSpacing)
			    .attr("width", 0)
			    .attr("height", 0);
		}
		
		function zoomDelOut() {
			editorBtnDel
				.transition()
				.duration(animationDuration)
				.attr("opacity", opacityZoom)
				.attr("cx", me._width - me._btnRadius - me._btnMarginR)
				.attr("cy", me._height - (3 * me._btnRadius) - me._btnMarginB - btnSpacing)
				.attr("r", btnRadiusZoom);
			editorIconDel
				.transition()
				.duration(animationDuration)
				.attr("x", me._width - me._btnRadius - me._btnMarginR)
				.attr("y", me._height - (3 * me._btnRadius) - me._btnMarginB - btnSpacing)
			    .attr("width", 0)
			    .attr("height", 0);
		}
		
		//Event Handlers for hover
		function editorMouseOver() {
			if(!isAnimating)
			{
				if(isReadOnly)
				{
					zoomDelIn();
				}
				zoomSendIn();
			}
      	}		

		function editorMouseOut() {
			if(!isAnimating)
			{
				if(isReadOnly)
				{
					zoomDelOut();
				}
				zoomSendOut();
			}
		}
		
		this.componentDeleted = function() {
	    	CKEDITOR.instances['tekstvak'].destroy(true);
	    	CKEDITOR.instances['tekstvak'] = null;
		};
		
		this.afterUpdate = function() {
		    var myToolbarGroups = [];
		    
		    //push default toolbar
		    myToolbarGroups.push({items: [ 'Bold', 'Italic', 'Underline', 'Strike' , 'Link' ]});
		    
	    	//you can run CKCKEDITOR.replace() only once!
		    if(!this.CKReplacedOnce)
		    {
		    	testcdk = CKEDITOR.replace("tekstvak",
    			{ 
		    		toolbar	: myToolbarGroups, 
		    		width	: me._width - CKborderW, 
		    		height	: me._height - (2 * CKborderW) - editorTopH
	    		});
			}
	    	this.CKReplacedOnce = true;

			initHandlers();
	    };	
		
		//set the filter index
		this.indexFilter = function(value) {
				NOD =  value;
		};
		
		//function to retrieve data from the server on filter changed
		this.selectedFilter = function(value) {
			var myVar = setTimeout(myTimer, 200);
			function myTimer() {
				getFilters[NOD] = value;
				var allFilters = getFilters.join("");
				$.ajax({
			       url: me._commentPathWrite+"?"+me._serviceParameter+"="+allFilters,
			       data: '',
			       success: function (resp) {
		        	   testcdk.innerHTML = resp;
		        	   testcdk.setData(resp);
		        	   this.checkFilter = true;
		        	   //that.firePropertiesChanged(["checkFilter"]);
		        	   //me.firePropertiesChanged(["color"]);
					   //alert(me.firePropertiesChanged(["color"]));
		        	   return this.checkFilter;
			       },
			       error: function () {
			    	   this.checkFilter = true;
			    	   //that.firePropertiesChanged(["checkFilter"]);
					   //alert(that.firePropertiesChanged(["checkFilter"]));
			       }
				});
			}
		};
			
		//function to retrieve data from the server on dashboard init
		this.firstFilter = function(value) {
			var myVar = setTimeout(myTimer, 300);
			function myTimer() {
				var test = value.split(',');
				test = test.slice(0,-1);
				for (i=0; i < test.length; i++) {
					getFilters[i] = test[i];
				}
				var allFilters = getFilters.join("");
				
				$.ajax({
				   url: me._commentPathWrite+"?"+me._serviceParameter+"="+allFilters,
				   data: '',
				   success: function (resp) {
					   testcdk.innerHTML = resp;
					   testcdk.setData(resp);
					   this.checkFilter = true;
					   
				   },
				   error: function () {
					   
				   }
				});
			}
		};
	});	
});