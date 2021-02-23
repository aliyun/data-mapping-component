
<h3 align="center">
  一个基于React的数据/字段映射组件
</h3>

[![npm version](https://img.shields.io/npm/v/react-data-mapping.svg?style=flat)](https://www.npmjs.com/package/react-data-mapping)
[![download](https://img.shields.io/npm/dm/react-data-mapping.svg?style=flat)](https://www.npmjs.com/package/react-data-mapping)
[![gzip size](https://img.shields.io/bundlephobia/minzip/react-data-mapping)](https://www.npmjs.com/package/react-data-mapping)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/aliyun/react-data-mapping/blob/master/LICENSE)

[English](./README.en-US.md) | 简体中文

<p align="center">
  <img width="400" src="https://img.alicdn.com/imgextra/i2/O1CN01O8w0tT26WuU5J6lty_!!6000000007670-1-tps-595-411.gif">
  <img width="400" src="https://img.alicdn.com/imgextra/i2/O1CN017Gcu0Y1mbgIHcgqwr_!!6000000004973-1-tps-595-411.gif">
</p>
<p align="center">
  <img width="400" src="https://img.alicdn.com/imgextra/i3/O1CN01f4Ek5H1oCbqDjM7sL_!!6000000005189-1-tps-595-411.gif">
  <img width="400" src="https://img.alicdn.com/imgextra/i4/O1CN01Nt9rpo25y6NlRMUtR_!!6000000007594-1-tps-595-411.gif">
</p>

## ✨ 特性
* 支持定制字段属性
* 支持表名定制
* 支持字段连接数量限制
* 支持字段排序
* 支持延迟渲染，自动适配高宽，四周留白等配置
* 支持空字段内容定制


## 🔨快速本地DEMO

``` 

git clone git@github.com:aliyun/react-data-mapping.git
npm install
cd example
npm install
npm start
```

## 📦 安装

``` 

npm install react-data-mapping
```

## 属性<a name='canvas-attr'></a>：

<b>组件属性</b>

| key             | 说明               | 类型             | 默认值                                      |
|-----------------|--------------------|------------------|------------------------------------------|
| width           | 组件宽度            | number           | 默认500，自适应的话可以设置"auto"             |
| height          | 组件高度            | number           | 默认500，自适应的话可以设置"auto"             |
| type            | 映射类型            | string           | "single" `只能是"single" 或 "mutiply"`     |
| className       | 组件类名            | string           |                                           |
| sourceClassName | 来源表类名          | string           |                                           |
| targetClassName | 目标表类名          | string           |                                           |
| columns         | 每列的属性          | object           | undefined                                 |
| sourceData      | 来源表数据          | object/array     | undefined/[ ] `单表映射Object,多表映射Array` |
| targetData      | 目标表数据          | object/array     | undefined/[ ] `单表映射Object,多表映射Array` |
| mappingData     | 初始映射关系         | array            | [ ]                                       |
| emptyContent    | 当表字段为空时显示内容 | string/JSX.Element     | - |
| emptyWidth      | 当表字段为空时表容器宽度 | string/number     | 150 |
| config     | 组件的额外属性配置，请看下面详细API        | object            | {}                          |
| onChange        | 每次连线触发事件     | function         |                                            |

<b>columns（每列的属性）</b>

| key        | 说明                    | 类型    | 默认值                  |
|------------|-------------------------|---------|------------------------|
| title      | 列标题                   | string  |                        |
| key        | 列标识                   | string  |                        |
| width      | 列宽度                   | number  |                        |
| primaryKey | 此属性是否为该组数据唯一标识 | boolean | `必须且仅有一个属性为true` |


<b>config（组件的额外属性配置）</b>

| key        | 说明                    | 类型    | 默认值                  |
|------------|-------------------------|---------|------------------------|
| delayDraw      | 延迟渲染，此组件一定要确保画布容器渲染(包括动画执行)完毕才能渲染,否则坐标都产生偏移,如：antd的modal的动画                  | number  |  0                     |
| extraPos        | 画布渲染的时候会留padding                   | object  |                        |
| sortable      | 排序支持                   | boolean/object  |                        | false
| linkNumLimit | 连线数量支持 | number/object |               |

## 🔗API

``` javascript
interface columns { // 设置每列的属性
  title ? : string; // 每列的title，类似thead的概念
  key: string; // 每列的唯一标志，对应数据上的key值
  width ? : number; // 每列宽度
  primaryKey: boolean // 这列的key对应的value是否作为键值对
}

interface config {
  delayDraw: number; // 延迟渲染，此组件一定要确保画布容器渲染(包括动画执行)完毕才能渲染,否则坐标都产生偏移,如：antd的modal的动画
  extraPos?: { // 画布渲染的时候会留padding
    paddingLeft?: number,
    paddingRight?: number,
    paddingTop?: number,
    paddingBottom?: number,
    paddingCenter?: number,
  },
  sortable?: boolean | { // 排序支持，假如是true，会整个画布都支持排序
    source?: boolean, // 假如是true，单纯左侧来源表支持排序
    target?: boolean  // 假如是true，单纯左侧目标表支持排序
  },
  linkNumLimit?: number | {  // 连线数量支持，假如是number，会整个画布都支持n条连线
    source?: number,  // 假如是number，单纯左侧来源表支持n条连线
    target?: number   // 假如是number，单纯左侧来源表支持n条连线
  }
}

interface ComProps { // 组件props属性
  width ? : number | string; // 组件的宽度，自适应的话可以设置"auto"
  height ? : number | string; // 组件的高度，自适应的话可以设置"auto"
  type ? : string; // "single"or"mutiply",单表映射(上图一) or 多表映射(上图二)
  className ? : string; // 组件类名
  sourceClassName ? : string; // 来源表类名
  targetClassName ? : string; // 目标表类名
  columns: Array < columns > ; // 请参考上述interface columns
  sourceData: Array < any > | Object; // 单表映射对应Object,多表映射Array,可参考demo
  targetData: Array < any > | Object; // 单表映射对应Object,多表映射Array,可参考demo
  mappingData: Array < any > ; // 初始化对应关系数据,可参考demo
  emptyContent?: string | JSX.Element; // 当表字段为空时显示内容
  emptyWidth?: number | string; // 当表字段为空时表容器宽度
  onChange(data: any): void // 每次连线都是触发onChange事件
};
```

``` jsx
import ButterflyDataMapping from 'react-data-mapping';
import 'react-data-mapping/dist/index.css';

<ButterflyDataMapping
  width={500}
  height={1000}
  type={'single'}
  columns={columns}
  sourceData={sourceData}
  targetData={targetData}
  mappingData={mappingData}
  className={'butterfly-data-mappint'}
  sourceClassName={'source-column'}
  targetClassName={'target-column'}
/>
```

如需要更多定制的需求，您可以提issue或者参考[Butterfly](https://github.com/alibaba/butterfly)来定制您需要的需求
