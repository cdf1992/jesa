/**
 * Ext时间控件扩展
 * 显示年月
 * @author liangshijun
 * @date 2017-5-11
 */
Ext.define('Ext.ux.jpt.monthDateControlExtend', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.monthfield',
    //requires: ['Ext.picker.Date'],
    //alternateClassName: ['Ext.form.DateField', 'Ext.form.Date'],


    format: "Y-m",

    altFormats: "m/y|m/Y|m-y|m-Y|my|mY|y/m|Y/m|y-m|Y-m|ym|Ym",

    //disabledDaysText: "Disabled",

    //disabledDatesText: "Disabled",

    //minText: "The date in this field must be equal to or after {0}",

    //maxText: "The date in this field must be equal to or before {0}",

    //invalidText: "{0} is not a valid date - it must be in the format {1}",

    triggerCls: Ext.baseCSSPrefix + 'form-date-trigger',

    //showToday: true,

    //initTime: '12',

    //initTimeFormat: 'H',

    matchFieldWidth: false,

    startDay: new Date(),

    initComponent: function () {
        var me = this;


        me.disabledDatesRE = null;

        me.callParent();
    },

    initValue: function () {
        var me = this,
            value = me.value;

        if (Ext.isString(value)) {
            me.value = Ext.Date.parse(value, this.format);
        }
        if (me.value)
            me.startDay = me.value;
        me.callParent();
    },

    rawToValue: function (rawValue) {
        return Ext.Date.parse(rawValue, this.format) || rawValue || null;
    },

    valueToRaw: function (value) {
        return this.formatDate(value);
    },



    formatDate: function (date) {
        return Ext.isDate(date) ? Ext.Date.dateFormat(date, this.format) : date;
    },
    createPicker: function () {
        var me = this,
            format = Ext.String.format;

        return Ext.create('Ext.picker.Month', {
            //renderTo: me.el,
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            shadow: false,
            focusOnShow: true,
            listeners: {
                scope: me,
                cancelclick: me.onCancelClick,
                okclick: me.onOkClick,
                yeardblclick: me.onOkClick,
                monthdblclick: me.onOkClick
            }
        });
    },

    onExpand: function () {
        //this.picker.show();
        this.picker.setValue(this.startDay);
        //
        
    },

    //    onCollapse: function () {
    //        this.focus(false, 60);
    //    },

    onOkClick: function (picker, value) {
        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, 1);
        me.startDay = date;
        me.setValue(date);
        this.picker.hide();
        //this.blur();
    },

    onCancelClick: function () {
        this.picker.hide();
        //this.blur();
    }

});

/**
 * @Description	选择年份控件
 * @author		cy
 */
Ext.define('Ext.ux.form.YearField', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.yearfield',
    //requires: ['Ext.picker.Date'],
    //alternateClassName: ['Ext.form.DateField', 'Ext.form.Date'],


    format: "Y",

    //altFormats: "m/y|m/Y|m-y|m-Y|my|mY|y/m|Y/m|y-m|Y-m|ym|Ym",

    //disabledDaysText: "Disabled",

    //disabledDatesText: "Disabled",

    //minText: "The date in this field must be equal to or after {0}",

    //maxText: "The date in this field must be equal to or before {0}",

    //invalidText: "{0} is not a valid date - it must be in the format {1}",

    triggerCls: Ext.baseCSSPrefix + 'form-date-trigger',

    //showToday: true,

    //initTime: '12',

    //initTimeFormat: 'H',

    matchFieldWidth: false,

    startDay: new Date(),

    initComponent: function () {
        var me = this;


        me.disabledDatesRE = null;

        me.callParent();
    },

    initValue: function () {
        var me = this,
            value = me.value;

        if (Ext.isString(value)) {
            me.value = Ext.Date.parse(value, this.format);
        }
        if (me.value)
            me.startDay = me.value;
        me.callParent();
    },

    rawToValue: function (rawValue) {
        return Ext.Date.parse(rawValue, this.format) || rawValue || null;
    },

    valueToRaw: function (value) {
        return this.formatDate(value);
    },



    formatDate: function (date) {
        return Ext.isDate(date) ? Ext.Date.dateFormat(date, this.format) : date;
    },
    createPicker: function () {
        var me = this,
            format = Ext.String.format;

        return Ext.create('Ext.picker.Month', {
            style: {
                height: '200px',
                width: '100px'
            },
            renderTpl: [
                '<div id="{id}-bodyEl" class="{baseCls}-body">',
                      '<div id="{id}-monthEl" class="{baseCls}-months" style="display:none">',
                          '<tpl for="months">',
                              '<div class="{parent.baseCls}-item {parent.baseCls}-month">',

                                  '<a style="{parent.monthStyle}" hidefocus="on" class="{parent.baseCls}-item-inner" href="#">{.}</a>',
                              '</div>',
                          '</tpl>',
                      '</div>',
                    '<div id="{id}-yearEl" class="{baseCls}-years">',
                        '<div class="{baseCls}-yearnav">',
                            '<div class="{baseCls}-yearnav-button-ct">',

                                '<a id="{id}-prevEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-prev" href="#" hidefocus="on" ></a>',
                            '</div>',
                            '<div class="{baseCls}-yearnav-button-ct">',

                                '<a id="{id}-nextEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-next" href="#" hidefocus="on" ></a>',
                            '</div>',
                        '</div>',
                        '<tpl for="years">',
                            '<div class="{parent.baseCls}-item {parent.baseCls}-year">',

                                '<a hidefocus="on" class="{parent.baseCls}-item-inner" href="#">{.}</a>',
                            '</div>',
                        '</tpl>',
                    '</div>',
                    '<div class="' + Ext.baseCSSPrefix + 'clear"></div>',
                '</div>',
                '<tpl if="showButtons">',
                    '<div id="{id}-buttonsEl" class="{baseCls}-buttons">{%',
                        'var me=values.$comp, okBtn=me.okBtn, cancelBtn=me.cancelBtn;',
                        'okBtn.ownerLayout = cancelBtn.ownerLayout = me.componentLayout;',
                        'okBtn.ownerCt = cancelBtn.ownerCt = me;',
                        'Ext.DomHelper.generateMarkup(okBtn.getRenderTree(), out);',
                        'Ext.DomHelper.generateMarkup(cancelBtn.getRenderTree(), out);',
                    '%}</div>',
                '</tpl>'
            ],
            //renderTo: me.el,
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            shadow: false,
            focusOnShow: true,
            listeners: {
                scope: me,
                cancelclick: me.onCancelClick,
                okclick: me.onOkClick,
                yeardblclick: me.onOkClick,
                monthdblclick: me.onOkClick
            }
        });
    },

    onExpand: function () {
        //this.picker.show();
        this.picker.setValue(this.startDay);
        //

    },

    //    onCollapse: function () {
    //        this.focus(false, 60);
    //    },

    onOkClick: function (picker, value) {
        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, 1);
        me.startDay = date;
        me.setValue(date);
        this.picker.hide();
        //this.blur();
    },

    onCancelClick: function () {
        this.picker.hide();
        //this.blur();
    }

});
/**
 * 日期控件区间控制
 * Lan  2017-6-2
 */
Ext.apply(Ext.form.VTypes, {  
        daterange : function(val, field) {  
            var date = field.parseDate(val);  
            if (!date) {  
                return;  
            }  
            if (field.startDateField  
                    && (!field.dateRangeMax || (date.getTime() != field.dateRangeMax  
                            .getTime()))) {  
                            	//var start=field.up('panel').down('startDateField');
                 var start=field.up('panel').getForm().findField(field.startDateField);
                   //var start = field.up('panel').down(field.startDateField); 
                //var start = field.up('panel').down('datefield[name='+field.startDateField+']');  
                //alert(start);
                start.setMaxValue(date);  
                this.dateRangeMax = date;  
            } else if (field.endDateField  
                    && (!field.dateRangeMin || (date.getTime() != field.dateRangeMin  
                            .getTime()))) {  
               // var end = field.up('panel').getForm().down('datefield[name='+field.endDateField+']');  
                 var end=field.up('panel').getForm().findField(field.endDateField);
                end.setMinValue(date);  
                this.dateRangeMin = date;  
            }  
            return true;  
        }
    });  