sap.designstudio.sdk.PropertyPage.subclass("com.sap.sample.scngauge.SCNGaugePropertyPage",  
function() 
{
	var me = this;
	
	me._text = '';
	me._width = 0;
	
	me.init = function()
	{
		$("#form").submit(function()
		{
			me._text = $("#aps_text").val();
			me._width = $("#aps_width").val();
			
			me.firePropertiesChanged(["text", "width"]);
			
			return false;
		});
		me.redraw();
	};
	
	me.text = function(textvalue)
	{
		 if (textvalue === undefined) 
		  {
			 return me._text
		  }
		  else
		  {
			  me._text = textvalue;
			  me.redraw();
			  return me;
		  }
	};
	
	me.width = function(widthvalue)
	{
		if(widthvalue === undefined)
			{
			return me._width
			}
		else
			{
				me._width = widthvalue;
				me.redraw();
				return me;
			}
	};
	
	me.redraw = function()
	{
		$("#aps_text").val(me._text);
		$("#aps_width").val(me._width);
	}
});

