sap.designstudio.sdk.PropertyPage.subclass("be.cubis.designstudio.textfillmulti.textFillMultiPropertyPage",  
function() 
{
	var me = this;
	me._text = "";
	
	me.init = function()
	{		
		eclipse_logJavaScriptMessage("aps_text --- fire init function");
		
		$("#form").submit(function()
		{
			eclipse_logJavaScriptMessage("aps_text --- Form submit function");

			me._text = $("aps_text").val();
			me.firePropertiesChanged(["text"]);
			return false;
		});
	};
	
	
	// Getters & Setters
	this.text = function(textvalue)
	{
		eclipse_logJavaScriptMessage("aps_text --- fire text setter/getter");
		eclipse_logJavaScriptMessage("aps_text --- Value : " + textvalue + " --- ");
		 if (textvalue === undefined) 
		  {
			 return me._text;		 
		  }
		  else
		  {
			  me._text = textvalue;
			  return me;
		  }
	};
});

