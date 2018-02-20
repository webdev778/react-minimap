'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window2 = require('./Window');

var _Window3 = _interopRequireDefault(_Window2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MockWindow = function (_Window) {
  _inherits(MockWindow, _Window);

  function MockWindow(props) {
    _classCallCheck(this, MockWindow);

    var _this = _possibleConstructorReturn(this, (MockWindow.__proto__ || Object.getPrototypeOf(MockWindow)).call(this, props));

    _this.state.mounted = false;
    return _this;
  }

  _createClass(MockWindow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(MockWindow.prototype.__proto__ || Object.getPrototypeOf(MockWindow.prototype), 'componentDidMount', this).call(this);
      this.setState({ mounted: true });
    }
  }, {
    key: 'mountHook',
    value: function mountHook() {}
  }, {
    key: 'unmountHook',
    value: function unmountHook() {}
  }, {
    key: 'render',
    value: function render() {
      var mounted = this.state.mounted;

      var _props = this.props,
          children = _props.children,
          minimap = _props.minimap,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['children', 'minimap', 'className']);

      var windowClassName = 'react-minimap-contain ' + className;

      return _react2.default.createElement(
        'div',
        { style: { position: 'relative' }, className: windowClassName },
        _react2.default.createElement(
          'div',
          { className: 'react-minimap-window-wrapper' },
          _react2.default.createElement(
            'div',
            _extends({ ref: 'window' }, props, { className: 'react-minimap-window' }),
            children
          )
        ),
        mounted ? _react2.default.cloneElement(minimap, _extends({}, this.state, { window: this })) : null
      );
    }
  }, {
    key: 'window',
    get: function get() {
      return this.refs && this.refs.window ? this.refs.window : {};
    }
  }, {
    key: 'style',
    get: function get() {
      return this.refs && this.refs.window ? getComputedStyle(this.refs.window) : {};
    }
  }, {
    key: 'windowHeight',
    get: function get() {
      return this.refs && this.refs.window ? parseInt(this.style.getPropertyValue('height'), 10) : 1;
      // Dividing by 0 would cause an error.
    }
  }, {
    key: 'contentWidth',
    get: function get() {
      return this.refs && this.refs.window ? parseInt(this.style.getPropertyValue('width'), 10) : 1;
      // Dividing by 0 would cause an error.
    }
  }, {
    key: 'scrollHeight',
    get: function get() {
      return this.window.scrollHeight || 1;
      // Dividing by 0 would cause an error.
    }
  }, {
    key: 'scrollWidth',
    get: function get() {
      return this.window.scrollWidth || 1;
      // Dividing by 0 would cause an error.
    }
  }]);

  return MockWindow;
}(_Window3.default);

exports.default = MockWindow;
module.exports = exports['default'];