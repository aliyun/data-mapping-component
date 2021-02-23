import $_q from 'jquery';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const isReactEle = (HTMLElement) => {
  return React.isValidElement(HTMLElement);
};

/**
 * params {Object} config
 * params {JSX.Element | String} config.content
 * params {Number | String} config.width
 */
export default (config) => {
  const content = config.content;
  let width = config.width;

  if (!width) {
    width = '150px';
  }
  
  if (typeof config.width === 'number') {
    width = `${config.width}px`;
  }

  let emptyDom = `<div style="width: ${width}"></div>`;

  if (content) {
    if (isReactEle(content)) {
      emptyDom = $_q(ReactDOMServer.renderToString(content));
    } else {
      emptyDom = $_q(content);
    }
  } else {
    emptyDom = $_q(`<div class="no-data" style="width: ${width}"></div>`);
    const iconDom = $_q('<i class="no-data-icon data-mapping-icon data-mapping-icon-kongshuju"></i>');
  
    emptyDom.append(iconDom);
  }

  return emptyDom;
};
