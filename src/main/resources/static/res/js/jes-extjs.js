/**
 * 
 * 定义Bsys与ExtJs的全局信息
 * 
 * @author oofrank
 */
/*支持extjs Ajax跨域访问*/
Ext.Ajax.withCredentials=true;
/**
 * 定义Bsys系统的Ext类装载位置
 */
Ext.Loader.setConfig({
	disableCaching : false,
	enabled : true,
	scriptCharset : 'UTF-8',
	paths : {// '类名前缀':'所在路径'
		'Sys.app' : 'res/js/app',
		'Jes.fun' : 'getFile.html?fileType=application/javascript&classPath=/jes/fun'
	}
});

Ext.onReady(function() {
	/*
	 * 将默认的Ajax调用超时时间设置为60秒
	 */
	Ext.Ajax.timeout = 60000;

	Ext.define('Ext.data.proxy.AjaxOverride', {
		override : 'Ext.data.proxy.Ajax',
		timeout : 60000,
		listeners:{
			exception: function( me, response, operation, eOpts ){
					jesErrorAlert('<span style="color:red;">网络异常或后台服务异常!</span><br/>您的页面可能表现不正常,请重新刷新页面,或重新登录!');
			}
		}
	});
	/**
	 * grid 默认可以复制
	 */
	Ext.define('Ext.grid.PanelOverride', {
		override : 'Ext.grid.Panel',
		viewConfig : {
			enableTextSelection : true
		}
	});

	/**
	 * 多选搜索combox
	 */
	Ext.define('Ext.form.field.ComboBox4M', {
		override : 'Ext.form.field.ComboBox',
		doLocalQuery : function(queryPlan) {
			var me = this, queryString = queryPlan.query;

			//此处特殊处理
			if (queryString && queryString.indexOf(',') > -1) {
				queryString = queryString.substr(queryString.lastIndexOf(','));
			}

			me.changingFilters = true;
			// Create our filter when first needed
			if (!me.queryFilter) {
				// Create the filter that we will use during typing to filter
				// the Store
				me.queryFilter = new Ext.util.Filter({
					id : me.id + '-query-filter',
					anyMatch : me.anyMatch,
					caseSensitive : me.caseSensitive,
					root : 'data',
					property : me.displayField
				});
				me.store.addFilter(me.queryFilter, false);
			}

			// Querying by a string...
			if (queryString || !queryPlan.forceAll) {
				me.queryFilter.disabled = false;
				me.queryFilter
						.setValue(me.enableRegEx ? new RegExp(queryString)
								: queryString);
			}

			// If forceAll being used, or no query string, disable the filter
			else {
				me.queryFilter.disabled = true;
			}

			// Filter the Store according to the updated filter
			me.store.filter();
			me.changingFilters = false;
			// Expand after adjusting the filter if there are records or if
			// emptyText is configured.
			if (me.store.getCount() || me.getPicker().emptyText) {
				me.expand();
			} else {
				me.collapse();
			}

			me.afterQuery(queryPlan);
		}
	});

	Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts) {
		// console.info(response);
		if (response && Ext.isFunction(response.getResponseHeader)) {
			var status = response.getResponseHeader("sessionstatus");
			// Ext重新封装了response对象
			if (status == "timeout") {
				new Ext.util.DelayedTask(function() {
					window.location = 'exit.do';
				}).delay(1000);
			}
		}
	});

});
/**
 * 提供jQuery风格的快捷访问接口
 */
var Q = Q || function(any, p) {
	// 如果是Id则直接返回
	if (Ext.isString(any)) {
		if (any.charAt(0) == '#') {
			return Ext.getDom(any.substr(1));
		} else if (any.charAt(0) == '@') {
			return Ext.getCmp(any.substr(1));
		} else {
			if (p) {
				return Ext.ComponentQuery.query(any, p)[0];
			} else {
				return Ext.ComponentQuery.query(any)[0];
			}
		}
	}

	// 如果是函数则执行
	if (Ext.isFunction(any)) {
		return any();
	}

};

/**
 * jquery风格的获取所属window组件的快捷方式
 * 
 * @type
 */
window.$w = window.$w || function(me) {
	return me.up('window');
};

/**
 * jquery风格的获取所属gridpanel组件的快捷方式
 * 
 * @type
 */
window.$g = window.$g || function(me) {
	return me.up('gridpanel');
};

/**
 * jquery风格的获取所属treepanel组件的快捷方式
 * 
 * @type
 */
window.$t = window.$t || function(me) {
	return me.up('treepanel');
};

/**
 * jquery风格的获取所属toolbar组件的快捷方式
 * 
 * @type
 */
window.$b = window.$b || function(me) {
	return me.up('toolbar');
};

/**
 * jquery风格的获取所属panel组件的快捷方式
 * 
 * @type
 */
window.$p = window.$p || function(me) {
	return me.up('panel');
};

/**
 * 传入json对象，对于其中的function的string值，进行eval
 */
window.$encode = window.$encode || function(json) {
	if (!json) {
		return json;
	}
	if (json instanceof String || typeof (json) == 'string') {
		if (json.indexOf('function') == 0) {
			eval('var  f=' + json);
			return f;
		} else {
			return json;
		}
	}
	if (Object.prototype.toString.call(json) === '[object Array]') {
		var a = [];
		for ( var i in json) {
			a.push($encode(json[i]));
		}
	}
	if (json instanceof Object) {
		for ( var e in json) {
			json[e] = $encode(json[e]);
		}
	}

	return json;
};

/**
* @description 加载css的快捷方法，根路径基于jesa/src/webapp 修改path可修改其下引入路径
* @type {Function}
* @param url 地址
* @example _requireCss('icon/my.css') 引入webapp/res/css/icon/my.css
* @public
*/

window._requireCss = window._requireCss || function (url) {
	 var utilCss = Ext.util.CSS,
	 paths = 'res/css';
	 url = paths + '/' + url;
	 
	 var head = document.getElementsByTagName('head')[0];
  	 var link = document.createElement('link');
     link.href = url;
     link.rel = 'stylesheet';
     link.type = 'text/css';
     head.appendChild(link);
};

Ext.requireUxCss = function (url) {
	 var utilCss = Ext.util.CSS,
	 paths = 'res/js/extjs/src/ux';
	 url = paths + '/' + url;
	 
	 var head = document.getElementsByTagName('head')[0];
	 
	 var cs=head.children;
	 for(c=0;c<cs.length;c++){
	 	if(cs[c].nodeName.toUpperCase() == 'LINK' && cs[c].href == url){
	 		return ;
	 	}
	 }
	 
	 var link = document.createElement('link');
	 link.href = url;
     link.rel = 'stylesheet';
     link.type = 'text/css';
     head.appendChild(link);
};

var downloadByForm = downloadByForm || function (url,params,showOnlineLog) {
    var formPanel = Ext.create('Ext.form.Panel',{
        defaultType: 'textfield',
        items:[]
    });
    var items = new Array();
    var uuidGenerator = Ext.create('Ext.data.UuidGenerator',{
        id:'uuidGenerator'
    });
    var threadId = uuidGenerator.generate();
    params.downloadByFormThreadId = threadId;
    for(var param in params){
        var item = {xtype:'textfield',name:param,value:params[param]};
        items.push(item);
    }
    formPanel.add(items);
    var form = formPanel.getForm();
    if(form.isValid()){
        form.submit({
            url:url,
            method : 'POST',
            standardSubmit:true, //标准表单提交，不使用Ajax
            submitEmptyText: false,
            target: 'download'
        });
    };
    //延迟3秒关闭panel
    Ext.defer(function () {
		formPanel.getForm().reset();
		formPanel.close();
    },3000);
    
    if('undefined' != typeof (onlineLogWindow) && (showOnlineLog == undefined || showOnlineLog == true)){ //如果存在onlineLog对象，弹窗
        onlineLogWindow.show('download',threadId);
    }
}
