function findThemeDom() {
    var links = document.getElementsByTagName('link'),
        returnValue;
    Array.prototype.forEach.call(links, function (item) {
        var arr = item.href.split('/');
        theme = arr[arr.length - 1];
        if (theme.slice(0, 7) === 'ext-all') {
            var fileNameArray = theme.split('.')[0].split('all');
            returnValue = 'navbar' + fileNameArray[1]
        }
    });
    return returnValue
}

Ext.define('Ext.ux.form.JesCheckbox', {
    extend: 'Ext.form.field.Checkbox',
    alias: ['widget.jescheckboxfield', 'widget.jescheckbox'],
    fieldSubTpl: [
        '<div class="{wrapInnerCls} {noBoxLabelCls} _labelWrap " role="presentation">',
        '<tpl if="labelAlignedBefore">',
        '{beforeBoxLabelTpl}',
        '<label id="{cmpId}-boxLabelEl" {boxLabelAttrTpl} class="{boxLabelCls} {boxLabelCls}-{boxLabelAlign} aaa" for="{id}">',
        '{beforeBoxLabelTextTpl}',
        '{boxLabel}',
        '{afterBoxLabelTextTpl}',
        '</label>',
        '{afterBoxLabelTpl}',
        '</tpl>',
        '<input type="button" id="{id}" role="{role}" {inputAttrTpl}',
        '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>',
        '<tpl if="disabled"> disabled="disabled"</tpl>',
        '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
        ' class="{fieldCls} {typeCls} {inputCls} {childElCls} {afterLabelCls} _radioDisplayNone" autocomplete="off" hidefocus="true" />',
        '<tpl if="boxLabel && !labelAlignedBefore">',
        '{beforeBoxLabelTpl}',
        '<label id="{cmpId}-boxLabelEl" {boxLabelAttrTpl} class="{boxLabelCls} {boxLabelCls}-{boxLabelAlign} _labelContent"  for="{id}">',
        '{beforeBoxLabelTextTpl}',
        '{boxLabel}',
        '{afterBoxLabelTextTpl}',
        '</label>',
        '<label id="{cmpId}-boxLabelEl" {boxLabelAttrTpl} class="{boxLabelCls} {boxLabelCls}-{boxLabelAlign} _labelCorrect"  for="{id}">',
        '√',
        '</label>',
        '</tpl>',
        '</div>',
        {
            disableFormats: true,
            compiled: true
        }
    ],

    initComponent: function () {
        this.loadCss();
        document.getElementsByTagName('body')[0].className+=' '+findThemeDom()
    },
    loadCss: function () {
        var curWwwPath = window.document.location.href;
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        var localhostPaht = curWwwPath.substring(0, pos);
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = localhostPaht + projectName + '/res/js/extjs/src/ux/form/css/JesCheckbox.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    }
});