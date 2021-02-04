'use strict';

import {Endpoint} from 'butterfly-dag';
import $ from 'jquery';

class NewEndPoint extends Endpoint {
  constructor(opts) {
    super(opts);
    if (!this.options._isNodeSelf) {
      this.originId = (this.id || '').replace('-left', '').replace('-right', '');
    }
  }
  attachEvent() {
    $(this.dom).on('mousedown', (e) => {
      const LEFT_KEY = 0;
      if (e.button !== LEFT_KEY) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();


      // 点击中了上移/下移的按钮,需要阻止
      let classname = e.target.className || '';
      if (classname.indexOf('move-up') !== -1 || classname.indexOf('move-down') !== -1) {
        return;
      }

      if (this.options._isNodeSelf && this.type === 'target') {
        this.emit('custom.endpoint.dragNode', {
          data: this
        });
      } else {
        this.emit('InnerEvents', {
          type: 'endpoint:drag',
          data: this
        });
      }
    });

    if (this.options._isNodeSelf) {
      $(this.dom).on('mouseover', (e) => {
        this.emit('custom.endpoint.focus', {
          point: this
        });
      });
  
      $(this.dom).on('mouseout', (e) => {
        this.emit('custom.endpoint.unFocus', {
          point: this
        });
      });
    }
  }
}

export default NewEndPoint;
