Ext.define('Ext.ux.panel.ParseTree', {
    extend: 'Ext.panel.Panel'
    , alias: 'widget.parsetree'
    , html: '<div id="parse-svg-div"><svg id="parse-svg"></svg></div><div id="parse-wrap-div"></div>'
    , autoScroll : true
    , border : false
    , isDraw : false
    , initComponent : function () {
        this.addEvents('afterdraw');
        this.callParent();
        this.loadCss();
    }
    , onBoxReady : function () {
        Ext.panel.Panel.superclass.onBoxReady.call(this);
        this.initTree();
    }
    , onResize : function(){
        if(this.isDraw){
            document.querySelector('#parse-svg').innerHTML = null;
            this.drawPath();
        }
    }
    , loadCss : function(){
        var curWwwPath = window.document.location.href;
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        var localhostPaht = curWwwPath.substring(0, pos);
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = localhostPaht + projectName + '/res/js/extjs/src/ux/panel/css/ParseTree.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    }
    , initTree : function(){
        var me = this;
        if(!this.data || 0 === this.data.length){
            me.ajaxLoad(me.params)
        } else {
            document.querySelector('#parse-svg').innerHTML = null;
            document.querySelector('#parse-wrap-div').innerHTML = null;
            me.draw();
            me.fireEvent('afterdraw', me);
            me.isDraw = true;
        }
    }
    , ajaxLoad : function(params, jsonData){
        var me = this;
        params = params || {};
        jsonData = jsonData || {};
        document.querySelector('#parse-svg').innerHTML = null;
        document.querySelector('#parse-wrap-div').innerHTML = null;
        if(!Ext.isEmpty(this.url)){
            Ext.Ajax.request({
                url : me.url
                , params : params
                , jsonData : jsonData
                , success : function(response){
                    me.data = Ext.decode(response.responseText);
                    me.draw();
                    me.fireEvent('afterdraw', me);
                    me.isDraw = true;
                }
            });
        }
    }
    , draw: function (panelWidth) {
        var me = this;
        me.links = {};
        var wrap = document.querySelector('#parse-wrap-div');
        Ext.each(this.data, function (ds, i) {
            var dv = document.createElement('div');
            dv.className = 'div-row';
            dv.style.width = '100%';
            Ext.each(ds, function (vs) {
                var cdv = document.createElement('div');
                cdv.className = 'm20';
                if(Ext.isArray(vs)){
                    cdv.style = vs[0].groupStyle;
                    var defaultStyle = vs[0].style;
                    Ext.each(vs, function (v) {
                        var ccdv = document.createElement('div');
                        ccdv.id = v.id;
                        ccdv.className = 'm5';
                        ccdv.style = v.style || defaultStyle;
                        ccdv.innerHTML = v.value;
                        cdv.appendChild(ccdv);
                        if(v.links && v.links.length > 0){
                            me.links[v.id] = v.links;
                        }
                    });
                } else {
                    cdv.id = vs.id;
                    cdv.style = vs.style;
                    cdv.innerHTML = vs.value;
                    if(vs.links && vs.links.length > 0){
                        me.links[vs.id] = vs.links;
                    }
                }
                dv.appendChild(cdv);
                wrap.appendChild(dv);
            })
            wrap.appendChild(dv);
        })
        me.drawPath();
    }
    , drawPath : function(){
        for(var name in this.links){
            var link = this.links[name];
            for(var i = 0; i < link.length; i++){
                this.drawLine(name, link[i]);
            }
        }
    }
    , drawLine : function (id1, id2) {
        var dv1 = document.querySelector('div[id=' + id1 + ']'),
            dv2 = document.querySelector('div[id=' + id2 + ']'),
            wrap1 = dv1.offsetParent,
            wrap2 = dv2.offsetParent,
            x1 = wrap1.offsetLeft + dv1.offsetLeft + dv1.offsetWidth / 2,
            x2 = wrap2.offsetLeft + dv2.offsetLeft + dv2.offsetWidth / 2,
            y1 = wrap1.offsetTop + dv1.offsetTop + dv1.offsetHeight,
            y2 = wrap2.offsetTop + dv2.offsetTop;
        var pathD = 'M' + x1 + ' ' + y1 + 'V' + (y1 + y2) / 2 + 'H' + x2 + 'V' + y2;
        var paths = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        paths.setAttribute('class', 'line');
        paths.setAttribute('d', pathD);
        var svg = document.querySelector('#parse-svg');
        svg.appendChild(paths);
    }
});