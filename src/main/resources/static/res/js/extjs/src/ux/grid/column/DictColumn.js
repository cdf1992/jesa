/*
*   js中columns:[{},{}] 如果是从后台传回，那么处理字典字段的翻译：只需在java代码中传入以下（比如gridpanel.reconfigure(store,cols)的动态字典，参考PBC2中RptModifyDelService.java getRptCols()）：
*   m.put("xtype","dictcolumn");
*   m.put("dict", dictionaryService.getDictMapFromCache("字典DICT_TYPE"));  获取map形式的字典
*   fatherColumnId ：是父下拉框的COLUMN_ID（形如：PBC2_RMODE$#ACCT_TYPE 的特殊级联下拉框，才会需要传这个值，子下拉框dictType='PBC2_RMODE'+'_'+父下拉框字典的dict_key）
* */
Ext.define('Ext.ux.grid.column.DictColumn', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.dictcolumn'],
    alternateClassName: 'Ext.grid.column.DictColumn',
    dict:'',
    fatherColumnId:'',
    defaultRenderer: function(value,metaData,record){
        var  dict = this.dict;
        if(dict['jlComboDictMap']){
            var fColumnId = this.fatherColumnId;
            var fatherColumnValue = record.get(fColumnId);
            return dict['jlComboDictMap'][fatherColumnValue]?(dict['jlComboDictMap'][fatherColumnValue][value]?dict['jlComboDictMap'][fatherColumnValue][value]['value']:value):value;
        //    针对机构字典
        }else if (dict['instMap']){
            return dict['instMap'][value]['instName']?dict['instMap'][value]['instName']:value;
        } else {
            return dict[value]?dict[value]['value']:value;
        }

    }
});