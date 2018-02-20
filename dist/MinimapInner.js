'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MinimapInner = function (_Component) {
  _inherits(MinimapInner, _Component);

  function MinimapInner(props) {
    _classCallCheck(this, MinimapInner);

    var _this = _possibleConstructorReturn(this, (MinimapInner.__proto__ || Object.getPrototypeOf(MinimapInner)).call(this, props));

    _this.state = {
      scroll: _this.props.window.scroll
    };

    _this.onOverlayClick = _this.onOverlayClick.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.onDrag = _this.onDrag.bind(_this);
    _this.onDragEnd = _this.onDragEnd.bind(_this);

    _this.onScroll = _this.onScroll.bind(_this);

    props.window.setScrollCallback(_this.onScroll);
    return _this;
  }

  _createClass(MinimapInner, [{
    key: 'onScroll',
    value: function onScroll(scroll) {
      this.setState({ scroll: scroll });
    }
  }, {
    key: 'onOverlayClick',
    value: function onOverlayClick(e) {
      e.preventDefault();
      e.stopPropagation();

      this._scrollTo(e.clientY - this.minimapTop - this.props.thumbHeight / 2);
    }
  }, {
    key: '_scrollTo',
    value: function _scrollTo(y) {
      this.props.window.scroll = {
        left: this.state.scroll.left,
        top: y ? y / this.scaleFactor : 0
      };
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(e) {
      e.preventDefault();
      e.stopPropagation();

      this._yPosInThumb = e.clientY - this.thumbTop;

      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('mouseup', this.onDragEnd);
    }
  }, {
    key: 'onDrag',
    value: function onDrag(e) {
      e.preventDefault();
      e.stopPropagation();

      var windowHeight = this.props.windowHeight;


      this._scrollTo(e.clientY - this.minimapTop - this._yPosInThumb);
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd(e) {
      e.preventDefault();
      e.stopPropagation();

      this._yPosInThumb = null;

      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.onDragEnd);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      props.window.setScrollCallback(this.onScroll);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.props.window.window.addEventListener('scroll', this.onScroll);

      this.refs.overlay.addEventListener('mousedown', this.onOverlayClick);
      this.refs.thumb.addEventListener('mousedown', this.onDragStart);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // this.props.window.window.removeEventListener('scroll', this.onScroll);

      this.refs.overlay.removeEventListener('mousedown', this.onOverlayClick);
      this.refs.thumb.removeEventListener('mousedown', this.onDragStart);
    }
  }, {
    key: 'render',
    value: function render() {
      var content = this.props.content;


      var mirror = _react2.default.createElement(
        'div',
        { className: 'react-minimap-content' },
        _react2.default.createElement(
          'div',
          { style: this.mirrorStyle },
          content
        )
      );

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'react-minimap-scrollbar', style: this.scrollbarStyle },
          mirror,
          _react2.default.createElement('div', { ref: 'overlay', style: this.overlayStyle })
        ),
        _react2.default.createElement(
          'div',
          { ref: 'thumb', className: 'react-minimap-thumb', style: this.thumbStyle },
          mirror
        )
      );
    }
  }, {
    key: 'minimapTop',
    get: function get() {
      return this.refs.overlay.getBoundingClientRect().top;
    }
  }, {
    key: 'thumbTop',
    get: function get() {
      return this.refs.thumb.getBoundingClientRect().top;
    }
  }, {
    key: 'scaleFactor',
    get: function get() {
      return this.props.scaleFactor;
    }
  }, {
    key: 'yOffset',
    get: function get() {
      var _props = this.props,
          height = _props.height,
          scrollbarHeight = _props.scrollbarHeight,
          thumbHeight = _props.thumbHeight;
      var scroll = this.state.scroll;


      if (scrollbarHeight > height) {
        var y = scroll.top * this.scaleFactor;

        var ch = scrollbarHeight - thumbHeight;

        var maxMargin = ch - height;

        var factor = y / ch;

        var viewportFactor = thumbHeight / ch;

        return factor * maxMargin + viewportFactor * y;
      }
      return 0;
    }
  }, {
    key: 'scrollbarStyle',
    get: function get() {
      var _props2 = this.props,
          width = _props2.width,
          scrollbarHeight = _props2.scrollbarHeight;


      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: scrollbarHeight,
        transform: 'translate3d(' + 0 + 'px, ' + -this.yOffset + 'px, 0)',
        transformOrigin: '0 0'
      };
    }
  }, {
    key: 'mirrorStyle',
    get: function get() {
      var _props3 = this.props,
          windowHeight = _props3.windowHeight,
          contentWidth = _props3.contentWidth;


      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: contentWidth,
        height: windowHeight,
        transform: 'scale3d(' + this.scaleFactor + ', ' + this.scaleFactor + ', 1)',
        transformOrigin: '0 0',
        overflow: 'visible'
      };
    }
  }, {
    key: 'thumbStyle',
    get: function get() {
      var _props4 = this.props,
          thumbHeight = _props4.thumbHeight,
          thumbWidth = _props4.thumbWidth;
      var scroll = this.state.scroll;


      var x = scroll.left * this.scaleFactor;
      var y = scroll.top * this.scaleFactor - this.yOffset;

      return {
        position: 'absolute',
        overflow: 'visible',
        top: 0,
        left: 0,
        width: thumbWidth,
        height: thumbHeight,
        transform: 'translate3d(' + x + 'px, ' + y + 'px, 0)'
      };
    }
  }, {
    key: 'overlayStyle',
    get: function get() {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
      };
    }
  }]);

  return MinimapInner;
}(_react.Component);

exports.default = MinimapInner;
module.exports = exports['default'];