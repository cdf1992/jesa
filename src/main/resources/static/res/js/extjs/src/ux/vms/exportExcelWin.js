Ext.define("Ext.ux.vms.exportExcelWin", {
    alias : 'Ext.ux.vms.exportExcelWin'
})
/**
 * 导出通过窗体
 * 
 * @author fred
 * @updateDate 2018-01-11 17:11:47
 * @param title
 *                grid表头 用作勾选导出列
 * @param fileName
 *                导出的Excel命名
 * @param ajax
 *                数据的请求地址 例：listInvoiceRed.ajax
 * @param params
 *                查询参数
 * @returns
 */
function exportExcel(title, fileName, ajax, params, dataGrid, tableTitle) {
    var c = [];
    for (var i = 0; i < title.length; i++) {
	if (title[i].dataIndex != '' && title[i].dataIndex != null) {
	    var d = {};
	    d["type"] = title[i].dataIndex;
	    d["name"] = title[i].text;
	    c.push(d);
	}
    }
    var storeData = Ext.create('Ext.data.Store', {
	fields : [ 'type', 'name' ],
	data : c
    })
    // window.location.href="downLoadExcel.do?title="+json.stringify(c)+"&fileName=发票红冲&url=listInvoiceRed.ajax&params="+params;
    var exportExcelWin = Ext.create('Ext.window.Window', {
	width : 450,
	layout : 'fit',
	modal : true,// 设置是否添加遮罩
	html : "<OBJECT ID=\"fpmxtq1\" CLASSID=\"CLSID:C761EB9B-B6AD-328E-9300-CF774CDE66A9\"></OBJECT>",
	constrainHeader : true,
	items : {
	    layout : 'form',
	    xtype : 'gridpanel',
	    title : "请选择要导出的列",
	    store : storeData,
	    selType : 'checkboxmodel',
	    selModel : {
		mode : 'SIMPLE'
	    },
	    id : 'exportTitle',
	    columns : [ {
		header : "序号",
		xtype : 'rownumberer',
		width : 40,
		align : 'center'
	    }, {
		text : "导出的列",
		width : '88%',
		align : 'center',
		dataIndex : 'name'
	    }, {
		text : "字段",
		width : '42%',
		align : 'center',
		dataIndex : 'type',
		hidden : true
	    } ],
	    buttons : [ {
		text : "确定",
		icon : 'res/img/icon16-hrs/hide-up.png',
		handler : function() {
		    var tt = [];// var column =
		    // exportExcelWin.down('grid').columns;
		    var grid = exportExcelWin.down('grid').getSelectionModel().getSelection();
		    if (grid.length > 0) {
			// 需要导出的列
			for (var i = 0; i < grid.length; i++) {
			    var d = {};
			    d["type"] = grid[i].get('type');
			    d["name"] = grid[i].get('name');
			    tt.push(d);
			}
			Ext.MessageBox.confirm("提示", "是否仅导出勾选的数据", function(obj) {
			    /*
			     * var pvl={}; for(var i in params){
			     * pvl[params[i].name]=params[i].getValue(); }
			     */
			    if (obj == 'yes') {
				if (dataGrid.length > 0) {
				    var dataList = [];
				    for (var i = 0; i < dataGrid.length; i++) {
					var data = {};
					data = dataGrid[i].raw;
					dataList.push(data);
				    }
				    var downForm = document.createElement('form');
				    downForm.id = 'downForm';
				    downForm.name = 'downForm';
				    downForm.className = 'x-hidden';
				    downForm.action = "downLoadCheckExcel.ajax";
				    downForm.method = 'post';

				    var dataTitle = document.createElement('input');
				    dataTitle.type = 'hidden';
				    dataTitle.name = 'title';
				    dataTitle.value = JSON.stringify(tt);
				    downForm.appendChild(dataTitle);

				    var data = document.createElement('input');
				    data.type = 'hidden';
				    data.name = 'data';
				    data.value = JSON.stringify(dataList);
				    downForm.appendChild(data);

				    var par = document.createElement('input');
				    par.type = 'hidden';
				    par.name = 'params';
				    par.value = JSON.stringify(params);
				    downForm.appendChild(par);
				    var dataFileName = document.createElement('input');
				    dataFileName.type = 'hidden';
				    dataFileName.name = 'fileName';
				    dataFileName.value = fileName;
				    downForm.appendChild(dataFileName);
				    document.body.appendChild(downForm);
				    Ext.fly('downForm').dom.submit();
				    document.body.removeChild(downForm);
				} else {
				    Ext.MessageBox.alert('提示', "请选择需要导出的数据");
				}

			    } else {
				var downForm = document.createElement('form');
				downForm.id = 'downForm';
				downForm.name = 'downForm';
				downForm.className = 'x-hidden';
				downForm.action = "downLoadExcel.ajax";
				downForm.method = 'post';

				var dataTitle = document.createElement('input');
				dataTitle.type = 'hidden';
				dataTitle.name = 'title';
				dataTitle.value = JSON.stringify(tt);
				downForm.appendChild(dataTitle);

				var url = document.createElement('input');
				url.type = 'hidden';
				url.name = 'url';
				url.value = ajax;
				downForm.appendChild(url);

				var par = document.createElement('input');
				par.type = 'hidden';
				par.name = 'params';
				par.value = JSON.stringify(params);
				downForm.appendChild(par);

				var dataFileName = document.createElement('input');
				dataFileName.type = 'hidden';
				dataFileName.name = 'fileName';
				dataFileName.value = fileName;
				downForm.appendChild(dataFileName);

				document.body.appendChild(downForm);
				Ext.fly('downForm').dom.submit();
				document.body.removeChild(downForm);

			    }
			})
			exportExcelWin.close();
		    } else {
			Ext.MessageBox.alert('提示', "请选择需要导出的列");
		    }
		}
	    }, {
		text : "获取更多字段",
		icon : 'res/img/icon16-hrs/hide-up.png',
		handler : function() {
		    if (tableTitle != undefined) {
			Ext.Ajax.request({
			    url : 'getTableTitle.ajax',
			    dataType : "json",
			    params : {
				"tableTitle" : tableTitle
			    },
			    success : function(response) {
				var result = Ext.decode(response.responseText);
				storeData.loadData(result.dataList);
			    }
			})
		    } else {
			Ext.MessageBox.alert('提示', "该表暂未配置更多列");
		    }
		}
	    } ]
	}
    }).show();

}
//导出
function exportExcel(params,url){
  var formStyle = "<form action='"+url+"'></form>";
  var form = document.createElement("form");
  form.style.display = 'none';
  form.action = url;
  form.method = "post";
  document.body.appendChild(form);

  for(var key in params){
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  }

  form.submit();
  form.removeNode();
}
/**
 * 导出 grid实例 charts实例数组
 */
// TODO 放到别的包下
function exprotData(name, url, params,seledGridPanel) {
    // 交易类型store
    var columnStore = Ext.create('Ext.data.Store', {
	fields : [ "id", 'value' ],
	proxy : {
	    type : 'ajax',
	    url : 'queryColumnsByName.ajax',
	    extraParams : {
		params : name
	    },
	    reader : {
		type : 'json',
		root : 'dataList',
		totalProperty : 'total'
	    }
	},
	autoLoad : true,
    });
    var columnsGrid = Ext.create('Ext.grid.GridPanel', {
	id : "columnsGrid",
	title : "可选列",
	draggable : false,// 拖动
	resizable : false, // 变大小
	autoScroll : true,
	forceFit : true,
	autoScroll : true,
	store : columnStore,
	selModel : {
	    selType : 'checkboxmodel',
	    checkOnly : false,// 只能通过checkbox选中
	    mode : 'MULTI',
	},
	columns : [ {
	    header : '序号',
	    xtype : 'rownumberer',
	    width : 50,
	    align : 'center'
	}, {
	    text : 'id',
	    dataIndex : 'id',
	    width : 50,
	    align : 'center',
	    hidden : true
	}, {
	    text : '列名称',
	    dataIndex : 'value',
	    align : 'left',
	    hidden : false
	} ],
	selType : 'checkboxmodel'

    });
    var dataParamList = new Array();
    if(seledGridPanel.length>0){
		for (var i = 0; i < seledGridPanel.length; i++) {
		    var itemsData = seledGridPanel[i].data;
			dataParamList.push(itemsData);
		}
	}
    var columnSelectionWin = Ext.create('Ext.window.Window', {
	title : '选择导出列',
	width : 400,
	height : 500,
	forceFit : false,
	modal : true,// 设置是否添加遮罩
	draggable : true,// 拖动
	resizable : false, // 变大小
	autoScroll : true,
	closeAction : 'close',
	items : [ columnsGrid ],
	buttons : [ {
	    text : '导出勾选数据',
	    name : 'saveBtn',
	    iconCls : "save-icon",
	    handler : function(me) {
	    	if(dataParamList.length>0){
	    		var grid = Ext.getCmp('columnsGrid').getSelectionModel().getSelection();
				var columns = new Array();
				grid.forEach(function(j) {
				    columns.push(j.data);
				});
				var paramsJson = {
						params : JSON.stringify(params),
						columns : JSON.stringify(columns),
						downloadAll : "N",
						selectedData : JSON.stringify(dataParamList)
				}
				exportExcel(paramsJson,url);
				columnSelectionWin.close();
	    	}else{
	    		Ext.MessageBox.alert('提示', '请选择需要导出的数据或选择导出全部数据');
			    return;
	    	}
	    }
	},{
	    text : '导出全部数据',
	    name : 'saveBtn',
	    iconCls : "save-icon",
	    handler : function(me) {
		var grid = Ext.getCmp('columnsGrid').getSelectionModel().getSelection();
		var columns = new Array();
		grid.forEach(function(j) {
		    columns.push(j.data);
		});
		var paramsJson = {
				params : JSON.stringify(params),
				columns : JSON.stringify(columns),
				downloadAll : "Y",
				selectedData : JSON.stringify(dataParamList)
		}
		exportExcel(paramsJson,url);
		columnSelectionWin.close();
	    }
	} ]
    }).show();
}
function exportExcelHF(title,fileName,ajax,params,dataGrid,tableTitle){
	 var c=[];
	 for (var i = 0; i < title.length; i++) {
	  if(title[i].dataIndex!=''&&title[i].dataIndex!=null){
	   var d={};
	   d["type"]=title[i].dataIndex;
	   d["name"]=title[i].text;
	   c.push(d);
	  }
	 } 
	 var storeData=Ext.create('Ext.data.Store',{
	  fields:['type','name'],
	  data:c
	 })
	 //window.location.href="downLoadExcel.do?title="+json.stringify(c)+"&fileName=发票红冲&url=listInvoiceRed.ajax&params="+params;
	 var exportExcelWin=Ext.create('Ext.window.Window', {
	  width : 450,
	  layout : 'fit',
	  modal:true,//设置是否添加遮罩
	  html:"<OBJECT ID=\"fpmxtq1\" CLASSID=\"CLSID:C761EB9B-B6AD-328E-9300-CF774CDE66A9\"></OBJECT>",
	  constrainHeader : true,
	  items : {
	   layout : 'form',
	   xtype : 'gridpanel',
	   title : "请选择要导出的列",
	   store: storeData,
	    selType : 'checkboxmodel',
	    selModel:{mode :'SIMPLE'},
	    id:'exportTitle',
	    columns : [{header:"序号",xtype:'rownumberer',width:40,align:'center'},
	               {text : "导出的列",width:'88%',align:'center',dataIndex : 'name'},
	          {text : "字段",width:'42%',align:'center',dataIndex : 'type',hidden:true}],
	       buttons : [{
	        text:"确定",
	     icon:'res/img/icon16-hrs/hide-up.png',
	     handler:function(){
	      var tt=[];//var column = exportExcelWin.down('grid').columns; 
	      var grid = exportExcelWin.down('grid').getSelectionModel().getSelection();
	      if(grid.length > 0){
	       //需要导出的列
	       for(var i=0;i<grid.length;i++){
	          var d={};
	          d["type"]=grid[i].get('type');
	          d["name"]=grid[i].get('name');
	          tt.push(d);
	        }
	       Ext.MessageBox.confirm("提示","是否仅导出勾选的数据",function(obj){
	        /*var pvl={};
	        for(var i in params){
	         pvl[params[i].name]=params[i].getValue();
	           }*/
	        if(obj=='yes'){
	         if(dataGrid.length>0){
	          var dataList=[];
	          for(var i=0;i<dataGrid.length;i++){
	           var data={};
	           data=dataGrid[i].raw;
	           dataList.push(data);
	          } 
	           var downForm = document.createElement('form'); 
	           downForm .id = 'downForm'; 
	           downForm .name = 'downForm'; 
	           downForm .className = 'x-hidden';
	           downForm .action="downLoadCheckExcel.do";
	           downForm .method = 'post';
	           
	           var dataTitle = document.createElement('input'); 
	           dataTitle.type = 'hidden';
	           dataTitle.name = 'title';
	           dataTitle.value = JSON.stringify(tt);
	           downForm.appendChild(dataTitle); 
	           
	           var data = document.createElement('input'); 
	           data.type = 'hidden';
	           data.name = 'data';
	           data.value = JSON.stringify(dataList);
	           downForm.appendChild(data); 
	           
	           
	           var par=document.createElement('input'); 
	           par.type = 'hidden';
	           par.name = 'params';
	           par.value = JSON.stringify(params);
	           downForm.appendChild(par);
	           var dataFileName = document.createElement('input'); 
	           dataFileName.type = 'hidden';
	           dataFileName.name = 'fileName';
	           dataFileName.value = fileName;
	           downForm.appendChild(dataFileName); 
	           document.body.appendChild(downForm ); 
	           Ext.fly('downForm').dom.submit();
	           document.body.removeChild(downForm );  
	         }else{
	          Ext.MessageBox.alert('提示',"请选择需要导出的数据");
	         }
	         
	        }else{
	          var downForm = document.createElement('form'); 
	          downForm .id = 'downForm'; 
	          downForm .name = 'downForm'; 
	          downForm .className = 'x-hidden';
	          downForm .action="downLoadExcel.do";
	          downForm .method = 'post';
	         
	          var dataTitle = document.createElement('input'); 
	          dataTitle.type = 'hidden';
	          dataTitle.name = 'title';
	          dataTitle.value = JSON.stringify(tt);
	          downForm.appendChild(dataTitle); 
	         
	          var url = document.createElement('input'); 
	          url.type = 'hidden';
	          url.name = 'url';
	          url.value = ajax;
	          downForm.appendChild(url); 
	         
	          var par=document.createElement('input'); 
	          par.type = 'hidden';
	          par.name = 'params';
	          par.value = JSON.stringify(params);
	          downForm.appendChild(par); 
	          
	          var dataFileName = document.createElement('input'); 
	          dataFileName.type = 'hidden';
	          dataFileName.name = 'fileName';
	          dataFileName.value = fileName;
	          downForm.appendChild(dataFileName); 
	          
	          document.body.appendChild(downForm );
	          Ext.fly('downForm').dom.submit();
	          document.body.removeChild(downForm );  
	         
	         
	        }
	       })
	       exportExcelWin.close();
	      }else{
	       Ext.MessageBox.alert('提示',"请选择需要导出的列");
	      }
	     }
	       },{
	        text:"获取更多字段",
	     icon:'res/img/icon16-hrs/hide-up.png',
	     handler:function(){
	      if(tableTitle!=undefined){
	       Ext.Ajax.request({
	        url : 'getTableTitle.ajax',
	        dataType: "json",
	        params : {"tableTitle":tableTitle},
	        success : function(response) { 
	         var result=Ext.decode(response.responseText);
	         storeData.loadData(result.dataList);
	        }
	       })
	      }else{
	       Ext.MessageBox.alert('提示',"该表暂未配置更多列");
	      }
	     }
	       }]
	  }
	 }).show();
}
