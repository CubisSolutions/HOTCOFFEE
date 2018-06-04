define(["d3", "sap/designstudio/sdk/component", "css!../css/component.css"], 
function(d3, Component, css) 
{
	Component.subclass("be.cubis.designstudio.broadcasterold.broadcaster", function() 
	{
		// Self
		var me = this;
		me._storageDirection = "Sender";
		me._storageKey = 1;
		me._storageValues = "test";
		me._storageDimension = "test";
		me._storageAction = "test";
		me._filterRemote = {"action": me._storageAction, "dimension": me._storageDimension, "values": me._storageValues };
		
		me.init=function(){
			/* works !!!
			window.addEventListener("storage", function (e) {
				console.log("Event happened");
				if(localStorage.getItem(1) !== null){
					var handleFilterRemote = localStorage.getItem(1);
					var handleFilterObj = JSON.stringify(localStorage.getItem(1));
					me._storageValues = localStorage.getItem(1);
					me.firePropertiesChangedAndEvent(["storageValues"], "storageScript");
				}			
	        });*/
			
			window.addEventListener("storage", function (e) {
				console.log("Event happened");
				if(localStorage.getItem(1) !== null){
					me._filterRemote = localStorage.getItem(1);
					var handleFilterRemote = JSON.parse(me._filterRemote);
					me._storageAction = handleFilterRemote.action;
					me._storageDimension = handleFilterRemote.dimension;
					me._storageValues = handleFilterRemote.values;
					me.firePropertiesChangedAndEvent(["handleFilterRemote","storageAction", "storageDimension","storageValues"], "storageScript");
				}			
	        });
		}
		
		me.doWithStorage = function(){
			var jsonObj = me._filterRemote;
			localStorage.setItem(me._storageKey, jsonObj);		
		}
		
		me.storageDirection = function(direction){
			if(direction === undefined){
				return this._storageDirection;
			}
			else{
				this._storageDirection = direction;
				return this;
			}
		}
		
		me.storageKey = function(key){
			if(key === undefined){
				return this._storageKey;
			}
			else{
				this._storageKey = key;
				return this;
			}
			
		}
		
		me.storageAction = function(action){
			if(action === undefined){
				return this._storageAction;
			}
			else{
				this._storageAction = action;
				return this;
			}
			
		}
		
		me.storageDimension = function(dimension){
			if(dimension === undefined){
				return this._storageDimension;
			}
			else{
				this._storageDimension = dimension;
				return this;
			}
		}
		
		me.storageValues = function(values){
			if(values === undefined){
				return this._storageValues;
			}
			
			else{
				this._storageValues = values;
				return this;
			}

		}
		
		me.handleFilterRemote = function(filterRemote){
			if(filterRemote === undefined){
				return this._filterRemote;
			}
			
			else{
				this._filterRemote = filterRemote;
				me.doWithStorage();
				return this;
			}

		}
	
	});
});
		