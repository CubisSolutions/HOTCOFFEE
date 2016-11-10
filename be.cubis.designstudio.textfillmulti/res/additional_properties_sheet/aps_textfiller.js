sap.designstudio.sdk.PropertyPage.subclass("be.cubis.designstudio.textfillmulti.TextFillMultiPropertyPage",  
function() 
{
	var me = this;
	
	me.init = function()
	{
		$("#form").submit(function()
		{
			me._textsize = $("#aps_textsize").val();
			me._barfill = $("input:radio[name=barfill]:checked").val();
			me._borderline = $("input:radio[name=borderline]:checked").val();
			me._labelpos = $("input:radio[name=labelpos]:checked").val();
			me._pcvalue = $("input:radio[name=pcvalue]:checked").val();
			
			me._maxvalue = $("#aps_maxvalue").val();
			
			me.firePropertiesChanged(["labelpos","textsize","barfill","borderline","pcvalue","maxvalue"]);
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
		$("#aps_maxvalue").val(me._maxvalue); 
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
//		eclipse_logJavaScriptMessage("just a test from pcvalue","warn");
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

	me.maxvalue = function(value)
	{
		//eclipse_logJavaScriptMessag("Max value has been used:" + value , "warn");
		if(value === undefined)
			{
			return me._maxvalue;
			}
		else
			{
			me._maxvalue = value;
			me.redraw();
			return me;
			}
	};	
	
	
});

