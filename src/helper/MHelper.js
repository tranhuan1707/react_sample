/**
 * 1. explode array
 * 2. shuffleArray
 * 3. get postion in array
 * 4. findArrayVal
 * 5. find string in text
 */
export default {
  // 1. explode array
  explode (delimiter, string, limit) {
    //  discuss at: http://locutus.io/php/explode/
    // original by: Kevin van Zonneveld (http://kvz.io)
    //   example 1: explode(' ', 'Kevin van Zonneveld')
    //   returns 1: [ 'Kevin', 'van', 'Zonneveld' ]
    if (arguments.length < 2 ||
      typeof delimiter === 'undefined' ||
      typeof string === 'undefined') {
      return null
    }
    if (delimiter === '' ||
      delimiter === false ||
      delimiter === null) {
      return false
    }
    if (typeof delimiter === 'function' ||
      typeof delimiter === 'object' ||
      typeof string === 'function' ||
      typeof string === 'object') {
      return {
        0: ''
      }
    }
    if (delimiter === true) {
      delimiter = '1'
    }
    // Here we go...
    delimiter += ''
    string += ''
    var s = string.split(delimiter)
    if (typeof limit === 'undefined') return s
    // Support for limit
    if (limit === 0) limit = 1
    // Positive limit
    if (limit > 0) {
      if (limit >= s.length) {
        return s
      }
      return s
        .slice(0, limit - 1)
        .concat([s.slice(limit - 1)
          .join(delimiter)
        ])
    }
    // Negative limit
    if (-limit >= s.length) {
      return []
    }
    s.splice(s.length + limit)
    return s
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
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;  
  },

  // 4. findArrayVal
  findArrayVal(arr, val) {
    if (!arr.length) {return;}
    let re = -1;
    arr.map((value, i) => {
        if (value == val) {
            re = i;
            return re;
        }
    });
    return re;
  },

  // 5. find string in text
  findStringInText(text) {
    return text.match(/___/g);
  }
}