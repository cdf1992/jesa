Ext.define('Ext.window.WindowActiveCls', {
    override: 'Ext.window.Window',
    shadow: false,
    ghost: false,
    border: false
});

Ext.define('Ext.tab.PanelCls', {
    override: 'Ext.tab.Panel',
    shadow: false,
    border: false
});

Ext.define('Ext.panel.PanelCls', {
    override: 'Ext.panel.Panel',
    shadow: false,
    border: false
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