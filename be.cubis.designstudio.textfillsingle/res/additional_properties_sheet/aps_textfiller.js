sap.designstudio.sdk.PropertyPage.subclass("be.cubis.designstudio.textfillsingle.TextFillSinglePropertyPage",  
function() 
{
	var me = this;
	
	me.init = function()
	{		
		$("#form").submit(function()
		{
			me._labelpos = $("input:radio[name=labelpos]:checked").val();
			me._textsize = $("#aps_textsize").val();
			me._barfill = $("input:radio[name=barfill]:checked").val();
			me._borderline = $("input:radio[name=borderline]:checked").val();
			me._pcvalue = $("input:radio[name=pcvalue]:checked").val();
			me.firePropertiesChanged(["textsize","barfill","borderline","pcvalue","labelpos"]);
			return false;
		});
	};
	
	me.redraw = function() 
	{
		$("#aps_textsize").val(me._textsize);  
		$('input:radio[name=labelpos][value=' + me._labelpos + ']').attr('checked',true);
		$('input:radio[name=barfill][value=' + me._barfill + ']').attr('checked',true);
		$('input:radio[name=borderline][value=' + me._borderline + ']').attr('checked',true);
		$('input:radio[name=pcvalue][value=' + me._pcvalue + ']').attr('checked',true);
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
	
	me.barfill = function(value)
	{
		if(value === undefined)
			{
			return me._barfill;
			}
		else
			{
			me._barfill = value;
			me.redraw();
			return me;
			}
	};
	
	me.borderline = function(value)
	{
		if(value === undefined)
			{
			return me._borderline;
			}
		else
			{
			me._borderline = value;
			me.redraw();
			return me;
			}
	};
	
	me.pcvalue = function(value)
	{
		if(value === undefined)
			{
			return me._pcvalue;
			}
		else
			{
			me._pcvalue = value;
			me.redraw();
			return me;
			}
	};
	

	
});

