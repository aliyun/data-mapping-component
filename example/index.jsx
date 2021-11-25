'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Layout, Row, Col, Button} from 'antd';
import * as _ from 'lodash';
import DataMapping from '../src/index.tsx';
import * as SingleNoHeaderData from './mock_data/single-no-header';
import * as SingleWithHeaderData from './mock_data/single-with-header';
import * as MutiplyMappingData from './mock_data/mutiply-mapping';
import * as SinglePointLimit from './mock_data/single-point-limit';
import * as DiffColumns from './mock_data/diff-columns';

import 'antd/dist/antd.css';
import './index.less';

const {Header} = Layout;
const {columns1, mappingData1, sourceData1, targetData1} = SingleNoHeaderData;
const {columns2, mappingData2, sourceData2, targetData2} = SingleWithHeaderData;
const {columns3, mappingData3, sourceData3, targetData3} = MutiplyMappingData;
const {columns4, mappingData4, sourceData4, targetData4} = SinglePointLimit;
const {sourceColumns, targetColumns, mappingData5, sourceData5, targetData5} = DiffColumns;

class Com extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceData1,
      targetData1,
      mappingData1
    }
  }
  componentDidMount() {
    this.setState({
      sourceData1: _.cloneDeep(sourceData1),
      targetData1: _.cloneDeep(targetData1),
      mappingData1: _.cloneDeep(mappingData1),
    });
    // setTimeout(() => {
    //   let _sourceData1 = _.cloneDeep(this.state.sourceData1);
    //   _sourceData1.fields[4].disable = true;
    //   let _targetData1 = _.cloneDeep(this.state.targetData1);
    //   _targetData1.fields[5].disable = true;
    //   _targetData1.fields[6].disable = true;
    //   _targetData1.fields[7].disable = true;
    //   this.setState({
    //     sourceData1: _sourceData1,
    //     targetData1: _targetData1
    //   });
    // }, 5000);
  }
  render() {
    return (
      <Row gutter={[16, 16]}>
        <Col flex={'600px'}>
          <DataMapping
            className='container single-no-header'
            sourceClassName='single-no-header-source'
            targetClassName='single-no-header-target'
            columns={columns1}
            sourceData={this.state.sourceData1}
            targetData={this.state.targetData1}
            config={{
              checkable: {
                source: true,
                target: false
              }
            }}
            onChange={(data) => {
              this.setState({
                sourceData1: _.cloneDeep(data.sourceData),
                targetData1: _.cloneDeep(data.targetData),
                mappingData1: _.cloneDeep(data.mappingData),
              });
            }}
            // sourceData={this.state.sourceData1}
            // targetData={this.state.targetData1}
            // mappingData={this.state.mappingData1}
            mappingData={this.state.mappingData1}
            width={600}
            height={600}
            onEdgeClick={(data) => {
              console.log(data);
            }}
          />
        </Col>
        <Col flex={'600px'}>
          <DataMapping
            className='container single-with-header'
            columns={columns2}
            sourceData={sourceData2}
            targetData={targetData2}
            mappingData={mappingData2}
            width={600}
            height={600}
          />
        </Col>
        <Col flex={'600px'}>
          <DataMapping
            className='container mutiply-mapping'
            columns={columns3}
            sourceData={sourceData3}
            targetData={targetData3}
            mappingData={mappingData3}
            type={'mutiply'}
            width={600}
            height={600}
            config={{
              extraPos: {
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                paddingCenter: 130
              }
            }}
          />
        </Col>
        <Col flex={'600px'}>
          <DataMapping
            className='container mutiply-mapping'
            columns={columns3}
            sourceData={sourceData3}
            targetData={targetData3}
            mappingData={mappingData3}
            type={'mutiply'}
            emptyContent={
              <div className="empty-content">
                <p className="desc">暂无数据</p>
                <p
                  className="add-field"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('自定义空状态');
                  }}
                >+ 添加字段</p>
              </div>
            }
            width={600}
            height={600}
            config={{
              sortable: true,
              checkable: {
                source: true,
                target: false
              },
              extraPos: {
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                paddingCenter: 130
              }
            }}
          />
        </Col>
        <Col flex={'600px'}>
          <DataMapping
            className='container single-no-header'
            columns={columns4}
            sourceData={sourceData4}
            targetData={targetData4}
            mappingData={mappingData4}
            width={600}
            height={600}
            config={{
              linkNumLimit: {
                source:2,
                target:1,
              },
              extraPos: {
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                paddingCenter: 100
              }
            }}
          />
        </Col>
        <Col flex={'600px'}>
          <DataMapping
            className='container single-no-header'
            sourceClassName='single-no-header-source'
            targetClassName='single-no-header-target'
            sourceColumns={sourceColumns}
            targetColumns={targetColumns}
            sourceData={sourceData5}
            targetData={targetData5}
            mappingData={mappingData5}
            width={600}
            height={600}
          />
        </Col>
      </Row>
    );
  }
}


ReactDOM.render((
  <Router>
    <Layout>
      <Header className='header'>DTDesign-React数据映射组件</Header>
      <Layout>
        <Com />
      </Layout>
    </Layout>
  </Router>
), document.getElementById('main'));
