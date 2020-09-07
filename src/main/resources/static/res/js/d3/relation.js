;(function (global, undefined) {
  'use strict'
  var _global
  // 工具函数
  (function () {

    // Array.include
    if (!Array.prototype.includes) {
      Array.prototype.includes = function (searchElement, fromIndex) {
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
      }
    }
  }())
  var labelTimer,
    cacheRelation,
    cacheData,
    cacheD3API = {},
    cacheD3APIId = 0

  var colorSetting = {
    nodeBackground: ['#2593ce', '#f25a2a'],
    nodeText: '#000',
    link: ['red', 'green', 'blue'],
    lineText: '#5bc0de',
    lowLightLine: '#edf2f3',
    lowLightNode: '#cbe2f1',
    labelBackground: '#f7eeee',
  }
  var defaultSetting = {
    labelRemainTime: 4000,
    labelStyle: 'width: 200px;height: 100px;border-radius: 5px;position: absolute;z-index: 99999999;display: block;transition: opacity 0.2s;background-color:' +
    colorSetting.labelBackground + ' ;opacity: 0;',
  }
  var sidebarController = {}

  function Relation (option) {
	cacheD3APIId=0
	cacheD3API={}
    this.option = option
    this.option.data = this.d3API(option.data)
    this.el = option.el
    Relation.el = option.el
    var data = option.data
    
    cacheData = JSON.parse(JSON.stringify(data))

    this._initial(option.el, data)
  }

  // 弹出层部分
  Relation.label = function (x, y, str) {
    if (arguments.length === 1 && arguments[0] === 'none') {
      labelTimer = null
      document.getElementById('label').style.opacity = '0'
      return
    }
    x = x || 0
    y = y || 0
    if (!document.getElementById('label')) {
      var defaultStyle = defaultSetting.labelStyle
      var div = document.createElement('div')
      div.setAttribute('id', 'label')
      div.setAttribute('style', defaultStyle)
      document.body.appendChild(div)
    }
    var offTop = Relation.el.getBoundingClientRect().top,
      offLeft = Relation.el.getBoundingClientRect().left,
      label = document.getElementById('label')
    label.style.opacity = str ? '1' : '0'
    if (str) label.innerHTML = str
    label.style.left = x + offLeft + 'px'
    label.style.top = y + offTop + 'px'
    return label
  }

  // 动画部分
  Relation.transition = function (time) {
    return d3.transition().duration(time || 200).ease(d3.easeLinear)
  }

  // 顶部工具栏
  Relation.prototype.legend = function (update, force) {
    var self = this
    var legend = document.getElementById('legend')
    var legendData = {
      show: {
        'type': 'show',
        'html': '详细信息',
        'clickhandle': function () {

        },
      },
      search: {
        type: 'search',
        html: '追溯',
        clickHandler: function () {
          // document.getElementById(this.type).style.backgroundColor=''
        },
      },

      exportData: {
        type: 'exportData',
        html: '导出数据',
        clickHandler: function () {
          var obj = {}, nodes = [], links = []
          for (var prop in cacheRelation.option.data) {
            if (prop != 'nodes' && prop != 'links') {
              obj[prop] = cacheRelation.option.data[prop]
            }
          }
          d3.selectAll('.node').each(function (d) {
            nodes.push(d)
          })
          d3.selectAll('.link').each(function (d) {
            var a = JSON.parse(JSON.stringify(d))
            a.source = a.source.index
            a.target = a.target.index
            links.push(a)
          })
          obj['nodes'] = JSON.parse(JSON.stringify(nodes))
          obj['links'] = JSON.parse(JSON.stringify(links))
          self.option.exportData(obj)
          document.getElementById(this.type).style.backgroundColor = ''
        },
      },
      importData: {
        type: 'importData',
        html: '导入数据',
        clickHandler: function () {
          var importData = cacheRelation.option.importData().responseText
          cacheRelation.option.data = null
          cacheRelation.option.data = JSON.parse(JSON.stringify(importData))
          cacheD3API={};
          cacheD3APIId=0;
          self.d3API(cacheRelation.option.data)
          update(cacheRelation.option.data)
          force.alpha(1).restart()
          force.alpha(0)
          document.getElementById(this.type).style.backgroundColor = ''
        },
      },
    }

    function controllerChange (key) {
      for (var item in sidebarController) {
        sidebarController[item] = false
      }
      sidebarController[key] = true
    }

    legend.innerHTML = ''
    for (var item in legendData) {
      legend.innerHTML += '<div style="width: 70px;height: 30px; float: left"><button id="' +
        legendData[item].type +
        '"style="width: 100%;height: 100%;" class="lengendButton">' +
        legendData[item].html + '</button></div>'
    }
    for (var item in legendData) {
      (function (item) {
        document.getElementById(legendData[item].type).onclick = function () {
          controllerChange(legendData[item].type)
          Array.prototype.forEach.call(
            document.getElementsByClassName('lengendButton'), function (v) {
              v.style.backgroundColor = ''
            })
          this.style.backgroundColor = 'aliceblue'
          legendData[item].clickHandler
            ? legendData[item].clickHandler()
            : legendData[item].clickHandler
        }
      })(item)
    }
  }

  // 初始化
  Relation.prototype._initial = function (el, data) {
    var self = this
    var vis = this._vis(el)
    var force = this._force(el)
    cacheRelation = this

    function update (data, flag) {
      flag = flag || false
      //转换数据
      force.nodes(data['nodes'])
      force.force('link', d3.forceLink(data['links']))
      //生成节点连接线
      var link = self._link(data, vis)
      var node = self._node(data, vis)
      var lineText = self._lineText(data, vis)
      var bindLinkAndNodeEvent = self._bindLinkAndNodeEvent(data, update, vis,
        force, node, link, lineText)
      force.on('tick', function () {
        return self._tick(node, link, lineText)
      }).on('end', function () {
        node.each(function (d) {
          d.fx = d.x
          d.fy = d.y
        })
      })
      if (flag) force.alpha(1).restart()
      for (var i = 0, n = Math.ceil(Math.log(force.alphaMin()) /
        Math.log(1 - force.alphaDecay())); i < n; ++i) {
        force.tick()
      }
      force.alphaTarget(0)
    }

    update(data)
    this.legend(update, force)
  }

  // 容器部分
  Relation.prototype._vis = function (el) {
    var width = el.offsetWidth
    var height = el.offsetHeight
    d3.select(el).select('*').remove()
    var zoom = d3.zoom().scaleExtent([0.01, 10]).on('zoom', function () {
      return d3.event.zoom
    })
    var vis = d3.select(el).
      append('svg:svg').
      attr('id', 'R_SvgView').
      attr('width', width).
      attr('height', height).
      call(zoom).
      on('dblclick.zoom', null).
      append('svg:g').
      attr('class', 'all').
      attr('data-width', width).
      attr('data-height', height)
    let arrow = vis.append('svg:defs').selectAll('marker')

    arrow.data(['start-arrow']).
      enter().
      append('svg:marker').
      attr('id', function (d) {return d}).
      attr('class', 'arrow').
      attr('viewBox', '0 -5 10 10').
      attr('refX', -22).
      attr('refY', 0).
      attr('markerWidth', 10).
      attr('markerHeight', 16).
      attr('markerUnits', 'userSpaceOnUse').
      attr('orient', 'auto').
      append('svg:path').
      attr('d', 'M0,0L10,5L10,-5').
      attr('fill', '#666')

    arrow.data(['end-arrow']).
      enter().
      append('svg:marker').
      attr('id', function (d) {return d}).
      attr('class', 'arrow').
      attr('viewBox', '0 -5 10 10').
      attr('refX', 32).
      attr('refY', 0).
      attr('markerWidth', 10).
      attr('markerHeight', 16).
      attr('markerUnits', 'userSpaceOnUse').
      attr('orient', 'auto').
      append('svg:path').
      attr('d', 'M0,-5L10,0L0,5').
      attr('fill', '#666')

    return vis
  }

  // 力导向图部分
  Relation.prototype._force = function (el) {

    return d3.forceSimulation().
      force('charge', d3.forceManyBody().strength(-2500)).
      force('center', d3.forceCenter(el.offsetWidth / 2, el.offsetHeight / 2)).
      force('x', d3.forceX()).
      force('y', d3.forceY()).
      force('collide', d3.forceCollide().strength(0.2).iterations(5))

  }

  // 连接线部分
  Relation.prototype._link = function (data, vis) {
    var link = vis.selectAll('.link')
    link = link.data(data['links'])
    link.exit().remove()
    link = link.enter().
      append('svg:line').
      lower().
      attr('class', 'link').
      merge(link).
      attr('id',
        function (d) {return 'link-' + d.source.id + '_' + d.target.id}).
      attr('marker-end', function (d) {
        if (d.relationType === 2) return false
        return d.source.index === d.target.index
          ? false
          : 'url(#end-arrow)'
      }).
      attr('stroke', function (d) {
        return colorSetting.link[d.relationType * 1]
      }).
      attr('stroke-width', 2).
      attr('fill', 'none')
    return link
  }

  // 节点部分
  Relation.prototype._node = function (data, vis) {

    var node = vis.selectAll('g.node')
    node = node.data(data['nodes'], function (d) {
      return d.id
    })
    node.exit().remove()
    node = node.enter().append('svg:g').attr('class', function (d) {
      return d['isNew'] ? 'node new-node' : 'node'
    }).attr('id', function (d) {
      return 'node-' + d['id']
    }).merge(node)
    node.selectAll('.node-wrap').remove()
    node.selectAll('.node-icon').remove()
    node.selectAll('.node-name').remove()
    node.append('svg:circle').
      attr('class', 'node-wrap').
      attr('r', '25px').
      attr('fill', function (d) {
        return d.group === 1
          ? colorSetting.nodeBackground[0]
          : colorSetting.nodeBackground[1]
      })
    if(cacheRelation.option.node.icon){
      node.append('svg:image').
        attr('class', 'node-icon').
        attr('xlink:href',function (d) {
          return cacheRelation.option.data.nodeGroupDescription[d.group].path
        }).
        attr('x', '-10px').
        attr('y', '-10px').
        attr('width', '20px').
        attr('height', '20px')
    }

    node.append('svg:text').
      attr('class', 'node-name').
      attr('dy', '35px').
      attr('text-anchor', 'middle').
      attr('fill', colorSetting.nodeText).
      text(function (d) {
        return d['name']
      })
    return node
  }

  // 关系文字部分
  Relation.prototype._lineText = function (data, vis) {
    if (vis.selectAll('.lineText')._groups[0].length > 0) {
      vis.selectAll('.lineText').each(function (v) {
        this.remove()
      })
    }
    var lineText = vis.selectAll('.lineText')
    lineText = lineText.data(data.links)
    lineText.exit().remove()
    lineText = lineText.enter().
      append('a').
      style('cursor', 'pointer').
      attr('xlink:href', 'javascript:void(0)').
      append('text').
      attr('class', 'lineText').
      attr('startOffset', '50%').
      attr('text-anchor', 'middle').
      attr('xlink:href', function (d) {
        return d.source.id === d.target.id ? false : '#link-' + d.source.id +
          '_' +
          d.target.id
      }).
      text(function (d) {
        return d['relation']
      }).
      attr('fill', colorSetting.lineText)
    return lineText
  }

  // 更新坐标部分
  Relation.prototype._tick = function (node, link, linktext) {
    node.attr('transform',
      function (d) {return 'translate(' + d.x + ',' + d.y + ')'})
    link.attr('x1', function (d) {return d.source.x}).
      attr('y1', function (d) {return d.source.y}).
      attr('x2', function (d) {return d.target.x}).
      attr('y2', function (d) {return d.target.y})
    linktext.attr('x', function (d) {return (d.source.x + d.target.x) / 2}).
      attr('y', function (d) {return (d.source.y + d.target.y) / 2})
  }

  // 节点连线绑定事件部分
  Relation.prototype._bindLinkAndNodeEvent = function (
    data, update, vis, force, node, link, lineText) {
    var self = this
    Relation.label()
    node.call(self.privateEvents().nodeDrag(force))
    node.on('click', self.privateEvents(update, data).nodeClick)
    // node.on('dblclick', function (d) {
    //   if (document.getElementById('label')) {
    //     labelTimer=null
    //     document.getElementById('label').style.opacity = '0'
    //   }
    //   for (var i = 0; i < 5; i++) {
    //     var n = {
    //       'id': data.nodes.length,
    //       'name': data.nodes.length,
    //       'group': i % 2,
    //     }
    //     data.nodes.push(n)
    //     data.links.push({
    //       'source': n,
    //       'target': d,
    //       'relationType': (data.nodes.length - 1) % 3,
    //       'relation': 'json字段' + n.id,
    //     })
    //     data.links.push({
    //       'source': n,
    //       'target': d.id + 2,
    //       'relationType': (data.nodes.length - 1) % 3,
    //       'relation': 'json字段' + n.id,
    //     })
    //     data.links.push({
    //       'source': n,
    //       'target': d.id + 3,
    //       'relationType': (data.nodes.length - 1) % 3,
    //       'relation': 'json字段' + n.id,
    //     })
    //   }
    //
    //   //
    //   // var a1 = [
    //   //   {'id': 1, 'name': 'B', 'group': 0},
    //   //   {'id': 2, 'name': 'C', 'group': 0},
    //   //   {'id': 3, 'name': 'D', 'group': 0},
    //   //   {'id': 4, 'name': 'E', 'group': 1},
    //   //   {'id': 5, 'name': 'F', 'group': 1}]
    //   // var a2 = [
    //   //   {'source': 0, 'target': 1, 'relationType': 0, 'relation': 'json字段1'},
    //   //   {'source': 0, 'target': 2, 'relationType': 0, 'relation': 'json字段2'},
    //   //   {'source': 1, 'target': 2, 'relationType': 0, 'relation': 'json字段3'},
    //   //   {'source': 1, 'target': 3, 'relationType': 2, 'relation': 'json字段4'},
    //   //   {'source': 0, 'target': 3, 'relationType': 2, 'relation': 'json字段5'},
    //   //   {'source': 2, 'target': 3, 'relationType': 2, 'relation': 'json字段6'},
    //   //   {'source': 4, 'target': 0, 'relationType': 2, 'relation': 'json字段7'},
    //   //   {'source': 5, 'target': 2, 'relationType': 1, 'relation': 'json字段8'},
    //   //   {'source': 5, 'target': 1, 'relationType': 1, 'relation': 'json字段9'},
    //   // ]
    //   // data.nodes=data.nodes.concat(a1)
    //   // data.links=data.links.concat(a2)
    //   update(data)
    //   Relation.label('none')
    // })
    if (this.option.focusNodeAdjacency) {
      node.on('mouseover', function (d) {
        var linkArr = [], obj = {}
        // 处理线段
        link.transition(Relation.transition(200)).
          attr('stroke-width', function (l) {
            if (l.target.name == d.name ||
              l.source.name == d.name) return linkArr.push(l), 3
          }).
          style('stroke', function (l) {
            var boolean = l.target.name == d.name || l.source.name == d.name
            if (!boolean) return colorSetting.lowLightLine
          })
        // 计算出和当前无关节点id
        linkArr.forEach(function (item) {
          obj[item.source.index] = ''
          obj[item.target.index] = ''
        })
        linkArr = d3.keys(obj).map(function (value) { return value * 1 })
        // 处理线段文字
        lineText.transition(Relation.transition(200)).
          style('fill', function (lt) {
            var boolean = lt.target.name == d.name || lt.source.name == d.name
            if (!boolean) return colorSetting.lowLightLine
          })
        // 处理节点
        node.select('circle').
          transition(Relation.transition(200)).
          style('fill', function (n) {
            if (linkArr.length > 0 &&
              !linkArr.includes(n.index * 1)) return colorSetting.lowLightNode
          })
      }).on('mouseout', function () {
        node.select('circle').
          transition(Relation.transition(200)).
          style('fill', function (d) {
            return d.group === 1
              ? colorSetting.nodeBackground[0]
              : colorSetting.nodeBackground[1]
          })
        lineText.transition(Relation.transition(200)).
          style('fill', colorSetting.lineText)
        link.transition(Relation.transition(200)).
          attr('stroke-width', 2).
          style('stroke', function (d) {
            return colorSetting.link[d.relationType * 1]
          })
        self.privateEvents().nodeMouseLeave()
      })
    }
    link.on('click', self.privateEvents().linkClick)
    lineText.on('click', self.privateEvents().linkClick)

  }
  // 节点连线事件
  Relation.prototype.privateEvents = function (update, data) {
    var self = this

    function _clickCombine (d, key, pointer) {
      pointer = this || pointer
      // 判断是否有label定义
      if (cacheRelation.option[key].label.html instanceof Function) {
        var template = cacheRelation.option.data.template[key]
        cacheRelation.option[key].label.html(template, d, 'label')
        if (cacheRelation.option[key].label.fontStyle &&
          cacheRelation.option[key].label.fontStyle[length - 1] !==
          ';') cacheRelation.option[key].label.fontStyle += ';'
        var optionStyle = cacheRelation.option[key].label.fontStyle || '' +
          cacheRelation.option[key].label.labelStyle || ''
        document.getElementById('label').
          setAttribute('style', defaultSetting.labelStyle + optionStyle)
        var x = key === 'link' ? d3.mouse(pointer)[0] : d.x,
          y = key === 'link' ? d3.mouse(pointer)[1] : d.y,
          label = Relation.label(x, y)
        if (key == 'link') var l = pointer.nodeName.toLowerCase() === 'line'
          ? this
          : null
        if (l) d3.select(l).style('stroke-width', 5)
        d3.select(label).
          transition(Relation.transition(200)).
          style('opacity', 1)
        if (labelTimer) clearTimeout(labelTimer)
        labelTimer = setTimeout(function () {
          Relation.label(x, y, null)
          if (l) d3.select(l).style('stroke-width', 2)
          clearTimeout(labelTimer)
        }, cacheRelation.option[key].label.labelRemainTime ||
          defaultSetting.labelRemainTime)
      }
    }

    function _nodeClick (d) {
      if (sidebarController.search) {
        if (d3.select(this).attr('data-search')) {
          Ext.Msg.alert('此节点已追溯')
          return
        }
        d.id = d.index
        var newData = self.option.search(d)
        if (newData) {
          var arr = []
          for (var i = 0; i < newData.nodes.length; i++) {
            if (cacheD3API[newData.nodes[i].cid]) {
              arr.push(i)
            }
          }
          arr=arr.reverse()
          for(var i=0;i<arr.length;i++){
            newData.nodes.splice(arr[i],1)
          }
          newData = self.d3API(newData)

          data.nodes = data.nodes.concat(newData.nodes)
          data.links = data.links.concat(newData.links)
          update(data)
          d3.select(this).attr('data-search', 'true')
          return
        }
        Ext.Msg.alert('暂无数据')
      }
      if (sidebarController.show) {
        _clickCombine(d, 'node')
        d3.selectAll('circle').style('stroke', 'transparent')
        d3.select(this).select('circle').style('stroke', function () {
          return this.getAttribute('fill') == colorSetting.nodeBackground[1]
            ? '#ff9800'
            : '#03a9f4'
        }).style('stroke-width', '4px')
      }
    }

    function _linkClick (d) {
      if (sidebarController.show) {
        _clickCombine(d, 'link', this)
      }
    }

    function _nodeDrag (force) {
      var dragEvent = {
        dragStarted: function (d) {
          if (!d3.event.active) force.alphaTarget(0.3).restart()
          if (document.getElementById('label')) document.getElementById(
            'label').style.opacity = '0'
        },
        dragged: function (d) {
          d.fx = d3.event.x
          d.fy = d3.event.y
        },
        dragEnded: function (d) {
          if (!d3.event.active) force.alphaTarget(0)
        },
      }
      return d3.drag().
        on('start', dragEvent.dragStarted).
        on('drag', dragEvent.dragged).
        on('end', dragEvent.dragEnded)
    }

    function _nodeMouseLeave () {
      d3.selectAll('circle').style('stroke', 'transparent')
    }

    return {
      linkClick: _linkClick,
      nodeClick: _nodeClick,
      nodeMouseLeave: _nodeMouseLeave,
      // nodeDblclick:_nodeDblclick,
      nodeDrag: _nodeDrag,
    }
  }

  // 兼容d3 api
  Relation.prototype.d3API = function (d) {
    d.nodes.forEach(function (item) {
      if (cacheD3API[item.cid]) return
      var num = cacheD3APIId++
      cacheD3API[num] = item.cid
      cacheD3API[item.cid] = num
      return item
    })
    d.nodes.forEach(function (item) {
      return item['index'] = cacheD3API[item.cid]
    })
    d.links.forEach(function (item) {
      var tS = Object.prototype.toString
      if (tS.call(item['source']) !==
        '[object Number]') item['source'] = cacheD3API[item.source]
      if (tS.call(item['target']) !==
        '[object Number]') item['target'] = cacheD3API[item.target]
    })
    return d
  }
  _global = (function () { return this || (0, eval)('this') }())
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Relation
  } else if (typeof define === 'function' && define.amd) {
    define(function () {return })
  } else {
    !('Relation' in _global) && (_global.Relation = Relation)
  }
}())