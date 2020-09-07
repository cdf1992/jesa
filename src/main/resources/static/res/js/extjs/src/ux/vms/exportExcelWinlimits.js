Ext.define("Ext.ux.vms.exportExcelWinlimits", {
   alias: 'Ext.ux.vms.exportExcelWinlimits'
})
/**
 * 导出通过窗体
 * @author fred
 * @updateDate 2018-01-11 17:11:47
 * @param title grid表头 用作勾选导出列
 * @param fileName  导出的Excel命名
 * @param ajax 数据的请求地址 例：listInvoiceRed.ajax
 * @param params 查询参数
 * @returns
 */
function exportExcellimits(title,fileName,ajax,params,dataGrid,tableTitle){
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
 var exportExcelWinlimits=Ext.create('Ext.window.Window', {
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
      var grid = exportExcelWinlimits.down('grid').getSelectionModel().getSelection();
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
           downForm .action="downLoadCheckExcel.ajax";
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
          downForm .action="downLoadExcelLimits.ajax";
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
       exportExcelWinlimits.close();
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