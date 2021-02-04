'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {Layout, Menu, Row, Col} from 'antd';
import DataMapping from '../src/index.tsx';
import * as SingleNoHeaderData from './mock_data/single-no-header';
import * as SingleWithHeaderData from './mock_data/single-with-header';
import * as MutiplyMappingData from './mock_data/mutiply-mapping';
import * as SinglePointLimit from './mock_data/single-point-limit';

import 'antd/dist/antd.css';
import './index.less';

const {Header} = Layout;
const {columns1, mappingData1, sourceData1, targetData1} = SingleNoHeaderData;
const {columns2, mappingData2, sourceData2, targetData2} = SingleWithHeaderData;
const {columns3, mappingData3, sourceData3, targetData3} = MutiplyMappingData;
const {columns4, mappingData4, sourceData4, targetData4} = SinglePointLimit;

ReactDOM.render((
  <Router>
    <Layout>
      <Header className='header'>DTDesign-React数据映射组件</Header>
      <Layout>
        <Row gutter={[16, 16]}>
          <Col flex={'600px'}>
            <DataMapping 
              className='container single-no-header'
              columns={columns1}
              sourceData={sourceData1}
              targetData={targetData1}
              mappingData={mappingData1}
              width={600}
              height={600}
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
              width={600}
              height={600}
              config={{
                sortable: true,
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
                linkNumLimit: 1,
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
        </Row>
      </Layout>
    </Layout>
  </Router>
), document.getElementById('main'));
