sap.designstudio.sdk.PropertyPage.subclass("com.sap.sample.scngauge.SCNGaugePropertyPage",  
function() 
{
	var me = this;
	
	me.init = function()
	{
		me.openPropertyDialog("color");
		$("#form").submit(function()
		{
			eclipse_logJavaScriptMessage("aps_text --- fire init function","warn");
			//me._width = $("#aps_text").length() * 10;
			//strlen = $("#aps_text").val().length;
			//me._width = (strlen * 26);
			me.firePropertiesChanged(["text"]);
			return false;
		});
	};
	
	this.text = function(textvalue)
	{
		eclipse_logJavaScriptMessage("aps_text --- " + textvalue );
		 if (textvalue === undefined) 
		  {
			 return $("#aps_text").val();			 
		  }
		  else
		  {
			  $("#aps_text").val(text(textvalue));
			  return this;
		  }
		 eclipse_logJavaScriptMessage("aps_text --- exit text","warn");
	};
});

