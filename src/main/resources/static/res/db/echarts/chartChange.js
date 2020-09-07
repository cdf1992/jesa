//2016年06月南京市各家银行贷款排名
function   changeBarOrLine(objId,charts,option){
	
    touch.on("#"+objId, 'swiperight', function(ev){
    	
    	 console.log(option.series.length);
    	 for(var i=0 ;i<option.series.length;i++){
    		 option.series[i].type='line';
    	 }
    	charts.setOption({series :option.series},false) ; 
	    console.log("you have done",ev.x);
	});
    touch.on("#"+objId, 'swipeleft', function(ev){
    	 console.log(option.series.length);
    	 for(var i=0 ;i<option.series.length;i++){
    		 option.series[i].type='bar';
    	 }
    	 charts.setOption({series :option.series},false) ; 
	    console.log("you have done", ev.x);
	});

} 
//2016年06月南京市各家银行贷款排名
function   changePie(objId,charts,option){
	
    touch.on("#"+objId, 'swiperight', function(ev){
    	 for(var i=0 ;i<option.series.length;i++){
    		 option.series[i].radius=['50%', '70%'];
    	 }
    	charts.setOption({series :option.series},false) ; 
	});
    touch.on("#"+objId, 'swipeleft', function(ev){
    	 for(var i=0 ;i<option.series.length;i++){
    		 option.series[i].radius =['0', '70%'];
    	 }
    	 charts.setOption({series :option.series},false) ; 
	});

}


//2016年06月南京市各家银行贷款排名
function   changeArrayCharts(objId,charts,option,array){
	
    touch.on("#"+objId, 'swiperight', function(ev){
    	
    	 console.log(option.series.length);
    	 for(var i=0 ;i<option.series.length;i++){
    		 option.series[i].type='line';
    	 }
    	charts.setOption({series :option.series},false) ; 
	    console.log("you have done",ev.x);
	});
    touch.on("#"+objId, 'swipeleft', function(ev){
    	 console.log(option.series.length);
    	 for(var i=0 ;i<option.series.length;i++){
    		 option.series[i].type='bar';
    	 }
    	 charts.setOption({series :option.series},false) ; 
	    console.log("you have done", ev.x);
	});

}

function getChartType(){
	
	var objArray=new Array(); 
	
	
}