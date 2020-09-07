function getPortlet(){ 
	var categories1 = [];//左图列
	var data1 = [];//左图数据
	var categories2=[] ;//右图列
	var data2 = [] ;//右图数据
	var ssInfo =[];
	Highcharts.setOptions({
            lang:{
                contextButtonTitle:"图表导出菜单",
                downloadJPEG:"下载JPEG图片",
                downloadPDF:"下载PDF文件",
                downloadPNG:"下载PNG文件",
                downloadSVG:"下载SVG文件",
                printChart:"打印图表"
            }
	});
	Ext.Ajax.request({
		url: 'valueStack.ajax',
		params:{
			ssId: 'BSYS',
			vsId: 'BSYS.HOMEPAGE' 
		},
		async: false,  
		success: function(response) {
			var objData = Ext.decode(response.responseText);
			var t1=objData["BSYS.HOMEPAGE.001"];
			for(var t in t1){
				categories1.push(t1[t].DATA_KEY);
				data1.push({name:t1[t].DATA_KEY,y:t1[t].DATA_VALUE,color:'rgb('+Math.floor(Math.random() * (256))+','+Math.floor(Math.random() * (256))+','+Math.floor(Math.random() * (256)) +')'});
			}

			var t2=objData["BSYS.HOMEPAGE.002"];
			for(var t in t2){
				categories2.push(t2[t].DATA_KEY);
				data2.push({color:'rgb('+Math.floor(Math.random() * (256))+','+Math.floor(Math.random() * (256))+','+Math.floor(Math.random() * (256)) +')' ,y:t2[t].DATA_VALUE});
			} 
			
			var t3=objData["BSYS.HOMEPAGE.003"];
			for(var t in t3){
				ssInfo[t3[t].SS_ID]=t3[t].SS_NAME;
			} 
		}
	});
	return {
				flex:1,
				layout : {
			        type: 'hbox',
			        align: 'stretch'
			    },
				defaults : {
					border : false
				},
				items : [{
					xtype : 'panel',
					flex:1,
					listeners : {
						resize : function(me,width, height) {
							me.update();
							if(me.chart){
								me.chart.options.chart.width=width;
								me.chart.options.chart.height=height;
								me.chart.reflow();
								return;
							}
							
							me.chart=new Highcharts.Chart({
								chart: {
							    	width : width,
							    	height : height,
							    	zoomType: 'xy',
							        renderTo: me.getEl().dom,
						            type: 'pie' 
							    }, 
							    plotOptions: {
						            pie: {
						                allowPointSelect: true,
						                cursor: 'pointer' 
						            }
						        },
							    title: {
									text: ''
								},
							    xAxis: {
							    	categories: categories1
							    }, 
							    series:  [{ 
							    	type :'pie',
							    	name :'${message("jes.vm.portlet.default.bbsl")}'/*报表数量*/,
									data: data1
								} ]
								 
							});
						}
					}
				}, {
					xtype : 'panel',
					flex:2,
					listeners : {
						resize : function(me,width, height) {
							me.update();
							if(me.chart){
								me.chart.options.chart.width=width;
								me.chart.options.chart.height=height;
								me.chart.reflow();
								return;
							}
							
							me.chart=new Highcharts.Chart({
								chart: {
							    	width : width,
							    	height : height,
							    	zoomType: 'xy',
							        renderTo: me.getEl().dom, 
									defaultSeriesType: 'column' 
							    },
							    title: {
									text: ''
								},
								subtitle: {
									text: ''
								},
								xAxis: {
									categories:categories2 
								},
								yAxis: {
									min: 0,
									title: {
										rotation:270,
										text: '${message("jes.vm.portlet.default.jxtyhs")}'/*子系统用户数*/
									} 
								},
								legend: {
									enabled:false,
								    layout:'vertical',         //竖直显示，默认是水平显示的
								    align: 'right',            //图例说明在区域的右边，默认在中间
								    verticalAlign: 'middle'    //竖直方向居中，默认在底部
								}, 
								tooltip: {
									formatter: function() {
										return ''+
										ssInfo[this.x] +': '+ this.y;
									}
								},
								plotOptions: {
									column: {
 						                borderWidth: 0      //设置柱子的边框，默认是1
									}
								},
							    series: [ {
								    	data: data2 ,
								    	dataLabels: {
								            enabled: true    //默认是false，即默认不显示数值 
								        }
							    	}]
							});
						}
					}	
				}]
	};
}