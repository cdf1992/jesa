Ext.define('Ext.ux.grid.MergeCellsGrid', {
	extend : 'Ext.grid.Panel'
	, alias : 'widget.mergecellsgrid'
	, initComponent: function() {
		var me = this;
		me.store.on('load',function(){
			var mergeCols = [];
			for(var c = 0; c < me.columns.length; c++){
				if(me.columns[c].mergeRow){
					mergeCols.push(c);
				}
			}
			setTimeout(function(){ 
				me.mergeCells(me, mergeCols); 
			}, 150);
	    });
		me.callParent(arguments);
	}
	, mergeCells : function(grid, cols){
		var arrayTr = Ext.query('tr', grid.body.el.dom);
		var trCount = arrayTr.length;// <tr>总行数
		var arrayTd;
		var td;
		// ==>显示层将目标格的样式改为.display='none';
		// 定义合并函数
		var merge = function( rowspanObj , removeObjs ){ 
			if( 0 != rowspanObj.rowspan ){
				arrayTd = arrayTr[ rowspanObj.tr ].getElementsByTagName("td"); // 合并行
				td = arrayTd[rowspanObj.td];
				td.rowSpan = rowspanObj.rowspan;
				td.vAlign = "middle";
				 // 隐身被合并的单元格
				Ext.each(removeObjs,function(obj){
					arrayTd = arrayTr[obj.tr].getElementsByTagName("td");
					arrayTd[obj.td].style.display='none';
				});
			}
		};
		// ==>显示层将目标格的样式改为.display='none';
		var rowspanObj = {}; // 要进行跨列操作的td对象{tr:1,td:2,rowspan:5}
		var removeObjs = []; // 要进行删除的td对象[{tr:2,td:2},{tr:3,td:2}]
		var col;
		// ==>逐列靠表内具体数值去合并各个<tr> (表内数值一样则合并)
		Ext.each( cols , function( colIndex ){ 
			var rowspan = 1;
			var divHtml = null;// 单元格内的数值
			// ==>从第一行数据0开始
			for( var i=0 ; i < trCount ; i++){
				// ==>一个arrayTr[i]是一整行的所有数据, 一个arrayTd是 <td xxxx
				// ><div>具体数值</div></td> ,
				arrayTd = arrayTr[i].getElementsByTagName("td");
				var cold = 0;  
	            col = colIndex + cold;//跳过RowNumber列和check列  
				if( !divHtml ){
					divHtml = arrayTd[col].innerText;
					rowspanObj = { tr:i,td:col,rowspan:rowspan }
				} else {
					var cellText = arrayTd[col].innerText;
					var addf = function() { 
						rowspanObj["rowspan"] = rowspanObj["rowspan"]+1;
						removeObjs.push({ tr:i,td:col });
						if( i == trCount-1) {
							merge(rowspanObj,removeObjs);// 执行合并函数
						}
					};
					var mergef = function(){
						merge(rowspanObj,removeObjs);// 执行合并函数
						divHtml = cellText;
						rowspanObj = {tr:i,td:col,rowspan:rowspan}
						removeObjs = [];
					};
					if( cellText == divHtml ){
//						if( colIndex != cols[0] ){
//							var leftDisplay = arrayTd[col-2].style.display;// 判断左边单元格值是否已display
//							if( leftDisplay == 'none' ){
//								addf();
//							} else {
//								mergef();
//							}
//						} else {
//							addf();
//						}
						addf();
					} else {
						mergef();
					}
				}
			}
		}); 
	}
});