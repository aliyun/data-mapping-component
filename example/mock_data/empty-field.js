'use strict';

export const columns5 = [{
  key: 'id',
  primaryKey: true,
  width: 30
}, {
  key: 'name',
}, {
  key: 'desc',
  width: 90
}];

export const sourceData5 = [{
  id: 'source1',
  title: '表字段为空',
  fields: []
}];

export const targetData5 = [{
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
  }]
}];

export const mappingData5 = [{
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

