sap.designstudio.sdk.PropertyPage.subclass("com.sap.sample.scngauge.SCNGaugePropertyPage",  
function() 
{
	var me = this;
	var strlen = 0;
	me._width = 20;
	
	me.init = function()
	{
		$("#form").submit(function()
		{
			//me._width = $("#aps_text").length() * 10;
			strlen = $("#aps_text").val().length;
			me._width = (strlen * 26);
			me.firePropertiesChanged(["text","WIDTH"]);
			return false;
		});
	};
	
	me.text = function(textvalue)
	{
		 if (textvalue === undefined) 
		  {
			 return $("#aps_text").val();			 
		  }
		  else
		  {
			  $("#aps_text").val(text(textvalue));
			  return me;
		  }
	};
	
	// setter width
	me.WIDTH = function(widthvalue)
	{
		if(widthvalue === undefined)
			{
			return me._width;//$("#aps_width").val();
			}
		else
			{
			$("#aps_width").val(widthvalue);
			return me;
			};
	};
});

