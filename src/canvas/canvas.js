'use strict';

import {Canvas} from 'butterfly-dag';
import $ from 'jquery';

export default class MappingCanvas extends Canvas {
  constructor(opts) {
    super(opts);
    this.extraPos = opts.extraPos;
  }
  _calcPos() {
    let sourceTop = 0 + _.get(this, 'extraPos.paddingTop', 0);
    let sourceLeft = 0 + _.get(this, 'extraPos.paddingLeft', 0);
    let souceNodes = this.nodes.filter((item) => {
      return item.options.type === 'source';
    }).map((item) => {
      item.moveTo(sourceLeft, sourceTop);
      sourceTop += item.height + item.PADDING_VERTICAL;
      return item;
    });

    let targetTop = 0 + _.get(this, 'extraPos.paddingTop', 0);
    let targetLeft = _.get(souceNodes, '[0].width', 0) + _.get(souceNodes, '[0].PADDING_HORIZONTAL', 0) + _.get(this, 'extraPos.paddingLeft', 0);
    this.nodes.filter((item) => {
      return item.options.type === 'target';
    }).forEach((item) => {
      item.moveTo(targetLeft, targetTop);
      targetTop += item.height + item.PADDING_VERTICAL;
      return item;
    });
  }
  _autoResize(type) {
    let totalHeight = 0;
    let totleWidth = 0;

    let _sourceHeight = 0;
    let _targetHeight = 0;

    let souceNodes = this.nodes.filter((item) => {
      return item.options.type === 'source';
    });
    let targetNodes = this.nodes.filter((item) => {
      return item.options.type === 'target';
    });
    
    souceNodes.forEach((item) => {
      _sourceHeight += item.height + item.PADDING_VERTICAL;
    });

    targetNodes.forEach((item) => {
      _targetHeight += item.height + item.PADDING_VERTICAL;
    });

    // 计算所有节点大小总和
    totalHeight = _sourceHeight > _targetHeight ? _sourceHeight : _targetHeight;
    totleWidth = (_.get(souceNodes, '[0].width', 0) + _.get(souceNodes, '[0].PADDING_HORIZONTAL', 0) + _.get(targetNodes, '[0].width', 0)) || 200;
    
    // 计算边缘
    totalHeight += _.get(this, 'extraPos.paddingTop', 0) + _.get(this, 'extraPos.paddingBottom', 0);
    totleWidth +=_.get(this, 'extraPos.paddingLeft', 0) + _.get(this, 'extraPos.paddingRight', 0);

    if (type === 'width') {
      $(this.root).css('width', totleWidth);
    }
    if (type === 'height') {
      $(this.root).css('height', totalHeight);
    }
    this.updateRootResize();
  }
  // 纠正获取左右锚点
  _getEndpoint = (point) => {
    let _node = this.getNode(point.nodeId);
    let _point = undefined;
    if (_node && point.originId) {
      _point = _node.getEndpoint(point.originId);
      return _point;
    } else {
      return point;
    }
  };
  // 改变linked状态
  _linkedChain(links) {
    links.forEach((edge) => {
      let _sourceEndpoint = this._getEndpoint(edge.sourceEndpoint);
      let _targetEndpoint = this._getEndpoint(edge.targetEndpoint);
      _sourceEndpoint && $(_sourceEndpoint.dom).addClass('link');
      _targetEndpoint && $(_targetEndpoint.dom).addClass('link');
    });
  }
  _unLinkedChain(links) {
    links.forEach((edge) => {
      let _sourceEndpoint = this._getEndpoint(edge.sourceEndpoint);
      let _targetEndpoint = this._getEndpoint(edge.targetEndpoint);
      _sourceEndpoint && $(_sourceEndpoint.dom).removeClass('link').removeClass('focus');
      _targetEndpoint && $(_targetEndpoint.dom).removeClass('link').removeClass('focus');
    });
  }
  // 聚焦链路
  _focusChain(point) {
    let edges = this._findChain(point);
    edges.forEach((item) => {
      this._changeFoucsStatus(item, true);
    });
  }
  _unFocusChain(point) {
    let edges = this._findChain(point);
    edges.forEach((item) => {
      this._changeFoucsStatus(item, false);
    });
  }
  _changeFoucsStatus(edge, status) {

    let _sourceEndpoint = this._getEndpoint(edge.sourceEndpoint);
    let _targetEndpoint = this._getEndpoint(edge.targetEndpoint);

    if (status) {
      $(edge.dom).addClass('focus');
      $(edge.arrowDom).addClass('focus');
      _sourceEndpoint && $(_sourceEndpoint.dom).addClass('focus');
      _targetEndpoint && $(_targetEndpoint.dom).addClass('focus');
    } else {
      $(edge.dom).removeClass('focus');
      $(edge.arrowDom).removeClass('focus');
      _sourceEndpoint && $(_sourceEndpoint.dom).removeClass('focus');
      _targetEndpoint && $(_targetEndpoint.dom).removeClass('focus');
    }
  }
  _findChain(point) {
    let type = point.type;
    let neighborEdges = this.getNeighborEdges(point.nodeId);
    let targetsEdges = neighborEdges.filter((item) => {
      return item[type + 'Node'].id === point.nodeId && item[type + 'Endpoint'].originId === point.id;
    });
    return targetsEdges;
  }

  // 检查连接数量限制
  _checkLinkNum(point, targetEdge, type) {
    let _linkNums =
      this.edges.filter((_edge) => {
        return (
          _edge[`${type}Node`].id === point.nodeId &&
          _edge[`${type}Endpoint`].id === point.id
        );
      }).length + 1;
    let _isValidLink = true;
    let _pointLimitedNum = -1;
    if (point.limitNum && typeof point.limitNum === "number") {
      if (_linkNums > point.limitNum) {
        _pointLimitedNum = point.limitNum;
        _isValidLink = false;
      }
    }
    if (
      point.limitNum &&
      Object.prototype.toString.call(point.limitNum) === "[object Object]"
    ) {
      if (point.limitNum.source && type === "source") {
        if (_linkNums > point.limitNum.source) {
          _pointLimitedNum = point.limitNum.source;
          _isValidLink = false;
        }
      }
      if (point.limitNum.target && type === "target") {
        if (_linkNums > point.limitNum.target) {
          _pointLimitedNum= point.limitNum.target;
          _isValidLink = false;
        }
      }
    }
    if (!_isValidLink) {
      console.warn(
        `id为${point.id}的锚点限制了${_pointLimitedNum}条连线`
      );
      targetEdge && targetEdge.destroy();
      this._dragEdges = [];
      this._dragType = null;
    }
    return _isValidLink;
  }
  addFields(data) {
    data.forEach((item) => {
      let node = this.getNode(item.id);
      node && node.addFields(item.fields);
    });
  }
  removeFields(data) {
    data.forEach((item) => {
      let node = this.getNode(item.id);
      node && node.removeFields(item.fields);
    });
  }
  updateDisableStatus(newData) {
    (newData.nodes || []).forEach((newNode) => {
      let oldNode = _.find(this.nodes, (item) => {
        return item.id === newNode.id;
      });

      if (oldNode) {
        let oldFields = oldNode.options.fields;
        let newFields = newNode.fields;
        oldFields.forEach((oldField) => {
          let newField = _.find(newFields, (item) => {
            return item.id === oldField.id;
          });
          if (newFields && newField.disable !== oldField.disable) {
            oldField.disable = newField.disable;
            let pos = oldNode.options.type === 'source' ? 'right' : 'left';
            oldNode.endpoints.filter((item) => {
              return item.id === oldField.id || item.id === `${oldField.id}-${pos}`;
            }).forEach((item) => {
              item.options.disable = newField.disable;
              if (newField.disable) {
                $(item.dom).addClass('disable');
              } else {
                $(item.dom).removeClass('disable');
              }
            });
          }
        });
      }
    });
  }
};