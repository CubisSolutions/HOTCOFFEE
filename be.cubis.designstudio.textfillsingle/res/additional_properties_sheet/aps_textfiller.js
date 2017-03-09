sap.designstudio.sdk.PropertyPage.subclass("be.cubis.designstudio.textfillsingle.TextFillSinglePropertyPage",  
function() 
{
	var me = this;
	
	me.init = function()
	{		
		$("#form").submit(function()
		{
			// Labelpos - label position
			if ( $('#aps_labelpos_lefttop').prop('checked') == true )
			{
				me._labelpos = 'lefttop' ;
			}
			if ( $('#aps_labelpos_righttop').prop('checked') == true )
			{
				me._labelpos = 'righttop' ;
			}
			if ( $('#aps_labelpos_leftbot').prop('checked') == true )
			{
				me._labelpos = 'leftbot' ;
			}
			if ( $('#aps_labelpos_rightbot').prop('checked') == true )
			{
				me._labelpos = 'rightbot' ;
			}
			
			me._textsize = $("#aps_textsize").val();
			
			// barfill
			if( $('#aps_barfill').prop('checked') == true )
			{
				me._barfill = 'yes' ;
			}
			else if( $('#aps_barfill').prop('checked') == false )
			{
				me._barfill = 'no' ;
			}
			
			//me._borderline = $("input:radio[name=borderline]:checked").val();
			if( $('#aps_borderline').prop('checked') == true )
			{
				me._borderline = 'yes' ;
			}
			else if( $('#aps_borderline').prop('checked') == false )
			{
				me._borderline = 'no' ;
			}
			
			// pcvalue - Label
			if( $('#aps_pcvalue').prop('checked') == true )
			{
				me._pcvalue = 'yes' ;
			}
			else if( $('#aps_pcvalue').prop('checked') == false )
			{
				me._pcvalue = 'no' ;
			}
			
			// update properties on component
			me.firePropertiesChanged(["textsize","barfill","borderline","pcvalue","labelpos"]);
			return false;
		});
		
		$("#aps_barfillcolor").click(function()
		{
			me.openPropertyDialog("progressFillColorCode");
		});
		
	};	
	
	me.redraw = function() 
	{
		eclipse_logJavaScriptMessage("redraw function activated.");
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

function toggle_label()
{
	$("#lbl_position").collapse("toggle");
};
function toggle_background()
{
	$("#barfrill_color").collapse("toggle");
};