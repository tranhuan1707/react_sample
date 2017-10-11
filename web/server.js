require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 229);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(165);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Card_Item.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Card_Item.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(206);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(207);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = postUserResult;
/* harmony export (immutable) */ __webpack_exports__["b"] = getLearnResult;
/* harmony export (immutable) */ __webpack_exports__["d"] = saveProgress;
/* harmony export (immutable) */ __webpack_exports__["a"] = countAnswer;
/* unused harmony export resetCard */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__history__ = __webpack_require__(10);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * LESSON ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */







// Action Get LESSON
function postUserResult(params, url) {

    return (() => {
        var _ref = _asyncToGenerator(function* (dispatch, getState, { client }) {
            dispatch({
                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["s" /* RESULT_POST_START */]
            });

            try {
                let urlParam = __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["a" /* ENGTOWN_API */].urlUserResult;

                /*if(params && params.user_id) {
                    urlParam  += '?user_id=' + params.user_id;
                }*/

                if (params && params.access_token) {
                    urlParam += '?access_token=' + params.access_token;
                }
                var qs = __webpack_require__(49);
                let objParams = qs.stringify({
                    learn_result: JSON.stringify(params.learn_result),
                    user_id: params.user_id
                });

                const request = __WEBPACK_IMPORTED_MODULE_2_axios___default()({
                    method: 'post',
                    url: urlParam,
                    data: objParams,
                    // withCredentials: false,
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((() => {
                    var _ref2 = _asyncToGenerator(function* (response) {
                        if (response) {
                            //console.log('usernameLogin', usernameLogin);
                            if (response.data.code == 200) {
                                __WEBPACK_IMPORTED_MODULE_4__history__["a" /* default */].push(url);
                            }

                            dispatch({
                                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["t" /* RESULT_POST_SUCCESS */],
                                payload: response.data
                            });
                        }
                    });

                    return function (_x4) {
                        return _ref2.apply(this, arguments);
                    };
                })()).catch(function (error) {
                    dispatch({
                        type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["u" /* RESULT_POST_FAILURE */],
                        payload: {
                            error
                        }
                    });
                });
                // TODO save token
            } catch (error) {
                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["u" /* RESULT_POST_FAILURE */],
                    payload: {
                        error
                    }
                });
                return false;
            }
            return true;
        });

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    })();
}

function getLearnResult(level, lessonId) {
    let userResult = JSON.parse(localStorage.getItem('userResult'));
    let learn_result = null;
    if (userResult) {
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let learnResultIdx = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.findIndex(userResult, { 'lessonId': lessonId, 'levelId': level, 'courseId': userInfo.course_id });
        if (learnResultIdx > -1) {
            learn_result = userResult[learnResultIdx];
        }
    }
    return learn_result;
}

// save studying progress to localStorage

function saveProgress(level, lessonId, cardId, cardItem_id, card_result) {
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
    let userResult = JSON.parse(localStorage.getItem('userResult'));
    if (!userResult) {
        userResult = new Array();
    }

    let learnResultIdx = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.findIndex(userResult, { 'lessonId': lessonId, 'levelId': level, 'courseId': userInfo.course_id });
    if (learnResultIdx > -1) {
        let cardIdx = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.findIndex(userResult[learnResultIdx].cards, { 'id': cardId });
        if (cardIdx > -1) {
            let cardItemIdx = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.findIndex(userResult[learnResultIdx].cards[cardIdx].cardItems, { 'id': cardItem_id });
            if (cardItemIdx == -1) {
                let cardItem = {};
                cardItem.id = cardItem_id;
                cardItem.learned = 1;

                // is quiz
                if (card_result > -1) {
                    cardItem.result = card_result;
                }

                userResult[learnResultIdx].cards[cardIdx].cardItems.push(cardItem);
            } else {
                if (card_result > -1) {
                    userResult[learnResultIdx].cards[cardIdx].cardItems[cardItemIdx].result = card_result;
                }
            }
            //console.log(userResult);
        } else {
            // insert card
            let card = {};
            card.id = cardId;
            card.cardItems = new Array();
            let cardItem = {};
            cardItem.id = cardItem_id;
            cardItem.learned = 1;

            // is quiz
            if (card_result > -1) {
                cardItem.result = card_result;
            }

            card.cardItems.push(cardItem);

            userResult[learnResultIdx].cards.push(card);
        }
    } else {
        let learn_result = {};
        learn_result.lessonId = lessonId;
        learn_result.levelId = level;
        learn_result.courseId = userInfo.course_id;
        learn_result.cards = new Array();
        let card = {};
        card.id = cardId;
        card.cardItems = new Array();
        let cardItem = {};
        cardItem.id = cardItem_id;
        cardItem.learned = 1;

        // is quiz
        if (card_result > -1) {
            cardItem.result = card_result;
        }

        card.cardItems.push(cardItem);
        learn_result.cards.push(card);

        userResult.push(learn_result);
    }

    localStorage.setItem('userResult', JSON.stringify(userResult));
}

function countAnswer(level, lessonId, cardId, result) {
    let userResult = JSON.parse(localStorage.getItem('userResult'));
    let numberCorrectAnswer = 0;
    if (userResult) {
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let learnResultIdx = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.findIndex(userResult, { 'lessonId': lessonId, 'levelId': level, 'courseId': userInfo.course_id });
        if (learnResultIdx > -1) {
            let cardIdx = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.findIndex(userResult[learnResultIdx].cards, { 'id': cardId });
            if (cardIdx > -1) {
                let cardItems = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.filter(userResult[learnResultIdx].cards[cardIdx].cardItems, { 'result': result });
                numberCorrectAnswer = cardItems.length;
            }
        }
    }
    return numberCorrectAnswer;
}

function resetCard(level, lessonId, cardId) {
    let userResult = JSON.parse(localStorage.getItem('userResult'));
    if (userResult) {
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let learnResultIdx = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.findIndex(userResult, { 'lessonId': lessonId, 'levelId': level, 'courseId': userInfo.course_id });
        if (learnResultIdx > -1) {
            let cardIdx = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.findIndex(userResult[learnResultIdx].cards, { 'id': cardId });
            if (cardIdx > -1) {
                userResult[learnResultIdx].cards[cardIdx].cardItems = new Array();
                localStorage.setItem('userResult', JSON.stringify(userResult));
            }
        }
    }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleClick = event => {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      if (event.defaultPrevented === true) {
        return;
      }

      event.preventDefault();
      __WEBPACK_IMPORTED_MODULE_2__history__["a" /* default */].push(this.props.to);
    }, _temp;
  }

  render() {
    const _props = this.props,
          { to, children } = _props,
          props = _objectWithoutProperties(_props, ['to', 'children']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'a',
      _extends({ href: to }, props, { onClick: this.handleClick }),
      children
    );
  }
}

Link.defaultProps = {
  onClick: null
};
/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// LOGIN
const LOGIN_START = 'LOGIN_START';
/* harmony export (immutable) */ __webpack_exports__["g"] = LOGIN_START;

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["h"] = LOGIN_SUCCESS;

const LOGIN_FAILURE = 'LOGIN_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["i"] = LOGIN_FAILURE;

const RESET_LOGIN = 'RESET_LOGIN';
/* unused harmony export RESET_LOGIN */


// LOGOUT
const LOGOUT_START = 'LOGOUT_START';
/* harmony export (immutable) */ __webpack_exports__["j"] = LOGOUT_START;

const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["l"] = LOGOUT_SUCCESS;

const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["k"] = LOGOUT_FAILURE;


// COURSE
const COURSE_START = 'COURSE_START';
/* harmony export (immutable) */ __webpack_exports__["a"] = COURSE_START;

const COURSE_SUCCESS = 'COURSE_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["b"] = COURSE_SUCCESS;

const COURSE_FAILURE = 'COURSE_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["c"] = COURSE_FAILURE;


// LESSONS
const LESSONS_START = 'LESSONS_START';
/* harmony export (immutable) */ __webpack_exports__["y"] = LESSONS_START;

const LESSONS_SUCCESS = 'LESSONS_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["z"] = LESSONS_SUCCESS;

const LESSONS_FAILURE = 'LESSONS_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["A"] = LESSONS_FAILURE;


// LESSON
const LESSON_START = 'LESSON_START';
/* harmony export (immutable) */ __webpack_exports__["p"] = LESSON_START;

const LESSON_SUCCESS = 'LESSON_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["q"] = LESSON_SUCCESS;

const LESSON_FAILURE = 'LESSON_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["r"] = LESSON_FAILURE;


// PROFILE
const PROFILE_START = 'PROFILE_START';
/* harmony export (immutable) */ __webpack_exports__["m"] = PROFILE_START;

const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["n"] = PROFILE_SUCCESS;

const PROFILE_FAILURE = 'PROFILE_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["o"] = PROFILE_FAILURE;


// LEVEL
const LEVEL_START = 'LEVEL_START';
/* harmony export (immutable) */ __webpack_exports__["d"] = LEVEL_START;

const LEVEL_SUCCESS = 'LEVEL_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["e"] = LEVEL_SUCCESS;

const LEVEL_FAILURE = 'LEVEL_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["f"] = LEVEL_FAILURE;


// LEVEL MOBILE
const LEVEL_MB_START = 'LEVEL_MB_START';
/* harmony export (immutable) */ __webpack_exports__["v"] = LEVEL_MB_START;

const LEVEL_MB_SUCCESS = 'LEVEL_MB_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["w"] = LEVEL_MB_SUCCESS;

const LEVEL_MB_FAILURE = 'LEVEL_MB_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["x"] = LEVEL_MB_FAILURE;


// RESULT
const RESULT_POST_START = 'RESULT_POST_START';
/* harmony export (immutable) */ __webpack_exports__["s"] = RESULT_POST_START;

const RESULT_POST_SUCCESS = 'RESULT_POST_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["t"] = RESULT_POST_SUCCESS;

const RESULT_POST_FAILURE = 'RESULT_POST_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["u"] = RESULT_POST_FAILURE;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_video_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__ = __webpack_require__(18);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import helper


class AudioPlayer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.audioInit();
    }

    audioInit() {
        // instantiate video.js
        let _thisComp = this.props;

        this.player = __WEBPACK_IMPORTED_MODULE_4_video_js___default()(this.nodePlayer, {
            autoplay: true,
            controls: true,
            sources: [{
                src: this.props.srcVideo,
                type: 'audio/mp3'
            }]
        }, function onPlayerReady() {
            // console.log('onPlayerReady', this)

            // autoplay on mobile

            if (__WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__["a" /* isMobile */].any()) {
                setTimeout(() => {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').click();
                }, 200);
            }

            // set start and end video
            if (_thisComp.timeVideo) {
                let timeVideo = _thisComp.timeVideo;

                // start time
                this.currentTime(timeVideo[0]);

                // end time
                this.on('timeupdate', function () {

                    if (this.currentTime() >= timeVideo[1] - 0.5) {
                        let _timeout = (timeVideo[1] - this.currentTime()) * 1000 - 50;
                        let _thisPlayer = this;

                        setTimeout(() => {
                            _thisPlayer.currentTime(timeVideo[0]);
                            _thisPlayer.pause();

                            // change icon
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                        }, _timeout);
                    }
                });
            }

            // change icon
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');

            let _this = this;
            // click play
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').on('click', function (e) {
                _this.play();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
            });
            // click stop
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').on('click', function (e) {
                _this.pause();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
            });

            //finished video
            this.on('ended', function () {

                // change icon
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');

                // update props
                if (_thisComp.hideVideo) {
                    _thisComp.hideVideo();
                }
            });
        });
    }
    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return _jsx('div', {
            'data-vjs-player': true
        }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { ref: n => this.nodePlayer = n, className: 'video-js vjs-default-skin audio-js' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(AudioPlayer));

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
/* harmony default export */ __webpack_exports__["a"] = (false && __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default()());

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 1. explode array
 * 2. shuffleArray
 * 3. get postion in array
 * 4. findArrayVal
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  // 1. explode array
  explode(delimiter, string, limit) {
    //  discuss at: http://locutus.io/php/explode/
    // original by: Kevin van Zonneveld (http://kvz.io)
    //   example 1: explode(' ', 'Kevin van Zonneveld')
    //   returns 1: [ 'Kevin', 'van', 'Zonneveld' ]
    if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') {
      return null;
    }
    if (delimiter === '' || delimiter === false || delimiter === null) {
      return false;
    }
    if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string === 'object') {
      return {
        0: ''
      };
    }
    if (delimiter === true) {
      delimiter = '1';
    }
    // Here we go...
    delimiter += '';
    string += '';
    var s = string.split(delimiter);
    if (typeof limit === 'undefined') return s;
    // Support for limit
    if (limit === 0) limit = 1;
    // Positive limit
    if (limit > 0) {
      if (limit >= s.length) {
        return s;
      }
      return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)]);
    }
    // Negative limit
    if (-limit >= s.length) {
      return [];
    }
    s.splice(s.length + limit);
    return s;
  },

  // 2. shuffleArray
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },

  // 3. get postion in array
  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  },

  // 4. findArrayVal
  findArrayVal(arr, val) {
    if (!arr.length) {
      return;
    }
    let re = -1;
    arr.map((value, i) => {
      if (value == val) {
        re = i;
        return re;
      }
    });
    return re;
  }
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-dnd");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Site Var
 */
//export const API_ROOT = 'http://englishtown-dev.foxsite.net/';
const API_ROOT = 'http://englishtown.foxsite.net/';
/* unused harmony export API_ROOT */

const API_VERSION = 'v1/';
/* unused harmony export API_VERSION */

const MODE = {
    json: 'json',
    jsonp: 'jsonp'
};
/* unused harmony export MODE */

const ENGTOWN_API = {
    urlLogin: API_ROOT + API_VERSION + 'user/login',
    urlCourse: API_ROOT + API_VERSION + 'course',
    urlLessons: API_ROOT + API_VERSION + 'lesson',
    urlSubLesson: API_ROOT + API_VERSION + 'card',
    urlLesson: API_ROOT + API_VERSION + 'card/items',
    urlProfile: API_ROOT + API_VERSION + 'user/get-data',
    urlLevel: API_ROOT + API_VERSION + 'level',
    urlUserResult: API_ROOT + API_VERSION + 'user/learn-result'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = ENGTOWN_API;


// INFORMATION CLIENT
const CLIENT_ID = 'android';
/* harmony export (immutable) */ __webpack_exports__["b"] = CLIENT_ID;

const CLIENT_SECRET = '3813cddd52cf7e0ff93a0b904d559462';
/* harmony export (immutable) */ __webpack_exports__["c"] = CLIENT_SECRET;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('user_access', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('user_access') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('user_access');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('user_access');
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Auth);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * # Checks whether running on a mobile device according to browser data.
 * Functions (each returns bool):
 * * Android
 * * BlackBerry
 * * iPhone
 * * iPod
 * * iPad
 * * iOS
 * * Opera
 * * Windows
 * * Kindle Fire
 * * any
 * @example
 * ```js
 * isMobile.Android() => true/false
 * isMobile.iOS() => true/false
 * isMobile.any() => true/false
 * isMobile.KindleFire() => true/false
 * isMobile.BlackBerry() => true/false
 * ```
 */

const isMobile = {
    getUserAgent: () => {
        return navigator.userAgent;
    },
    Android: function () {
        return (/Android/i.test(isMobile.getUserAgent()) && !isMobile.Windows()
        );
    },
    BlackBerry: function () {
        return (/BlackBerry|BB10|PlayBook/i.test(isMobile.getUserAgent())
        );;
    },
    iPhone: function () {
        return (/iPhone/i.test(isMobile.getUserAgent()) && !isMobile.iPad() && !isMobile.Windows()
        );
    },
    iPod: function () {
        return (/iPod/i.test(isMobile.getUserAgent())
        );
    },
    iPad: function () {
        return (/iPad/i.test(isMobile.getUserAgent())
        );
    },
    iOS: function () {
        return isMobile.iPad() || isMobile.iPod() || isMobile.iPhone();
    },
    Opera: function () {
        return (/Opera Mini/i.test(isMobile.getUserAgent())
        );
    },
    Windows: function () {
        return (/Windows Phone|IEMobile|WPDesktop/i.test(isMobile.getUserAgent())
        );
    },
    KindleFire: function () {
        return (/Kindle Fire|Silk|KFAPWA|KFSOWI|KFJWA|KFJWI|KFAPWI|KFAPWI|KFOT|KFTT|KFTHWI|KFTHWA|KFASWI|KFTBWI|KFMEWI|KFFOWI|KFSAWA|KFSAWI|KFARWI/i.test(isMobile.getUserAgent())
        );
    },
    any: function () {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = isMobile;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("video.js");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  CARDWORD: 'cardword',
  NOTDRAG: 'notdrag'
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

if (false) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID },

  // Authentication
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'React Starter Kit',
      expires: 60 * 60 * 24 * 180 },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  }
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const sequelize = new __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a(__WEBPACK_IMPORTED_MODULE_1__config___default.a.databaseUrl, {
  define: {
    freezeTableName: true
  }
});

/* harmony default export */ __webpack_exports__["a"] = (sequelize);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("react/lib/update");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = postLogin;
/* harmony export (immutable) */ __webpack_exports__["a"] = logoutUser;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logout_graphql__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logout_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__logout_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_graphql__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__login_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_modules_Auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_axios__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * LOGOUT ACTION
 * MinhNguyen WP
 * Created on 06.2017
 * --------
 * 1. Action Login
 * 2. Action Logout
 */







// 1. Action Login
function postLogin(params) {

    return (() => {
        var _ref = _asyncToGenerator(function* (dispatch, getState, { client }) {
            dispatch({
                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["g" /* LOGIN_START */]
            });

            try {
                var qs = __webpack_require__(49);
                let urlParam = __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["a" /* ENGTOWN_API */].urlLogin;
                let objParams = qs.stringify({
                    email: params.lemail,
                    password: params.password,
                    client_id: __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["b" /* CLIENT_ID */],
                    client_secret: __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["c" /* CLIENT_SECRET */]
                });
                let username = params.lemail,
                    password = params.password;

                const request = __WEBPACK_IMPORTED_MODULE_5_axios___default()({
                    method: 'post',
                    url: urlParam,
                    data: objParams,
                    // withCredentials: false,
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((() => {
                    var _ref2 = _asyncToGenerator(function* (response) {
                        if (response) {
                            //console.log('usernameLogin', usernameLogin);
                            if (response.data.code == 200) {

                                __WEBPACK_IMPORTED_MODULE_4__routes_modules_Auth__["a" /* default */].authenticateUser(response.data.data.access_token);
                                //let tokenLogin = ;
                                //console.log('tokenLogin', response.data.data.access_token);
                                const { data } = yield client.networkInterface.query({
                                    query: __WEBPACK_IMPORTED_MODULE_3__login_graphql___default.a,
                                    variables: {
                                        username,
                                        password: response.data.data.access_token
                                    }
                                });

                                // console.log('data', data);
                            }

                            dispatch({
                                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["h" /* LOGIN_SUCCESS */],
                                payload: response.data
                            });
                        }
                    });

                    return function (_x4) {
                        return _ref2.apply(this, arguments);
                    };
                })()).catch(function (error) {
                    dispatch({
                        type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["i" /* LOGIN_FAILURE */],
                        payload: {
                            error
                        }
                    });
                });
                // TODO save token
            } catch (error) {
                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["i" /* LOGIN_FAILURE */],
                    payload: {
                        error
                    }
                });
                return false;
            }
            return true;
        });

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    })();
}

// 2. Action Logout
function logoutUser() {
    return (() => {
        var _ref3 = _asyncToGenerator(function* (dispatch, getState, { client }) {
            try {
                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["j" /* LOGOUT_START */],
                    payload: {
                        user: null
                    }
                });

                const { data, errors } = yield client.networkInterface.query({ query: __WEBPACK_IMPORTED_MODULE_2__logout_graphql___default.a });

                if (errors) {
                    dispatch({
                        type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["k" /* LOGOUT_FAILURE */],
                        payload: {
                            errors
                        }
                    });

                    return false;
                }

                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["l" /* LOGOUT_SUCCESS */],
                    payload: {
                        user: data
                    }
                });
            } catch (error) {
                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["k" /* LOGOUT_FAILURE */],
                    payload: {
                        errors: [error]
                    }
                });

                return false;
            }

            return true;
        });

        return function (_x5, _x6, _x7) {
            return _ref3.apply(this, arguments);
        };
    })();
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_normalize_css__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layout_css__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layout_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Layout_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Header__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Sidebar__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Footer__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CourseMobile__ = __webpack_require__(60);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





// external-global styles must be imported in your JS.







var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_6__Sidebar__["a" /* default */], {});

var _ref2 = _jsx(__WEBPACK_IMPORTED_MODULE_7__Footer__["a" /* default */], {});

function Layout(props) {
  return _jsx('div', {
    className: props.layoutPr ? props.layoutPr : ''
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_5__Header__["a" /* default */], {
    lesson_level: props.lesson_level
  }), _jsx('div', {
    className: 'wrapper'
  }, void 0, _ref, _jsx('div', {
    className: 'main'
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_8__CourseMobile__["a" /* default */], {
    lesson_level: props.lesson_level
  }), props.children, _ref2)));
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3_normalize_css___default.a, __WEBPACK_IMPORTED_MODULE_4__Layout_css___default.a)(Layout));

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_video_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__ = __webpack_require__(18);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import helper


class RoleplayVideoPlayer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.videoInit();
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playerTime && nextProps.playerTime !== null) {

            if (nextProps.stopVideo !== true) {
                let time_start = nextProps.playerTime.time_start;
                this.player.endTime = nextProps.playerTime.time_end ? nextProps.playerTime.time_end : this.player.duration();

                // start time
                this.player.currentTime(time_start);
                this.player.play();

                // change icon
                $('#' + this.props.videoId + '.vd-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.videoId + '.vd-play .saudio-play.stop').css('display', 'inline-block');
            }
        }
    }

    videoInit() {
        // instantiate video.js
        let _thisComp = this.props;

        this.player = __WEBPACK_IMPORTED_MODULE_4_video_js___default()(this.videoNode, {
            autoplay: true,
            controls: true,
            sources: [{
                src: this.props.srcVideo,
                type: 'video/mp4'
            }]
        }, function onPlayerReady() {
            // console.log('onPlayerReady', this)

            // autoplay on mobile
            if (__WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__["a" /* isMobile */].any()) {
                setTimeout(() => {
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').click();
                }, 200);
            }

            // end time
            this.endTime = 0;
            this.senIdx = 0;

            // * Watch Duration of Media Playing.
            this.on('timeupdate', function () {
                if (this.endTime === 0) {
                    //console.log('Chay 0', this.senIdx );
                    if (this.senIdx < _thisComp.sentencesList.length) {

                        // if(this.senIdx > (_thisComp.countSentence + 1)) { 
                        //     this.pause();
                        //     this.endTime = 0;
                        //     this.senIdx = 0;
                        //     this.currentTime(0);

                        //     $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                        //     $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');

                        //     // icon pause for role 2
                        //     if($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                        //         $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                        //     }

                        //     if(_thisComp.hideVideo) {
                        //         _thisComp.hideVideo();
                        //     }

                        //     return;
                        // }

                        // console.log('Chay 0', _thisComp.sentencesList[this.senIdx].time_start);
                        if (this.currentTime() >= _thisComp.sentencesList[this.senIdx].time_start) {
                            _thisComp.onStartPlay(this.senIdx);
                            this.senIdx++;
                        }
                    }
                    return;
                }

                if (this.currentTime() >= this.endTime) {
                    this.pause();
                    this.endTime = 0;
                    this.senIdx = 0;
                    // change icon
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                    // icon pause for role 2
                    if ($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                        $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                    }
                    if (_thisComp.resetStatus) {
                        _thisComp.resetStatus();
                    }
                }
            });

            // set start and end video
            if (_thisComp.timeVideo) {
                let timeVideo = _thisComp.timeVideo;

                // start time
                this.currentTime(timeVideo[0]);

                // end time
                this.on('timeupdate', function () {
                    if (this.currentTime() > timeVideo[1]) {
                        this.pause();

                        // set time
                        this.currentTime(timeVideo[0]);
                        // change icon
                        $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                        $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                        // icon pause for role 2
                        if ($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                            $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                        }
                    }
                });
            }

            // change icon
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'none');
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'inline-block');
            // icon pause for role 2
            if ($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'inline-block');
            }

            let _this = this;
            // click play
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').on('click', function (e) {
                _this.play();
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'inline-block');
                }
            });
            // click stop
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').on('click', function (e) {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                }
                _thisComp.resetStatus();
            });

            // click pause
            if ($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').on('click', function (e) {
                    _this.pause();

                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                    // icon pause for role 2
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                });
            }

            //finished video
            this.on('ended', function () {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                // change icon
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');

                // update props
                if (_thisComp.hideVideo) {
                    _thisComp.hideVideo();
                }
            });
        });
    }

    render() {
        const { poster } = this.props;

        return _jsx('div', {
            'data-vjs-player': true
        }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('video', { poster: poster, ref: node => this.videoNode = node, className: 'video-js vjs-default-skin' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(RoleplayVideoPlayer));

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const UserType = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: 'User',
  fields: {
    id: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLID"]) },
    email: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
    username: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    token: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (UserType);

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getProfile;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * PROFILE ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */





// Action Get PROFILE
function getProfile(params) {

    return (() => {
        var _ref = _asyncToGenerator(function* (dispatch, getState) {
            dispatch({
                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["m" /* PROFILE_START */]
            });

            try {
                let urlParam = __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["a" /* ENGTOWN_API */].urlProfile;
                // debugger
                urlParam += '?user_id=24';

                if (params && params.token) {
                    urlParam += '&access_token=' + params.token;
                }

                const request = __WEBPACK_IMPORTED_MODULE_2_axios___default()({
                    method: 'get',
                    url: urlParam
                }).then((() => {
                    var _ref2 = _asyncToGenerator(function* (response) {
                        if (response) {
                            dispatch({
                                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["n" /* PROFILE_SUCCESS */],
                                payload: response.data
                            });
                        }
                    });

                    return function (_x3) {
                        return _ref2.apply(this, arguments);
                    };
                })()).catch(function (error) {
                    dispatch({
                        type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["o" /* PROFILE_FAILURE */],
                        payload: {
                            error
                        }
                    });
                });
                // TODO save token
            } catch (error) {
                dispatch({
                    type: LESSON_FAILURE,
                    payload: {
                        error
                    }
                });
                return false;
            }
            return true;
        });

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })();
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Footer_css__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Footer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Footer_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(7);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






var _ref = _jsx('span', {}, void 0, '2017 \xA9 English Town. All Rights Reserved.');

class Footer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem('user_access')) {
            this.setState({ authenticated: true });
        }
    }

    render() {
        const { authenticated } = this.state;
        return _jsx('footer', {
            className: 'footer t-c'
        }, void 0, authenticated && _ref);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a)(Footer));

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Header_css__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Header_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Header_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Navigation__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Profile__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MenuMobile__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Course__ = __webpack_require__(61);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* global $ */







// import component




/* jQ FrontEnd Fn --- */
// Click hide logo & leftsidebar
function hideLogoAndLeftSb() {
  //if(!$('.mn-close').length) { return; }
  // console.log($('.mn-close'));
  $('.header').on('click', '.mn-close', e => {
    console.log($('.mn-close'));
    e.preventDefault();

    let $a_click = $('.mn-close'),
        $logo = $('.logo'),
        $logo_wrap = $a_click.closest('.logo-wrap'),
        $header_menu = $logo_wrap.siblings('.header-inner'),
        $header = $a_click.closest('.header'),
        $sidebar_wrap = $header.siblings('.wrapper');

    if ($a_click.hasClass('active')) {
      $a_click.removeClass('active');
      $logo.show();
      $logo_wrap.removeClass('off');
      $header_menu.removeClass('add');

      // sidebar
      $sidebar_wrap.removeClass('lsbar-closed');
      setTimeout(function (e) {
        $('.sidebar-nav > ul > li > a').find('.title').show();
      }, 300);
    } else {
      $a_click.addClass('active');
      $logo.hide();
      $logo_wrap.addClass('off');
      $header_menu.addClass('add');

      // sidebar
      $sidebar_wrap.addClass('lsbar-closed');
      $('.sidebar-nav > ul > li > a').find('.title').hide();
    }
  });
}

/* MAIN CLASS */

var _ref = _jsx('div', {
  className: 'logo-wrap'
}, void 0, _jsx('span', {
  className: 'mn-close'
}, void 0, _jsx('i', {
  className: 'fa fa-bars'
})), _jsx(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
  className: 'logo',
  to: "/"
}, void 0, _jsx('img', {
  src: '/images/logo-full.png',
  alt: 'English Town'
})));

var _ref2 = _jsx('div', {
  className: 'header-top clearfix'
}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_6__Profile__["a" /* default */], {}), _jsx(__WEBPACK_IMPORTED_MODULE_7__MenuMobile__["a" /* default */], {}));

class Header extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);

    this.state = {
      authenticated: true,
      hasProfile: true
    };
  }

  componentDidMount() {
    hideLogoAndLeftSb();
    this.setState({
      hasProfile: JSON.parse(localStorage.getItem('infoProfile')) === null ? false : true
    });
  }

  render() {
    const { authenticated, userLevel } = this.state;
    return _jsx('div', {
      className: 'header'
    }, void 0, authenticated && _jsx('div', {
      className: 'header-wrap'
    }, void 0, _ref, _jsx('div', {
      className: 'header-inner'
    }, void 0, _ref2, ' ', _jsx(__WEBPACK_IMPORTED_MODULE_8__Course__["a" /* default */], {
      lesson_level: this.props.lesson_level
    }), ' ')));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Header_css___default.a)(Header));

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_normalize_css__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LayoutLogin_css__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LayoutLogin_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__LayoutLogin_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Header__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Sidebar__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Footer__ = __webpack_require__(33);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






// external-global styles must be imported in your JS.






function LayoutLogin(props) {
  return _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_5__LayoutLogin_css___default.a.root,
    style: { 'backgroundImage': 'url(images/logo-background.png)' }
  }, void 0, _jsx('div', {
    className: 'wrapper'
  }, void 0, _jsx('section', {
    className: 'main'
  }, void 0, props.children)));
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4_normalize_css___default.a, __WEBPACK_IMPORTED_MODULE_5__LayoutLogin_css___default.a)(LayoutLogin));

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VideoPlayer_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__ = __webpack_require__(9);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import component



var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play stop'
});

var _ref4 = _jsx('img', {
    src: '/images/poster.jpg',
    alt: ''
});

var _ref5 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref6 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

class HintVideo extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            hideHint: false
        };
    }

    // fucntion click show video & reset answer
    clickShowHint() {
        if (this.state.hideHint == false) {
            this.setState({
                hideHint: true
            });
        } else {
            this.setState({
                hideHint: false
            });
        }
    }

    render() {
        const { timeVideo, srcVideo, hasVideo, cardItmData } = this.props;
        const { hideHint } = this.state;

        return _jsx('div', {}, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.hideHint
        }, void 0, _jsx('span', {
            onClick: e => this.clickShowHint(),
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.hintTitle
        }, void 0, hideHint === false ? 'Click here to get hint' : 'Hide Hint'), _jsx('i', {
            className: "fa " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.hintIcon + ' ' + (hideHint === false ? 'fa-angle-down ' : '') + (hideHint === true ? 'fa-angle-up ' : '')
        })), hideHint === true && _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.hintAnswer
        }, void 0, _ref, hasVideo === true && _jsx('div', {}, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__VideoPlayer_js__["a" /* default */], {
            videoId: 'hint-video-player-' + cardItmData.id,
            timeVideo: timeVideo,
            poster: '/images/poster.jpg',
            srcVideo: srcVideo
        })), _jsx('div', {
            id: 'hint-video-player-' + cardItmData.id,
            className: 'hint-box sword-ct vd-play'
        }, void 0, _ref2, _ref3)), hasVideo === false && _jsx('div', {}, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, _ref4, _jsx(__WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__["a" /* default */], {
            audioId: 'hint-audio-player-' + cardItmData.id,
            timeVideo: timeVideo,
            srcVideo: srcVideo
        })), _jsx('div', {
            id: 'hint-audio-player-' + cardItmData.id,
            className: "aud-play hint-box " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.lword
        }, void 0, _ref5, _ref6, _jsx('div', {
            className: "sword-ct " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.new_word
        })))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(HintVideo));

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_mic__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_mic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_mic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_IsMobile__ = __webpack_require__(18);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import helper


class RoleplayAudioRecord extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(props) {
    super(props);

    this.startRecording = () => {
      // show button submit
      $('.submit-button').find('.btn').removeClass('disabled');

      // turn on sound
      this.setState({ enableSound: true });

      if (__WEBPACK_IMPORTED_MODULE_4__helper_IsMobile__["a" /* isMobile */].any()) {
        var vid = document.getElementById('record-audio');
        vid.play();
      }

      if (this.state.record === false) {
        this.setState({
          record: true,
          audioPlayer: false
        });
      } else {
        this.setState({
          record: false,
          audioPlayer: true
        });
      }

      let _timeout = (this.props.time_end - this.props.time_start) * 1000;
      //console.log('_timeout', _timeout);
      let _this = this;
      setTimeout(function () {
        _this.onStop.bind(_this);

        _this.setState({
          record: false,
          audioPlayer: true,
          enableSound: false
        });
      }, _timeout);
    };

    this.state = {
      record: false,
      audioPlayer: false,
      enableSound: null
    };
  }

  onStop(blobObject) {
    // console.log('blobObject', blobObject);
    this.setState({
      blobURL: blobObject.blobURL,
      enableSound: false
    });
    this.props.onSaveRecord(blobObject.blobURL);
  }

  onStartR() {
    console.log('start');
  }

  render() {
    const { record, audioPlayer } = this.state;
    const { id, dataSentence } = this.props;

    return _jsx('div', {
      className: 'text-left role_record_wrap clearfix'
    }, void 0, _jsx('span', {
      onClick: this.startRecording,
      className: __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default.a.record_phone + ' ' + __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default.a.role_record_phone + ' record_phone role_record_phone ' + (record === true ? __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default.a.recording + ' recording' : '')
    }, void 0, _jsx('i', {
      className: "fa " + (record === false ? 'fa-microphone' : 'fa-stop')
    })), _jsx('span', {
      className: __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default.a.record_txt + ' record_txt'
    }, void 0, 'Record your own version'), audioPlayer && _jsx('div', {
      className: 'result_audio'
    }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: id, ref: 'audioSource', controls: 'controls', src: this.state.blobURL })), _jsx(__WEBPACK_IMPORTED_MODULE_3_react_mic__["ReactMic"], {
      record: this.state.record,
      className: 'sound-wave',
      onStop: this.onStop.bind(this),
      onStart: this.onStartR.bind(this),
      strokeColor: '#000000',
      backgroundColor: '#FF4081'
    }, id), this.state.enableSound === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
      autoPlay: true,
      ref: 'audioRecord',
      controls: 'controls',
      className: 'hidden',
      src: '/uploads/audio/record.mp3' }), this.state.enableSound === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-true',
      autoPlay: true,
      id: 'record-audio',
      ref: 'audioRecord',
      controls: 'controls',
      className: 'hidden',
      src: '/uploads/audio/record.mp3' }));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default.a)(RoleplayAudioRecord));

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_video_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__ = __webpack_require__(18);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import helper


class VideoPlayer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.videoInit();
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    videoInit() {
        // instantiate video.js
        let _thisComp = this.props;

        this.player = __WEBPACK_IMPORTED_MODULE_4_video_js___default()(this.videoNode, {
            autoplay: true,
            controls: true,
            sources: [{
                src: this.props.srcVideo,
                type: 'video/mp4'
            }]
        }, function onPlayerReady() {
            // console.log('onPlayerReady', this)

            // autoplay on mobile
            if (__WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__["a" /* isMobile */].any()) {
                setTimeout(() => {
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').click();
                }, 200);
            }

            // set start and end video
            if (_thisComp.timeVideo) {
                let timeVideo = _thisComp.timeVideo;

                // start time
                this.currentTime(timeVideo[0]);

                // end time
                this.on('timeupdate', function () {
                    if (this.currentTime() >= timeVideo[1] - 0.5) {
                        let _timeout = (timeVideo[1] - this.currentTime()) * 1000 - 50;
                        let _thisPlayer = this;
                        setTimeout(() => {
                            _thisPlayer.currentTime(timeVideo[0]);
                            _thisPlayer.pause();

                            // change icon
                            $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                            $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                        }, _timeout);
                    }
                });
            }

            // change icon
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'none');
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'inline-block');

            let _this = this;
            // click play
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').on('click', function (e) {
                _this.play();
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'inline-block');
            });
            // click stop
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').on('click', function (e) {
                _this.pause();
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
            });

            //finished video
            this.on('ended', function () {
                // change icon
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');

                // update props
                if (_thisComp.hideVideo) {
                    _thisComp.hideVideo();
                }
            });
        });
    }

    render() {
        const { poster } = this.props;

        return _jsx('div', {
            'data-vjs-player': true
        }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('video', { poster: poster, ref: node => this.videoNode = node, className: 'video-js vjs-default-skin' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(VideoPlayer));

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sidebar_css__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sidebar_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Sidebar_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SubMenu__ = __webpack_require__(40);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/** MinhNguyenWP Team
 * created on : 05.2017
  */
/* global $, jQuery */





// Import Component


// 6. jQ: Click submenu Left sidebar
function submenuSidebar(_this) {

  $('.has-sub-menu > a').on('click', e => {
    e.preventDefault();
    var $parent = $(e.target).closest('li');
    if ($parent.hasClass('open')) {
      $parent.removeClass('open');
    } else {
      $parent.addClass('open');
    }
  });
}

var _ref = _jsx('div', {
  className: 'sidebar-nav'
}, void 0, _jsx('ul', {}, void 0, _jsx('li', {
  className: 'open active'
}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
  to: "/"
}, void 0, _jsx('i', {
  className: 'fa fa-home'
}), _jsx('span', {
  className: 'title'
}, void 0, 'Home'))), _jsx('li', {
  className: 'has-sub-menu'
}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
  to: '#smenu1'
}, void 0, _jsx('i', {
  className: 'fa fa-cog'
}), _jsx('span', {
  className: 'title'
}, void 0, 'Courses'), _jsx('span', {
  className: 'arrow'
}, void 0, _jsx('i', {
  className: 'fa fa-angle-up'
}), _jsx('i', {
  className: 'fa fa-angle-down'
}))), _jsx(__WEBPACK_IMPORTED_MODULE_4__SubMenu__["a" /* default */], {})), _jsx('li', {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
  to: "/"
}, void 0, _jsx('i', {
  className: 'fa fa-list'
}), _jsx('span', {
  className: 'title'
}, void 0, 'Result')))));

class Sidebar extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true
    };
  }

  componentDidMount() {
    submenuSidebar(this);
  }

  render() {
    const { authenticated } = this.state;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'left-sidebar', ref: 'leftMenu' },
      authenticated && _ref
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Sidebar_css___default.a)(Sidebar));

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SubMenu_css__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SubMenu_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__SubMenu_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_course__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__routes_modules_Auth__ = __webpack_require__(16);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* global $ */





// Redux






class SubMenu extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  componentDidMount() {
    let token = __WEBPACK_IMPORTED_MODULE_8__routes_modules_Auth__["a" /* default */].getToken();
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
    let params = {};
    params.token = token;
    params.user_id = userInfo.id;

    this.props.getCourse(params);
  }

  render() {
    const { course } = this.props;

    return _jsx('ul', {
      id: 'smenu1',
      className: 'sub-menu'
    }, void 0, course && course.data && course.data.items.map((item, i) => {
      return _jsx('li', {}, i + 1, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
        to: '/'
      }, void 0, _jsx('span', {
        className: 'title'
      }, void 0, item.name)));
    }));
  }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { course } = state.course;

  return {
    course
  };
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    getCourse: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_7__actions_course__["a" /* getCourse */], dispatch)
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__SubMenu_css___default.a)(SubMenu)));

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable import/prefer-default-export */

const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
/* harmony export (immutable) */ __webpack_exports__["a"] = SET_RUNTIME_VARIABLE;


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sequelize__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UserLogin__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UserClaim__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UserProfile__ = __webpack_require__(121);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__User__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__UserLogin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__UserClaim__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__UserProfile__["a"]; });
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */







__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasMany(__WEBPACK_IMPORTED_MODULE_2__UserLogin__["a" /* default */], {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasMany(__WEBPACK_IMPORTED_MODULE_3__UserClaim__["a" /* default */], {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasOne(__WEBPACK_IMPORTED_MODULE_4__UserProfile__["a" /* default */], {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return __WEBPACK_IMPORTED_MODULE_0__sequelize__["a" /* default */].sync(...args);
}

/* harmony default export */ __webpack_exports__["a"] = ({ sync });


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




/* harmony default export */ __webpack_exports__["a"] = ({
    getSubLesson(params, successCB, errorCB) {
        let urlParam = __WEBPACK_IMPORTED_MODULE_0__constant_Site__["a" /* ENGTOWN_API */].urlSubLesson;

        if (params && params.lesson_id) {
            urlParam += '?lesson_id=' + params.lesson_id;
        }

        if (params && params.user_id) {
            urlParam += '&user_id=' + params.user_id;
        }

        if (params && params.token) {
            urlParam += '&access_token=' + params.token;
        }

        const request = __WEBPACK_IMPORTED_MODULE_1_axios___default()({
            method: 'get',
            url: urlParam
        }).then((() => {
            var _ref = _asyncToGenerator(function* (response) {
                if (response) {
                    if (typeof successCB === 'function') {
                        successCB(response.data);
                    }
                }
            });

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        })()).catch(error => {
            errorCB(error);
        });
    }
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(170);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Lesson_Item.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Lesson_Item.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(177);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./ErrorPage.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./ErrorPage.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(180);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../css-loader/index.js??ref--2-1!./normalize.css", function() {
        content = require("!!../css-loader/index.js??ref--2-1!./normalize.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("react-mic");

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_jwt__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_express_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_graphql__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_express_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jsonwebtoken__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom_server__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pretty_error__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pretty_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pretty_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_App__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_Html__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__routes_error_ErrorPage__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__routes_error_ErrorPage_css__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__routes_error_ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__routes_error_ErrorPage_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__createFetch__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__passport__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__router__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__data_models__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__data_schema__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__assets_json__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__assets_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__assets_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__store_configureStore__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__actions_runtime__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__config__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__server_middlewares__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_react_apollo__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__core_createApolloClient__ = __webpack_require__(115);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




















 // eslint-disable-line import/no-unresolved








// App -
const app = __WEBPACK_IMPORTED_MODULE_1_express___default()();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'public')));
app.use(__WEBPACK_IMPORTED_MODULE_2_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(__WEBPACK_IMPORTED_MODULE_4_express_jwt___default()({
  secret: __WEBPACK_IMPORTED_MODULE_22__config___default.a.auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token
}));
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof __WEBPACK_IMPORTED_MODULE_4_express_jwt__["UnauthorizedError"]) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

app.use(__WEBPACK_IMPORTED_MODULE_15__passport__["a" /* default */].initialize());

if (false) {
  app.enable('trust proxy');
}
app.get('/login/facebook', __WEBPACK_IMPORTED_MODULE_15__passport__["a" /* default */].authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
app.get('/login/facebook/return', __WEBPACK_IMPORTED_MODULE_15__passport__["a" /* default */].authenticate('facebook', { failureRedirect: '/login', session: false }), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = __WEBPACK_IMPORTED_MODULE_6_jsonwebtoken___default.a.sign(req.user, __WEBPACK_IMPORTED_MODULE_22__config___default.a.auth.jwt.secret, { expiresIn });
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  res.redirect('/');
});

//
// Register API middleware
// -----------------------------------------------------------------------------
const graphqlMiddleware = __WEBPACK_IMPORTED_MODULE_5_express_graphql___default()(req => ({
  schema: __WEBPACK_IMPORTED_MODULE_18__data_schema__["a" /* default */],
  graphiql: false,
  rootValue: { request: req },
  pretty: false
}));

app.use('/graphql', graphqlMiddleware);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', __WEBPACK_IMPORTED_MODULE_23__server_middlewares__["a" /* default */], (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const css = new Set();

      const apolloClient = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_25__core_createApolloClient__["a" /* default */])({
        schema: __WEBPACK_IMPORTED_MODULE_18__data_schema__["a" /* default */],
        rootValue: { request: req }
      });
      // console.log('req.user ', req.user );
      const fetch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__createFetch__["a" /* default */])({
        baseUrl: __WEBPACK_IMPORTED_MODULE_22__config___default.a.api.serverUrl,
        cookie: req.headers.cookie,
        apolloClient
      });

      const initialState = {
        user: req.user || null
      };

      const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_20__store_configureStore__["a" /* default */])(initialState, {
        fetch,
        apolloClient
      });

      store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_21__actions_runtime__["a" /* setRuntimeVariable */])({
        name: 'initialNow',
        value: Date.now()
      }));

      // Global (context) variables that can be easily accessed from any React component
      // https://facebook.github.io/react/docs/context.html
      const context = {
        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        insertCss: function (...styles) {
          // eslint-disable-next-line no-underscore-dangle
          styles.forEach(function (style) {
            return css.add(style._getCss());
          });
        },
        fetch,
        // You can access redux through react-redux connect
        store,
        storeSubscription: null,
        // Apollo Client for use with react-apollo
        client: apolloClient
      };

      const route = yield __WEBPACK_IMPORTED_MODULE_16__router__["a" /* default */].resolve(_extends({}, context, {
        path: req.path,
        query: req.query
      }));

      if (route.redirect) {
        res.redirect(route.status || 302, route.redirect);
        return;
      }

      const data = _extends({}, route);
      data.children = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_24_react_apollo__["renderToStringWithData"])(_jsx(__WEBPACK_IMPORTED_MODULE_10__components_App__["a" /* default */], {
        context: context,
        store: store
      }, void 0, route.component));
      // data.children = ReactDOM.renderToString(
      //   <App context={context} store={store}>
      //     {route.component}
      //   </App>,
      // );
      data.styles = [{ id: 'css', cssText: [...css].join('') }];
      data.scripts = [__WEBPACK_IMPORTED_MODULE_19__assets_json___default.a.vendor.js, __WEBPACK_IMPORTED_MODULE_19__assets_json___default.a.client.js];
      if (__WEBPACK_IMPORTED_MODULE_19__assets_json___default.a[route.chunk]) {
        data.scripts.push(__WEBPACK_IMPORTED_MODULE_19__assets_json___default.a[route.chunk].js);
      }
      data.app = {
        apiUrl: __WEBPACK_IMPORTED_MODULE_22__config___default.a.api.clientUrl,
        state: context.store.getState()
      };

      const html = __WEBPACK_IMPORTED_MODULE_8_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__components_Html__["a" /* default */], data));
      res.status(route.status || 200);
      res.send(`<!doctype html>${html}`);
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new __WEBPACK_IMPORTED_MODULE_9_pretty_error___default.a();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  console.error(pe.render(err));
  const html = __WEBPACK_IMPORTED_MODULE_8_react_dom_server___default.a.renderToStaticMarkup(_jsx(__WEBPACK_IMPORTED_MODULE_11__components_Html__["a" /* default */], {
    title: 'Internal Server Error',
    description: err.message,
    styles: [{ id: 'css', cssText: __WEBPACK_IMPORTED_MODULE_13__routes_error_ErrorPage_css___default.a._getCss() }]
  }, void 0, __WEBPACK_IMPORTED_MODULE_8_react_dom_server___default.a.renderToString(_jsx(__WEBPACK_IMPORTED_MODULE_12__routes_error_ErrorPage__["a" /* ErrorPageWithoutStyle */], {
    error: err
  }))));
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
__WEBPACK_IMPORTED_MODULE_17__data_models__["a" /* default */].sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(__WEBPACK_IMPORTED_MODULE_22__config___default.a.port, () => {
    console.info(`The server is running at http://localhost:${__WEBPACK_IMPORTED_MODULE_22__config___default.a.port}/`);
  });
});

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getCourse;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * COURSE ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */





// Action Get Course
function getCourse(params) {

    return (() => {
        var _ref = _asyncToGenerator(function* (dispatch, getState) {
            dispatch({
                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["a" /* COURSE_START */]
            });

            try {
                let urlParam = __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["a" /* ENGTOWN_API */].urlCourse;

                if (params && params.token) {
                    urlParam += '?access_token=' + params.token;
                }
                if (params && params.user_id) {
                    urlParam += '&user_id=' + params.user_id;
                }

                const request = __WEBPACK_IMPORTED_MODULE_2_axios___default()({
                    method: 'get',
                    url: urlParam
                }).then((() => {
                    var _ref2 = _asyncToGenerator(function* (response) {
                        if (response) {
                            dispatch({
                                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["b" /* COURSE_SUCCESS */],
                                payload: response.data
                            });
                        }
                    });

                    return function (_x3) {
                        return _ref2.apply(this, arguments);
                    };
                })()).catch(function (error) {
                    dispatch({
                        type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["c" /* COURSE_FAILURE */],
                        payload: {
                            error
                        }
                    });
                });
                // TODO save token
            } catch (error) {
                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["c" /* COURSE_FAILURE */],
                    payload: {
                        error
                    }
                });
                return false;
            }
            return true;
        });

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })();
}

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getLesson;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * LESSON ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */





// Action Get LESSON
function getLesson(params) {

    return (() => {
        var _ref = _asyncToGenerator(function* (dispatch, getState) {
            dispatch({
                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["p" /* LESSON_START */]
            });

            try {
                let urlParam = __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["a" /* ENGTOWN_API */].urlLesson;

                if (params && params.card_id) {
                    urlParam += '?card_id=' + params.card_id;
                }

                if (params && params.token) {
                    urlParam += '&access_token=' + params.token;
                }

                const request = __WEBPACK_IMPORTED_MODULE_2_axios___default()({
                    method: 'get',
                    url: urlParam
                }).then((() => {
                    var _ref2 = _asyncToGenerator(function* (response) {
                        if (response) {
                            dispatch({
                                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["q" /* LESSON_SUCCESS */],
                                payload: response.data
                            });
                        }
                    });

                    return function (_x3) {
                        return _ref2.apply(this, arguments);
                    };
                })()).catch(function (error) {
                    dispatch({
                        type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["r" /* LESSON_FAILURE */],
                        payload: {
                            error
                        }
                    });
                });
                // TODO save token
            } catch (error) {
                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["r" /* LESSON_FAILURE */],
                    payload: {
                        error
                    }
                });
                return false;
            }
            return true;
        });

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })();
}

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getLessons;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * LESSONS ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */





// Action Get LESSONS
function getLessons(params) {

    return (() => {
        var _ref = _asyncToGenerator(function* (dispatch, getState) {
            dispatch({
                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["y" /* LESSONS_START */]
            });

            try {
                let urlParam = __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["a" /* ENGTOWN_API */].urlLessons;

                if (params && params.course_id) {
                    urlParam += '?course_id=' + params.course_id;
                }

                if (params && params.user_id) {
                    urlParam += '&user_id=' + params.user_id;
                }

                if (params && params.level) {
                    urlParam += '&level=' + params.level;
                }

                if (params && params.token) {
                    urlParam += '&access_token=' + params.token;
                }

                const request = __WEBPACK_IMPORTED_MODULE_2_axios___default()({
                    method: 'get',
                    url: urlParam
                }).then((() => {
                    var _ref2 = _asyncToGenerator(function* (response) {
                        if (response) {
                            dispatch({
                                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["z" /* LESSONS_SUCCESS */],
                                payload: response.data
                            });
                        }
                    });

                    return function (_x3) {
                        return _ref2.apply(this, arguments);
                    };
                })()).catch(function (error) {
                    dispatch({
                        type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["A" /* LESSONS_FAILURE */],
                        payload: {
                            error
                        }
                    });
                });
                // TODO save token
            } catch (error) {
                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["A" /* LESSONS_FAILURE */],
                    payload: {
                        error
                    }
                });
                return false;
            }
            return true;
        });

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })();
}

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getLevel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * LEVEL ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */





// 1. jQ: Slide Header nav
function slideHeaderNav(_this) {
    $('.h-nav-slide').slick({
        infinite: false,
        rows: 1,
        slidesToShow: 7,
        slidesToScroll: 1,
        prevArrow: '<a href="javascript:;" class="slick-prev slick-arrow"><i class="fa fa-angle-left"></i></a>',
        nextArrow: '<a href="javascript:;" class="slick-next slick-arrow"><i class="fa fa-angle-right"></i></a>'
    });
}

// Action Get Level
function getLevel(params) {

    return (() => {
        var _ref = _asyncToGenerator(function* (dispatch, getState) {
            dispatch({
                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["d" /* LEVEL_START */]
            });

            try {
                let urlParam = __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["a" /* ENGTOWN_API */].urlLevel;

                if (params && params.course_id) {
                    urlParam += '?course_id=' + params.course_id;
                }

                if (params && params.user_id) {
                    urlParam += '&user_id=' + params.user_id;
                }

                if (params && params.token) {
                    urlParam += '&access_token=' + params.token;
                }

                const request = __WEBPACK_IMPORTED_MODULE_2_axios___default()({
                    method: 'get',
                    url: urlParam
                }).then((() => {
                    var _ref2 = _asyncToGenerator(function* (response) {
                        if (response) {
                            dispatch({
                                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["e" /* LEVEL_SUCCESS */],
                                payload: response.data
                            });

                            // called js for menu nav
                            slideHeaderNav();

                            // set level
                            localStorage.setItem('levelCourse', JSON.stringify(response.data.data));
                        }
                    });

                    return function (_x3) {
                        return _ref2.apply(this, arguments);
                    };
                })()).catch(function (error) {
                    dispatch({
                        type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["f" /* LEVEL_FAILURE */],
                        payload: {
                            error
                        }
                    });
                });
                // TODO save token
            } catch (error) {
                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["f" /* LEVEL_FAILURE */],
                    payload: {
                        error
                    }
                });
                return false;
            }
            return true;
        });

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })();
}

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getLevelMobile;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * LEVEL ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */





// Action Get Level
function getLevelMobile(params) {

    return (() => {
        var _ref = _asyncToGenerator(function* (dispatch, getState) {
            dispatch({
                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["v" /* LEVEL_MB_START */]
            });

            try {
                let urlParam = __WEBPACK_IMPORTED_MODULE_0__helper_constant_Site__["a" /* ENGTOWN_API */].urlLevel;

                if (params && params.course_id) {
                    urlParam += '?course_id=' + params.course_id;
                }

                if (params && params.user_id) {
                    urlParam += '&user_id=' + params.user_id;
                }

                if (params && params.token) {
                    urlParam += '&access_token=' + params.token;
                }

                const request = __WEBPACK_IMPORTED_MODULE_2_axios___default()({
                    method: 'get',
                    url: urlParam
                }).then((() => {
                    var _ref2 = _asyncToGenerator(function* (response) {
                        if (response) {
                            dispatch({
                                type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["w" /* LEVEL_MB_SUCCESS */],
                                payload: response.data
                            });
                        }
                    });

                    return function (_x3) {
                        return _ref2.apply(this, arguments);
                    };
                })()).catch(function (error) {
                    dispatch({
                        type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["x" /* LEVEL_MB_FAILURE */],
                        payload: {
                            error
                        }
                    });
                });
                // TODO save token
            } catch (error) {
                dispatch({
                    type: __WEBPACK_IMPORTED_MODULE_1__helper_actionconst_actionTypes__["x" /* LEVEL_MB_FAILURE */],
                    payload: {
                        error
                    }
                });
                return false;
            }
            return true;
        });

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })();
}

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setRuntimeVariable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(41);
/* eslint-disable import/prefer-default-export */



function setRuntimeVariable({ name, value }) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* SET_RUNTIME_VARIABLE */],
    payload: {
      name,
      value
    }
  };
}

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dnd_html5_backend__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dnd_html5_backend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dnd_html5_backend__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





// DnD Lib



const ContextType = _extends({
  // Apollo Client
  client: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,

  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  // Universal HTTP client
  fetch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
}, __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"].childContextTypes);

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {

  getChildContext() {
    return this.props.context;
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children);
  }

}

App.childContextTypes = ContextType;
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react_dnd__["DragDropContext"])(__WEBPACK_IMPORTED_MODULE_4_react_dnd_html5_backend___default.a)(App));

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CourseMobile_css__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CourseMobile_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__CourseMobile_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_modules_Auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_levelMobile__ = __webpack_require__(57);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */









// Redux




class CourseMobile extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    // get level
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
    let token = __WEBPACK_IMPORTED_MODULE_4__routes_modules_Auth__["a" /* default */].getToken();

    let params = {};
    params.token = token;
    params.course_id = userInfo.course_id;
    params.user_id = userInfo.id;

    this.setState({ value: this.props.lesson_level ? this.props.lesson_level : userInfo.level });

    this.props.getLevelMobile(params);
  }

  componentWillReceiveProps(nextProps) {
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

    if (nextProps.lesson_level !== this.props.lesson_level) {
      if (nextProps.lesson_level !== this.props.lesson_level) {
        this.setState({ value: nextProps.lesson_level ? nextProps.lesson_level : userInfo.level });
      }
    }
  }

  change(event) {
    this.setState({ value: event.target.value });

    __WEBPACK_IMPORTED_MODULE_5__history__["a" /* default */].push('/lessons/' + event.target.value);
  }

  render() {
    const { levelMobile } = this.props;

    return _jsx('div', {
      className: 'mob-courses'
    }, void 0, _jsx('select', {
      name: 'mob-courses',
      onChange: this.change.bind(this),
      value: this.state.value,
      className: 'form-control mob-courses-sl'
    }, void 0, levelMobile && levelMobile.map((item, idx) => {
      return _jsx('option', {
        value: item.code
      }, idx + 1, item.name);
    })));
  }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { levelMobile } = state.levelMobile;

  return {
    levelMobile
  };
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    getLevelMobile: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_8__actions_levelMobile__["a" /* getLevelMobile */], dispatch)
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__CourseMobile_css___default.a)(CourseMobile)));

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Course_css__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Course_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Course_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_modules_Auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_level__ = __webpack_require__(56);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/** MinhNguyenWP Team
 * created on : 05.2017
  */
/* global $, jQuery */







// Redux




// 1. jQ: Slide Header nav
function slideHeaderNav(_this) {
  $('.h-nav-slide').slick({
    infinite: false,
    rows: 1,
    slidesToShow: 7,
    slidesToScroll: 1,
    prevArrow: '<a href="javascript:;" class="slick-prev slick-arrow"><i class="fa fa-angle-left"></i></a>',
    nextArrow: '<a href="javascript:;" class="slick-next slick-arrow"><i class="fa fa-angle-right"></i></a>'
  });
}

var _ref = _jsx('i', {
  className: 'fa fa-lock'
});

class Course extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      userCode: null
    }, _temp;
  }

  componentDidMount() {
    // get level
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
    let token = __WEBPACK_IMPORTED_MODULE_4__routes_modules_Auth__["a" /* default */].getToken();

    let params = {};
    params.token = token;
    params.course_id = userInfo.course_id;
    params.user_id = userInfo.id;

    // setState userCode
    this.setState({ userCode: this.props.lesson_level ? this.props.lesson_level : userInfo.level });

    this.props.getLevel(params);
  }

  componentWillReceiveProps(nextProps) {
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

    if (nextProps.lesson_level !== this.props.lesson_level) {
      this.setState({ userCode: nextProps.lesson_level ? nextProps.lesson_level : userInfo.level });
    }
  }

  render() {
    const { level } = this.props;
    const { userCode } = this.state;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'header-nav',
        ref: 'courseTab'
      },
      _jsx('ul', {
        className: 'h-nav-slide'
      }, void 0, level && level.map((item, idx) => {
        return _jsx('li', {
          className: item.active === 0 ? 'blocked' : ''
        }, idx + 1, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
          className: userCode !== null && userCode === item.code ? 'active' : '',
          to: "/lessons/" + item.code
        }, void 0, _jsx('span', {}, void 0, item.name, item.active === 0 && _ref)));
      }))
    );
  }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { level } = state.level;

  return {
    level
  };
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    getLevel: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_7__actions_level__["a" /* getLevel */], dispatch)
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Course_css___default.a)(Course)));

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MenuMobile_css__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MenuMobile_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__MenuMobile_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_user__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Sidebar_SubMenu__ = __webpack_require__(40);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* global $, jQuery */





// Redux




// Import Component


// 9. Menu mobile
function menuMob() {
    // if(!$('.mnav-btn').length) { return; }

    $('.mnav-btn').on('click', function (e) {
        e.preventDefault();
        var $parent = $('.mob-nav');
        if ($parent.hasClass('active')) {
            $('.mnav-ct').animate({
                opacity: 0
            }, 150, 'swing', function () {
                $parent.removeClass('active');
                $('body').removeClass('bodyover');
                $('.mnav-ct').css({ 'opacity': '' });
            });
        } else {
            $parent.addClass('active');
            $('body').addClass('bodyover');
        }
    });
}

function submenuSidebarMB(_this) {

    $('.mob-nav .has-sub-menu > a').on('click', e => {
        e.preventDefault();
        var $parent = $(this).closest('li');
        if ($parent.hasClass('open')) {
            $parent.removeClass('open');
        } else {
            $parent.addClass('open');
        }
    });
}

var _ref = _jsx('span', {
    className: 'mnav-btn'
}, void 0, _jsx('i', {
    className: 'fa fa-bars'
}), _jsx('i', {
    className: 'fa fa-times'
}));

var _ref2 = _jsx('li', {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
    to: "/"
}, void 0, _jsx('i', {
    className: 'fa fa-home'
}), 'Home'));

var _ref3 = _jsx('li', {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
    to: '/profile'
}, void 0, _jsx('i', {
    className: 'fa fa-user-o'
}), 'My profile'));

var _ref4 = _jsx('li', {
    className: 'has-sub-menu'
}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
    to: '#mnav1'
}, void 0, _jsx('i', {
    className: 'fa fa-cog'
}), 'Courses', _jsx('span', {
    className: 'arrow'
}, void 0, _jsx('i', {
    className: 'fa fa-angle-down'
}), _jsx('i', {
    className: 'fa fa-angle-up'
}))), _jsx('ul', {
    id: 'mnav1',
    className: 'sub-menu'
}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_8__Sidebar_SubMenu__["a" /* default */], {})));

var _ref5 = _jsx('li', {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
    to: "/"
}, void 0, _jsx('i', {
    className: 'fa fa-list'
}), 'Result'));

var _ref6 = _jsx('i', {
    className: 'fa fa-sign-out'
});

class MenuMobile extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    componentDidMount() {
        menuMob();
        submenuSidebarMB();
    }

    logoutUser() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const logoutUser = yield _this2.props.logoutUser();

            if (logoutUser) {
                localStorage.removeItem('user_access');
                __WEBPACK_IMPORTED_MODULE_4__history__["a" /* default */].push('/login');
            }
        })();
    }

    render() {

        return _jsx('div', {
            className: 'mob-nav f-r'
        }, void 0, _ref, _jsx('div', {
            className: 'mnav-ct'
        }, void 0, _jsx('ul', {}, void 0, _ref2, _ref3, _ref4, _ref5, _jsx('li', {}, void 0, _jsx('span', {
            className: __WEBPACK_IMPORTED_MODULE_2__MenuMobile_css___default.a.linkLogout,
            onClick: e => this.logoutUser(e)
        }, void 0, _ref6, 'Log out')))));
    }
}

//export default withStyles(s)(MenuMobile);

// Get return data, must register in reducer
function mapStateToProps(state) {
    const { user } = state.user;
    return {
        user
    };
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {

    return {
        logoutUser: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_7__actions_user__["a" /* logoutUser */], dispatch)
    };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__MenuMobile_css___default.a)(MenuMobile)));

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Profile_css__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Profile_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Profile_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_user__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_profile__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes_modules_Auth__ = __webpack_require__(16);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* global $ */





// Redux






/* jQ FrontEnd Fn --- */
// 3. Show Profile popup
function showPrf() {
    // if(!$('.user-nav').length) { return; }

    $('.user-nav').on('click', function (e) {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });

    $('.user-nav').on('clickoutside', function (e) {
        $(this).removeClass('active');
    });
}

var _ref = _jsx('li', {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], {
    to: '/profile'
}, void 0, _jsx('i', {
    className: 'fa fa-user-o'
}), 'My profile'));

var _ref2 = _jsx('i', {
    className: 'fa fa-sign-out'
});

class Profile extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileAvatar: '/images/no-avatar.png'
        };
    }

    componentDidMount() {
        showPrf();
        let token = __WEBPACK_IMPORTED_MODULE_9__routes_modules_Auth__["a" /* default */].getToken();

        let params = {};
        params.token = token;
        if (localStorage.getItem('infoProfile') && localStorage.getItem('infoProfile') != 'null') {
            this.setState({
                profileAvatar: !JSON.parse(localStorage.getItem('infoProfile')) ? './images/no-avatar.png' : JSON.parse(localStorage.getItem('infoProfile')).avatar
            });
        }
    }

    // logout user
    logoutUser() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const logoutUser = yield _this.props.logoutUser();

            if (logoutUser) {
                // sessionStorage.removeItem('user_access');
                localStorage.clear();
                __WEBPACK_IMPORTED_MODULE_4__history__["a" /* default */].push('/login');
            }
        })();
    }

    render() {
        return _jsx('div', {
            className: 'user-nav f-r'
        }, void 0, _jsx('div', {
            className: 'unav-profile'
        }, void 0, _jsx('figure', {
            style: { backgroundImage: `url("${this.state.profileAvatar}")` },
            className: 'unav-img'
        })), _jsx('ul', {
            className: 'dropdown-menu'
        }, void 0, _ref, _jsx('li', {}, void 0, _jsx('span', {
            className: __WEBPACK_IMPORTED_MODULE_2__Profile_css___default.a.linkLogout,
            onClick: e => this.logoutUser(e)
        }, void 0, _ref2, 'Log out'))));
    }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
    const { user } = state.user;
    const { profile } = state.profile;
    return {
        user,
        profile
    };
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
    return {
        logoutUser: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_7__actions_user__["a" /* logoutUser */], dispatch),
        getProfile: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_8__actions_profile__["a" /* getProfile */], dispatch)
    };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Profile_css___default.a)(Profile)));

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_serialize_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






/* eslint-disable react/no-danger */

var _ref = _jsx('meta', {
  charSet: 'utf-8'
});

var _ref2 = _jsx('meta', {
  httpEquiv: 'x-ua-compatible',
  content: 'ie=edge'
});

var _ref3 = _jsx('meta', {
  name: 'viewport',
  content: 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=0'
});

var _ref4 = _jsx('link', {
  href: 'https://fonts.googleapis.com/css?family=Nunito:400,700,700i,800',
  rel: 'stylesheet'
});

var _ref5 = _jsx('link', {
  rel: 'shortcut icon',
  href: '/icons/favicon.ico',
  type: 'image/x-icon'
});

var _ref6 = _jsx('link', {
  rel: 'stylesheet',
  href: '/css/style.css'
});

var _ref7 = _jsx('link', {
  rel: 'stylesheet',
  href: '/css/extra.css'
});

var _ref8 = _jsx('link', {
  rel: 'stylesheet',
  href: '/css/res.css'
});

var _ref9 = _jsx('script', {
  src: '/js/libs.js'
});

var _ref10 = _jsx('script', {
  src: '/js/plugins.js'
});

var _ref11 = _jsx('script', {
  src: '/js/start.js'
});

var _ref12 = _jsx('script', {
  src: 'https://www.google-analytics.com/analytics.js',
  async: true,
  defer: true
});

function Html(props) {
  const { title, description, styles, scripts, app, children } = props;
  // console.log('title', title);
  return _jsx('html', {
    className: 'no-js',
    lang: 'en'
  }, void 0, _jsx('head', {}, void 0, _ref, _ref2, _jsx('title', {}, void 0, title), _jsx('meta', {
    name: 'description',
    content: description
  }), _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, styles.map(style => _jsx('style', {
    id: style.id,
    dangerouslySetInnerHTML: { __html: style.cssText }
  }, style.id))), _jsx('body', {}, void 0, _jsx('div', {
    id: 'app',
    dangerouslySetInnerHTML: { __html: children }
  }), _ref9, _ref10, _ref11, _jsx('script', {
    dangerouslySetInnerHTML: { __html: `window.App=${__WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default()(app)}` }
  }), scripts.map(script => _jsx('script', {
    src: script
  }, script)), __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && _jsx('script', {
    dangerouslySetInnerHTML: { __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + `ga('create','${__WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId}','auto');ga('send','pageview')` }
  }), __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && _ref12));
}

Html.defaultProps = {
  styles: [],
  scripts: []
};


/* harmony default export */ __webpack_exports__["a"] = (Html);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Navigation_css__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Navigation_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(7);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */







function Navigation(props) {
  return _jsx('div', {
    className: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.root,
    role: 'navigation'
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
    className: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.link,
    to: '/about'
  }, void 0, 'About'), _jsx(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
    className: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.link,
    to: '/contact'
  }, void 0, 'Contact'), _jsx('span', {
    className: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.spacer
  }, void 0, ' | '), _jsx(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
    className: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.link,
    to: '/login'
  }, void 0, 'Log in'), _jsx('span', {
    className: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.spacer
  }, void 0, 'or'), _jsx(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
    className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.link, __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.highlight),
    to: '/register'
  }, void 0, 'Sign up'));
}

/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a)(Navigation));

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components__ = __webpack_require__(111);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();








// import component


var _ref = _jsx('i', {
    className: 'fa fa-arrow-right'
});

class Card_Item extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
        // console.log('props.lesson', props.lesson);
        this.state = {
            cardItmNum: 0,
            finishCard: false,
            reload: false
        };
    }

    changeCardItm() {
        const { cardItmNum } = this.state;
        const { lesson, cardItmData, lessonItemNum } = this.props;

        this.setState({
            cardItmNum: this.state.cardItmNum + 1,
            reload: true
        });

        // detroy tooltip
        if (cardItmNum + 1 > lesson.items.length - 1) {
            $('.ldtail-next').tooltip('destroy');
        }

        if (cardItmData.card.length === 1) {
            // finish card item
            if (cardItmNum + 1 === lesson.items.length) {
                this.setState({
                    finishCard: true
                });
            }
        } else {
            // check end card_item
            if (lessonItemNum + 1 < cardItmData.card.length) {

                // finish card item
                if (cardItmNum + 1 === lesson.items.length) {
                    let idCardNext = cardItmData.card[lessonItemNum + 1].id;

                    // redirect next item
                    __WEBPACK_IMPORTED_MODULE_5__history__["a" /* default */].push('/lesson/' + idCardNext + '/level/' + this.context.level + '/' + this.context.lessonId);
                    this.props.onClickGetCardItem(idCardNext, lessonItemNum + 1);
                }
            } else {
                // finish card item
                if (cardItmNum + 1 === lesson.items.length) {
                    this.setState({
                        finishCard: true
                    });
                }
            }
        }
    }

    stopReload() {
        this.setState({ reload: false });
    }

    render() {
        const { lesson, per, cardItmData, lesson_id } = this.props;
        const { cardItmNum, finishCard, reload } = this.state;

        return _jsx('div', {
            className: 'step-dtail tab-content'
        }, void 0, _jsx('div', {
            className: 'tab-pane step-pane active'
        }, void 0, lesson && lesson.items && lesson.items.length !== 0 && _jsx('div', {
            className: 'step-dtail tab-content'
        }, void 0, _jsx('div', {
            className: 'ldtail-next-wrap'
        }, void 0, lesson.items && finishCard === false && _jsx('span', {
            onClick: () => this.changeCardItm(),
            'data-title': 'Next',
            className: 'ldtail-arrow ldtail-next'
        }, void 0, _ref)), _jsx('div', {
            className: 'step-body'
        }, void 0, finishCard === false && _jsx('div', {
            className: 'lesson-progress'
        }, void 0, _jsx('div', {
            className: 'l-line'
        }, void 0, _jsx('div', {
            style: { 'width': per * (cardItmNum + 1) + '%' },
            className: 'lprog-bar'
        }))), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "L_VIDEO" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["a" /* VideoCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "type_1_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_VIDEO_QUESTION_ANSWER" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["b" /* ExVideoQACardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "type_2_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "L_WORD" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["c" /* WordCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "type_3_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "L_WORD_ONLY_EXAMPLE" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["d" /* WordOnlyCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "word_only_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "L_WORD_AND_EXAMPLE" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["e" /* WordExampleCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "word_example_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_CHOOSE_FILL_BLANK" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["f" /* FillChooseBlankCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "choose_blank_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_FILL_BLANK" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["g" /* FillBlankCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "fill_blank_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_CORRECT_BLANK" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["h" /* CorrectBlankCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "correct_blank_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_CORRECT_MEANING" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["i" /* CorrectMeaningCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "correct_meaning_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_RECORD" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["j" /* RecordCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "type_record_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "L_EXPRESSION" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["k" /* ExpressionCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "expression_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_LISTEN_CHOOSE_ANSWER" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["l" /* ExListenChooseAnswer */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "ex_listen_choose_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_REORDER_WORDS" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["m" /* ExReorderWord */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "ex_reorder_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "TEXT" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["n" /* TextCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "type_17_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "L_GRAMMAR" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["o" /* GrammarCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "grammar_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "L_GRAMMAR_LISTENING" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["p" /* GrammarListeningCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "grammar_listen_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_CHOOSE_CORRECT_ANSWER" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["q" /* ExChooseCorrectAnswer */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "grammar_correct_" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "L_CONVERSATION" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["r" /* LConversation */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "l_conversation" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_CONVERSATION_FILL_BLANK" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["s" /* ConversationFillBlank */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "converation_fill_blank" + cardItmNum), lesson.items[cardItmNum] && lesson.items[cardItmNum].type === "EX_ROLE_PLAY" && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["t" /* ExRoleplay */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            cardItmData: lesson.items[cardItmNum]
        }, "ex_roleplay" + cardItmNum), finishCard === true && _jsx(__WEBPACK_IMPORTED_MODULE_6__components__["u" /* FinishCardItem */], {
            cardId: this.props.cardId,
            lessonId: this.context.lessonId,
            level: this.context.level,
            lesson: lesson
        }))), lesson && lesson.items && lesson.items.length === 0 && _jsx('div', {}, void 0, _jsx('h3', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_css___default.a.nodata
        }, void 0, 'No Lesson'))));
    }
}

Card_Item.contextTypes = {
    level: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    lessonId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_css___default.a)(Card_Item));

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_video_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__ = __webpack_require__(18);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import helper


class AudioNoAutoplay extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.audioInit();
    }

    audioInit() {
        // instantiate video.js
        let _thisComp = this.props;

        this.player = __WEBPACK_IMPORTED_MODULE_4_video_js___default()(this.nodePlayer, {
            autoplay: false,
            controls: true,
            sources: [{
                src: this.props.srcVideo,
                type: 'audio/mp3'
            }]
        }, function onPlayerReady() {
            // console.log('onPlayerReady', this)

            // autoplay on mobile
            if (__WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__["a" /* isMobile */].any()) {
                setTimeout(() => {
                    $('#' + _thisComp.audioId + '.audno-play .saudio-play.stop').click();
                }, 200);
            }

            // set start and end video
            if (_thisComp.timeVideo) {
                let timeVideo = _thisComp.timeVideo;

                // start time
                this.currentTime(timeVideo[0]);

                // end time
                this.on('timeupdate', function () {
                    if (this.currentTime() > timeVideo[1]) {
                        this.pause();

                        // change icon
                        $('#' + _thisComp.audioId + '.audno-play .saudio-play.stop').css('display', 'none');
                        $('#' + _thisComp.audioId + '.audno-play .saudio-play.play').css('display', 'inline-block');
                    }
                });
            }

            // change icon
            $('#' + _thisComp.audioId + '.audno-play .saudio-play.play').css('display', 'inline-block');
            $('#' + _thisComp.audioId + '.audno-play .saudio-play.stop').css('display', 'none');

            let _this = this;
            // click play
            $('#' + _thisComp.audioId + '.audno-play .saudio-play.play').on('click', function (e) {
                _this.play();
                $('#' + _thisComp.audioId + '.audno-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.audioId + '.audno-play .saudio-play.stop').css('display', 'inline-block');
            });
            // click stop
            $('#' + _thisComp.audioId + '.audno-play .saudio-play.stop').on('click', function (e) {
                _this.pause();
                $('#' + _thisComp.audioId + '.audno-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.audno-play .saudio-play.play').css('display', 'inline-block');
            });

            //finished video
            this.on('ended', function () {

                // change icon
                $('#' + _thisComp.audioId + '.audno-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.audno-play .saudio-play.play').css('display', 'inline-block');

                // update props
                if (_thisComp.hideVideo) {
                    _thisComp.hideVideo();
                }
            });
        });
    }
    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return _jsx('div', {
            'data-vjs-player': true
        }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { ref: n => this.nodePlayer = n, className: 'video-js vjs-default-skin audio-js' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(AudioNoAutoplay));

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_mic__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_mic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_mic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AudioPlayer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper_IsMobile__ = __webpack_require__(18);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();





// import component



// import helper


class AudioRecord extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(props) {
    super(props);

    this.startRecording = () => {
      // show button next
      $('.step-pane .ldtail-next').show();

      // turn on sound
      this.setState({ enableSound: true });

      if (__WEBPACK_IMPORTED_MODULE_6__helper_IsMobile__["a" /* isMobile */].any()) {
        var vid = document.getElementById('record-audio');
        vid.play();
      }

      if (this.state.record === false) {
        this.setState({
          record: true,
          audioPlayer: false
        });
      } else {
        this.setState({
          record: false,
          audioPlayer: true
        });
      }
    };

    this.state = {
      record: false,
      audioPlayer: false,
      enableSound: null
    };
  }

  onStop(blobObject) {

    __WEBPACK_IMPORTED_MODULE_5__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);

    this.setState({
      blobURL: blobObject.blobURL,
      enableSound: false
    });
  }

  onStartR() {
    console.log('start');
  }

  render() {
    const { record, audioPlayer } = this.state;

    return _jsx('div', {
      className: 'text-center'
    }, void 0, audioPlayer && _jsx('div', {}, void 0, _jsx('h3', {
      className: __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default.a.record_repeat_title
    }, void 0, 'Listen your voice'), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { className: 'audioRecord', ref: 'audioSource', controls: 'controls', src: this.state.blobURL })), _jsx('h3', {
      className: __WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default.a.audrecord_title
    }, void 0, record === false ? 'Listen and repeat, click to record!' : 'Recording! Talk by your micro.'), _jsx('span', {
      onClick: this.startRecording,
      className: 'record_phone ' + (record === true ? ' recording' : '')
    }, void 0, _jsx('i', {
      className: "fa " + (record === false ? 'fa-microphone' : 'fa-stop')
    })), _jsx(__WEBPACK_IMPORTED_MODULE_3_react_mic__["ReactMic"], {
      record: this.state.record,
      className: 'sound-wave',
      onStop: this.onStop.bind(this),
      onStart: this.onStartR.bind(this),
      strokeColor: '#000000',
      backgroundColor: '#FF4081'
    }), this.state.enableSound === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
      autoPlay: true,
      ref: 'audioRecord',
      controls: 'controls',
      className: 'hidden',
      src: '/uploads/audio/record.mp3' }), this.state.enableSound === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-true',
      id: 'record-audio',
      autoPlay: true,
      ref: 'audioRecord',
      controls: 'controls',
      className: 'hidden',
      src: '/uploads/audio/record.mp3' }));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_1__Card_Item_Card_Item_css___default.a)(AudioRecord));

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DrapDropItem_DnDCorrectBlank_js__ = __webpack_require__(72);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import sub-comp


class CorrectBlankCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    render() {
        const { cardItmData, level, lessonId, cardId } = this.props;

        return _jsx('div', {
            className: 'step-content full-width'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__DrapDropItem_DnDCorrectBlank_js__["a" /* default */], {
            cardId: cardId,
            level: level,
            lessonId: lessonId,
            cardItmData: cardItmData
        })));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(CorrectBlankCardItem));

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DrapDropItem_DnDWords_js__ = __webpack_require__(75);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import sub-comp


var _ref = _jsx('i', {
    className: 'fa fa-share'
});

class CorrectMeaningCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    render() {
        const { cardItmData, level, lessonId, cardId } = this.props;

        return _jsx('div', {
            className: 'step-content full-width'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.arr_direct
        }, void 0, _ref), _jsx(__WEBPACK_IMPORTED_MODULE_4__DrapDropItem_DnDWords_js__["a" /* default */], {
            cardId: cardId,
            level: level,
            lessonId: lessonId,
            cardItmData: cardItmData
        })));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(CorrectMeaningCardItem));

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_lib_update__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DragConversationFillBlank__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DropConversationFillBlank__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper_MHelper_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ItemTypes__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






// Sub Comp: Drap n Drop



// import helper





// function stickyHeader
function stickyHeader() {
    if (!$('.role-answer-list').length) {
        return;
    }

    var $answer_list = $('.role-answer-list'),
        header_h = $('.header').height(),
        guide_h = $('.ldtail-guide').height(),
        progress_h = $('.lesson-progress').height(),
        content_h = $('.step-content').height(),
        offsetHeader;

    offsetHeader = header_h + guide_h + progress_h + content_h;

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= offsetHeader) {
            $answer_list.addClass('fixed');
        } else {
            $answer_list.removeClass('fixed');
        }
    });
}

var _ref = _jsx('p', {
    className: 'guide-txt word text-center'
}, void 0, '* Drap and drop on these boxes!');

var _ref2 = _jsx('p', {
    className: 'guide-txt word text-center'
}, void 0, '* Click on these words to revert your answer!');

class DnDConversationFillBlank extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.state = {
            dropAnswer: null,
            dragWords: null,
            droppedBoxNames: [],
            endAllDrop: false,
            arrValidate: [],
            finishAnswer: false
        };
    }

    componentWillMount() {
        const { cardItmData } = this.props;

        let arrAnswer = [];
        let arrSentence = [];

        // 1. get list sentence
        cardItmData.json.sentences.map((item, idx) => {
            arrSentence.push({
                accepts: item.answer !== '' ? [__WEBPACK_IMPORTED_MODULE_7__ItemTypes__["a" /* default */].CARDWORD] : [__WEBPACK_IMPORTED_MODULE_7__ItemTypes__["a" /* default */].NOTDRAG],
                lastDroppedItem: null,
                sentenceAnswer: item.answer,
                sentenceBlank: item.sentence,
                validate: false
            });
        });

        // 2. get list answer
        cardItmData.json.sentences.map((item, idx) => {
            if (item.answer !== "") {
                arrAnswer.push({
                    id: idx,
                    name: item.answer,
                    type: __WEBPACK_IMPORTED_MODULE_7__ItemTypes__["a" /* default */].CARDWORD
                });
            }
        });
        __WEBPACK_IMPORTED_MODULE_6__helper_MHelper_js__["a" /* default */].shuffleArray(arrAnswer);

        this.setState({
            dragWords: arrAnswer,
            dropAnswer: arrSentence
        });
    }

    componentDidMount() {
        stickyHeader();
    }

    isDropped(indexId) {
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;
        let r = _.findIndex(this.state.droppedBoxNames, i => {
            return i.id == indexId;
        });
        //console.log('r', r);
        return r > -1;
    }

    // HandleOnDrop
    handleDrop(index, item) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const { name } = item;

            yield _this2.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this2.state, {
                // 1. EndAllDrop
                arrValidate: {
                    $push: [item.name === _this2.state.dropAnswer[index].sentenceAnswer ? true : false]
                },
                // 2. state: dropAnswer
                dropAnswer: {
                    [index]: {
                        lastDroppedItem: {
                            $set: item
                        },
                        validate: {
                            $set: item.name === _this2.state.dropAnswer[index].sentenceAnswer ? true : false
                        }
                    }
                },
                // 3. state: droppedBoxNames
                droppedBoxNames: name ? {
                    $push: [{
                        id: item.id,
                        name: item.name
                    }]
                } : {}
            }));
            //console.log('this.state', this.state);
        })();
    }

    // Choose a Answer by click
    chooseAws(idx, chosenObj, isDropped) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            //console.log('this.state', this.state);
            //console.log('chosenObj', chosenObj);
            if (isDropped) {
                return;
            }
            let item = chosenObj;
            const { name } = item;

            // FInd Blank Indx
            let firstIdxR = _.findIndex(_this3.state.dropAnswer, function (o) {
                return o.sentenceAnswer !== '' && o.lastDroppedItem == null;
            });

            // Set Data
            yield _this3.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this3.state, {
                // 1. EndAllDrop
                arrValidate: {
                    $push: [item.name === _this3.state.dropAnswer[firstIdxR].sentenceAnswer ? true : false]
                },
                // 2. state: dropAnswer
                dropAnswer: {
                    [firstIdxR]: {
                        lastDroppedItem: {
                            $set: item
                        },
                        validate: {
                            $set: item.name === _this3.state.dropAnswer[firstIdxR].sentenceAnswer ? true : false
                        }
                    }
                },
                // 3. state: droppedBoxNames
                droppedBoxNames: name ? {
                    $push: [{
                        id: item.id,
                        name: item.name
                    }]
                } : {}
            }));
            // console.log('this.state', this.state);
        })();
    }

    isAnswerCorrect() {
        let rs = true;
        this.state.dropAnswer.forEach(function (itm) {
            //itm.lastDroppedItem != null mean that doesn't have blank
            if (itm.validate === false && itm.lastDroppedItem !== null) {
                rs = false;
            }
        });
        return rs;
    }

    // EndAllDrop
    submitAnswer() {

        let result = __WEBPACK_IMPORTED_MODULE_6__helper_MHelper_js__["a" /* default */].findArrayVal(this.state.arrValidate, false);

        this.setState({ endAllDrop: true, finishAnswer: true });
        // check correct to save result

        if (this.isAnswerCorrect() === true) {
            __WEBPACK_IMPORTED_MODULE_8__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            __WEBPACK_IMPORTED_MODULE_8__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
        }

        // show button next
        $('.step-pane .ldtail-next').show();

        // If all r right
        if (result < 0) {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: true
            });
        } else {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: false
            });
        }
    }

    // Func: show the HINT.
    skipToResult() {
        let _this = this;
        var resetDropAnswer = setInterval(function () {
            for (var i = 0; i < _this.state.dropAnswer.length; i++) {
                _this.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this.state, {
                    // 1. state: dropAnswer
                    dropAnswer: {
                        [i]: {
                            lastDroppedItem: {
                                $set: { name: _this.state.dropAnswer[i].sentenceAnswer }
                            },
                            validate: {
                                $set: true
                            }
                        }
                    }
                }));
            }
        }, 200);

        setTimeout(function () {
            clearInterval(resetDropAnswer);
        }, 400 * _this.state.dropAnswer.length);
    }

    // Revert Answer
    revertAws(idx, chosenObj) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4.state.finishAnswer === true) {
                return;
            }

            //let indexOfDrap = MHelper.explode('-',chosenObj.id)[1];
            let indexOfDrap = _.findIndex(_this4.state.droppedBoxNames, function (i) {
                return i.id == chosenObj.id;
            });

            yield _this4.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this4.state, {
                droppedBoxNames: { $splice: [[indexOfDrap, 1]] },
                arrValidate: { $splice: [[indexOfDrap, 1]] },
                dropAnswer: {
                    [idx]: {
                        lastDroppedItem: {
                            $set: null
                        },
                        validate: {
                            $set: false
                        }
                    }
                }
            }));
            //console.log('this.setState', this.state);
        })();
    }

    render() {
        const { dropAnswer, dragWords, droppedBoxNames } = this.state;
        const { activeUser, cardItmData, finshedVideo } = this.props;

        return _jsx('div', {
            className: 'row'
        }, void 0, _jsx('div', {
            className: 'col-xs-12 text-center role-answer-list'
        }, void 0, dragWords.map(({ name, type }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_4__DragConversationFillBlank__["a" /* default */], {
            id: 'cr-' + index,
            name: name,
            type: type,
            isDropped: this.isDropped('cr-' + index),
            onClickAws: e => this.chooseAws(index, { id: 'cr-' + index, name: name }, this.isDropped('cr-' + index))
        }, index))), _jsx('div', {
            className: 'col-xs-12'
        }, void 0, droppedBoxNames.length === 0 && _ref, droppedBoxNames.length > 0 && _ref2, _jsx('div', {
            className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conversation_wrap + ' ' + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.notop, 'conversation-list'].join(' ')
        }, void 0, dropAnswer.map(({ accepts, lastDroppedItem, sentenceBlank, validate }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_5__DropConversationFillBlank__["a" /* default */], {
            accepts: accepts,
            sentenceBlank: sentenceBlank,
            lastDroppedItem: lastDroppedItem,
            validate: validate,
            endAllDrop: this.state.endAllDrop,
            onDrop: item => this.handleDrop(index, item),
            dropIndex: index,
            activeUser: activeUser,
            cardItmData: cardItmData,
            finshedVideo: finshedVideo,
            onClickRevert: item => this.revertAws(index, item),
            listenConversation: (time_start, time_end, index) => this.props.listenConversation(time_start, time_end, index)
        }, index)))), this.state.arrValidate.length === dragWords.length && this.state.awsResult == null && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.button_wrap
        }, void 0, _jsx('span', {
            onClick: () => this.submitAnswer(),
            className: 'btn'
        }, void 0, 'Submit'))), this.state.awsResult === false && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.button_wrap
        }, void 0, _jsx('span', {
            onClick: () => this.skipToResult(),
            className: 'btn'
        }, void 0, 'Skip to results'))), this.state.awsResult === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Fail-sound.mp3' }), this.state.awsResult === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Correct-answer.mp3' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(DnDConversationFillBlank)); //DragDropContext(HTML5Backend)(DnDCorrectBlank);

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_lib_update__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DragCorrectBlank__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DropCorrectBlank__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper_MHelper_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ItemTypes__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






// Sub Comp: Drap n Drop



// import helper





var _ref = _jsx('p', {
    className: 'guide-txt word text-center'
}, void 0, '* Click on the above words or drap and drop on this box!');

var _ref2 = _jsx('p', {
    className: 'guide-txt word text-center'
}, void 0, '* Click on these words to revert your answer!');

class DnDCorrectBlank extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.state = {
            dropAnswer: null,
            dragWords: null,
            droppedBoxNames: [],
            endAllDrop: false,
            arrValidate: [],
            finishAnswer: false
        };
    }

    componentWillMount() {
        const { cardItmData } = this.props;

        let arrAnswer = [];
        let arrSentence = [];

        if (!cardItmData.json || cardItmData.json.length <= 0) {
            return;
        }
        // 1. get list sentence
        cardItmData.json.sentence.map((item, idx) => {
            arrSentence.push({
                accepts: [__WEBPACK_IMPORTED_MODULE_7__ItemTypes__["a" /* default */].CARDWORD],
                lastDroppedItem: null,
                sentenceAnswer: item[1],
                sentenceBlank: item[0],
                validate: false
            });
        });

        // 2. get list answer
        __WEBPACK_IMPORTED_MODULE_6__helper_MHelper_js__["a" /* default */].shuffleArray(cardItmData.json.answer).map((item, idx) => {
            arrAnswer.push({
                name: item,
                type: __WEBPACK_IMPORTED_MODULE_7__ItemTypes__["a" /* default */].CARDWORD
            });
        });

        this.setState({
            dragWords: arrAnswer,
            dropAnswer: arrSentence
        });
    }

    isDropped(indexId) {
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;
        let r = _.findIndex(this.state.droppedBoxNames, i => {
            return i.id == indexId;
        });
        //console.log('r', r);
        return r > -1;
    }

    // HandleOnDrop
    handleDrop(index, item) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const { name } = item;

            yield _this2.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this2.state, {
                // 1. EndAllDrop
                arrValidate: {
                    $push: [item.name === _this2.state.dropAnswer[index].sentenceAnswer ? true : false]
                },
                // 2. state: dropAnswer
                dropAnswer: {
                    [index]: {
                        lastDroppedItem: {
                            $set: item
                        },
                        validate: {
                            $set: item.name === _this2.state.dropAnswer[index].sentenceAnswer ? true : false
                        }
                    }
                },
                // 3. state: droppedBoxNames
                droppedBoxNames: name ? {
                    $push: [{
                        id: item.id,
                        name: item.name
                    }]
                } : {}
            }));
        })();
    }

    chooseAws(idx, chosenObj, isDropped) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            // console.log('chosenObj', chosenObj);
            if (isDropped) {
                return;
            }
            let item = chosenObj;
            const { name } = item;
            yield _this3.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this3.state, {
                // 1. EndAllDrop
                arrValidate: {
                    $push: [item.name === _this3.state.dropAnswer[_this3.state.droppedBoxNames.length].sentenceAnswer ? true : false]
                },
                // 2. state: dropAnswer
                dropAnswer: {
                    [_this3.state.droppedBoxNames.length]: {
                        lastDroppedItem: {
                            $set: item
                        },
                        validate: {
                            $set: item.name === _this3.state.dropAnswer[_this3.state.droppedBoxNames.length].sentenceAnswer ? true : false
                        }
                    }
                },
                // 3. state: droppedBoxNames
                droppedBoxNames: name ? {
                    $push: [{
                        id: item.id,
                        name: item.name
                    }]
                } : {}
            }));
        })();
    }

    isAnswerCorrect() {
        let rs = true;
        this.state.dropAnswer.forEach(function (itm) {
            if (itm.validate === false) {
                rs = false;
            }
        });
        return rs;
    }

    // EndAllDrop
    submitAnswer() {
        let result = __WEBPACK_IMPORTED_MODULE_6__helper_MHelper_js__["a" /* default */].findArrayVal(this.state.arrValidate, false);

        this.setState({ endAllDrop: true, finishAnswer: true });
        // check correct to save result
        if (this.isAnswerCorrect() === true) {
            __WEBPACK_IMPORTED_MODULE_8__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            __WEBPACK_IMPORTED_MODULE_8__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
        }
        // show button next
        $('.step-pane .ldtail-next').show();

        // If all r right
        if (result < 0) {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: true
            });
        } else {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: false
            });
        }
    }

    // Func: show the HINT.
    skipToResult() {
        let _this = this;
        var resetDropAnswer = setInterval(function () {
            for (var i = 0; i < _this.state.dropAnswer.length; i++) {
                _this.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this.state, {
                    // 1. state: dropAnswer
                    dropAnswer: {
                        [i]: {
                            lastDroppedItem: {
                                $set: { name: _this.state.dropAnswer[i].sentenceAnswer }
                            },
                            validate: {
                                $set: true
                            }
                        }
                    }
                }));
            }
        }, 200);

        setTimeout(function () {
            clearInterval(resetDropAnswer);
        }, 400 * _this.state.dropAnswer.length);
    }

    revertAws(idx, chosenObj) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4.state.finishAnswer === true) {
                return;
            }

            // let indexOfDrap = MHelper.explode('-',chosenObj.id)[1];
            let indexOfDrap = _.findIndex(_this4.state.droppedBoxNames, function (i) {
                return i.id == chosenObj.id;
            });

            yield _this4.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this4.state, {
                droppedBoxNames: { $splice: [[indexOfDrap, 1]] },
                arrValidate: { $splice: [[indexOfDrap, 1]] },
                dropAnswer: {
                    [idx]: {
                        lastDroppedItem: {
                            $set: null
                        },
                        validate: {
                            $set: false
                        }
                    }
                }
            }));
        })();
    }

    render() {
        const { dropAnswer, dragWords, droppedBoxNames } = this.state;

        return _jsx('div', {
            className: 'row'
        }, void 0, dragWords && _jsx('div', {
            className: 'col-xs-12 text-center'
        }, void 0, dragWords.map(({ name, type }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_4__DragCorrectBlank__["a" /* default */], {
            id: 'cr-' + index,
            name: name,
            type: type,
            isDropped: this.isDropped('cr-' + index),
            onClickAws: e => this.chooseAws(index, { id: 'cr-' + index, name: name }, this.isDropped('cr-' + index))
        }, index))), _jsx('div', {
            className: 'col-xs-12'
        }, void 0, droppedBoxNames.length === 0 && _ref, droppedBoxNames.length > 0 && _ref2, dropAnswer && dropAnswer.map(({ accepts, lastDroppedItem, sentenceBlank, validate }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_5__DropCorrectBlank__["a" /* default */], {
            accepts: accepts,
            sentenceBlank: sentenceBlank,
            lastDroppedItem: lastDroppedItem,
            validate: validate,
            endAllDrop: this.state.endAllDrop,
            onDrop: item => this.handleDrop(index, item),
            onClickRevert: item => this.revertAws(index, item)
        }, index))), dropAnswer && _jsx('div', {}, void 0, this.state.arrValidate.length === dropAnswer.length && this.state.awsResult == null && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.button_wrap
        }, void 0, _jsx('span', {
            onClick: () => this.submitAnswer(),
            className: 'btn'
        }, void 0, 'Submit'))), this.state.awsResult === false && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.button_wrap
        }, void 0, _jsx('span', {
            onClick: () => this.skipToResult(),
            className: 'btn'
        }, void 0, 'Skip to results')))), this.state.awsResult === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Fail-sound.mp3' }), this.state.awsResult === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Correct-answer.mp3' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(DnDCorrectBlank)); //DragDropContext(HTML5Backend)(DnDCorrectBlank);

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_lib_update__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ItemTypes__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DragFillBlank__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__DropFillBlank__ = __webpack_require__(84);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






// import helper




// Sub Comp: Drap n Drop



var _ref = _jsx('i', {
    className: 'fa fa-share'
});

class DnDFillBlank extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.state = {
            dropAnswer: [{
                accepts: [__WEBPACK_IMPORTED_MODULE_5__ItemTypes__["a" /* default */].CARDWORD],
                lastDroppedItem: null
            }],
            dragWords: null,
            droppedBoxNames: [],
            endAllDrop: false,
            arrValidate: [],
            fillBlankItem: null,
            finishAnswer: false
        };
    }

    componentWillMount() {
        const { cardItmData } = this.props;

        let arrAnswer = [];
        let arrFillBlank = [];

        // 1. Create array fill blank
        cardItmData.json.options.map((item, idx) => {
            arrFillBlank.push({
                name: item,
                validate: false
            });
        });

        // 2. get list options
        __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].shuffleArray(cardItmData.json.options).map((item, idx) => {
            arrAnswer.push({
                name: item,
                type: __WEBPACK_IMPORTED_MODULE_5__ItemTypes__["a" /* default */].CARDWORD
            });
        });

        this.setState({
            fillBlankItem: arrFillBlank,
            dragWords: arrAnswer
        });
    }

    isDropped(indexId) {
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;
        let r = _.findIndex(this.state.droppedBoxNames, i => {
            return i.id == indexId;
        });
        // console.log('r', r);
        return r > -1;
    }

    // HandleOnDrop
    handleDrop(index, item) {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this.state.arrValidate.length !== 0) {
                return;
            }
            const { name } = item;
            const { cardItmData } = _this.props;
            // console.log('item', item);

            yield _this.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this.state, {
                // 1. EndAllDrop
                arrValidate: {
                    $push: [item.name === _this.state.fillBlankItem[_this.state.droppedBoxNames.length].name ? true : false]
                },
                // 2. state: droppedBoxNames
                droppedBoxNames: name ? {
                    $push: [{
                        id: item.id,
                        name: item.name
                    }]
                } : {},
                // 3. state: fillBlankItem
                fillBlankItem: {
                    [_this.state.droppedBoxNames.length]: {
                        validate: {
                            $set: item.name === _this.state.fillBlankItem[_this.state.droppedBoxNames.length].name ? true : false
                        }
                    }
                }
            }));
        })();
    }

    chooseAws(idx, chosenObj, isDropped) {
        // console.log('chosenObj', chosenObj);
        if (isDropped || this.state.arrValidate.length !== 0) {
            return;
        }
        this.handleDrop(idx, chosenObj);
    }

    // EndAllDrop
    submitAnswer() {
        let result = __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].findArrayVal(this.state.arrValidate, false);
        // show button next
        $('.step-pane .ldtail-next').show();

        // If all r right
        if (result < 0) {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: true
            });
        } else {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: false
            });
        }
    }

    revertAws(idx, chosenObj) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2.state.finishAnswer === true) {
                return;
            }

            let indexOfDrap = __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('-', chosenObj.id)[1];

            yield _this2.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this2.state, {
                droppedBoxNames: { $splice: [[idx, 1]] },
                arrValidate: { $splice: [[idx, 1]] },
                fillBlankItem: {
                    [indexOfDrap]: {
                        validate: {
                            $set: false
                        }
                    }
                }
            }));
        })();
    }

    render() {
        const { dropAnswer, dragWords, droppedBoxNames, fillBlankItem } = this.state;
        const { cardItmData } = this.props;

        return _jsx('div', {
            className: 'row'
        }, void 0, _jsx('div', {
            className: 'col-xs-12 text-center',
            style: { marginBottom: 5 }
        }, void 0, dragWords.map(({ name, type }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_6__DragFillBlank__["a" /* default */], {
            name: name,
            id: 'w-' + index,
            type: type,
            isDropped: this.isDropped('w-' + index),
            onClickAws: e => this.chooseAws(index, { id: 'w-' + index, name: name }, this.isDropped('w-' + index))
        }, index))), _jsx('div', {
            className: 'col-xs-12 text-center'
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default.a.arr_direct
        }, void 0, _ref)), _jsx('div', {
            className: 'col-xs-12'
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default.a.drop_order
        }, void 0, dropAnswer.map(({ accepts, lastDroppedItem }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_7__DropFillBlank__["a" /* default */], {
            droppedBoxNames: droppedBoxNames,
            sentence: cardItmData.json.sentence,
            accepts: accepts,
            lastDroppedItem: lastDroppedItem,
            endAllDrop: this.state.endAllDrop,
            fillBlankItem: fillBlankItem,
            onDrop: item => this.handleDrop(index, item),
            onClickRevert: (idx, item) => this.revertAws(idx, { id: item.id, name: item.name })
        }, index)))), this.state.endAllDrop === true && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('h3', {
            className: __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default.a.order_title_lrg
        }, void 0, 'Answer Correctly'), _jsx('h3', {
            className: __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default.a.order_title
        }, void 0, cardItmData.json.answer)), this.state.arrValidate.length !== 0 && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default.a.button_wrap
        }, void 0, _jsx('span', {
            onClick: () => this.submitAnswer(),
            className: 'btn'
        }, void 0, 'Submit'))), this.state.awsResult === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Fail-sound.mp3' }), this.state.awsResult === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Correct-answer.mp3' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default.a)(DnDFillBlank));

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_lib_update__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DragReorderWord__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DropReorderWord__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helper_MHelper_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ItemTypes__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }







// Sub Comp: Drap n Drop



// import helper





var _ref = _jsx('i', {
    className: 'fa fa-share'
});

class DnDReorderWord extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.state = {
            dropAnswer: [{
                accepts: [__WEBPACK_IMPORTED_MODULE_8__ItemTypes__["a" /* default */].CARDWORD],
                lastDroppedItem: null
            }],
            dragWords: null,
            droppedBoxNames: [],
            endAllDrop: false,
            arrValidate: [],
            reOrderItem: null,
            finishAnswer: false
        };
    }

    componentWillMount() {
        const { cardItmData } = this.props;

        let arrAnswer = [];
        let arrReorder = [];

        // 1. Create array reorder
        cardItmData.json.words.map((item, idx) => {
            arrReorder.push({
                name: item,
                validate: false
            });
        });

        this.setState({ reOrderItem: arrReorder });

        // 2. get list words
        __WEBPACK_IMPORTED_MODULE_7__helper_MHelper_js__["a" /* default */].shuffleArray(cardItmData.json.words).map((item, idx) => {
            arrAnswer.push({
                name: item,
                type: __WEBPACK_IMPORTED_MODULE_8__ItemTypes__["a" /* default */].CARDWORD
            });
        });
        this.setState({ dragWords: arrAnswer });
    }

    isDropped(indexId) {
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;
        let r = __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.findIndex(this.state.droppedBoxNames, i => {
            return i.id == indexId;
        });
        // console.log('r', r);
        return r > -1;
    }

    // HandleOnDrop
    handleDrop(index, item) {
        var _this = this;

        return _asyncToGenerator(function* () {
            const { name } = item;
            const { cardItmData } = _this.props;
            // console.log('item', item);

            yield _this.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this.state, {
                // 1. EndAllDrop
                arrValidate: {
                    $push: [item.name === _this.state.reOrderItem[_this.state.droppedBoxNames.length].name ? true : false]
                },
                // 2. state: droppedBoxNames
                // droppedBoxNames: name ? {
                //     $push: [name],
                // } : {},
                droppedBoxNames: name ? {
                    $push: [{
                        id: item.id,
                        name: item.name
                    }]
                } : {},
                // 3. state: reOrderItem
                reOrderItem: {
                    [_this.state.droppedBoxNames.length]: {
                        validate: {
                            $set: item.name === _this.state.reOrderItem[_this.state.droppedBoxNames.length].name ? true : false
                        }
                    }
                }
            }));
        })();
    }

    chooseAws(idx, chosenObj, isDropped) {
        // console.log('chosenObj', chosenObj);
        if (isDropped) {
            return;
        }
        this.handleDrop(idx, chosenObj);
    }

    isAnswerCorrect() {
        let rs = true;
        this.state.reOrderItem.forEach(function (itm) {
            if (itm.validate === false) {
                rs = false;
            }
        });
        return rs;
    }

    // EndAllDrop
    submitAnswer() {

        let result = __WEBPACK_IMPORTED_MODULE_7__helper_MHelper_js__["a" /* default */].findArrayVal(this.state.arrValidate, false);

        this.setState({ endAllDrop: true, finishAnswer: true });
        // check correct to save result
        if (this.isAnswerCorrect() === true) {
            __WEBPACK_IMPORTED_MODULE_9__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            __WEBPACK_IMPORTED_MODULE_9__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
        }

        // show button next
        $('.step-pane .ldtail-next').show();

        // If all r right
        if (result < 0) {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: true
            });
        } else {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: false
            });
        }
    }

    revertAws(idx, chosenObj) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2.state.finishAnswer === true) {
                return;
            }

            let indexOfDrap = __WEBPACK_IMPORTED_MODULE_7__helper_MHelper_js__["a" /* default */].explode('-', chosenObj.id)[1];

            yield _this2.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this2.state, {
                droppedBoxNames: { $splice: [[idx, 1]] },
                arrValidate: { $splice: [[idx, 1]] },
                reOrderItem: {
                    [indexOfDrap]: {
                        validate: {
                            $set: false
                        }
                    }
                }
            }));
        })();
    }

    render() {
        const { dropAnswer, dragWords, droppedBoxNames, reOrderItem } = this.state;
        const { cardItmData } = this.props;

        return _jsx('div', {
            className: 'row'
        }, void 0, _jsx('div', {
            className: 'col-xs-12 text-center',
            style: { marginBottom: 5 }
        }, void 0, dragWords.map(({ name, type }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_5__DragReorderWord__["a" /* default */], {
            name: name,
            id: 'w-' + index,
            type: type,
            isDropped: this.isDropped('w-' + index),
            onClickAws: e => this.chooseAws(index, { id: 'w-' + index, name: name }, this.isDropped('w-' + index))
        }, index))), _jsx('div', {
            className: 'col-xs-12 text-center'
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.arr_direct
        }, void 0, _ref)), _jsx('div', {
            className: 'col-xs-12'
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.order_wrap
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.drop_order
        }, void 0, dropAnswer.map(({ accepts, lastDroppedItem }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_6__DropReorderWord__["a" /* default */], {
            droppedBoxNames: droppedBoxNames,
            accepts: accepts,
            lastDroppedItem: lastDroppedItem,
            endAllDrop: this.state.endAllDrop,
            reOrderItem: reOrderItem,
            onDrop: item => this.handleDrop(index, item),
            onClickRevert: (idx, item) => this.revertAws(idx, { id: item.id, name: item.name })
        }, index))))), this.state.endAllDrop === true && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('h3', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.order_title_lrg
        }, void 0, 'Answer Correctly'), _jsx('h3', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.order_title
        }, void 0, cardItmData.json.answer)), this.state.arrValidate.length === cardItmData.json.words.length && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.button_wrap
        }, void 0, _jsx('span', {
            onClick: () => this.submitAnswer(),
            className: 'btn'
        }, void 0, 'Submit'))), this.state.awsResult === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Fail-sound.mp3' }), this.state.awsResult === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Correct-answer.mp3' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(DnDReorderWord));

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_lib_update___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_lib_update__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DragWords__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DropAnswers__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper_MHelper_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ItemTypes__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






// Sub Comp: Drap n Drop



// import helper





var _ref = _jsx('p', {
    className: 'guide-txt word text-center'
}, void 0, '* Click on the left words or drap and drop on this box!');

var _ref2 = _jsx('p', {
    className: 'guide-txt word text-center'
}, void 0, '* Click on these words to revert your answer!');

class DnDWords extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.state = {
            dropAnswer: null,
            dragWords: null,
            droppedBoxNames: [],
            endAllDrop: false,
            arrValidate: [],
            awsResult: null
        };
    }

    componentWillMount() {
        const { cardItmData } = this.props;

        let arrAnswer = [];
        let arrWords = [];

        // 1. get list answer
        cardItmData.json.answer.map((item, idx) => {
            arrAnswer.push({
                accepts: [__WEBPACK_IMPORTED_MODULE_7__ItemTypes__["a" /* default */].CARDWORD],
                lastDroppedItem: null,
                answerVN: item[1],
                answerEN: item[0],
                validate: false
            });
        });

        // 2. get list words
        __WEBPACK_IMPORTED_MODULE_6__helper_MHelper_js__["a" /* default */].shuffleArray(cardItmData.json.words).map((item, idx) => {
            arrWords.push({
                name: item,
                type: __WEBPACK_IMPORTED_MODULE_7__ItemTypes__["a" /* default */].CARDWORD
            });
        });

        this.setState({
            dropAnswer: arrAnswer,
            dragWords: arrWords
        });
    }

    isDropped(indexId) {
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;

        let r = _.findIndex(this.state.droppedBoxNames, i => {
            return i.id == indexId;
        });
        //console.log('r', r);
        return r > -1;
    }

    // HandleOnDrop
    handleDrop(index, item) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const { name } = item;

            yield _this2.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this2.state, {
                // 1. EndAllDrop
                arrValidate: {
                    $push: [item.name === _this2.state.dropAnswer[index].answerEN ? true : false]
                },
                // 2. state: dropAnswer
                dropAnswer: {
                    [index]: {
                        lastDroppedItem: {
                            $set: item
                        },
                        validate: {
                            $set: item.name === _this2.state.dropAnswer[index].answerEN ? true : false
                        }
                    }
                },
                // 3. state: droppedBoxNames
                droppedBoxNames: name ? {
                    $push: [{
                        id: item.id,
                        name: item.name
                    }]
                } : {}
            }));
        })();
    }

    chooseAws(idx, chosenObj, isDropped) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            // console.log('chosenObj', chosenObj);
            if (isDropped) {
                return;
            }
            let item = chosenObj;
            const { name } = item;
            let idxBlank = _.findIndex(_this3.state.dropAnswer, function (i) {
                return i.lastDroppedItem === null;
            });
            yield _this3.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this3.state, {
                // 1. EndAllDrop
                arrValidate: {
                    $push: [item.name === _this3.state.dropAnswer[idxBlank].answerEN ? true : false]
                },
                // 2. state: dropAnswer
                dropAnswer: {
                    [idxBlank]: {
                        lastDroppedItem: {
                            $set: item
                        },
                        validate: {
                            $set: item.name === _this3.state.dropAnswer[idxBlank].answerEN ? true : false
                        }
                    }
                },
                // 3. state: droppedBoxNames
                droppedBoxNames: name ? {
                    $push: [{
                        id: item.id,
                        name: item.name
                    }]
                } : {}
            }));

            console.log('setState', _this3.state);
        })();
    }

    isAnswerCorrect() {
        let rs = true;
        this.state.dropAnswer.forEach(function (itm) {
            if (itm.validate === false) {
                rs = false;
            }
        });
        return rs;
    }

    // EndAllDrop
    submitAnswer() {
        this.setState({ endAllDrop: true, finishAnswer: true });
        // check correct to save result
        if (this.isAnswerCorrect() === true) {
            __WEBPACK_IMPORTED_MODULE_8__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            __WEBPACK_IMPORTED_MODULE_8__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
        }

        let result = __WEBPACK_IMPORTED_MODULE_6__helper_MHelper_js__["a" /* default */].findArrayVal(this.state.arrValidate, false);
        // show button next
        $('.step-pane .ldtail-next').show();

        // If all r right
        if (result < 0) {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: true
            });
        } else {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: false
            });
        }
    }

    // Func: show the HINT.
    skipToResult() {
        let _this = this;

        var resetDropAnswer = setInterval(function () {
            for (var i = 0; i < _this.state.droppedBoxNames.length; i++) {
                _this.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this.state, {
                    // 1. state: dropAnswer
                    dropAnswer: {
                        [i]: {
                            lastDroppedItem: {
                                $set: { name: _this.state.dropAnswer[i].answerEN }
                            },
                            validate: {
                                $set: true
                            }
                        }
                    }
                }));
            }
        }, 200);

        setTimeout(function () {
            clearInterval(resetDropAnswer);
        }, 400 * _this.state.droppedBoxNames.length);
    }

    revertAws(idx, chosenObj) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4.state.finishAnswer === true) {
                return;
            }

            // let indexOfDrap = MHelper.explode('-',chosenObj.id)[1];
            let indexOfDrap = _.findIndex(_this4.state.droppedBoxNames, function (i) {
                return i.id == chosenObj.id;
            });
            console.log('indexOfDrap', indexOfDrap);
            console.log('chosenObj', chosenObj);
            yield _this4.setState(__WEBPACK_IMPORTED_MODULE_1_react_lib_update___default()(_this4.state, {
                droppedBoxNames: { $splice: [[indexOfDrap, 1]] },
                arrValidate: { $splice: [[indexOfDrap, 1]] },
                dropAnswer: {
                    [idx]: {
                        lastDroppedItem: {
                            $set: null
                        },
                        validate: {
                            $set: false
                        }
                    }
                }
            }));
            console.log('setState', _this4.state);
        })();
    }

    render() {
        const { dropAnswer, dragWords, droppedBoxNames } = this.state;

        return _jsx('div', {
            className: 'row'
        }, void 0, _jsx('div', {
            className: 'col-xs-12'
        }, void 0, droppedBoxNames.length === 0 && _ref, droppedBoxNames.length > 0 && _ref2), _jsx('div', {
            className: 'col-md-6 col-sm-6 col-xs-12'
        }, void 0, dragWords.map(({ name, type }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_4__DragWords__["a" /* default */], {
            id: 'dw-' + index,
            isDropped: this.isDropped('dw-' + index),
            onClickAws: e => this.chooseAws(index, { id: 'dw-' + index, name: name }, this.isDropped('dw-' + index)),
            name: name,
            type: type
        }, index))), _jsx('div', {
            className: 'col-md-6 col-sm-6 col-xs-12'
        }, void 0, dropAnswer.map(({ accepts, lastDroppedItem, answerVN, validate }, index) => _jsx(__WEBPACK_IMPORTED_MODULE_5__DropAnswers__["a" /* default */], {
            accepts: accepts,
            answerVN: answerVN,
            lastDroppedItem: lastDroppedItem,
            validate: validate,
            endAllDrop: this.state.endAllDrop,
            onDrop: item => this.handleDrop(index, item),
            onClickRevert: item => this.revertAws(index, item)
        }, index))), this.state.arrValidate.length === dropAnswer.length && this.state.awsResult == null && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default.a.button_wrap
        }, void 0, _jsx('span', {
            onClick: () => this.submitAnswer(),
            className: 'btn'
        }, void 0, 'Submit'))), this.state.awsResult === false && _jsx('div', {
            className: "text-center col-xs-12 "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default.a.button_wrap
        }, void 0, _jsx('span', {
            onClick: () => this.skipToResult(),
            className: 'btn'
        }, void 0, 'Skip to results'))), this.state.awsResult === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Fail-sound.mp3' }), this.state.awsResult === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Correct-answer.mp3' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Card_Item_Card_Item_css___default.a)(DnDWords)); //DragDropContext(HTML5Backend)(DnDWords);

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      id: props.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DragConversationFillBlank extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(_jsx('div', {
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_opt + ' role2_drag ' + (isDropped ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.role2_sentence_dragging : ''),
      style: { opacity },
      draggable: !isDropped,
      onClick: this.props.onClickAws
    }, void 0, name));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DragSource"])(props => props.type, boxSource, collect)(DragConversationFillBlank));

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      id: props.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DragCorrectBlank extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(_jsx('div', {
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_opt + ' ' + (isDropped ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_dragging : ''),
      style: { opacity },
      draggable: !isDropped,
      onClick: this.props.onClickAws
    }, void 0, name));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DragSource"])(props => props.type, boxSource, collect)(DragCorrectBlank));

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      id: props.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DragFillBlank extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(_jsx('div', {
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_opt + ' ' + (isDropped ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_dragging : ''),
      draggable: !isDropped,
      style: { opacity },
      onClick: this.props.onClickAws
    }, void 0, name));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DragSource"])(props => props.type, boxSource, collect)(DragFillBlank));

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      id: props.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DragReorderWord extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(_jsx('div', {
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_opt + ' ' + (isDropped ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_dragging : ''),
      draggable: !isDropped,
      style: { opacity },
      onClick: this.props.onClickAws
    }, void 0, name));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DragSource"])(props => props.type, boxSource, collect)(DragReorderWord));

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      id: props.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DragWords extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(_jsx('div', {
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.answer_opt + ' ' + (isDropped ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.isDragging : ''),
      style: { opacity },
      draggable: !isDropped,
      onClick: this.props.onClickAws
    }, void 0, name));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DragSource"])(props => props.type, boxSource, collect)(DragWords));

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class DropAnswers extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      lastItem: false
    }, _temp;
  }

  // EndAllDrop -> validate true or false
  componentWillReceiveProps(nextProps) {
    if (nextProps.endAllDrop && nextProps.endAllDrop === true) {
      this.setState({ lastItem: true });
    }
  }

  render() {
    const { accepts, isOver, canDrop, connectDropTarget, lastDroppedItem, answerVN, validate } = this.props;
    const { lastItem } = this.state;

    const isActive = isOver && canDrop;

    return connectDropTarget(_jsx('div', {
      onClick: e => this.props.onClickRevert(lastDroppedItem),
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.ans_result + ' ' + (isActive ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.isActive : '') + ' ' + (lastDroppedItem ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.dropped : '') + ' ' + (lastDroppedItem && lastItem === true && validate === false ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.dropped_wrong : '')
    }, void 0, !lastDroppedItem && _jsx('div', {
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.dropSuggest
    }, void 0, answerVN), lastDroppedItem && _jsx('div', {}, void 0, lastDroppedItem.name)));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DropTarget"])(props => props.accepts, dustbinTarget, collect)(DropAnswers));

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__ = __webpack_require__(12);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();





// import component


const dustbinTarget = {
    drop(props, monitor) {
        console.log('monitor.getItem()', monitor.getItem());
        props.onDrop(monitor.getItem());
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class DropConversationFillBlank extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.state = {
            lastItem: false
        }, _temp;
    }

    // EndAllDrop -> validate true or false
    componentWillReceiveProps(nextProps) {
        if (nextProps.endAllDrop && nextProps.endAllDrop === true) {
            this.setState({ lastItem: true });
        }
    }

    render() {
        const { accepts, isOver, canDrop,
            connectDropTarget, lastDroppedItem,
            sentenceBlank, validate, dropIndex,
            activeUser, cardItmData, finshedVideo } = this.props;
        const { lastItem } = this.state;

        const isActive = isOver && canDrop;

        return connectDropTarget(_jsx('div', {
            style: { marginBottom: 15 },
            className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_item, 'clearfix', 'conv-itm', activeUser === dropIndex ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_active : ''].join(' ')
        }, void 0, dropIndex % 2 === 0 && _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_left
        }, void 0, _jsx('div', {
            className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_content, 'conver-ct'].join(' ')
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img_wrap + ' conver_img_wrap'
        }, void 0, _jsx('figure', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img + ' defaut_avt',
            style: { backgroundImage: "url(" + cardItmData.json.sentences[dropIndex].avatar !== '' ? cardItmData.json.sentences[dropIndex].avatar : '' + ")" }
        }, void 0)), _jsx('h3', {
            className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_name, 'conver-name'].join(' ')
        }, void 0, cardItmData.json.sentences[dropIndex].speaker), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_desc
        }, void 0, __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('___', sentenceBlank)[0], sentenceBlank.indexOf("___") !== -1 && _jsx('div', {
            onClick: e => this.props.onClickRevert(lastDroppedItem),
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result + ' sentence_result ' + (isActive ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_active : '') + ' ' + (lastDroppedItem ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_dropped + ' sentence_result_dropped' : '') + ' ' + (lastDroppedItem && lastItem === true && validate === false ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_wrong : '')
        }, void 0, lastDroppedItem && _jsx('div', {}, void 0, lastDroppedItem.name)), sentenceBlank.indexOf("___") !== -1 && __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('___', sentenceBlank)[1]), _jsx('i', {
            onClick: e => this.props.listenConversation(cardItmData.json.sentences[dropIndex].time_start, cardItmData.json.sentences[dropIndex].time_end, dropIndex),
            className: "fa fa-volume-up " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_sound
        }))), dropIndex % 2 !== 0 && _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_right
        }, void 0, _jsx('div', {
            className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_content, 'conver-ct'].join(' ')
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img_wrap + ' conver_img_wrap'
        }, void 0, _jsx('figure', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img + ' defaut_avt',
            style: { backgroundImage: "url(" + cardItmData.json.sentences[dropIndex].avatar !== '' ? cardItmData.json.sentences[dropIndex].avatar : '' + ")" }
        }, void 0)), _jsx('h3', {
            className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_name, 'conver-name'].join(' ')
        }, void 0, cardItmData.json.sentences[dropIndex].speaker), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_desc
        }, void 0, __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('___', sentenceBlank)[0], sentenceBlank.indexOf("___") !== -1 && _jsx('div', {
            onClick: e => this.props.onClickRevert(lastDroppedItem),
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result + ' sentence_result ' + (isActive ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_active : '') + ' ' + (lastDroppedItem ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_dropped : '') + ' ' + (lastDroppedItem && lastItem === true && validate === false ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_wrong : '')
        }, void 0, lastDroppedItem && _jsx('div', {}, void 0, lastDroppedItem.name)), sentenceBlank.indexOf("___") !== -1 && __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('___', sentenceBlank)[1]), _jsx('i', {
            onClick: e => this.props.listenConversation(cardItmData.json.sentences[dropIndex].time_start, cardItmData.json.sentences[dropIndex].time_end, dropIndex),
            className: "fa fa-volume-up " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_sound
        })))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DropTarget"])(props => props.accepts, dustbinTarget, collect)(DropConversationFillBlank));

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__ = __webpack_require__(12);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();





// import component


const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class DropCorrectBlank extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      lastItem: false
    }, _temp;
  }

  // EndAllDrop -> validate true or false
  componentWillReceiveProps(nextProps) {
    if (nextProps.endAllDrop && nextProps.endAllDrop === true) {
      this.setState({ lastItem: true });
    }
  }

  render() {
    const { accepts, isOver, canDrop,
      connectDropTarget, lastDroppedItem,
      sentenceBlank, validate } = this.props;
    const { lastItem, arrSentence } = this.state;

    const isActive = isOver && canDrop;
    return connectDropTarget(_jsx('div', {
      style: { marginBottom: 15 }
    }, void 0, __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('___', sentenceBlank)[0], _jsx('div', {
      onClick: e => this.props.onClickRevert(lastDroppedItem),
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result + ' ' + (isActive ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_active : '') + ' ' + (lastDroppedItem ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_dropped : '') + ' ' + (lastDroppedItem && lastItem === true && validate === false ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_wrong : '')
    }, void 0, lastDroppedItem && _jsx('div', {}, void 0, lastDroppedItem.name)), __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('___', sentenceBlank)[1]));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DropTarget"])(props => props.accepts, dustbinTarget, collect)(DropCorrectBlank));

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__ = __webpack_require__(12);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import component


const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

var _ref = _jsx('p', {
  className: 'guide-txt'
}, void 0, '* Click on the above words or drap and drop on this box!');

var _ref2 = _jsx('p', {
  className: 'guide-txt'
}, void 0, '* Click on these words to revert your answer!');

class DropFillBlank extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      lastItem: false
    }, _temp;
  }

  // EndAllDrop -> validate true or false
  componentWillReceiveProps(nextProps) {
    if (nextProps.endAllDrop && nextProps.endAllDrop === true) {
      this.setState({ lastItem: true });
    }
  }

  render() {
    const { accepts, isOver, canDrop,
      connectDropTarget, lastDroppedItem,
      validate, droppedBoxNames, fillBlankItem, sentence } = this.props;
    const { lastItem } = this.state;

    const isActive = isOver && canDrop;

    return connectDropTarget(_jsx('div', {
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.reorder_wrap
    }, void 0, droppedBoxNames.length === 0 && _ref, droppedBoxNames.length > 0 && _ref2, __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('___', sentence)[0], _jsx('div', {
      className: (droppedBoxNames.length === 0 ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result : __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_res) + ' ' + (droppedBoxNames.length === 0 && isActive ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_active : '')
    }, void 0, droppedBoxNames && droppedBoxNames.map((item, idx) => {
      return _jsx('div', {
        onClick: e => this.props.onClickRevert(idx, item),
        className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result + ' ' + (isActive ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_active : '') + ' ' + (droppedBoxNames.length !== 0 ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_dropped : '') + ' ' + (droppedBoxNames.length !== 0 && lastItem === true && fillBlankItem[idx].validate === false ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_wrong : '')
      }, idx, item.name);
    })), __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('___', sentence)[1]));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DropTarget"])(props => props.accepts, dustbinTarget, collect)(DropFillBlank));

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






const dustbinTarget = {
  drop(props, monitor) {
    console.log('monitor', monitor);
    props.onDrop(monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

var _ref = _jsx('p', {
  className: 'guide-txt'
}, void 0, '* Click on the above words or drap and drop on this box!');

var _ref2 = _jsx('p', {
  className: 'guide-txt bottom'
}, void 0, '* Click on these words to revert your answer!');

class DropReorderWord extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      lastItem: false
    }, _temp;
  }

  // EndAllDrop -> validate true or false
  componentWillReceiveProps(nextProps) {
    if (nextProps.endAllDrop && nextProps.endAllDrop === true) {
      this.setState({ lastItem: true });
    }
  }

  render() {
    const { accepts, isOver, canDrop,
      connectDropTarget, lastDroppedItem,
      validate, droppedBoxNames, reOrderItem } = this.props;
    const { lastItem, arrSentence } = this.state;

    const isActive = isOver && canDrop;

    return connectDropTarget(_jsx('div', {
      className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.reorder_wrap + ' ' + (isActive ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.reorder_wrap_active : '') + ' ' + (droppedBoxNames.length !== 0 ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.reorder_haschild : '')
    }, void 0, droppedBoxNames && droppedBoxNames.map((item, idx) => {
      return _jsx('div', {
        onClick: e => this.props.onClickRevert(idx, item),
        className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.order_result + ' ' + (isActive ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_active : '') + ' ' + (droppedBoxNames.length !== 0 ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_dropped : '') + ' ' + (droppedBoxNames.length !== 0 && lastItem === true && reOrderItem[idx].validate === false ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.sentence_result_wrong : '')
      }, idx, item.name);
    }), droppedBoxNames.length === 0 && _ref, droppedBoxNames.length > 0 && _ref2));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dnd__["DropTarget"])(props => props.accepts, dustbinTarget, collect)(DropReorderWord));

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







var _ref = _jsx('i', {
    className: 'fa fa-check'
});

var _ref2 = _jsx('i', {
    className: 'fa fa-times'
});

var _ref3 = _jsx('i', {
    className: 'fa fa-check'
});

var _ref4 = _jsx('i', {
    className: 'fa fa-times'
});

class ExChooseCorrectAnswer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: null,
            answerAllready: false,
            answerResult: null
        };
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    chooseAnswer(value) {
        if (this.state.answerAllready === true) {
            return;
        }

        let cardItmJson = this.props.cardItmData.json;
        let tempState = {
            answer: false,
            answerAllready: true,
            answerResult: value
        };

        // it's Right
        if (value === cardItmJson.answer) {
            tempState.answer = true;
            this.setState(tempState);
            // show button next
            $('.step-pane .ldtail-next').show();
            __WEBPACK_IMPORTED_MODULE_4__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            // Wrong
            tempState.showHint = true;
            this.setState(tempState);
            __WEBPACK_IMPORTED_MODULE_4__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
            // Wait 150ms
            // reset State.
            let _this = this;
            setTimeout(() => {
                _this.setState({
                    answer: null,
                    answerAllready: false,
                    answerResult: null
                });
            }, 1500);
        }
    }

    render() {
        const { cardItmData } = this.props;
        const { answer, answerResult } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: 'saudio-sent text-center aud-play'
        }, void 0, _jsx('div', {
            className: 'ssent-ct no-float'
        }, void 0, _jsx('div', {
            className: 'sent',
            dangerouslySetInnerHTML: { __html: cardItmData.json.sentence }
        }))), _jsx('div', {
            className: 'step-choices'
        }, void 0, cardItmData.json.options !== null && typeof cardItmData.json.options !== 'string' && cardItmData.json.options.map((item, idx) => {
            return _jsx('div', {
                onClick: e => this.chooseAnswer(item),
                className: "step-choice fullwidth " + (item === answerResult && answer === true ? 'true' : '') + (item === answerResult && answer === false ? 'wrong' : '')
            }, idx + 1, item === answerResult && answer === true && _ref, item === answerResult && answer === false && _ref2, item);
        }), cardItmData.json.options !== null && typeof cardItmData.json.options === 'string' && JSON.parse(cardItmData.json.options).map((item, idx) => {
            return _jsx('div', {
                onClick: e => this.chooseAnswer(item),
                className: "step-choice " + (item === answerResult && answer === true ? 'true' : '') + (item === answerResult && answer === false ? 'wrong' : '')
            }, idx + 1, item === answerResult && answer === true && _ref3, item === answerResult && answer === false && _ref4, item);
        }), answer === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Fail-sound.mp3' }), answer === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Correct-answer.mp3' }))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(ExChooseCorrectAnswer));

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AudioPlayer_js__ = __webpack_require__(9);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();








// import component


var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

var _ref4 = _jsx('i', {
    className: 'fa fa-check'
});

var _ref5 = _jsx('i', {
    className: 'fa fa-times'
});

var _ref6 = _jsx('i', {
    className: 'fa fa-check'
});

var _ref7 = _jsx('i', {
    className: 'fa fa-times'
});

class ExListenChooseAnswer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: null,
            answerAllready: false,
            answerResult: null,

            showHint: false
        };
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    chooseAnswer(value) {
        if (this.state.answerAllready === true) {
            return;
        }

        let cardItmJson = this.props.cardItmData.json;
        let tempState = {
            answer: false,
            answerAllready: true,
            answerResult: value,
            showHint: false
        };

        // it's Right
        if (value === cardItmJson.answer) {
            tempState.answer = true;
            this.setState(tempState);
            // show button next
            $('.step-pane .ldtail-next').show();
            __WEBPACK_IMPORTED_MODULE_5__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            // Wrong
            tempState.showHint = true;
            this.setState(tempState);
            __WEBPACK_IMPORTED_MODULE_5__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
            // Wait 150ms
            // reset State.
            let _this = this;
            setTimeout(() => {
                _this.setState({
                    answer: null,
                    answerAllready: false,
                    answerResult: null
                });
            }, 1500);
        }
    }

    render() {
        const { cardItmData } = this.props;
        const { answer, answerResult, showHint } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, _jsx('img', {
            src: cardItmData.json.image !== "" ? cardItmData.json.image : '/images/poster.jpg',
            alt: ''
        }), cardItmData.json.audio !== "" && _jsx(__WEBPACK_IMPORTED_MODULE_6__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            srcVideo: cardItmData.json.audio
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: 'saudio-sent aud-play'
        }, void 0, cardItmData.json.audio !== "" && _ref2, cardItmData.json.audio !== "" && _ref3, _jsx('div', {
            className: 'ssent-ct'
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.sentence))), _jsx('div', {
            className: 'step-choices'
        }, void 0, cardItmData.json.options !== null && typeof cardItmData.json.options !== 'string' && cardItmData.json.options.map((item, idx) => {
            return _jsx('div', {
                onClick: e => this.chooseAnswer(item),
                className: "step-choice fullwidth " + (item === answerResult && answer === true ? 'true' : '') + (item === answerResult && answer === false ? 'wrong' : '')
            }, idx + 1, item === answerResult && answer === true && _ref4, item === answerResult && answer === false && _ref5, item);
        }), cardItmData.json.options !== null && typeof cardItmData.json.options === 'string' && JSON.parse(cardItmData.json.options).map((item, idx) => {
            return _jsx('div', {
                onClick: e => this.chooseAnswer(item),
                className: "step-choice " + (item === answerResult && answer === true ? 'true' : '') + (item === answerResult && answer === false ? 'wrong' : '')
            }, idx + 1, item === answerResult && answer === true && _ref6, item === answerResult && answer === false && _ref7, item);
        })), answer === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Fail-sound.mp3' }), answer === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Correct-answer.mp3' })));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(ExListenChooseAnswer));

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DrapDropItem_DnDReorderWord_js__ = __webpack_require__(74);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import sub-comp


class ExReorderWord extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    render() {
        const { cardItmData, level, lessonId, cardId } = this.props;

        return _jsx('div', {
            className: 'step-content full-width'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__DrapDropItem_DnDReorderWord_js__["a" /* default */], {
            cardId: cardId,
            level: level,
            lessonId: lessonId,
            cardItmData: cardItmData
        })));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(ExReorderWord));

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AudioPlayer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__HintVideo__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();




// import s from './VideoQACardItem.css';


// import component




var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

var _ref4 = _jsx('i', {
    className: 'fa fa-check'
});

var _ref5 = _jsx('i', {
    className: 'fa fa-times'
});

var _ref6 = _jsx('i', {
    className: 'fa fa-check'
});

var _ref7 = _jsx('i', {
    className: 'fa fa-times'
});

class ExVideoQACardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: null,
            answerAllready: false,
            answerResult: null,

            showHint: false
        };
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    chooseAnswer(value) {
        if (this.state.answerAllready === true) {
            return;
        }

        let cardItmJson = this.props.cardItmData.json;
        let tempState = {
            answer: false,
            answerAllready: true,
            answerResult: value,
            showHint: false
        };

        // it's Right
        if (value === cardItmJson.answer) {
            tempState.answer = true;
            this.setState(tempState);
            // show button next
            $('.step-pane .ldtail-next').show();
            __WEBPACK_IMPORTED_MODULE_6__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);

            // turn on sound
            var vid = document.getElementById('record-true');
            vid.play();
        } else {
            // Wrong
            tempState.showHint = true;
            this.setState(tempState);
            __WEBPACK_IMPORTED_MODULE_6__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
            // Wait 150ms
            // reset State.
            let _this = this;
            setTimeout(() => {
                _this.setState({
                    answer: null,
                    answerAllready: false,
                    answerResult: null
                });
            }, 1500);

            // turn on sound
            var vid = document.getElementById('record-false');
            vid.play();
        }
    }

    render() {
        const { cardItmData } = this.props;
        const { answer, answerResult, showHint } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, cardItmData.json.audio_question !== '' && _jsx('div', {
            className: 'saudio-img'
        }, void 0, cardItmData.json.audio_question !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_4__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            srcVideo: cardItmData.json.audio_question
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: 'saudio-sent aud-play'
        }, void 0, cardItmData.json.audio_question !== '' && _ref2, cardItmData.json.audio_question !== '' && _ref3, _jsx('div', {
            className: 'ssent-ct'
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.question))), showHint === true && _jsx(__WEBPACK_IMPORTED_MODULE_5__HintVideo__["a" /* default */], {
            cardItmData: cardItmData,
            timeVideo: cardItmData.json.time,
            hasVideo: cardItmData.json.video ? true : false,
            srcVideo: cardItmData.json.video ? cardItmData.json.video : cardItmData.json.audio
        }), _jsx('div', {
            className: 'step-choices'
        }, void 0, cardItmData.json.options !== null && typeof cardItmData.json.options !== 'string' && cardItmData.json.options.map((item, idx) => {
            return _jsx('div', {
                onClick: e => this.chooseAnswer(item),
                className: "step-choice fullwidth " + (item === answerResult && answer === true ? 'true' : '') + (item === answerResult && answer === false ? 'wrong' : '')
            }, idx + 1, item === answerResult && answer === true && _ref4, item === answerResult && answer === false && _ref5, item);
        }), cardItmData.json.options !== null && typeof cardItmData.json.options === 'string' && JSON.parse(cardItmData.json.options).map((item, idx) => {
            return _jsx('div', {
                onClick: e => this.chooseAnswer(item),
                className: "step-choice " + (item === answerResult && answer === true ? 'true' : '') + (item === answerResult && answer === false ? 'wrong' : '')
            }, idx + 1, item === answerResult && answer === true && _ref6, item === answerResult && answer === false && _ref7, item);
        })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong'
            //autoPlay 
            , ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            id: 'record-false',
            src: '/uploads/audio/Fail-sound.mp3' }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-true',
            id: 'record-true'
            //autoPlay 
            , ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Correct-answer.mp3' })));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ExVideoQACardItem;


// withStyles(s)(ExVideoQACardItem);

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__ = __webpack_require__(9);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import component


var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

class ExpressionCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMean: false
        };
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
        __WEBPACK_IMPORTED_MODULE_4__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    // show vietnamese
    clickShowMean() {
        this.setState({ showMean: true });
    }

    render() {
        const { cardItmData } = this.props;
        const { showMean } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, _jsx('img', {
            src: cardItmData.json.image !== "" ? cardItmData.json.image : '/images/poster.jpg',
            alt: ''
        }), cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            hideVideo: () => this.hideVideo(),
            srcVideo: cardItmData.json.audio
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: "aud-play " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.lword
        }, void 0, cardItmData.json.audio !== "" && _ref2, cardItmData.json.audio !== "" && _ref3, _jsx('div', {
            className: "sword-ct " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.new_word
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans,
            onClick: e => this.clickShowMean()
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.expression)), showMean === true && _jsx('div', {
            className: 'pron'
        }, void 0, cardItmData.json.vietnamese)))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(ExpressionCardItem));

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import component




var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play no-float play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play no-float stop'
});

var _ref4 = _jsx('i', {
    className: 'fa fa-check'
});

var _ref5 = _jsx('i', {
    className: 'fa fa-times'
});

var _ref6 = _jsx('div', {
    className: 'step-choices'
}, void 0, _jsx('p', {
    className: 'text-center'
}, void 0, _jsx('input', {
    id: 'btn-submit',
    className: 'btn',
    type: 'submit',
    value: 'Submit'
})));

class FillBlankCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);

        this.state = {
            answer: null,
            answerAllready: false,
            answerResult: null,
            answerCorrect: null,

            showHint: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { cardItmData } = this.props;
        // hide button next
        $('.step-pane .ldtail-next').hide();

        // disable button submit
        $('#btn-submit').attr('disabled', 'disabled');

        // explode answer to array
        let subStr = __WEBPACK_IMPORTED_MODULE_4__helper_MHelper_js__["a" /* default */].explode('___', cardItmData.json.sentence);
        this.setState({ answerCorrect: subStr });

        if (cardItmData.json.sentence) {
            // focus input
            setTimeout(function () {
                $('#ipt_answer').focus();
            }, 500);
        }
    }

    handleChange(event) {
        this.setState({ answerResult: event.target.value.trim() });

        // remove disable button submit
        if (event.target.value.length > 0) {
            $('#btn-submit').removeAttr('disabled');
        } else {
            $('#btn-submit').attr('disabled', 'disabled');
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.answerAllready === true) {
            return;
        }

        let cardItmJson = this.props.cardItmData.json;
        let tempState = {
            answer: false,
            answerAllready: true,
            answerResult: this.state.answerResult,
            showHint: true
        };

        if (this.state.answerResult !== null && this.refs.ipt_answer.value.trim().length >= 1) {
            // show button next
            $('.step-pane .ldtail-next').show();

            // it's Right
            if (this.state.answerResult.toLowerCase() === cardItmJson.answer.toLowerCase()) {

                tempState.answer = true;
                this.setState(tempState);
                __WEBPACK_IMPORTED_MODULE_6__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
            } else {
                // Wrong
                this.setState(tempState);
                __WEBPACK_IMPORTED_MODULE_6__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
            }
        } else {
            alert('Vui lòng nhập từ bạn chọn!');
        }
    }

    render() {
        const { cardItmData } = this.props;
        const { answer, showHint, answerAllready, answerCorrect } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('form', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.fill_answer,
            onSubmit: this.handleSubmit
        }, void 0, answerAllready === false && _jsx('div', {
            className: 'saudio-img'
        }, void 0, cardItmData.json.audio !== "" && _jsx(__WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            srcVideo: cardItmData.json.audio
        })), answerAllready === false && _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: 'saudio-sent text-center aud-play'
        }, void 0, cardItmData.json.audio !== "" && _ref2, cardItmData.json.audio !== "" && _ref3, answerCorrect && _jsx('div', {
            className: 'ssent-ct no-float'
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, _jsx('span', {
            dangerouslySetInnerHTML: { __html: answerCorrect[0] }
        }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.ipt,
            id: 'ipt_answer',
            ref: 'ipt_answer',
            value: this.state.value,
            placeholder: 'Fill your words ...',
            onChange: this.handleChange }), _jsx('span', {
            dangerouslySetInnerHTML: { __html: answerCorrect[1] }
        })))), showHint === true && answerCorrect && _jsx('div', {
            className: 'answer_hint ' + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.hintFillAnswer
        }, void 0, answerAllready === true && (answer === true || answer === false) && _jsx('span', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.msg_blk
        }, void 0, _ref4, _jsx('span', {
            dangerouslySetInnerHTML: { __html: answerCorrect[0] }
        }), _jsx('span', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.txt_right
        }, void 0, cardItmData.json.answer.trim().toLowerCase()), _jsx('span', {
            dangerouslySetInnerHTML: { __html: answerCorrect[1] }
        })), answerAllready === true && answer === false && _jsx('span', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.msg_blk
        }, void 0, _ref5, _jsx('span', {
            dangerouslySetInnerHTML: { __html: answerCorrect[0] }
        }), _jsx('span', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.txt_wrong
        }, void 0, this.state.answerResult.trim().toLowerCase()), _jsx('span', {
            dangerouslySetInnerHTML: { __html: answerCorrect[1] }
        }))), answerAllready === false && _ref6, answer === false && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Fail-sound.mp3' }), answer === true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'audio-wrong',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: '/uploads/audio/Correct-answer.mp3' }))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(FillBlankCardItem));

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AudioPlayer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DrapDropItem_DnDFillBlank_js__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import component




var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play no-float play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play no-float stop'
});

class FillChooseBlankCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: null,
            answerAllready: false,
            answerResult: null
        };
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    chooseAnswer(value) {
        if (this.state.answerAllready === true) {
            return;
        }

        let cardItmJson = this.props.cardItmData.json;
        let tempState = {
            answer: false,
            answerAllready: true,
            answerResult: value
        };

        // it's Right
        if (value === cardItmJson.answer) {
            tempState.answer = true;
            this.setState(tempState);
            __WEBPACK_IMPORTED_MODULE_6__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
            // show button next
            $('.step-pane .ldtail-next').show();
        } else {
            // Wrong
            tempState.showHint = true;
            this.setState(tempState);
            __WEBPACK_IMPORTED_MODULE_6__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
            // Wait 150ms
            // reset State.
            let _this = this;
            setTimeout(() => {
                _this.setState({
                    answer: null,
                    answerAllready: false,
                    answerResult: null
                });
            }, 1500);
        }
    }

    render() {
        const { cardItmData } = this.props;
        const { answer, answerResult } = this.state;

        return _jsx('div', {
            className: 'step-content full-width'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word saudio-roleplay w400'
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_4__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            srcVideo: cardItmData.json.audio
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: 'saudio-sent text-center aud-play'
        }, void 0, cardItmData.json.audio !== "" && _ref2, cardItmData.json.audio !== "" && _ref3, _jsx('div', {
            className: 'ssent-ct no-float'
        }, void 0))), _jsx(__WEBPACK_IMPORTED_MODULE_5__DrapDropItem_DnDFillBlank_js__["a" /* default */], {
            cardItmData: cardItmData
        }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(FillChooseBlankCardItem));

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_MHelper_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__routes_modules_Auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_redux__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import helper





// redux



var _ref = _jsx('svg', {
    id: 'icon_stars',
    viewBox: '0 0 345 215',
    width: '100%',
    height: '100%'
}, void 0, _jsx('title', {}, void 0, 'Artboard 1'), _jsx('path', {
    d: 'M285.788 40l-5.692 11.52L268 53.68l7.827 9.36L274.404 76l11.384-5.76L298.596 76l-2.846-13.68 9.25-8.64-12.808-2.16L285.788 40zM26.173 76l-2.615 5.44L18 82.46l3.596 4.42-.654 6.12 5.231-2.72L32.058 93l-1.308-6.46L35 82.46l-5.885-1.02L26.173 76zm64.942-1l-7.077 14.4L69 92.1l9.73 11.7-1.768 16.2 14.153-7.2 15.923 7.2-3.538-17.1L115 92.1l-15.923-2.7L91.115 75zm25.308-50l-4.615 9.28L102 36.02l6.346 7.54L107.192 54l9.231-4.64L126.808 54 124.5 42.98l7.5-6.96-10.385-1.74-5.192-9.28zM53.077 133l-7.385 15.04L30 150.86l10.154 12.22L38.308 180l14.769-7.52L69.692 180 66 162.14l12-11.28-16.615-2.82L53.077 133zM230.615 8l-3.077 6.4L221 15.6l4.23 5.2-.768 7.2 6.153-3.2 6.923 3.2L236 20.4l5-4.8-6.923-1.2-3.462-6.4zM199 32l-8 16-17 3 11 13-2 18 16-8 18 8-4-19 13-12-18-3-9-16zm110 97l-8 16.32-17 3.06 11 13.26-2 18.36 16-8.16 18 8.16-4-19.38 13-12.24-18-3.06-9-16.32zm-2.712-41l-1.692 3.52-3.596.66 2.327 2.86-.423 3.96 3.384-1.76 3.808 1.76-.846-4.18 2.75-2.64-3.808-.66-1.904-3.52z'
}));

class FinishCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: null,
            nextId: null,
            hasNextCard: false,
            isPass: false,
            correctAnswer: 0,
            totalAnswer: 0
        };
    }

    componentDidMount() {
        // get profile
        let userProfile = JSON.parse(localStorage.getItem('infoProfile'));
        this.setState({ userProfile: userProfile });

        // count correct answers then check test isPass or not
        let correctAnswer = __WEBPACK_IMPORTED_MODULE_6__actions_result__["a" /* countAnswer */](this.props.level, this.props.lessonId, this.props.cardId, 1);
        let wrongAnswer = __WEBPACK_IMPORTED_MODULE_6__actions_result__["a" /* countAnswer */](this.props.level, this.props.lessonId, this.props.cardId, 0);
        let totalAnswer = correctAnswer + wrongAnswer;

        this.setState({ correctAnswer: correctAnswer });
        this.setState({ totalAnswer: totalAnswer });
        let percentCorrect = correctAnswer / totalAnswer;
        if (percentCorrect >= 0.8) {
            // only pass when percent correct >= 80%
            this.setState({ isPass: true });
        }

        // get lessons
        let lessonInfo = JSON.parse(localStorage.getItem('infoLesson'));
        if (lessonInfo.cardNext) {
            this.setState({
                nextId: lessonInfo.cardNext[0].id,
                hasNextCard: true
            });
        }
    }

    nextLession() {
        //hasNextCard
        let url = '/lesson/' + this.state.nextId + '/level/' + this.context.level + '/' + this.context.lessonId;
        let learn_result = __WEBPACK_IMPORTED_MODULE_6__actions_result__["b" /* getLearnResult */](this.context.level, this.context.lessonId);
        if (learn_result !== null) {
            let params = {};
            params.learn_result = learn_result;
            params.access_token = __WEBPACK_IMPORTED_MODULE_8__routes_modules_Auth__["a" /* default */].getToken();
            let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
            params.user_id = userInfo.id;
            this.props.postUserResult(params, url);
        }
    }

    tryAgain() {
        //rsActions.resetCard(this.props.level, this.props.lessonId, this.props.cardId);
        //let url = '/lesson/' + this.props.lesson.card[0].id + '/level/' + this.context.level + '/' + this.context.lessonId;
        //history.pushState(null, url);
        window.location.reload();
    }

    render() {
        const { lesson } = this.props;
        const { userProfile, nextId, hasNextCard, isPass, correctAnswer } = this.state;

        return _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a.finish_wrap
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a.result_circle
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a.result_star
        }, void 0, _jsx('span', {
            className: __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a.icon
        }, void 0, _ref)), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a.result_status
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a.score
        }, void 0, _jsx('span', {}, void 0, this.state.correctAnswer), 'out of ', this.state.totalAnswer))), _jsx('h1', {
            className: __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a.result_title
        }, void 0, isPass ? 'Fantastic work!' : 'Nearly there!', ' ', userProfile && userProfile.name), _jsx('h2', {
            className: __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a.result_subtitle
        }, void 0, isPass ? "You’re ready for the next unit!" : "You just need a bit more practice with this unit!"), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a.button_wrap
        }, void 0, hasNextCard === true && isPass === true && _jsx('span', {
            className: 'btn',
            onClick: () => this.nextLession()
        }, void 0, 'Continue'), hasNextCard === false && isPass === true && _jsx('span', {
            className: 'btn',
            onClick: () => this.nextLession()
        }, void 0, 'Finish'), isPass === false && _jsx('span', {
            className: 'btn',
            onClick: () => this.tryAgain()
        }, void 0, 'Try Again')));
    }
}

FinishCardItem.contextTypes = {
    level: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    lessonId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

// Get return data, must register in reducer
function mapStateToProps(state) {
    const { result } = state.result;
    return {
        result
    };
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
    return {
        postUserResult: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_6__actions_result__["c" /* postUserResult */], dispatch)
    };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__FinishCardItem_css___default.a)(FinishCardItem)));

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







class GrammarCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMean: false
        };
    }

    // show vietnamese
    clickShowMean() {
        this.setState({ showMean: true });
    }

    componentDidMount() {
        // hide button next
        //$('.step-pane .ldtail-next').hide();
        __WEBPACK_IMPORTED_MODULE_4__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
    }

    render() {
        const { cardItmData } = this.props;
        const { showMean } = this.state;
        return _jsx('div', {
            className: 'step-content lesson-grammar'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: "aud-play " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.lword
        }, void 0, _jsx('div', {
            className: "sword-ct " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.new_word
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans,
            onClick: e => this.clickShowMean()
        }, void 0, _jsx('div', {
            className: 'sent',
            dangerouslySetInnerHTML: { __html: cardItmData.json.grammar }
        }), _jsx('div', {}, void 0, cardItmData.json.description)), showMean === true && _jsx('div', {
            className: 'pron'
        }, void 0, cardItmData.json.vietnamese)))), _jsx('div', {
            className: 'grammar-ex',
            style: { overflow: 'hidden' }
        }, void 0, cardItmData.json.sentence !== null && typeof cardItmData.json.sentence === 'object' && cardItmData.json.sentence.map((item, idx) => {
            return _jsx('div', {
                className: 'saudio-sent audno-play'
            }, idx + 1, _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans
            }, void 0, _jsx('div', {
                className: 'sent'
            }, void 0, item)));
        })));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(GrammarCardItem));

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__ = __webpack_require__(9);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import component


var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

class GrammarListeningCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMean: false
        };
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
        __WEBPACK_IMPORTED_MODULE_4__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    // show vietnamese
    clickShowMean() {
        this.setState({ showMean: true });
    }

    render() {
        const { cardItmData } = this.props;
        const { showMean } = this.state;

        return _jsx('div', {
            className: 'step-content lesson-grammar'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, _jsx('div', {
            className: "sword-ct " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.new_word
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans
        }, void 0, _jsx('div', {
            className: 'sent',
            dangerouslySetInnerHTML: { __html: cardItmData.json.grammar }
        }), _jsx('div', {}, void 0, cardItmData.json.description))), cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            hideVideo: () => this.hideVideo(),
            srcVideo: cardItmData.json.audio
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: "aud-play " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.lword
        }, void 0, cardItmData.json.audio !== "" && _ref2, cardItmData.json.audio !== "" && _ref3, _jsx('div', {
            className: "sword-ct " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.new_word
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.sentence))))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(GrammarListeningCardItem));

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AudioPlayer_js__ = __webpack_require__(9);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import component


var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

class RecordCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
        this.state = {
            appIsMounted: false,
            showMean: false,
            showTranslate: false
        };
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();

        requestAnimationFrame(() => {
            this.setState({ appIsMounted: true });
        });
    }

    // video finsh
    hideVideo() {}
    // // show button next
    // $('.step-pane .ldtail-next').show();


    // event click show mean
    clickShowMean() {}
    // this.setState({showMean: true})


    // event show vietnamese
    clickShowVN() {
        this.setState({ showTranslate: true });
    }

    render() {
        const { cardItmData } = this.props;
        const { showMean, showTranslate } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word saudio-sml'
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.record_img
        }, void 0, _jsx('img', {
            src: cardItmData.json.image !== "" ? cardItmData.json.image : '/images/poster.jpg',
            alt: ''
        })), cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_4__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            hideVideo: () => this.hideVideo(),
            srcVideo: cardItmData.json.audio
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: "aud-play " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.lword
        }, void 0, cardItmData.json.audio !== "" && _ref2, cardItmData.json.audio !== "" && _ref3, _jsx('div', {
            className: "sword-ct "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans,
            onClick: e => this.clickShowMean()
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.sentence, cardItmData.json.pronunciation && _jsx('span', {
            className: "pronunciation"
        }, void 0, '/ ', cardItmData.json.pronunciation, ' /'))), cardItmData.json.means && _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans + " pron",
            onClick: e => this.clickShowVN()
        }, void 0, cardItmData.json.means), showTranslate === true && cardItmData.json.vietnamese && _jsx('div', {
            className: 'pron'
        }, void 0, cardItmData.json.vietnamese)), this.state.appIsMounted && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__webpack_require__(68).default, this.props))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(RecordCardItem));

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_video_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__ = __webpack_require__(18);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import helper


class RoleplayAudioPlayerNoAutoplay extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.audioInit();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playerTime && nextProps.playerTime !== null) {

            if (nextProps.stopVideo !== true) {
                let time_start = nextProps.playerTime.time_start;
                this.player.endTime = nextProps.playerTime.time_end ? nextProps.playerTime.time_end : this.player.duration();
                //console.log('time_start', time_start);
                // start time
                this.player.currentTime(time_start);
                this.player.play();

                // change icon
                $('#' + this.props.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
            }
        }
    }

    audioInit() {
        // instantiate video.js
        let _thisComp = this.props;

        this.player = __WEBPACK_IMPORTED_MODULE_4_video_js___default()(this.nodePlayer, {
            autoplay: false,
            controls: true,
            sources: [{
                src: this.props.srcVideo,
                type: 'audio/mp3'
            }]
        }, function onPlayerReady() {
            // console.log('onPlayerReady', this)

            // autoplay on mobile
            if (__WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__["a" /* isMobile */].any()) {
                setTimeout(() => {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').click();
                }, 200);
            }

            // end time
            this.endTime = 0;
            this.senIdx = 0;

            // * Watch Duration of Media Playing.
            this.on('timeupdate', function () {
                //console.log('this.currentTime()', this.currentTime());
                if (this.endTime === 0) {
                    //console.log('Chay 0', this.senIdx );
                    if (this.senIdx < _thisComp.sentencesList.length) {

                        if (this.senIdx > _thisComp.countSentence + 1) {
                            this.pause();
                            this.endTime = 0;
                            this.senIdx = 0;
                            this.currentTime(0);

                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');

                            // icon pause for role 2
                            if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                            }

                            if (_thisComp.hideVideo) {
                                _thisComp.hideVideo();
                            }

                            return;
                        }

                        //Stop when go to next sen
                        if (this.currentTime() >= _thisComp.sentencesList[this.senIdx].time_start - 0.55) {
                            _thisComp.onStartPlay(this.senIdx);
                            this.senIdx++;
                        }
                    }
                    return;
                }

                if (this.currentTime() >= this.endTime) {
                    this.pause();
                    this.endTime = 0;
                    this.senIdx = 0;
                    this.currentTime(0);

                    // change icon
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');

                    // icon pause for role 2
                    if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                    }

                    if (_thisComp.resetStatus) {
                        _thisComp.resetStatus();
                    }
                }
            });

            // set start and end video
            if (_thisComp.timeVideo) {
                let timeVideo = _thisComp.timeVideo;

                // start time
                this.currentTime(timeVideo[0]);

                // end time
                this.on('timeupdate', function () {
                    if (this.currentTime() > timeVideo[1]) {
                        this.pause();

                        // change icon
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                        // icon pause for role 2
                        if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                        }
                    }
                });
            }

            // change icon
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
            // icon pause for role 2
            if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
            }

            let _this = this;
            // click play
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').on('click', function (e) {
                //this.currentTime(0);
                _this.play();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
                }
            });
            // click stop
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').on('click', function (e) {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                }
                _thisComp.resetStatus();
            });

            // click pause
            if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').on('click', function (e) {

                    _this.pause();
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                });
            }

            //finished video
            this.on('ended', function () {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                // change icon
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                }

                // update props
                if (_thisComp.hideVideo) {
                    _thisComp.hideVideo();
                }
            });
        });
    }
    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return _jsx('div', {
            'data-vjs-player': true
        }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { ref: n => this.nodePlayer = n, className: 'video-js vjs-default-skin audio-js' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(RoleplayAudioPlayerNoAutoplay));

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RoleplayVideoPlayer_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AudioNoAutoplay_js__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DrapDropItem_DnDConversationFillBlank_js__ = __webpack_require__(71);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import component




var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play play'
});

var _ref3 = _jsx('span', {
    title: 'Stop',
    className: 'saudio-play pause'
});

var _ref4 = _jsx('span', {
    title: 'Pause',
    className: 'saudio-play stop'
});

var _ref5 = _jsx('span', {
    className: 'saudio-play no-float play'
});

var _ref6 = _jsx('span', {
    title: 'Stop',
    className: 'saudio-play no-float pause'
});

var _ref7 = _jsx('span', {
    title: 'Pause',
    className: 'saudio-play no-float stop'
});

class ConversationFillBlank extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerTime: null,
            finshedVideo: false,
            activeUser: null,
            stopVideo: false
        };
    }

    // event click icon sound
    listenConversation(time_start, time_end, index) {
        // if(this.state.finshedVideo === false) { return; }

        if (time_start) {
            if (!time_end) {
                time_end = 0;
            }
            let timeline = {
                time_start: time_start,
                time_end: time_end
            };

            this.setState({
                playerTime: timeline,
                activeUser: index,
                stopVideo: false
            });
            // console.log('timeline', timeline);
        }
    }

    componentDidMount() {
        console.log(this.props.cardItmData.json.sentences);
        // hide button next
        $('.step-pane .ldtail-next').hide();
        // $('body').find('.conversation-list .conv-itm').eq(0).addClass('conver_active');
    }

    // video finsh
    hideVideo() {
        this.setState({ finshedVideo: true });
        // $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        // show button next
        $('.step-pane .ldtail-next').show();
    }

    resetStatus() {
        // $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        this.setState({ activeUser: null, stopVideo: true });
    }

    startPlayInit(idx) {
        // console.log('this.props.cardItmData', this.props.cardItmData);
        if (!this.props.cardItmData.json.sentences.length) {
            return;
        }
        // $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        // $('body').find('.conversation-list .conv-itm').eq(idx).addClass('conver_active');
    }

    render() {
        const { cardItmData, level, lessonId, cardId } = this.props;
        const { playerTime, finshedVideo, activeUser, stopVideo } = this.state;

        return _jsx('div', {}, void 0, _jsx('div', {
            className: "step-content " + (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '' ? 'has-video ' : '')
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: "saudio-word hidden " + (cardItmData.json.video === '' && cardItmData.json.audio !== '' ? 'saudio-roleplay' : '')
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '') && _jsx(__WEBPACK_IMPORTED_MODULE_4__RoleplayVideoPlayer_js__["a" /* default */], {
            videoId: 'role-video-player-' + cardItmData.id,
            playerTime: playerTime,
            stopVideo: stopVideo,
            hideVideo: () => this.hideVideo(),
            resetStatus: () => this.resetStatus(),
            poster: '/images/poster.jpg',
            onStartPlay: i => this.startPlayInit(i),
            sentencesList: cardItmData.json.sentences,
            srcVideo: cardItmData.json.video
        }, 'converfil-' + cardItmData.id), cardItmData.json.video === '' && cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_5__AudioNoAutoplay_js__["a" /* default */], {
            audioId: 'role-audio-player-' + cardItmData.id,
            playerTime: playerTime,
            stopVideo: stopVideo,
            hideVideo: () => this.hideVideo(),
            resetStatus: () => this.resetStatus(),
            onStartPlay: i => this.startPlayInit(i),
            sentencesList: cardItmData.json.sentences,
            srcVideo: cardItmData.json.audio
        }, 'converfil-' + cardItmData.id)), (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '') && _jsx('div', {
            id: 'role-video-player-' + cardItmData.id,
            className: 'sword-ct vd-play'
        }, void 0, _ref2, _ref3, _ref4), cardItmData.json.video === '' && cardItmData.json.audio !== '' && _jsx('div', {
            id: 'role-audio-player-' + cardItmData.id,
            className: "saudio-sent text-center aud-play "
        }, void 0, _ref5, _ref6, _ref7))), _jsx(__WEBPACK_IMPORTED_MODULE_6__DrapDropItem_DnDConversationFillBlank_js__["a" /* default */], {
            cardId: cardId,
            level: level,
            lessonId: lessonId,
            finshedVideo: finshedVideo,
            listenConversation: (time_start, time_end, index) => this.listenConversation(time_start, time_end, index),
            activeUser: activeUser,
            cardItmData: cardItmData
        }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(ConversationFillBlank));

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__RoleplayVideoPlayer_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Role2AudioPlayer_js__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ExRoleplayRepeat_js__ = __webpack_require__(100);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import component




var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play stop'
});

var _ref4 = _jsx('span', {
    className: 'saudio-play no-float play'
});

var _ref5 = _jsx('span', {
    className: 'saudio-play no-float stop'
});

class ExRoleplay extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerTime: null,
            finshedVideo: false,
            activeUser: null,
            stopVideo: false,
            indexUser: null,
            userSpeaker: null,
            countSentence: 0,
            dataSentence: [],
            arrRecord: [],
            idxRecord: -1
        };
    }

    // event click icon sound
    listenConversation(time_start, time_end, index) {
        // if(this.state.finshedVideo === false) { return; }

        if (time_start) {
            if (!time_end) {
                time_end = 0;
            }
            let timeline = {
                time_start: time_start,
                time_end: time_end
            };

            this.setState({
                playerTime: timeline,
                activeUser: index,
                stopVideo: false,
                indexUser: index
            });
            // console.log('timeline', timeline);
        }
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
        // $('body').find('.conversation-list .conv-itm').eq(0).addClass('conver_active');
    }

    // video finsh
    hideVideo() {
        this.setState({ finshedVideo: true, idxRecord: -1 });
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        __WEBPACK_IMPORTED_MODULE_4__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    resetStatus() {
        this.setState({ activeUser: null, stopVideo: true });
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
    }

    startPlayInit(idx) {
        // console.log('this.props.cardItmData', this.props.cardItmData);
        if (!this.props.cardItmData.json.sentences.length) {
            return;
        }
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        $('body').find('.conversation-list .conv-itm').eq(idx).addClass('conver_active');
    }

    // Chép cai này thanh helper dum ah, helper array
    countItemByVal(arrayV, callbackFnc) {
        if (!arrayV.length) {
            return;
        }
        let count = 0;
        arrayV.map((itm, i) => {
            count += callbackFnc(itm, i);
        });

        return count;
    }

    // click choose teacher
    chooseSpeaker(user_speaker) {
        const { cardItmData } = this.props;

        let meetRole = 0;
        let newArrSentences = [];
        let indxNewArray = -1;
        let speakTime = this.countItemByVal(cardItmData.json.sentences, (itm, i) => {
            // console.log('itm.speaker', itm.speaker);
            if (itm.speaker == user_speaker) {
                return 1;
            } else {
                return 0;
            }
        });
        let senPerGrp = Math.ceil(cardItmData.json.sentences.length / speakTime);

        // Find Speaker
        let limitSep = 2;
        cardItmData.json.sentences.map((item, idx) => {
            if (indxNewArray > 0) {
                limitSep = 1;
            }
            if (item.speaker === user_speaker) {
                meetRole++;
            }

            if (meetRole >= limitSep) {
                newArrSentences.push([item]);
                indxNewArray++;
                meetRole = 0;
            } else if (indxNewArray < 0 && meetRole < 2) {
                newArrSentences.push([item]);
                indxNewArray = 0;
                // console.log(indxNewArray);
            } else if (indxNewArray >= 0 && meetRole < 2) {
                newArrSentences[indxNewArray].push(item);
            }

            if (idx > 0 && newArrSentences[indxNewArray].length >= senPerGrp) {
                meetRole++;
            }
        });
        this.setState({ userSpeaker: user_speaker, dataSentence: newArrSentences });
    }

    // save url record
    saveRecord(urlRecord) {
        this.state.arrRecord.push(urlRecord);
    }

    submitAnswer() {
        // disabled button submit
        $('.submit-button').find('.btn').addClass('disabled');

        this.setState({ countSentence: this.state.countSentence + 1 });

        if (this.state.countSentence + 1 >= this.state.dataSentence.length) {
            // show button next
            $('.step-pane .ldtail-next').show();
        }
    }

    // start recording
    startAudioRecord() {
        this.setState({ idxRecord: this.state.idxRecord + 1 });
    }

    render() {
        const { cardItmData } = this.props;
        const { playerTime, finshedVideo,
            activeUser, stopVideo,
            userSpeaker, indexUser,
            countSentence, dataSentence } = this.state;

        return _jsx('div', {}, void 0, countSentence === dataSentence.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { key: 'record-audio-1',
            autoPlay: true,
            ref: 'audioRecord',
            controls: 'controls',
            className: 'hidden',
            src: this.state.arrRecord[this.state.idxRecord] }), userSpeaker === null && _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.teacher_wrap
        }, void 0, _jsx('h3', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.teacher_ttl
        }, void 0, 'Choose your character'), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.teacher_desc
        }, void 0, 'You meet an English teacher called ', cardItmData.json.user_speaker[0], '. ', cardItmData.json.user_speaker[0], ' wants to get to know you.'), _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.teacher_img_wrap
        }, void 0, cardItmData.json.user_speaker.map((item, idx) => {
            return _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.teach_item
            }, idx + 1, _jsx('figure', {
                onClick: () => this.chooseSpeaker(item),
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.teacher_img + ' defaut_avt'
            }), _jsx('span', {}, void 0, item));
        }))), userSpeaker !== null && _jsx('div', {
            className: "step-content " + (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '' ? 'has-video ' : '')
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: "saudio-word hidden " + (cardItmData.json.video === '' && cardItmData.json.audio !== '' ? 'saudio-roleplay' : '')
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '') && _jsx(__WEBPACK_IMPORTED_MODULE_5__RoleplayVideoPlayer_js__["a" /* default */], {
            videoId: 'role-video-player-' + cardItmData.id,
            playerTime: playerTime,
            stopVideo: stopVideo,
            hideVideo: () => this.hideVideo(),
            resetStatus: () => this.resetStatus(),
            poster: '/images/poster.jpg',
            srcVideo: cardItmData.json.video,
            sentencesList: cardItmData.json.sentences
        }), cardItmData.json.video === '' && cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_6__Role2AudioPlayer_js__["a" /* default */], {
            audioId: 'role-audio-player-' + cardItmData.id,
            playerTime: playerTime,
            stopVideo: stopVideo,
            userSpeaker: userSpeaker,
            hideVideo: () => this.hideVideo(),
            resetStatus: () => this.resetStatus(),
            srcVideo: cardItmData.json.audio,
            countSentence: countSentence,
            dataSentence: dataSentence,
            sentencesList: dataSentence[countSentence],
            originalData: cardItmData.json.sentences,
            onStartPlay: i => this.startPlayInit(i),
            startAudioRecord: () => this.startAudioRecord()
        })), (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '') && _jsx('div', {
            id: 'role-video-player-' + cardItmData.id,
            className: 'sword-ct vd-play hidden'
        }, void 0, _ref2, _ref3), cardItmData.json.video === '' && cardItmData.json.audio !== '' && _jsx('div', {
            id: 'role-audio-player-' + cardItmData.id,
            className: "saudio-sent text-center aud-play hidden "
        }, void 0, _ref4, _ref5))), userSpeaker !== null && _jsx(__WEBPACK_IMPORTED_MODULE_7__ExRoleplayRepeat_js__["a" /* default */], {
            userSpeaker: userSpeaker,
            countSentence: countSentence,
            cardItmData: dataSentence[countSentence],
            dataSentence: dataSentence,
            finshedVideo: finshedVideo,
            originalData: cardItmData,
            indexUser: indexUser,
            stopVideo: stopVideo,
            listenConversation: (time_start, time_end, index) => this.listenConversation(time_start, time_end, index),
            activeUser: activeUser,
            saveRecord: urlRecord => this.saveRecord(urlRecord)
        }), userSpeaker !== null && countSentence < dataSentence.length && _jsx('div', {
            className: "text-center "
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.button_wrap + ' submit-button'
        }, void 0, _jsx('span', {
            onClick: () => this.submitAnswer(),
            className: 'btn disabled'
        }, void 0, 'Continue'))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(ExRoleplay));

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






class ExRoleplayRepeat extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            userProfile: null
        };
        this.state = { appIsMounted: false };
    }

    componentDidMount() {
        // get profile
        let userProfile = JSON.parse(localStorage.getItem('infoProfile'));
        this.setState({ userProfile: userProfile });

        requestAnimationFrame(() => {
            this.setState({ appIsMounted: true });
        });
    }

    render() {
        const { cardItmData, finshedVideo,
            activeUser, stopVideo,
            indexUser, userSpeaker,
            countSentence, dataSentence,
            originalData } = this.props;
        const { userProfile } = this.state;

        return _jsx('div', {
            className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conversation_wrap, __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.role_wrap, 'conversation-list'].join(' ')
        }, void 0, cardItmData && countSentence < dataSentence.length && cardItmData.map((item, idx) => {
            {/* if(idx > countSentence) { return;} */}

            return _jsx('div', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_item, 'clearfix', 'conv-itm', activeUser === idx ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_active : ''].join(' ')
            }, idx + 1, idx % 2 === 0 && _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_left + ' conver_left'
            }, void 0, _jsx('div', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_content, 'conver-ct'].join(' ')
            }, void 0, _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img_wrap + ' conver_img_wrap'
            }, void 0, _jsx('figure', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img + ' defaut_avt',
                style: { backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")" }
            }, void 0)), _jsx('h3', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_name, 'conver-name'].join(' ')
            }, void 0, item.speaker === 'Your_Name' ? userProfile && userProfile.name : item.speaker), _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_desc
            }, void 0, item.sentence), item.speaker !== userSpeaker && _jsx('i', {
                onClick: e => this.props.listenConversation(item.time_start, item.time_end, idx),
                className: "fa fa-volume-up " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_sound
            }), this.state.appIsMounted && item.speaker === userSpeaker && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__webpack_require__(37).default, {
                onSaveRecord: urlRecord => this.props.saveRecord(urlRecord),
                dataSentence: dataSentence,
                countSentence: countSentence,
                time_start: item.time_start,
                time_end: item.time_end,
                id: 'speaker-' + item.speaker + '-' + (idx + countSentence),
                key: 'speaker-' + item.speaker + (idx + countSentence)
            }))), idx % 2 !== 0 && _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_right
            }, void 0, _jsx('div', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_content, 'conver-ct'].join(' ')
            }, void 0, _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img_wrap + ' conver_img_wrap'
            }, void 0, _jsx('figure', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img + ' defaut_avt',
                style: { backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")" }
            }, void 0)), _jsx('h3', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_name, 'conver-name'].join(' ')
            }, void 0, item.speaker === 'Your_Name' ? userProfile && userProfile.name : item.speaker), _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_desc
            }, void 0, item.sentence), item.speaker !== userSpeaker && _jsx('i', {
                onClick: e => this.props.listenConversation(item.time_start, item.time_end, idx),
                className: "fa fa-volume-up " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_sound
            }), this.state.appIsMounted && item.speaker === userSpeaker && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__webpack_require__(37).default, {
                onSaveRecord: urlRecord => this.props.saveRecord(urlRecord),
                dataSentence: dataSentence,
                countSentence: countSentence,
                time_start: item.time_start,
                time_end: item.time_end,
                id: 'speaker-' + item.speaker + (idx + countSentence),
                key: 'speaker-' + item.speaker + (idx + countSentence)
            }))));
        }), originalData && countSentence === dataSentence.length && originalData.json.sentences.map((item, idx) => {
            return _jsx('div', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_item, 'clearfix', 'conv-itm', activeUser === idx ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_active : ''].join(' ')
            }, idx + 1, idx % 2 === 0 && _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_left + ' conver_left'
            }, void 0, _jsx('div', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_content, 'conver-ct'].join(' ')
            }, void 0, _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img_wrap + ' conver_img_wrap'
            }, void 0, _jsx('figure', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img + ' defaut_avt',
                style: { backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")" }
            }, void 0)), _jsx('h3', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_name, 'conver-name'].join(' ')
            }, void 0, item.speaker === 'Your_Name' ? userProfile && userProfile.name : item.speaker), _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_desc
            }, void 0, item.sentence))), idx % 2 !== 0 && _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_right
            }, void 0, _jsx('div', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_content, 'conver-ct'].join(' ')
            }, void 0, _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img_wrap + ' conver_img_wrap'
            }, void 0, _jsx('figure', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img + ' defaut_avt',
                style: { backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")" }
            }, void 0)), _jsx('h3', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_name, 'conver-name'].join(' ')
            }, void 0, item.speaker === 'Your_Name' ? userProfile && userProfile.name : item.speaker), _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_desc
            }, void 0, item.sentence))));
        }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(ExRoleplayRepeat));

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RoleplayVideoPlayer_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__RoleplayAudioPlayer_js__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__RepeatConversation_js__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import component





var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play play'
});

var _ref3 = _jsx('span', {
    title: 'Stop',
    className: 'saudio-play stop'
});

var _ref4 = _jsx('span', {
    title: 'Pause',
    className: 'saudio-play pause'
});

var _ref5 = _jsx('span', {
    className: 'saudio-play no-float play'
});

var _ref6 = _jsx('span', {
    title: 'Stop',
    className: 'saudio-play no-float stop'
});

var _ref7 = _jsx('span', {
    title: 'Pause',
    className: 'saudio-play no-float pause'
});

class LConversation extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerTime: null,
            finshedVideo: false,
            activeUser: null,
            stopVideo: false
        };
    }

    // event click icon sound
    listenConversation(time_start, time_end, index) {
        if (this.state.finshedVideo === false) {
            return;
        }

        if (time_start) {
            if (!time_end) {
                time_end = 0;
            }
            let timeline = {
                time_start: time_start,
                time_end: time_end
            };

            this.setState({
                playerTime: timeline,
                activeUser: index,
                stopVideo: false
            });
            // console.log('timeline', timeline);
        }
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
        $('body').find('.conversation-list .conv-itm').eq(0).addClass('conver_active');
    }

    // video finsh
    hideVideo() {
        this.setState({ finshedVideo: true });
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        // show button next
        $('.step-pane .ldtail-next').show();
        // save result
        __WEBPACK_IMPORTED_MODULE_7__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    resetStatus() {
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        this.setState({ activeUser: null, stopVideo: true });
    }

    startPlayInit(idx) {
        // console.log('this.props.cardItmData', this.props.cardItmData);
        if (!this.props.cardItmData.json.sentences.length) {
            return;
        }
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        $('body').find('.conversation-list .conv-itm').eq(idx).addClass('conver_active');
    }

    render() {
        const { cardItmData } = this.props;
        const { playerTime, finshedVideo, activeUser, stopVideo } = this.state;

        return _jsx('div', {}, void 0, _jsx('div', {
            className: "step-content " + (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '' ? 'has-video ' : '')
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: "saudio-word " + (cardItmData.json.video === '' && cardItmData.json.audio !== '' ? 'saudio-roleplay' : '')
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '') && _jsx(__WEBPACK_IMPORTED_MODULE_4__RoleplayVideoPlayer_js__["a" /* default */], {
            videoId: 'role-video-player-' + cardItmData.id,
            playerTime: playerTime,
            stopVideo: stopVideo,
            hideVideo: () => this.hideVideo(),
            resetStatus: () => this.resetStatus(),
            poster: '/images/poster.jpg',
            srcVideo: cardItmData.json.video,
            sentencesList: cardItmData.json.sentences,
            onStartPlay: i => this.startPlayInit(i)
        }, 'converfil-' + cardItmData.id), cardItmData.json.video === '' && cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_5__RoleplayAudioPlayer_js__["a" /* default */], {
            audioId: 'role-audio-player-' + cardItmData.id,
            playerTime: playerTime,
            stopVideo: stopVideo,
            hideVideo: () => this.hideVideo(),
            resetStatus: () => this.resetStatus(),
            srcVideo: cardItmData.json.audio,
            sentencesList: cardItmData.json.sentences,
            onStartPlay: i => this.startPlayInit(i)
        }, 'converfil-' + cardItmData.id)), (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '') && _jsx('div', {
            id: 'role-video-player-' + cardItmData.id,
            className: 'sword-ct vd-play'
        }, void 0, _ref2, _ref3, _ref4), cardItmData.json.video === '' && cardItmData.json.audio !== '' && _jsx('div', {
            id: 'role-audio-player-' + cardItmData.id,
            className: "saudio-sent text-center aud-play "
        }, void 0, _ref5, _ref6, _ref7))), _jsx(__WEBPACK_IMPORTED_MODULE_6__RepeatConversation_js__["a" /* default */], {
            cardItmData: cardItmData,
            finshedVideo: finshedVideo,
            listenConversation: (time_start, time_end, index) => this.listenConversation(time_start, time_end, index),
            activeUser: activeUser
        }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(LConversation));

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






class RepeatConversation extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { cardItmData, finshedVideo, activeUser } = this.props;

        return _jsx('div', {
            className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conversation_wrap, 'conversation-list'].join(' ')
        }, void 0, cardItmData.json.sentences && cardItmData.json.sentences.map((item, idx) => {
            return _jsx('div', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_item, 'clearfix', 'conv-itm', activeUser === idx ? __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_active : ''].join(' ')
            }, idx + 1, idx % 2 === 0 && _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_left
            }, void 0, _jsx('div', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_content, 'conver-ct'].join(' ')
            }, void 0, _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img_wrap + ' conver_img_wrap'
            }, void 0, _jsx('figure', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img + ' defaut_avt',
                style: { backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")" }
            }, void 0)), _jsx('h3', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_name, 'conver-name'].join(' ')
            }, void 0, item.speaker), _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_desc
            }, void 0, item.sentence), finshedVideo === true && _jsx('i', {
                onClick: e => this.props.listenConversation(item.time_start, item.time_end, idx),
                className: "fa fa-volume-up " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_sound
            }))), idx % 2 !== 0 && _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_right
            }, void 0, _jsx('div', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_content, 'conver-ct'].join(' ')
            }, void 0, _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img_wrap + ' conver_img_wrap'
            }, void 0, _jsx('figure', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_img + ' defaut_avt',
                style: { backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")" }
            }, void 0)), _jsx('h3', {
                className: [__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_name, 'conver-name'].join(' ')
            }, void 0, item.speaker), _jsx('div', {
                className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_desc
            }, void 0, item.sentence), finshedVideo === true && _jsx('i', {
                onClick: e => this.props.listenConversation(item.time_start, item.time_end, idx),
                className: "fa fa-volume-up " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.conver_sound
            }))));
        }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(RepeatConversation));

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_video_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__ = __webpack_require__(18);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import helper


class Role2AudioPlayer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.audioInit();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playerTime && nextProps.playerTime !== null) {

            if (nextProps.stopVideo !== true) {
                let time_start = nextProps.playerTime.time_start;
                this.player.endTime = nextProps.playerTime.time_end ? nextProps.playerTime.time_end : this.player.duration();
                //console.log('time_start', time_start);
                // start time
                this.player.currentTime(time_start);
                this.player.play();

                // change icon
                $('#' + this.props.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');

                // icon pause for role 2
                if ($('#' + this.props.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + this.props.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
                }
            }
        }

        // get next item
        if (nextProps.sentencesList !== this.props.sentencesList) {
            if (nextProps.sentencesList !== undefined) {
                let senIdx = 0;

                let time_start = nextProps.sentencesList[senIdx].time_start;
                this.player.endTime = nextProps.sentencesList[nextProps.sentencesList.length - 1].time_end ? nextProps.sentencesList[nextProps.sentencesList.length - 1].time_end : this.player.duration();

                this.player.newSentencesList = nextProps.sentencesList;
                this.player.newIndex = 0;

                // start time
                this.player.currentTime(time_start);
                this.player.play();

                // change icon
                $('#' + this.props.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');

                // icon pause for role 2
                if ($('#' + this.props.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + this.props.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
                }
            } else {
                let senIdx = 0;

                let time_start = this.props.originalData[senIdx].time_start;
                this.player.endTime = this.props.originalData[this.props.originalData.length - 1].time_end ? this.props.originalData[this.props.originalData.length - 1].time_end : this.player.duration();

                this.player.newSentencesList = this.props.originalData;
                this.player.newIndex = 0;

                // start time
                this.player.currentTime(time_start);
                this.player.play();

                // start record
                this.player.startRecord = true;

                // change icon
                $('#' + this.props.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');

                // icon pause for role 2
                if ($('#' + this.props.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + this.props.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
                }
            }
        }
    }

    audioInit() {
        // instantiate video.js
        let _thisComp = this.props;

        this.player = __WEBPACK_IMPORTED_MODULE_4_video_js___default()(this.nodePlayer, {
            autoplay: true,
            controls: true,
            sources: [{
                src: this.props.srcVideo,
                type: 'audio/mp3'
            }]
        }, function onPlayerReady() {
            // console.log('onPlayerReady', this)

            // autoplay on mobile
            if (__WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__["a" /* isMobile */].any()) {
                setTimeout(() => {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').click();
                }, 200);
            }

            // end time
            this.endTime = 0;
            this.senIdx = 0;
            this.newSentencesList = null;
            this.newIndex = 0;
            this.startRecord = false;

            // * Watch Duration of Media Playing.
            this.on('timeupdate', function () {

                if (this.endTime === 0) {
                    // console.log('Chay 0', this.senIdx );
                    // console.log('length',  _thisComp.userSpeaker);

                    if (this.senIdx < _thisComp.sentencesList.length) {

                        //Stop when go to next sen
                        if (this.currentTime() >= _thisComp.sentencesList[this.senIdx].time_start - 0.55) {
                            if (_thisComp.userSpeaker === _thisComp.sentencesList[this.senIdx].speaker) {
                                this.volume(0);
                            } else {
                                this.volume(1);
                            }
                            _thisComp.onStartPlay(this.senIdx);
                            this.senIdx++;
                        }
                    } else {
                        // tat audio theo tung doan data

                        //Stop when go to last item
                        if (this.currentTime() >= _thisComp.sentencesList[_thisComp.sentencesList.length - 1].time_end - 0.55) {
                            this.pause();

                            // this.endTime = 0;
                            this.senIdx = 0;
                            this.currentTime(_thisComp.sentencesList[this.senIdx].time_start);

                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                            // icon pause for role 2
                            if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                            }
                            setTimeout(function () {
                                if (_thisComp.hideVideo) {
                                    _thisComp.hideVideo();
                                }
                            }, 0);
                        }
                    }
                    return;
                }

                // next Item
                if (this.currentTime() >= this.newSentencesList[0].time_start && this.currentTime() <= this.endTime) {
                    if (this.newIndex < this.newSentencesList.length) {

                        //Stop when go to next sen
                        if (this.currentTime() >= this.newSentencesList[this.newIndex].time_start - 0.55) {
                            if (_thisComp.userSpeaker === this.newSentencesList[this.newIndex].speaker) {
                                this.volume(0);
                                if (this.startRecord === true) {
                                    _thisComp.startAudioRecord();
                                }
                            } else {
                                this.volume(1);
                            }

                            _thisComp.onStartPlay(this.newIndex);
                            this.newIndex++;
                        }
                    } else {
                        // tat audio theo tung doan data
                        //Stop when go to last item
                        if (this.currentTime() >= this.newSentencesList[this.newSentencesList.length - 1].time_end - 0.55) {
                            let _timeout = (this.newSentencesList[this.newSentencesList.length - 1].time_end - this.currentTime()) * 1000 - 50;

                            let _thisPlayer = this;

                            setTimeout(() => {
                                _thisPlayer.pause();

                                this.newIndex = 0;
                                this.currentTime(this.newSentencesList[this.newIndex].time_start);

                                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                                // icon pause for role 2
                                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                                }

                                setTimeout(function () {
                                    if (_thisComp.hideVideo) {
                                        _thisComp.hideVideo();
                                    }
                                }, 0);
                            }, _timeout);
                        }
                    }
                }
            });

            // set start and end video
            if (_thisComp.timeVideo) {
                let timeVideo = _thisComp.timeVideo;

                // start time
                this.currentTime(timeVideo[0]);

                // end time
                this.on('timeupdate', function () {
                    if (this.currentTime() > timeVideo[1]) {
                        this.pause();

                        // change icon
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                        // icon pause for role 2
                        if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                        }
                    }
                });
            }

            // change icon
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
            // icon pause for role 2
            if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
            }

            let _this = this;
            // click play
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').on('click', function (e) {
                //this.currentTime(0);
                _this.play();

                // addclass first-item
                $('body').find('.conversation-list .conv-itm').eq(0).addClass('conver_active');

                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
                }
            });

            // click stop
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').on('click', function (e) {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();

                // remove class active
                $('body').find('.conversation-list .conv-itm').removeClass('conver_active');

                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                }
                _thisComp.resetStatus();
            });

            // click pause
            if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').on('click', function (e) {

                    _this.pause();
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                });
            }

            //finished video
            this.on('ended', function () {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                // change icon
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                }

                // update props
                if (_thisComp.hideVideo) {
                    _thisComp.hideVideo();
                }
            });
        });
    }
    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return _jsx('div', {
            'data-vjs-player': true
        }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { ref: n => this.nodePlayer = n, className: 'video-js vjs-default-skin audio-js' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(Role2AudioPlayer));

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_video_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_video_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__ = __webpack_require__(18);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import helper


class RoleplayAudioPlayer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.audioInit();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playerTime && nextProps.playerTime !== null) {

            if (nextProps.stopVideo !== true) {
                let time_start = nextProps.playerTime.time_start;
                this.player.endTime = nextProps.playerTime.time_end ? nextProps.playerTime.time_end : this.player.duration();
                //console.log('time_start', time_start);
                // start time
                this.player.currentTime(time_start);
                this.player.play();

                // change icon
                $('#' + this.props.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
            }
        }
    }

    audioInit() {
        // instantiate video.js
        let _thisComp = this.props;

        this.player = __WEBPACK_IMPORTED_MODULE_4_video_js___default()(this.nodePlayer, {
            autoplay: true,
            controls: true,
            sources: [{
                src: this.props.srcVideo,
                type: 'audio/mp3'
            }]
        }, function onPlayerReady() {
            // console.log('onPlayerReady', this)

            // autoplay on mobile
            if (__WEBPACK_IMPORTED_MODULE_5__helper_IsMobile__["a" /* isMobile */].any()) {
                setTimeout(() => {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').click();
                }, 200);
            }

            // end time
            this.endTime = 0;
            this.senIdx = 0;

            // * Watch Duration of Media Playing.
            this.on('timeupdate', function () {
                //console.log('this.currentTime()', this.currentTime());
                if (this.endTime === 0) {
                    //console.log('Chay 0', this.senIdx );
                    if (this.senIdx < _thisComp.sentencesList.length) {

                        // if(this.senIdx > (_thisComp.countSentence + 1)) {
                        //     this.pause();
                        //     this.endTime = 0;
                        //     this.senIdx = 0;
                        //     this.currentTime(0);

                        //     $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                        //     $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');

                        //     // icon pause for role 2
                        //     if($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                        //         $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                        //     }

                        //     if(_thisComp.hideVideo) {
                        //         _thisComp.hideVideo();
                        //     }

                        //     return;
                        // }

                        //Stop when go to next sen
                        if (this.currentTime() >= _thisComp.sentencesList[this.senIdx].time_start - 0.55) {
                            _thisComp.onStartPlay(this.senIdx);
                            this.senIdx++;
                        }
                    }
                    return;
                }

                if (this.currentTime() >= this.endTime) {
                    this.pause();
                    this.endTime = 0;
                    this.senIdx = 0;
                    this.currentTime(0);

                    // change icon
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');

                    // icon pause for role 2
                    if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                    }

                    if (_thisComp.resetStatus) {
                        _thisComp.resetStatus();
                    }
                }
            });

            // set start and end video
            if (_thisComp.timeVideo) {
                let timeVideo = _thisComp.timeVideo;

                // start time
                this.currentTime(timeVideo[0]);

                // end time
                this.on('timeupdate', function () {
                    if (this.currentTime() > timeVideo[1]) {
                        this.pause();

                        // change icon
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                        // icon pause for role 2
                        if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                        }
                    }
                });
            }

            // change icon
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
            // icon pause for role 2
            if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
            }

            let _this = this;
            // click play
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').on('click', function (e) {
                //this.currentTime(0);
                _this.play();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
                }
            });
            // click stop
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').on('click', function (e) {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                }
                _thisComp.resetStatus();
            });

            // click pause
            if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').on('click', function (e) {

                    _this.pause();
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                });
            }

            //finished video
            this.on('ended', function () {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                // change icon
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if ($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                }

                // update props
                if (_thisComp.hideVideo) {
                    _thisComp.hideVideo();
                }
            });
        });
    }
    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return _jsx('div', {
            'data-vjs-player': true
        }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('audio', { ref: n => this.nodePlayer = n, className: 'video-js vjs-default-skin audio-js' }));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(RoleplayAudioPlayer));

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TextCardItem_css__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TextCardItem_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__TextCardItem_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(7);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







var _ref = _jsx('div', {
    className: 'step-ct-ttl'
}, void 0, _jsx('span', {
    className: 'ldtail-ico ldtail-hint'
}), 'Gi\u1EA3i th\xEDch');

var _ref2 = _jsx('div', {
    className: 'step-ct-exams'
}, void 0);

function TextCardItem(props) {
    const { cardItmData, cardItmNum } = props;
    return _jsx('div', {
        className: 'step-content'
    }, void 0, _ref, _jsx('div', {
        className: 'step-ct-desc',
        dangerouslySetInnerHTML: { __html: cardItmData.message }
    }), cardItmData.json !== '' && _ref2);
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__TextCardItem_css___default.a)(TextCardItem));

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VideoCardItem_css__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VideoCardItem_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__VideoCardItem_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VideoPlayer_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AudioPlayer_js__ = __webpack_require__(9);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();








// import component



var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play stop'
});

var _ref4 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref5 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

class VideoCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
        __WEBPACK_IMPORTED_MODULE_5__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    render() {
        const { cardItmData } = this.props;
        return _jsx('div', {
            className: "step-content " + (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '' ? 'has-video ' : '')
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '') && _jsx(__WEBPACK_IMPORTED_MODULE_6__VideoPlayer_js__["a" /* default */], {
            videoId: 'video-player-' + cardItmData.id,
            hideVideo: () => this.hideVideo(),
            poster: '/images/poster.jpg',
            srcVideo: cardItmData.json.video
        }), cardItmData.json.video === '' && cardItmData.json.audio !== '' && _jsx('img', {
            src: cardItmData.json.image ? cardItmData.json.image : '/images/poster.jpg',
            alt: ''
        }), cardItmData.json.video === '' && cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_7__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            hideVideo: () => this.hideVideo(),
            srcVideo: cardItmData.json.audio
        })), (cardItmData.json.video !== '' && cardItmData.json.audio === '' || cardItmData.json.video !== '' && cardItmData.json.audio !== '') && _jsx('div', {
            id: 'video-player-' + cardItmData.id,
            className: 'sword-ct vd-play'
        }, void 0, _ref2, _ref3), cardItmData.json.video === '' && cardItmData.json.audio !== '' && _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: "aud-play " + __WEBPACK_IMPORTED_MODULE_3__VideoCardItem_css___default.a.lword
        }, void 0, _ref4, _ref5, _jsx('div', {
            className: "sword-ct " + __WEBPACK_IMPORTED_MODULE_3__VideoCardItem_css___default.a.new_word
        }, void 0))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__VideoCardItem_css___default.a)(VideoCardItem));

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VideoQACardItem_css__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VideoQACardItem_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__VideoQACardItem_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AudioPlayer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__HintVideo__ = __webpack_require__(36);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();








// import component



var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

var _ref4 = _jsx('i', {
    className: 'fa fa-check'
});

var _ref5 = _jsx('i', {
    className: 'fa fa-times'
});

var _ref6 = _jsx('i', {
    className: 'fa fa-check'
});

var _ref7 = _jsx('i', {
    className: 'fa fa-times'
});

class VideoQACardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: null,
            answerAllready: false,
            answerResult: null,

            showHint: false
        };
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    chooseAnswer(value) {
        if (this.state.answerAllready === true) {
            return;
        }

        let cardItmJson = this.props.cardItmData.json;
        let tempState = {
            answer: false,
            answerAllready: true,
            answerResult: value,
            showHint: false
        };

        // it's Right
        if (value === cardItmJson.answer) {
            tempState.answer = true;
            this.setState(tempState);
            // show button next
            $('.step-pane .ldtail-next').show();
            __WEBPACK_IMPORTED_MODULE_5__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            // Wrong
            tempState.showHint = true;
            this.setState(tempState);
            __WEBPACK_IMPORTED_MODULE_5__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
            // Wait 150ms
            // reset State.
            let _this = this;
            setTimeout(() => {
                _this.setState({
                    answer: null,
                    answerAllready: false,
                    answerResult: null
                });
            }, 1500);
        }
    }

    render() {
        const { cardItmData } = this.props;
        const { answer, answerResult, showHint } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, cardItmData.json.audio_question !== '' && _jsx('div', {
            className: 'saudio-img'
        }, void 0, cardItmData.json.audio_question !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_6__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            srcVideo: cardItmData.json.audio_question
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: 'saudio-sent aud-play'
        }, void 0, cardItmData.json.audio_question !== '' && _ref2, cardItmData.json.audio_question !== '' && _ref3, _jsx('div', {
            className: 'ssent-ct'
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.question))), showHint === true && cardItmData.json.video && _jsx(__WEBPACK_IMPORTED_MODULE_7__HintVideo__["a" /* default */], {
            cardItmData: cardItmData,
            timeVideo: cardItmData.json.time,
            hasVideo: cardItmData.json.video ? true : false,
            srcVideo: cardItmData.json.video ? cardItmData.json.video : cardItmData.json.audio
        }), _jsx('div', {
            className: 'step-choices'
        }, void 0, cardItmData.json.options !== null && typeof cardItmData.json.options !== 'string' && cardItmData.json.options.map((item, idx) => {
            return _jsx('div', {
                onClick: e => this.chooseAnswer(item),
                className: "step-choice fullwidth " + (item === answerResult && answer === true ? 'true' : '') + (item === answerResult && answer === false ? 'wrong' : '')
            }, idx + 1, item === answerResult && answer === true && _ref4, item === answerResult && answer === false && _ref5, item);
        }), cardItmData.json.options !== null && typeof cardItmData.json.options === 'string' && JSON.parse(cardItmData.json.options).map((item, idx) => {
            return _jsx('div', {
                onClick: e => this.chooseAnswer(item),
                className: "step-choice " + (item === answerResult && answer === true ? 'true' : '') + (item === answerResult && answer === false ? 'wrong' : '')
            }, idx + 1, item === answerResult && answer === true && _ref6, item === answerResult && answer === false && _ref7, item);
        }))));
    }
}

/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__VideoQACardItem_css___default.a)(VideoQACardItem));

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__ = __webpack_require__(9);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import component


var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

class WordCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMean: false,
            showTranslate: false
        };
    }

    // show vietnamese
    clickShowMean() {
        this.setState({ showMean: true });
    }

    // event show vietnamese
    clickShowVN() {
        this.setState({ showTranslate: true });
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
        __WEBPACK_IMPORTED_MODULE_4__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    render() {
        const { cardItmData } = this.props;
        const { showMean, showTranslate } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, _jsx('img', {
            src: cardItmData.json.image,
            alt: ''
        }), cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            hideVideo: () => this.hideVideo(),
            srcVideo: cardItmData.json.audio
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: "aud-play " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.lword
        }, void 0, cardItmData.json.audio !== "" && _ref2, cardItmData.json.audio !== "" && _ref3, _jsx('div', {
            className: "sword-ct " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.new_word
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans,
            onClick: e => this.clickShowMean()
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.word, cardItmData.json.pronunciation && _jsx('span', {
            className: "pronunciation"
        }, void 0, '/ ', cardItmData.json.pronunciation, ' /'))), cardItmData.json.means && _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans + " pron",
            onClick: e => this.clickShowVN()
        }, void 0, cardItmData.json.means), showTranslate === true && cardItmData.json.vietnamese && _jsx('div', {
            className: 'pron'
        }, void 0, cardItmData.json.vietnamese)))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(WordCardItem));

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AudioPlayer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AudioNoAutoplay_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_result__ = __webpack_require__(6);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import component




var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

var _ref4 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref5 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

class WordExampleCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMean: false,
            showExam: false
        };
    }

    // show vietnamese
    clickShowMean() {
        this.setState({ showMean: true });
    }

    // show mean example
    clickShowExample() {
        this.setState({ showExam: true });
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
        __WEBPACK_IMPORTED_MODULE_6__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    render() {
        const { cardItmData } = this.props;
        const { showMean, showExam } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, _jsx('img', {
            src: cardItmData.json.image,
            alt: ''
        }), cardItmData.json.audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_4__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            hideVideo: () => this.hideVideo(),
            srcVideo: cardItmData.json.audio
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: "aud-play " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.lword
        }, void 0, cardItmData.json.audio !== "" && _ref2, cardItmData.json.audio !== "" && _ref3, _jsx('div', {
            className: "sword-ct " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.new_word
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans,
            onClick: e => this.clickShowMean()
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.word)), showMean === true && _jsx('div', {
            className: 'pron'
        }, void 0, cardItmData.json.vietnamese)))), _jsx('div', {
            style: { overflow: 'hidden' }
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, cardItmData.json.example_audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_5__AudioNoAutoplay_js__["a" /* default */], {
            audioId: 'audio-noplay-' + cardItmData.id,
            hideVideo: () => this.hideVideo(),
            srcVideo: cardItmData.json.example_audio
        })), _jsx('div', {
            id: 'audio-noplay-' + cardItmData.id,
            className: 'saudio-sent audno-play'
        }, void 0, _ref4, _ref5, _jsx('div', {
            className: 'ssent-ct'
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans,
            onClick: e => this.clickShowExample()
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.example)), showExam === true && _jsx('div', {
            className: 'pron'
        }, void 0, cardItmData.json.example_vi)))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(WordExampleCardItem));

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_result__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__ = __webpack_require__(9);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();







// import component


var _ref = _jsx('div', {
    className: 'guide_txt_mb'
}, void 0, 'Click play to listen');

var _ref2 = _jsx('span', {
    className: 'saudio-play f-l play'
});

var _ref3 = _jsx('span', {
    className: 'saudio-play f-l stop'
});

class WordOnlyCardItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMean: false
        };
    }
    // show vietnamese
    clickShowMean() {
        this.setState({ showMean: true });
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
        __WEBPACK_IMPORTED_MODULE_4__actions_result__["d" /* saveProgress */](this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }
    render() {
        const { cardItmData } = this.props;
        const { showMean } = this.state;

        return _jsx('div', {
            className: 'step-content'
        }, void 0, _jsx('div', {
            className: 'step-ct-ttl sct-ttl-2'
        }, void 0, cardItmData.title), _jsx('div', {
            className: 'step-ct-desc'
        }, void 0, cardItmData.message), _ref, _jsx('div', {
            className: 'saudio-word'
        }, void 0, _jsx('div', {
            className: 'saudio-img'
        }, void 0, _jsx('img', {
            src: cardItmData.json.example_image,
            alt: ''
        }), cardItmData.json.example_audio !== '' && _jsx(__WEBPACK_IMPORTED_MODULE_5__AudioPlayer_js__["a" /* default */], {
            audioId: 'audio-player-' + cardItmData.id,
            hideVideo: () => this.hideVideo(),
            srcVideo: cardItmData.json.example_audio
        })), _jsx('div', {
            id: 'audio-player-' + cardItmData.id,
            className: "aud-play " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.lword
        }, void 0, _ref2, _ref3, _jsx('div', {
            className: "sword-ct " + __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.new_word
        }, void 0, _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a.wordmeans,
            onClick: e => this.clickShowMean()
        }, void 0, _jsx('div', {
            className: 'sent'
        }, void 0, cardItmData.json.example)), showMean === true && cardItmData.json.example_vi !== 'đang cập nhật' && _jsx('div', {
            className: 'pron'
        }, void 0, cardItmData.json.example_vi)))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Card_Item_Card_Item_css___default.a)(WordOnlyCardItem));

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VideoCardItem__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VideoQACardItem__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TextCardItem__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__WordCardItem__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__WordOnlyCardItem__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__WordExampleCardItem__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__FillBlankCardItem__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__FillChooseBlankCardItem__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__RecordCardItem__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__CorrectBlankCardItem__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__CorrectMeaningCardItem__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ExpressionCardItem__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ExListenChooseAnswerCardItem__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ExReorderWordCartItem__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ExVideoQACardItem__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__GrammarCardItem__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__GrammarListeningCardItem__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ExChooseCorrectAnswer__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__RolePlay_LConversation__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__RolePlay_ConversationFillBlank__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__RolePlay_ExRoleplay__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__FinishCardItem__ = __webpack_require__(93);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__VideoCardItem__["a"]; });
/* unused harmony reexport VideoQACardItem */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_2__TextCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__WordCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__WordOnlyCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__WordExampleCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__FillBlankCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_7__FillChooseBlankCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_8__RecordCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_9__CorrectBlankCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_10__CorrectMeaningCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_11__ExpressionCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_12__ExListenChooseAnswerCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_13__ExReorderWordCartItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_14__ExVideoQACardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_15__GrammarCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_16__GrammarListeningCardItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_17__ExChooseCorrectAnswer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_18__RolePlay_LConversation__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_19__RolePlay_ConversationFillBlank__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_20__RolePlay_ExRoleplay__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_21__FinishCardItem__["a"]; });
// 1. Listening




// 2. Word/Vocabulary









// 3. Expression





// 4. Grammar




// 5. Role place




// End: Finish test




/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lesson_Item_css__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lesson_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Lesson_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_SubLesson_Item__ = __webpack_require__(114);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// Import components


// jQuery Fx
// Click On Lesson
const clkOnLesson = () => {
    $('body').on('click', '.lesson', e => {
        //console.log($(e.currentTarget).offset().top);
        $('html, body').animate({
            scrollTop: $(e.currentTarget).offset().top - 70
        }, {
            queue: false,
            duration: 600 + $(e.currentTarget).offset().top
        });
    });
};

var _ref = _jsx('span', {
    className: 'line'
});

class Lesson_Item extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.state = {
            levelCourse: null,
            userCode: null
        }, _temp;
    }

    componentDidMount() {
        // get level
        let levelCourse = JSON.parse(localStorage.getItem('levelCourse'));
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

        this.setState({ levelCourse: levelCourse, userCode: this.props.lesson_level ? this.props.lesson_level : userInfo.level });

        let activeLesson = window.location.hash.slice(1, window.location.hash.length);

        clkOnLesson();
        if (activeLesson) {
            console.log('#lesson-head-' + activeLesson);
            $('#lesson-head-' + activeLesson).click();
        }
    }

    render() {
        const { lessons } = this.props;
        const { levelCourse, userCode } = this.state;

        return _jsx('div', {
            id: 'course',
            className: 'course tab-pane active'
        }, void 0, _jsx('div', {
            className: 'course-wrap'
        }, void 0, _jsx('div', {
            className: 'course-ttl'
        }, void 0, levelCourse !== null && levelCourse.map((item, idx) => {
            return _jsx('span', {
                className: userCode !== null && userCode === item.code ? 'txt' : 'hide'
            }, idx + 1, item.name);
        }), _ref), _jsx('div', {
            id: 'lesson-group',
            className: 'lessons'
        }, void 0, lessons.map((item, idx) => {
            return _jsx(__WEBPACK_IMPORTED_MODULE_4__components_SubLesson_Item__["a" /* default */], {
                item: item,
                idx: idx
            }, item.id + 1);
        }))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Lesson_Item_css___default.a)(Lesson_Item));

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Lesson_Cards_css__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Lesson_Cards_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Lesson_Cards_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper_constant_Site__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes_modules_Auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__helper_ApiRx__ = __webpack_require__(43);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }








//import helper




// function js tooltip
function showTool() {
    if ($(window).width() < 768 || navigator.userAgent.match(/Android|iPad|iPhone|iPod|Windows Phone|Lumia|Blackberry/i)) {
        return;
    }
    // if(!$('.sub-lesson .pathway-circle').length) { return; }

    $('.sub-lesson .pathway-circle').tooltip({
        title: function () {
            var html = `<div class="tooltip-body">
                            <div class="tooltip-ttl">${$(this).data('title')}</div>
                            <div class="tooltip-desc">${$(this).data('desc')}</div>
                        </div>
                        <div class="tooltip-footer">Click to start</div>`;
            return html;
        },
        html: true
    });
}

class Lesson_Cards extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            subLesson: null,
            isMounted: false,
            arrTypeName: ['Listening', 'Vocabulary', 'Expression', 'Grammar / Structure', 'Role play']
        };
        this.getSubLessonDone = this.getSubLessonDone.bind(this);
        this.getSubLessonFail = this.getSubLessonFail.bind(this);
        // console.log(props);
    }

    componentDidMount() {
        // remove localStrorage info lesson
        localStorage.removeItem('infoLesson');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lesson_id !== this.props.lesson_id) {
            this.getApiSubLesson(nextProps.lesson_id);
        }
    }

    getApiSubLesson(lesson_id) {
        var _this = this;

        return _asyncToGenerator(function* () {
            // const {lesson_id} = this.props;

            let token = __WEBPACK_IMPORTED_MODULE_7__routes_modules_Auth__["a" /* default */].getToken();
            let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

            let params = {};
            params.token = token;
            params.lesson_id = lesson_id;
            params.user_id = userInfo.id;

            yield __WEBPACK_IMPORTED_MODULE_8__helper_ApiRx__["a" /* default */].getSubLesson(params, _this.getSubLessonDone, _this.getSubLessonFail);
            _this.setState({ isMounted: true });
        })();
    }

    // get lesson succedd
    getSubLessonDone(data) {
        if (this.state.isMounted) {
            let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
            this.setState({ subLesson: data, defaultLevel: userInfo.level });
        }
        // js hover tooltip
        showTool();
    }

    // get lesson failed
    getSubLessonFail(error) {
        console.log('error', error);
    }

    // save info lesson to localStorage
    saveInfoLesson(cardPosition, dataLessons) {
        let lessonObj = {
            cardNext: dataLessons[cardPosition]
        };
        // console.log('lessonObj', lessonObj);
        localStorage.setItem('infoLesson', JSON.stringify(lessonObj));
        return false;
    }

    render() {
        const { subLesson, arrTypeName } = this.state;

        return _jsx('div', {}, void 0, subLesson && subLesson.data && subLesson.data !== false && _jsx('div', {
            className: 'lbody-wrap'
        }, void 0, _jsx('div', {
            className: 'sub-lessons'
        }, void 0, arrTypeName.map((itmType, pos) => {
            return _jsx('div', {
                className: 'sub-lesson'
            }, pos + 1, subLesson.data[pos + 1]
            /*&& subLesson.data[pos+1][0].active === 1 */
            && _jsx('div', {}, void 0, /*subLesson.data[pos+1][0].active === 1
                                       &&*/_jsx('div', {
                className: 'sl-ttl'
            }, void 0, itmType), _jsx('ul', {
                className: 'pathway'
            }, void 0, subLesson.data[pos + 1].map((item, idx) => {
                return _jsx('li', {
                    className: "pathway-itm "
                    /*+ (item.active !== 1 ? 'pathway-hide' : '') */
                }, idx + 1, _jsx(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
                    to: "/lesson/" + item.id + "/level/" + (this.context.level ? this.context.level : this.state.defaultLevel) + "/" + this.props.lesson_id,
                    onClick: () => this.saveInfoLesson(pos + 2, subLesson.data)
                }, void 0, _jsx('span', {
                    style: { 'backgroundImage': 'url(' + item.icon + ')' },
                    'data-title': item.title,
                    'data-desc': item.description,
                    className: "pathway-circle " + (item.type === 4 ? 'gramma' : '')
                })));
            }))));
        }))));
    }
}

Lesson_Cards.contextTypes = {
    level: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Lesson_Cards_css___default.a)(Lesson_Cards));

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lesson_Item_Lesson_Item_css__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lesson_Item_Lesson_Item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Lesson_Item_Lesson_Item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Lesson_Cards__ = __webpack_require__(113);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();






// import subComp


var _ref = _jsx('span', {}, void 0, '%');

class SubLesson_Item extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.state = {
            lessonId: null,
            lessonData: null
        }, _temp;
    }

    showCard(cardItem) {
        this.setState({ loadCard: true, lessonId: cardItem.id, lessonData: cardItem });

        // $("#lesson-head-" + cardItem.id).collapse('show');
    }

    render() {
        const { lessonId, lessonData } = this.state;
        const { item, idx } = this.props;

        return _jsx('div', {
            id: "lesson-wrp-" + item.id,
            className: 'lesson'
        }, void 0, _jsx('div', {
            id: "lesson-head-" + item.id,
            'data-target': "#lesson-" + item.id,
            'data-toggle': 'collapse',
            'data-parent': "#lesson-group",
            'data-rid': item.id,
            onClick: () => this.showCard(item),
            className: 'lesson-tgl'
        }, void 0, _jsx('div', {
            style: { 'backgroundImage': item.image !== '' ? 'url(' + item.image + ')' : 'url(/images/books.png)', 'backgroundColor': item.color },
            className: 'lesson-img f-l'
        }), _jsx('div', {
            className: 'lesson-ct f-l'
        }, void 0, _jsx('div', {
            className: 'lesson-ttl'
        }, void 0, item.name), _jsx('div', {
            className: 'lesson-txt',
            dangerouslySetInnerHTML: { __html: item.description }
        })), _jsx('div', {
            className: 'lesson-progress f-r'
        }, void 0, _jsx('div', {
            className: 'l-line f-l'
        }, void 0, _jsx('div', {
            className: 'lprog-bar',
            style: { width: item.progress + '%' }
        })), _jsx('span', {
            className: 'numb'
        }, void 0, item.progress, _ref))), _jsx('div', {
            id: "lesson-" + item.id,
            className: 'lesson-body collapse'
        }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__Lesson_Cards__["a" /* default */], {
            lessonData: lessonData,
            lesson_id: lessonId
        })));
    }

}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Lesson_Item_Lesson_Item_css___default.a)(SubLesson_Item));

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createApolloClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_client__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_apollo_client__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





// Execute all GraphQL requests directly without
class ServerInterface {
  constructor(optionsData) {
    this.schema = optionsData.schema;
    this.optionsData = optionsData;
  }

  query({ query, variables, operationName }) {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        let validationRules = __WEBPACK_IMPORTED_MODULE_0_graphql__["specifiedRules"];
        const customValidationRules = _this.optionsData.validationRules;
        if (customValidationRules) {
          validationRules = validationRules.concat(customValidationRules);
        }

        const validationErrors = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql__["validate"])(_this.schema, query, validationRules);
        if (validationErrors.length > 0) {
          return { errors: validationErrors };
        }

        const result = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql__["execute"])(_this.schema, query, _this.optionsData.rootValue, _this.optionsData.context, variables, operationName);

        return result;
      } catch (contextError) {
        return { errors: [contextError] };
      }
    })();
  }
}

function createApolloClient(options) {
  return new __WEBPACK_IMPORTED_MODULE_1_apollo_client___default.a({
    reduxRootSelector: state => state.apollo,
    networkInterface: new ServerInterface(options),
    queryDeduplication: true
  });
}

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return localFetch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_fetch__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__config__);
/* unused harmony reexport Request */
/* unused harmony reexport Headers */
/* unused harmony reexport Response */
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





__WEBPACK_IMPORTED_MODULE_1_node_fetch___default.a.Promise = __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a;
__WEBPACK_IMPORTED_MODULE_1_node_fetch__["Response"].Promise = __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a;

function localUrl(url) {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `http://${__WEBPACK_IMPORTED_MODULE_2__config__["host"]}${url}`;
}

function localFetch(url, options) {
  return __WEBPACK_IMPORTED_MODULE_1_node_fetch___default()(localUrl(url), options);
}



/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch({ baseUrl, cookie }) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST', // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: _extends({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, cookie ? { Cookie: cookie } : null)
  };

  return (url, options) => url.startsWith('/graphql') || url.startsWith('/api') ? __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(`${baseUrl}${url}`, _extends({}, defaults, options, {
    headers: _extends({}, defaults.headers, options && options.headers)
  })) : __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(url, options);
}

/* harmony default export */ __webpack_exports__["a"] = (createFetch);

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(23);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const User = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('User', {

  id: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUID,
    defaultValue: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUIDV1,
    primaryKey: true
  },

  username: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100),
    unique: true,
    allowNull: false
  },
  email: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100),
    unique: true
  },

  emailConfirmed: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.BOOLEAN,
    defaultValue: false
  }

}, {

  indexes: [{ fields: ['email'] }]

});

/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(23);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserClaim = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserClaim', {

  type: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING
  },

  value: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING
  }

});

/* harmony default export */ __webpack_exports__["a"] = (UserClaim);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(23);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserLogin = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserLogin', {

  name: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(50),
    primaryKey: true
  },

  key: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100),
    primaryKey: true
  }

});

/* harmony default export */ __webpack_exports__["a"] = (UserLogin);

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(23);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserProfile = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserProfile', {

  userId: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUID,
    primaryKey: true
  },

  displayName: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100)
  },

  picture: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255)
  },

  gender: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(50)
  },

  location: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100)
  },

  website: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255)
  }

});

/* harmony default export */ __webpack_exports__["a"] = (UserProfile);

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_UserType__ = __webpack_require__(29);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }


//import bcrypt from 'bcrypt';



const login = {
  type: __WEBPACK_IMPORTED_MODULE_1__types_UserType__["a" /* default */],
  args: {
    username: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    password: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) }
  },
  resolve({ request }, { username, password }, { res }) {
    return _asyncToGenerator(function* () {
      // const usernameLogin = username.toLowerCase();
      // const passwordHashed = bcrypt.hashSync(password.trim(), 10);
      if (request.cookies.id_token) {
        throw new Error('You have already logged in.');
      }

      const user = {
        id: 'sample',
        username: username,
        token: password
      };

      // Set token to cookie with specified expiry time
      let expiresIn = 60 * 120 * 10; // 120 mins
      res.cookie('key_token', password, {
        maxAge: 1000 * expiresIn,
        httpOnly: true
      });

      return user;
    })();
  }
};

/* harmony default export */ __webpack_exports__["a"] = (login);

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_UserType__ = __webpack_require__(29);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




const logout = {
  type: __WEBPACK_IMPORTED_MODULE_1__types_UserType__["a" /* default */],
  args: {
    username: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
    password: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
  },
  resolve: (() => {
    var _ref = _asyncToGenerator(function* ({ request }, args, { res }) {
      if (!request.cookies.key_token) {
        throw new Error('You are not logged in.');
      }
      const user = {
        id: 'sample',
        username: 'out'
      };
      res.clearCookie('key_token');
      // res.redirect('/login');
      return user;
    });

    return function resolve(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })()
};

/* harmony default export */ __webpack_exports__["a"] = (logout);

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types_UserType__ = __webpack_require__(29);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const me = {
  type: __WEBPACK_IMPORTED_MODULE_0__types_UserType__["a" /* default */],
  resolve({ request }) {
    return request.user && {
      id: request.user.id,
      email: 'null',
      username: request.user.username
    };
  }
};

/* harmony default export */ __webpack_exports__["a"] = (me);

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types_NewsItemType__ = __webpack_require__(127);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





// React.js News Feed (RSS)
const url = 'https://api.rss2json.com/v1/api.json' + '?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const news = {
  type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLList"](__WEBPACK_IMPORTED_MODULE_2__types_NewsItemType__["a" /* default */]),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
        lastFetchTime = new Date();
        lastFetchTask = __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default()(url).then(response => response.json()).then(data => {
          if (data.status === 'ok') {
            items = data.items;
          }

          lastFetchTask = null;
          return items;
        }).catch(err => {
          lastFetchTask = null;
          throw err;
        });

        if (items.length) {
          return items;
        }

        return lastFetchTask;
      }

    return items;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (news);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__queries_me__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queries_news__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__queries_login__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__queries_logout__ = __webpack_require__(123);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */








const schema = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLSchema"]({
  query: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
    name: 'Query',
    fields: {
      me: __WEBPACK_IMPORTED_MODULE_1__queries_me__["a" /* default */],
      news: __WEBPACK_IMPORTED_MODULE_2__queries_news__["a" /* default */],
      login: __WEBPACK_IMPORTED_MODULE_3__queries_login__["a" /* default */],
      logout: __WEBPACK_IMPORTED_MODULE_4__queries_logout__["a" /* default */]
    }
  })
});

/* harmony default export */ __webpack_exports__["a"] = (schema);

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const NewsItemType = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: 'NewsItem',
  fields: {
    title: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    link: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    author: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
    pubDate: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    content: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (NewsItemType);

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport_facebook__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_models__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */






/**
 * Sign in with Facebook.
 */
__WEBPACK_IMPORTED_MODULE_0_passport___default.a.use(new __WEBPACK_IMPORTED_MODULE_1_passport_facebook__["Strategy"]({
  clientID: __WEBPACK_IMPORTED_MODULE_3__config___default.a.auth.facebook.id,
  clientSecret: __WEBPACK_IMPORTED_MODULE_3__config___default.a.auth.facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  /* eslint-disable no-underscore-dangle */
  const loginName = 'facebook';
  const claimType = 'urn:facebook:access_token';
  const fooBar = (() => {
    var _ref = _asyncToGenerator(function* () {
      if (req.user) {
        const userLogin = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */].findOne({
          attributes: ['name', 'key'],
          where: { name: loginName, key: profile.id }
        });
        if (userLogin) {
          // There is already a Facebook account that belongs to you.
          // Sign in with that account or delete it, then link it with your current account.
          done();
        } else {
          const user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].create({
            id: req.user.id,
            email: profile._json.email,
            logins: [{ name: loginName, key: profile.id }],
            claims: [{ type: claimType, value: profile.id }],
            profile: {
              displayName: profile.displayName,
              gender: profile._json.gender,
              picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
            }
          }, {
            include: [{ model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */], as: 'logins' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["d" /* UserClaim */], as: 'claims' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["e" /* UserProfile */], as: 'profile' }]
          });
          done(null, {
            id: user.id,
            email: user.email
          });
        }
      } else {
        const users = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].findAll({
          attributes: ['id', 'email'],
          where: { '$logins.name$': loginName, '$logins.key$': profile.id },
          include: [{
            attributes: ['name', 'key'],
            model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */],
            as: 'logins',
            required: true
          }]
        });
        if (users.length) {
          const user = users[0].get({ plain: true });
          done(null, user);
        } else {
          let user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].findOne({ where: { email: profile._json.email } });
          if (user) {
            // There is already an account using this email address. Sign in to
            // that account and link it with Facebook manually from Account Settings.
            done(null);
          } else {
            user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].create({
              email: profile._json.email,
              emailConfirmed: true,
              logins: [{ name: loginName, key: profile.id }],
              claims: [{ type: claimType, value: accessToken }],
              profile: {
                displayName: profile.displayName,
                gender: profile._json.gender,
                picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
              }
            }, {
              include: [{ model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */], as: 'logins' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["d" /* UserClaim */], as: 'claims' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["e" /* UserProfile */], as: 'profile' }]
            });
            done(null, {
              id: user.id,
              email: user.email
            });
          }
        }
      }
    });

    return function fooBar() {
      return _ref.apply(this, arguments);
    };
  })();

  fooBar().catch(done);
}));

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_passport___default.a);

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = course;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const INITIAL_STATE = {
  // user: null,
  loading: false
};

function course(state = {}, action) {
  if (state === null) {
    // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["a" /* COURSE_START */]:
      return _extends({}, state, {
        loading: true,
        course: null
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["b" /* COURSE_SUCCESS */]:
      return _extends({}, state, {
        loading: false,
        error: null,
        course: action.payload
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["c" /* COURSE_FAILURE */]:
      return _extends({}, state, {
        loading: false,
        error: action.payload.error,
        course: null
      });
    default:
      return state;
  }
}

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createRootReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runtime__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__course__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lessons__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lesson__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__level__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__levelMobile__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__result__ = __webpack_require__(136);











function createRootReducer({ apolloClient }) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
    apollo: apolloClient.reducer(),
    user: __WEBPACK_IMPORTED_MODULE_1__user__["a" /* default */],
    runtime: __WEBPACK_IMPORTED_MODULE_2__runtime__["a" /* default */],
    course: __WEBPACK_IMPORTED_MODULE_3__course__["a" /* default */],
    lessons: __WEBPACK_IMPORTED_MODULE_4__lessons__["a" /* default */],
    lesson: __WEBPACK_IMPORTED_MODULE_5__lesson__["a" /* default */],
    profile: __WEBPACK_IMPORTED_MODULE_6__profile__["a" /* default */],
    level: __WEBPACK_IMPORTED_MODULE_7__level__["a" /* default */],
    levelMobile: __WEBPACK_IMPORTED_MODULE_8__levelMobile__["a" /* default */],
    result: __WEBPACK_IMPORTED_MODULE_9__result__["a" /* default */]
  });
}

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lesson;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const INITIAL_STATE = {
  // user: null,
  loading: false
};

function lesson(state = {}, action) {
  if (state === null) {
    // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["p" /* LESSON_START */]:
      return _extends({}, state, {
        loading: true,
        lesson: null
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["q" /* LESSON_SUCCESS */]:
      return _extends({}, state, {
        loading: false,
        error: null,
        lesson: action.payload.data
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["r" /* LESSON_FAILURE */]:
      return _extends({}, state, {
        loading: false,
        error: action.payload.error,
        lesson: null
      });
    default:
      return state;
  }
}

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lessons;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const INITIAL_STATE = {
  // user: null,
  loading: false
};

function lessons(state = {}, action) {
  if (state === null) {
    // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["y" /* LESSONS_START */]:
      return _extends({}, state, {
        loading: true,
        lessons: null
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["z" /* LESSONS_SUCCESS */]:
      return _extends({}, state, {
        loading: false,
        error: null,
        lessons: action.payload.data
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["A" /* LESSONS_FAILURE */]:
      return _extends({}, state, {
        loading: false,
        error: action.payload.error,
        lessons: null
      });
    default:
      return state;
  }
}

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = level;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const INITIAL_STATE = {
  // user: null,
  loading: false
};

function level(state = {}, action) {
  if (state === null) {
    // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["d" /* LEVEL_START */]:
      return _extends({}, state, {
        loading: true,
        level: null
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["e" /* LEVEL_SUCCESS */]:
      return _extends({}, state, {
        loading: false,
        error: null,
        level: action.payload.data
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["f" /* LEVEL_FAILURE */]:
      return _extends({}, state, {
        loading: false,
        error: action.payload.error,
        level: null
      });
    default:
      return state;
  }
}

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = levelMobile;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const INITIAL_STATE = {
  // user: null,
  loading: false
};

function levelMobile(state = {}, action) {
  if (state === null) {
    // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["v" /* LEVEL_MB_START */]:
      return _extends({}, state, {
        loading: true,
        levelMobile: null
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["w" /* LEVEL_MB_SUCCESS */]:
      return _extends({}, state, {
        loading: false,
        error: null,
        levelMobile: action.payload.data
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["x" /* LEVEL_MB_FAILURE */]:
      return _extends({}, state, {
        loading: false,
        error: action.payload.error,
        levelMobile: null
      });
    default:
      return state;
  }
}

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = profile;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const INITIAL_STATE = {
  // user: null,
  loading: false
};

function profile(state = {}, action) {
  if (state === null) {
    // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["m" /* PROFILE_START */]:
      return _extends({}, state, {
        loading: true,
        profile: null
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["n" /* PROFILE_SUCCESS */]:
      return _extends({}, state, {
        loading: false,
        error: null,
        profile: action.payload.data
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["A" /* LESSONS_FAILURE */]:
      return _extends({}, state, {
        loading: false,
        error: action.payload.error,
        profile: null
      });
    default:
      return state;
  }
}

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = result;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const INITIAL_STATE = {
  // user: null,
  loading: false
};

function result(state = {}, action) {
  if (state === null) {
    // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["s" /* RESULT_POST_START */]:
      return _extends({}, state, {
        loading: true,
        result: null
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["t" /* RESULT_POST_SUCCESS */]:
      return _extends({}, state, {
        loading: false,
        error: null,
        result: action.payload
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["u" /* RESULT_POST_FAILURE */]:
      return _extends({}, state, {
        loading: false,
        error: action.payload.error,
        result: null
      });
    default:
      return state;
  }
}

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = runtime;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(41);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function runtime(state = {}, action) {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* SET_RUNTIME_VARIABLE */]:
      return _extends({}, state, {
        [action.payload.name]: action.payload.value
      });
    default:
      return state;
  }
}

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = user;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const INITIAL_STATE = {
  // user: null,
  loading: false
};

function user(state = {}, action) {
  if (state === null) {
    // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["g" /* LOGIN_START */]:
      return _extends({}, state, {
        loading: true,
        user: null
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["h" /* LOGIN_SUCCESS */]:
      return _extends({}, state, {
        loading: false,
        error: null,
        user: action.payload
      });
    case __WEBPACK_IMPORTED_MODULE_0__helper_actionconst_actionTypes__["i" /* LOGIN_FAILURE */]:
      return _extends({}, state, {
        loading: false,
        error: action.payload.error,
        user: null
      });
    default:
      return state;
  }
}

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_universal_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__(147);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_universal_router___default.a(__WEBPACK_IMPORTED_MODULE_1__routes__["a" /* default */]));

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Lesson_css__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Lesson_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Lesson_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_Auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__actions_lesson__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_Pages_Lesson_Card_Item__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__helper_MHelper_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__helper_ApiRx__ = __webpack_require__(43);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */












// Redux




// import component


// import helper



// js hover tooltip
function showToolDetail(arrayTool) {
    if ($(window).width() < 768 || navigator.userAgent.match(/Android|iPad|iPhone|iPod|Windows Phone|Lumia|Blackberry/i)) {
        return;
    }

    arrayTool.forEach(function (item) {
        $(item).tooltip();
    });
}

function updateToolDetail(itmTooltip, arrTitle) {

    if ($(window).width() < 768 || navigator.userAgent.match(/Android|iPad|iPhone|iPod|Windows Phone|Lumia|Blackberry/i)) {
        return;
    }

    $(itmTooltip).tooltip('hide').attr('data-original-title', arrTitle);
}

class Lesson extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);

        this.state = {
            cateName: '',
            per: 0,
            lessonItemNum: 0,
            isMounted: false
        };
        this.getSubLessonDone = this.getSubLessonDone.bind(this);
        this.getSubLessonFail = this.getSubLessonFail.bind(this);
    }

    componentDidMount() {
        const { lesson_id, lessonId } = this.props;
        this.getCardItem();

        $(document).keypress(e => {
            if (e.which == 13) {
                if ($('.step-pane .ldtail-next').length) {
                    if ($('.step-pane .ldtail-next').is(':visible')) {
                        $('.step-pane .ldtail-next').click();
                    }
                }
            }
        });
    }

    getApiSubLesson(lesson_id) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            // const {lesson_id} = this.props;

            let token = __WEBPACK_IMPORTED_MODULE_8__modules_Auth__["a" /* default */].getToken();
            let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

            let params = {};
            params.token = token;
            params.lesson_id = lesson_id;
            params.user_id = userInfo.id;

            yield __WEBPACK_IMPORTED_MODULE_14__helper_ApiRx__["a" /* default */].getSubLesson(params, _this2.getSubLessonDone, _this2.getSubLessonFail);
            _this2.setState({ isMounted: true });
        })();
    }

    // get lesson succedd
    getSubLessonDone(data) {
        let _this = this;
        if (this.state.isMounted) {
            let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

            if (data.data) {
                let curCardIdx = -1;
                $.each(data.data, function (index, item) {

                    let idxCard = __WEBPACK_IMPORTED_MODULE_7_lodash___default.a.findIndex(item, itm => {
                        return itm.id == parseInt(_this.props.lesson_id);
                    });

                    if (idxCard >= 0) {
                        curCardIdx = parseInt(index);
                        let lessonObj = {
                            cardNext: data.data[parseInt(curCardIdx + 1)]
                        };
                        localStorage.setItem('infoLesson', JSON.stringify(lessonObj));
                    }
                });
            }
        }
    }

    // get lesson failed
    getSubLessonFail(error) {
        console.log('error', error);
    }

    getChildContext() {
        return {
            level: this.props.levelId,
            lessonId: this.props.lessonId
        };
    }

    // get api card item
    getCardItem(id) {
        const { lesson_id } = this.props;

        let token = __WEBPACK_IMPORTED_MODULE_8__modules_Auth__["a" /* default */].getToken();

        let params = {};
        params.token = token;
        if (id) {
            params.card_id = id;
        } else {
            params.card_id = lesson_id;
        }

        this.props.getLesson(params);
    }

    // click get card item
    onClickGetCardItem(id, index) {
        // set item num for active title link
        this.setState({ lessonItemNum: index });
        this.getCardItem(id);
    }

    componentWillReceiveProps(nextProps) {
        let _this = this;
        const { lesson_id, lessonId } = this.props;

        if (nextProps.lesson !== null) {
            // count percent
            if (nextProps.lesson && nextProps.lesson.items && nextProps.lesson.items.length) {
                this.setState({
                    per: 100 / nextProps.lesson.items.length
                });
            }

            let card_position = __WEBPACK_IMPORTED_MODULE_7_lodash___default.a.findIndex(nextProps.lesson.card, i => {
                return i.id == lesson_id;
            });

            this.setState({
                cateName: nextProps.lesson.lesson_name,
                cardItmData: nextProps.lesson,
                lessonItemNum: card_position
            });

            // call js
            setTimeout(function () {
                showToolDetail(['.ldtail-guide .pathway-circle', '.ldtail-down', '.ldtail-next']);
            }, 500);

            let lessonInfo = JSON.parse(localStorage.getItem('infoLesson'));
            if (!lessonInfo) {
                this.getApiSubLesson(lessonId);
            }
        }

        // get next lesson
        if (nextProps.lesson_id !== this.props.lesson_id) {
            let lesson_id = parseInt(nextProps.lesson_id);
            this.getCardItem(lesson_id);
        }
    }

    render() {
        const { lesson, lesson_id } = this.props;
        const { cateName, per, cardItmData, lessonItemNum } = this.state;

        return _jsx('div', {
            className: 'main-wrap'
        }, void 0, lesson == null && _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_4__Lesson_css___default.a.loading
        }, void 0, _jsx('i', {
            style: { fontSize: 30 },
            className: 'fa fa-circle-o-notch fa-spin '
        })), lesson !== null && _jsx('div', {
            className: 'courses tab-content'
        }, void 0, _jsx('div', {
            className: 'lesson-detail'
        }, void 0, _jsx('div', {
            className: 'ldtail-txt'
        }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_6__components_Link__["a" /* default */], {
            to: '/lessons/' + this.props.levelId + '#' + this.props.lessonId
        }, void 0, cateName)), _jsx('div', {
            className: 'ldtail-guide clearfix'
        }, void 0, _jsx('ul', {
            className: 'pathway f-l'
        }, void 0, lesson && lesson.card && lesson.card.length !== 0 && lesson.card.map((item, idx) => {
            return _jsx('li', {
                className: "pathway-itm " + (idx === lessonItemNum ? 'active ' : '')
                /*+ (item.active !== 1 ? 'pathway-hide' : '')*/
            }, idx + 1, _jsx(__WEBPACK_IMPORTED_MODULE_6__components_Link__["a" /* default */], {
                to: "/lesson/" + item.id + '/level/' + this.props.levelId + '/' + this.props.lessonId
            }, void 0, _jsx('span', {
                style: { 'backgroundImage': 'url(' + item.icon + ')' },
                'data-title': item.title,
                'data-desc': item.description,
                className: "pathway-circle " + (item.type === 4 ? 'gramma' : '')
            })));
        }))), _jsx(__WEBPACK_IMPORTED_MODULE_12__components_Pages_Lesson_Card_Item__["a" /* default */], {
            cardId: this.props.lesson_id,
            cardItmData: cardItmData,
            lesson: lesson,
            lessonItemNum: lessonItemNum,
            onClickGetCardItem: (id, idx) => this.onClickGetCardItem(id, idx),
            per: per
        }))));
    }
}

Lesson.childContextTypes = {
    level: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
    lessonId: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string
};

// Get return data, must register in reducer
function mapStateToProps(state) {
    const { lesson } = state.lesson;
    //console.log('lesson', lesson);
    return {
        lesson
    };
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
    return {
        getLesson: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_11__actions_lesson__["a" /* getLesson */], dispatch)
    };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Lesson_css___default.a)(Lesson)));

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Lesson__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(27);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





/* harmony default export */ __webpack_exports__["default"] = ({

  // path: '/lesson/:id/', // <- xoa cai này đi
  // path: '/lesson/:id/card/:card_id',
  path: '/lesson/:id/level/:levelId/:lessonId',

  action({ params }) {
    return _asyncToGenerator(function* () {

      return {
        title: 'Lesson',
        component: _jsx(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {
          layoutPr: 'no-level'
        }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1__Lesson__["a" /* default */], {
          lesson_id: params.id,
          levelId: params.levelId,
          lessonId: params.lessonId
        }))
      };
    })();
  }

});

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Lessons_css__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Lessons_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Lessons_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_Auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_lessons__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Pages_Lessons_Lesson_Item__ = __webpack_require__(112);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */









// Redux




// import component


class Lessons extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: true
        };
    }

    getChildContext() {
        //console.log(this.props.lesson_level)
        //let level = this.props.lesson_level ? this.props.lesson_level : JSON.parse(localStorage.getItem('infoProfile')).level;
        let level = this.props.lesson_level;
        return { level: level };
    }

    componentDidMount() {
        this.getLessons(this.props.lesson_level);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lesson_level !== this.props.lesson_level) {
            this.getLessons(nextProps.lesson_level);
        }
    }

    getLessons(levelId) {

        let token = __WEBPACK_IMPORTED_MODULE_5__modules_Auth__["a" /* default */].getToken();
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let params = {};
        params.token = token;
        params.course_id = userInfo.course_id;
        params.user_id = userInfo.id;

        if (levelId) {
            params.level = levelId;
        } else {
            params.level = userInfo.level;
        }

        this.props.getLessons(params);
    }

    render() {
        const { authenticated } = this.state;
        const { lessons, lesson_level } = this.props;

        return _jsx('div', {
            className: 'main-wrap'
        }, void 0, authenticated && _jsx('div', {
            className: 'courses tab-content'
        }, void 0, lessons == null && _jsx('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__Lessons_css___default.a.loading
        }, void 0, _jsx('i', {
            style: { fontSize: 30 },
            className: 'fa fa-circle-o-notch fa-spin '
        })), lessons && lessons.items && _jsx(__WEBPACK_IMPORTED_MODULE_9__components_Pages_Lessons_Lesson_Item__["a" /* default */], {
            lesson_level: lesson_level,
            lessons: lessons.items
        })));
    }
}

// Context
Lessons.childContextTypes = {
    level: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

// Get return data, must register in reducer
function mapStateToProps(state) {
    const { lessons } = state.lessons;

    return {
        lessons
    };
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
    return {
        getLessons: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_8__actions_lessons__["a" /* getLessons */], dispatch)
    };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Lessons_css___default.a)(Lessons)));

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Lessons__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(27);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1__Lessons__["a" /* default */], {}));

/* harmony default export */ __webpack_exports__["default"] = ({
  path: '/',

  children: [{
    path: '/',
    action({ params }) {
      return _asyncToGenerator(function* () {
        return {
          title: 'Lessons',
          component: _ref
        };
      })();
    }
  }, {
    path: '/lessons/:level',
    action({ params }) {
      return _asyncToGenerator(function* () {
        return {
          title: 'Lessons',
          component: _jsx(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {
            lesson_level: params.level
          }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1__Lessons__["a" /* default */], {
            lesson_level: params.level
          }))
        };
      })();
    }
  }]
});

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Profile_css__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Profile_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Profile_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_Auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_profile__ = __webpack_require__(32);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */









// Redux




var _ref = _jsx('i', {
    className: 'fa fa-birthday-cake'
});

var _ref2 = _jsx('i', {
    className: 'fa fa-map-marker'
});

var _ref3 = _jsx('i', {
    className: 'fa fa-phone'
});

class Profile extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: true,
            profileData: null
        };
    }

    componentDidMount() {
        // get info Profile
        let profileData = JSON.parse(localStorage.getItem('infoProfile'));

        // set item num for active title link
        this.setState({
            profileData
        });
    }

    render() {
        const { authenticated } = this.state;

        return _jsx('div', {
            className: 'main-wrap'
        }, void 0, authenticated && _jsx('div', {
            className: 'profile-wrap'
        }, void 0, _jsx('div', {
            className: 'profile-inner clearfix'
        }, void 0, _jsx('div', {
            className: 'prof-img',
            style: { backgroundImage: `url('${this.state.profileData === null || !this.state.profileData.avatar.length ? './images/no-avatar.png' : this.state.profileData.avatar}')` }
        }), _jsx('div', {
            className: 'prof-detail'
        }, void 0, _jsx('h3', {
            className: 'prof-ttl'
        }, void 0, this.state.profileData && this.state.profileData.name), _jsx('div', {
            className: 'prof-info'
        }, void 0, _jsx('div', {
            className: 'prof-info-itm'
        }, void 0, _jsx('div', {
            className: 'prof-info-box'
        }, void 0, _ref, this.state.profileData && this.state.profileData.birthday)), _jsx('div', {
            className: 'prof-info-itm'
        }, void 0, _jsx('div', {
            className: 'prof-info-box'
        }, void 0, _ref2, this.state.profileData && this.state.profileData.address), _jsx('div', {
            className: 'prof-info-box'
        }, void 0, _ref3, this.state.profileData && this.state.profileData.phone)))))));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Profile_css___default.a)(Profile));

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Profile__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(27);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1__Profile__["a" /* default */], {}));

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/profile',

  action({ store }) {
    return _asyncToGenerator(function* () {
      return {
        title: 'Profile',
        component: _ref
      };
    })();
  }

});

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






var _ref = _jsx('div', {}, void 0, _jsx('h1', {}, void 0, 'Error'), _jsx('p', {}, void 0, 'Sorry, a critical error occurred on this page.'));

function ErrorPage(props) {
  if (false) {
    const { error } = props;
    return _jsx('div', {}, void 0, _jsx('h1', {}, void 0, error.name), _jsx('p', {}, void 0, error.message), _jsx('pre', {}, void 0, error.stack));
  }

  return _ref;
}


/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default.a)(ErrorPage));

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
const subTitle = ' | English Town';
// The top-level (parent) route
/* harmony default export */ __webpack_exports__["a"] = ({

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [__webpack_require__(143).default, __webpack_require__(149).default, __webpack_require__(145).default, __webpack_require__(141).default,

  // Wildcard routes, e.g. { path: '*', ... } (must go last)
  __webpack_require__(151).default],

  action({ next }) {
    return _asyncToGenerator(function* () {
      // Execute each child route until one of them return the result
      const route = yield next();

      // Provide default values for title, description etc.
      route.title = `${route.title + subTitle || 'Untitled Page'}`;
      route.description = route.description || '';

      return route;
    })();
  }

});

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Login_css__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Login_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Login_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Link__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__history__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_user__ = __webpack_require__(26);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */








// Redux




var _ref = _jsx('div', {
  className: 'form-logo'
}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__components_Link__["a" /* default */], {
  to: '/'
}, void 0, _jsx('img', {
  src: './images/Logo_LoginPage.jpg',
  alt: 'English Town'
})));

var _ref2 = _jsx('div', {
  className: 'form-forgot t-c'
}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__components_Link__["a" /* default */], {
  to: '/'
}, void 0, 'Forgot password?'));

class Login extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiError: false,
      apiSuccess: false,
      msgErrorText: '',
      validEmail: false,
      validPassword: false,
      lngError: false,
      errLenghText: '',
      loadingApi: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus(event) {
    if (event.target.name == 'lemail') {
      this.setState({
        validEmail: false,
        lngError: false
      });
    }

    if (event.target.name == 'lpass') {
      this.setState({
        validPassword: false
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      apiError: false,
      apiSuccess: false,
      msgErrorText: '',
      loadingApi: true
    });

    const lemail = this.refs.lemail;
    const password = this.refs.password;
    var err = false;

    if (lemail.value === '' || lemail.value.trim().length === 0) {
      err = true;
      this.setState({ msgErrorText: 'This field is required!', validEmail: true, loadingApi: false });
    }

    if (password.value === '' || password.value.trim().length === 0) {
      err = true;
      this.setState({ msgErrorText: 'This field is required!', validPassword: true, loadingApi: false });
    }

    if (lemail.value.length < 6 || lemail.value.length > 30) {
      err = true;
      this.setState({ errLenghText: 'Minimum 6 and maximum 30', lngError: true, loadingApi: false });
    }

    if (!err) {
      this.setState({
        msgErrorText: '',
        validEmail: false,
        validPassword: false,
        lngError: false,
        errLenghText: ''
      });
      const params = { lemail: lemail.value.trim(), password: password.value.trim() };

      this.props.postLogin(params);
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.user && nextProps.user !== null) {

      // login succedd
      if (nextProps.user.code == 200) {
        this.setState({
          apiSuccess: true,
          msgErrorText: nextProps.user.message,
          loadingApi: false
        });

        setTimeout(function () {
          __WEBPACK_IMPORTED_MODULE_5__history__["a" /* default */].push('/');
        }, 1000);

        localStorage.setItem('infoProfile', JSON.stringify(nextProps.user.data.profile));
      }

      // login failed
      if (nextProps.user.code == 401) {
        let msgError = '';

        if (nextProps.user.message.password) {
          msgError = nextProps.user.message.password[0];
        }

        if (nextProps.user.message.username) {
          msgError = nextProps.user.message.username[0];
        }

        this.setState({
          apiError: true,
          msgErrorText: msgError,
          loadingApi: false
        });
      }
    }
  }

  componentDidMount() {
    // console.log(localStorage.getItem('user_access'));
  }

  render() {
    const { validEmail, lngError, msgErrorText,
      errLenghText, validPassword, loadingApi,
      apiError, apiSuccess } = this.state;

    return _jsx('div', {
      className: 'form login-form t-c'
    }, void 0, _jsx('form', {
      onSubmit: this.handleSubmit
    }, void 0, _ref, apiError == true && _jsx('div', {
      className: 'form-group'
    }, void 0, _jsx('div', {
      className: 'alert alert-danger'
    }, void 0, msgErrorText)), apiSuccess == true && _jsx('div', {
      className: 'form-group'
    }, void 0, _jsx('div', {
      className: 'alert alert-success'
    }, void 0, msgErrorText)), _jsx('div', {
      className: 'form-group'
    }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
      name: 'lemail',
      ref: 'lemail',
      placeholder: 'Email or your phone number',
      className: 'form-control',
      onFocus: this.onFocus,
      style: validEmail || lngError ? { borderBottomColor: '#db0000' } : {} }), msgErrorText !== '' && validEmail && _jsx('p', {
      className: __WEBPACK_IMPORTED_MODULE_3__Login_css___default.a.errMsg
    }, void 0, msgErrorText), errLenghText !== '' && lngError && !validEmail && _jsx('p', {
      style: { color: '#db0000', textAlign: 'left', marginBottom: 0 }
    }, void 0, errLenghText)), _jsx('div', {
      className: 'form-group'
    }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'password',
      name: 'lpass',
      ref: 'password',
      placeholder: 'Password',
      className: 'form-control',
      onFocus: this.onFocus,
      style: validPassword ? { borderBottomColor: '#db0000' } : {} }), msgErrorText !== '' && validPassword && _jsx('p', {
      className: __WEBPACK_IMPORTED_MODULE_3__Login_css___default.a.errMsg
    }, void 0, msgErrorText)), _ref2, _jsx('button', {
      type: 'submit',
      style: loadingApi ? { pointerEvents: 'none', backgroundColor: 'rgba(233, 126, 3, 0.56)' } : {},
      className: 'btn btn-submit'
    }, void 0, loadingApi && _jsx('i', {
      style: { marginRight: 10 },
      className: 'fa fa-circle-o-notch fa-spin '
    }), 'Sign in')));
  }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { user } = state.user;
  return {
    user
  };
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    postLogin: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_8__actions_user__["b" /* postLogin */], dispatch)
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Login_css___default.a)(Login)));

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_LayoutLogin__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Login__ = __webpack_require__(148);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





const title = 'Log In';

var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_1__components_LayoutLogin__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_2__Login__["a" /* default */], {
  title: title
}));

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/login',

  action({ store }) {
    return _asyncToGenerator(function* () {
      return {
        title,
        component: _ref
      };
    })();
  }

});

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NotFound_css__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NotFound_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__NotFound_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Link__ = __webpack_require__(7);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */







var _ref = _jsx('h2', {
  className: "sub-title fontNino"
}, void 0, '404');

var _ref2 = _jsx('p', {}, void 0, 'Sorry, the page you were trying to view does not exist.');

var _ref3 = _jsx('p', {}, void 0, 'Please go to\xA0', _jsx(__WEBPACK_IMPORTED_MODULE_4__components_Link__["a" /* default */], {
  to: "/"
}, void 0, 'home page'), '!');

class NotFound extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  componentDidMount() {
    hideLogoAndLeftSb();
  }

  render() {
    return _jsx('div', {
      className: ["notfound", "login-form"].join(' ')
    }, void 0, _jsx('div', {
      className: "inner"
    }, void 0, _ref, _jsx('div', {
      className: 'ct-blk'
    }, void 0, _jsx('h1', {
      className: "m-title fontNino"
    }, void 0, this.props.title), _ref2, _ref3)));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__NotFound_css___default.a)(NotFound));

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_LayoutLogin__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NotFound__ = __webpack_require__(150);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





const title = 'Page Not Found';

var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_1__components_LayoutLogin__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_2__NotFound__["a" /* default */], {
  title: title
}));

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '*',

  action() {
    return {
      title,
      component: _ref,
      status: 404
    };
  }

});

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/**
 * Middleware NODEjs
 * Created by MinhNguyenWP on 06/2017.
 */


// import authorizedRoutes from '../routes/authorized';

const middleware = __WEBPACK_IMPORTED_MODULE_0_express___default()();

middleware.use(['/login'], (req, res, next) => {
  //console.log('mdw id_token', req.cookies.key_token);
  if (req.cookies.key_token) {
    return res.redirect('/');
  }

  return next();
});

middleware.use(/^\/((?!(login|register)$).)*$/, (req, res, next) => {
  //console.log('mdw key toooooken', req.cookies.key_token);
  // Check user token for user login state
  if (!req.cookies.key_token) {
    return res.redirect('/login');
  }

  return next();
});

///middleware.use(authorizedRoutes);

/* harmony default export */ __webpack_exports__["a"] = (middleware);

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createHelpers__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logger__ = __webpack_require__(155);






function configureStore(initialState, config) {
  const helpers = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__createHelpers__["a" /* default */])(config);
  const { apolloClient } = config;

  const middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a.withExtraArgument(helpers), apolloClient.middleware()];

  let enhancer;

  if (false) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(applyMiddleware(...middleware), devToolsExtension);
  } else {
    enhancer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(...middleware);
  }

  const rootReducer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__reducers__["a" /* default */])({
    apolloClient
  });

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (false) {
    module.hot.accept('../reducers', () =>
    // eslint-disable-next-line global-require
    store.replaceReducer(require('../reducers').default));
  }

  return store;
}

/*
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHelpers from './createHelpers';
import createLogger from './logger';

export default function configureStore(initialState, helpersConfig) {
  const helpers = createHelpers(helpersConfig);
  const middleware = [thunk.withExtraArgument(helpers)];

  let enhancer;

  if (__DEV__) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default),
    );
  }

  return store;
}
*/

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createHelpers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_fetch__ = __webpack_require__(116);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



const graphqlRequestDeprecatedMessage = `\`graphqlRequest\` has been deprecated.
You should use Apollo: \`client.query({ query, variables...})\` or \`client.mutate()\`
Don't forget to enclose your query to gql\`…\` tag or import *.graphql file.
See docs at http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient\\.query`;

function createGraphqlRequest(apolloClient) {
  return (() => {
    var _ref = _asyncToGenerator(function* (queryOrString, variables, options = {}) {
      if (false) {
        // eslint-disable-next-line no-console
        console.error(graphqlRequestDeprecatedMessage);
      }

      const { skipCache } = options;
      let query = queryOrString;
      if (typeof queryOrString === 'string') {
        const gql = yield new Promise(function(resolve) { resolve(); }).then((function (require) {
          return __webpack_require__(214);
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        query = gql([queryOrString]);
      }

      if (skipCache) {
        return apolloClient.networkInterface.query({ query, variables });
      }

      let isMutation = false;
      if (query.definitions) {
        isMutation = query.definitions.some(function (definition) {
          return definition && definition.operation === 'mutation';
        });
      }
      if (isMutation) {
        return apolloClient.mutate({ mutation: query, variables });
      }
      return apolloClient.query({ query, variables });
    });

    function graphqlRequest(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return graphqlRequest;
  })();
}

function createFetchKnowingCookie({ cookie }) {
  if (true) {
    return (url, options = {}) => {
      const isLocalUrl = /^\/($|[^/])/.test(url);

      // pass cookie only for itself.
      // We can't know cookies for other sites BTW
      if (isLocalUrl && options.credentials === 'include') {
        const headers = _extends({}, options.headers, {
          cookie
        });
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_fetch__["a" /* default */])(url, _extends({}, options, { headers }));
      }

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_fetch__["a" /* default */])(url, options);
    };
  }

  return __WEBPACK_IMPORTED_MODULE_0__core_fetch__["a" /* default */];
}

function createHelpers(config) {
  const fetchKnowingCookie = createFetchKnowingCookie(config);
  const graphqlRequest = createGraphqlRequest(config.apolloClient);

  return {
    client: config.apolloClient,
    history: config.history,
    fetch: fetchKnowingCookie,
    // @deprecated('Use `client` instead')
    apolloClient: config.apolloClient,
    // @deprecated('Use `client.query()` or `client.mutate()` instead')
    graphqlRequest
  };
}

/*
function createGraphqlRequest(fetch) {
  return async function graphqlRequest(query, variables) {
    const fetchConfig = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      credentials: 'include',
    };
    const resp = await fetch('/graphql', fetchConfig);
    if (resp.status !== 200) throw new Error(resp.statusText);
    return resp.json();
  };
}

export default function createHelpers({ fetch, history }) {
  return {
    fetch,
    history,
    graphqlRequest: createGraphqlRequest(fetch),
  };
}*/

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_util__);


function inspectObject(object) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_util__["inspect"])(object, {
    colors: true
  });
}

function singleLine(str) {
  return str.replace(/\s+/g, ' ');
}

const actionFormatters = {
  // This is used at feature/apollo branch, but it can help you when implementing Apollo
  APOLLO_QUERY_INIT: a => `queryId:${a.queryId} variables:${inspectObject(a.variables)}\n   ${singleLine(a.queryString)}`,

  APOLLO_QUERY_RESULT: a => `queryId:${a.queryId}\n   ${singleLine(inspectObject(a.result))}`,

  APOLLO_QUERY_STOP: a => `queryId:${a.queryId}`
};

// Server side redux action logger
function createLogger() {
  // eslint-disable-next-line no-unused-vars
  return store => next => action => {
    let formattedPayload = '';
    const actionFormatter = actionFormatters[action.type];
    if (typeof actionFormatter === 'function') {
      formattedPayload = actionFormatter(action);
    } else if (action.toString !== Object.prototype.toString) {
      formattedPayload = action.toString();
    } else if (typeof action.payload !== 'undefined') {
      formattedPayload = inspectObject(action.payload);
    } else {
      formattedPayload = inspectObject(action);
    }

    console.log(` * ${action.type}: ${formattedPayload}`); // eslint-disable-line no-console
    return next(action);
  };
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "._1UUMy{background:#333;color:#fff}._3dfAC{margin:0 auto;padding:20px 15px;max-width:1000px;text-align:center}._3ReUN{color:hsla(0,0%,100%,.5)}._297xE{color:hsla(0,0%,100%,.3)}._3qHjF,._3ReUN{padding:2px 5px;font-size:1em}._3qHjF,._3qHjF:active,._3qHjF:visited{color:hsla(0,0%,100%,.6);text-decoration:none}._3qHjF:hover{color:#fff}", ""]);

// exports
exports.locals = {
	"root": "_1UUMy",
	"container": "_3dfAC",
	"text": "_3ReUN",
	"spacer": "_297xE",
	"link": "_3qHjF"
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "a{color:#555}a,a:focus{outline:none}.O9oW9{background:#373277;color:#fff}li:focus{outline:none}.qQ2mF{margin:0 auto;padding:20px 0;max-width:1000px}._2oS_y{color:#92e5fc;text-decoration:none;font-size:1.75em}._230aH{margin-left:10px}._2AXOj{text-align:center}._3dmwX{margin:0;padding:10px;font-weight:400;font-size:4em;line-height:1em}.I2eY9{padding:0;color:hsla(0,0%,100%,.5);font-size:1.25em;margin:0}", ""]);

// exports
exports.locals = {
	"root": "O9oW9",
	"container": "qQ2mF",
	"brand": "_2oS_y",
	"brandTxt": "_230aH",
	"banner": "_2AXOj",
	"bannerTitle": "_3dmwX",
	"bannerDesc": "I2eY9"
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "._1hd1M{cursor:pointer}", ""]);

// exports
exports.locals = {
	"linkLogout": "_1hd1M"
};

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".bViTF{cursor:pointer}", ""]);

// exports
exports.locals = {
	"linkLogout": "bViTF"
};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "._3E-qa{background-repeat:no-repeat;background-position:50%;background-color:#fcdc52;position:fixed;top:0;right:0;bottom:0;left:0;overflow:hidden;overflow-y:auto}", ""]);

// exports
exports.locals = {
	"root": "_3E-qa"
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "._2gcJx{float:right;margin:6px 0 0}.Ntl35{display:inline-block;padding:3px 8px;text-decoration:none;font-size:1.125em}.Ntl35,.Ntl35:active,.Ntl35:visited{color:hsla(0,0%,100%,.6)}._2UNlq,.Ntl35:hover{color:#fff}._2UNlq{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(0,0,0,.15)}._2UNlq:hover{background:rgba(0,0,0,.3)}._3vZVG{color:hsla(0,0%,100%,.3)}", ""]);

// exports
exports.locals = {
	"root": "_2gcJx",
	"link": "Ntl35",
	"highlight": "_2UNlq",
	"spacer": "_3vZVG"
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".Mozdr{text-align:center;font-weight:700;text-transform:uppercase;color:#414141;margin-bottom:0}._2EY67{width:100%}._12xXz{text-align:center;margin-top:30px}._12xXz ._3VMD3{color:#3ed5be;margin-right:10px;font-size:16px;cursor:pointer}._12xXz ._2LG75{display:inline-block;width:24px;height:24px;line-height:24px;font-size:18px;background-color:#3ed5be;color:#fff;border-radius:50%}.MD4z6{margin-top:10px;text-align:center;font-size:16px}._2a3Ao{position:relative}._2x68D{padding:15px 0!important;background:#f9f9f9}._2AjLX{margin-top:80px}._1_IsP,._2AjLX{color:#3ed5be;font-size:16px;margin-bottom:15px}._1_IsP,.znXuf{margin-top:20px}.znXuf{font-size:16px;margin-bottom:10px}._3t2X_{color:#3ed5be;font-size:16px}._3A6PS{margin-top:40px}._1iGIs{font-size:14px;margin-bottom:10px;margin-top:10px}._3R0hE{font-size:16px;padding:80px 0;border:1px solid #f2f5f8;border-bottom:none;border-radius:5px 0}._2LKrX{cursor:pointer}.LK6hj p{position:relative;margin-bottom:15px}._12mcy i{font-size:24px;color:#fff;margin-right:5px;vertical-align:-3px}.LK6hj ._2TfA4{display:inline-block;outline:none;height:20px;line-height:20px;border:none;border-bottom:1px solid #3ed5be;padding:0 10px;font-size:12px;vertical-align:5px;margin-left:5px;margin-right:5px;color:#7a7a7a}.LK6hj input[type=submit]{color:#fff;background-color:#3ed5be;padding:10px 40px;font-size:20px;border-radius:50px}.cgaoZ{color:#3ed5be}._1FF9L{color:#e97e03}._1xpZ9{display:block;margin-bottom:15px}.LK6hj input[type=submit]:hover{color:#fff;background-color:#95f9ea}._12mcy{font-size:16px;margin-bottom:20px;margin-top:20px;text-align:center}._1d6D4{color:#fc9723;margin-top:5px}._1qzEb{background-color:green}._1qzEb,._312y5{width:100%;height:50px}._312y5{background-color:red}._3YCRP{background-color:#ff0;width:100%;height:50px}._1sd6B{width:100%;margin-bottom:15px}._1sd6B,.z2Dsi{height:50px;background-color:#3ed5be;border-radius:5px;text-align:center;font-size:16px;color:#fff;line-height:50px;cursor:move;-webkit-box-shadow:inset 0 -7px 0 -.4375rem #186357;-o-box-shadow:inset 0 -7px 0 -.4375rem #186357;box-shadow:inset 0 -7px 0 -.4375rem #186357}.z2Dsi{display:inline-block;width:auto;margin-right:20px;padding-left:30px;padding-right:30px;margin-bottom:10px}.z2Dsi:last-child{margin-right:0}._1I8f8{width:100%}._1I8f8,.jfFAm{margin-bottom:15px;height:50px;line-height:50px;border:2px dashed #ddd;border-radius:5px;text-align:center;color:#ddd;background:none;-webkit-box-shadow:none;-o-box-shadow:none;box-shadow:none;cursor:none}.jfFAm{padding-left:30px;padding-right:30px;display:inline-block;width:auto;margin-right:20px}.jfFAm:last-child{margin-right:0}._18anv{padding-left:30px;padding-right:30px;display:none;width:auto;margin-bottom:15px;height:50px;line-height:50px;border:2px dashed #ddd;border-radius:5px;text-align:center;color:#ddd;background:none;-webkit-box-shadow:none;-o-box-shadow:none;box-shadow:none;cursor:none;margin-right:20px}._18anv:last-child{margin-right:0}._1wCp3{margin-bottom:15px;display:table;width:100%}._1Rjm7{display:table-cell;vertical-align:middle}._1Rjm7,._2goG-{width:100%;height:50px}._2goG-{margin-bottom:15px;line-height:normal;border:2px solid #bbb;border-radius:5px;text-align:center;color:#bbb;display:table}._3X4Vq{display:table-cell;vertical-align:middle;height:46px;padding-left:10px;padding-right:10px;line-height:13px}._1Yh_B{background:#fff}._1Yh_B,._9aZiv{display:inline-block;padding-left:30px;padding-right:30px;min-width:120px;margin-left:10px;margin-right:10px;height:50px;line-height:50px;vertical-align:middle;border:2px dashed #bbb;border-radius:5px;text-align:center;color:#bbb}._9aZiv{background-color:#f2f5f8}._3KzUS,.mh6Xl{display:inline-block;height:50px;line-height:50px;vertical-align:middle;text-align:center}._3KzUS{padding-left:30px;padding-right:30px;min-width:120px;margin-top:15px;margin-left:10px;margin-right:10px;border:2px solid transparent;border-radius:5px;color:#bbb}._1JtEP{width:100%;margin-bottom:15px}._1cNVi,._1JtEP{height:50px;line-height:50px;border:2px dashed #3ed5be;border-radius:5px;text-align:center;color:#ddd}._1cNVi{display:inline-block;padding-left:30px;padding-right:30px;min-width:120px;margin-left:10px;margin-right:10px;vertical-align:middle}._2EEvY{width:100%;margin-bottom:15px}._1IP3Z,._2EEvY{height:50px;background-color:#3ed5be;border-radius:5px;text-align:center;font-size:16px;color:#fff;line-height:50px;border:none;cursor:move;-webkit-box-shadow:inset 0 -7px 0 -.4375rem #186357;-o-box-shadow:inset 0 -7px 0 -.4375rem #186357;box-shadow:inset 0 -7px 0 -.4375rem #186357}._1IP3Z{display:inline-block;padding-left:30px;padding-right:30px;min-width:120px;margin-left:10px;margin-right:10px;vertical-align:middle}._9e_VK{width:100%;margin-bottom:15px}._1U_Sd,._9e_VK{height:50px;background-color:#e97e03;border-radius:5px;text-align:center;font-size:16px;color:#fff;line-height:50px;border:none;cursor:move;-webkit-box-shadow:inset 0 -7px 0 -.4375rem #733e00;-o-box-shadow:inset 0 -7px 0 -.4375rem #733e00;box-shadow:inset 0 -7px 0 -.4375rem #733e00;-webkit-animation:Auwh4 .5s linear;animation:Auwh4 .5s linear}._1U_Sd{display:inline-block;padding-left:30px;padding-right:30px;min-width:120px;margin-left:10px;margin-right:10px;vertical-align:middle}._31C08{-webkit-animation:_276cX .4s;animation:_276cX .4s}.Va5_X{min-height:80px;padding:0}._39snn{padding-top:0}._1XKvU{display:block;vertical-align:middle;min-height:80px;border:2px dashed #ddd;background-color:#f2f5f8;border-radius:5px;color:#ddd;margin:15px}._1XKvU,._2CPdD{text-align:center}._2CPdD{width:30px;height:30px;margin:0 auto;margin-bottom:0;line-height:30px}._2CPdD i{font-size:24px;color:#ddd;-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}._2npTB{border:2px solid #3ed5be;border-radius:5px;width:100%}._1ZNNi{min-height:50px;width:100%;vertical-align:middle;text-align:center}.t5rhh{margin-top:10px}.t5rhh span{color:#fff;background-color:#e97e03;padding:10px 40px;font-size:20px;border-radius:50px}.t5rhh span._139Uk{pointer-events:none;cursor:default;background-color:rgba(233,126,3,.4)}.t5rhh span:hover{color:#fff;background-color:#fdc788}._39-K_{margin-top:40px}._39-K_._3IFGF{margin-top:0}._39-K_._3x4Gd{margin-top:20px}._2Lorh{margin-bottom:20px}._3_OE2{width:48px;height:48px;float:left;position:relative;border-radius:50%;margin-right:10px}._3_OE2:before{width:46px;height:46px;content:\"\";background-color:rgba(62,213,190,.3);border-radius:50%;-webkit-animation:_1WQUN 1s infinite;animation:_1WQUN 1s infinite;display:none;position:absolute;top:50%;left:50%;margin:-23px 0 0 -23px}._3-r-g{width:40px;height:40px;background-size:40px auto;background-position:top;margin:0;background-repeat:no-repeat;border-radius:50%;position:relative;z-index:1;margin:0 auto;top:5px}._2vZGv{min-width:520px;max-width:520px;padding:10px 10px 10px 5px;border-radius:5px}._2vZGv ._3Fgct{font-size:11px;margin-bottom:5px;color:#999}._2vZGv ._3I0KR{font-size:13px;line-height:16px}._2vZGv{background-color:#f2f5f8;color:#414141;float:left;-webkit-box-shadow:1px 1px 2px hsla(210,2%,64%,.8);-o-box-shadow:1px 1px 2px hsla(210,2%,64%,.8);box-shadow:1px 1px 2px hsla(210,2%,64%,.8);position:relative}._2vZGv .MCxg6{font-size:20px;color:#3ed5be;right:10px}._2vZGv .MCxg6,._2vZGv:before{position:absolute;top:10px;z-index:1}._2vZGv:before{content:\"\";width:0;height:0;border-style:solid;border-width:7.5px 10px 7.5px 0;border-color:transparent #f2f5f8 transparent transparent;left:-8px}._1CeC8,._1CeC8 ._2vZGv,._1CeC8 ._3_OE2{float:right}._1CeC8 ._3_OE2{margin-right:0;margin-left:10px}._1CeC8 ._2vZGv{text-align:right;margin-left:0;padding:10px 5px 10px 10px;-webkit-box-shadow:-1px 1px 2px hsla(210,2%,64%,.8);-o-box-shadow:-1px 1px 2px hsla(210,2%,64%,.8);box-shadow:-1px 1px 2px hsla(210,2%,64%,.8)}._1CeC8 ._2vZGv ._3I0KR{float:right}._1CeC8 ._2vZGv:before{border-width:7.5px 0 7.5px 10px;border-color:transparent transparent transparent #f2f5f8;left:auto;right:-8px}._1CeC8 ._2vZGv .MCxg6{right:auto;left:10px}._2Lorh{cursor:pointer}._2Lorh ._2vZGv:hover .MCxg6{-webkit-animation:_1WQUN 1s infinite;animation:_1WQUN 1s infinite}._2vZGv .m8N8p{color:#bbb;cursor:default}._2Lorh ._2vZGv:hover .MCxg6.m8N8p{-webkit-animation:none;animation:none}._2Lorh._1M7WN ._2vZGv{background-color:#3ed5be;color:#fff}._2Lorh._1M7WN ._3Fgct{color:#fff}._2Lorh._1M7WN ._2vZGv:before{border-color:transparent #3ed5be transparent transparent}._2Lorh._1M7WN ._1CeC8 ._2vZGv:before{border-color:transparent transparent transparent #3ed5be}._2Lorh._1M7WN .MCxg6{-webkit-animation:_1WQUN 1s infinite;animation:_1WQUN 1s infinite;color:#fff}._2Lorh._1M7WN ._3_OE2:before{display:inline-block}._2Lorh._1M7WN ._1IP3Z{display:inline-block;padding-left:30px;padding-right:30px;min-width:120px;margin-left:10px;margin-right:10px;vertical-align:middle;height:50px;background-color:#f2f5f8;border-radius:5px;text-align:center;font-size:16px;color:#414141;line-height:50px;border:none;cursor:move;-webkit-box-shadow:inset 0 -7px 0 -.4375rem #ddd;-o-box-shadow:inset 0 -7px 0 -.4375rem #ddd;box-shadow:inset 0 -7px 0 -.4375rem #ddd}._2Lorh._1M7WN ._1Yh_B{border-color:#fff;color:#414141;background-color:#fff}._2Lorh ._1IP3Z,._2Lorh ._2EEvY{font-size:13px}._2Lorh._1M7WN .J_R4G.hUBa5{background-color:#fff;color:#3ed5be}._2Lorh._1M7WN .J_R4G.hUBa5._tEA2:before{background-color:hsla(0,0%,100%,.2)}._33Pzw{display:block;padding-top:10px}._2Lorh._1M7WN ._33Pzw{color:#fff}@-webkit-keyframes Auwh4{0%,to{-webkit-transform:translateX(0)}10%,30%,50%,70%,90%{-webkit-transform:translateX(-10px)}20%,40%,60%,80%{-webkit-transform:translateX(10px)}}@keyframes Auwh4{0%,to{-webkit-transform:translateX(0);transform:translateX(0)}10%,30%,50%,70%,90%{-webkit-transform:translateX(-10px);transform:translateX(-10px)}20%,40%,60%,80%{-webkit-transform:translateX(10px);transform:translateX(10px)}}@-webkit-keyframes _276cX{0%{-webkit-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(.8);transform:scale(.8)}60%{-webkit-transform:scale(1.2);transform:scale(1.2)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes _276cX{0%{-webkit-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(.8);transform:scale(.8)}60%{-webkit-transform:scale(1.2);transform:scale(1.2)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes _1WQUN{0%{-webkit-transform:scale(.8);transform:scale(.8);opacity:.8}99%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes _1WQUN{0%{-webkit-transform:scale(.8);transform:scale(.8);opacity:.8}99%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}._1DB1w,._3tJpp .Ykbfw{text-align:center}._3tJpp .Ykbfw{font-size:18px;margin:0 0 10px;font-weight:700}._3tJpp ._2yXUC{color:#999;text-align:center;margin-bottom:10px}._3rTzJ{width:80px;height:80px;display:block;background-repeat:no-repeat;background-size:cover;border-radius:50%;margin:0;cursor:pointer;border:2px solid #ddd;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}._3rTzJ:hover{border-color:#3ed5be}._2WmNT{display:inline-block;margin-right:20px}._2WmNT:last-child{margin-right:0}._2WmNT span{font-size:12px;color:#999}@media (max-width:767px){._2AjLX{margin-top:50px;font-size:14px}._3R0hE{padding:50px 0;font-size:14px}._2vZGv{min-width:0;max-width:none;width:100%;margin-left:0;margin-top:5px}.z2Dsi{line-height:40px;font-size:14px;margin-right:10px;margin-bottom:10px;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;max-width:180px}._1Yh_B,.z2Dsi{height:40px;padding-left:20px;padding-right:20px}._1Yh_B{min-width:80px}._3_OE2{float:none;margin-bottom:5px}._1CeC8 ._2vZGv,._2vZGv{padding:10px}}", ""]);

// exports
exports.locals = {
	"nodata": "Mozdr",
	"video": "_2EY67",
	"hideHint": "_12xXz",
	"hintTitle": "_3VMD3",
	"hintIcon": "_2LG75",
	"hintAnswer": "MD4z6",
	"lword": "_2a3Ao",
	"new_word": "_2x68D",
	"record_title": "_2AjLX",
	"audrecord_title": "_1_IsP",
	"order_title_lrg": "znXuf",
	"order_title": "_3t2X_",
	"show_answer_correct": "_3A6PS",
	"record_repeat_title": "_1iGIs",
	"wordonly": "_3R0hE",
	"wordmeans": "_2LKrX",
	"fill_answer": "LK6hj",
	"hintFillAnswer": "_12mcy",
	"ipt": "_2TfA4",
	"txt_right": "cgaoZ",
	"txt_wrong": "_1FF9L",
	"msg_blk": "_1xpZ9",
	"msg_invalid": "_1d6D4",
	"green": "_1qzEb",
	"red": "_312y5",
	"yellow": "_3YCRP",
	"answer_opt": "_1sd6B",
	"sentence_opt": "z2Dsi",
	"isDragging": "_1I8f8",
	"sentence_dragging": "jfFAm",
	"role2_sentence_dragging": "_18anv",
	"question_opt": "_1wCp3",
	"question_ttl": "_1Rjm7",
	"ans_result": "_2goG-",
	"dropSuggest": "_3X4Vq",
	"sentence_result": "_1Yh_B",
	"sentence_active": "_9aZiv",
	"sentence_res": "mh6Xl",
	"order_result": "_3KzUS",
	"isActive": "_1JtEP",
	"sentence_result_active": "_1cNVi",
	"dropped": "_2EEvY",
	"sentence_result_dropped": "_1IP3Z",
	"dropped_wrong": "_9e_VK",
	"shake": "Auwh4",
	"sentence_result_wrong": "_1U_Sd",
	"result_true": "_31C08",
	"pop": "_276cX",
	"reorder_wrap": "Va5_X",
	"reorder_haschild": "_39snn",
	"reorder_wrap_active": "_1XKvU",
	"arr_direct": "_2CPdD",
	"order_wrap": "_2npTB",
	"drop_order": "_1ZNNi",
	"button_wrap": "t5rhh",
	"disabled": "_139Uk",
	"conversation_wrap": "_39-K_",
	"notop": "_3IFGF",
	"role_wrap": "_3x4Gd",
	"conver_item": "_2Lorh",
	"conver_img_wrap": "_3_OE2",
	"run_light": "_1WQUN",
	"conver_img": "_3-r-g",
	"conver_content": "_2vZGv",
	"conver_name": "_3Fgct",
	"conver_desc": "_3I0KR",
	"conver_sound": "MCxg6",
	"conver_right": "_1CeC8",
	"sound_block": "m8N8p",
	"conver_active": "_1M7WN",
	"record_phone": "J_R4G",
	"role_record_phone": "hUBa5",
	"recording": "_tEA2",
	"record_txt": "_33Pzw",
	"teacher_img_wrap": "_1DB1w",
	"teacher_wrap": "_3tJpp",
	"teacher_ttl": "Ykbfw",
	"teacher_desc": "_2yXUC",
	"teacher_img": "_3rTzJ",
	"teach_item": "_2WmNT"
};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "._33cTN{position:relative;display:block;height:140px;width:140px;background-color:#e97e03;padding-top:25px;padding-top:1.5625rem;border-radius:50%;margin:30px auto}._2j_hn{position:absolute;top:-40px;left:-36px;width:200px;height:145px}._2j_hn .AptyL{fill:#3ed5be}.AptyL svg{display:block;width:100%;height:100%;fill:inherit}._1Ye_a .FiWjN{color:#fff;font-size:24px;font-weight:300;text-align:center}._1Ye_a .FiWjN span{font-size:50px;line-height:50px;margin-top:10px;display:block}._3zmIo{font-size:24px;margin-bottom:10px}._3zmIo,.S6Dkl{text-align:center}.S6Dkl{font-size:18px;margin-bottom:30px}.pknsp{text-align:center}.pknsp span{color:#fff;background-color:#3ed5be;padding:10px 40px;font-size:20px;border-radius:50px}.pknsp span:hover{color:#fff;background-color:#95f9ea}", ""]);

// exports
exports.locals = {
	"result_circle": "_33cTN",
	"result_star": "_2j_hn",
	"icon": "AptyL",
	"result_status": "_1Ye_a",
	"score": "FiWjN",
	"result_title": "_3zmIo",
	"result_subtitle": "S6Dkl",
	"button_wrap": "pknsp"
};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".wbNvU{position:relative}._3NKU2{padding:30px 0!important}@media (max-width:767px){._3NKU2{padding:10px 0!important}}", ""]);

// exports
exports.locals = {
	"lword": "wbNvU",
	"new_word": "_3NKU2"
};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "._2N0LD{font-size:30px;color:#e97e03}._2N0LD,._2uWR_{text-align:center}._2uWR_{font-weight:700;text-transform:uppercase;color:#414141;margin-bottom:0}._1jBuI{width:100%}", ""]);

// exports
exports.locals = {
	"loading": "_2N0LD",
	"nodata": "_2uWR_",
	"video": "_1jBuI"
};

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "._3Sdlt{text-align:center;font-size:30px;color:#e97e03}", ""]);

// exports
exports.locals = {
	"loading": "_3Sdlt"
};

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "._2uCUJ{font-size:30px;color:#e97e03}._2uCUJ,.I8-sC{text-align:center}.I8-sC{font-weight:700;text-transform:uppercase;color:#414141;margin-bottom:0}", ""]);

// exports
exports.locals = {
	"loading": "_2uCUJ",
	"nodata": "I8-sC"
};

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "*{line-height:1.2;margin:0}html{color:#888;display:table;font-family:sans-serif;height:100%;text-align:center;width:100%}body{display:table-cell;vertical-align:middle;padding:2em}h1{color:#555;font-size:2em;font-weight:400}p{margin:0 auto;width:280px}pre{text-align:left;margin-top:32px;margin-top:2rem}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);

// exports


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "._11cMf{color:#db0000;text-align:left;margin-bottom:0}", ""]);

// exports
exports.locals = {
	"errMsg": "_11cMf"
};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}[hidden],template{display:none}", ""]);

// exports


/***/ }),
/* 181 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"defaultValue":null},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"id"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"username"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"token"},"arguments":[],"directives":[],"selectionSet":null}]}}]}}],"loc":{"start":0,"end":143}};
    doc.loc.source = {"body":"query login( $username: String!, $password: String!)  {\n  login(username: $username, password: $password) {\n    id\n    username\n    token\n  }\n}","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),
/* 182 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":null,"variableDefinitions":null,"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"logout"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"id"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"username"},"arguments":[],"directives":[],"selectionSet":null}]}}]}}],"loc":{"start":0,"end":39}};
    doc.loc.source = {"body":"{\n  logout {\n    id\n    username\n  }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(156);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./CourseMobile.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./CourseMobile.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(157);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Footer.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Footer.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(158);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Course.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Course.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(159);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Header.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Header.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(160);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./MenuMobile.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./MenuMobile.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(161);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Profile.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Profile.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(162);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Layout.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Layout.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(163);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./LayoutLogin.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./LayoutLogin.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(164);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Navigation.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Navigation.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(166);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./FinishCardItem.css", function() {
        content = require("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./FinishCardItem.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(167);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./TextCardItem.css", function() {
        content = require("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./TextCardItem.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(168);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./VideoCardItem.css", function() {
        content = require("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./VideoCardItem.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(169);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./VideoQACardItem.css", function() {
        content = require("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./VideoQACardItem.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(171);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Lesson_Cards.css", function() {
        content = require("!!../../../../../../node_modules/css-loader/index.js??ref--1-1!../../../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Lesson_Cards.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(172);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Sidebar.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Sidebar.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(173);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./SubMenu.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./SubMenu.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(174);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Lesson.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Lesson.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(175);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Lessons.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Lessons.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(176);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Profile.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Profile.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(178);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Login.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Login.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(179);
    var insertCss = __webpack_require__(5);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./NotFound.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./NotFound.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 204 */
/***/ (function(module, exports) {

module.exports = require("./assets.json");

/***/ }),
/* 205 */
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),
/* 206 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 208 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 209 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 211 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 212 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 214 */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),
/* 215 */
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),
/* 216 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 217 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 218 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 219 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 220 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 221 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),
/* 222 */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),
/* 223 */
/***/ (function(module, exports) {

module.exports = require("react-dnd-html5-backend");

/***/ }),
/* 224 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 225 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 226 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 227 */
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),
/* 228 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
module.exports = __webpack_require__(51);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map