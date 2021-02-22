<h3 align="center">
  React-based data/field mapping Component
</h3>

English | [简体中文](./README.md)

<p align="center">
  <img width="500" src="https://img.alicdn.com/imgextra/i2/O1CN01O8w0tT26WuU5J6lty_!!6000000007670-1-tps-595-411.gif">
  <img width="500" src="https://img.alicdn.com/imgextra/i2/O1CN017Gcu0Y1mbgIHcgqwr_!!6000000004973-1-tps-595-411.gif">
</p>
<p align="center">
  <img width="500" src="https://img.alicdn.com/imgextra/i3/O1CN01f4Ek5H1oCbqDjM7sL_!!6000000005189-1-tps-595-411.gif">
  <img width="500" src="https://img.alicdn.com/imgextra/i4/O1CN01Nt9rpo25y6NlRMUtR_!!6000000007594-1-tps-595-411.gif">
</p>

## ✨ Features
* support for custom field attributes
* support custom table name
* support field connection number limit
* support field sorting
* support delay rendering, automatic adaptation of height and width, blank padding around

## 🔨QUCIK DEMO LOCAL

``` 

git clone git@github.com:aliyun/react-data-mapping.git
npm install
cd example
npm install
npm start
```

## 📦 Install

``` 

npm install react-data-mapping
```

## attribute<a name='canvas-attr'></a>：

<b>component props</b>

| key             | describe                      | type         | default                                                                |
|-----------------|-------------------------------|--------------|------------------------------------------------------------------------|
| width           | component width               | number       | Default 500, you can set "auto" for adaptive                                                                       |
| height          | component height              | number       | Default 500, you can set "auto" for adaptive                                                                       |
| type            | mapping type                  | string       | "single" `must be "single" or "mutiply"` |
| className       | component className           | string       |                                                                        |
| sourceClassName | source table className        | string       |                                                                        |
| targetClassName | target table className        | string       |                                                                        |
| columns         | column props                  | object       | undefined                                                              |
| sourceData      | source table data             | object/array | undefined/[ ] `single-table mapping Object, multi-table mapping Array` |
| targetData      | target table data             | object/array | undefined/[ ] `single-table mapping , multi-table mapping Array` |
| mappingData     | init mapping data             | array        | [ ]                                                                    |
| config     | the extra configuration of components，please reviewe the detailed API below        | object            | {}                          |
| onChange        | event triggered by connection | function     |                                                                        |

<b>config（the extra configuration of components）</b>

| key        | describe                    | type    | default                  |
|------------|-------------------------|---------|------------------------|
| delayDraw      | Delayed rendering, this component must ensure that the canvas container rendering (including animation execution) is completed before rendering, otherwise the coordinates will be offset, such as: antd's modal animation                | number  |  0                     |
| extraPos        | Padding is reserved when the canvas is rendered                   | object  |                        |
| sortable      | Sorting support                   | boolean/object  |                        | false
| linkNumLimit | Connection Number support | number/object |               |

## 🔗API

``` javascript
interface columns { // setting the attributes of each column
  title ? : string; // the title of each column, similar to the concept of thead
  key: string; // the unique mark of each column, corresponding to the key value on the data
  width ? : number; // width of each column
  primaryKey: boolean // whether the value corresponding to the key in this column is used as a unique sign
}

interface config {
  delayDraw: number ; // Delayed rendering, this component must ensure that the canvas container rendering (including animation execution) is completed before rendering, otherwise the coordinates will be offset, such as: antd's modal animation
  extraPos?: { // Padding is reserved when the canvas is rendered
    paddingLeft?: number,
    paddingRight?: number,
    paddingTop?: number,
    paddingBottom?: number,
    paddingCenter?: number,
  },
  sortable?: boolean | { // Sorting support, if it is true, the canvas will support sorting
    source?: boolean, // If it is true, only the left source table supports sorting
    target?: boolean  // If it is true, only pure right target table supports sorting
  },
  linkNumLimit?: number | {  // Connection Number support, if it is number, the canvas supports n connections
    source?: number,  // If it is number, only the left source table supports n connections
    target?: number   // If it is number, only the left target table supports n connections
  }
}

interface ComProps { // component props
  width ? : number; // component width
  height ? : number; // component height
  type ? : string; // "single"or"mutiply", single-table mapping (above pic one) or multi-table mapping (above pic two)
  className ? : string; // component className
  sourceClassName ? : string; // source table className
  targetClassName ? : string; // target table className
  columns: Array < columns > ; // please refer to the above interface columns
  sourceData: Array < any > | Object; // single-table mapping corresponds to Object, multi-table mapping Array, please refer to demo
  targetData: Array < any > | Object; // single-table mapping corresponds to Object, multi-table mapping Array, please refer to demo
  mappingData: Array < any > ; // initialize correspondence data, please refer to demo
  onChange(data: any): void // onChange event is triggered every time you connect edge
};
```

``` tsx
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
  className={'butterfly-data-mapping'}
  sourceClassName={'source-column'}
  targetClassName={'target-column'}
/>
```

If you need more customized requirements, you can refer to issue or [butterfly](https://github.com/alibaba/butterfly/blob/master/README.en-US.md) to customize your needs