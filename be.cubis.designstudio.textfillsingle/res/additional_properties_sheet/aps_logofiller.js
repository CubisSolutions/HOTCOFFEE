sap.designstudio.sdk.PropertyPage.subclass("be.cubis.designstudio.textfillsingle.TextFillSinglePropertyPage",  
function() 
{
	var me = this;
	
	me.init = function()
	{
		$("#form").submit(function()
		{			
			me.firePropertiesChanged(["WIDTH", "HEIGHT"]);
			return false;
		});
		
	};
	
	// setter width
	me.WIDTH = function(value)
	{
		if(value === undefined)
			{
			return $("#aps_width").val();
			}
		else
			{
			$("#aps_width").val(value);
			return me;
			}
		
	};
	
	// setter height
	me.HEIGHT = function(value)
	{
		if(value === undefined)
			{
			return $("#aps_height").val();
			}
		else
			{
			$("#aps_height").val(value);
			return me;
			}
		
	};
	// setter height
	me.d = function(value)
	{
		if(value === undefined)
			{
			return $("#aps_path").val();
			}
		else
			{
			$("#aps_path").val(value);
			return me;
			}
		
	};
		
});