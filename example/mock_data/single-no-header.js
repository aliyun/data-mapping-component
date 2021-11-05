'use strict';
import React from 'react';

export const columns1 = [{
  key: 'id',
  title: 'ID',
  primaryKey: true,
  width: 30
}, {
  key: 'name',
  title: '名字',
  render: (val, row, index) => {
    return <div>{val}</div>
  }
}, {
  key: 'desc',
  title: '描述',
}];

export const sourceData1 = {
  title: 'source标题',
  fields: [{
    id: '1',
    name: '性别',
    desc: 'gender'
  }, {
    id: '2',
    name: '年龄',
    desc: 'age'
  }, {
    id: '3',
    name: '喜好',
    desc: 'hobby'
  }, {
    id: '4',
    name: '身高',
    desc: 'height'
  }, {
    id: '5',
    name: '体重',
    desc: 'weight',
    checked: true
  }, {
    id: '6',
    name: '国籍',
    desc: 'nation',
    disable: true
  }]
};

export const targetData1 = {
  fields: [{
    id: '1',
    name: '字段1',
    desc: 'filed1'
  }, {
    id: '2',
    name: '字段2',
    desc: 'filed2'
  }, {
    id: '3',
    name: '字段3',
    desc: 'filed3'
  }, {
    id: '4',
    name: '字段4',
    desc: 'filed4'
  }, {
    id: '5',
    name: '字段5',
    desc: 'filed5'
  }, {
    id: '6',
    name: '字段6',
    desc: 'filed6'
  }, {
    id: '7',
    name: '字段7',
    desc: 'filed7'
  }, {
    id: '8',
    name: '字段8',
    desc: 'filed8',
    disable: true
  }]
};

export const mappingData1 = [{
  source: '1',
  target: '3'
}, {
  source: '2',
  target: '4'
}, {
  source: '4',
  target: '1'
}];

