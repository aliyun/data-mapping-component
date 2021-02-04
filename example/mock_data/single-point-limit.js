'use strict';

export const columns4 = [{
  key: 'id',
  primaryKey: true,
  width: 30
}, {
  key: 'name',
  width: 90
}, {
  key: 'desc',
  width: 90
}];

export const sourceData4 = {
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
  }]
};

export const targetData4 = {
  fields: [{
    id: '1',
    name: '限制数量1',
    desc: 'point limit1'
  }, {
    id: '2',
    name: '限制数量1',
    desc: 'point limit1'
  }, {
    id: '3',
    name: '限制数量1',
    desc: 'point limit1'
  }]
};

export const mappingData4 = [{
  source: '1',
  target: '3'
}, {
  source: '2',
  target: '1'
}];

