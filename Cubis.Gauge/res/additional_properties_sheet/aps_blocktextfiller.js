sap.designstudio.sdk.PropertyPage.subclass("com.sap.sample.scngauge.SCNGaugePropertyPage",  
function() 
{
	var me = this;
	
	me.init = function()
	{
		$("#form").submit(function()
		{
			eclipse_logJavaScriptMessage("aps_text --- fire init function","warn");
			me._text = $("#aps_text").val();
			me._datasource = $("#aps_datasource").val();
			me.firePropertiesChanged(["text"]);
			return false;
		});
	};
	
	me.text = function(value)
	{
		eclipse_logJavaScriptMessage("aps_text --- fire text function","warn");
		if(value === undefined){
			return me._text;
		}
		else {
			me._text = $("aps_text").val();
			return me._text;
		}
	};
	
	me.datasource = function(value)
	{
		eclipse_logJavaScriptMessage("aps_text --- fire datasource function","warn");
		if(value === undefined){
			return me._datasource;
		}
		else {
			me._datasource = $("aps_datasource").val();
			return me._datasource;
		}
	};
});

