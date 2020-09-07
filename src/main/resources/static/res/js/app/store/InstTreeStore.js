Ext.define('Sys.app.store.InstTreeStore', {
	extend : 'Ext.data.TreeStore',
	proxy : {
		type : 'ajax',
		url : 'getInstTree.ajax?f=*.0203.getInstTree',
		reader : {
			type : 'json'
		}
	},
	root : {
		expanded : true
	}
})