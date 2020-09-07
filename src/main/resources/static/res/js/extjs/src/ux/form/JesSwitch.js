// switch组件   有setValue getValue onclick 方法
// 设置数据格式为   [{key:'open',text:'打开'},{key:'close',text:'关闭'}] defaultKey选项可选传key
// {
//     xtype: 'jesswitch',
//     fieldLabel: '123123',
//     data: [{key: 'open', text: '打开'}, {key: 'close', text: '关闭'}],
//     onclick:function () {
//     this.setValue('关闭');
//     console.log(this.getValue());
// }
Ext.define('Ext.ux.form.JesSwitch', {
    extend: 'Ext.form.field.Base',
    alias: 'widget.jesswitch',
    border: 0,
    height: 24,
    fieldSubTpl: ['<div class="jesSwitch" style="display: block;width: 100%;height: 20px;"></div>'],
    style: {
        display: 'inline-block',
        width: '100px'
    },
    initComponent: function () {
        this.loadCss();
        document.getElementsByTagName('body')[0].className += ' ' + this._findThemeDom();
        //this.callParent(arguments);
    },
    onBoxReady: function () {
        var me = this;
        this.currentSwitch = this._getCurrentDom();
        this._computedData();
        me._appendDom();
        me.currentSwitch.addEventListener('click', me._clickEvent.bind(me));

        me.addEvents(
            'change'
        );
    },
    // 处理数据
    _computedData: function () {
        var me = this;
        me.state = [];
        this.data = JSON.parse(JSON.stringify(me.initialConfig.data));
        this.data.forEach(function (item, index) {
            me.state[index] = {
                stateCode: index,
                key: item.key,
                text: item.text,
                template: '<div class="switch-' + index + ' switch-content">' + item.text + '</div>'
            }
        });
    },
    // 载入自定义CSS
    loadCss: function () {
        var curWwwPath = window.document.location.href;
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        var localhostPaht = curWwwPath.substring(0, pos);
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = localhostPaht + projectName + '/res/js/extjs/src/ux/form/css/JesSwitch.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    // 根据key获取下标
    _getIndexByKey: function (key) {
        var index;
        for (var i = 0; i < this.state.length; i++) {
            if (this.state[i].key === key) {
                return i
            }
        }
        return index;
    },
    // 获取默认值在数据中的下标
    _getDefaultDataIndex: function () {
        if (!this.defaultKey) return;
        return this._getIndexByKey(this.defaultKey);
    },
    // 根据下标切换dom
    _setDomByIndex: function (index) {
        this.currentState = index;
        this._changeSwitchDom(index)
    },
    // 遍历所有switch 返回当前switch
    _getCurrentDom: function () {
        var switches = document.getElementsByClassName('jesSwitch');
        for (var i = 0; i < switches.length; i++) {
            if (switches[i].childElementCount === 0) {
                return switches[i]
            }
        }
    },
    // 设置内部模板字样
    _setCurrentTemplate: function (str) {
        var sc = this.currentState === 0 ? 'switch' : '';
        return '<div class="switchWrap ' + sc + '"><div class="switchBall ' + sc + '"></div>' + str + '</div>'
    },
    // 添加dom
    _appendDom: function () {
        var index;
        if(Ext.isEmpty(this.value)){
            index = this._getDefaultDataIndex() || 0;
        } else {
            index = this._getIndexByKey(this.value) || 0;
        }
        this._setDomByIndex(index);
    },
    // 更改开关内部dom
    _changeSwitchDom: function (index) {
        var me = this;
        me.currentSwitch.innerHTML = me._setCurrentTemplate(me.state[index].template)
    },
    // 切换状态码
    _changeStateCode: function () {
        this.currentState = this.currentState === 0 ? 1 : 0
    },
    // 获取当前值
    getValue: function () {
        return this.state[this.currentState].key;
        // {
        //     key: this.state[this.currentState].key
        //     // text: this.state[this.currentState].text
        // }
    },
    // 设置数据
    setValue: function (key) {
        if (!key) return;
        var index = this._getIndexByKey(key);
        if (index === 0 || index === 1) this._setDomByIndex(index);
    },
    // 点击事件
    _clickEvent: function () {
        if(this.isDisabled()){
            return;
        }
        this._changeStateCode();
        this._changeSwitchDom(this.currentState);

        var oldIndex = this.currentState === 0 ? 1 : 0;

        this.fireEvent('change', this, this.getValue(), this.state[oldIndex].key);

        this.onclick();
    },
    // 获取主题
    _findThemeDom: function () {
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
    },
    // 点击事件
    onclick: function () {}
});