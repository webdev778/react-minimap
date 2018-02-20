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

var MinimapWrapper = function (_Component) {
  _inherits(MinimapWrapper, _Component);

  function MinimapWrapper(props) {
    _classCallCheck(this, MinimapWrapper);

    var _this = _possibleConstructorReturn(this, (MinimapWrapper.__proto__ || Object.getPrototypeOf(MinimapWrapper)).call(this, props));

    _this.state = {
      mounted: false,
      width: null,
      height: null
    };
    return _this;
  }

  _createClass(MinimapWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.measure(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var old = this.props;

      // Remeasure if window size or document size has changed:
      var shouldRemeasure = props.contentWidth !== old.contentWidth || props.windowHeight !== old.windowHeight || props.scrollWidth !== old.scrollWidth || props.scrollHeight !== old.scrollHeight;

      if (shouldRemeasure) {
        this.measure(props);
      }
    }
  }, {
    key: 'measure',
    value: function measure(props) {
      var contentWidth = props.contentWidth,
          windowHeight = props.windowHeight,
          scrollWidth = props.scrollWidth,
          scrollHeight = props.scrollHeight;


      var wrapperStyle = getComputedStyle(this.refs.wrapper);

      var state = {
        mounted: true,
        width: parseInt(wrapperStyle.getPropertyValue('width'), 10),
        height: parseInt(wrapperStyle.getPropertyValue('height'), 10)
      };

      state.scaleFactor = state.width / contentWidth;

      state.thumbWidth = state.scaleFactor * contentWidth;
      state.thumbHeight = state.scaleFactor * windowHeight;

      state.scrollbarWidth = state.scaleFactor * scrollWidth;
      state.scrollbarHeight = state.scaleFactor * scrollHeight;

      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          mounted = _state.mounted,
          state = _objectWithoutProperties(_state, ['mounted']);

      var props = _extends({}, state, this.props);

      var wrapperStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      };

      return _react2.default.createElement(
        'div',
        { className: 'react-minimap' },
        _react2.default.createElement(
          'div',
          { ref: 'wrapper', style: wrapperStyle },
          mounted ? _react2.default.cloneElement(this.props.children, props) : null
        )
      );
    }
  }]);

  return MinimapWrapper;
}(_react.Component);

exports.default = MinimapWrapper;
module.exports = exports['default'];