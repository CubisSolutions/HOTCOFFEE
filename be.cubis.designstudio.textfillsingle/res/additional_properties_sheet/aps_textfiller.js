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
			me._dtype = $("input:radio[name=dtype]:checked").val();
			me._labelpos = $("input:radio[name=labelpos]:checked").val();
			me._textsize = $("#aps_textsize").val();
			me.firePropertiesChanged(["text","dtype","labelpos","textsize"]);
			return false;
		});
		
	};
	
	me.redraw = function() 
	{
		  $("#aps_text").val(me._text);
		  $('input:radio[value=' + me._dtype + ']').attr('checked',true);
		  $('input:radio[value=' + me._labelpos + ']').attr('checked',true);
		  $("#aps_textsize").val(me._textsize);
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
			 me.redraw();
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
			me.redraw();
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
			me.redraw();
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
			me.redraw();
			return me;
			}
	};
});

