'use strict';
import React from 'react';

export const sourceColumns = [{
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

export const targetColumns = [{
  key: 'code',
  title: 'code',
  primaryKey: true,
  width: 30
}, {
  key: 'gender',
  title: '性别',
  render: (val, row, index) => {
    return <div>{val}</div>
  }
}, {
  key: 'desc',
  title: '简介',
}];

export const sourceData5 = {
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
    desc: 'weight'
  }, {
    id: '6',
    name: '国籍',
    desc: 'nation'
  }]
};

export const targetData5 = {
  fields: [{
    code: '1',
    gender: '男',
    desc: 'filed1'
  }, {
    code: '2',
    gender: '女',
    desc: 'filed2'
  }, {
    code: '3',
    gender: '男',
    desc: 'filed3'
  }, {
    code: '4',
    gender: '女',
    desc: 'filed4'
  }, {
    code: '5',
    gender: '男',
    desc: 'filed5'
  }, {
    code: '6',
    gender: '女',
    desc: 'filed6'
  }, {
    code: '7',
    gender: '男',
    desc: 'filed7'
  }, {
    code: '8',
    gender: '中性',
    desc: 'filed8'
  }]
};

export const mappingData5 = [{
  source: '1',
  target: '3'
}, {
  source: '2',
  target: '4'
}, {
  source: '4',
  target: '1'
}];

