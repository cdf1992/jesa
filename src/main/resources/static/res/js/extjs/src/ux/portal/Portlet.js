/**
 * @class Ext.app.Portlet
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class that is managed by {@link Ext.app.PortalPanel}.
 */
Ext.define('Ext.ux.portal.Portlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.portlet',
    layout: 'fit',
    anchor: '100%',
    frame: true,
    closable: false,
    collapsible: true,
    animCollapse: true,
    draggable: {
        moveOnDrag: false    
    },
    cls: 'x-portlet',
    tools:[{
		    type:'refresh',
		    tooltip: '刷新数据',
		    handler: function(event, toolEl, panelHeader) {
		        if(this.up('portlet').items.getAt(0).portalRefresh){
		        	this.up('portlet').items.getAt(0).portalRefresh(event, toolEl, panelHeader);
		        }
		    }
		 },{
		    type:'gear',
		    tooltip: '配置',
		    handler: function(event, toolEl, panelHeader) {
		        if(this.up('portlet').items.getAt(0).portalConfig){
		        	this.up('portlet').items.getAt(0).portalConfig(event, toolEl, panelHeader);
		        }
		    }
		 }],
	
    // Override Panel's default doClose to provide a custom fade out effect
    // when a portlet is removed from the portal
    doClose: function() {
        if (!this.closing) {
            this.closing = true;
            this.el.animate({
                opacity: 0,
                callback: function(){
                    var closeAction = this.closeAction;
                    this.closing = false;
                    this.fireEvent('close', this);
                    this[closeAction]();
                    if (closeAction == 'hide') {
                        this.el.setOpacity(1);
                    }
                },
                scope: this
            });
        }
    }
});