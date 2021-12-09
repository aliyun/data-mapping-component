'use strict';

import $ from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';
import Canvas from './canvas/canvas';
import 'butterfly-dag/dist/index.css';
import {transformInitData, transformChangeData, diffPropsData} from './adaptor';
import * as _ from 'lodash';

// 跟antd的table的column的概念类似
interface columns {
  title?: string,
  key: string,
  width?: number,
  primaryKey: boolean,
  render?(text: any, record: any, index: number): void
}

interface config {
  delayDraw: number,
  extraPos?: {
    paddingLeft?: number,
    paddingRight?: number,
    paddingTop?: number,
    paddingBottom?: number,
    paddingCenter?: number,
  },
  sortable?: boolean | {
    source?: boolean,
    target?: boolean
  },
  checkable?: boolean | {
    source?: boolean,
    target?: boolean
  },
  linkNumLimit?: number | {
    source?: number,
    target?: number
  }
}

interface ComProps {
  width?: number | string,
  height?: number | string,
  type?: string,
  className?: string,
  sourceClassName?: string,
  targetClassName?: string,
  columns: Array<columns>,
  sourceColumns: Array<columns>,
  targetColumns: Array<columns>,
  sourceData: Array<any> | Object,
  targetData: Array<any> | Object,
  mappingData: Array<any>,
  readonly?: boolean,
  config?: config,
  emptyContent?: string | JSX.Element,
  emptyWidth?: number | string,
  isConnect?(edge: any): boolean,
  onLoaded(canvas: any): void,
  onChange(data: any): void,
  onRowMouseOver?(row:any):void,
  onRowMouseOut?(row:any):void,
  onEdgeClick?(edge: any): void,
  onCheckChange(data: any): void,
};

export default class DataMapping extends React.Component<ComProps, any> {
  protected canvas: any;
  private _isRendering: boolean;
  private _isOnchange: boolean;
  props: any;
  constructor(props: ComProps) {
    super(props);
    this.canvas = null;
    this._isRendering = false;
    this._isOnchange = false;
  }
  componentDidMount() {
    let root = ReactDOM.findDOMNode(this) as HTMLElement;

    if (this.props.width !== undefined || this.props.width !== 'auto') {
      root.style.width = (this.props.width || 500) + 'px';
    }
    if (this.props.height !== undefined || this.props.height !== 'auto') {
      root.style.height = (this.props.height || 500) + 'px';
    }

    let result = transformInitData({
      columns: this.props.columns,
      sourceColumns: this.props.sourceColumns,
      targetColumns: this.props.targetColumns,
      type: this.props.type || 'single',
      sortable: _.get(this.props, 'config.sortable') || false,
      checkable: _.get(this.props, 'config.checkable') || false,
      sourceData: _.cloneDeep(this.props.sourceData),
      targetData: _.cloneDeep(this.props.targetData),
      mappingData: _.cloneDeep(this.props.mappingData),
      extraPos: _.get(this.props, 'config.extraPos'),
      linkNumLimit: _.get(this.props, 'config.linkNumLimit'),
      emptyContent: this.props.emptyContent,
      emptyWidth: this.props.emptyWidth,
      sourceClassName: this.props.sourceClassName || '',
      targetClassName: this.props.targetClassName || ''
    });
    
    let canvasObj = {
      root: root,
      disLinkable: true,
      linkable: true,
      draggable: false,
      zoomable: false,
      moveable: false,
      theme: {
        edge: {
          type: 'endpoint',
          shapeType: 'AdvancedBezier',
          arrow: true,
          isExpandWidth: true,
          arrowPosition: 1,
          arrowOffset: 5
        },
        endpoint: {
          limitNum: undefined,
          expandArea: {
            left: 0,
            right: 0,
            top: 0,
            botton: 0
          }
        }
      },
      extraPos: _.get(this.props, 'config.extraPos')
    };
    if (!!this.props.readonly) {
      canvasObj.disLinkable = false;
      canvasObj.linkable = false;
    }
    let _linkNumLimit = _.get(this.props, 'config.linkNumLimit')
    if (typeof _linkNumLimit === 'number' && !isNaN(_linkNumLimit))  {
      canvasObj.theme.endpoint.limitNum = _linkNumLimit;
    }
    if (Object.prototype.toString.call(_linkNumLimit) === '[object Object]'){
      canvasObj.theme.endpoint.limitNum = _linkNumLimit;
    }
    this.canvas = new Canvas(canvasObj);
    this._isRendering = true;
    setTimeout(() => {
      this.canvas.draw(result, () => {
        this.canvas._calcPos();
        if (this.props.width === 'auto') {
          this.canvas._autoResize('width');
        }
        if (this.props.height === 'auto') {
          this.canvas._autoResize('height');
        }
        this._isRendering = false;
        this.props.onLoaded && this.props.onLoaded(this.canvas);
        // 做滚动中修正
        this.canvas._coordinateService._calcScrollPos(true);
        this.canvas.nodes.forEach((item) => {
          item.endpoints.forEach((point) => {
            point.updatePos();
          })
        });
        this.canvas.edges.forEach((item) => {
          item.redraw();
        });
      });
      this._addEventListener();
    }, _.get(this.props, 'config.delayDraw', 0));
  }
  shouldComponentUpdate(newProps: ComProps, newState: any) {

    if (this._isRendering) {
      return false;
    }

    let result = transformInitData({
      columns: newProps.columns,
      sourceColumns: newProps.sourceColumns,
      targetColumns: newProps.targetColumns,
      type: newProps.type || 'single',
      sortable: _.get(newProps, 'config.sortable') || false,
      checkable: _.get(this.props, 'config.checkable') || false,
      sourceData: _.cloneDeep(newProps.sourceData),
      targetData: _.cloneDeep(newProps.targetData),
      mappingData: _.cloneDeep(newProps.mappingData),
      extraPos: _.get(newProps, 'config.extraPos'),
      linkNumLimit: _.get(newProps, 'config.linkNumLimit'),
      emptyContent: newProps.emptyContent,
      emptyWidth: newProps.emptyWidth,
      sourceClassName: newProps.sourceClassName || '',
      targetClassName: newProps.targetClassName || ''
    });
    let diffInfo = diffPropsData(result, {
      nodes: this.canvas.nodes,
      edges: this.canvas.edges.map((item) => {
        return _.assign(item.options, {
          source: (item.options.source || '').replace('-right', ''),
          target: (item.options.target || '').replace('-left', ''),
        });
      })
    });

    if (diffInfo.rmEdges && diffInfo.rmEdges.length > 0) {
      this.canvas.removeEdges(diffInfo.rmEdges.map((item) => item.id));
    }

    if (diffInfo.addEdges && diffInfo.addEdges.length > 0) {
      this.canvas.addEdges(diffInfo.addEdges);
    }

    if (diffInfo.rmNodes && diffInfo.rmNodes.length > 0) {
      this.canvas.removeNodes(diffInfo.rmNodes);
    }

    if (diffInfo.addNodes && diffInfo.addNodes.length > 0) {
      this.canvas.addNodes(diffInfo.addNodes);
      this.canvas._calcPos();
    }

    if (diffInfo.rmFields && diffInfo.rmFields.length > 0) {
      this.canvas.removeFields(diffInfo.rmFields);
    }

    if (diffInfo.addFields && diffInfo.addFields.length > 0) {
      this.canvas.addFields(diffInfo.addFields);
    }

    if (diffInfo.checkedFields && diffInfo.checkedFields.length > 0) {
      this.canvas.updateCheckedStatus(diffInfo.checkedFields);
    }

    this.canvas.updateDisableStatus(result);

    return false;
  }
  onChange() {
    if (!this._isOnchange) {
      this._isOnchange = true;
      setTimeout(() => {
        let result = transformChangeData(this.canvas.getDataMap(), this.props.type || 'single');
        this.props.onChange && this.props.onChange(result);
        this._isOnchange = false;
      }, 0);
    }
  }
  _genClassName() {
    let classname = '';
    if (this.props.className) {
      classname = this.props.className + ' butterfly-data-mapping';
    } else {
      classname = 'butterfly-data-mapping';
    }
    return classname;
  }
  _addEventListener() {
    let _addLinks = (links: any) => {
      let newLinkOpts = links.map((item: any) => {
        let _oldSource = _.get(item, 'sourceEndpoint.id', '');
        let _oldTarget = _.get(item, 'targetEndpoint.id', '');
        let _newSource = _oldSource.indexOf('-right') !== -1 ? _oldSource : _oldSource + '-right';
        let _newTarget = _oldTarget.indexOf('-left') !== -1 ? _oldTarget : _oldTarget + '-left';
        return {
          id: item.options.id || `${item.options.sourceNode}-${item.options.targetNode}`,
          sourceNode: item.options.sourceNode,
          targetNode: item.options.targetNode,
          source: _newSource,
          target: _newTarget,
          type: 'endpoint'
        };
      });
      this.canvas.removeEdges(links, true);
      newLinkOpts = newLinkOpts.filter((item) => {
        let targetNode = this.canvas.getNode(item.targetNode);
        let targetEndpoint = targetNode.getEndpoint(item.target);
        let sourceEndpoint = targetNode.getEndpoint(item.source);
        let result = this.canvas._checkLinkNum(targetEndpoint, undefined, 'target');
        // 取消link状态
        if(!result) {
          sourceEndpoint && $(sourceEndpoint.dom).removeClass('link');
        }
        return result;
      });
      return this.canvas.addEdges(newLinkOpts, true);
    }
    let _isInit = true;
    this.canvas.on('system.link.connect', (data: { links: any; }) => {
      let addEdges = _addLinks(data.links || []);
      let result = [];
      addEdges.forEach((item) => {
        let isConnect = true;
        this.props.isConnect && (isConnect = this.props.isConnect(item));
        if (isConnect) {
          result.push(item);
        } else {
          this.canvas.removeEdge(item, true);
        }
      });
      if (!_isInit) {
        this.onChange();
      }
      _isInit = false;
      this.canvas._linkedChain(result);
    });

    this.canvas.on('system.link.reconnect', (data: { addLinks: any, delLinks: any }) => {
      let addEdges = _addLinks(data.addLinks || []);
      let result = [];
      addEdges.forEach((item) => {
        let isConnect = true;
        this.props.isConnect && (isConnect = this.props.isConnect(item));
        if (isConnect) {
          result.push(item);
        } else {
          this.canvas.removeEdge(item, true);
        }
      });
      this.onChange();
      this.canvas._unLinkedChain(data.delLinks);
      this.canvas._linkedChain(result);
    });

    this.canvas.on('system.links.delete', (data: { links: any; }) => {
      this.onChange();
      this.canvas._unLinkedChain(data.links);
    });

    // 线段删除特殊处理
    this.canvas.on('custom.endpoint.dragNode', (data: { data: any; }) => {
      let point = data.data;
      let node = this.canvas.getNode(point.nodeId);
      let linkedPoint = node.getEndpoint(point.id + '-left', 'target');
      this.canvas.emit('InnerEvents', {
        type: 'endpoint:drag',
        data: linkedPoint
      });
    });
    // 连线特殊处理
    this.canvas.on('system.drag.move', (data: any) => {
      let dragEdge = _.get(data, 'dragEdges[0]');
      let sourcePointId = _.get(dragEdge, 'sourceEndpoint.id', '');
      if (sourcePointId.indexOf('right') === -1) {
        let souceNode = _.get(dragEdge, 'sourceNode');
        let newSourcePoint = souceNode.getEndpoint(sourcePointId + '-right');
        dragEdge.sourceEndpoint = newSourcePoint;
        dragEdge.options.sourceEndpoint = newSourcePoint;
        this.canvas._checkLinkNum(newSourcePoint, dragEdge, 'source');
      }
    });
    // 聚焦链路
    this.canvas.on('custom.endpoint.focus', (data: { point: any; }) => {
      this.canvas._focusChain(data.point);
      this.props.onRowMouseOver && this.props.onRowMouseOver(data.point);
    });
    // 失焦链路
    this.canvas.on('custom.endpoint.unFocus', (data: { point: any; }) => {
      this.canvas._unFocusChain(data.point);
      this.props.onRowMouseOut && this.props.onRowMouseOut(data.point);
    });

    // 字段重新排列
     this.canvas.on('custom.field.sort', (data?: any) => {
      const {nodeId, pointIds} = data;
      let node = this.canvas.getNode(nodeId);
      if (!node) {
        return;
      }
      pointIds.forEach((pointId: string) => {
        let fieldPoints = [
          node.getEndpoint(pointId),
          node.getEndpoint(pointId + '-left'),
          node.getEndpoint(pointId + '-right')
        ];
        fieldPoints.forEach((point) => {
          if (!point) {
            return;
          }
          point.updatePos();
        });
        let updateEdges = this.canvas.edges.filter((item: any) => {
          if (nodeId === item.sourceNode.id && (pointId + '-right' === item.sourceEndpoint.id)) {
            return true;
          }
          if (nodeId === item.targetNode.id && (pointId + '-left' === item.targetEndpoint.id)) {
            return true;
          }
          return false;
        });
        updateEdges.forEach((item: any) => {
          item.redraw();
        });
        this.onChange();
      });
    });

    // 字段选择状态变更
    this.canvas.on('custom.field.checked', (checkData) => {
      let result = transformChangeData(this.canvas.getDataMap(), this.props.type || 'single');
      let dataSource = result[`${checkData.nodeType}Data`];
      let targetNode = dataSource;
      if (dataSource.constructor === Array) {
        targetNode = _.find(dataSource, (_item) => _item.id === checkData.nodeId);
      }

      let fields = targetNode.fields;
      let targetField = _.find(fields, (_item) => _item.id === checkData.fieldId);
      targetField.checked = checkData.checked; 
      this.props.onChange && this.props.onChange(result);
    });

    this.canvas.on('system.link.click', (data?: any) => {
      let _edge = data.edge;
      this.props.onEdgeClick && this.props.onEdgeClick({
        id: _edge.id,
        sourceNodeId: _edge.sourceNode.id,
        targetNodeId: _edge.targetNode.id,
        sourceEndpointId: _edge.sourceEndpoint.originId,
        targetEndpointId: _edge.targetEndpoint.originId
      });
    })
  }
  render() {
    return (
      <div 
        className={this._genClassName()}
      >

      </div>
    )
  }
}
