function setGxrqfwFp(e){var t=e.split("-");$("#gxczfw").text("（当期可勾选发票的开票日期范围为："+changeDateYYYYMMDD(t[0])+"-"+changeDateYYYYMMDD(t[1])+"）");var s=dateYYYYandMMandDD(t[0]);cshFpDate(),$("#rz_sjq").datepicker({format:"yyyy-mm-dd",autoclose:!0,startDate:s,endDate:dqrq,language:"zh-CN"}),$("#rz_sjz").datepicker({format:"yyyy-mm-dd",autoclose:!0,startDate:s,endDate:dqrq,language:"zh-CN"}),$("#rz_sjz").val(dqrq)}function setGxrqfwJks(e){var t=e.split("-");$("#gxczfw_jks").text("（当期可勾选缴款书的填发日期范围为："+changeDateYYYYMMDD(t[0])+"-"+changeDateYYYYMMDD(t[1])+"）");var s=dateYYYYandMMandDD(t[0]);cshJksDate(),$("#jksrzsj_q").datepicker({format:"yyyy-mm-dd",autoclose:!0,startDate:s,endDate:dqrq,language:"zh-CN"}),$("#jksrzsj_z").datepicker({format:"yyyy-mm-dd",autoclose:!0,startDate:s,endDate:dqrq,language:"zh-CN"}),$("#jksrzsj_z").val(dqrq)}function cshFpDate(){var e=gxfw.split("-"),t="",s="";$("#kprq_sp").show(),$("#nkprq_sp").hide(),$("#ykprq_sp").hide(),t=dateYYYYandMMandDD(e[0]),s=dateYYYYandMMandDD(e[1]),$("#sjq").val(KPRQQSSJ.substring(0,4)+"-"+KPRQQSSJ.substring(4)+"-01"),$("#sjz").val(s),$("#sjq").datepicker({format:"yyyy-mm-dd",autoclose:!0,startDate:t,endDate:s,language:"zh-CN"}),$("#sjz").datepicker({format:"yyyy-mm-dd",autoclose:!0,startDate:t,endDate:s,language:"zh-CN"})}function cshJksDate(){var e=gxfw.split("-"),t="",s="";$("#tfrq_sp").show(),$("#ntfrq_sp").hide(),$("#ytfrq_sp").hide(),t=dateYYYYandMMandDD(e[0]),s=dateYYYYandMMandDD(e[1]),$("#tfsjq").val(KPRQQSSJ.substring(0,4)+"-"+KPRQQSSJ.substring(4)+"-01"),$("#tfsjz").val(s),$("#tfsjq").datepicker({format:"yyyy-mm-dd",autoclose:!0,startDate:t,endDate:s,language:"zh-CN"}),$("#tfsjz").datepicker({format:"yyyy-mm-dd",autoclose:!0,startDate:t,endDate:s,language:"zh-CN"})}function searchInfo(e){var t=$('input[name="pzlx"]:checked').val();"1"==t?searchfpGx(e):"2"==t&&searchjksGx(e)}function searchfpGx(e){var t=$("#fphm").val(),s=$("#fpdm").val(),a=$("#xfsbh").val(),n=$("input[type=radio][name=rzzt]:checked").val(),i=$("input[type=radio][name=glzt]:checked").val(),r=$("input[type=radio][name=fplx]:checked").val(),o=$("input[type=radio][name=fpzt]:checked").val(),d="",l="";if(checkFpdm(s)&&checkFphm(t)&&velidateXfsbh(a)){if("0"==n){if(d=$("#sjq").val(),l=$("#sjz").val(),""==d||""==l)return void jAlert("<div id='popup_message'>请选择查询的开票日期区间！</div>","提示");if(d>l)return void jAlert("<div id='popup_message'>开票日期选择的开始日期不能大于截止日期，请重新选择！</div>","提示");$("#a1").prop("checked",!1)}else{if(d=$("#rz_sjq").val(),l=$("#rz_sjz").val(),""==d||""==l)return void jAlert("<div id='popup_message'>请选择查询的勾选日期区间！</div>","提示");if(d>l)return void jAlert("<div id='popup_message'>勾选日期选择的开始日期不能大于截止日期，请重新选择！</div>","提示");$("#a1").prop("checked",!0)}var p=getCert();if(velidateNsrsbh(p)){$("#search").hide(),$("#sub").hide(),$("#unsearch").show(),$(".container").hide(),spinner.spin(target);var c=0;$("#example").dataTable({destroy:!0,columns:[{mRender:function(e,t,s){var a=e.split("="),n="",i="",r="",o="0";return"1"==a[0]?(i="checked",o="1"):"0"==a[1]&&"1"!=a[2]||(r="disabled"),n='<input type="checkbox" name="checkbox1" '+i+" "+r+' value="'+o+'" />'},sClass:"checkboxes",width:"45px"},{title:"发票代码"},{title:"发票号码"},{title:"开票日期"},{title:"销方名称"},{title:"金额"},{title:"税额"},{title:"有效税额",mRender:function(e,t,s){var a=e.split("="),n="",i="",r=a[1];return"1"==a[0]&&(i="disabled"),n='<div class="fill_ipt"><input type="text" class="form-control showbig" style="width: 140px" '+i+'  id="'+c+'" value="'+r+'"  onblur= "rehqvalue(this,'+r+","+c+')" /></div>',c+=1,n}},{title:"发票状态",mRender:function(e,t,s){var a="—";return"0"==e?a="正常":"1"==e?a="已失控":"2"==e?a="已作废":"3"==e?a="已红冲":"4"==e?a="异常":"5"==e&&(a="认证异常"),a}},{title:"发票类型",mRender:function(e,t,s){var a="";return"01"==e?a="增值税专用发票":"02"==e?a="货运专用发票":"03"==e?a="机动车发票":"14"==e?a="通行费电子发票":"08"==e&&(a="增值税电子专用发票"),a}},{title:"信息来源",mRender:function(e,t,s){var a="";return a="0"==e?"扫描认证":"1"==e?"系统推送":"2"==e?"历史税控扫描认证":""}},{title:"是否勾选",mRender:function(e,t,s){var a="";return a="0"==e?"否":"是"}},{title:"勾选时间"},{title:"管理状态",mRender:function(e,t,s){var a="",n="-";return"0"==e?n="正常":"1"==e?n="非正常":"2"==e&&(n="疑似非正常"),a='<span value="'+e+'">'+n+"</span>"}},{title:"操作"}],processing:!0,serverSide:!0,sAjaxSource:IP+"/dkgx.do",oLanguage:{sLengthMenu:"每页显示 _MENU_ 条记录",sInfo:"显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",oPaginate:{sPrevious:"上一页",sNext:"下一页"},sInfoEmpty:"显示 0 到 0 共 0 条记录",sInfoFiltered:"",sZeroRecords:"未找到符合条件的记录"},searching:!1,scrollX:!0,bSort:!1,aLengthMenu:[50,80,100],iDisplayLength:50,columnDefs:[{orderable:!1,targets:[0]},{className:"tdleft",targets:[4,9,10]},{className:"tdcenter",targets:[0,1,2,3,8,11,12,13,14]},{className:"tdright",targets:[5,6,7]}],initComplete:function(){},fnRowCallback:function(e,t,s){"2"==t[13]?$(e).css("background-color","#FFD700"):"1"==t[13]&&($(e).css("background-color","#FF4040"),$(e).css("color","#fff"))},fnServerData:function(e,u,h){$.ajax({url:e,data:{id:"dkgxquery",fpdm:s,fphm:t,rq_q:d,rq_z:l,xfsbh:a,rzzt:n,glzt:i,fpzt:o,fplx:r,cert:p,token:token,aoData:JSON.stringify(u),ymbb:ymbb},type:"post",dataType:"jsonp",timeout:TIMEOUT,success:function(e){c=0;var t=e.key1;if("200"==t){token=e.key2,clearCookie("token"),setCookie("token",token,seconds);var s=e.key3,a=e.key4;$(".container").show(),h(s),0==a?(jAlert("<div id='popup_message'>没有符合条件的记录！</div>","提示"),$("#a1").prop("checked",!1),$("#sub").hide(),$("#unsub").show()):(operateTable(),$("#unsub").hide(),$("#sub").show())}else reloadInfo(),handleResult(e);spinner.stop(),$("#unsearch").hide(),$("#search").show()},error:function(e){spinner.stop(),reloadInfo(),handleAjaxException(e),$("#unsearch").hide(),$("#search").show()}})}})}}}function searchjksGx(e){var t=getCert();if(velidateNsrsbh(t)){var s="",a="",n=$("input[type=radio][name=jksrzzt]:checked").val(),i=$("input[type=radio][name=jksglzt]:checked").val(),r=$("input[type=radio][name=sqhdzt]:checked").val(),o=$("#jkshm").val();if(null==o||void 0==o||""==o.replace(/ /g,"")||checkJkshm(o)){if(0==n){if(s=$("#tfsjq").val(),a=$("#tfsjz").val(),""==s||""==a)return void jAlert("<div id='popup_message'>请选择所查缴款书的填发日期区间！</div>","提示");if(s>a)return void jAlert("<div id='popup_message'>填发日期选择的开始日期不能大于截止日期，请重新选择！</div>","提示");$("#a2").prop("checked",!1)}else if(1==n){if(s=$("#jksrzsj_q").val(),a=$("#jksrzsj_z").val(),""==s||""==a)return void jAlert("<div id='popup_message'>请选择勾选日期区间！</div>","提示");if(s>a)return void jAlert("<div id='popup_message'>勾选日期选择的开始日期不能大于截止日期，请重新选择！</div>","提示");$("#a2").prop("checked",!0)}$("#search").hide(),$("#unsearch").show(),$("#jksTable").hide(),$("#tjdiv").hide(),spinner.spin(target);var d=0;$("#order-table").dataTable({destroy:!0,columns:[{mRender:function(e,t,s){var a=e.split("="),n="",i="",r="",o="0";return"1"==a[0]?(i="checked",o="1"):"1"!=a[1]&&"1"!=a[2]||(r="disabled"),n='<input type="checkbox" name="checkbox2" '+i+" "+r+' value="'+o+'" />'},sClass:"checkboxes",width:"30px"},{title:"缴款书号码"},{title:"填发日期"},{title:"税款金额"},{title:"有效税款金额",mRender:function(e,t,s){var a="",i="",r=e;return"1"==n&&(i="disabled"),a='<div class="fill_ipt"><input type="text" class="form-control showbig" style="width:85%" '+i+'  id="jkshm'+d+'" value="'+r+'"  onblur= "checkJksYxse('+r+","+d+')" /></div>',d+=1,a}},{title:"信息来源",mRender:function(e,t,s){var a="—";return"1"==e?a="系统推送":"2"==e?a="数据采集":"3"==e&&(a="核查转入"),a}},{title:"是否勾选",mRender:function(e,t,s){var a="—";return"0"==e?a="否":"1"==e&&(a="是"),a}},{title:"勾选时间",mRender:function(e,t,s){var a="-",n=e.split("="),i=n[0],r=n[1];return a="0"==i?"-":r}},{title:"管理状态",mRender:function(e,t,s){var a="—";return a="0"==e?"正常":"1"==e?"非正常":"-"}},{title:"是否录入不符项",mRender:function(e,t,s){var a="-";return a="0"==e?"否":"1"==e?"是":"-"}},{title:"操作"}],processing:!1,serverSide:!0,sAjaxSource:IP+"/jksgx.do",oLanguage:{sLengthMenu:"每页显示 _MENU_ 条记录",sInfo:"显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",oPaginate:{sPrevious:"上一页",sNext:"下一页"},sInfoEmpty:"显示 0 到 0 共 0 条记录",sInfoFiltered:"",sZeroRecords:"未找到符合条件的记录"},searching:!1,scrollX:!0,bSort:!1,aLengthMenu:[50,80,100],iDisplayLength:50,columnDefs:[{className:"tdleft",targets:[]},{className:"tdcenter",targets:[0,1,2,5,6,7,8,9,10]},{className:"tdright",targets:[3,4]}],initComplete:function(){},fnServerData:function(e,l,p){$.ajax({url:IP+"/querymm.do",type:"post",data:{cert:t,funType:"03"},dataType:"jsonp",timeout:TIMEOUT,contentType:"application/x-www-form-urlencoded;charset=utf-8",jsonp:"callback",success:function(c){c.page;$.ajax({url:e,data:{method:"query",rq_q:s,rq_z:a,jkshm:o,rzzt:n,glzt:i,sqhdzt:r,cert:t,token:token,aoData:JSON.stringify(l),ymbb:ymbb},type:"post",dataType:"jsonp",timeout:LONGTIMEOUT,success:function(e){d=0,spinner.stop(),$("#jksTable").show(),$("#tjdiv").show();var t=e.key1;if("200"==t){var s=e.key2,a=e.key4;p(s),0==a?($("#a2").prop("checked",!1),jAlert("<div id='popup_message'>没有符合条件的记录！</div>","提示")):(operateJksTable(),$("#tj").show(),$("#untj").hide()),token=e.key3,clearCookie("token"),setCookie("token",token,seconds)}else clearJksData(),handleResult(e);$("#unsearch").hide(),$("#search").show()},error:function(e){spinner.stop(),$("#unsearch").hide(),$("#search").show(),$("#jksTable").show(),$("#tjdiv").show(),clearJksData(),handleAjaxException(e)}})},error:function(e){spinner.stop(),$("#jksTable").show(),$("#tjdiv").show(),jAlert("<div id='popup_message'>网络异常，请重试！</div>","提示")}})}})}}}function reloadInfo(){$(".container").show(),clearHxData()}function rehqvalue(e,t,s){""==e.value&&(e.value=t),checkYxse(s)}function clearHxData(){$("#example").dataTable({data:[],destroy:!0,processing:!1,serverSide:!1,oLanguage:{sLengthMenu:"每页显示 _MENU_ 条记录",sInfo:"显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",oPaginate:{sPrevious:"上一页",sNext:"下一页"},sInfoEmpty:"显示 0 到 0 共 0 条记录",sInfoFiltered:" ",sZeroRecords:"未找到符合条件的记录",sProcessing:""},searching:!1,scrollX:!0,bSort:!1,aLengthMenu:[50,80,100],iDisplayLength:50,columnDefs:[{orderable:!1,targets:[0]},{className:"tdleft",targets:[4,9,10]},{className:"tdcenter",targets:[0,1,2,3,8,11,12,13,14]},{className:"tdright",targets:[5,6,7]}],initComplete:function(){}})}function getSubmitData(){for(var e="",t="",s="",a="",n="",i=$("#example").dataTable(),r=i.fnGetData(),o=i.fnGetNodes(),d=[],l=0;l<r.length;l++){var p="0";"1"==$(o[l]).find("input:eq(0)").val()&&(p="1");var c="0";"是"==$(o[l]).find("td:eq(11)").html()&&(c="1");var u=$(o[l]).find("td:eq(6)").html(),h=$(o[l]).find("td:eq(7)").find("input").val();p!=c&&(e+=$(o[l]).find("td:eq(1)").html(),e+="=",t+=$(o[l]).find("td:eq(2)").html(),t+="=",s+=$(o[l]).find("td:eq(3)").html(),s+="=",a+=p,a+="=",n+="1"==p?h:u,n+="=")}return""==e||""==t||""==a||""==s?null:(d.push(e.substring(0,e.length-1)),d.push(t.substring(0,t.length-1)),d.push(s.substring(0,s.length-1)),d.push(a.substring(0,a.length-1)),d.push(n.substring(0,n.length-1)),d)}function getJksGxData(){for(var e="",t="",s="",a="",n="",i=0,r=0,o=0,d=$("#order-table").dataTable(),l=d.fnGetData(),p=d.fnGetNodes(),c=[],u=0;u<l.length;u++){var h="0";"1"==$(p[u]).find("input:eq(0)").val()&&(h="1");var v="0";if("是"==$(p[u]).find("td:eq(6)").html()&&(v="1"),h!=v){var f=$(p[u]).find("td:eq(1)").html(),g=$(p[u]).find("td:eq(2)").html(),m=$(p[u]).find("td:eq(3)").html(),k=$("#jkshm"+u).val();if(null!=k&&void 0!=k&&k.replace(/ /g,"")!=k)return jAlert("<div id='popup_message'>有效税额不合法，请重新输入(有效税额不能包含空格)！</div>","提示"),$("jkshm"+u).val(m),"error";if(isNaN(k))return jAlert("<div id='popup_message'>有效税额不合法，请重新输入！</div>","提示"),$("jkshm"+u).val(m),"error";if(null==k||void 0==k||""==k.replace(/ /g,""))return jAlert("<div id='popup_message'>请输入有效税额！</div>","提示"),$("jkshm"+u).val(m),"error";if(parseFloat(m)<parseFloat(k))return jAlert("<div id='popup_message'>有效税额需小于等于税款金额，请重新输入！</div>","提示"),$("jkshm"+u).val(m),"error";if(parseFloat(k)<0)return jAlert("<div id='popup_message'>有效税额不能小于0，请重新输入！</div>","提示"),$("jkshm"+u).val(m),"error";var b=k.split(".");if(2==b.length&&b[1].length>2)return jAlert("<div id='popup_message'>有效税额最多只能保留两位小数，请重新输入！</div>","提示"),$("jkshm"+u).val(m),"error";changeColor("jkshm"+u,"black"),r=mathDecimal.add(r,m),o=mathDecimal.add(o,k),e+=f,e+="=",n+=g,n+="=",t+=m,t+="=",s+=k,s+="=",a+=h,a+="=",i=parseInt(i)+1}}return""==e||""==a||""==s||""==g?null:(c.push(e.substring(0,e.length-1)),c.push(t.substring(0,t.length-1)),c.push(s.substring(0,s.length-1)),c.push(getFormatYuan(Math.abs(r))),c.push(getFormatYuan(Math.abs(o))),c.push(a.substring(0,a.length-1)),c.push(i),c.push(n.substring(0,n.length-1)),c)}function caculateInfo(){for(var e=[[0,0,0,0,0],[0,0,0,0,0]],t=$("#example").dataTable(),s=t.fnGetData(),a=t.fnGetNodes(),n=0;n<s.length;n++){var i="0";"1"==$(a[n]).find("input:eq(0)").val()&&(i="1");var r="0";if("是"==$(a[n]).find("td:eq(11)").html()&&(r="1"),i!=r){e[i][0]+=1,e[i][1]+=parseFloat($(a[n]).find("td:eq(5)").html()),e[i][2]+=parseFloat($(a[n]).find("td:eq(6)").html()),e[i][3]+=parseFloat($(a[n]).find("td:eq(7)").find("input").val());var o=$(a[n]).find("td:eq(13)").find("span:eq(0)").attr("value");"2"==o?e[i][4]+=2:e[i][4]+=0}}return e}function confirmSub(){var e=$('input[name="pzlx"]:checked').val();"1"==e?confirmSubFp():"2"==e&&confirmSubJks()}function confirmSubFp(){var e=getCert();if(velidateNsrsbh(e)){var t=caculateInfo(),s="";0==t[1][0]&&0==t[0][0]||(s+="<p style='font-weight:bold;text-align: left;'>本次勾选的发票汇总如下：</p><br/>"),0!=t[1][0]&&(s+="<p style='text-align: left;line-height: 25px;text-indent: 2em;'>本次勾选：<span style='color:red'>"+t[1][0]+"</span>份，金额合计：<span style='color:red'>"+getFormatYuan(t[1][1].toFixed(2))+"</span>元，税额合计：<span style='color:red'>"+getFormatYuan(t[1][2].toFixed(2))+"</span>元，有效税额合计：<span style='color:red'>"+getFormatYuan(t[1][3].toFixed(2))+"</span>元</p>"),0!=t[0][0]&&(s+="<p style='text-align: left;line-height: 25px;text-indent: 2em;'>本次撤销：<span style='color:red'>"+t[0][0]+"</span>份，金额合计：<span style='color:red'>"+getFormatYuan(t[0][1].toFixed(2))+"</span>元，税额合计：<span style='color:red'>"+getFormatYuan(t[0][2].toFixed(2))+"</span>元，有效税额合计：<span style='color:red'>"+getFormatYuan(t[0][3].toFixed(2))+"</span>元</p>"),""!=s?"success"==validateYxse()&&(0!=t[1][0]&&t[1][4]>0?jConfirm("<div id='popup_message'>本次勾选发票存在涉嫌虚开风险，若继续勾选抵扣可能引发税收风险和经济利益的损失。&nbsp;&nbsp;<p style='font-weight:bold;text-align: left;''><br/>请确认是否提交？</p></div><br/>","提示信息",function(e){e&&jConfirm("<div id='popup_message'>"+s+"&nbsp;&nbsp;<p style='font-weight:bold;text-align: left;''>请确认是否提交？</p></div><br/>","提示信息",function(e){e&&isSubmit()})}):jConfirm("<div id='popup_message'>"+s+"&nbsp;&nbsp;<p style='font-weight:bold;text-align: left;''>请确认是否提交？</p></div><br/>","勾选认证信息",function(e){e&&isSubmit()})):jAlert("<div id='popup_message'>没有可提交的数据！</div>","提示信息")}}function confirmSubJks(){var e=getCert();if(velidateNsrsbh(e)){var t=$("input[type=radio][name=jksrzzt]:checked").val(),s=getJksGxData();if(null==s||void 0==s||""==s)return void jAlert("<div id='popup_message'>没有可提交的数据！</div>","提示信息");var a={jkshms:s[0],ses:s[1],yxses:s[2],num:s[6],zts:s[5],tfrqs:s[7],cert:e,token:getCookie("token"),ymbb:ymbb};isCanPost&&""!=a&&(isCanPost=!1,spinner.spin(target),$.ajax({url:IP+"/querymm.do",type:"post",data:{cert:e,funType:"02"},dataType:"jsonp",timeout:TIMEOUT,contentType:"application/x-www-form-urlencoded;charset=utf-8",jsonp:"callback",success:function(n){var i=(n.page,s[0]+s[1]+s[2]+s[5]+s[7]),r=hex_md5(encodeURIComponent(i));a={method:"jksgx",jkshms:s[0],ses:s[1],yxses:s[2],num:s[6],zts:s[5],tfrqs:s[7],rzzt:t,cert:e,token:getCookie("token"),ymbb:ymbb,sign:r},$.ajax({type:"post",url:IP+"/jksgx.do",data:a,dataType:"jsonp",jsonp:"callback",timeout:TIMEOUT,success:function(e){spinner.stop(),isCanPost=!0,$(".theme-popover-mask2").fadeOut(100),$(".theme-popover2").slideUp(200);var t=e.key1;if("200"==t){var s=e.key2;"ysd"==s?jAlert("<div id='popup_message'>您已完成当期勾选缴款书的统计，当期缴款书勾选已被锁定；若您需在当期继续勾选缴款书，请前往“抵扣勾选统计”功能进行“撤销统计”。</div>","提示"):"wsd"==s&&jAlert_correct("<div id='popup_message'><span>提交成功！</span></div>","提示",function(e){e&&searchjksGx()}),token=e.key3,clearCookie("token"),setCookie("token",token,seconds)}else handleResult(e)},error:function(e){spinner.stop(),$(".theme-popover-mask2").fadeOut(100),$(".theme-popover2").slideUp(200),handleAjaxException(e)}})},error:function(e){spinner.stop(),jAlert("<div id='popup_message'>网络异常，请重试！</div>","提示")}})),unCheckBox2()}}function isSubmit(){var e=getSubmitData(),t="",s=getCert();velidateNsrsbh(s)&&($.ajax({url:IP+"/querymm.do",type:"post",data:{cert:s,funType:"02"},dataType:"jsonp",timeout:TIMEOUT,contentType:"application/x-www-form-urlencoded;charset=utf-8",jsonp:"callback",success:function(a){a.page;if(isCanPost){isCanPost=!1;var n=e[0]+e[1]+e[2]+e[3]+e[4],i=hex_md5(encodeURIComponent(n));spinner.spin(target),t={id:"dkgxcommit",fpdm:e[0],fphm:e[1],kprq:e[2],zt:e[3],yxse:e[4],cert:s,token:getCookie("token"),ymbb:ymbb,sign:i},$.ajax({type:"post",url:IP+"/dkgx.do",data:t,dataType:"jsonp",timeout:TIMEOUT,jsonp:"callback",success:function(e){spinner.stop(),isCanPost=!0;var t=e.key1;"200"==t?(token=e.key2,clearCookie("token"),setCookie("token",token,seconds),jAlert_correct("<div id='popup_message'><span>数据提交成功！</span></div>","提交成功",function(e){e&&searchInfo()})):"n4100004"==t?jAlert("<div id='popup_message'>您已完成当期勾选发票的统计，当期发票勾选已被锁定；若您需在当期继续勾选发票，请前往“抵扣勾选统计”功能进行“撤销统计”。</div>","提示"):handleResult(e)},error:function(e){isCanPost=!0,spinner.stop(),handleAjaxException(e)}})}},error:function(e){handleAjaxException(e)}}),unCheckBox())}function changeWindow(){var e=$('input[name="pzlx"]:checked').val();if("1"==e){var t=caculateInfo();return 0==t[1][0]&&0==t[0][0]||(jAlert("<div id='popup_message'>存在可以提交的发票数据！</div>","提示信息"),!1)}var t=getJksGxData();return null==t||void 0==t||""==t||(jAlert("<div id='popup_message'>存在可以提交的缴款书数据，请先提交！</div>","提示信息"),!1)}function checkYxse(e){for(var t=$("#"+e).val(),s="",a=$("#example").dataTable(),n=a.fnGetData(),i=a.fnGetNodes(),r=0;r<n.length;r++)if(r==e){s=$(i[r]).find("td:eq(6)").html();break}if(null!=t&&void 0!=t&&t.replace(/ /g,"")!=t)return jAlert("<div id='popup_message'>有效税额不合法，请重新输入(有效税额不能包含空格)！</div>","提示"),void changeColor(r,"red");if(null==t||void 0==t||""==t.replace(/ /g,""))return jAlert("<div id='popup_message'>请输入有效税额！</div>","提示"),void changeColor(e,"red");if(isNaN(t))return jAlert("<div id='popup_message'>有效税额不合法，请重新输入！</div>","提示"),void changeColor(e,"red");if(parseFloat(s)<parseFloat(t))return jAlert("<div id='popup_message'>有效税额需小于等于税款金额，请重新输入！</div>","提示"),void changeColor(e,"red");if(parseFloat(t)<0)return jAlert("<div id='popup_message'>有效税额不能小于0，请重新输入！</div>","提示"),void changeColor(e,"red");var o=t.split(".");return 2==o.length&&o[1].length>2?(jAlert("<div id='popup_message'>有效税额最多只能保留两位小数，请重新输入！</div>","提示"),void changeColor(e,"red")):void changeColor(e,"black")}function validateYxse(){for(var e=$("#example").dataTable(),t=e.fnGetData(),s=e.fnGetNodes(),a=0;a<t.length;a++)if("0"!=$(s[a]).find("input:eq(0)").val()){var n=$("#"+a).val(),i=$(s[a]).find("td:eq(6)").html();if(null!=n&&void 0!=n&&n.replace(/ /g,"")!=n)return jAlert("<div id='popup_message'>有效税额不合法，请重新输入(有效税额不能包含空格)！</div>","提示"),changeColor(a,"red"),"error";if(null==n||void 0==n||""==n.replace(/ /g,""))return jAlert("<div id='popup_message'>请输入有效税额！</div>","提示"),changeColor(a,"red"),"error";if(isNaN(n))return jAlert("<div id='popup_message'>有效税额不合法，请重新输入！</div>","提示"),changeColor(a,"red"),"error";if(parseFloat(i)<parseFloat(n))return jAlert("<div id='popup_message'>有效税额需小于等于税款金额，请重新输入！</div>","提示"),changeColor(a,"red"),"error";if(parseFloat(n)<0)return jAlert("<div id='popup_message'>有效税额不能小于0，请重新输入！</div>","提示"),changeColor(a,"red"),"error";var r=n.split(".");if(2==r.length&&r[1].length>2)return jAlert("<div id='popup_message'>有效税额最多只能保留两位小数，请重新输入！</div>","提示"),changeColor(a,"red"),"error";changeColor(a,"black")}return $("#sub").show(),$("#unsub").hide(),"success"}function operateTable(){for(var e=$("#example").dataTable(),t=e.fnGetData(),s=0;s<t.length;s++)document.getElementById(s).readOnly=!0}function checkJksYxse(e,t){var s=$("#jkshm"+t).val();if(null!=s&&void 0!=s&&s.replace(/ /g,"")!=s)return jAlert("<div id='popup_message'>有效税额不合法，请重新输入(有效税额不能包含空格)！</div>","提示"),void $("#jkshm"+t).val(e);if(null==s||void 0==s||""==s.replace(/ /g,""))return $("#jkshm"+t).val(e),void jAlert("<div id='popup_message'>有效税额不合法，请重新输入！</div>","提示");if(isNaN(s))return jAlert("<div id='popup_message'>有效税额不合法，请重新输入！</div>","提示"),void $("#jkshm"+t).val(e);if(parseFloat(e)<parseFloat(s))return jAlert("<div id='popup_message'>有效税额需小于等于税款金额，请重新输入！</div>","提示"),void $("#jkshm"+t).val(e);if(parseFloat(s)<0)return jAlert("<div id='popup_message'>有效税额不能小于0，请重新输入！</div>","提示"),void $("#jkshm"+t).val(e);var a=s.split(".");return 2==a.length&&a[1].length>2?(jAlert("<div id='popup_message'>有效税额最多只能保留两位小数，请重新输入！</div>","提示"),void $("#jkshm"+t).val(e)):void changeColor("jkshm"+t,"black")}function operateJksTable(){for(var e=$("#order-table").dataTable(),t=e.fnGetData(),s=0;s<t.length;s++)document.getElementById("jkshm"+s).readOnly=!0}function chooseLb(e){if("1"==e){$("#con_tjtb_2").hide(),$("#con_tjtb_1").show(),$("#title_fp").show(),$("#title_jks").hide();var t=$("input[type=radio][name=rzzt]:checked").val();chooseRzzt(t)}else{InitJksDataTable(),$("#con_tjtb_2").show(),$("#con_tjtb_1").hide(),$("#title_fp").hide(),$("#title_jks").show(),$.fn.dataTable.tables({visible:!0,api:!0}).columns.adjust();var t=$("input[type=radio][name=jksrzzt]:checked").val();chooseJksRzzt(t)}}function chooseRzzt(e){"1"==e?($("#kprq_sp").hide(),$("#rzrq_sp").show()):($("#rzrq_sp").hide(),cshFpDate())}function chooseJksRzzt(e){"1"==e?($("#tfrq_sp").hide(),$("#jksrzrq_sp").show()):($("#jksrzrq_sp").hide(),cshJksDate())}function unCheckBox(){1==$("#a1").is(":checked")&&$("#a1").prop("checked",!1)}function unCheckBox2(){1==$("#a2").is(":checked")&&$("#a2").prop("checked",!1)}function clearJksData(){$("#order-table").dataTable({data:[],destroy:!0,processing:!1,serverSide:!1,oLanguage:{sLengthMenu:"每页显示 _MENU_ 条记录",sInfo:"显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",oPaginate:{sPrevious:"上一页",sNext:"下一页"},sInfoEmpty:"显示 0 到 0 共 0 条记录",sInfoFiltered:" ",sZeroRecords:"未找到符合条件的记录",sProcessing:""},searching:!1,scrollX:!0,bSort:!1,aLengthMenu:[50,80,100],iDisplayLength:50,columnDefs:[{className:"tdcenter",targets:[0,1,2,5,6,7,8,9,10]},{className:"tdright",targets:[3,4]}]})}function InitJksDataTable(){$("#order-table").dataTable({destroy:!0,bFilter:!1,oLanguage:{sLengthMenu:"每页显示 _MENU_ 条记录",sInfo:"显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",oPaginate:{sPrevious:"上一页",sNext:"下一页"},sInfoEmpty:"显示 0 到 0 共 0 条记录",sZeroRecords:"未找到符合条件的记录"},aLengthMenu:[50,80,100],searching:!1,scrollX:!0,bSort:!1,iDisplayLength:50})}function cancle(){$(".theme-popover-mask2").fadeOut(100),$(".theme-popover2").slideUp(200)}$("#pageload").show(),checkOwner("dkgx_fpdk.6039ec8e.html");var ymbb="4.0.08",isCanPost=!0,token=getCookie("token");setCookie("token",token,seconds);var KPRQQSSJ="",gxfw="",zqyqjzr="",dqrq=getCookie("dqrq");setCookie("dqrq",dqrq,seconds),""==dqrq&&(dqrq=getDqrq()),"Y"==DZZPSHOW?$("#zzsdz").show():$("#zzsdz").hide(),"Y"==HHL_YSFZC_SHOW?($("#hhl_ysfzc").show(),$("#hhl_tips").show(),$("#old_tips").hide()):($("#hhl_ysfzc").hide(),$("#old_tips").show(),$("#hhl_tips").hide()),$(document).ready(function(){if(""==token||void 0==token)jAlert_close("<div id='popup_message'>会话失效，请重新登录！</div>","提示",function(e){e&&(window.location.href=getDomainName())});else if(showMenu(token)){var e=getCert();if(!velidateNsrsbh(e))return;var t={cert:e,token:token,ymbb:ymbb};$(".btn-slide").click(function(){return $("#panel").slideToggle("slow"),$(this).toggleClass("active"),!1}),InitDataTable();var s=getCookie("skssq");if(""==s)$.ajax({type:"post",url:IP+"/hqssq.do",dataType:"jsonp",data:t,timeout:TIMEOUT,jsonp:"callback",success:function(e){var t=e.key1;if("200"==t){token=e.key2,clearCookie("token"),setCookie("token",token,seconds),s=e.key3,setCookie("skssq",s,seconds),gxfw=e.key4,zqyqjzr=e.key6,setCookie("gxrqfw",gxfw,seconds);var a=s.split(";");KPRQQSSJ=a[0],$("#rz_sjq").val(KPRQQSSJ.substring(0,4)+"-"+KPRQQSSJ.substring(4)+"-01"),$("#jksrzsj_q").val(KPRQQSSJ.substring(0,4)+"-"+KPRQQSSJ.substring(4)+"-01"),$("#ssq").text(changeDateYYYYMM(a[0])),$("#kgxsj").text("（当期可进行勾选操作的截止日期为："+changeDateYYYYMMDD(a[1])+"）")}else handleResult(e)},error:function(e){handleAjaxException(e)}});else{var a=s.split(";");KPRQQSSJ=a[0],$("#rz_sjq").val(KPRQQSSJ.substring(0,4)+"-"+KPRQQSSJ.substring(4)+"-01"),$("#jksrzsj_q").val(KPRQQSSJ.substring(0,4)+"-"+KPRQQSSJ.substring(4)+"-01"),$("#ssq").text(changeDateYYYYMM(a[0])),$("#kgxsj").text("（当期可进行勾选操作的截止日期为："+changeDateYYYYMMDD(a[1])+"）")}gxfw=getCookie("gxrqfw"),setGxrqfwFp(gxfw),setGxrqfwJks(gxfw)}}),jQuery(document).ready(function(e){e(".theme-blsubmit2").click(function(){var t=getJksGxData();if("error"!=t&&null!=t&&""!=t&&void 0!=t){var s=e("input[type=radio][name=jksrzzt]:checked").val();0==s?(e("#gxrz").show(),e("#cxrz").hide(),e("#fs").text(t[6]),e("#skje").text(t[3]),e("#yxse").text(t[4])):1==s&&(e("#gxrz").hide(),e("#cxrz").show(),e("#cxfs").text(t[6]),e("#cxse").text(t[3]),e("#cxyxse").text(t[4])),e(".theme-popover-mask2").fadeIn(100),e(".theme-popover2").slideDown(200)}null!=t&&""!=t&&void 0!=t||jAlert("<div id='popup_message'>请选择要提交的数据！</div>","提示")}),e(".theme-poptit .close").click(function(){e(".theme-popover-mask2").fadeOut(100),e(".theme-popover2").slideUp(200)})}),$(".showbig").focus(function(){console.log("5555");var e=$(this).parent(".fill_ipt");if(0===e.find(".bigtx").size()){console.log("000000000000000000");var t="<div class='bigtx'><span></span><i></i></div>";e.append(t)}console.log($(this)[0].value);var s=$(this)[0].value,a=s;if(""!==a&&!isNaN(a)){var n=a.split("."),i=n[0],r="";n.length>1&&(r=n[1]);for(var o="",d=0,l=i.length-1;l>=0;l--)d++,o=i.charAt(l)+o,d%3||0===l||(o=","+o);a=o,""!==r&&(a+="."+r)}$(this).siblings(".bigtx").css({top:"-37px",opacity:"1"}),$(this).siblings(".bigtx").find("span").html(a),""===a&&$(this).siblings(".bigtx").css({top:"0",opacity:"0"})}).bind("input propertychange",function(){console.log("bind");var e=$(this).val(),t=e;if(""!==t&&!isNaN(t)){var s=t.split("."),a=s[0],n="";s.length>1&&(n=s[1]);for(var i="",r=0,o=a.length-1;o>=0;o--)r++,i=a.charAt(o)+i,r%3||0===o||(i=","+i);t=i,""!==n&&(t+="."+n)}$(this).siblings(".bigtx").css({top:"-37px",opacity:"1"}),$(this).siblings(".bigtx").find("span").html(t),""===t&&$(this).siblings(".bigtx").css({top:"0",opacity:"0"})}).blur(function(){console.log("blur"),$(this).siblings(".bigtx").css({top:"0",opacity:"0"});var e=$(this).parent(".fill_ipt");e.find(".bigtx").size()>0&&setTimeout(function(){e.find(".bigtx").remove()},200)}),$("input[type=radio][name=pzlx]").click(function(){chooseLb($(this).val())}),$("input[type=radio][name=rzzt]").click(function(){clearHxData(),chooseRzzt($(this).val())}),$("input[type=radio][name=jksrzzt]").click(function(){clearJksData(),chooseJksRzzt($(this).val())}),$("#example").on("click","tr",function(){var e=this.rowIndex-1,t="input[name='checkbox1']:eq("+(this.rowIndex-1)+")";$(t).is(":focus")&&(1==$(t).is(":checked")?($(this).find("input:eq(0)").val("1"),document.getElementById(e).readOnly=!1):($(this).find("input:eq(0)").val("0"),$("#a1").prop("checked",!1),document.getElementById(e).readOnly=!0))}),$("#order-table").on("click","tr",function(){var e=this.rowIndex-1,t="input[name='checkbox2']:eq("+(this.rowIndex-1)+")";$(t).is(":focus")&&(1==$(t).is(":checked")?($(this).find("input:eq(0)").val("1"),document.getElementById("jkshm"+e).readOnly=!1):($(this).find("input:eq(0)").val("0"),$("#a2").prop("checked",!1),document.getElementById("jkshm"+e).readOnly=!0))}),$("#a1").click(function(){if(1==$(this).is(":checked")){var e=0;$("input[name='checkbox1']").each(function(){0==$(this).is(":disabled")?($(this).prop("checked",!0),$(this).val("1"),document.getElementById(e).readOnly=!1,e++):e++})}else{var e=0;$("input[name='checkbox1']").each(function(){0==$(this).is(":disabled")?($(this).prop("checked",!1),$(this).val("0"),document.getElementById(e).readOnly=!0,e++):e++})}}),$("#a2").click(function(){if(1==$(this).is(":checked")){var e=0;$("input[name='checkbox2']").each(function(){0==$(this).is(":disabled")?($(this).prop("checked",!0),$(this).val("1"),document.getElementById("jkshm"+e).readOnly=!1,e++):e++})}else{var e=0;$("input[name='checkbox2']").each(function(){0==$(this).is(":disabled")?($(this).prop("checked",!1),$(this).val("0"),document.getElementById("jkshm"+e).readOnly=!0,e++):e++})}});