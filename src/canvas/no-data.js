import $_q from 'jquery';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const isReactEle = (HTMLElement) => {
  return React.isValidElement(HTMLElement);
};

export default (noDataContent, config) => {
  let width = config.width;

  if (!width) {
    width = 'unset';
  }
  
  if (typeof config.width === 'number') {
    width = `${config.width}px`;
  }

  let noDataDom = `<div style="width: ${width}"></div>`;

  if (noDataContent) {
    if (isReactEle(noDataContent)) {
      noDataDom = $_q(ReactDOMServer.renderToString(noDataContent));
    } else {
      noDataDom = $_q(noDataContent);
    }
  } else {
    noDataDom = $_q(`<div class="no-data" style="width: ${width}"></div>`);
    const iconDom = $_q('<i class="no-data-icon data-mapping-icon data-mapping-icon-kongshuju"></i>');
  
    noDataDom.append(iconDom);
  }

  return noDataDom;
};
