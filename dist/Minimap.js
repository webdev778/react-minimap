'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('./Window');

var _Window2 = _interopRequireDefault(_Window);

var _MockWindow = require('./MockWindow');

var _MockWindow2 = _interopRequireDefault(_MockWindow);

var _MinimapWrapper = require('./MinimapWrapper');

var _MinimapWrapper2 = _interopRequireDefault(_MinimapWrapper);

var _MinimapInner = require('./MinimapInner');

var _MinimapInner2 = _interopRequireDefault(_MinimapInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Minimap = function (_Component) {
  _inherits(Minimap, _Component);

  function Minimap() {
    _classCallCheck(this, Minimap);

    return _possibleConstructorReturn(this, (Minimap.__proto__ || Object.getPrototypeOf(Minimap)).apply(this, arguments));
  }

  _createClass(Minimap, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          contain = _props.contain,
          props = _objectWithoutProperties(_props, ['children', 'className', 'contain']);

      var Window_ = !contain ? _Window2.default : _MockWindow2.default;

      var minimap = _react2.default.createElement(
        _MinimapWrapper2.default,
        props,
        _react2.default.createElement(_MinimapInner2.default, { content: children })
      );

      return _react2.default.createElement(
        Window_,
        { minimap: minimap, className: className },
        children
      );
    }
  }]);

  return Minimap;
}(_react.Component);

exports.default = Minimap;
module.exports = exports['default'];