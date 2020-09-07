Ext.define('Ext.ux.FunctionList', {
    extend: 'Ext.view.View',
    alias: 'widget.functionlist',
    autoHeight   : true,
    frame        : false,
    cls : 'func-list',
    itemSelector : 'dl',
    trackOver    : true,
    itemClickFn : Ext.emptyFn,
    tpl          : Ext.create('Ext.XTemplate',
        '<div id="sample-ct">',
            '<tpl for=".">',
                '<div style="clear:left;">',
                    '<a name="{id}"></a>',
                    '<h2><div>{title}</div></h2>',
                    '<dl>',
                        '<tpl for="items">',
                            '<dd><a href="javascript:void(0);" idx={[xindex-1]}>',
                            	'<img style="border:0;" src="res/img/icon-big/{icon}"/>',
                                '<div><h4>{text}',
                                    '<tpl if="this.isNew(values.status)">',
                                        '<span class="new-sample"> (New)</span>',
                                    '<tpl elseif="status">',
                                        '<span class="status"> ({status})</span>',
                                    '</tpl>',
                                '</h4><p>{desc}</p></div>',
                            '</a></dd>',
                        '</tpl>',
                    '</dl>',
                '</div>',
            '</tpl>',
        '</div>', {
         isNew: function(status){
             return status == 'new';
         }
    })
    , onContainerClick: function(e) {
        var group = e.getTarget('h2', 3, true);
        if (group) {
            group.up('div').toggleCls('collapsed');
        }
    }
	, onItemClick: function(h, j, l, i) {
		var a = i.getTarget("a");
		if(a){
			var idx = a.getAttribute("idx");
			this.fireEvent('callfunction', this, h.data.items[idx]);
		}
	    return this.callParent(arguments);
	}
	, initComponent: function() {
		this.on({
            afterrender: function(b) {
                b.el.addListener("mouseover",
                function(a, d) {
                    Ext.get(d).addCls("over")
                },
                this, {
                    delegate: "dd"
                });
                b.el.addListener("mouseout",
                function(a, d) {
                    Ext.get(d).removeCls("over")
                },
                this, {
                    delegate: "dd"
                })
            }
        });
		this.callParent(arguments);
	}
});