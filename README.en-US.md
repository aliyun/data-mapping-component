<h3 align="center">
  React-based data/field mapping Component
</h3>

English | [简体中文](./README.md)

<p align="center">
  <img width="500" src="https://img.alicdn.com/imgextra/i4/O1CN012ecl7n25IsnZeXw1d_!!6000000007504-1-tps-595-411.gif">
  <img width="500" src="https://img.alicdn.com/imgextra/i2/O1CN017Gcu0Y1mbgIHcgqwr_!!6000000004973-1-tps-595-411.gif">
</p>
<p align="center">
  <img width="500" src="https://img.alicdn.com/imgextra/i2/O1CN011xYzxM1ZenzfVE0Xq_!!6000000003220-1-tps-595-411.gif">
  <img width="500" src="https://img.alicdn.com/imgextra/i4/O1CN01Nt9rpo25y6NlRMUtR_!!6000000007594-1-tps-595-411.gif">
</p>

## ✨ Features

* support for custom field attributes
* support custom table name
* support field connection number limit
* support field sorting
* support delay rendering, automatic adaptation of height and width, blank padding around
* support custom empty field content

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

## API<a name='canvas-attr'></a>：

### <b>DataMapping属性</b>

| Property        | Description                   | Type         | Default                                                                |
|-----------------|-------------------------------|--------------|------------------------------------------------------------------------|
| width           | Component width               | number       | Default 500, you can set "auto" for adaptive                           |
| height          | Component height              | number       | Default 500, you can set "auto" for adaptive                           |
| <a name='data-mapping-type'></a>type            | mapping type                  | string       | `single` &#124; `mutiply`, default `single`|
| className       | Component className           | string       | -  |
| sourceClassName | Source table className        | string       | -  |
| targetClassName | Target table className        | string       | -  |
| columns         | Column props                  |[Columns](#columns-type) &#124; Array&#60;Columns&#62; | undefined                      |
| sourceData      | Source table data             |[SourceData](#source-data) &#124; Object &#124; Array&#60;SourceData&#62; | undefined |
| targetData      | Target table data             |[TargetData](#target-data) &#124; Object &#124; Array&#60;TargetData&#62; | undefined |
| mappingData     | Init mapping data, [mappingData Prop](#mapping-data) | array   | [ ]                    |
| emptyContent    | Show content when table field is empty | string &#124; ReactNode     | - |
| emptyWidth      | Table container width when table field is empty, [config Prop](#config) | string &#124; number  | 150 |
| config     | The extra configuration of components，please reviewe the detailed API below        | object            | {}                          |
| isConnect       | Event triggered before each edge connection to determine whether it can be connected | <font color="c41d7f">function(edge): boolean</font> |   
| onChange        | Event triggered by connection | function     |      
| onRowMouseOver  | Event triggered when the mouse moves onto a row of data   | <font color="c41d7f">function(row)</font> | 
| onRowMouseOut   | Event triggered when the mouse moves out of a row of data          | <font color="c41d7f">function(row)</font> 
| onEdgeClick   | Event triggered when the connection is clicked          | <font color="c41d7f">function(row)</font> |  
| readonly        | Read only                        | <font color="c41d7f">boolean</font>      | Default false         |

<br>

### <a name='columns-type'></a><b>Column</b>

A column describes a data object and is an item in a Columns.

| Property        | Description                    | Type    | Default                  |
|-----------------|--------------------------------|---------|--------------------------|
| key        | The path of column data in a data item|  <font color="c41d7f">string</font>| -            |
| title      | The column header displays text       |<font color="c41d7f">string</font>| -                      |
| width      | The column width                      | <font color="c41d7f">number</font>| -                      |
| primaryKey | Whether this property is uniquely identified for the set of data | <font color="c41d7f">boolean</font>| `必须且仅有一个属性为true` |
| render     |Custom rendering function, parameters are the value of the current row, the current row data, row index | <font color="c41d7f">function(text, record, index) {}</font>|  - |


<br>


### <a name='source-data'></a><b>sourceData</b>

Source table data，when [type](#data-mapping-type) is `single` , the sourceData type is { }; when [type](#data-mapping-type)为 `mutiply` , the sourceData type is [ ].


| Property                      | Description                            | Type     | Default                |
|-------------------------------|----------------------------------------|---------|--------------------------|
| <a name='source-data-id'></a>id       | Column identifies， when [type](#data-mapping-type) is `single`，the id is not required, when the [type](#data-mapping-type) is  `mutiply`, the id is required| <font color="c41d7f">string</font>  | -         |
| title                                | Column title                       | <font color="c41d7f">string</font>  | -  |
| fileds                                | Data record array to be displayed  | <font color="c41d7f">array</font>   | -  |
| checked                                | Is it checked                                     | <font color="c41d7f">boolean</font>    | false        |
| disable                                | No connection               | <font color="c41d7f">boolean</font>    | false         |

<br>

### <a name='target-data'></a><b>targetData</b>

Target table data, when [type](#data-mapping-type) is `single` , the targetData type is { }, when [type](#data-mapping-type) is  `mutiply` , the targetData type is [ ], Please check [sourceData](#source-data)

<br>

### <a name='mapping-data'></a><b>mappingData</b>

| Property        | Description                    | Type     |
|------------|-------------------------|---------|
| source     | Unique identification of the current row data in the source table  | <font color="c41d7f">-</font>  |
| target     | Unique identification of the current row data in the target table  | <font color="c41d7f">-</font>  |
| sourceNode | The ID of the source table, Please check [sourceData ID](#source-data-id)| <font color="c41d7f">string</font>  |
| targetNode | The ID of the target table, Please check [targetData ID](#target-data)| <font color="c41d7f">string</font>  |

<br>

### <a name='config'></a><b>config</b>

The extra configuration of components

| Property        | Description                    | Type    | Default                  |
|------------|-------------------------|---------|------------------------|
| delayDraw  | Delayed rendering. This component must ensure that the canvas container rendering (including animation execution) is completed before rendering, otherwise the coordinates will be offset, for example：Animation of Ant Design Modal | <font color="c41d7f">number</font> | 0 |
| extraPos        | Padding is reserved when rendering the canvas | [extraPos Prop](#extraPos-prop)<font color="c41d7f"> { }</font>  | -                 |
| sortable        | Sorter                   | <font color="c41d7f">boolean &#124; object</font>   |  -        | 
| linkNumLimit    | Number of lines limited | <font color="c41d7f">number &#124; object</font>  |   -            |
| checkable        | Support check box   | [checkable Prop](#checkable-prop)<font color="c41d7f"> { }</font>  | -                       |

<br>

### <a name='extraPos-prop'></a><b>extraPos</b>

Padding is reserved when rendering the canvas

| Property     | Description                 | Type       | Default |
|-----------   |-----------------------------|------------|-------|
|paddingLeft   |  Padding spacing on the left             | number      | 0    |
|paddingRight  |  Padding spacing on the right            | number      | 0    |
|paddingTop    |  Padding spacing on the top              | number      | 0    |
|paddingBottom |  Padding spacing on the bottom           | number      | 0    |
|paddingCenter |  Center spacing                          | number      | 150  |
|nodeVerticalPadding |  Node vertical spacing        | number      | 10    |

<br>

### <a name='checkable-prop'></a><b>checkable</b>

Table supports checkbox

| Property     | Description                 | Type       | Default |
|-----------   |----------------|-------------|------|
|source   |  left table supports checkbox            | boolean      | false    |
|target  |  right table supports checkbox             | boolean      | false   |

## 🔗API

``` javascript
interface columns { // setting the attributes of each column
  title ? : string; // the title of each column, similar to the concept of thead
  key: string; // the unique mark of each column, corresponding to the key value on the data
  width ? : number; // width of each column
  primaryKey: boolean // whether the value corresponding to the key in this column is used as a unique sign
  render?(text: any, record: any, index: number): void; // Custom rendering function
}

interface config {
  delayDraw: number; // Delayed rendering, this component must ensure that the canvas container rendering (including animation execution) is completed before rendering, otherwise the coordinates will be offset, such as: antd's modal animation
  extraPos ? : { // Padding is reserved when the canvas is rendered
      paddingLeft ? : number,
      paddingRight ? : number,
      paddingTop ? : number,
      paddingBottom ? : number,
      paddingCenter ? : number,
    },
    sortable ? : boolean | { // Sorting support, if it is true, the canvas will support sorting
      source ? : boolean, // If it is true, only the left source table supports sorting
      target ? : boolean // If it is true, only pure right target table supports sorting
    },
    linkNumLimit ? : number | { // Connection Number support, if it is number, the canvas supports n connections
      source ? : number, // If it is number, only the left source table supports n connections
      target ? : number // If it is number, only the left target table supports n connections
    },
    checkable ？: {  // table supports checkbox
      source ? : boolean, // // If it is true, only pure right target table supports checkbox
      target ? : boolean
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
  emptyContent ? : string | JSX.Element; // show content when table field is empty
  emptyWidth ? : number | string; // table container width when table field is empty
  isConnect?(edge: any): boolean; // isConnect event is triggered before you connect an edge, return true, it will connect, and false will not
  onChange(data: any): void // onChange event is triggered every time you connect edge
  onRowMouseOver?(row:any):void, // onRowMouseOver event is triggered when you move the cursor onto a row of data
  onRowMouseOut?(row:any):void, // onRowMouseOver event is triggered when you move the cursor out of a row of data
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
