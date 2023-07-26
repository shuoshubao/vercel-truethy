(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) =>
    function __require() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
  var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === 'object') || typeof from === 'function') {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: () => from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
          });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, 'default', { value: mod, enumerable: true }) : target,
      mod
    )
  );

  // external-global-plugin:react
  var require_react = __commonJS({
    'external-global-plugin:react'(exports, module) {
      module.exports = window.React;
    }
  });

  // external-global-plugin:react-dom
  var require_react_dom = __commonJS({
    'external-global-plugin:react-dom'(exports, module) {
      module.exports = window.ReactDOM;
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    'node_modules/react-dom/client.js'(exports) {
      'use strict';
      var m = require_react_dom();
      if (false) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function (c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function (c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // external-global-plugin:antd
  var require_antd = __commonJS({
    'external-global-plugin:antd'(exports, module) {
      module.exports = window.antd;
    }
  });

  // external-global-plugin:lodash
  var require_lodash = __commonJS({
    'external-global-plugin:lodash'(exports, module) {
      module.exports = window._;
    }
  });

  // src/index.jsx
  var import_react2 = __toESM(require_react());
  var import_client = __toESM(require_client());

  // src/views/index.jsx
  var import_react = __toESM(require_react());
  var import_antd = __toESM(require_antd());
  var import_lodash = __toESM(require_lodash());
  var ColorsMap = {
    GET: '#0f6ab4',
    POST: '#10a54a',
    PUT: '#c5862b',
    DELETE: '#a41e22',
    PATCH: '#D38042'
  };
  var columns = [
    {
      title: 'Method',
      dataIndex: 'method',
      render(value) {
        const Method = value.toUpperCase();
        return /* @__PURE__ */ import_react.default.createElement(
          import_antd.Tag,
          { color: ColorsMap[Method] },
          Method
        );
      }
    },
    {
      title: 'Url',
      dataIndex: 'url'
    }
  ];
  var views_default = props => {
    const RouterList = props.RouterList ?? (0, import_lodash.get)(window, 'globalData.RouterList');
    return /* @__PURE__ */ import_react.default.createElement(
      import_antd.Card,
      { title: 'API' },
      /* @__PURE__ */ import_react.default.createElement(import_antd.Table, {
        rowKey: 'url',
        columns,
        dataSource: RouterList
      })
    );
  };

  // src/index.jsx
  (0, import_client.hydrateRoot)(
    document.querySelector('#app'),
    /* @__PURE__ */ import_react2.default.createElement(views_default, null)
  );
})();
