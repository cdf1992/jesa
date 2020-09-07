Ext.define('Ext.window.WindowActiveCls', {
    override: 'Ext.window.Window',

    statics: {
        _activeWindow: null
    },

    shadow: false,
    ghost: false,
    ui: 'black-window-active',
    border: false,
    setActive: function (active, newActive) {

        this.callParent(arguments);

        var me = this;

        if (!me.el)
            return;

        if (Ext.getVersion().version >= '4.2.2.1144') {
            if (me.id.indexOf('window') == 0 && me.id.indexOf('-ghost') > 0)
                return;
        }

        var paw = Ext.window.Window._activeWindow;

        if (active) {
            me.addCls('x-window-active');
            
            Ext.window.Window._activeWindow = me;

            if (paw && paw != me && paw.el) {
                paw.removeCls('x-window-active');
            }
        } else {
            if (me!=paw)
                me.removeCls('x-window-active');
        }
    }
});
Ext.define('Ext.tab.PanelCls', {
    override: 'Ext.tab.Panel',
    shadow: false,
    border: false,
    ui: 'black-tab'
});
Ext.define('Ext.panel.PanelCls', {
    override: 'Ext.panel.Panel',
    shadow: false,
    border: false,
    ui: 'black-panel'
});
Ext.define('Ext.button.ButtonCls', {
    override: 'Ext.button.Button',
    ui: 'black-button'
});
Ext.define('Ext.ProgressBarCls', {
    override: 'Ext.ProgressBar',
    ui: 'black-progress'
});
Ext.define('Ext.ToolbarCls', {
    override: 'Ext.Toolbar',
    border: false
});
Ext.define('Ext.form.field.FileCls', {
    override: 'Ext.form.field.File',
    buttonConfig : {
        baseCls : 'x-btn-hrs'
    }
});