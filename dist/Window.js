'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var body = document.body;
var html = document.documentElement;

function stateMapper(obj) {
  return {
    contentWidth: obj.contentWidth,
    windowHeight: obj.windowHeight,
    scrollWidth: obj.scrollWidth,
    scrollHeight: obj.scrollHeight
  };
}

var Window = function (_Component) {
  _inherits(Window, _Component);

  function Window(props) {
    _classCallCheck(this, Window);

    var _this = _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).call(this, props));

    _this.state = stateMapper(_this);

    _this.onResize = _this.onResize.bind(_this);
    _this.onScroll = _this.onScroll.bind(_this);

    _this._scrollCallback = function () {};
    return _this;
  }

  _createClass(Window, [{
    key: 'onScroll',
    value: function onScroll() {
      this._scrollCallback(this.scroll);
    }
  }, {
    key: 'setScrollCallback',
    value: function setScrollCallback(fn) {
      this._scrollCallback = fn;
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      this.setState(stateMapper(this));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.onResize();
      window.addEventListener('resize', this.onResize);
      this.window.addEventListener('scroll', this.onScroll);
      this.mountHook();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
      this.window.removeEventListener('scroll', this.onScroll);
      this.unmountHook();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var oldState = stateMapper(this.state);
      var newState = stateMapper(this);

      if (JSON.stringify(oldState) !== JSON.stringify(newState)) {
        this.setState(newState);
      }
    }
  }, {
    key: 'mountHook',
    value: function mountHook() {
      body.className += body.className.split(' ').concat('has-minimap').join('');
    }
  }, {
    key: 'unmountHook',
    value: function unmountHook() {
      body.className = body.className.replace('has-minimap', '');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          minimap = _props.minimap,
          props = _objectWithoutProperties(_props, ['children', 'minimap']);

      return _react2.default.createElement(
        'div',
        props,
        children,
        _react2.default.cloneElement(minimap, _extends({}, this.state, { window: this }))
      );
    }
  }, {
    key: 'window',
    get: function get() {
      return window;
    }
  }, {
    key: 'windowHeight',
    get: function get() {
      return this.window.innerHeight;
    }
  }, {
    key: 'contentWidth',
    get: function get() {
      return parseInt(getComputedStyle(body).getPropertyValue('width'));
    }
  }, {
    key: 'scrollHeight',
    get: function get() {
      return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    }
  }, {
    key: 'scrollWidth',
    get: function get() {
      return Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
    }
  }, {
    key: 'scroll',
    get: function get() {
      return {
        top: this.window.scrollTop || this.window.pageYOffset || html.scrollTop,
        left: this.window.scrollLeft || this.window.pageXOffset || html.scrollLeft
      };
    },
    set: function set(_ref) {
      var left = _ref.left,
          top = _ref.top;

      this.window.scroll(left, top);
    }
  }]);

  return Window;
}(_react.Component);

exports.default = Window;
module.exports = exports['default'];