"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports2, module2) {
    "use strict";
    (function(module3, exports3) {
      "use strict";
      function assert(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN8(number, base, endian) {
        if (BN8.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number || 0, base || 10, endian || "be");
        }
      }
      if (typeof module3 === "object") {
        module3.exports = BN8;
      } else {
        exports3.BN = BN8;
      }
      BN8.BN = BN8;
      BN8.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = require("buffer").Buffer;
        }
      } catch (e) {
      }
      BN8.isBN = function isBN(num) {
        if (num instanceof BN8) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN8.wordSize && Array.isArray(num.words);
      };
      BN8.max = function max(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      };
      BN8.min = function min(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      };
      BN8.prototype._init = function init(number, base, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert(base === (base | 0) && base >= 2 && base <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian);
            }
          }
        }
      };
      BN8.prototype._initNumber = function _initNumber(number, base, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert(number < 9007199254740992);
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN8.prototype._initArray = function _initArray(number, base, endian) {
        assert(typeof number.length === "number");
        if (number.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number.length; i += 3) {
            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this._strip();
      };
      function parseHex4Bits(string, index) {
        var c = string.charCodeAt(index);
        if (c >= 48 && c <= 57) {
          return c - 48;
        } else if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          assert(false, "Invalid character in " + string);
        }
      }
      function parseHexByte(string, lowerBound, index) {
        var r = parseHex4Bits(string, index);
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index - 1) << 4;
        }
        return r;
      }
      BN8.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number.length - start;
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this._strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var b = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            b = c - 49 + 10;
          } else if (c >= 17) {
            b = c - 17 + 10;
          } else {
            b = c;
          }
          assert(c >= 0 && b < mul, "Invalid character");
          r += b;
        }
        return r;
      }
      BN8.prototype._parseBase = function _parseBase(number, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number, i, number.length, base);
          for (i = 0; i < mod; i++) {
            pow *= base;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this._strip();
      };
      BN8.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      function move(dest, src) {
        dest.words = src.words;
        dest.length = src.length;
        dest.negative = src.negative;
        dest.red = src.red;
      }
      BN8.prototype._move = function _move(dest) {
        move(dest, this);
      };
      BN8.prototype.clone = function clone() {
        var r = new BN8(null);
        this.copy(r);
        return r;
      };
      BN8.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN8.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN8.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        try {
          BN8.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect;
        } catch (e) {
          BN8.prototype.inspect = inspect;
        }
      } else {
        BN8.prototype.inspect = inspect;
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN8.prototype.toString = function toString(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modrn(groupBase).toString(base);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert(false, "Base should be between 2 and 36");
      };
      BN8.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN8.prototype.toJSON = function toJSON() {
        return this.toString(16, 2);
      };
      if (Buffer2) {
        BN8.prototype.toBuffer = function toBuffer(endian, length) {
          return this.toArrayLike(Buffer2, endian, length);
        };
      }
      BN8.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      var allocate = function allocate2(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size);
        }
        return new ArrayType(size);
      };
      BN8.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip();
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert(byteLength <= reqLength, "byte array longer than desired length");
        assert(reqLength > 0, "Requested array length <= 0");
        var res = allocate(ArrayType, reqLength);
        var postfix = endian === "le" ? "LE" : "BE";
        this["_toArrayLike" + postfix](res, byteLength);
        return res;
      };
      BN8.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position++] = word & 255;
          if (position < res.length) {
            res[position++] = word >> 8 & 255;
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position < res.length) {
          res[position++] = carry;
          while (position < res.length) {
            res[position++] = 0;
          }
        }
      };
      BN8.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position--] = word & 255;
          if (position >= 0) {
            res[position--] = word >> 8 & 255;
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position >= 0) {
          res[position--] = carry;
          while (position >= 0) {
            res[position--] = 0;
          }
        }
      };
      if (Math.clz32) {
        BN8.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN8.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN8.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN8.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = num.words[off] >>> wbit & 1;
        }
        return w;
      }
      BN8.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26) break;
        }
        return r;
      };
      BN8.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN8.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN8.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN8.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN8.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN8.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN8.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this._strip();
      };
      BN8.prototype.ior = function ior(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN8.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN8.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN8.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this._strip();
      };
      BN8.prototype.iand = function iand(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN8.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN8.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN8.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this._strip();
      };
      BN8.prototype.ixor = function ixor(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN8.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN8.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN8.prototype.inotn = function inotn(width) {
        assert(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this._strip();
      };
      BN8.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN8.prototype.setn = function setn(bit, val) {
        assert(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this._strip();
      };
      BN8.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN8.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length) return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN8.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this._strip();
      };
      BN8.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        var len = self.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out._strip();
      }
      var comb10MulTo = function comb10MulTo2(self, num, out) {
        var a = self.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        out.length = self.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out._strip();
      }
      function jumboMulTo(self, num, out) {
        return bigMulTo(self, num, out);
      }
      BN8.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN8.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1) return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert(carry === 0);
        assert((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out._strip();
      };
      BN8.prototype.mul = function mul(num) {
        var out = new BN8(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN8.prototype.mulf = function mulf(num) {
        var out = new BN8(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN8.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN8.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert(typeof num === "number");
        assert(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        this.length = num === 0 ? 1 : this.length;
        return isNegNum ? this.ineg() : this;
      };
      BN8.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN8.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN8.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN8.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0) return new BN8(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN8.prototype.iushln = function iushln(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this._strip();
      };
      BN8.prototype.ishln = function ishln(bits) {
        assert(this.negative === 0);
        return this.iushln(bits);
      };
      BN8.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this._strip();
      };
      BN8.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN8.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN8.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN8.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN8.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN8.prototype.testn = function testn(bit) {
        assert(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN8.prototype.imaskn = function imaskn(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask;
        }
        return this._strip();
      };
      BN8.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN8.prototype.iaddn = function iaddn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0) return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN8.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN8.prototype.isubn = function isubn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0) return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this._strip();
      };
      BN8.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN8.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN8.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN8.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN8.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0) return this._strip();
        assert(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this._strip();
      };
      BN8.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN8(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q._strip();
        }
        a._strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN8.prototype.divmod = function divmod(num, mode, positive) {
        assert(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN8(0),
            mod: new BN8(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN8(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN8(this.modrn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN8(this.modrn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN8.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN8.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN8.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN8.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN8.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return isNegNum ? -acc : acc;
      };
      BN8.prototype.modn = function modn(num) {
        return this.modrn(num);
      };
      BN8.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        this._strip();
        return isNegNum ? this.ineg() : this;
      };
      BN8.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN8.prototype.egcd = function egcd(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN8(1);
        var B = new BN8(0);
        var C = new BN8(0);
        var D = new BN8(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN8.prototype._invmp = function _invmp(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN8(1);
        var x2 = new BN8(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN8.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs();
        if (num.isZero()) return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN8.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN8.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN8.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN8.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN8.prototype.bincn = function bincn(bit) {
        assert(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN8.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN8.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative) return -1;
        if (this.negative === 0 && negative) return 1;
        this._strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN8.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN8.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1;
        if (this.length < num.length) return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b) continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN8.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN8.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN8.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN8.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN8.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN8.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN8.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN8.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN8.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN8.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN8.red = function red(num) {
        return new Red(num);
      };
      BN8.prototype.toRed = function toRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        assert(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN8.prototype.fromRed = function fromRed() {
        assert(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN8.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN8.prototype.forceRed = function forceRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN8.prototype.redAdd = function redAdd(num) {
        assert(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN8.prototype.redIAdd = function redIAdd(num) {
        assert(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN8.prototype.redSub = function redSub(num) {
        assert(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN8.prototype.redISub = function redISub(num) {
        assert(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN8.prototype.redShl = function redShl(num) {
        assert(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN8.prototype.redMul = function redMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN8.prototype.redIMul = function redIMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN8.prototype.redSqr = function redSqr() {
        assert(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN8.prototype.redISqr = function redISqr() {
        assert(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN8.prototype.redSqrt = function redSqrt() {
        assert(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN8.prototype.redInvm = function redInvm() {
        assert(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN8.prototype.redNeg = function redNeg() {
        assert(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN8.prototype.redPow = function redPow(num) {
        assert(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p) {
        this.name = name;
        this.p = new BN8(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN8(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN8(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN8._prime = function prime(name) {
        if (primes[name]) return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN8._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert(a.negative === 0, "red works only with positives");
        assert(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert((a.negative | b.negative) === 0, "red works only with positives");
        assert(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this);
        move(a, a.umod(this.m)._forceRed(this));
        return a;
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero()) return a.clone();
        var mod3 = this.m.andln(3);
        assert(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN8(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert(!q.isZero());
        var one = new BN8(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN8(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert(i < m);
          var b = this.pow(c, new BN8(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN8(1).toRed(this);
        if (num.cmpn(1) === 0) return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN8(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN8.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN8(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN8(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module2 === "undefined" || module2, exports2);
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CANONICAL_POOL_INDEX: () => CANONICAL_POOL_INDEX,
  PUMP_AMM_PROGRAM_ID: () => PUMP_AMM_PROGRAM_ID,
  PUMP_AMM_PROGRAM_ID_PUBKEY: () => PUMP_AMM_PROGRAM_ID_PUBKEY,
  PUMP_PROGRAM_ID: () => PUMP_PROGRAM_ID,
  PUMP_PROGRAM_ID_PUBKEY: () => PUMP_PROGRAM_ID_PUBKEY,
  PumpAmmAdminSdk: () => PumpAmmAdminSdk,
  PumpAmmInternalSdk: () => PumpAmmInternalSdk,
  PumpAmmSdk: () => PumpAmmSdk,
  canonicalPumpPoolPda: () => canonicalPumpPoolPda,
  getPumpAmmProgram: () => getPumpAmmProgram,
  getSignature: () => getSignature,
  globalConfigPda: () => globalConfigPda,
  lpMintAta: () => lpMintAta,
  lpMintPda: () => lpMintPda,
  poolPda: () => poolPda,
  pumpAmmEventAuthorityPda: () => pumpAmmEventAuthorityPda,
  pumpAmmJson: () => pump_amm_default,
  pumpPoolAuthorityPda: () => pumpPoolAuthorityPda,
  sendAndConfirmTransaction: () => sendAndConfirmTransaction,
  transactionFromInstructions: () => transactionFromInstructions
});
module.exports = __toCommonJS(index_exports);

// src/sdk/pda.ts
var import_web3 = require("@solana/web3.js");
var import_anchor = require("@coral-xyz/anchor");
var import_spl_token = require("@solana/spl-token");
var PUMP_AMM_PROGRAM_ID = "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA";
var PUMP_AMM_PROGRAM_ID_PUBKEY = new import_web3.PublicKey(PUMP_AMM_PROGRAM_ID);
var PUMP_PROGRAM_ID = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P";
var PUMP_PROGRAM_ID_PUBKEY = new import_web3.PublicKey(PUMP_PROGRAM_ID);
var CANONICAL_POOL_INDEX = 0;
function globalConfigPda(programId = PUMP_AMM_PROGRAM_ID_PUBKEY) {
  return import_web3.PublicKey.findProgramAddressSync(
    [Buffer.from("global_config")],
    programId
  );
}
function poolPda(index, owner, baseMint, quoteMint, programId = PUMP_AMM_PROGRAM_ID_PUBKEY) {
  return import_web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("pool"),
      new import_anchor.BN(index).toArrayLike(Buffer, "le", 2),
      owner.toBuffer(),
      baseMint.toBuffer(),
      quoteMint.toBuffer()
    ],
    programId
  );
}
function lpMintPda(pool, programId = PUMP_AMM_PROGRAM_ID_PUBKEY) {
  return import_web3.PublicKey.findProgramAddressSync(
    [Buffer.from("pool_lp_mint"), pool.toBuffer()],
    programId
  );
}
function lpMintAta(lpMint, owner) {
  return (0, import_spl_token.getAssociatedTokenAddressSync)(
    lpMint,
    owner,
    true,
    import_spl_token.TOKEN_2022_PROGRAM_ID
  );
}
function pumpPoolAuthorityPda(mint, pumpProgramId = PUMP_PROGRAM_ID_PUBKEY) {
  return import_web3.PublicKey.findProgramAddressSync(
    [Buffer.from("pool-authority"), mint.toBuffer()],
    pumpProgramId
  );
}
function canonicalPumpPoolPda(mint, programId = PUMP_AMM_PROGRAM_ID_PUBKEY, pumpProgramId = PUMP_PROGRAM_ID_PUBKEY) {
  const [pumpPoolAuthority] = pumpPoolAuthorityPda(mint, pumpProgramId);
  return poolPda(
    CANONICAL_POOL_INDEX,
    pumpPoolAuthority,
    mint,
    import_spl_token.NATIVE_MINT,
    programId
  );
}
function pumpAmmEventAuthorityPda(programId = PUMP_AMM_PROGRAM_ID_PUBKEY) {
  return import_web3.PublicKey.findProgramAddressSync(
    [Buffer.from("__event_authority")],
    programId
  );
}

// src/sdk/deposit.ts
var import_bn = __toESM(require_bn());
function depositToken0Internal(token0, slippage, token0Reserve, token1Reserve, totalLpTokens) {
  if (slippage < 0 || slippage > 100) {
    throw new Error("Slippage must be between 0 and 100 (0% to 100%)");
  }
  const token1 = token0.mul(token1Reserve).div(token0Reserve);
  const slippageFactor = new import_bn.default((1 + slippage / 100) * 1e9);
  const maxToken0 = token0.mul(slippageFactor).div(new import_bn.default(1e9));
  const maxToken1 = token1.mul(slippageFactor).div(new import_bn.default(1e9));
  const lpToken = token0.mul(totalLpTokens).div(token0Reserve);
  return {
    token1,
    lpToken,
    maxToken0,
    maxToken1
  };
}
function ceilDiv(numerator, denominator) {
  return numerator.add(denominator).sub(new import_bn.default(1)).div(denominator);
}
function depositLpToken(lpToken, slippage, baseReserve, quoteReserve, totalLpTokens) {
  if (totalLpTokens.isZero()) {
    throw new Error("Division by zero: totalLpTokens cannot be zero");
  }
  const baseAmountIn = ceilDiv(baseReserve.mul(lpToken), totalLpTokens);
  const quoteAmountIn = ceilDiv(quoteReserve.mul(lpToken), totalLpTokens);
  const slippageFactor = new import_bn.default((1 + slippage / 100) * 1e9);
  const slippageDenominator = new import_bn.default(1e9);
  const maxBase = baseAmountIn.mul(slippageFactor).div(slippageDenominator);
  const maxQuote = quoteAmountIn.mul(slippageFactor).div(slippageDenominator);
  return {
    maxBase,
    maxQuote
  };
}

// src/sdk/pumpAmmInternal.ts
var import_anchor3 = require("@coral-xyz/anchor");
var import_web34 = require("@solana/web3.js");
var import_spl_token2 = require("@solana/spl-token");

// src/sdk/withdraw.ts
var import_bn2 = __toESM(require_bn());
function withdrawInternal(lpAmount, slippage, baseReserve, quoteReserve, totalLpTokens) {
  if (lpAmount.isZero() || totalLpTokens.isZero()) {
    throw new Error("LP amount or total LP tokens cannot be zero.");
  }
  const base = baseReserve.mul(lpAmount).div(totalLpTokens);
  const quote = quoteReserve.mul(lpAmount).div(totalLpTokens);
  const scaleFactor = new import_bn2.default(1e9);
  const slippageFactor = new import_bn2.default((1 - slippage / 100) * 1e9);
  const minBase = base.mul(slippageFactor).div(scaleFactor);
  const minQuote = quote.mul(slippageFactor).div(scaleFactor);
  return {
    base,
    quote,
    minBase,
    minQuote
  };
}

// src/sdk/buy.ts
var import_bn4 = __toESM(require_bn());

// src/sdk/util.ts
var import_bn3 = __toESM(require_bn());
var import_anchor2 = require("@coral-xyz/anchor");

// src/idl/pump_amm.json
var pump_amm_default = {
  address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
  metadata: {
    name: "pump_amm",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor"
  },
  instructions: [
    {
      name: "admin_set_coin_creator",
      docs: [
        "Overrides the coin creator for a canonical pump pool"
      ],
      discriminator: [
        242,
        40,
        117,
        145,
        73,
        96,
        105,
        104
      ],
      accounts: [
        {
          name: "admin_set_coin_creator_authority",
          signer: true,
          relations: [
            "global_config"
          ]
        },
        {
          name: "global_config"
        },
        {
          name: "pool",
          writable: true
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "coin_creator",
          type: "pubkey"
        }
      ]
    },
    {
      name: "admin_update_token_incentives",
      discriminator: [
        209,
        11,
        115,
        87,
        213,
        23,
        124,
        204
      ],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
          relations: [
            "global_config"
          ]
        },
        {
          name: "global_config",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          name: "global_volume_accumulator",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              }
            ]
          }
        },
        {
          name: "mint"
        },
        {
          name: "global_incentive_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "global_volume_accumulator"
              },
              {
                kind: "account",
                path: "token_program"
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "associated_token_program",
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "token_program"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "start_time",
          type: "i64"
        },
        {
          name: "end_time",
          type: "i64"
        },
        {
          name: "seconds_in_a_day",
          type: "i64"
        },
        {
          name: "day_number",
          type: "u64"
        },
        {
          name: "token_supply_per_day",
          type: "u64"
        }
      ]
    },
    {
      name: "buy",
      discriminator: [
        102,
        6,
        61,
        18,
        1,
        218,
        235,
        234
      ],
      accounts: [
        {
          name: "pool"
        },
        {
          name: "user",
          writable: true,
          signer: true
        },
        {
          name: "global_config"
        },
        {
          name: "base_mint",
          relations: [
            "pool"
          ]
        },
        {
          name: "quote_mint",
          relations: [
            "pool"
          ]
        },
        {
          name: "user_base_token_account",
          writable: true
        },
        {
          name: "user_quote_token_account",
          writable: true
        },
        {
          name: "pool_base_token_account",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "pool_quote_token_account",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "protocol_fee_recipient"
        },
        {
          name: "protocol_fee_recipient_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "protocol_fee_recipient"
              },
              {
                kind: "account",
                path: "quote_token_program"
              },
              {
                kind: "account",
                path: "quote_mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "base_token_program"
        },
        {
          name: "quote_token_program"
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "associated_token_program",
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program",
          address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
        },
        {
          name: "coin_creator_vault_ata",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "coin_creator_vault_authority"
              },
              {
                kind: "account",
                path: "quote_token_program"
              },
              {
                kind: "account",
                path: "quote_mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "coin_creator_vault_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                kind: "account",
                path: "pool.coin_creator",
                account: "Pool"
              }
            ]
          }
        },
        {
          name: "global_volume_accumulator",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              }
            ]
          }
        },
        {
          name: "user_volume_accumulator",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              },
              {
                kind: "account",
                path: "user"
              }
            ]
          }
        },
        {
          name: "fee_config",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  102,
                  101,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                kind: "const",
                value: [
                  12,
                  20,
                  222,
                  252,
                  130,
                  94,
                  198,
                  118,
                  148,
                  37,
                  8,
                  24,
                  187,
                  101,
                  64,
                  101,
                  244,
                  41,
                  141,
                  49,
                  86,
                  213,
                  113,
                  180,
                  212,
                  248,
                  9,
                  12,
                  24,
                  233,
                  168,
                  99
                ]
              }
            ],
            program: {
              kind: "account",
              path: "fee_program"
            }
          }
        },
        {
          name: "fee_program",
          address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
        }
      ],
      args: [
        {
          name: "base_amount_out",
          type: "u64"
        },
        {
          name: "max_quote_amount_in",
          type: "u64"
        },
        {
          name: "track_volume",
          type: {
            defined: {
              name: "OptionBool"
            }
          }
        }
      ]
    },
    {
      name: "claim_token_incentives",
      discriminator: [
        16,
        4,
        71,
        28,
        204,
        1,
        40,
        27
      ],
      accounts: [
        {
          name: "user"
        },
        {
          name: "user_ata",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "user"
              },
              {
                kind: "account",
                path: "token_program"
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "global_volume_accumulator",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              }
            ]
          }
        },
        {
          name: "global_incentive_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "global_volume_accumulator"
              },
              {
                kind: "account",
                path: "token_program"
              },
              {
                kind: "account",
                path: "mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "user_volume_accumulator",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              },
              {
                kind: "account",
                path: "user"
              }
            ]
          }
        },
        {
          name: "mint",
          relations: [
            "global_volume_accumulator"
          ]
        },
        {
          name: "token_program"
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "associated_token_program",
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program",
          address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
        },
        {
          name: "payer",
          writable: true,
          signer: true
        }
      ],
      args: []
    },
    {
      name: "close_user_volume_accumulator",
      discriminator: [
        249,
        69,
        164,
        218,
        150,
        103,
        84,
        138
      ],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true
        },
        {
          name: "user_volume_accumulator",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              },
              {
                kind: "account",
                path: "user"
              }
            ]
          }
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "collect_coin_creator_fee",
      discriminator: [
        160,
        57,
        89,
        42,
        181,
        139,
        43,
        66
      ],
      accounts: [
        {
          name: "quote_mint"
        },
        {
          name: "quote_token_program"
        },
        {
          name: "coin_creator"
        },
        {
          name: "coin_creator_vault_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                kind: "account",
                path: "coin_creator"
              }
            ]
          }
        },
        {
          name: "coin_creator_vault_ata",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "coin_creator_vault_authority"
              },
              {
                kind: "account",
                path: "quote_token_program"
              },
              {
                kind: "account",
                path: "quote_mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "coin_creator_token_account",
          writable: true
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "create_config",
      discriminator: [
        201,
        207,
        243,
        114,
        75,
        111,
        47,
        189
      ],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
          address: "8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8"
        },
        {
          name: "global_config",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "lp_fee_basis_points",
          type: "u64"
        },
        {
          name: "protocol_fee_basis_points",
          type: "u64"
        },
        {
          name: "protocol_fee_recipients",
          type: {
            array: [
              "pubkey",
              8
            ]
          }
        },
        {
          name: "coin_creator_fee_basis_points",
          type: "u64"
        },
        {
          name: "admin_set_coin_creator_authority",
          type: "pubkey"
        }
      ]
    },
    {
      name: "create_pool",
      discriminator: [
        233,
        146,
        209,
        142,
        207,
        104,
        64,
        188
      ],
      accounts: [
        {
          name: "pool",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                kind: "arg",
                path: "index"
              },
              {
                kind: "account",
                path: "creator"
              },
              {
                kind: "account",
                path: "base_mint"
              },
              {
                kind: "account",
                path: "quote_mint"
              }
            ]
          }
        },
        {
          name: "global_config"
        },
        {
          name: "creator",
          writable: true,
          signer: true
        },
        {
          name: "base_mint"
        },
        {
          name: "quote_mint"
        },
        {
          name: "lp_mint",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  112,
                  111,
                  111,
                  108,
                  95,
                  108,
                  112,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                kind: "account",
                path: "pool"
              }
            ]
          }
        },
        {
          name: "user_base_token_account",
          writable: true
        },
        {
          name: "user_quote_token_account",
          writable: true
        },
        {
          name: "user_pool_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "creator"
              },
              {
                kind: "account",
                path: "token_2022_program"
              },
              {
                kind: "account",
                path: "lp_mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "pool_base_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "pool"
              },
              {
                kind: "account",
                path: "base_token_program"
              },
              {
                kind: "account",
                path: "base_mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "pool_quote_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "pool"
              },
              {
                kind: "account",
                path: "quote_token_program"
              },
              {
                kind: "account",
                path: "quote_mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "token_2022_program",
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          name: "base_token_program"
        },
        {
          name: "quote_token_program"
        },
        {
          name: "associated_token_program",
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "index",
          type: "u16"
        },
        {
          name: "base_amount_in",
          type: "u64"
        },
        {
          name: "quote_amount_in",
          type: "u64"
        },
        {
          name: "coin_creator",
          type: "pubkey"
        }
      ]
    },
    {
      name: "deposit",
      discriminator: [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
      ],
      accounts: [
        {
          name: "pool",
          writable: true
        },
        {
          name: "global_config"
        },
        {
          name: "user",
          signer: true
        },
        {
          name: "base_mint",
          relations: [
            "pool"
          ]
        },
        {
          name: "quote_mint",
          relations: [
            "pool"
          ]
        },
        {
          name: "lp_mint",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "user_base_token_account",
          writable: true
        },
        {
          name: "user_quote_token_account",
          writable: true
        },
        {
          name: "user_pool_token_account",
          writable: true
        },
        {
          name: "pool_base_token_account",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "pool_quote_token_account",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "token_2022_program",
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "lp_token_amount_out",
          type: "u64"
        },
        {
          name: "max_base_amount_in",
          type: "u64"
        },
        {
          name: "max_quote_amount_in",
          type: "u64"
        }
      ]
    },
    {
      name: "disable",
      discriminator: [
        185,
        173,
        187,
        90,
        216,
        15,
        238,
        233
      ],
      accounts: [
        {
          name: "admin",
          signer: true,
          relations: [
            "global_config"
          ]
        },
        {
          name: "global_config",
          writable: true
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "disable_create_pool",
          type: "bool"
        },
        {
          name: "disable_deposit",
          type: "bool"
        },
        {
          name: "disable_withdraw",
          type: "bool"
        },
        {
          name: "disable_buy",
          type: "bool"
        },
        {
          name: "disable_sell",
          type: "bool"
        }
      ]
    },
    {
      name: "extend_account",
      discriminator: [
        234,
        102,
        194,
        203,
        150,
        72,
        62,
        229
      ],
      accounts: [
        {
          name: "account",
          writable: true
        },
        {
          name: "user",
          signer: true
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "init_user_volume_accumulator",
      discriminator: [
        94,
        6,
        202,
        115,
        255,
        96,
        232,
        183
      ],
      accounts: [
        {
          name: "payer",
          writable: true,
          signer: true
        },
        {
          name: "user"
        },
        {
          name: "user_volume_accumulator",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              },
              {
                kind: "account",
                path: "user"
              }
            ]
          }
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "sell",
      discriminator: [
        51,
        230,
        133,
        164,
        1,
        127,
        131,
        173
      ],
      accounts: [
        {
          name: "pool"
        },
        {
          name: "user",
          writable: true,
          signer: true
        },
        {
          name: "global_config"
        },
        {
          name: "base_mint",
          relations: [
            "pool"
          ]
        },
        {
          name: "quote_mint",
          relations: [
            "pool"
          ]
        },
        {
          name: "user_base_token_account",
          writable: true
        },
        {
          name: "user_quote_token_account",
          writable: true
        },
        {
          name: "pool_base_token_account",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "pool_quote_token_account",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "protocol_fee_recipient"
        },
        {
          name: "protocol_fee_recipient_token_account",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "protocol_fee_recipient"
              },
              {
                kind: "account",
                path: "quote_token_program"
              },
              {
                kind: "account",
                path: "quote_mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "base_token_program"
        },
        {
          name: "quote_token_program"
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111"
        },
        {
          name: "associated_token_program",
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program",
          address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
        },
        {
          name: "coin_creator_vault_ata",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "coin_creator_vault_authority"
              },
              {
                kind: "account",
                path: "quote_token_program"
              },
              {
                kind: "account",
                path: "quote_mint"
              }
            ],
            program: {
              kind: "const",
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: "coin_creator_vault_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                kind: "account",
                path: "pool.coin_creator",
                account: "Pool"
              }
            ]
          }
        },
        {
          name: "fee_config",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  102,
                  101,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                kind: "const",
                value: [
                  12,
                  20,
                  222,
                  252,
                  130,
                  94,
                  198,
                  118,
                  148,
                  37,
                  8,
                  24,
                  187,
                  101,
                  64,
                  101,
                  244,
                  41,
                  141,
                  49,
                  86,
                  213,
                  113,
                  180,
                  212,
                  248,
                  9,
                  12,
                  24,
                  233,
                  168,
                  99
                ]
              }
            ],
            program: {
              kind: "account",
              path: "fee_program"
            }
          }
        },
        {
          name: "fee_program",
          address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
        }
      ],
      args: [
        {
          name: "base_amount_in",
          type: "u64"
        },
        {
          name: "min_quote_amount_out",
          type: "u64"
        }
      ]
    },
    {
      name: "set_coin_creator",
      docs: [
        "Sets Pool::coin_creator from Metaplex metadata creator or BondingCurve::creator"
      ],
      discriminator: [
        210,
        149,
        128,
        45,
        188,
        58,
        78,
        175
      ],
      accounts: [
        {
          name: "pool",
          writable: true
        },
        {
          name: "metadata",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                kind: "const",
                value: [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70
                ]
              },
              {
                kind: "account",
                path: "pool.base_mint",
                account: "Pool"
              }
            ],
            program: {
              kind: "const",
              value: [
                11,
                112,
                101,
                177,
                227,
                209,
                124,
                69,
                56,
                157,
                82,
                127,
                107,
                4,
                195,
                205,
                88,
                184,
                108,
                115,
                26,
                160,
                253,
                181,
                73,
                182,
                209,
                188,
                3,
                248,
                41,
                70
              ]
            }
          }
        },
        {
          name: "bonding_curve",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101
                ]
              },
              {
                kind: "account",
                path: "pool.base_mint",
                account: "Pool"
              }
            ],
            program: {
              kind: "const",
              value: [
                1,
                86,
                224,
                246,
                147,
                102,
                90,
                207,
                68,
                219,
                21,
                104,
                191,
                23,
                91,
                170,
                81,
                137,
                203,
                151,
                245,
                210,
                255,
                59,
                101,
                93,
                43,
                182,
                253,
                109,
                24,
                176
              ]
            }
          }
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "sync_user_volume_accumulator",
      discriminator: [
        86,
        31,
        192,
        87,
        163,
        87,
        79,
        238
      ],
      accounts: [
        {
          name: "user"
        },
        {
          name: "global_volume_accumulator",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              }
            ]
          }
        },
        {
          name: "user_volume_accumulator",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              },
              {
                kind: "account",
                path: "user"
              }
            ]
          }
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "update_admin",
      discriminator: [
        161,
        176,
        40,
        213,
        60,
        184,
        179,
        228
      ],
      accounts: [
        {
          name: "admin",
          signer: true,
          relations: [
            "global_config"
          ]
        },
        {
          name: "global_config",
          writable: true
        },
        {
          name: "new_admin"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: []
    },
    {
      name: "update_fee_config",
      discriminator: [
        104,
        184,
        103,
        242,
        88,
        151,
        107,
        20
      ],
      accounts: [
        {
          name: "admin",
          signer: true,
          relations: [
            "global_config"
          ]
        },
        {
          name: "global_config",
          writable: true
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "lp_fee_basis_points",
          type: "u64"
        },
        {
          name: "protocol_fee_basis_points",
          type: "u64"
        },
        {
          name: "protocol_fee_recipients",
          type: {
            array: [
              "pubkey",
              8
            ]
          }
        },
        {
          name: "coin_creator_fee_basis_points",
          type: "u64"
        },
        {
          name: "admin_set_coin_creator_authority",
          type: "pubkey"
        }
      ]
    },
    {
      name: "withdraw",
      discriminator: [
        183,
        18,
        70,
        156,
        148,
        109,
        161,
        34
      ],
      accounts: [
        {
          name: "pool",
          writable: true
        },
        {
          name: "global_config"
        },
        {
          name: "user",
          signer: true
        },
        {
          name: "base_mint",
          relations: [
            "pool"
          ]
        },
        {
          name: "quote_mint",
          relations: [
            "pool"
          ]
        },
        {
          name: "lp_mint",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "user_base_token_account",
          writable: true
        },
        {
          name: "user_quote_token_account",
          writable: true
        },
        {
          name: "user_pool_token_account",
          writable: true
        },
        {
          name: "pool_base_token_account",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "pool_quote_token_account",
          writable: true,
          relations: [
            "pool"
          ]
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "token_2022_program",
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          name: "event_authority",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          name: "program"
        }
      ],
      args: [
        {
          name: "lp_token_amount_in",
          type: "u64"
        },
        {
          name: "min_base_amount_out",
          type: "u64"
        },
        {
          name: "min_quote_amount_out",
          type: "u64"
        }
      ]
    }
  ],
  accounts: [
    {
      name: "BondingCurve",
      discriminator: [
        23,
        183,
        248,
        55,
        96,
        216,
        172,
        96
      ]
    },
    {
      name: "FeeConfig",
      discriminator: [
        143,
        52,
        146,
        187,
        219,
        123,
        76,
        155
      ]
    },
    {
      name: "GlobalConfig",
      discriminator: [
        149,
        8,
        156,
        202,
        160,
        252,
        176,
        217
      ]
    },
    {
      name: "GlobalVolumeAccumulator",
      discriminator: [
        202,
        42,
        246,
        43,
        142,
        190,
        30,
        255
      ]
    },
    {
      name: "Pool",
      discriminator: [
        241,
        154,
        109,
        4,
        17,
        177,
        109,
        188
      ]
    },
    {
      name: "UserVolumeAccumulator",
      discriminator: [
        86,
        255,
        112,
        14,
        102,
        53,
        154,
        250
      ]
    }
  ],
  events: [
    {
      name: "AdminSetCoinCreatorEvent",
      discriminator: [
        45,
        220,
        93,
        24,
        25,
        97,
        172,
        104
      ]
    },
    {
      name: "AdminUpdateTokenIncentivesEvent",
      discriminator: [
        147,
        250,
        108,
        120,
        247,
        29,
        67,
        222
      ]
    },
    {
      name: "BuyEvent",
      discriminator: [
        103,
        244,
        82,
        31,
        44,
        245,
        119,
        119
      ]
    },
    {
      name: "ClaimTokenIncentivesEvent",
      discriminator: [
        79,
        172,
        246,
        49,
        205,
        91,
        206,
        232
      ]
    },
    {
      name: "CloseUserVolumeAccumulatorEvent",
      discriminator: [
        146,
        159,
        189,
        172,
        146,
        88,
        56,
        244
      ]
    },
    {
      name: "CollectCoinCreatorFeeEvent",
      discriminator: [
        232,
        245,
        194,
        238,
        234,
        218,
        58,
        89
      ]
    },
    {
      name: "CreateConfigEvent",
      discriminator: [
        107,
        52,
        89,
        129,
        55,
        226,
        81,
        22
      ]
    },
    {
      name: "CreatePoolEvent",
      discriminator: [
        177,
        49,
        12,
        210,
        160,
        118,
        167,
        116
      ]
    },
    {
      name: "DepositEvent",
      discriminator: [
        120,
        248,
        61,
        83,
        31,
        142,
        107,
        144
      ]
    },
    {
      name: "DisableEvent",
      discriminator: [
        107,
        253,
        193,
        76,
        228,
        202,
        27,
        104
      ]
    },
    {
      name: "ExtendAccountEvent",
      discriminator: [
        97,
        97,
        215,
        144,
        93,
        146,
        22,
        124
      ]
    },
    {
      name: "InitUserVolumeAccumulatorEvent",
      discriminator: [
        134,
        36,
        13,
        72,
        232,
        101,
        130,
        216
      ]
    },
    {
      name: "SellEvent",
      discriminator: [
        62,
        47,
        55,
        10,
        165,
        3,
        220,
        42
      ]
    },
    {
      name: "SetBondingCurveCoinCreatorEvent",
      discriminator: [
        242,
        231,
        235,
        102,
        65,
        99,
        189,
        211
      ]
    },
    {
      name: "SetMetaplexCoinCreatorEvent",
      discriminator: [
        150,
        107,
        199,
        123,
        124,
        207,
        102,
        228
      ]
    },
    {
      name: "SyncUserVolumeAccumulatorEvent",
      discriminator: [
        197,
        122,
        167,
        124,
        116,
        81,
        91,
        255
      ]
    },
    {
      name: "UpdateAdminEvent",
      discriminator: [
        225,
        152,
        171,
        87,
        246,
        63,
        66,
        234
      ]
    },
    {
      name: "UpdateFeeConfigEvent",
      discriminator: [
        90,
        23,
        65,
        35,
        62,
        244,
        188,
        208
      ]
    },
    {
      name: "WithdrawEvent",
      discriminator: [
        22,
        9,
        133,
        26,
        160,
        44,
        71,
        192
      ]
    }
  ],
  errors: [
    {
      code: 6e3,
      name: "FeeBasisPointsExceedsMaximum"
    },
    {
      code: 6001,
      name: "ZeroBaseAmount"
    },
    {
      code: 6002,
      name: "ZeroQuoteAmount"
    },
    {
      code: 6003,
      name: "TooLittlePoolTokenLiquidity"
    },
    {
      code: 6004,
      name: "ExceededSlippage"
    },
    {
      code: 6005,
      name: "InvalidAdmin"
    },
    {
      code: 6006,
      name: "UnsupportedBaseMint"
    },
    {
      code: 6007,
      name: "UnsupportedQuoteMint"
    },
    {
      code: 6008,
      name: "InvalidBaseMint"
    },
    {
      code: 6009,
      name: "InvalidQuoteMint"
    },
    {
      code: 6010,
      name: "InvalidLpMint"
    },
    {
      code: 6011,
      name: "AllProtocolFeeRecipientsShouldBeNonZero"
    },
    {
      code: 6012,
      name: "UnsortedNotUniqueProtocolFeeRecipients"
    },
    {
      code: 6013,
      name: "InvalidProtocolFeeRecipient"
    },
    {
      code: 6014,
      name: "InvalidPoolBaseTokenAccount"
    },
    {
      code: 6015,
      name: "InvalidPoolQuoteTokenAccount"
    },
    {
      code: 6016,
      name: "BuyMoreBaseAmountThanPoolReserves"
    },
    {
      code: 6017,
      name: "DisabledCreatePool"
    },
    {
      code: 6018,
      name: "DisabledDeposit"
    },
    {
      code: 6019,
      name: "DisabledWithdraw"
    },
    {
      code: 6020,
      name: "DisabledBuy"
    },
    {
      code: 6021,
      name: "DisabledSell"
    },
    {
      code: 6022,
      name: "SameMint"
    },
    {
      code: 6023,
      name: "Overflow"
    },
    {
      code: 6024,
      name: "Truncation"
    },
    {
      code: 6025,
      name: "DivisionByZero"
    },
    {
      code: 6026,
      name: "NewSizeLessThanCurrentSize"
    },
    {
      code: 6027,
      name: "AccountTypeNotSupported"
    },
    {
      code: 6028,
      name: "OnlyCanonicalPumpPoolsCanHaveCoinCreator"
    },
    {
      code: 6029,
      name: "InvalidAdminSetCoinCreatorAuthority"
    },
    {
      code: 6030,
      name: "StartTimeInThePast"
    },
    {
      code: 6031,
      name: "EndTimeInThePast"
    },
    {
      code: 6032,
      name: "EndTimeBeforeStartTime"
    },
    {
      code: 6033,
      name: "TimeRangeTooLarge"
    },
    {
      code: 6034,
      name: "EndTimeBeforeCurrentDay"
    },
    {
      code: 6035,
      name: "SupplyUpdateForFinishedRange"
    },
    {
      code: 6036,
      name: "DayIndexAfterEndIndex"
    },
    {
      code: 6037,
      name: "DayInActiveRange"
    },
    {
      code: 6038,
      name: "InvalidIncentiveMint"
    }
  ],
  types: [
    {
      name: "AdminSetCoinCreatorEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "admin_set_coin_creator_authority",
            type: "pubkey"
          },
          {
            name: "base_mint",
            type: "pubkey"
          },
          {
            name: "pool",
            type: "pubkey"
          },
          {
            name: "old_coin_creator",
            type: "pubkey"
          },
          {
            name: "new_coin_creator",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "AdminUpdateTokenIncentivesEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "start_time",
            type: "i64"
          },
          {
            name: "end_time",
            type: "i64"
          },
          {
            name: "day_number",
            type: "u64"
          },
          {
            name: "token_supply_per_day",
            type: "u64"
          },
          {
            name: "mint",
            type: "pubkey"
          },
          {
            name: "seconds_in_a_day",
            type: "i64"
          },
          {
            name: "timestamp",
            type: "i64"
          }
        ]
      }
    },
    {
      name: "BondingCurve",
      type: {
        kind: "struct",
        fields: [
          {
            name: "virtual_token_reserves",
            type: "u64"
          },
          {
            name: "virtual_sol_reserves",
            type: "u64"
          },
          {
            name: "real_token_reserves",
            type: "u64"
          },
          {
            name: "real_sol_reserves",
            type: "u64"
          },
          {
            name: "token_total_supply",
            type: "u64"
          },
          {
            name: "complete",
            type: "bool"
          },
          {
            name: "creator",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "BuyEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "base_amount_out",
            type: "u64"
          },
          {
            name: "max_quote_amount_in",
            type: "u64"
          },
          {
            name: "user_base_token_reserves",
            type: "u64"
          },
          {
            name: "user_quote_token_reserves",
            type: "u64"
          },
          {
            name: "pool_base_token_reserves",
            type: "u64"
          },
          {
            name: "pool_quote_token_reserves",
            type: "u64"
          },
          {
            name: "quote_amount_in",
            type: "u64"
          },
          {
            name: "lp_fee_basis_points",
            type: "u64"
          },
          {
            name: "lp_fee",
            type: "u64"
          },
          {
            name: "protocol_fee_basis_points",
            type: "u64"
          },
          {
            name: "protocol_fee",
            type: "u64"
          },
          {
            name: "quote_amount_in_with_lp_fee",
            type: "u64"
          },
          {
            name: "user_quote_amount_in",
            type: "u64"
          },
          {
            name: "pool",
            type: "pubkey"
          },
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "user_base_token_account",
            type: "pubkey"
          },
          {
            name: "user_quote_token_account",
            type: "pubkey"
          },
          {
            name: "protocol_fee_recipient",
            type: "pubkey"
          },
          {
            name: "protocol_fee_recipient_token_account",
            type: "pubkey"
          },
          {
            name: "coin_creator",
            type: "pubkey"
          },
          {
            name: "coin_creator_fee_basis_points",
            type: "u64"
          },
          {
            name: "coin_creator_fee",
            type: "u64"
          },
          {
            name: "track_volume",
            type: "bool"
          },
          {
            name: "total_unclaimed_tokens",
            type: "u64"
          },
          {
            name: "total_claimed_tokens",
            type: "u64"
          },
          {
            name: "current_sol_volume",
            type: "u64"
          },
          {
            name: "last_update_timestamp",
            type: "i64"
          }
        ]
      }
    },
    {
      name: "ClaimTokenIncentivesEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "mint",
            type: "pubkey"
          },
          {
            name: "amount",
            type: "u64"
          },
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "total_claimed_tokens",
            type: "u64"
          },
          {
            name: "current_sol_volume",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "CloseUserVolumeAccumulatorEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "total_unclaimed_tokens",
            type: "u64"
          },
          {
            name: "total_claimed_tokens",
            type: "u64"
          },
          {
            name: "current_sol_volume",
            type: "u64"
          },
          {
            name: "last_update_timestamp",
            type: "i64"
          }
        ]
      }
    },
    {
      name: "CollectCoinCreatorFeeEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "coin_creator",
            type: "pubkey"
          },
          {
            name: "coin_creator_fee",
            type: "u64"
          },
          {
            name: "coin_creator_vault_ata",
            type: "pubkey"
          },
          {
            name: "coin_creator_token_account",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "CreateConfigEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "admin",
            type: "pubkey"
          },
          {
            name: "lp_fee_basis_points",
            type: "u64"
          },
          {
            name: "protocol_fee_basis_points",
            type: "u64"
          },
          {
            name: "protocol_fee_recipients",
            type: {
              array: [
                "pubkey",
                8
              ]
            }
          },
          {
            name: "coin_creator_fee_basis_points",
            type: "u64"
          },
          {
            name: "admin_set_coin_creator_authority",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "CreatePoolEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "index",
            type: "u16"
          },
          {
            name: "creator",
            type: "pubkey"
          },
          {
            name: "base_mint",
            type: "pubkey"
          },
          {
            name: "quote_mint",
            type: "pubkey"
          },
          {
            name: "base_mint_decimals",
            type: "u8"
          },
          {
            name: "quote_mint_decimals",
            type: "u8"
          },
          {
            name: "base_amount_in",
            type: "u64"
          },
          {
            name: "quote_amount_in",
            type: "u64"
          },
          {
            name: "pool_base_amount",
            type: "u64"
          },
          {
            name: "pool_quote_amount",
            type: "u64"
          },
          {
            name: "minimum_liquidity",
            type: "u64"
          },
          {
            name: "initial_liquidity",
            type: "u64"
          },
          {
            name: "lp_token_amount_out",
            type: "u64"
          },
          {
            name: "pool_bump",
            type: "u8"
          },
          {
            name: "pool",
            type: "pubkey"
          },
          {
            name: "lp_mint",
            type: "pubkey"
          },
          {
            name: "user_base_token_account",
            type: "pubkey"
          },
          {
            name: "user_quote_token_account",
            type: "pubkey"
          },
          {
            name: "coin_creator",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "DepositEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "lp_token_amount_out",
            type: "u64"
          },
          {
            name: "max_base_amount_in",
            type: "u64"
          },
          {
            name: "max_quote_amount_in",
            type: "u64"
          },
          {
            name: "user_base_token_reserves",
            type: "u64"
          },
          {
            name: "user_quote_token_reserves",
            type: "u64"
          },
          {
            name: "pool_base_token_reserves",
            type: "u64"
          },
          {
            name: "pool_quote_token_reserves",
            type: "u64"
          },
          {
            name: "base_amount_in",
            type: "u64"
          },
          {
            name: "quote_amount_in",
            type: "u64"
          },
          {
            name: "lp_mint_supply",
            type: "u64"
          },
          {
            name: "pool",
            type: "pubkey"
          },
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "user_base_token_account",
            type: "pubkey"
          },
          {
            name: "user_quote_token_account",
            type: "pubkey"
          },
          {
            name: "user_pool_token_account",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "DisableEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "admin",
            type: "pubkey"
          },
          {
            name: "disable_create_pool",
            type: "bool"
          },
          {
            name: "disable_deposit",
            type: "bool"
          },
          {
            name: "disable_withdraw",
            type: "bool"
          },
          {
            name: "disable_buy",
            type: "bool"
          },
          {
            name: "disable_sell",
            type: "bool"
          }
        ]
      }
    },
    {
      name: "ExtendAccountEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "account",
            type: "pubkey"
          },
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "current_size",
            type: "u64"
          },
          {
            name: "new_size",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "FeeConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8"
          },
          {
            name: "admin",
            type: "pubkey"
          },
          {
            name: "flat_fees",
            type: {
              defined: {
                name: "Fees"
              }
            }
          },
          {
            name: "fee_tiers",
            type: {
              vec: {
                defined: {
                  name: "FeeTier"
                }
              }
            }
          }
        ]
      }
    },
    {
      name: "FeeTier",
      type: {
        kind: "struct",
        fields: [
          {
            name: "market_cap_lamports_threshold",
            type: "u128"
          },
          {
            name: "fees",
            type: {
              defined: {
                name: "Fees"
              }
            }
          }
        ]
      }
    },
    {
      name: "Fees",
      type: {
        kind: "struct",
        fields: [
          {
            name: "lp_fee_bps",
            type: "u64"
          },
          {
            name: "protocol_fee_bps",
            type: "u64"
          },
          {
            name: "creator_fee_bps",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "GlobalConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            docs: [
              "The admin pubkey"
            ],
            type: "pubkey"
          },
          {
            name: "lp_fee_basis_points",
            type: "u64"
          },
          {
            name: "protocol_fee_basis_points",
            type: "u64"
          },
          {
            name: "disable_flags",
            docs: [
              "Flags to disable certain functionality",
              "bit 0 - Disable create pool",
              "bit 1 - Disable deposit",
              "bit 2 - Disable withdraw",
              "bit 3 - Disable buy",
              "bit 4 - Disable sell"
            ],
            type: "u8"
          },
          {
            name: "protocol_fee_recipients",
            docs: [
              "Addresses of the protocol fee recipients"
            ],
            type: {
              array: [
                "pubkey",
                8
              ]
            }
          },
          {
            name: "coin_creator_fee_basis_points",
            type: "u64"
          },
          {
            name: "admin_set_coin_creator_authority",
            docs: [
              "The admin authority for setting coin creators"
            ],
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "GlobalVolumeAccumulator",
      type: {
        kind: "struct",
        fields: [
          {
            name: "start_time",
            type: "i64"
          },
          {
            name: "end_time",
            type: "i64"
          },
          {
            name: "seconds_in_a_day",
            type: "i64"
          },
          {
            name: "mint",
            type: "pubkey"
          },
          {
            name: "total_token_supply",
            type: {
              array: [
                "u64",
                30
              ]
            }
          },
          {
            name: "sol_volumes",
            type: {
              array: [
                "u64",
                30
              ]
            }
          }
        ]
      }
    },
    {
      name: "InitUserVolumeAccumulatorEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "payer",
            type: "pubkey"
          },
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "timestamp",
            type: "i64"
          }
        ]
      }
    },
    {
      name: "OptionBool",
      type: {
        kind: "struct",
        fields: [
          "bool"
        ]
      }
    },
    {
      name: "Pool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pool_bump",
            type: "u8"
          },
          {
            name: "index",
            type: "u16"
          },
          {
            name: "creator",
            type: "pubkey"
          },
          {
            name: "base_mint",
            type: "pubkey"
          },
          {
            name: "quote_mint",
            type: "pubkey"
          },
          {
            name: "lp_mint",
            type: "pubkey"
          },
          {
            name: "pool_base_token_account",
            type: "pubkey"
          },
          {
            name: "pool_quote_token_account",
            type: "pubkey"
          },
          {
            name: "lp_supply",
            docs: [
              "True circulating supply without burns and lock-ups"
            ],
            type: "u64"
          },
          {
            name: "coin_creator",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "SellEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "base_amount_in",
            type: "u64"
          },
          {
            name: "min_quote_amount_out",
            type: "u64"
          },
          {
            name: "user_base_token_reserves",
            type: "u64"
          },
          {
            name: "user_quote_token_reserves",
            type: "u64"
          },
          {
            name: "pool_base_token_reserves",
            type: "u64"
          },
          {
            name: "pool_quote_token_reserves",
            type: "u64"
          },
          {
            name: "quote_amount_out",
            type: "u64"
          },
          {
            name: "lp_fee_basis_points",
            type: "u64"
          },
          {
            name: "lp_fee",
            type: "u64"
          },
          {
            name: "protocol_fee_basis_points",
            type: "u64"
          },
          {
            name: "protocol_fee",
            type: "u64"
          },
          {
            name: "quote_amount_out_without_lp_fee",
            type: "u64"
          },
          {
            name: "user_quote_amount_out",
            type: "u64"
          },
          {
            name: "pool",
            type: "pubkey"
          },
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "user_base_token_account",
            type: "pubkey"
          },
          {
            name: "user_quote_token_account",
            type: "pubkey"
          },
          {
            name: "protocol_fee_recipient",
            type: "pubkey"
          },
          {
            name: "protocol_fee_recipient_token_account",
            type: "pubkey"
          },
          {
            name: "coin_creator",
            type: "pubkey"
          },
          {
            name: "coin_creator_fee_basis_points",
            type: "u64"
          },
          {
            name: "coin_creator_fee",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "SetBondingCurveCoinCreatorEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "base_mint",
            type: "pubkey"
          },
          {
            name: "pool",
            type: "pubkey"
          },
          {
            name: "bonding_curve",
            type: "pubkey"
          },
          {
            name: "coin_creator",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "SetMetaplexCoinCreatorEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "base_mint",
            type: "pubkey"
          },
          {
            name: "pool",
            type: "pubkey"
          },
          {
            name: "metadata",
            type: "pubkey"
          },
          {
            name: "coin_creator",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "SyncUserVolumeAccumulatorEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "total_claimed_tokens_before",
            type: "u64"
          },
          {
            name: "total_claimed_tokens_after",
            type: "u64"
          },
          {
            name: "timestamp",
            type: "i64"
          }
        ]
      }
    },
    {
      name: "UpdateAdminEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "admin",
            type: "pubkey"
          },
          {
            name: "new_admin",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "UpdateFeeConfigEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "admin",
            type: "pubkey"
          },
          {
            name: "lp_fee_basis_points",
            type: "u64"
          },
          {
            name: "protocol_fee_basis_points",
            type: "u64"
          },
          {
            name: "protocol_fee_recipients",
            type: {
              array: [
                "pubkey",
                8
              ]
            }
          },
          {
            name: "coin_creator_fee_basis_points",
            type: "u64"
          },
          {
            name: "admin_set_coin_creator_authority",
            type: "pubkey"
          }
        ]
      }
    },
    {
      name: "UserVolumeAccumulator",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "needs_claim",
            type: "bool"
          },
          {
            name: "total_unclaimed_tokens",
            type: "u64"
          },
          {
            name: "total_claimed_tokens",
            type: "u64"
          },
          {
            name: "current_sol_volume",
            type: "u64"
          },
          {
            name: "last_update_timestamp",
            type: "i64"
          },
          {
            name: "has_total_claimed_tokens",
            type: "bool"
          }
        ]
      }
    },
    {
      name: "WithdrawEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64"
          },
          {
            name: "lp_token_amount_in",
            type: "u64"
          },
          {
            name: "min_base_amount_out",
            type: "u64"
          },
          {
            name: "min_quote_amount_out",
            type: "u64"
          },
          {
            name: "user_base_token_reserves",
            type: "u64"
          },
          {
            name: "user_quote_token_reserves",
            type: "u64"
          },
          {
            name: "pool_base_token_reserves",
            type: "u64"
          },
          {
            name: "pool_quote_token_reserves",
            type: "u64"
          },
          {
            name: "base_amount_out",
            type: "u64"
          },
          {
            name: "quote_amount_out",
            type: "u64"
          },
          {
            name: "lp_mint_supply",
            type: "u64"
          },
          {
            name: "pool",
            type: "pubkey"
          },
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "user_base_token_account",
            type: "pubkey"
          },
          {
            name: "user_quote_token_account",
            type: "pubkey"
          },
          {
            name: "user_pool_token_account",
            type: "pubkey"
          }
        ]
      }
    }
  ]
};

// src/sdk/util.ts
function ceilDiv2(a, b) {
  if (b.isZero()) {
    throw new Error("Cannot divide by zero.");
  }
  return a.add(b.subn(1)).div(b);
}
function fee(amount, basisPoints) {
  return ceilDiv2(amount.mul(basisPoints), new import_bn3.default(1e4));
}
function getPumpAmmProgram(connection, programId = PUMP_AMM_PROGRAM_ID) {
  const pumpAmmIdlAddressOverride = { ...pump_amm_default };
  pumpAmmIdlAddressOverride.address = programId;
  return new import_anchor2.Program(
    pumpAmmIdlAddressOverride,
    new import_anchor2.AnchorProvider(connection, null, {})
  );
}

// src/sdk/buy.ts
var import_web32 = require("@solana/web3.js");
function buyBaseInputInternal(base, slippage, baseReserve, quoteReserve, lpFeeBps, protocolFeeBps, coinCreatorFeeBps, coinCreator) {
  if (base.isZero()) {
    throw new Error("Invalid input: 'base' cannot be zero.");
  }
  if (baseReserve.isZero() || quoteReserve.isZero()) {
    throw new Error(
      "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero."
    );
  }
  if (base.gt(baseReserve)) {
    throw new Error("Cannot buy more base tokens than the pool reserves.");
  }
  const numerator = quoteReserve.mul(base);
  const denominator = baseReserve.sub(base);
  if (denominator.isZero()) {
    throw new Error("Pool would be depleted; denominator is zero.");
  }
  const quoteAmountIn = ceilDiv2(numerator, denominator);
  const lpFee = fee(quoteAmountIn, lpFeeBps);
  const protocolFee = fee(quoteAmountIn, protocolFeeBps);
  const coinCreatorFee = import_web32.PublicKey.default.equals(coinCreator) ? new import_bn4.default(0) : fee(quoteAmountIn, coinCreatorFeeBps);
  const totalQuote = quoteAmountIn.add(lpFee).add(protocolFee).add(coinCreatorFee);
  const precision = new import_bn4.default(1e9);
  const slippageFactorFloat = (1 + slippage / 100) * 1e9;
  const slippageFactor = new import_bn4.default(Math.floor(slippageFactorFloat));
  const maxQuote = totalQuote.mul(slippageFactor).div(precision);
  return {
    internalQuoteAmount: quoteAmountIn,
    uiQuote: totalQuote,
    // Final total quote after fees
    maxQuote
  };
}
function buyQuoteInputInternal(quote, slippage, baseReserve, quoteReserve, lpFeeBps, protocolFeeBps, coinCreatorFeeBps, coinCreator) {
  if (quote.isZero()) {
    throw new Error("Invalid input: 'quote' cannot be zero.");
  }
  if (baseReserve.isZero() || quoteReserve.isZero()) {
    throw new Error(
      "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero."
    );
  }
  const totalFeeBps = lpFeeBps.add(protocolFeeBps).add(import_web32.PublicKey.default.equals(coinCreator) ? new import_bn4.default(0) : coinCreatorFeeBps);
  const denominator = new import_bn4.default(1e4).add(totalFeeBps);
  const effectiveQuote = quote.mul(new import_bn4.default(1e4)).div(denominator);
  const numerator = baseReserve.mul(effectiveQuote);
  const denominatorEffective = quoteReserve.add(effectiveQuote);
  if (denominatorEffective.isZero()) {
    throw new Error("Pool would be depleted; denominator is zero.");
  }
  const baseAmountOut = numerator.div(denominatorEffective);
  const precision = new import_bn4.default(1e9);
  const slippageFactorFloat = (1 + slippage / 100) * 1e9;
  const slippageFactor = new import_bn4.default(Math.floor(slippageFactorFloat));
  const maxQuote = quote.mul(slippageFactor).div(precision);
  return {
    base: baseAmountOut,
    // Base tokens received after fees
    internalQuoteWithoutFees: effectiveQuote,
    maxQuote
    // Maximum quote tokens to pay (with slippage)
  };
}

// src/sdk/sell.ts
var import_bn5 = __toESM(require_bn());
var import_web33 = require("@solana/web3.js");
function sellBaseInputInternal(base, slippage, baseReserve, quoteReserve, lpFeeBps, protocolFeeBps, coinCreatorFeeBps, coinCreator) {
  if (base.isZero()) {
    throw new Error("Invalid input: 'base' (base_amount_in) cannot be zero.");
  }
  if (baseReserve.isZero() || quoteReserve.isZero()) {
    throw new Error(
      "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero."
    );
  }
  const quoteAmountOut = quoteReserve.mul(base).div(baseReserve.add(base));
  const lpFee = fee(quoteAmountOut, lpFeeBps);
  const protocolFee = fee(quoteAmountOut, protocolFeeBps);
  const coinCreatorFee = import_web33.PublicKey.default.equals(coinCreator) ? new import_bn5.default(0) : fee(quoteAmountOut, coinCreatorFeeBps);
  const finalQuote = quoteAmountOut.sub(lpFee).sub(protocolFee).sub(coinCreatorFee);
  if (finalQuote.isNeg()) {
    throw new Error("Fees exceed total output; final quote is negative.");
  }
  const precision = new import_bn5.default(1e9);
  const slippageFactorFloat = (1 - slippage / 100) * 1e9;
  const slippageFactor = new import_bn5.default(Math.floor(slippageFactorFloat));
  const minQuote = finalQuote.mul(slippageFactor).div(precision);
  return {
    uiQuote: finalQuote,
    // actual tokens user receives after fees
    minQuote,
    // minimum acceptable tokens after applying slippage
    internalQuoteAmountOut: quoteAmountOut
  };
}
var MAX_FEE_BASIS_POINTS = new import_bn5.default(1e4);
function calculateQuoteAmountOut(userQuoteAmountOut, lpFeeBasisPoints, protocolFeeBasisPoints, coinCreatorFeeBasisPoints) {
  const totalFeeBasisPoints = lpFeeBasisPoints.add(protocolFeeBasisPoints).add(coinCreatorFeeBasisPoints);
  const denominator = MAX_FEE_BASIS_POINTS.sub(totalFeeBasisPoints);
  return ceilDiv2(userQuoteAmountOut.mul(MAX_FEE_BASIS_POINTS), denominator);
}
function sellQuoteInputInternal(quote, slippage, baseReserve, quoteReserve, lpFeeBps, protocolFeeBps, coinCreatorFeeBps, coinCreator) {
  if (quote.isZero()) {
    throw new Error("Invalid input: 'quote' cannot be zero.");
  }
  if (baseReserve.isZero() || quoteReserve.isZero()) {
    throw new Error(
      "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero."
    );
  }
  if (quote.gt(quoteReserve)) {
    throw new Error(
      "Cannot receive more quote tokens than the pool quote reserves."
    );
  }
  const rawQuote = calculateQuoteAmountOut(
    quote,
    lpFeeBps,
    protocolFeeBps,
    import_web33.PublicKey.default.equals(coinCreator) ? new import_bn5.default(0) : coinCreatorFeeBps
  );
  if (rawQuote.gte(quoteReserve)) {
    throw new Error(
      "Invalid input: Desired quote amount exceeds available reserve."
    );
  }
  const baseAmountIn = ceilDiv2(
    baseReserve.mul(rawQuote),
    quoteReserve.sub(rawQuote)
  );
  const precision = new import_bn5.default(1e9);
  const slippageFactorFloat = (1 - slippage / 100) * 1e9;
  const slippageFactor = new import_bn5.default(Math.floor(slippageFactorFloat));
  const minQuote = quote.mul(slippageFactor).div(precision);
  return {
    internalRawQuote: rawQuote,
    base: baseAmountIn,
    // amount of base tokens required to get the desired quote
    minQuote
    // minimum acceptable tokens after applying slippage
  };
}

// src/sdk/pumpAmmInternal.ts
var import_system = require("@coral-xyz/anchor/dist/cjs/native/system");
var POOL_ACCOUNT_NEW_SIZE = 300;
var PumpAmmInternalSdk = class {
  connection;
  program;
  globalConfig;
  constructor(connection, programId = PUMP_AMM_PROGRAM_ID) {
    this.connection = connection;
    this.program = getPumpAmmProgram(connection, programId);
    this.globalConfig = globalConfigPda(this.program.programId)[0];
  }
  programId() {
    return this.program.programId;
  }
  globalConfigKey() {
    return this.globalConfig;
  }
  poolKey(index, creator, baseMint, quoteMint) {
    return poolPda(index, creator, baseMint, quoteMint, this.program.programId);
  }
  lpMintKey(pool) {
    return lpMintPda(pool, this.program.programId);
  }
  fetchGlobalConfigAccount() {
    return this.program.account.globalConfig.fetch(this.globalConfig);
  }
  fetchPool(pool) {
    return this.program.account.pool.fetch(pool);
  }
  async createPoolInstructionsInternal(index, creator, baseMint, quoteMint, baseIn, quoteIn, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    const [baseTokenProgram, quoteTokenProgram] = await this.getMintTokenPrograms(baseMint, quoteMint);
    if (userBaseTokenAccount === void 0) {
      userBaseTokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        baseMint,
        creator,
        true,
        baseTokenProgram
      );
    }
    if (userQuoteTokenAccount === void 0) {
      userQuoteTokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        quoteMint,
        creator,
        true,
        quoteTokenProgram
      );
    }
    return await this.withWsolAccounts(
      creator,
      baseMint,
      userBaseTokenAccount,
      baseIn,
      quoteMint,
      userQuoteTokenAccount,
      quoteIn,
      async () => {
        const [pool] = poolPda(
          index,
          creator,
          baseMint,
          quoteMint,
          this.program.programId
        );
        const instructions = [];
        const poolBaseTokenAccountPDA = (0, import_spl_token2.getAssociatedTokenAddressSync)(
          baseMint,
          pool,
          true,
          baseTokenProgram
        );
        if (!await this.accountExists(poolBaseTokenAccountPDA)) {
          instructions.push(
            (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
              creator,
              poolBaseTokenAccountPDA,
              pool,
              baseMint,
              baseTokenProgram
            )
          );
        }
        const poolQuoteTokenAccountPDA = (0, import_spl_token2.getAssociatedTokenAddressSync)(
          quoteMint,
          pool,
          true,
          quoteTokenProgram
        );
        if (!await this.accountExists(poolQuoteTokenAccountPDA)) {
          instructions.push(
            (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
              creator,
              poolQuoteTokenAccountPDA,
              pool,
              quoteMint,
              quoteTokenProgram
            )
          );
        }
        instructions.push(
          await this.program.methods.createPool(index, baseIn, quoteIn, import_system.SYSTEM_PROGRAM_ID).accountsPartial({
            globalConfig: this.globalConfig,
            baseMint,
            quoteMint,
            creator,
            userBaseTokenAccount,
            userQuoteTokenAccount,
            baseTokenProgram,
            quoteTokenProgram
          }).instruction()
        );
        return instructions;
      }
    );
  }
  async depositInstructionsInternal(pool, lpToken, maxBase, maxQuote, user, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0, userPoolTokenAccount = void 0) {
    const poolAccountInfo = await this.connection.getAccountInfo(pool);
    const poolData = this.program.coder.accounts.decode(
      "pool",
      poolAccountInfo.data
    );
    const { baseMint, quoteMint, lpMint } = poolData;
    const [baseTokenProgram, quoteTokenProgram] = await this.getMintTokenPrograms(baseMint, quoteMint);
    const liquidityAccounts = await this.liquidityAccounts(
      pool,
      poolData,
      baseTokenProgram,
      quoteTokenProgram,
      user,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      userPoolTokenAccount
    );
    return await this.withFixPoolInstructions(
      pool,
      poolAccountInfo,
      user,
      async () => {
        return await this.withWsolAccounts(
          user,
          baseMint,
          liquidityAccounts.userBaseTokenAccount,
          maxBase,
          quoteMint,
          liquidityAccounts.userQuoteTokenAccount,
          maxQuote,
          async () => {
            const instructions = [];
            if (!await this.accountExists(
              liquidityAccounts.userPoolTokenAccount
            )) {
              instructions.push(
                (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
                  user,
                  liquidityAccounts.userPoolTokenAccount,
                  user,
                  lpMint,
                  import_spl_token2.TOKEN_2022_PROGRAM_ID
                )
              );
            }
            instructions.push(
              await this.program.methods.deposit(lpToken, maxBase, maxQuote).accountsPartial(liquidityAccounts).instruction()
            );
            return instructions;
          }
        );
      }
    );
  }
  async withWsolAccounts(user, baseMint, userBaseAta, baseAmount, quoteMint, userQuoteAta, quoteAmount, block) {
    return await this.withWsolAccount(
      user,
      baseMint,
      userBaseAta,
      baseAmount,
      () => this.withWsolAccount(user, quoteMint, userQuoteAta, quoteAmount, block)
    );
  }
  async withWsolAccount(user, mint, ata, amount, block) {
    const instructions = [];
    if (mint.equals(import_spl_token2.NATIVE_MINT)) {
      if (!await this.accountExists(ata)) {
        instructions.push(
          (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
            user,
            ata,
            user,
            import_spl_token2.NATIVE_MINT
          )
        );
      }
      if (amount.gtn(0)) {
        instructions.push(
          import_web34.SystemProgram.transfer({
            fromPubkey: user,
            toPubkey: ata,
            lamports: BigInt(amount.toString())
          }),
          (0, import_spl_token2.createSyncNativeInstruction)(ata)
        );
      }
    }
    const blockInstructions = await block();
    instructions.push(...blockInstructions);
    if (mint.equals(import_spl_token2.NATIVE_MINT)) {
      instructions.push(
        (0, import_spl_token2.createCloseAccountInstruction)(
          ata,
          user,
          user,
          void 0,
          import_spl_token2.TOKEN_PROGRAM_ID
        )
      );
    }
    return instructions;
  }
  async accountExists(account) {
    const accountInfo = await this.connection.getAccountInfo(account);
    return accountInfo !== null && !accountInfo.owner.equals(import_system.SYSTEM_PROGRAM_ID);
  }
  async depositBaseInputInternal(pool, base, slippage) {
    const { fetchedPool, poolBaseAmount, poolQuoteAmount } = await this.getPoolBaseAndQuoteAmounts(pool);
    const { token1, lpToken, maxToken0, maxToken1 } = depositToken0Internal(
      base,
      slippage,
      poolBaseAmount,
      poolQuoteAmount,
      fetchedPool.lpSupply
    );
    return {
      quote: token1,
      lpToken,
      maxBase: maxToken0,
      maxQuote: maxToken1
    };
  }
  async depositQuoteInputInternal(pool, quote, slippage) {
    const { fetchedPool, poolBaseAmount, poolQuoteAmount } = await this.getPoolBaseAndQuoteAmounts(pool);
    const { token1, lpToken, maxToken0, maxToken1 } = depositToken0Internal(
      quote,
      slippage,
      poolQuoteAmount,
      poolBaseAmount,
      fetchedPool.lpSupply
    );
    return {
      base: token1,
      lpToken,
      maxBase: maxToken1,
      maxQuote: maxToken0
    };
  }
  async withdrawInstructionsInternal(pool, lpTokenAmountIn, minBaseAmountOut, minQuoteAmountOut, user, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0, userPoolTokenAccount = void 0) {
    const poolAccountInfo = await this.connection.getAccountInfo(pool);
    const poolData = this.program.coder.accounts.decode(
      "pool",
      poolAccountInfo.data
    );
    const { baseMint, quoteMint } = poolData;
    const [baseTokenProgram, quoteTokenProgram] = await this.getMintTokenPrograms(baseMint, quoteMint);
    const liquidityAccounts = await this.liquidityAccounts(
      pool,
      poolData,
      baseTokenProgram,
      quoteTokenProgram,
      user,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      userPoolTokenAccount
    );
    return await this.withFixPoolInstructions(
      pool,
      poolAccountInfo,
      user,
      async () => {
        const instructions = [];
        let baseWsolAtaCreated = false;
        if (!await this.accountExists(liquidityAccounts.userBaseTokenAccount)) {
          instructions.push(
            (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
              user,
              liquidityAccounts.userBaseTokenAccount,
              user,
              liquidityAccounts.baseMint,
              baseTokenProgram
            )
          );
          if (baseMint.equals(import_spl_token2.NATIVE_MINT)) {
            baseWsolAtaCreated = true;
          }
        }
        let quoteWsolAtaCreated = false;
        if (!await this.accountExists(liquidityAccounts.userQuoteTokenAccount)) {
          instructions.push(
            (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
              user,
              liquidityAccounts.userQuoteTokenAccount,
              user,
              liquidityAccounts.quoteMint,
              quoteTokenProgram
            )
          );
          if (quoteMint.equals(import_spl_token2.NATIVE_MINT)) {
            quoteWsolAtaCreated = true;
          }
        }
        instructions.push(
          await this.program.methods.withdraw(lpTokenAmountIn, minBaseAmountOut, minQuoteAmountOut).accountsPartial(liquidityAccounts).instruction()
        );
        if (baseWsolAtaCreated) {
          instructions.push(
            (0, import_spl_token2.createCloseAccountInstruction)(
              liquidityAccounts.userBaseTokenAccount,
              user,
              user,
              void 0,
              import_spl_token2.TOKEN_PROGRAM_ID
            )
          );
        }
        if (quoteWsolAtaCreated) {
          instructions.push(
            (0, import_spl_token2.createCloseAccountInstruction)(
              liquidityAccounts.userQuoteTokenAccount,
              user,
              user,
              void 0,
              import_spl_token2.TOKEN_PROGRAM_ID
            )
          );
        }
        return instructions;
      }
    );
  }
  async withdrawInputsInternal(pool, lpAmount, slippage) {
    const { fetchedPool, poolBaseAmount, poolQuoteAmount } = await this.getPoolBaseAndQuoteAmounts(pool);
    return withdrawInternal(
      lpAmount,
      slippage,
      poolBaseAmount,
      poolQuoteAmount,
      fetchedPool.lpSupply
    );
  }
  async getPoolBaseAndQuoteAmounts(pool) {
    const fetchedPool = await this.fetchPool(pool);
    const [baseTokenProgram, quoteTokenProgram] = await this.getMintTokenPrograms(
      fetchedPool.baseMint,
      fetchedPool.quoteMint
    );
    const poolBaseTokenAccount = await (0, import_spl_token2.getAccount)(
      this.connection,
      fetchedPool.poolBaseTokenAccount,
      void 0,
      baseTokenProgram
    );
    const poolQuoteTokenAccount = await (0, import_spl_token2.getAccount)(
      this.connection,
      fetchedPool.poolQuoteTokenAccount,
      void 0,
      quoteTokenProgram
    );
    const poolBaseAmount = new import_anchor3.BN(poolBaseTokenAccount.amount.toString());
    const poolQuoteAmount = new import_anchor3.BN(poolQuoteTokenAccount.amount.toString());
    return { fetchedPool, poolBaseAmount, poolQuoteAmount };
  }
  async liquidityAccounts(pool, {
    baseMint,
    quoteMint,
    lpMint,
    poolBaseTokenAccount,
    poolQuoteTokenAccount
  }, baseTokenProgram, quoteTokenProgram, user, userBaseTokenAccount, userQuoteTokenAccount, userPoolTokenAccount) {
    if (userBaseTokenAccount === void 0) {
      userBaseTokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        baseMint,
        user,
        true,
        baseTokenProgram
      );
    }
    if (userQuoteTokenAccount === void 0) {
      userQuoteTokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        quoteMint,
        user,
        true,
        quoteTokenProgram
      );
    }
    if (userPoolTokenAccount === void 0) {
      userPoolTokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        lpMint,
        user,
        true,
        import_spl_token2.TOKEN_2022_PROGRAM_ID
      );
    }
    return {
      pool,
      globalConfig: this.globalConfig,
      user,
      baseMint,
      quoteMint,
      lpMint,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      userPoolTokenAccount,
      poolBaseTokenAccount,
      poolQuoteTokenAccount
    };
  }
  async buyInstructionsInternal(pool, baseOut, maxQuoteIn, user, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    const poolAccountInfo = await this.connection.getAccountInfo(pool);
    const poolData = this.program.coder.accounts.decode(
      "pool",
      poolAccountInfo.data
    );
    const { index, creator, baseMint, quoteMint, coinCreator } = poolData;
    return await this.withFixPoolInstructions(
      pool,
      poolAccountInfo,
      user,
      async () => {
        return await this.buyInstructionsInternalNoPool(
          index,
          creator,
          baseMint,
          quoteMint,
          baseOut,
          maxQuoteIn,
          user,
          coinCreator,
          protocolFeeRecipient,
          userBaseTokenAccount,
          userQuoteTokenAccount
        );
      }
    );
  }
  async buyInstructionsInternalNoPool(index, creator, baseMint, quoteMint, baseOut, maxQuoteIn, user, coinCreator, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    const [pool] = this.poolKey(index, creator, baseMint, quoteMint);
    const swapAccounts = await this.swapAccounts(
      pool,
      baseMint,
      quoteMint,
      user,
      coinCreator,
      protocolFeeRecipient,
      userBaseTokenAccount,
      userQuoteTokenAccount
    );
    return this.withWsolAccount(
      user,
      quoteMint,
      swapAccounts.userQuoteTokenAccount,
      maxQuoteIn,
      async () => {
        const instructions = [];
        let baseWsolAtaCreated = false;
        if (!await this.accountExists(swapAccounts.userBaseTokenAccount)) {
          instructions.push(
            (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
              user,
              swapAccounts.userBaseTokenAccount,
              user,
              swapAccounts.baseMint,
              swapAccounts.baseTokenProgram
            )
          );
          if (baseMint.equals(import_spl_token2.NATIVE_MINT)) {
            baseWsolAtaCreated = true;
          }
        }
        instructions.push(
          await this.program.methods.buy(baseOut, maxQuoteIn, { 0: true }).accountsPartial(swapAccounts).instruction()
        );
        if (baseWsolAtaCreated) {
          instructions.push(
            (0, import_spl_token2.createCloseAccountInstruction)(
              swapAccounts.userBaseTokenAccount,
              user,
              user,
              void 0,
              import_spl_token2.TOKEN_PROGRAM_ID
            )
          );
        }
        return instructions;
      }
    );
  }
  async buyInstructionsSync(baseMint, quoteMint, baseOut, maxQuoteIn, user, coinCreator, protocolFeeRecipient, userBaseTokenAccount = void 0, userQuoteTokenAccount, pool) {
    const coinCreatorVaultAuthority = this.coinCreatorVaultAuthorityPda(coinCreator);
    const swapAccounts = {
      pool,
      globalConfig: this.globalConfig,
      user,
      baseMint,
      quoteMint,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      poolBaseTokenAccount: (0, import_spl_token2.getAssociatedTokenAddressSync)(
        baseMint,
        pool,
        true,
        import_spl_token2.TOKEN_PROGRAM_ID
      ),
      poolQuoteTokenAccount: (0, import_spl_token2.getAssociatedTokenAddressSync)(
        quoteMint,
        pool,
        true,
        import_spl_token2.TOKEN_PROGRAM_ID
      ),
      protocolFeeRecipient,
      baseTokenProgram: import_spl_token2.TOKEN_PROGRAM_ID,
      quoteTokenProgram: import_spl_token2.TOKEN_PROGRAM_ID,
      coinCreatorVaultAta: this.coinCreatorVaultAta(
        coinCreatorVaultAuthority,
        quoteMint,
        import_spl_token2.TOKEN_PROGRAM_ID
      ),
      coinCreatorVaultAuthority
    };
    const instructions = [];
    if (!userBaseTokenAccount) {
      userBaseTokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        baseMint,
        user,
        true,
        import_spl_token2.TOKEN_PROGRAM_ID
      );
      instructions.push(
        (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
          user,
          userBaseTokenAccount,
          user,
          swapAccounts.baseMint,
          swapAccounts.baseTokenProgram
        )
      );
    }
    instructions.push(
      await this.program.methods.buy(baseOut, maxQuoteIn, { 0: true }).accountsPartial(swapAccounts).instruction()
    );
    return instructions;
  }
  async buyBaseInput(pool, base, slippage, user, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    const { maxQuote } = await this.buyBaseInputInternal(pool, base, slippage);
    return this.buyInstructionsInternal(
      pool,
      base,
      maxQuote,
      user,
      protocolFeeRecipient,
      userBaseTokenAccount,
      userQuoteTokenAccount
    );
  }
  async buyQuoteInput(pool, quote, slippage, user, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    const { base, maxQuote } = await this.buyQuoteInputInternal(
      pool,
      quote,
      slippage
    );
    return this.buyInstructionsInternal(
      pool,
      base,
      maxQuote,
      user,
      protocolFeeRecipient,
      userBaseTokenAccount,
      userQuoteTokenAccount
    );
  }
  async buyAutocompleteQuoteFromBase(pool, base, slippage) {
    const { uiQuote } = await this.buyBaseInputInternal(pool, base, slippage);
    return uiQuote;
  }
  async buyAutocompleteBaseFromQuote(pool, quote, slippage) {
    const { base } = await this.buyQuoteInputInternal(pool, quote, slippage);
    return base;
  }
  async buyBaseInputInternal(pool, base, slippage) {
    const { fetchedPool, poolBaseAmount, poolQuoteAmount } = await this.getPoolBaseAndQuoteAmounts(pool);
    const globalConfig = await this.fetchGlobalConfigAccount();
    return buyBaseInputInternal(
      base,
      slippage,
      poolBaseAmount,
      poolQuoteAmount,
      globalConfig.lpFeeBasisPoints,
      globalConfig.protocolFeeBasisPoints,
      globalConfig.coinCreatorFeeBasisPoints,
      fetchedPool.coinCreator
    );
  }
  async buyQuoteInputInternal(pool, quote, slippage) {
    const { fetchedPool, poolBaseAmount, poolQuoteAmount } = await this.getPoolBaseAndQuoteAmounts(pool);
    return this.buyQuoteInputInternalNoPool(
      quote,
      slippage,
      poolBaseAmount,
      poolQuoteAmount,
      fetchedPool.coinCreator
    );
  }
  async buyQuoteInputInternalNoPool(quote, slippage, poolBaseAmount, poolQuoteAmount, coinCreator) {
    const globalConfig = await this.fetchGlobalConfigAccount();
    return buyQuoteInputInternal(
      quote,
      slippage,
      poolBaseAmount,
      poolQuoteAmount,
      globalConfig.lpFeeBasisPoints,
      globalConfig.protocolFeeBasisPoints,
      globalConfig.coinCreatorFeeBasisPoints,
      coinCreator
    );
  }
  async sellInstructionsInternal(pool, baseAmountIn, minQuoteAmountOut, user, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    const poolAccountInfo = await this.connection.getAccountInfo(pool);
    const poolData = this.program.coder.accounts.decode(
      "pool",
      poolAccountInfo.data
    );
    const { index, creator, baseMint, quoteMint, coinCreator } = poolData;
    return await this.withFixPoolInstructions(
      pool,
      poolAccountInfo,
      user,
      async () => {
        return await this.sellInstructionsInternalNoPool(
          index,
          creator,
          baseMint,
          quoteMint,
          baseAmountIn,
          minQuoteAmountOut,
          user,
          coinCreator,
          protocolFeeRecipient,
          userBaseTokenAccount,
          userQuoteTokenAccount
        );
      }
    );
  }
  async fixPoolInstructions(pool, user) {
    const poolAccountInfo = await this.connection.getAccountInfo(pool);
    return await this.withFixPoolInstructions(
      pool,
      poolAccountInfo,
      user,
      async () => []
    );
  }
  async withFixPoolInstructions(pool, poolAccountInfo, user, block) {
    const instructions = [];
    if (poolAccountInfo === null || poolAccountInfo.data.length < POOL_ACCOUNT_NEW_SIZE) {
      instructions.push(
        await this.program.methods.extendAccount().accountsPartial({
          account: pool,
          user
        }).instruction()
      );
    }
    return [...instructions, ...await block()];
  }
  async sellInstructionsInternalNoPool(index, creator, baseMint, quoteMint, baseAmountIn, minQuoteAmountOut, user, coinCreator, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    const [pool] = this.poolKey(index, creator, baseMint, quoteMint);
    const swapAccounts = await this.swapAccounts(
      pool,
      baseMint,
      quoteMint,
      user,
      coinCreator,
      protocolFeeRecipient,
      userBaseTokenAccount,
      userQuoteTokenAccount
    );
    return this.withWsolAccount(
      user,
      baseMint,
      swapAccounts.userBaseTokenAccount,
      baseAmountIn,
      async () => {
        const instructions = [];
        let quoteWsolAtaCreated = false;
        if (!await this.accountExists(swapAccounts.userQuoteTokenAccount)) {
          instructions.push(
            (0, import_spl_token2.createAssociatedTokenAccountIdempotentInstruction)(
              user,
              swapAccounts.userQuoteTokenAccount,
              user,
              swapAccounts.quoteMint,
              swapAccounts.quoteTokenProgram
            )
          );
          if (quoteMint.equals(import_spl_token2.NATIVE_MINT)) {
            quoteWsolAtaCreated = true;
          }
        }
        instructions.push(
          await this.program.methods.sell(baseAmountIn, minQuoteAmountOut).accountsPartial(swapAccounts).instruction()
        );
        if (quoteWsolAtaCreated) {
          instructions.push(
            (0, import_spl_token2.createCloseAccountInstruction)(
              swapAccounts.userQuoteTokenAccount,
              user,
              user,
              void 0,
              import_spl_token2.TOKEN_PROGRAM_ID
            )
          );
        }
        return instructions;
      }
    );
  }
  async sellInstructionsSync(baseMint, quoteMint, baseAmountIn, minQuoteAmountOut, user, coinCreator, protocolFeeRecipient, userBaseTokenAccount, userQuoteTokenAccount, pool) {
    const coinCreatorVaultAuthority = this.coinCreatorVaultAuthorityPda(coinCreator);
    const swapAccounts = {
      pool,
      globalConfig: this.globalConfig,
      user,
      baseMint,
      quoteMint,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      poolBaseTokenAccount: (0, import_spl_token2.getAssociatedTokenAddressSync)(
        baseMint,
        pool,
        true,
        import_spl_token2.TOKEN_PROGRAM_ID
      ),
      poolQuoteTokenAccount: (0, import_spl_token2.getAssociatedTokenAddressSync)(
        quoteMint,
        pool,
        true,
        import_spl_token2.TOKEN_PROGRAM_ID
      ),
      protocolFeeRecipient,
      baseTokenProgram: import_spl_token2.TOKEN_PROGRAM_ID,
      quoteTokenProgram: import_spl_token2.TOKEN_PROGRAM_ID,
      coinCreatorVaultAta: this.coinCreatorVaultAta(
        coinCreatorVaultAuthority,
        quoteMint,
        import_spl_token2.TOKEN_PROGRAM_ID
      ),
      coinCreatorVaultAuthority
    };
    const instructions = [];
    instructions.push(
      await this.program.methods.sell(baseAmountIn, minQuoteAmountOut).accountsPartial(swapAccounts).instruction()
    );
    return instructions;
  }
  async sellBaseInput(pool, base, slippage, user, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    const { minQuote } = await this.sellBaseInputInternal(pool, base, slippage);
    return this.sellInstructionsInternal(
      pool,
      base,
      minQuote,
      user,
      protocolFeeRecipient,
      userBaseTokenAccount,
      userQuoteTokenAccount
    );
  }
  async sellQuoteInput(pool, quote, slippage, user, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    const { base, minQuote } = await this.sellQuoteInputInternal(
      pool,
      quote,
      slippage
    );
    return this.sellInstructionsInternal(
      pool,
      base,
      minQuote,
      user,
      protocolFeeRecipient,
      userBaseTokenAccount,
      userQuoteTokenAccount
    );
  }
  async sellAutocompleteQuoteFromBase(pool, base, slippage) {
    const { uiQuote } = await this.sellBaseInputInternal(pool, base, slippage);
    return uiQuote;
  }
  async sellAutocompleteBaseFromQuote(pool, quote, slippage) {
    const { base } = await this.sellQuoteInputInternal(pool, quote, slippage);
    return base;
  }
  async sellBaseInputInternal(pool, base, slippage) {
    const { fetchedPool, poolBaseAmount, poolQuoteAmount } = await this.getPoolBaseAndQuoteAmounts(pool);
    return this.sellBaseInputInternalNoPool(
      base,
      slippage,
      poolBaseAmount,
      poolQuoteAmount,
      fetchedPool.coinCreator
    );
  }
  async sellBaseInputInternalNoPool(base, slippage, poolBaseAmount, poolQuoteAmount, coinCreator) {
    const globalConfig = await this.fetchGlobalConfigAccount();
    return sellBaseInputInternal(
      base,
      slippage,
      poolBaseAmount,
      poolQuoteAmount,
      globalConfig.lpFeeBasisPoints,
      globalConfig.protocolFeeBasisPoints,
      globalConfig.coinCreatorFeeBasisPoints,
      coinCreator
    );
  }
  async sellQuoteInputInternal(pool, quote, slippage) {
    const { fetchedPool, poolBaseAmount, poolQuoteAmount } = await this.getPoolBaseAndQuoteAmounts(pool);
    const globalConfig = await this.fetchGlobalConfigAccount();
    return sellQuoteInputInternal(
      quote,
      slippage,
      poolBaseAmount,
      poolQuoteAmount,
      globalConfig.lpFeeBasisPoints,
      globalConfig.protocolFeeBasisPoints,
      globalConfig.coinCreatorFeeBasisPoints,
      fetchedPool.coinCreator
    );
  }
  async extendAccount(account, user) {
    return this.program.methods.extendAccount().accountsPartial({
      account,
      user
    }).instruction();
  }
  async collectCoinCreatorFee(coinCreator, coinCreatorTokenAccount = void 0) {
    const quoteMint = import_spl_token2.NATIVE_MINT;
    const quoteTokenProgram = import_spl_token2.TOKEN_PROGRAM_ID;
    if (coinCreatorTokenAccount === void 0) {
      coinCreatorTokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        quoteMint,
        coinCreator,
        true,
        quoteTokenProgram
      );
    }
    return await this.withWsolAccount(
      coinCreator,
      quoteMint,
      coinCreatorTokenAccount,
      new import_anchor3.BN(0),
      async () => {
        return [
          await this.program.methods.collectCoinCreatorFee().accountsPartial({
            coinCreator,
            coinCreatorTokenAccount,
            quoteMint,
            quoteTokenProgram
          }).instruction()
        ];
      }
    );
  }
  async getCoinCreatorVaultBalance(coinCreator) {
    const quoteMint = import_spl_token2.NATIVE_MINT;
    const quoteTokenProgram = import_spl_token2.TOKEN_PROGRAM_ID;
    const coinCreatorVaultAuthority = this.coinCreatorVaultAuthorityPda(coinCreator);
    const coinCreatorVaultAta = this.coinCreatorVaultAta(
      coinCreatorVaultAuthority,
      quoteMint,
      quoteTokenProgram
    );
    try {
      const tokenAccount = await (0, import_spl_token2.getAccount)(
        this.connection,
        coinCreatorVaultAta,
        void 0,
        quoteTokenProgram
      );
      return new import_anchor3.BN(tokenAccount.amount.toString());
    } catch (e) {
      console.error(`Error fetching token account ${coinCreatorVaultAta}:`, e);
      return new import_anchor3.BN(0);
    }
  }
  async setCoinCreator(pool) {
    return this.program.methods.setCoinCreator().accountsPartial({
      pool
    }).instruction();
  }
  async swapAccounts(pool, baseMint, quoteMint, user, coinCreator, protocolFeeRecipient, userBaseTokenAccount, userQuoteTokenAccount) {
    if (protocolFeeRecipient === void 0) {
      const { protocolFeeRecipients } = await this.fetchGlobalConfigAccount();
      protocolFeeRecipient = protocolFeeRecipients[Math.floor(Math.random() * protocolFeeRecipients.length)];
    }
    if (userBaseTokenAccount === void 0) {
      userBaseTokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        baseMint,
        user,
        true,
        import_spl_token2.TOKEN_PROGRAM_ID
        // was baseTokenProgram
      );
    }
    if (userQuoteTokenAccount === void 0) {
      userQuoteTokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        quoteMint,
        user,
        true,
        import_spl_token2.TOKEN_PROGRAM_ID
        // was quoteTokenProgram
      );
    }
    const coinCreatorVaultAuthority = this.coinCreatorVaultAuthorityPda(coinCreator);
    return {
      pool,
      globalConfig: this.globalConfig,
      user,
      baseMint,
      quoteMint,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      poolBaseTokenAccount: (0, import_spl_token2.getAssociatedTokenAddressSync)(
        baseMint,
        pool,
        true,
        import_spl_token2.TOKEN_PROGRAM_ID
        // was baseTokenProgram
      ),
      poolQuoteTokenAccount: (0, import_spl_token2.getAssociatedTokenAddressSync)(
        quoteMint,
        pool,
        true,
        import_spl_token2.TOKEN_PROGRAM_ID
        // was quoteTokenProgram
      ),
      protocolFeeRecipient,
      baseTokenProgram: import_spl_token2.TOKEN_PROGRAM_ID,
      // was baseTokenProgram
      quoteTokenProgram: import_spl_token2.TOKEN_PROGRAM_ID,
      // was quoteTokenProgram
      coinCreatorVaultAta: this.coinCreatorVaultAta(
        coinCreatorVaultAuthority,
        quoteMint,
        import_spl_token2.TOKEN_PROGRAM_ID
        // was quoteTokenProgram
      ),
      coinCreatorVaultAuthority
    };
  }
  coinCreatorVaultAuthorityPda(coinCreator) {
    const [coinCreatorVaultAuthority] = import_web34.PublicKey.findProgramAddressSync(
      [Buffer.from("creator_vault"), coinCreator.toBuffer()],
      this.programId()
    );
    return coinCreatorVaultAuthority;
  }
  coinCreatorVaultAta(coinCreatorVaultAuthority, quoteMint, quoteTokenProgram) {
    return (0, import_spl_token2.getAssociatedTokenAddressSync)(
      quoteMint,
      coinCreatorVaultAuthority,
      true,
      quoteTokenProgram
    );
  }
  async getMintTokenPrograms(baseMint, quoteMint) {
    const baseMintAccountInfo = await this.connection.getAccountInfo(baseMint);
    if (baseMintAccountInfo === null) {
      throw new Error(`baseMint=${baseMint} not found`);
    }
    const quoteMintAccountInfo = await this.connection.getAccountInfo(quoteMint);
    if (quoteMintAccountInfo === null) {
      throw new Error(`quoteMint=${quoteMint} not found`);
    }
    return [baseMintAccountInfo.owner, quoteMintAccountInfo.owner];
  }
};

// src/sdk/pumpAmm.ts
var PumpAmmSdk = class {
  pumpAmmInternalSdk;
  constructor(connection, programId = PUMP_AMM_PROGRAM_ID) {
    this.pumpAmmInternalSdk = new PumpAmmInternalSdk(connection, programId);
  }
  programId() {
    return this.pumpAmmInternalSdk.programId();
  }
  globalConfigKey() {
    return this.pumpAmmInternalSdk.globalConfigKey();
  }
  poolKey(index, creator, baseMint, quoteMint) {
    return this.pumpAmmInternalSdk.poolKey(index, creator, baseMint, quoteMint);
  }
  lpMintKey(pool) {
    return this.pumpAmmInternalSdk.lpMintKey(pool);
  }
  fetchGlobalConfigAccount() {
    return this.pumpAmmInternalSdk.fetchGlobalConfigAccount();
  }
  fetchPool(pool) {
    return this.pumpAmmInternalSdk.fetchPool(pool);
  }
  async createPoolInstructions(index, creator, baseMint, quoteMint, baseIn, quoteIn, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    return this.pumpAmmInternalSdk.createPoolInstructionsInternal(
      index,
      creator,
      baseMint,
      quoteMint,
      baseIn,
      quoteIn,
      userBaseTokenAccount,
      userQuoteTokenAccount
    );
  }
  async createAutocompleteInitialPoolPrice(initialBase, initialQuote) {
    return initialQuote.div(initialBase);
  }
  async depositInstructions(pool, lpToken, slippage, user, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0, userPoolTokenAccount = void 0) {
    const { fetchedPool, poolBaseAmount, poolQuoteAmount } = await this.pumpAmmInternalSdk.getPoolBaseAndQuoteAmounts(pool);
    const { maxBase, maxQuote } = depositLpToken(
      lpToken,
      slippage,
      poolBaseAmount,
      poolQuoteAmount,
      fetchedPool.lpSupply
    );
    return this.pumpAmmInternalSdk.depositInstructionsInternal(
      pool,
      lpToken,
      maxBase,
      maxQuote,
      user,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      userPoolTokenAccount
    );
  }
  async depositAutocompleteQuoteAndLpTokenFromBase(pool, base, slippage) {
    const { quote, lpToken } = await this.pumpAmmInternalSdk.depositBaseInputInternal(
      pool,
      base,
      slippage
    );
    return {
      quote,
      lpToken
    };
  }
  async depositAutocompleteBaseAndLpTokenFromQuote(pool, quote, slippage) {
    const { base, lpToken } = await this.pumpAmmInternalSdk.depositQuoteInputInternal(
      pool,
      quote,
      slippage
    );
    return {
      base,
      lpToken
    };
  }
  async withdrawInstructions(pool, lpToken, slippage, user, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0, userPoolTokenAccount = void 0) {
    const { minBase, minQuote } = await this.pumpAmmInternalSdk.withdrawInputsInternal(
      pool,
      lpToken,
      slippage
    );
    return this.pumpAmmInternalSdk.withdrawInstructionsInternal(
      pool,
      lpToken,
      minBase,
      minQuote,
      user,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      userPoolTokenAccount
    );
  }
  async withdrawAutoCompleteBaseAndQuoteFromLpToken(pool, lpAmount, slippage) {
    const { base, quote } = await this.pumpAmmInternalSdk.withdrawInputsInternal(
      pool,
      lpAmount,
      slippage
    );
    return {
      base,
      quote
    };
  }
  async swapBaseInstructions(pool, base, slippage, direction, user, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    if (direction == "quoteToBase") {
      return await this.pumpAmmInternalSdk.buyBaseInput(
        pool,
        base,
        slippage,
        user,
        protocolFeeRecipient,
        userBaseTokenAccount,
        userQuoteTokenAccount
      );
    }
    return await this.pumpAmmInternalSdk.sellBaseInput(
      pool,
      base,
      slippage,
      user,
      protocolFeeRecipient,
      userBaseTokenAccount,
      userQuoteTokenAccount
    );
  }
  async swapQuoteInstructions(pool, quote, slippage, direction, user, protocolFeeRecipient = void 0, userBaseTokenAccount = void 0, userQuoteTokenAccount = void 0) {
    if (direction == "quoteToBase") {
      return await this.pumpAmmInternalSdk.buyQuoteInput(
        pool,
        quote,
        slippage,
        user,
        protocolFeeRecipient,
        userBaseTokenAccount,
        userQuoteTokenAccount
      );
    }
    return await this.pumpAmmInternalSdk.sellQuoteInput(
      pool,
      quote,
      slippage,
      user,
      protocolFeeRecipient,
      userBaseTokenAccount,
      userQuoteTokenAccount
    );
  }
  async swapAutocompleteQuoteFromBase(pool, base, slippage, direction) {
    if (direction == "quoteToBase") {
      return await this.pumpAmmInternalSdk.buyAutocompleteQuoteFromBase(
        pool,
        base,
        slippage
      );
    }
    return await this.pumpAmmInternalSdk.sellAutocompleteQuoteFromBase(
      pool,
      base,
      slippage
    );
  }
  async swapAutocompleteBaseFromQuote(pool, quote, slippage, direction) {
    if (direction == "quoteToBase") {
      return await this.pumpAmmInternalSdk.buyAutocompleteBaseFromQuote(
        pool,
        quote,
        slippage
      );
    }
    return await this.pumpAmmInternalSdk.sellAutocompleteBaseFromQuote(
      pool,
      quote,
      slippage
    );
  }
  async extendAccount(account, user) {
    return this.pumpAmmInternalSdk.extendAccount(account, user);
  }
  async collectCoinCreatorFee(coinCreator, coinCreatorTokenAccount = void 0) {
    return this.pumpAmmInternalSdk.collectCoinCreatorFee(
      coinCreator,
      coinCreatorTokenAccount
    );
  }
  coinCreatorVaultAuthorityPda(coinCreator) {
    return this.pumpAmmInternalSdk.coinCreatorVaultAuthorityPda(coinCreator);
  }
  coinCreatorVaultAta(coinCreatorVaultAuthority, quoteMint, quoteTokenProgram) {
    return this.pumpAmmInternalSdk.coinCreatorVaultAta(
      coinCreatorVaultAuthority,
      quoteMint,
      quoteTokenProgram
    );
  }
  async setCoinCreator(pool) {
    return this.pumpAmmInternalSdk.setCoinCreator(pool);
  }
};

// src/sdk/pumpAmmAdmin.ts
var PumpAmmAdminSdk = class {
  program;
  globalConfig;
  constructor(connection, programId = PUMP_AMM_PROGRAM_ID) {
    this.program = getPumpAmmProgram(connection, programId);
    this.globalConfig = globalConfigPda(this.program.programId)[0];
  }
  programId() {
    return this.program.programId;
  }
  fetchGlobalConfigAccount() {
    return this.program.account.globalConfig.fetch(this.globalConfig);
  }
  createConfig(lpFeeBasisPoints, protocolFeeBasisPoints, protocolFeeRecipients, coinCreatorFeeBasisPoints, admin, adminSetCoinCreatorAuthority) {
    return this.program.methods.createConfig(
      lpFeeBasisPoints,
      protocolFeeBasisPoints,
      protocolFeeRecipients,
      coinCreatorFeeBasisPoints,
      adminSetCoinCreatorAuthority
    ).accountsPartial({
      admin
    }).instruction();
  }
  disable(disableCreatePool, disableDeposit, disableWithdraw, disableBuy, disableSell, admin) {
    return this.program.methods.disable(
      disableCreatePool,
      disableDeposit,
      disableWithdraw,
      disableBuy,
      disableSell
    ).accountsPartial({
      admin,
      globalConfig: this.globalConfig
    }).instruction();
  }
  updateAdmin(admin, newAdmin) {
    return this.program.methods.updateAdmin().accountsPartial({
      admin,
      newAdmin,
      globalConfig: this.globalConfig
    }).instruction();
  }
  updateFeeConfig(lpFeeBasisPoints, protocolFeeBasisPoints, protocolFeeRecipients, coinCreatorFeeBasisPoints, admin, adminSetCoinCreatorAuthority) {
    return this.program.methods.updateFeeConfig(
      lpFeeBasisPoints,
      protocolFeeBasisPoints,
      protocolFeeRecipients,
      coinCreatorFeeBasisPoints,
      adminSetCoinCreatorAuthority
    ).accountsPartial({
      admin,
      globalConfig: this.globalConfig
    }).instruction();
  }
};

// src/sdk/transaction.ts
var import_web35 = require("@solana/web3.js");
var import_bytes = require("@coral-xyz/anchor/dist/cjs/utils/bytes");
function transactionFromInstructions(payerKey, instructions, recentBlockhash, signers) {
  const transaction = new import_web35.VersionedTransaction(
    new import_web35.TransactionMessage({
      payerKey,
      instructions,
      recentBlockhash
    }).compileToV0Message()
  );
  transaction.sign(signers);
  return transaction;
}
function getSignature(transaction) {
  return import_bytes.bs58.encode(transaction.signatures[0]);
}
async function sendAndConfirmTransaction(connection, payerKey, instructions, signers) {
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  const transaction = transactionFromInstructions(
    payerKey,
    instructions,
    blockhash,
    signers
  );
  await connection.sendTransaction(transaction);
  const signature = getSignature(transaction);
  const result = await connection.confirmTransaction({
    signature,
    blockhash,
    lastValidBlockHeight
  });
  return [transaction, result.value.err];
}

// src/index.ts
console.log("You are using custom pumpswap sdk v3.3");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CANONICAL_POOL_INDEX,
  PUMP_AMM_PROGRAM_ID,
  PUMP_AMM_PROGRAM_ID_PUBKEY,
  PUMP_PROGRAM_ID,
  PUMP_PROGRAM_ID_PUBKEY,
  PumpAmmAdminSdk,
  PumpAmmInternalSdk,
  PumpAmmSdk,
  canonicalPumpPoolPda,
  getPumpAmmProgram,
  getSignature,
  globalConfigPda,
  lpMintAta,
  lpMintPda,
  poolPda,
  pumpAmmEventAuthorityPda,
  pumpAmmJson,
  pumpPoolAuthorityPda,
  sendAndConfirmTransaction,
  transactionFromInstructions
});
