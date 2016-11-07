sap.designstudio.sdk.PropertyPage.subclass("be.cubis.designstudio.textfillmulti.TextFillMultiPropertyPage",  
function() 
{
	var me = this;
	var dimensions = [];
	
	me.init = function()
	{
		$("#form").submit(function()
		{
			//me._text = $("#aps_text").val();
			//me._dtype = $("input:radio[name=dtype]:checked").val();
			//me._labelpos = $("input:radio[name=labelpos]:checked").val();
//			me._textsize = $("#aps_textsize").val();
//			me._barfill = $("input:radio[name=barfill]:checked").val();
//			me._borderline = $("input:radio[name=borderline]:checked").val();
			
			// update component.js
			//me.firePropertiesChanged(["textsize","barfill","borderline"]);
			return false;
		});
	};
	
	me.redraw = function() 
	{
		  //$("#aps_text").val(me._text);
		  //$('input:radio[value=' + me._dtype + ']').attr('checked',true);
		  //$('input:radio[value=' + me._labelpos + ']').attr('checked',true);
//		  $("#aps_textsize").val(me._textsize);
//		  $('input:radio[name=barfill][value=' + me._barfill + ']').attr('checked',true);
//		  $('input:radio[name=borderline][value=' + me._borderline + ']').attr('checked',true);
		  
		  // test code - tijdelijk
////		  var test = "test value uit js"; // test = OK
////		  eclipse_logJavaScriptMessage("APS test = " + test ,"log");
//		  
//		  var test2 = me.callRuntimeHandler("getMetadata");
//		  
//		  eclipse_logJavaScriptMessage("APS getMetadata = " + test2 ,"log");
//		  
//		  $("#aps_member").val(test2);
////		  $("#aps_dimension").html("<option value='volvo'>Volvo</option>");
		  
	};

	
});

