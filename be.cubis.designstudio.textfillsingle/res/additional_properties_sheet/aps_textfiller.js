sap.designstudio.sdk.PropertyPage.subclass("be.cubis.designstudio.textfillsingle.TextFillSinglePropertyPage",  
function() 
{
	var me = this;
	me._text = "Cubis";
	me._dtype = "manual";
	
	me.init = function()
	{		
		$("#form").submit(function()
		{
			me._text = $("#aps_text").val();
			me._dtype = "manual";
			me._dtype = $("#aps_type:checked").val();
			me.firePropertiesChanged(["text","dtype"]);
			return false;
		});
		
	};
	
	me.text = function(textvalue)
	{
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
	
	me.dtype = function(radiovalue)
	{
		if(radiovalue === undefined)
		{
			return me._dtype;
		}
		else
		{
			me._dtype = radiovalue;
			return me;
		}
	};
	
});

