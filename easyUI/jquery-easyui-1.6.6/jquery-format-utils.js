/*******************************************************************************
 * author 郭海锋
 */

/*******************************************************************************
 * 
 * @param JSONDateString
 * @returns js date
 */
function JSONDateToJSDate(JSONDateString) {
	if (JSONDateString == null || JSONDateString == '')
		return;
	var date = new Date(parseInt(JSONDateString, 10));
	return date.format('yyyy-MM-dd hh:mm:ss');
}

function JSONDateToJSDateShort(JSONDateString) {
	if (JSONDateString == null || JSONDateString == '')
		return;
	var date = new Date(parseInt(JSONDateString, 10));
	return date.format('yyyy-MM-dd');
}

function FormatToDateTime(JSONDateString) {
	if (JSONDateString == null || JSONDateString == '')
		return;
	var date = new Date(parseInt(JSONDateString, 10));
	return date.format('yyyy-MM-dd hh:mm:ss');
}

function FormatToDate(JSONDateString) {
	if (JSONDateString == null || JSONDateString == '')
		return;
	var date = new Date(parseInt(JSONDateString, 10));
	return date.format('yyyy-MM-dd');
}

function stateToString(intState) {
	if (intState == null || intState == '')
		return '';
	if (intState == -1)
		return "否";
	if (intState == 1)
		return "是";

}
function stateToString2(intState) {
	if (intState == null || intState == '')
		return '';
	if (intState == -1)
		return "×";
	if (intState == 1)
		return "√";

}
function stateToString3(intState) {
	if (intState == null || intState == '')
		return '--';
	if (intState == 0)
		return "否";
	if (intState == 1)
		return "是";

}
function stateToAudit(intState) {
	if (intState == null || intState == '')
		return '';
	if (intState == -1)
		return "审核未通过";
	if (intState == 0)
		return "已保存";
	if (intState == 1)
		return "待审核";
	if (intState == 2)
		return "已阅";
	if (intState == 3)
		return "审核通过";
}
function numToFixed0(num) {
	var number = new Number(num);
	return number.toFixed(0);
}

function numToFixed2(num) {
	var number = new Number(num);
	return number.toFixed(2);
}

/*******************************************************************************
 * 重写JS format
 * 
 * @param format
 * @returns
 */
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	};

	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};

/*******************************************************************************
 * 按百分比返回当前页面像素宽度
 * 
 * @param percent
 * @returns {Number}
 */
function fixWidth(percent) {
	return document.body.clientWidth / 100 * percent;
}

/**
 * Add "put delete" method to jQuery
 * 
 * @author Hejue
 */
jQuery.each([ "put", "del" ], function(i, method) {
	jQuery[method] = function(url, data, callback, type) {
		// shift arguments if data argument was omitted
		if (jQuery.isFunction(data)) {
			type = type || callback;
			callback = data;
			data = {};
		}

		var _method = (method == "del") ? "delete" : method;
		(typeof data == "object") ? (data._method = _method)
				: (data += "&_method=" + _method);

		return jQuery.ajax({
			type : "post",
			url : url,
			data : data,
			success : callback,
			dataType : type
		});
	};
});

function SerializeJsonToStr(oJson) {
	if (oJson == null)
		return "null";
	if (typeof (oJson) == typeof (0))
		return oJson.toString();
	if (typeof (oJson) == typeof ('') || oJson instanceof String) {
		oJson = oJson.toString();
		oJson = oJson.replace('//r/n/', '//r//n');
		oJson = oJson.replace('//n/', '//n');
		oJson = oJson.replace('//"/', '//"');
		return '"' + oJson + '"';
	}
	if (oJson instanceof Array) {
		var strRet = "[";
		for (var i = 0; i < oJson.length; i++) {
			if (strRet.length > 1)
				strRet += ",";
			strRet += SerializeJsonToStr(oJson[i]);
		}
		strRet += "]";
		return strRet;
	}
	if (typeof (oJson) == typeof ({})) {
		var strRet = "{";
		for ( var p in oJson) {
			if (strRet.length > 1)
				strRet += ",";
			strRet += p.toString() + ':' + SerializeJsonToStr(oJson[p]);
		}
		strRet += "}";
		return strRet;
	}
}
//function paramString2obj(serializedParams) {
//	var obj = {};
//	function evalThem(str) {
//		var attributeName = str.split("=")[0];
//		var attributeValue = str.split("=")[1];
//		if (!attributeValue) {
//			return;
//		}
//
//		var array = attributeName.split(".");
//		for (var i = 1; i < array.length; i++) {
//			var tmpArray = Array();
//			tmpArray.push("obj");
//			for (var j = 0; j < i; j++) {
//				tmpArray.push(array[j]);
//			};
//			var evalString = tmpArray.join(".");
//			// alert(evalString);
//			if (!eval(evalString)) {
//				eval(evalString + "={};");
//			}
//		};
//		eval("obj." + attributeName + "='" + attributeValue + "';");
//
//	};
//	var properties = serializedParams.split("&");
//	for (var i = 0; i < properties.length; i++) {
//		evalThem(properties[i]);
//	};
//	return obj;
//}

function strToObj(str){    
    str = str.replace(/&/g,"','");    
    str = str.replace(/=/g,"':'");    
    str = "({'"+str +"'})";    
    obj = eval(str);     
    return obj;    
}  
 function serializeComplexObject(param, key){
    var paramStr="";
    if(param instanceof String||param instanceof Number||param instanceof Boolean){
    	paramStr+="&"+key+"="+param;
    }else{
        $.each(param,function(i,element){
            var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
            if(element != null && element != '' )
            	paramStr+='&'+serializeComplexObject(this, k);
        });
    }
    return paramStr.substr(1);
}; 
//FROM表单序列化转对象
function serializeObject(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
}

//idcard为身份证ID，age为年龄ID，age为easyui-validatebox readonly
//身份证计算年龄
function resultage(idcard,ageid) {
	//获取输入身份证号码
	var bbsrcaard = $("#"+idcard).val();
	
	if(bbsrcaard == null || bbsrcaard == "" ){
		 $("#"+ageid).val('');
		 return;
	}
	if(bbsrcaard.length!=15&&bbsrcaard.length!=18){
		 $("#"+ageid).val('');
		 return;
	}
	//获取出生日期
	bbsrcaard.substring(6, 10) + "-" + bbsrcaard.substring(10, 12) + "-" + bbsrcaard.substring(12, 14);
	//获取年龄
	var myDate = new Date();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();

	var age = myDate.getFullYear() - bbsrcaard.substring(6, 10) - 1;
	if (bbsrcaard.substring(10, 12) < month || bbsrcaard.substring(10, 12) == month && bbsrcaard.substring(12, 14) <= day)
	{
	age++;
	}
	 $("#"+ageid).val(age);
	//年龄 age
};

var isJson = function(obj){
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

 
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.LTrim = function() {
	return this.replace(/(^\s*)/g, "");
}
String.prototype.RTrim = function() {
	return this.replace(/(\s*$)/g, "");
}