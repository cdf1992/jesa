Ext.define('Ext.ux.form.QNumberField',
		{
			extend : 'Ext.form.NumberField',
			statics: {
				rendererZhMoney : function(v) {
					if (isNaN(v)) {
						return v;
					}
					v = (Math.round((v - 0) * 100)) / 100;
					v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v + "0" : v);
					v = String(v);
					var ps = v.split('.');
					var whole = ps[0];
					var sub = ps[1] ? '.' + ps[1] : '.00';
					var r = /(\d+)(\d{3})/;
					while (r.test(whole)) {
						whole = whole.replace(r, '$1' + ',' + '$2');
					}
					v = whole + sub;
//					if(v==0.00){
//						return null;
//					}
					return v;
				}
			},
			allowDecimals : true,
			decimalPrecision:2,
			alias : 'widget.qnumberfield',
			baseChars : "0123456789,",
			enableKeyEvents : true,
			hideTrigger : true,
			initComponent : function() {
				this.callParent();
			},
//			rendererZhMoney : function(num) {
//				var nbr='.';
//				if (isNaN(num)) {
//					return num;
//				}
//				if(this.maxLength==Number.MAX_VALUE){
//					this.maxLength=18;
//				}
//				 var num = (num || 0).toString();
//				 var arr=num.split(nbr);
//				 var da='';
//				 if(isNaN(arr[1])){
//					if(this.decimalPrecision>0){
//						for(var i=0;i<this.decimalPrecision;i++){
//							nbr=nbr+'0';
//						}
//						da=nbr;
//					}
//				 }else{
//					 da= arr[1];
////					 if(arr[1].length>this.decimalPrecision){
////						 da= arr[1];
////					 }
//				 }
//				 
//				 num=arr[0];
//				 
//				 var result = '';
//				 if(num.length>this.maxLength){
//					 num= num.substring(0,this.maxLength) ;
//				 }
//				    while (num.length > 3) {
//				        result = ',' + num.slice(-3) + result;
//				        num = num.slice(0, num.length - 3);
//				    }
//				    if (num) {
//				    	result = num + result; 
//				    }
//				    return result+da;
//			},
			setValue : function(v) {
				v = typeof v == "number" ? v : String(v).replace(this.decimalSeparator, ".").replace(/,/g, "");
				v = isNaN(v) ? "" : Ext.ux.form.QNumberField.rendererZhMoney(v);
				this.setRawValue(v);
			},
			getValue : function() {
				var v=(String(Ext.form.NumberField.superclass.getValue.call(this)).replace(",", ""));
				return v;
			},
			getSubmitValue : function() {
				var v=(String(Ext.form.NumberField.superclass.getValue.call(this)).replace(",", ""));
				return v;
			},
			fixPrecision : function(value) {
				var nan = isNaN(value);
				if (!this.allowDecimals || this.decimalPrecision == -1 || nan || !value) {
					return nan ? "" : value;
				}
				return parseFloat(value).toFixed(this.decimalPrecision);
			},
			validateValue : function(str) {
				var value=str;
				//去除千分位格式 , 和.
				value = String(value).replace(this.decimalSeparator, ".").replace(/,/g, "");
				if (value.length < 1) { //只输入,和. 时 为空
					if (!Ext.form.NumberField.superclass.validateValue.call(this,str)) {//用去除前的验证
						return true;
					}
				}else{//去除格式后正常验证
					if (!Ext.form.NumberField.superclass.validateValue.call(this,value)) {
						return true;
					}
					if (value.length < 1) { // if it""s blank and textfield didn""t flag it then it""s valid
						return true;
					}
					value = String(value).replace(this.decimalSeparator, ".").replace(/,/g, "");
					if (isNaN(value)) {
						this.markInvalid(String.format(this.nanText, value));
						return false;
					}
					var num = this.parseValue(value);
					if (num < this.minValue) {
						this.markInvalid(String.format(this.minText,this.minValue));
						return false;
					}
					if (num > this.maxValue) {
						this.markInvalid(String.format(this.maxText,this.maxValue));
						return false;
					}
					
				}
				return true;
			},
			parseValue : function(value) {
				value = parseFloat(String(value).replace(this.decimalSeparator,".").replace(/,/g, ""));
				return isNaN(value) ? "" : value;
			}
		});