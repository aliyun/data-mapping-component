'use strict';

export const columns3 = [{
  key: 'id',
  primaryKey: true,
  width: 30
}, {
  key: 'name',
}, {
  key: 'desc',
  width: 90
}];

export const sourceData3 = [{
  id: 'source1',
  title: '来源列1',
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
    desc: 'nationality'
  }]
}, {
  id: 'source2',
  title: '来源列2',
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
    desc: 'nationality'
  }]
}];

export const targetData3 = [{
  id: 'target1',
  title: '目标列1',
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
    desc: 'filed8'
  }]
}, {
  id: 'target2',
  title: '目标列2(空状态)',
  fields: []
}];

export const mappingData3 = [{
  source: '1',
  target: '3',
  sourceNode: 'source1',
  targetNode: 'target1'
}, {
  source: '2',
  target: '4',
  sourceNode: 'source1',
  targetNode: 'target1'
}, {
  source: '4',
  target: '1',
  sourceNode: 'source1',
  targetNode: 'target1'
}];

