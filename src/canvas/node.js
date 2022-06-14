'use strict';

import {Node} from 'butterfly-dag';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';
import * as _ from 'lodash';
import {Tips} from 'butterfly-dag';
import emptyDom from './empty';
import Endpoint from './endpoint';
import './checkbox.less';

export default class TableNode extends Node {
  constructor(opts) {
    super(opts);
    // 标题高度
    this.TITLE_HEIGHT = 34;
    // 列标题高度
    this.COLUMNS_TITLE_HEIGHT = 28;
    // 每列宽度
    this.COLUMN_WIDTH = 60;
    // 每行高度
    this.ROW_HEIGHT = 26;
    // 垂直间距
    this.PADDING_VERTICAL = _.get(opts, '_extraPos.nodeVerticalPadding') || 10;
    // 水平间距
    this.PADDING_HORIZONTAL = _.get(opts, '_extraPos.paddingCenter') || 150;
    // 排序宽度
    this.SORTABLE_WIDTH = 40;
    // checkout宽度
    this.CHECKBOX_WIDTH = this.ROW_HEIGHT;

    this.height = 0;
    this.width = 0;

    // 选择状态
    this.checked = opts.checked;

    // 只读状态
    this.readonly = opts.readonly;

    this.fieldsList = [];
  }
  _addEventListener() {
    $(this.dom).on('mouseDown', (e) => {
      const LEFT_KEY = 0;
      if (e.button !== LEFT_KEY) {
        return;
      }

      if (this.draggable) {
        this._isMoving = true;
        this.emit('InnerEvents', {
          type: 'node:dragBegin',
          data: this
        });
      } else {
        // 单纯为了抛错事件给canvas，为了让canvas的dragtype不为空，不会触发canvas:click事件
        this.emit('InnerEvents', {
          type: 'node:mouseDown',
          data: this
        });

        return true;
      }
    });
  }
  mounted() {
    // 生成endpoint
    this._createNodeEndpoint();

    // 保持title宽度
    if (!this.fieldsList.length) {
      $(this.dom).find('.title').css('width', this.options._emptyWidth || 150);
    }

    // 加tips
    this._addFieldItemTips();
  }
  draw(obj) {
    let _dom = obj.dom;
    if (!_dom) {
      _dom = $('<div></div>')
        .attr('class', 'node table-node')
        .attr('id', obj.name);
    }
    if (!_.isEmpty(obj.options._sourceClassName) && _.get(obj, 'options.type') === 'source') {
      _dom.addClass(obj.options._sourceClassName)
    }
    if (!_.isEmpty(obj.options._targetClassName) && _.get(obj, 'options.type') === 'target') {
      _dom.addClass(obj.options._targetClassName)
    }
    const node = $(_dom);
    // 计算节点坐标
    if (obj.top !== undefined) {
      node.css('top', `${obj.top + _.get(obj, 'options._extraPos.paddingTop', 0)}px`);
    }
    if (obj.left !== undefined) {
      node.css('left', `${obj.left + _.get(obj, 'options._extraPos.paddingLeft', 0)}px`);
    }

    this._calcSize(node, obj);

    this._createTableName(node); // 表名
    this._createFieldTitle(node); // 字段标题
    this._createFields(node); // 字段
    return node[0];
  }
  _createTableName(container = this.dom) {
    let title = _.get(this, 'options.title');
    if (title) {
      let titleDom = $(`<div class="title">${title}</div>`);
      titleDom.css({
        'height': this.TITLE_HEIGHT + 'px',
        'line-height': this.TITLE_HEIGHT + 'px'
      });
      $(container).append(titleDom);
    }
  }
  _addFieldItemTips(fieldItems) {
    const _fieldItems = fieldItems || $(this.dom).find('.field-item');
    const fieldItemDoms = Array.prototype.slice.apply(_fieldItems);
    fieldItemDoms.forEach((_fieldItem, index) => {
      if(_fieldItem.scrollWidth > _fieldItem.clientWidth) {
        const fieldItem = $(_fieldItems[index])
        Tips.createTip({
          className: 'field-item-tooltip',
          targetDom: fieldItem[0],
          genTipDom: () => fieldItem.text(),
        });
      }
    })
  }
  _createFieldTitle(container = this.dom) {
    let type = _.get(this, 'options.type', '');
    let columns = _.get(this, ['options', type === 'source' ? '_sourceColumns' : '_targetColumns'], []);
    let checkable = _.get(this, 'options.checkable');
    let hasFieldTitle = _.some(columns, (item) => {
      return item.title;
    });
    let isObject = (object) => Object.prototype.toString.call(object) === "[object Object]";
    if (hasFieldTitle) {
      const columnsTitleDom = $('<div class="filed-title"></div>');
      if (checkable) {
        let hasCheckBox = false;
        if (type === 'source') {
          if (isObject(checkable) && checkable.source) {
            hasCheckBox = true;
          }
        } else if (type === 'target') {
          if (isObject(checkable) && checkable.target) {
            hasCheckBox = true;
          }
        }
        if (typeof(checkable) === 'boolean') {
          hasCheckBox = true;
        }
        if (hasCheckBox) {
          let emptyDom = $(`<span class="filed-title-item"></span>`);
          emptyDom.css('width', this.CHECKBOX_WIDTH + 'px');
          columnsTitleDom.append(emptyDom);
        }
      }
      columns.forEach(_col => {
        const columnsTitleItem = $(`<span class="filed-title-item">${_col.title}</span>`);
        columnsTitleItem.css('width', (_col.width || this.COLUMN_WIDTH) + 'px');
        columnsTitleDom.append(columnsTitleItem);
      });
      columnsTitleDom.css('height', this.COLUMNS_TITLE_HEIGHT + 'px')
                     .css('line-height', this.COLUMNS_TITLE_HEIGHT + 'px')
      container.append(columnsTitleDom);
    }
  }
  _createSortableBtn(field) {
    let sortFieldDom = $(`
      <span class="field-sort">
        <i class="data-mapping-icon data-mapping-icon-paixu-top move-up"></i>
        <i class="data-mapping-icon data-mapping-icon-paixu-bottom move-down"></i>
      </span>
    `);
    sortFieldDom.css({
      width: this.SORTABLE_WIDTH + 'px',
    });
    sortFieldDom.find('.move-up').click(this._moveUp.bind(this, field));
    sortFieldDom.find('.move-down').click(this._moveDown.bind(this, field));
    return sortFieldDom;
  }
  _createCheckBox(field) {
    let checkboxDom = $(`
      <span class="field-checkbox">
        <span class="dm-checkbox">
          <span class="dm-checkbox-inner"></span>
        </span>
      </span>
    `);
    checkboxDom.css('height', this.CHECKBOX_WIDTH + 'px');
    if (field.checked) {
      checkboxDom.find('.dm-checkbox').addClass('dm-checkbox-checked');
    }
    if (this.readonly) {
      checkboxDom.addClass('field-checkbox-disable');
    }
    checkboxDom.click((e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.readonly) {
        return;
      }
      // 发送事件，更新选择状态
      this.emit('custom.field.checked', {
        nodeId: this.id,
        nodeType: this.options.type,
        fieldId: field.id,
        checked: !field.checked
      });
    });
    return checkboxDom;
  }
  _createFields(container = $(this.dom), addFields = []) {
    let fields = addFields.length === 0 ? _.get(this, 'options.fields') : addFields;
    let type = _.get(this, 'options.type', '');
    let columns = _.get(this, ['options', type === 'source' ? '_sourceColumns' : '_targetColumns'], []);
    let sortable = _.get(this, 'options.sortable');
    let checkable = _.get(this, 'options.checkable');
    let isObject = (object) => Object.prototype.toString.call(object) === "[object Object]";
    let result = [];

    if (fields && fields.length) {
      fields.forEach((_field, index) => {
        let fieldDom = $('<div class="field"></div>');
        let _primaryKey = columns[0].key;
        let sortFieldDom = undefined;
        let checkFieldDom = undefined;
  
        if (sortable) {
          sortFieldDom = this._createSortableBtn(_field);
        }
        if (checkable) {
          if (type === 'source') {
            if (isObject(checkable) && checkable.source) {
              checkFieldDom = this._createCheckBox(_field);
              fieldDom.append(checkFieldDom);
            }
          } else if (type === 'target') {
            if (isObject(checkable) && checkable.target) {
              checkFieldDom = this._createCheckBox(_field);
              fieldDom.append(checkFieldDom);
            }
          }
          if (typeof(checkable) === 'boolean') {
            checkFieldDom = this._createCheckBox(_field);
            fieldDom.append(checkFieldDom);
          }
        }
        fieldDom.css({
          height: this.ROW_HEIGHT + 'px',
          'line-height': this.ROW_HEIGHT + 'px'
        });
        columns.forEach((_col) => {
          if (_col.render) {
            let fieldItemDom = $(`<span class="field-item"></span>`);
            fieldItemDom.css('width', (_col.width || this.COLUMN_WIDTH) + 'px');
            ReactDOM.render(_col.render(_field[_col.key], _field, index), fieldItemDom[0]);
            fieldDom.append(fieldItemDom);
          } else {
            let fieldItemDom = $(`<span class="field-item">${_field[_col.key]}</span>`);
            fieldItemDom.css('width', (_col.width || this.COLUMN_WIDTH) + 'px');
            fieldDom.append(fieldItemDom);
          }
          if (_col.primaryKey) {
            _primaryKey = _col.key;
          }
          
        });
        if (sortFieldDom) {
          fieldDom.append(sortFieldDom);
        }
        if (type === 'source') {
          let rightPoint = $('<div class="point right-point"></div>');
          fieldDom.append(rightPoint);
          if (isObject(sortable) && sortable.source) {
            sortFieldDom = this._createSortableBtn(_field);
            fieldDom.append(sortFieldDom);
          }
        }
        if (type === 'target') {
          let leftPoint = $('<div class="point left-point"></div>');
          fieldDom.append(leftPoint);
          if (isObject(sortable) && sortable.target) {
            sortFieldDom = this._createSortableBtn(_field);
            fieldDom.append(sortFieldDom);
          }
        }
        container.append(fieldDom);
        result.push({
          id: _field[_primaryKey],
          dom: fieldDom
        });
      });
      this.fieldsList = this.fieldsList.concat(result);
    } else {
      const _emptyContent = _.get(this.options, '_emptyContent');
      const noDataTree = emptyDom({
        content: _emptyContent,
        width: this.options._emptyWidth
      });
      container.append(noDataTree);
      this.height = $(container).outerHeight();
    }

    return result;
  }
  _createNodeEndpoint(fieldList) {
    let type = this.options.type;
    let _fieldList = fieldList || this.fieldsList || [];
    
    _fieldList.forEach((item) => {
      this.addEndpoint({
        id: item.id,
        orientation: type === 'source' ? [1,0] : [-1,0],
        type: type,
        _isNodeSelf: true,
        dom: item.dom[0],
        Class: Endpoint
      });
      if (type === 'source') {
        this.addEndpoint({
          id: item.id + '-right',
          orientation: [1,0],
          type: type,
          _isNodeSelf: false,
          dom: $(item.dom).find('.right-point')[0],
          Class: Endpoint,
          linkable: false
        });
      } else if (type === 'target') {
        this.addEndpoint({
          id: item.id + '-left',
          orientation: [-1,0],
          type: type,
          _isNodeSelf: false,
          dom: $(item.dom).find('.left-point')[0],
          Class: Endpoint,
          disLinkable: false
        });
      }
    });
  }
  _calcSize(node, obj) {
    let hasTitle = _.get(obj, 'options.title');
    let fields = _.get(obj, 'options.fields', []);
    let sortable = _.get(obj, 'options.sortable');
    let type = _.get(obj, 'options.type');

    if (hasTitle) {
      this.height += this.TITLE_HEIGHT;
    }
    this.height += fields.length * this.ROW_HEIGHT;
    
    let columns = _.get(this, ['options', type === 'source' ? '_sourceColumns' : '_targetColumns'], []);
    columns.forEach((item) => {
      this.width += item.width || this.COLUMN_WIDTH;
    });

    if (typeof(sortable) === 'boolean') this.width += this.SORTABLE_WIDTH;
    
    if (Object.prototype.toString.call(sortable) === '[object Object]') {
      if (type === 'source') this.width += this.SORTABLE_WIDTH;
      if (type === 'target') this.width += this.SORTABLE_WIDTH;
    }
    // todo: 记得算上SORTABLE_WIDTH
  }

  _moveUp(curField, event) {
    event.preventDefault();
    event.stopPropagation();
    let curIndex = this.fieldsList.findIndex(i => i.id === curField.id);
    let oldFields = _.get(this, 'options.fields', []);
    let oldFieldsItem = oldFields.splice(curIndex, 1);
    let point = this.getEndpoint(curField.id);
    let curFieldDom = point.dom;
    let curFieldData = this.fieldsList[curIndex];
    // 处理边界
    if (curIndex === 0) {
      console.warn('this field has reach the top!');
      return;
    }
    let preFieldData = this.fieldsList[curIndex - 1];
    let preFieldDom = preFieldData.dom;

    // 交换dom
    $(preFieldDom).before(curFieldDom);

    // 交换数据
    this.fieldsList[curIndex] = preFieldData;
    this.fieldsList[curIndex - 1] = curFieldData;
    oldFields.splice(curIndex - 1, 0, oldFieldsItem[0]);

    // 发送事件，更新线段和锚点坐标
    this.emit('custom.field.sort', {
      nodeId: this.id,
      pointIds: [curFieldData.id, preFieldData.id]
    });
  }

  _moveDown(curField, event) {
    event.preventDefault();
    event.stopPropagation();
    let curIndex = this.fieldsList.findIndex(i => i.id === curField.id);
    let oldFields = _.get(this, 'options.fields', []);
    let oldFieldsItem = oldFields.splice(curIndex, 1);
    let point = this.getEndpoint(curField.id);
    let curFieldDom = point.dom;
    let curFieldData = this.fieldsList[curIndex];
    // 处理边界
    if (curIndex === this.fieldsList.length - 1) {
      console.warn('this field has reach the bottom!');
      return;
    }
    let nextFieldData = this.fieldsList[curIndex + 1];
    let nextFieldDom = nextFieldData.dom;

    // 交换dom
    $(nextFieldDom).after(curFieldDom);

    // 交换数据
    this.fieldsList[curIndex] = nextFieldData;
    this.fieldsList[curIndex + 1] = curFieldData;
    oldFields.splice(curIndex + 1, 0, oldFieldsItem[0]);

    // 发送事件，更新线段和锚点坐标
    this.emit('custom.field.sort', {
      nodeId: this.id,
      pointIds: [curFieldData.id, nextFieldData.id]
    });
    
  }
  setReadOnly (newStatus) {
    if (this.readonly != newStatus) {
      this.readonly = newStatus;
      if (newStatus) {
        $(this.dom).find('.field-checkbox').addClass('field-checkbox-disable');
      } else {
        $(this.dom).find('.field-checkbox').removeClass('field-checkbox-disable');
      }
    }
  }
  addFields(fields) {
    let _addFieldsList = this._createFields(undefined, fields);
    this._createNodeEndpoint(_addFieldsList);
    let _addFieldsDomList = _addFieldsList.map((item) => {
      return $(item.dom).find('.field-item');
    });
    this._addFieldItemTips(_addFieldsDomList);
  }
  removeFields(fields) {
    fields.forEach((item) => {
      let index = _.findIndex(this.fieldsList, _field => _field.id === item.id);
      let field = this.fieldsList.splice(index, 1)[0];
      if (field) {
        $(field.dom).find('.field-item').off();
        $(field.dom).off();
        $(field.dom).remove();
      }
    });
  }
  updateCheckedStatus(fields) {
    fields.forEach((field) => {
      let realField = _.find(this.fieldsList, (item) => {
        return item.id === field.id;
      });
      let realFieldData = _.find(this.options.fields || [], (item) => {
        return item.id === field.id;
      });
      if (!realFieldData) {
        return;
      }
      if (field.checked) {
        realFieldData.checked = field.checked;
        realField.dom.find('.dm-checkbox').addClass('dm-checkbox-checked');
      } else {
        realFieldData.checked = field.checked;
        realField.dom.find('.dm-checkbox').removeClass('dm-checkbox-checked');
      }
    });
  }
};
