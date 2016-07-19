sap.designstudio.sdk.PropertyPage.subclass("be.cubis.designstudio.textfillsingle.TextFillSinglePropertyPage",  
function() 
{
	var me = this;
	me._text = "Cubis";
	me._dtype = "manual";
	me._labelpos = "lefttop";
	me._textsize = 16;
	
	me.init = function()
	{		
		$("#form").submit(function()
		{
			me._text = $("#aps_text").val();
			me._dtype = $("#aps_type:checked").val();
			me._labelpos = $("#aps_labelpos:checked").val();
			me._textsize = $("#aps_textsize").val();
			me.firePropertiesChanged(["text","dtype","labelpos","textsize"]);
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
	
	me.labelpos = function(labelvalue)
	{
		if(labelvalue === undefined)
			{
			return me._labelpos;
			}
		else
			{
			me._labelpos = labelvalue;
			return me;
			}
	};
	
	me.textsize = function(value)
	{
		if(value === undefined)
			{
			return me._textsize;
			}
		else
			{
			me._textsize = value;
			return me;
			}
	};
});

