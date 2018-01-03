define(["d3", "sap/designstudio/sdk/component", "css!../css/component.css"], 
function(d3, Component, css) 
{
	Component.subclass("be.cubis.designstudio.broadcaster.broadcaster", function() 
	{
		// Self
		var me = this;
		me._senrec;
		me._key 			= "";
		me._value 			= "";
		me._stringArray		= [];
		me._boolArray		= [];
		me._listArray		= [];
		me._storageInit 	= "";
		
		me.init = function()
		{
			localStorage.clear();
			
			window.addEventListener("storage", function (e) 
			{
				var key 	= e.key;
	        	var value 	= me.getStorageItem(key);
	        	
				me.addStorageItem2Array(key, value);
	        });
		}	
		
		me.senrec = function(val)
		{
			if (val === undefined)
			{
				return me._senrec;
			}
			else
			{
				me._senrec = val;
				this.firePropertiesChanged(["senrec"]);
				return this;
			}
		}
		
		me.printArray = function(array)
		{
			var length = array.length;
			for (i = 0; i < length; i++)
			{
				console.log("array[" + i + "]: {" + array[i].key + " : " + array[i].value + "}");
				
			}
		}
		
		me.getStorageItem = function(key)
		{
			if (key !== undefined && key !== null && key !== "")
			{
				return localStorage.getItem(key);
				
//				return value;
			}
		}
		
		me.addStorageItem2Array = function(k, v)
		{
			var type 		= (v === "true" | v === "false") 	? "boolean" 	: (k.split("|").length < 2) ? "string" 			: "list";
			var array 		= (type === "boolean") 				? me._boolArray : (type === "string") 		? me._stringArray	: me._listArray;
			var arrayName	= (type === "boolean") 				? "boolArray" 	: (type === "string") 		? "stringArray"		: "listArray";
			
			if (array !== undefined)
			{
				var key		= (type !== "list") ? k : k.split("|")[0];
				var val		= v;
				var obj 	= {};
				
				obj.key 	= key;
				obj.value	= val;
								
				var length = array.length;
				if (length == 0)
				{
					array.push(obj);
				}
				if (length > 0)
				{
					var replaced = false;
					for (i = 0; i < length; i++)
					{
						if (array[i].key === key)
						{
							array[i] = obj;
							replaced = true;
						}
					}
					if (!replaced)
					{
						array.push(obj);
					}
				}
				
				this.firePropertiesChanged([arrayName]);
				
//				me.printArray(array);
			}
		}
		
		me.key = function(key)
		{
			if (key === undefined)
			{
				return me._key;
			}
			else
			{
				me._key = key;
				this.firePropertiesChanged(["key"]);
				return this;
			}
		}
		
		me.value = function(value)
		{
			if (value === undefined)
			{
				return me._value;
			}
			else
			{
				me._value = value;
				this.firePropertiesChanged(["value"]);
				return this;
			}
		}
		
		me.stringObject = function(obj)
		{
			if (obj === undefined)
			{
				return me._stringObject;
			}
			else
			{
				me._stringObject = obj;
				this.firePropertiesChanged(["stringObject"]);
				return this;
			}
		}
		
		me.boolObject = function(obj)
		{
			if (obj === undefined)
			{
				return me._boolObject;
			}
			else
			{
				me._boolObject = obj;
				this.firePropertiesChanged(["boolObject"]);
				return this;
			}
		}
		
		me.listObject = function(obj)
		{
			if (obj === undefined)
			{
				return me._listObject;
			}
			else
			{
				me._listObject = obj;
				this.firePropertiesChanged(["listObject"]);
				return this;
			}
		}
		
		me.stringArray = function(array)
		{
			if (array === undefined)
			{
				return me._stringArray;
			}
			else
			{
				me._stringArray = array;
				this.firePropertiesChanged(["stringArray"]);
				return this;
			}
		}
		
		me.boolArray = function(array)
		{
			if (array === undefined)
			{
				return me._boolArray;
			}
			else
			{
				me._boolArray = array;
				this.firePropertiesChanged(["boolArray"]);
				return this;
			}
		}
		
		me.listArray = function(array)
		{
			if (array === undefined)
			{
				return me._listArray;
			}
			else
			{
				me._listArray = array;
				this.firePropertiesChanged(["listArray"]);
				return this;
			}
		}
		
		me.storageInit = function()
		{
			if (me._senrec === "Sender")
			{				
				// Initializing stringArray
				var lengthS = me._stringArray.length;
				if (lengthS > 0)
				{
					for (i = 0; i < lengthS; i++)
					{
						me.doWithStorage(me._stringArray[i].key, me._stringArray[i].value);
					}
				}

				// Initializing boolArray
				var lengthB = me._boolArray.length;
				if (lengthB > 0)
				{
					for (i = 0; i < lengthB; i++)
					{
						var bool = me._boolArray[i].value ? "true" : "false";
						me.doWithStorage(me._boolArray[i].key, bool);
					}
				}
				
				// Initializing listArray
				var lengthL = me._listArray.length;
				if (lengthL > 0)
				{
					var list = [];
					for (i = 0; i < lengthL; i++)
					{
						var len = list.length;
						if (len == 0)
						{
							var obj		= {};
							obj.key		= me._listArray[i].key;
							obj.value	= me._listArray[i].value;
							
							list.push(obj);
						}
						if (len > 0)
						{
							var replaced = false;
							for (j = 0; j < len; j++)
							{
								if (list[j].key === me._listArray[i].key)
								{
									list[j].value = list[j].value + "|" + me._listArray[i].value;
									replaced = true;
								}
							}
							if (!replaced)
							{
								var obj		= {};
								obj.key		= me._listArray[i].key;
								obj.value	= me._listArray[i].value;
								
								list.push(obj);
							}
						}
					}
					
					for (k = 0; k < list.length; k++)
					{
						me.doWithStorage(list[k].key + "|list", list[k].value);
					}
				}
			}
		}
		
		me.doWithStorage = function(key, value)
		{
			if (key !== undefined && value !== undefined)
			{
				localStorage.setItem(key, value);
			}
        	console.log(localStorage);
		}
		
		me.storageInput = function(keyvalue)
		{ 
			var key 			= "";
			var value 			= "";
			var keyvalueArray 	= keyvalue.split("~");
			
			if (keyvalueArray !== undefined && keyvalueArray.length > 0)
			{
				key 	= keyvalueArray[0];
				value 	= keyvalueArray[1];
				
				me.doWithStorage(key, value);
			}
		}
		
	});
});
		