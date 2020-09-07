/**
 * @class Ext.ux.Exporter.ExcelFormatter.Worksheet
 * @extends Object
 * Represents an Excel worksheet
 * @cfg {Ext.data.Store} store The store to use (required)
 */
Ext.define("Ext.ux.exporter.excelFormatter.Worksheet", {

  constructor: function(store, config) {
    config = config || {};

    this.store = store;

    Ext.applyIf(config, {
      hasTitle   : true,
      hasHeadings: true,
      stripeRows : true,
      title      : "Workbook",
      columns    : store.fields == undefined ? {} : store.fields.items,
      valueCols : []
    });

    Ext.apply(this, config);

    Ext.ux.exporter.excelFormatter.Worksheet.superclass.constructor.apply(this, arguments);
  },

  /**
   * @property dateFormatString
   * @type String
   * String used to format dates (defaults to "Y-m-d"). All other data types are left unmolested
   */
  dateFormatString: "Y-m-d",

  worksheetTpl: new Ext.XTemplate(
      '<Worksheet ss:Name="{title}">',
        '<Names>',
          '<NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'{title}\'!R1:R2" />',
        '</Names>',
        '<Table x:FullRows="1" x:FullColumns="1" ss:DefaultColumnWidth="54" ss:DefaultRowHeight="12.75">',
          '<Row ss:Height="38">',
            '<Cell ss:StyleID="title" ss:MergeAcross="{colCount - 1}">',
              '<ss:Data ss:Type="String" xmlns="http://www.w3.org/TR/REC-html40">',
                '<B><U><Font html:Size="15">{title}</Font></U></B>',
              '</ss:Data>',
            '</Cell>',
          '</Row>',
        '<tpl for="headers">',
          '<Row ss:AutoFitHeight="1">',
            '<tpl for=".">',
              '{.}',
            '</tpl>',
          '</Row>',
        '</tpl>',
            '{rows}',
        '</Table>',
        '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">',
          '<PageSetup>',
            '<Layout x:Orientation="Landscape" x:CenterHorizontal="1"/>',
            '<Header x:Margin="0.5"/>',
            '<Footer x:Data="&amp;CPage &amp;P of &amp;N"/>',
            '<PageMargins x:Left="0.5" x:Right="0.5" x:Top="0.5" x:Bottom="0.8"/>',
            '</PageSetup>',
          '<FitToPage/>',
          '<Print>',
            '<ValidPrinterInfo/>',
            '<FitHeight>32767</FitHeight>',
            '<PrintErrors>Blank</PrintErrors>',
            '<PaperSizeIndex>9</PaperSizeIndex>',
            '<VerticalResolution>600</VerticalResolution>',
          '</Print>',
          '<Selected/>',
          '<TopRowVisible>0</TopRowVisible>',
          '<LeftColumnVisible>0</LeftColumnVisible>',
          '<DoNotDisplayGridlines/>',
          '<ProtectObjects>False</ProtectObjects>',
          '<ProtectScenarios>False</ProtectScenarios>',
        '</WorksheetOptions>',
      '</Worksheet>'
  ),

  /**
   * Builds the Worksheet XML
   * @param {Ext.data.Store} store The store to build from
   */
  render: function(store) {
    return this.worksheetTpl.apply({
      headers  : this.buildHeader(),
      //columns : this.buildColumns().join(""),
      rows    : this.buildRows().join(""),
      colCount: this.valueCols.length,
     // rowCount: this.store.getCount() + 3,
      title   : this.title
    });
  },

  buildColumns: function() {
    var cols = [];

    Ext.each(this.valueCols, function(col){
      cols.push(this.buildColumn());
    }, this);

    return cols;
  },

  buildColumn: function(width) {
    return '<ss:Column ss:AutoFitWidth="1" />';
  },

  buildRows: function() {
    var rows = [];

    this.store.each(function(record, index) {
      rows.push(this.buildRow(record, index));
    }, this);

    return rows;
  },
  buildDeepHeader: function(columns, cells, deep, index){
    var count = 0;
    if(!cells[deep]){
      cells[deep] = [];
    }
    var len = cells[deep].length;
    var cellIndex = 0;
    if(index > 0 && 0 == cells[deep].length){
      cellIndex = index + 1;
    }
    Ext.each(columns, function (col, i) {
      var scount = 0;
      var ma = '';
      if (Ext.isArray(col.columns) && col.columns.length > 0) {
        scount = this.buildDeepHeader(col.columns, cells, deep + 1, 0 == deep ? i : index);
        if(1 < scount){
          ma = Ext.String.format('ss:MergeAcross="{0}"', scount - 1);
        }
        count += scount;
      } else {
        if(0 < deep){
          count++;
        }
        this.valueCols.push(col);
      }
      var title;
      if (col.text != undefined) {
        title = col.text;
      } else if (col.name) {
        title = col.name.replace(/_/g, " ");
        title = Ext.String.capitalize(title);
      }
      var ssIdx = '';
      if(0 == i && cellIndex > 0){
        ssIdx = Ext.String.format('ss:Index="{0}"', cellIndex);
      }
      cells[deep].push(Ext.String.format('<Cell ss:StyleID="headercell" {0} {1} {2} ><Data ss:Type="String">{3}</Data></Cell>', ssIdx, ma, 0 == deep ? '{0}' : '', title));
    }, this);
    return count;
  },
  buildHeader: function () {
    var cells = [];
    this.buildDeepHeader(this.columns, cells, 0, 0);
    var md = '';
    if(1 < cells.length){
      md = Ext.String.format('ss:MergeDown="{0}"', cells.length - 1);
    }
    Ext.each(this.columns, function (col, i) {
      var s = '';
      if (!Ext.isArray(col.columns) || col.columns.length == 0) {
        s = md;
      }
      cells[0][i] = Ext.String.format(cells[0][i], s);
    });
    return cells;
  },
  buildRow: function(record, index) {
    var style,
        cells = [];
    if (this.stripeRows === true) style = index % 2 == 0 ? 'even' : 'odd';

    Ext.each(this.valueCols, function(col,index,self) {
      var me=this;
      var name  = col.name || col.dataIndex;

      if(name) {
        var value = '';
        if(record.get(name)){
          if (Ext.isFunction(col.renderer)) {
            value = col.renderer(record.get(name), record, record), type = "String";
          } else {
            value = record.get(name), type  = me.typeMappings[col.type || record.fields.get(name).type.type];
          }
        } else {
          type = 'string';
        }

        if(me.expandTypeMapping[type]){
          value=value.display || value.vl;
          type=me.expandTypeMapping[type];
        }
        //console.log(name+'|'+value+'|'+type);
        cells.push(me.buildCell(value, type, style).render());
      }
    }, this);

    return Ext.String.format("<Row>{0}</Row>", cells.join(""));
  },

  buildCell: function(value, type, style) {
    if (type == "DateTime" && Ext.isFunction(value.format)) value = value.format(this.dateFormatString);

    return new Ext.ux.exporter.excelFormatter.Cell({
      value: value,
      type : type,
      style: style
    });
  },

  /**
   * @property typeMappings
   * @type Object
   * Mappings from Ext.data.Record types to Excel types
   */
  typeMappings: {
    'int'   : "Number",
    'string': "String",
    'float' : "Number",
    'date'  : "DateTime",
    'TsStringExt':'TsStringExt',
    'TsFloatExt':'TsFloatExt'
  },
  expandTypeMapping:{
    'TsStringExt':'String',
    'TsFloatExt':'String'
  }
});