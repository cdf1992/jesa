/**
 * A Picker field that contains a tree panel on its popup, enabling selection of tree nodes.
 */
Ext.define('Ext.ux.jes.form.field.RegionPicker', {
    extend: 'Ext.form.field.Picker',
    xtype: 'regionpicker',
    alias: 'widget.regionpicker',

    uses: [
        'Ext.tab.Panel'
    ],

    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    config: {
        /**
         * @cfg {Ext.data.TreeStore} store
         * A tree store that the tree picker will be bound to
         */
        store: null,

        /**
         * @cfg {String} displayField
         * The field inside the model that will be used as the node's text.
         * Defaults to the default value of {@link Ext.tree.Panel}'s `displayField` configuration.
         */
        displayField: null,

        /**
         * @cfg {Boolean} selectOnTab
         * Whether the Tab key should select the currently highlighted item. Defaults to `true`.
         */
        selectOnTab: true,

        /**
         * @cfg {Number} maxPickerHeight
         * The maximum height of the tree dropdown. Defaults to 300.
         */
        maxPickerHeight: 450,

        /**
         * @cfg {Number} minPickerHeight
         * The minimum height of the tree dropdown. Defaults to 100.
         */
        minPickerHeight: 100,


        /**
         * root is visible
         * @type Boolean
         */
        rootVisible:false,


        width: 0,
        dvalue:'110000',
        defaultValue: '',
        ssId:'',
        regionMap:''
    },

    editable: false,

    enableKeyEvents : false,


    initComponent: function() {

       	var me = this;
        me.callParent(arguments);

        me.addEvents(
            /**
             * @event select
             * Fires when a tree node is selected
             * @param {Ext.ux.TreePicker} picker        This tree picker
             * @param {Ext.data.Model} record           The selected record
             */
            'select'
        );
    },

    /**
     * Creates and returns the tree panel to be used as this field's picker.
     */
    createPicker: function() {
    	     var me = this,
         picker = new Ext.tab.Panel({
             minWidth:300,
             shrinkWrapDock: 2,
             // store: areaStore,
             floating: true,
             displayField: me.displayField,
             minHeight: me.minPickerHeight,
             maxHeight: me.maxPickerHeight,
             rootVisible:me.rootVisible,
             manageHeight: true,
             shadow: false,
             items:[{
                 xtype:'panel',
                 title:'省',
                 name:'province',
                 layout:'column',
                 items:[]
             },{
                 xtype:'panel',
                 title:'市',
                 name:'city',
                 layout:'column',
                 autoScroll:true,
                 items:[]
             },{
                 title:'县',
                 xtype:'panel',
                 name:'town',
                 layout:'column',
                 autoScroll:true,
                 items:[]
             }]
         });
    	     Ext.create('Ext.data.TreeStore', {
    	            proxy : {
    	                type : 'ajax',
    	                url : 'getRegion'+(me.version || '')+'.ajax?f=*.0701&ssId='+me.ssId,
    	                reader : {
    	                    type : 'json'
    	                }
    	            },
    	            root: {
    	                expanded: true
    	            },
    	            autoLoad : true,
    	            listeners:{
    	                load:function(store,record){
    	                    //数据库有地区值时显示，没有值时，默认显示dis配置页面设置的值。页面也没有设置值的时候，不再显示北京市（dValue）

    	                    var pr = store.getRootNode().getChildAt(0).childNodes;
    	                    var tabpanel = picker;
    	                    var provincepanel = picker.down('panel[name=province]');
    	                    var citypanel = picker.down('panel[name=city]');
    	                    var townpanel = picker.down('panel[name=town]');

    	                    for(var p in pr){
    	                        provincepanel.add({
    	                            xtype:'button',
    	                            text:pr[p].data.text,
    	                            areaId:pr[p].data.id,
    	                            childNodes:pr[p].childNodes,
    	                            style: {
    	                                // background:'#E6E6FA',  20181026去掉 背景颜色
    	                                margin: '2px'
    	                            },
    	                            columnWidth: 0.333,
    	                            handler:function(btn){
    	                                me.setValue(btn.areaId);
    	                                citypanel.removeAll();
    	                                tabpanel.setActiveTab(citypanel);
    	                                var city = btn.childNodes;
    	                                for(var c in city){
    	                                    citypanel.add({
    	                                        xtype:'button',
    	                                        text:city[c].data.text,
    	                                        areaId:city[c].data.id,
    	                                        childNodes:city[c].childNodes,
    	                                        style: {
    	                                            // background:'#E6E6FA',
    	                                            margin: '2px'
    	                                        },
    	                                        columnWidth: 0.333,
    	                                        handler:function(btn){
    	                                            me.setValue(btn.areaId);
    	                                            townpanel.removeAll();
    	                                            tabpanel.setActiveTab(townpanel);
    	                                            var town = btn.childNodes;
    	                                            for(var t in town){
    	                                                townpanel.add({
    	                                                    xtype:'button',
    	                                                    text:town[t].data.text,
    	                                                    areaId:town[t].data.id,
    	                                                    style: {
    	                                                        // background:'#E6E6FA',
    	                                                        margin: '2px'
    	                                                    },
    	                                                    columnWidth: 0.333,
    	                                                    handler:function (btn) {
    	                                                        me.setValue(btn.areaId);
    	                                                        me.collapse();
    	                                                    }
    	                                                })
    	                                            }
    	                                        }
    	                                    })
    	                                }
    	                            }
    	                        })
    	                    }
    	                }
    	            }
    	        });
        return picker;
    },

    onViewRender: function(view){
        view.getEl().on('keypress', this.onPickerKeypress, this);
    },

    /**
     * repaints the tree view
     */
    repaintPickerView: function() {
        var style = this.picker.getView().getEl().dom.style;

        // can't use Element.repaint because it contains a setTimeout, which results in a flicker effect
        style.display = style.display;
    },

    /**
     * Aligns the picker to the input element
     */
    alignPicker: function() {
        var me = this,
            picker;

        if (me.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                // Auto the height (it will be constrained by max height)
                picker.setWidth(me.bodyEl.getWidth());
            }else if(me.pickerWidth>0){
                picker.setWidth(me.pickerWidth);
            }
            if (picker.isFloating()) {
                me.doAlign();
            }
        }
    },

    /**
     * Handles a click even on a tree node
     * @private
     * @param {Ext.tree.View} view
     * @param {Ext.data.Model} record
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    onItemClick: function(view, record, node, rowIndex, e) {
        this.selectItem(record);
    },

    /**
     * Handles a keypress event on the picker element
     * @private
     * @param {Ext.EventObject} e
     * @param {HTMLElement} el
     */
    onPickerKeypress: function(e, el) {
        var key = e.getKey();
        if(key === e.ENTER || (key === e.TAB && this.selectOnTab)) {
            this.selectItem(this.picker.getSelectionModel().getSelection()[0]);
        }
    },

    /**
     * Changes the selection to a given record and closes the picker
     * @private
     * @param {Ext.data.Model} record
     */
    selectItem: function(record) {
        var me = this;
        if(me.fireEvent('beforeselect', me, record)){
            me.setValue(record.getId());
            me.picker.hide();
            me.inputEl.focus();
            me.fireEvent('select', me, record)
        }
    },

    /**
     * Runs when the picker is expanded.  Selects the appropriate tree node based on the value of the input element,
     * and focuses the picker so that keyboard navigation will work.
     * @private
     */
    onExpand: function() {
        var me = this,
            picker = me.picker,
            store = picker.store,
            value = me.value,
            node;


    },

    /**
     * Sets the specified value into the field
     * @param {Mixed} value
     * @return {Ext.ux.TreePicker} this
     */
    setValue: function(value) {
        var me = this;

        me.value = value;

        if(me.value){
            me.setRawValue(me.regionMap[me.value]?me.regionMap[me.value]:'');
            //me.setValue(me.value);
        }else if(me.defaultValue){
            me.setRawValue(me.regionMap[me.defaultValue]?me.regionMap[me.defaultValue]:'');
            //me.setValue(me.defaultValue);
        }else{
            me.setRawValue(me.regionMap[me.dValue]?me.regionMap[me.dValue]:'');
            //me.setValue(me.dValue)
        }


        me.checkChange();
        return me;
    },

    getSubmitValue: function(){
        return this.value;
    },

    /**
     * Returns the current data value of the field (the idProperty of the record)
     * @return {Number}
     */
    getValue: function() {
        return this.value;
    },
    /**
     * Handles the store's load event.
     * @private
     */
    onLoad: function() {
        var value = this.value;

        if (value) {
            this.setValue(value);
        }
    },

    onUpdate: function(store, rec, type, modifiedFieldNames){
        var display = this.displayField;

        if (type === 'edit' && modifiedFieldNames && Ext.Array.contains(modifiedFieldNames, display) && this.value === rec.getId()) {
            this.setRawValue(rec.get(display));
        }
    }

    , onKeyup : function(field, e, eOpts){
        var key = e.getKey();
        if(key === e.ENTER) {
            var me = this;
            me.store.proxy.extraParams.queryText = field.getRawValue();
            me.store.load({
                callback : me.expand()
            });
        }
    }

});

