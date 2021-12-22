var userSelectData2 = {
		"b2": {
			1: null,
			2: null
		},
		"b3":{
			1: null,
			2: null
		},
		"b4":{
			1: null,
			2: null
		},
		"b5":{
			1: null,
			2: null
		},
		"b6":{
			1: null,
			2: null
		},
		"b7":{
			1: null,
			2: null
		},
		"b8":{
			1: null,
			2: null
		}
	};

var randomRange = function(n1, n2) {
	return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
};


function putRandVal(){
	var keys = Object.keys(userSelectData2);
	for (i = 0; i < keys.length; i++) {
		var key = keys[i] 
		var value = userSelectData[key] 
		
		var	keys2 = Object.keys(value);
		for (k = 0; k < keys2.length; k++) {
			var key2 = keys2[k] 
			var value2 = value[key2] 
			value2 = randomRange(1,4);
		}
	}
	
	
	console.log(userSelectData2)
	
};