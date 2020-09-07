;(function (global, undefined) {
    'use strict'
    var _global
    // tool functions
    // Object.assign Polyfill
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) { // .length of function is 2
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object')
                }
                var to = Object(target)
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index]
                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey]
                            }
                        }
                    }
                }
                return to
            },
            writable: true,
            configurable: true,
        })
    }
    // Array.includes Polyfill
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function (searchElement, fromIndex) {

                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined')
                }

                var o = Object(this)

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0

                // 3. If len is 0, return false.
                if (len === 0) {
                    return false
                }

                // 4. Let n be ? ToInteger(fromIndex).
                //    (If fromIndex is undefined, this step produces the value 0.)
                var n = fromIndex | 0

                // 5. If n ≥ 0, then
                //  a. Let k be n.
                // 6. Else n < 0,
                //  a. Let k be len + n.
                //  b. If k < 0, let k be 0.
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

                // 7. Repeat, while k < len
                while (k < len) {
                    // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                    // b. If SameValueZero(searchElement, elementK) is true, return true.
                    // c. Increase k by 1.
                    // NOTE: === provides the correct "SameValueZero" comparison needed here.
                    if (o[k] === searchElement) {
                        return true
                    }
                    k++
                }

                // 8. Return false
                return false
            },
        })
    }
    // Array.filter Polyfill
    if (!Array.prototype.filter)
        Array.prototype.filter = function (func, thisArg) {
            'use strict'
            if (!((typeof func === 'Function' || typeof func === 'function') && this))
                throw new TypeError()

            var len = this.length >>> 0,
                res = new Array(len), // preallocate array
                t = this, c = 0, i = -1
            if (thisArg === undefined)
                while (++i !== len)
                    // checks to see if the key was set
                    if (i in this)
                        if (func(t[i], i, t))
                            res[c++] = t[i]
                        else
                            while (++i !== len)
                                // checks to see if the key was set
                                if (i in this)
                                    if (func.call(thisArg, t[i], i, t))
                                        res[c++] = t[i]

            res.length = c // shrink down array to proper size
            return res
        }
    // Default style
    var defaultStyle = '#calendarWrap {display:none;width: 100%;text-align: center;border: 1px solid #ebe8e8;}\n' +
        '        .Table {width: 100%;height: 300px;}\n' +
        '        .box {box-sizing: border-box;width: 100%;height: 70px;font-weight: bold;font-size: 21px;border-bottom: 1px solid #ebe8e8;}\n' +
        '        .todayWrap {width: 30%;height: 100%;display: inline-block;float: left;border-right: 1px solid #ebe8e8;}\n' +
        '        #calendarHeaderToday {color: #e52b5b;display: inline-block;width: 100%;font-weight: 300;font-size: 36px;}\n' +
        '        #calendarHeaderWeek {color: #c5bdbd;font-size: 15px;}\n' +
        '        .MonthWrap {width: 69%;height: 100%;line-height: 70px;float: left;padding: 0 12%;box-sizing: border-box;display: inline-block;color: #898989;}\n' +
        '        #Year, #Month {font-size: 18px; user-select:none;}\n' +
        '        .box-dec {user-select: none;border: none;text-align: left;cursor: pointer;font-weight: bold;float: left;font-size: 12px;}\n' +
        '        .box-add {user-select: none;border: none;text-align: right;cursor: pointer;font-weight: bold;float: right;font-size: 12px;}\n' +
        '        #calendarTable {border-collapse: collapse;border-bottom: 1px solid #ebe8e8;width: 100%;height: 300px;}\n' +
        '        .calendarWeek {width: 100%;color: #8ac7ff;position: relative;border-bottom: 1px solid #ebe8e8;}\n' +
        '        .isNotThisMonth div {color: #cac6c8;text-align: center;}\n' +
        '        .hightlightToday div{color: #fff;background:#0b96f6;text-align: center;}\n' +
        '        .isThisMonth div{color: #484847;    text-align: center;}\n' +
        '        .clearfix {overflow: auto;zoom: 1;}\n' +
        '        td div {border-radius: 50%;margin: 1px auto 0;width: 27px;height: 27px;line-height: 27px;text-align: center;font-size: 14px;}\n' +
        '        .todo div {background: #51d48c;color: #fff !important;}\n' +
        '        #todoList {overflow: hidden;}\n' +
        '        .todo-cell {margin: 2px;height: 22px;width: 80%;float: left;position: relative;font-size: 14px;}\n' +
        '        .todo-cell::after {content: \'\';display: inline-block;height: 100%;width: 0;left: 0;top: 0;position: absolute;border-right: 1px solid #4e5d6c;}\n' +
        '        .todo-cell > div {display: inline-block;line-height: 22px;width: 30%;background-color: #f5f5f5;float: left;}\n' +
        '        .todo-cell > span {float: left;line-height: 22px;    margin-left: 2px;}'

    // calendar's constructor function
    function Calendar(opt) {
        this._initial(opt)
    }

    // Init calendar
    Calendar.prototype._initial = function (opt) {
        var defaultOption = {
            el: void(0),
            data: void(0),
            calendarData: []
        }
        this.defaultOption = Object.assign(defaultOption, opt);
        this.defaultOption.id = this.defaultOption.el.getAttribute('id');
        if (this.loadStyles.mark !== 'load') this.loadStyles(defaultStyle);
        this.excuteBaseNodesDate();
        var start = document.getElementById('calendarTable').children[0].children[1].children[0].getAttribute('data-date');
        var end = document.getElementById('calendarTable').children[0].children[6].children[6].getAttribute('data-date');
        var me = this;
        this.defaultOption.data(start, end);
        // window.setTimeout(function () {
        me.addData();
        me.addEvent();
        me.clickDate();
        // },300)

    }
    Calendar.prototype.show = function () {
        // window.setTimeout(function () {
        document.getElementById('calendarWrap').style.display = 'block'
        // },400)
    }

    // Trend add stylesheet tag
    Calendar.prototype.loadStyles = function (str) {
        this.loadStyles.mark = 'load'
        var style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = str
        document.getElementsByTagName('head')[0].appendChild(style)
    }

    // Create calendar base nodes function
    Calendar.prototype.buildBasePart = function (node) {
        var el = document.createElement(node.node)
        if (node.id) {
            el.setAttribute('id', node.id)
        }
        if (node.className) {
            el.className = node.className
        }
        if (node.innerHTML) {
            el.innerHTML = node.innerHTML
        }
        if (node.href) {
            el.setAttribute('href', node.href)
        }
        if (node.appendToBox) {
            document.getElementById(node.appendToBox).appendChild(el)
        }
        return el
    }

    Calendar.prototype.getCalendar = function (year, month) {

        var thisDateYear = new Date().getFullYear()   //今日年份
        var thisDateMonth = new Date().getMonth() + 1   //今日月份
        var today = new Date().getDate()              //今日天数

        var last = new Date(year, month - 1, 0)   // 上月时间对象
        var lastMonth = last.getMonth() + 1  //上个月月份
        var lastYear = last.getFullYear()  //上个月年份
        var lastdate = last.getDate()//获取上个月的最大日期
        var lastday = last.getDay()//获取上个月最大日期的星期几
        var next = new Date(year, month + 1, 0)   // 下月时间对象
        var nextMonth = next.getMonth() + 1  //下个月月份
        var nextYear = next.getFullYear()  //下个月年份
        var months = new Date(year, month, 0) //本月时间对象
        var Maxdate = months.getDate()//获取这个月最大的日期
        var remainlastdate = lastdate - lastday  //获取上个月在这个月份中存在的最后日期
        var t = 1
        var computedMonthAndDay = function (s) {
            return parseInt(s) < 10 ? '0' + s : s;
        }
        //星期表头
        var str = '<tr id="calendarWeek" class="calendarWeek"><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>'
        str += '<tr>'
        for (var i = 0; i < 7; i++) {
            if (i <= lastday) {
                var cache = remainlastdate++
                var lastStr = lastYear + '-' + computedMonthAndDay(lastMonth) + '-' + computedMonthAndDay(cache)
                str += '<td class="isNotThisMonth calendar-cell" data-date="' + lastStr + '"><div>' + cache + '</div></td>'
            } else {
                if (thisDateYear == year && thisDateMonth == month && today == t) {
                    str += '<td class="hightlightToday calendar-cell" data-date="' + thisDateYear + '-' + computedMonthAndDay(thisDateMonth) + '-' +
                        computedMonthAndDay(today) + '"><div>' + t++ + '</div></td>'
                } else {
                    var cache2 = t++
                    var thisStr = year + '-' + computedMonthAndDay(month) + '-' + computedMonthAndDay(cache2)
                    str += '<td class="isThisMonth calendar-cell" data-date="' + thisStr + '"><div>' + cache2 + '</div></td>'
                }
            }
        }
        str += '</tr>'
        //除去上面的部分，这个月从哪里开始
        var remainlastday = 6 - lastday + 1
        var nextMonthday = 1//下一个月份的开始日期
        //这里i最大值为5是为了兼容所有的月份，有的月份可能跨越6个tr
        for (var i = 1; i <= 5; i++) {
            str += '<tr>'
            for (var j = 0; j < 7; j++) {
                if (remainlastday <= Maxdate) {
                    if (thisDateYear == year && thisDateMonth == month && today == remainlastday) {
                        str += '<td class="hightlightToday calendar-cell" data-date="' + thisDateYear + '-' + computedMonthAndDay(thisDateMonth) +
                            '-' + computedMonthAndDay(today) + '"><div>' + remainlastday++ + '</div></td>'
                    } else {
                        var cache3 = remainlastday++
                        var thisStr2 = year + '-' + computedMonthAndDay(month) + '-' + computedMonthAndDay(cache3)
                        str += '<td class="isThisMonth calendar-cell" data-date="' + thisStr2 + '"><div>' + cache3 + '</div></td>'
                    }
                } else {
                    var cache4 = nextMonthday++
                    var nextStr = nextYear + '-' + computedMonthAndDay(nextMonth) + '-' + computedMonthAndDay(cache4)
                    str += '<td class="isNotThisMonth calendar-cell" data-date="' + nextStr + '"><div>' + cache4 + '</div></td>'
                }
            }
            str += '</tr>'
        }
        return str
    }

    // excute buildpart function
    Calendar.prototype.excuteBaseNodesDate = function () {
        var self = this,
            today = new Date().getDate(),
            thisYear = new Date().getFullYear(),
            thisMonth = new Date().getMonth() + 1,
            week = '星期' + '日一二三四五六'.charAt(new Date().getDay()),
            CalendarTr = self.getCalendar(thisYear, thisMonth),
            nodeArr = [
                // whole calendar wrap
                {
                    node: 'div',
                    id: 'calendarWrap',
                    className: 'calendar',
                    appendToBox: self.defaultOption.id,
                },
                // year&&month&&day wrap
                {
                    node: 'div',
                    id: 'calendarHeader',
                    className: 'box',
                    appendToBox: 'calendarWrap',
                },
                {
                    node: 'div',
                    id: 'today',
                    className: 'todayWrap',
                    innerHTML: '<span id="calendarHeaderToday">' + today + '</span><span id="calendarHeaderWeek">' + week +
                    '</span>',
                    appendToBox: 'calendarHeader',
                },
                {
                    node: 'div',
                    id: 'MonthWrap',
                    className: 'MonthWrap',
                    appendToBox: 'calendarHeader',
                },
                // button decrease month
                {
                    node: 'span',
                    id: 'dec',
                    className: 'box-dec',
                    innerHTML: '\<',
                    appendToBox: 'MonthWrap',
                },
                // year
                {
                    node: 'span',
                    id: 'Year',
                    innerHTML: thisYear + '年',
                    appendToBox: 'MonthWrap',
                },
                // month
                {
                    node: 'span',
                    id: 'Month',
                    innerHTML: thisMonth < 10 ? '0' + thisMonth + '月' : thisMonth,
                    appendToBox: 'MonthWrap',
                },
                // button increase month
                {
                    node: 'span',
                    id: 'add',
                    className: 'box-add',
                    innerHTML: '\>',
                    appendToBox: 'MonthWrap',
                },
                // calendar table wrap
                {
                    node: 'table',
                    id: 'calendarTable',
                    className: 'Table',
                    innerHTML: CalendarTr,
                    appendToBox: 'calendarWrap',
                },
                {
                    node: 'div',
                    id: 'todoList',
                    className: 'todoList clearfix',
                    appendToBox: 'calendarWrap',
                },
            ]
        nodeArr.forEach(function (item) {
            self.buildBasePart(item)
        })

    }

    Calendar.prototype.addEvent = function () {
        var self = this
        var dec = document.getElementById('dec')
        var add = document.getElementById('add')
        var Month = document.getElementById('Month')
        var Year = document.getElementById('Year')
        var Tr = document.getElementById('calendarTable')
        var month = parseInt(Month.innerHTML)
        var year = parseInt(Year.innerHTML)

        var CalendarTr
        //设置月份减少的点击事件
        dec.addEventListener('click', function (e) {
            e = e || event
            var target = e.target || e.srcElement
            if (target.id == 'dec') {
                if (month > 1 || month == 12) {
                    Month.innerHTML = --month < 10 ? '0' + month + '月' : month + '月'
                    CalendarTr = self.getCalendar(year, month)
                    Tr.innerHTML = ''
                    Tr.innerHTML = CalendarTr
                } else {
                    Year.innerHTML = --year <= 1970 ? 1970 + '年' : year + '年'
                    Month.innerHTML = year < 1970 && month < 2 ? '01月' : 12 + '月'
                    //小于1970的时间显示为1970的时间
                    if (year < 1970 && month < 2) {
                        year = 1970, month = 1
                        CalendarTr = self.getCalendar(year, month)
                        Tr.innerHTML = ''
                        Tr.innerHTML = CalendarTr
                    } else {
                        month = 12
                        CalendarTr = self.getCalendar(year, month)
                        Tr.innerHTML = ''
                        Tr.innerHTML = CalendarTr
                    }
                }
            }
            var start = document.getElementById('calendarTable').children[0].children[1].children[0].getAttribute('data-date')
            var end = document.getElementById('calendarTable').children[0].children[6].children[6].getAttribute('data-date')
            self.defaultOption.prevHandler(start, end)
        })
        //设置月份增加的点击事件
        add.addEventListener('click', function (e) {
            e = e || event
            var target = e.target || e.srcElement
            if (target.id == 'add') {
                if (month > 0 && month < 12) {
                    Month.innerHTML = ++month < 10 ? '0' + month + '月' : month + '月'
                    CalendarTr = self.getCalendar(year, month)
                    Tr.innerHTML = ''
                    Tr.innerHTML = CalendarTr
                } else {
                    Year.innerHTML = ++year + '年'
                    Month.innerHTML = '0' + 1 + '月'
                    month = 1
                    CalendarTr = self.getCalendar(year, month)
                    Tr.innerHTML = ''
                    Tr.innerHTML = CalendarTr
                }
            }
            var start = document.getElementById('calendarTable').children[0].children[1].children[0].getAttribute('data-date')
            var end = document.getElementById('calendarTable').children[0].children[6].children[6].getAttribute('data-date')
            self.defaultOption.nextHandler(start, end)
        })

    }

    Calendar.prototype.addData = function () {
        var data = this.defaultOption.calendarData
        for (var i = 0; i < data.length; i++) {
            Array.prototype.forEach.call(document.getElementsByClassName('calendar-cell'), function (item) {
                if (item.getAttribute('data-date') == data[i].start) {
                    item.classList.add('todo')
                }
            })
        }
    }
    Calendar.prototype.clickDate = function () {
        var self = this
        //表格点击事件
        document.getElementById('calendarTable').addEventListener('click', function (e) {
            e = e || event
            var target = e.target || e.srcElement
            var todoList = document.getElementById('todoList')
            if (target.parentNode.nodeName.toLowerCase() == 'td' && target.parentNode.getAttribute('data-date')) {
                todoList.innerHTML = null
                if (Array.prototype.includes.call(target.parentNode.classList, 'todo')) {

                    self.defaultOption.calendarData.forEach(function (v) {
                        if (v.start == target.parentNode.getAttribute('data-date')) {
                            self.showTodoList(todoList, v)
                        }
                    })
                }
                self.defaultOption.dateClick.call(target.parentNode)
            }
        })
    }
    Calendar.prototype.showTodoList = function (target, obj) {
        target.innerHTML += '<div class="todo-cell"><div>' + obj.title + '</div><span>' + obj.ssId + '</span></div>'
    }
    // exports to global
    _global = (function () {
        return this || (0, eval)('this')
    }())
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Calendar
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return Calendar
        })
    } else {
        !('Calendar' in _global) && (_global.Calendar = Calendar)
    }
}())