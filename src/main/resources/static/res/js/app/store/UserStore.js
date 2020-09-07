Ext.define('Sys.app.store.UserStore', {
	extend : 'Ext.data.Store',
	pageSize : 20,
	autoLoad : false,
	fields : ['EYES_STAT','USER_ID', 'USER_ENAME', 'USER_CNAME', 'PASSWORD', 'INST_ID', 'INST_NAME', 'INST_SMP_NAME', 'DEPART_ID', 'DEPART_NAME', 
		'TEL', 'MOBILE','ADDRESS', 'EMAIL', 'LAST_MODIFY_DATE','IS_FIRST_LOGIN', 'WRONG_PWD_COUNT', 'WRONG_PWD_DATE', 'IS_USER_LOCKED', 'USER_LOCKED_RESON', 
		'START_DATE', 'END_DATE', 'CREATE_TIME', 'DESCRIPTION', 'ENABLED', 'IS_DELETE', 'LAST_LOGIN_DATE', 'PASSWORD_INITED', 'IP_LOCKED', 'WORK_STATE', 
		'CHANGE_STATUS', 'CHANGE_USER', 'CHECK_USER', 'LAST_LOGIN_IP'],
				proxy : {
					type : 'ajax',
					url : 'queryUser.ajax?f=BSYS.0203.query',
					reader : {
						type : 'json',
						root : 'users',
						totalProperty : 'total'
					}
				}
})
	