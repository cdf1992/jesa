Ext.define('Ext.ux.panel.JesBlocks', {
    extend: 'Ext.panel.Panel'
    , alias: 'widget.jesblocks'
    , disableMenu: true
    , editable: false
    , maxSplitSize: 5
    , initComponent: function () {
        this.callParent(arguments);

        this.addEvents(
            'dataload'
            , 'blockdblclick'
        );
    }
    , onBoxReady: function () {
        if (!window.document.blocksLoaded) {
            window.document.blocksLoaded = true;
            var resPath = this._readResPath();
            this._loadJs(resPath);
            this._loadCls(resPath);
        } else {
            this._onBlocksReady();
        }
    }
    , _onBlocksReady: function () {
        var that = this;
        that.blocks = new Blocks({disableMenu: that.disableMenu, editable: that.editable});
        that.blocks.run(that.body.dom);
        that.blocks.div.dblclick(function(){
            if(that.blocks.selectedBlock){
                that.fireEvent('blockdblclick', that, that.blocks.blocks[that.blocks.selectedBlock]);
            }
        })
        if (that.data) {
            that._loadData(that.data);
        } else if (that.proxy.url) {
            Ext.Ajax.request({
                url: that.proxy.url
                , params: that.proxy.params || {}
                , failure: function (response, opts) {
                    alert('服务器异常' + response.status + '],请关闭浏览器稍后重试.');
                }
                , success: function (response, req) {
                    var r = Ext.decode(response.responseText);
                    that._loadData.call(that, r.data);
                }
            });
        }
    }
    , _loadData: function (vals) {
        var that = this;
        var metas = vals['metas'];
        if (metas && 0 < metas.length) {
            Ext.each(metas, function (m) {
                that.blocks.register(m);
            })
        }
        var tmpBlockLvs = vals['blocks'];
        var blockLvs = [];
        for (var i = 0; i < tmpBlockLvs.length; i++) {
            var bs = tmpBlockLvs[i];
            if(that.maxSplitSize < bs.length){
                var start = 0;
                var end = that.maxSplitSize;
                while (end <= bs.length){
                    blockLvs.push(bs.slice(start, end));
                    start += that.maxSplitSize;
                    end += that.maxSplitSize;
                }
                if(start < bs.length){
                    blockLvs.push(bs.slice(start, bs.length));
                }
            } else {
                blockLvs.push(bs);
            }
        }

        var lvLen = blockLvs.length;
        var width = that.body.getWidth() / 2;
        var blockW = Math.max(that.body.getWidth() / lvLen, 200);
        var blocks = [];
        for (var i = 0; i < lvLen; i++) {
            var x = blockW * i - width;
            var bs = blockLvs[i];
            var bsLen = bs.length;
            var ev = 0 === bsLen % 2;
            //var blockH = Math.max(that.body.getWidth() / bsLen, 120);
            var blockH = 40;
            for (var j = 0; j < bsLen; j++) {
                var y = 0;
                if(ev){
                    y += blockH/2;
                    if (0 === j % 2) {
                        y += blockH * j + 20;
                    } else {
                        y -= blockH * j + 20;
                    }
                } else {
                    if (0 === j % 2) {
                        y += blockH * j;
                    } else {
                        y -= blockH;
                        y -= blockH * j;
                    }
                }
                var b = bs[j];
                b['x'] = x;
                b['y'] = y;
                blocks.push(b);
            }
        }
        var data = {edges: vals['edges'], blocks: blocks};
        that.blocks.load(data);
        that.fireEvent('dataload', that, data);
    }
    , _readResPath: function () {
        var curWwwPath = window.document.location.href;
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        var localhostPaht = curWwwPath.substring(0, pos);
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return localhostPaht + projectName + '/res/js/';
    }
    , _loadCls: function (resPath) {
        var head = document.getElementsByTagName('head')[0];
        var clsNames = ['blocks/css/blocks.css', 'blocks/css/style.css', 'jq/fancybox/jquery.fancybox.css'];
        Ext.each(clsNames, function (name) {
            var link = document.createElement('link');
            link.href = resPath + name;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        })
    }
    , _loadJs: function (resPath) {
        var that = this;
        var head = document.getElementsByTagName('head')[0];
        var load = function (head, jsPath, callback) {
            var script = document.createElement('script');
            script.src = jsPath;
            script.type = 'text/javascript';
            if (callback && Ext.isFunction(callback)) {
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" ||
                            script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback.call(that);
                        }
                    }
                } else {
                    script.onload = function () {
                        callback.call(that);
                    }
                }
            }
            head.appendChild(script);
        }

        var jqPath = resPath + 'jq/jquery-1.9.1.min.js';
        load(head, jqPath, function () {
            var jsNames = ['jq/jquery.json.min.js', 'jq/jquery.mousewheel.min.js', 'jq/jquery.svg.min.js'
                , 'jq/jquery.formserialize.min.js', 'jq/jquery.fancybox.min.js'];
            Ext.each(jsNames, function (name) {
                var jsPath = resPath + name;
                load.call(that, head, jsPath);
            })
            var blocksPath = resPath + 'blocks/blocks.js';
            load.call(that, head, blocksPath, that._onBlocksReady)
        });
    }


})