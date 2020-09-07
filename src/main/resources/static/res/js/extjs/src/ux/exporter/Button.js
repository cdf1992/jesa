/**
 * @class Ext.ux.Exporter.Button
 * @extends Ext.Component
 * @author Nige White, with modifications from Ed Spencer, with modifications from iwiznia.
 * Specialised Button class that allows downloading of data via data: urls.
 * Internally, this is just a link.
 * Pass it either an Ext.Component subclass with a 'store' property, or just a store or nothing and it will try to grab the first parent of this button that is a grid or tree panel:
 * new Ext.ux.Exporter.Button({component: someGrid});
 * new Ext.ux.Exporter.Button({store: someStore});
 * @cfg {Ext.Component} component The component the store is bound to
 * @cfg {Ext.data.Store} store The store to export (alternatively, pass a component with a getStore method)
 */
Ext.define("Ext.ux.exporter.Button", {
    extend:'Ext.button.Button',
	alias: "widget.exporterbutton",
	text:'导出Excel',
    iconCls : 'package-download-icon',
    handler : function(btn){
        var vExportContent = Ext.ux.exporter.Exporter.exportAny(btn.up('grid'), 'excel', Ext.apply({}, this.initialConfig));
        if (Ext.isIE) { // 判断浏览器
            //var w = window.open("about:blank","_blank");
            var ifa = document.getElementById('download').contentWindow.document;
            ifa.open();
            ifa.write(vExportContent);
            ifa.execCommand('Saveas', true, "下载.xls");
            ifa.close();
        } else {
            document.location = 'data:application/vnd.ms-excel;base64,'
                + Ext.ux.exporter.Base64.encode(vExportContent);
        }
    },
    constructor: function(config) {
      config = config || {};
      this.initConfig();
      Ext.ux.exporter.Button.superclass.constructor.call(this, config);
    }


});