"use strict;"
let context;

/**
 * A Rendering context.
 *
 * @class Render
 */
let Render = function () {
    let _ = Object.create (null);

    /**
     * The initializer for a rendering context.
     *
     * @method construct
     * @param {string} canvasId the id of the canvas element to use for the rendering context
     * @return {Render}
     */
    _.construct = function (canvasId) {
        let canvas = this.canvas = document.getElementById (canvasId);
        let context = this.context = canvas.getContext ("webgl", { preserveDrawingBuffer: true });
        context.viewportWidth = canvas.width;
        context.viewportHeight = canvas.height;
        context.viewport (0, 0, context.viewportWidth, context.viewportHeight);
        return this;
    };

    /**
     * Set the global rendering context.
     *
     * @method use
     */
    _.use = function () {
        context = this.context;
    };

    /**
     * Static method to create and construct a new rendering context.
     *
     * @method new
     * @static
     * @param {string} canvasId the id of the canvas element to use for the rendering context.
     * @return {Render}
     */
    _.new = function (canvasId) {
        return (render = Object.create (_).construct (canvasId));
    };

    return _;
} ();
let glMatrixArrayType = ((typeof Float32Array) != "undefined") ? Float32Array : ((typeof WebGLFloatArray) != "undefined") ? WebGLFloatArray : Array;
let FloatN = function (dim) {
    let _ = Object.create (null);

    _.create = function () {
        return new glMatrixArrayType (dim);
    };

    // _.copy (from, to)
    // from: FloatN
    // to: FloatN
    // copies the values of 'from' over to 'to'
    // if 'to' is omitted, will create a new vector
    // returns 'to'
    eval (function () {
        let str = "_.copy = function (from, to) { ";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        for (let i = 0; i < dim; ++i) {
            str += "to[" + i + "] = from[" + i + "]; ";
        }
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.point (from, to)
    // from: FloatN-1
    // to: FloatN
    // populates 'to' as a homogenous coordinate point of 'from'
    // if 'to' is omitted, will create a new vector
    // returns 'to'
    eval (function () {
        let str = "_.point = function (from, to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        let end = dim - 1;
        for (let i = 0; i < end; ++i) {
            str += "to[" + i + "] = from[" + i + "]; ";
        }
        str += "to[" + end + "] = 1; ";
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.vector (from, to)
    // from: FloatN-1
    // to: FloatN
    // populates 'to' as a homogenous coordinate point of 'from'
    // if 'to' is omitted, will create a new vector
    // returns 'to'
    eval (function () {
        let str = "_.vector = function (from, to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        let end = dim - 1;
        for (let i = 0; i < end; ++i) {
            str += "to[" + i + "] = from[" + i + "]; ";
        }
        str += "to[" + end + "] = 0; ";
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.dot (left, right)
    // left: FloatN
    // right: FloatN
    // computes the dot produce of 'left' and 'right'
    // returns the Float result
    eval (function () {
        let str = "_.dot = function (left, right) {";
        str += "return (left[0] * right[0])";
        for (let i = 1; i < dim; ++i) {
            str += " + (left[" + i + "] * right[" + i + "])";
        }
        str += "; ";
        str += "}; ";
        return str;
    } ());

    // _.normSq (from)
    // from: FloatN
    // computes the squared length of the input vector
    // returns the Float result
    _.normSq = function (from) {
        return _.dot (from, from);
    };

    // _.norm (from)
    // from: FloatN
    // computes the length of the input vector
    // returns the Float result
    _.norm = function (from) {
        return Math.sqrt (_.normSq (from));
    };

    // _.add (left, right, to)
    // left: FloatN
    // right: FloatN
    // to: FloatN
    // sets the values of 'to' to the sum of 'left' and 'right'
    // if 'to' is omitted, will create a new vector
    // returns 'to'
    eval (function () {
        let str = "_.add = function (left, right, to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        for (let i = 0; i < dim; ++i) {
            str += "to[" + i + "] = left[" + i + "] + right[" + i + "]; ";
        }
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.subtract (left, right, to)
    // left: FloatN
    // right: FloatN
    // to: FloatN
    // sets the values of 'to' to the difference of 'left' and 'right'
    // if 'to' is omitted, will create a new vector
    // returns 'to'
    eval (function () {
        let str = "_.subtract = function (left, right, to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        for (let i = 0; i < dim; ++i) {
            str += "to[" + i + "] = left[" + i + "] - right[" + i + "]; ";
        }
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.scale (from, scale, to)
    // from: FloatN
    // scale: Float
    // to: FloatN
    // sets the values of 'to' to a scaled version of 'from'
    // if 'to' is omitted, will create a new vector
    // returns 'to'
    eval (function () {
        let str = "_.scale = function (from, scale, to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        for (let i = 0; i < dim; ++i) {
            str += "to[" + i + "] = from[" + i + "] * scale; ";
        }
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.fixNum (from, precision, to)
    // from: FloatN
    // precision: int
    // to: FloatN
    // sets the values of 'to' to a fixed precision version of 'from'
    // if 'to' is omitted, will create a new vector
    // returns 'to'
    eval (function () {
        let str = "_.fixNum = function (from, precision, to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        for (let i = 0; i < dim; ++i) {
            str += "to[" + i + "] = Utility.fixNum (from[" + i + "], precision); ";
        }
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    _.normalize = function (from, to) {
        return _.scale (from, 1 / _.norm (from), to);
    };

    // _.str (from)
    // from: FloatN
    // returns the string representation of the from (to 7 significant digits), about 10 miles at
    // 1/16" resolution
    eval (function () {
        let str = "_.str = function (from) {";
        str += "return '(' + from[0]";
        for (let i = 1; i < dim; ++i) {
            str += " + ', ' +  + from[" + i + "].toFixed (7)";
        }
        str += " + ')'; ";
        str += "}; ";
        return str;
    } ());

    return _;
};

let Float2 = function () {
    let _ = FloatN (2);
    return _;
} ();

let Float3 = function () {
    let _ = FloatN (3);

    _.cross = function (left, right, to) {
        to = (typeof to !== 'undefined') ? to : _.create ();
        to[0] = (left[1] * right[2]) - (left[2] * right[1]);
        to[1] = (left[2] * right[0]) - (left[0] * right[2]);
        to[2] = (left[0] * right[1]) - (left[1] * right[0]);
        return to;
    };

    return _;
} ();

let Float4 = function () {
    let _ = FloatN (4);
    return _;
} ();
let FloatNxN = function (dim) {
    let _ = Object.create (null);
    let _FloatN = FloatN (dim);
    let size = dim * dim;

    let index = function (row, column) {
        return (row * dim) + column;
    };

    _.create = function () {
        return new glMatrixArrayType (size);
    };

    // _.copy (from, to)
    // from: FloatNxN
    // to: FloatNxN
    // copies the values of 'from' over to 'to'
    // if 'to' is omitted, will create a new matrix
    // returns 'to'
    eval (function () {
        let str = "_.copy = function (from, to) { ";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        for (let i = 0; i < size; ++i) {
            str += "to[" + i + "] = from[" + i + "]; ";
        }
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.identity (to)
    // to: FloatNxN
    // sets the values of 'to' to an identity matrix
    // if 'to' is omitted, will create a new matrix
    // returns 'to'
    eval (function () {
        let str = "_.identity = function (to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        for (let row = 0; row < dim; ++row) {
            for (let column = 0; column < dim; ++column) {
                str += "to[" + index (row, column) + "] = " + ((row == column) ? 1 : 0) + "; ";
            }
        }
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.transpose (from, to)
    // from: FloatNxN
    // to: FloatNxN
    // transposes the values of 'from' over to 'to'
    // if 'to' is omitted, will create a new matrix
    // returns 'to'
    eval (function () {
        let str = "_.transpose = function (from, to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        for (let row = 0; row < dim; ++row) {
            for (let column = 0; column < dim; ++column) {
                str += "to[" + index (row, column) + "] = from[" + index (column, row) + "]; ";
            }
        }
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.multiply (left, right, to)
    // left: FloatNxN
    // right: FloatNxN
    // to: FloatNxN
    // populates 'to' with the result of matrix multiplication of 'left' and 'right'
    // if 'to' is omitted, will create a new matrix
    // returns 'to'
    eval (function () {
        let rc = function (r, c) {
            let str = "(left[" + index (r, 0) + "] * right[" + index (0, c) + "])";
            for (let i = 1; i < dim; ++i) {
                str += " + (left[" + index (r, i) + "] * right[" + index (i, c) + "])";
            }
            str += "; ";
            return str;
        };

        let str = "_.multiply = function (left, right, to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        for (let row = 0; row < dim; ++row) {
            for (let column = 0; column < dim; ++column) {
                str += "to[" + index (row, column) + "] = " + rc (row, column);
            }
        }
        str += "return to; ";
        str += "}; ";
        return str;
    } ());

    // _.scale (scale, to)
    // scale: Float or FloatN
    // to: FloatNxN
    // sets the values of 'to' to a scale matrix
    // if 'to' is omitted, will create a new matrix
    // returns 'to'
    eval(function () {
        let end = dim - 1;
        let str = "_.scale = function (scale, to) {";
        str += "scale = Array.isArray(scale) ? scale : Array(" + end + ").fill(scale); ";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        str += "_.identity (to); ";
        for (let i = 0; i < end; ++i) {
            str += "to[" + index(i, i) + "] = scale[" + i + "]; ";
        }
        str += "return to; ";
        str += "}; ";
        return str;
    }());

    // _.translate (translate, to)
    // translate: FloatN
    // to: FloatNxN
    // sets the values of 'to' to a translation matrix
    // if 'to' is omitted, will create a new matrix
    // returns 'to'
    eval(function () {
        let end = dim - 1;
        let str = "_.translate = function (translate, to) {";
        str += "to = (typeof to !== 'undefined') ? to : _.create (); ";
        str += "_.identity (to); ";
        for (let i = 0; i < end; ++i) {
            str += "to[" + index(end, i) + "] = translate[" + i + "]; ";
        }
        str += "return to; ";
        str += "}; ";
        return str;
    }());

    // _.str (from)
    // from: FloatNxN
    // returns the string representation of the matrix
    eval (function () {
        let strRow = function (row) {
            let str = "'(' + from[" + index (row, 0) + "]";
            for (let column = 1; column < dim; ++column) {
                str += " + ', ' + from[" + index (row, column) + "]";
            }
            str += " + ')'";
            return str;
        };

        let str = "_.str = function (from) {";
        str += "return ";
        str += strRow (0);
        for (let row = 1; row < dim; ++row) {
            str += " + ', ' + " + strRow (row);
        }
        str += "; ";
        str += "}; ";
        return str;
    } ());

    return _;
};

let Float4x4 = function () {
    let _ = FloatNxN (4);

    _.inverse = function (from, to) {
        // adapted from a bit of obfuscated, unwound, code
        to = (typeof to !== "undefined") ? to : this.create ();
        let A = from[0] * from[5] - from[1] * from[4], B = from[0] * from[6] - from[2] * from[4],
            C = from[9] * from[14] - from[10] * from[13], D = from[9] * from[15] - from[11] * from[13],
            E = from[10] * from[15] - from[11] * from[14], F = from[0] * from[7] - from[3] * from[4],
            G = from[1] * from[6] - from[2] * from[5], H = from[1] * from[7] - from[3] * from[5],
            K = from[2] * from[7] - from[3] * from[6], L = from[8] * from[13] - from[9] * from[12],
            M = from[8] * from[14] - from[10] * from[12], N = from[8] * from[15] - from[11] * from[12],
            Q = 1 / (A * E - B * D + F * C + G * N - H * M + K * L);
        to[0] = (from[5] * E - from[6] * D + from[7] * C) * Q;
        to[1] = (-from[1] * E + from[2] * D - from[3] * C) * Q;
        to[2] = (from[13] * K - from[14] * H + from[15] * G) * Q;
        to[3] = (-from[9] * K + from[10] * H - from[11] * G) * Q;
        to[4] = (-from[4] * E + from[6] * N - from[7] * M) * Q;
        to[5] = (from[0] * E - from[2] * N + from[3] * M) * Q;
        to[6] = (-from[12] * K + from[14] * F - from[15] * B) * Q;
        to[7] = (from[8] * K - from[10] * F + from[11] * B) * Q;
        to[8] = (from[4] * D - from[5] * N + from[7] * L) * Q;
        to[9] = (-from[0] * D + from[1] * N - from[3] * L) * Q;
        to[10] = (from[12] * H - from[13] * F + from[15] * A) * Q;
        to[11] = (-from[8] * H + from[9] * F - from[11] * A) * Q;
        to[12] = (-from[4] * C + from[5] * M - from[6] * L) * Q;
        to[13] = (from[0] * C - from[1] * M + from[2] * L) * Q;
        to[14] = (-from[12] * G + from[13] * B - from[14] * A) * Q;
        to[15] = (from[8] * G - from[9] * B + from[10] * A) * Q;
        return to;
    };


    _.toRotationMat = function (a, b) {
        b || (b = _.create ());
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        b[4] = a[4];
        b[5] = a[5];
        b[6] = a[6];
        b[7] = a[7];
        b[8] = a[8];
        b[9] = a[9];
        b[10] = a[10];
        b[11] = a[11];
        b[12] = 0;
        b[13] = 0;
        b[14] = 0;
        b[15] = 1;
        return b;
    };

    _.toMat3 = function (a, b) {
        b || (b = mat3.create ());
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[4];
        b[4] = a[5];
        b[5] = a[6];
        b[6] = a[8];
        b[7] = a[9];
        b[8] = a[10];
        return b;
    };

    _.toInverseMat3 = function (a, b) {
        let c = a[0], d = a[1], e = a[2], g = a[4], f = a[5], h = a[6], i = a[8], j = a[9], k = a[10], l = k * f - h * j, o = -k * g + h * i, m = j * g - f * i, n = c * l + d * o + e * m;
        if (!n)return null;
        n = 1 / n;
        b || (b = mat3.create ());
        b[0] = l * n;
        b[1] = (-k * d + e * j) * n;
        b[2] = (h * d - e * f) * n;
        b[3] = o * n;
        b[4] = (k * c - e * i) * n;
        b[5] = (-h * c + e * g) * n;
        b[6] = m * n;
        b[7] = (-j * c + d * i) * n;
        b[8] = (f * c - d * g) * n;
        return b;
    };

    _.multiplyVec3 = function (a, b, c) {
        c || (c = b);
        let d = b[0], e = b[1];
        b = b[2];
        c[0] = a[0] * d + a[4] * e + a[8] * b + a[12];
        c[1] = a[1] * d + a[5] * e + a[9] * b + a[13];
        c[2] = a[2] * d + a[6] * e + a[10] * b + a[14];
        return c;
    };

    _.multiplyVec4 = function (a, b, c) {
        c || (c = b);
        let d = b[0], e = b[1], g = b[2];
        b = b[3];
        c[0] = a[0] * d + a[4] * e + a[8] * g + a[12] * b;
        c[1] = a[1] * d + a[5] * e + a[9] * g + a[13] * b;
        c[2] = a[2] * d + a[6] * e + a[10] * g + a[14] * b;
        c[3] = a[3] * d + a[7] * e + a[11] * g + a[15] * b;
        return c;
    };

    _.rotate = function (a, b, c, d) {
        let e = c[0], g = c[1];
        c = c[2];
        let f = Math.sqrt (e * e + g * g + c * c);
        if (!f)return null;
        if (f != 1) {
            f = 1 / f;
            e *= f;
            g *= f;
            c *= f
        }
        let h = Math.sin (b), i = Math.cos (b), j = 1 - i;
        b = a[0];
        f = a[1];
        let k = a[2], l = a[3], o = a[4], m = a[5], n = a[6], p = a[7], r = a[8], s = a[9], A = a[10], B = a[11], t = e * e * j + i, u = g * e * j + c * h, v = c * e * j - g * h, w = e * g * j - c * h, x = g * g * j + i, y = c * g * j + e * h, z = e * c * j + g * h;
        e = g * c * j - e * h;
        g = c * c * j + i;
        if (d) {
            if (a != d) {
                d[12] = a[12];
                d[13] = a[13];
                d[14] = a[14];
                d[15] = a[15]
            }
        } else d = a;
        d[0] = b * t + o * u + r * v;
        d[1] = f * t + m * u + s * v;
        d[2] = k * t + n * u + A * v;
        d[3] = l * t + p * u + B *
            v;
        d[4] = b * w + o * x + r * y;
        d[5] = f * w + m * x + s * y;
        d[6] = k * w + n * x + A * y;
        d[7] = l * w + p * x + B * y;
        d[8] = b * z + o * e + r * g;
        d[9] = f * z + m * e + s * g;
        d[10] = k * z + n * e + A * g;
        d[11] = l * z + p * e + B * g;
        return d;
    };

    _.rotateX = function (a, b, c) {
        let d = Math.sin (b);
        b = Math.cos (b);
        let e = a[4], g = a[5], f = a[6], h = a[7], i = a[8], j = a[9], k = a[10], l = a[11];
        if (c) {
            if (a != c) {
                c[0] = a[0];
                c[1] = a[1];
                c[2] = a[2];
                c[3] = a[3];
                c[12] = a[12];
                c[13] = a[13];
                c[14] = a[14];
                c[15] = a[15]
            }
        } else c = a;
        c[4] = e * b + i * d;
        c[5] = g * b + j * d;
        c[6] = f * b + k * d;
        c[7] = h * b + l * d;
        c[8] = e * -d + i * b;
        c[9] = g * -d + j * b;
        c[10] = f * -d + k * b;
        c[11] = h * -d + l * b;
        return c;
    };

    _.rotateY = function (a, b, c) {
        let d = Math.sin (b);
        b = Math.cos (b);
        let e = a[0], g = a[1], f = a[2], h = a[3], i = a[8], j = a[9], k = a[10], l = a[11];
        if (c) {
            if (a != c) {
                c[4] = a[4];
                c[5] = a[5];
                c[6] = a[6];
                c[7] = a[7];
                c[12] = a[12];
                c[13] = a[13];
                c[14] = a[14];
                c[15] = a[15]
            }
        } else c = a;
        c[0] = e * b + i * -d;
        c[1] = g * b + j * -d;
        c[2] = f * b + k * -d;
        c[3] = h * b + l * -d;
        c[8] = e * d + i * b;
        c[9] = g * d + j * b;
        c[10] = f * d + k * b;
        c[11] = h * d + l * b;
        return c;
    };

    _.rotateZ = function (a, b, c) {
        let d = Math.sin (b);
        b = Math.cos (b);
        let e = a[0], g = a[1], f = a[2], h = a[3], i = a[4], j = a[5], k = a[6], l = a[7];
        if (c) {
            if (a != c) {
                c[8] = a[8];
                c[9] = a[9];
                c[10] = a[10];
                c[11] = a[11];
                c[12] = a[12];
                c[13] = a[13];
                c[14] = a[14];
                c[15] = a[15]
            }
        } else c = a;
        c[0] = e * b + i * d;
        c[1] = g * b + j * d;
        c[2] = f * b + k * d;
        c[3] = h * b + l * d;
        c[4] = e * -d + i * b;
        c[5] = g * -d + j * b;
        c[6] = f * -d + k * b;
        c[7] = h * -d + l * b;
        return c;
    };

    _.frustum = function (a, b, c, d, e, g, f) {
        f || (f = _.create ());
        let h = b - a, i = d - c, j = g - e;
        f[0] = e * 2 / h;
        f[1] = 0;
        f[2] = 0;
        f[3] = 0;
        f[4] = 0;
        f[5] = e * 2 / i;
        f[6] = 0;
        f[7] = 0;
        f[8] = (b + a) / h;
        f[9] = (d + c) / i;
        f[10] = -(g + e) / j;
        f[11] = -1;
        f[12] = 0;
        f[13] = 0;
        f[14] = -(g * e * 2) / j;
        f[15] = 0;
        return f;
    };

    _.perspective = function (a, b, c, d, e) {
        a = c * Math.tan (a * Math.PI / 360);
        b = a * b;
        return _.frustum (-b, b, -a, a, c, d, e);
    };

    _.ortho = function (a, b, c, d, e, g, f) {
        f || (f = _.create ());
        let h = b - a, i = d - c, j = g - e;
        f[0] = 2 / h;
        f[1] = 0;
        f[2] = 0;
        f[3] = 0;
        f[4] = 0;
        f[5] = 2 / i;
        f[6] = 0;
        f[7] = 0;
        f[8] = 0;
        f[9] = 0;
        f[10] = -2 / j;
        f[11] = 0;
        f[12] = -(a + b) / h;
        f[13] = -(d + c) / i;
        f[14] = -(g + e) / j;
        f[15] = 1;
        return f;
    };

    _.lookAt = function (a, b, c, d) {
        d || (d = _.create ());
        let e = a[0], g = a[1];
        a = a[2];
        let f = c[0], h = c[1], i = c[2];
        c = b[1];
        let j = b[2];
        if (e == b[0] && g == c && a == j)return _.identity (d);
        let k, l, o, m;
        c = e - b[0];
        j = g - b[1];
        b = a - b[2];
        m = 1 / Math.sqrt (c * c + j * j + b * b);
        c *= m;
        j *= m;
        b *= m;
        k = h * b - i * j;
        i = i * c - f * b;
        f = f * j - h * c;
        if (m = Math.sqrt (k * k + i * i + f * f)) {
            m = 1 / m;
            k *= m;
            i *= m;
            f *= m
        } else f = i = k = 0;
        h = j * f - b * i;
        l = b * k - c * f;
        o = c * i - j * k;
        if (m = Math.sqrt (h * h + l * l + o * o)) {
            m = 1 / m;
            h *= m;
            l *= m;
            o *= m
        } else o = l = h = 0;
        d[0] = k;
        d[1] = h;
        d[2] = c;
        d[3] = 0;
        d[4] = i;
        d[5] = l;
        d[6] = j;
        d[7] = 0;
        d[8] = f;
        d[9] =
            o;
        d[10] = b;
        d[11] = 0;
        d[12] = -(k * e + i * g + f * a);
        d[13] = -(h * e + l * g + o * a);
        d[14] = -(c * e + j * g + b * a);
        d[15] = 1;
        return d;
    };

    return _;
} ();
/**
 * A Vertex and Fragment "shader" pairing, and utilities for setting attributes and parameters.
 *
 * @class Shader
 */
let Shader = function () {
    let _ = Object.create (null);

    /**
     * The name for the standard POSITION buffer attribute in a shader
     * @element POSITION_ATTRIBUTE
     * @type {string}
     * @final
     */
    _.POSITION_ATTRIBUTE = "POSITION_ATTRIBUTE";

    /**
     * The name for the standard NORMAL buffer attribute in a shader
     * @element NORMAL_ATTRIBUTE
     * @type {string}
     * @final
     */
    _.NORMAL_ATTRIBUTE = "NORMAL_ATTRIBUTE";

    /**
     * The name for the standard TEXTURE buffer attribute in a shader
     * @element TEXTURE_ATTRIBUTE
     * @type {string}
     * @final
     */
    _.TEXTURE_ATTRIBUTE = "TEXTURE_ATTRIBUTE";

    let shaders = Object.create (null);
    let currentShader;

    /**
     * The initializer for a shader.
     *
     * @method new
     * @param {string} name name to retrieve this shader
     * @param {string} vertexShaderUrl url to the vertex shader GLSL file
     * @param {string} fragmentShaderUrl url to the fragment shader GLSL file
     * @param {Object} attributeMapping maps POSITION, NORMAL, and TEXTURE attributes to the
     * attribute names in the shader
     * @return {Shader}
     */
    _.construct = function (name, vertexShaderUrl, fragmentShaderUrl, attributeMapping) {
        this.name = name;

        // internal function to fetch and compile a shader function
        let fetchAndCompileShader = function (url, type) {
            let compiledShader = null;
            let request = new XMLHttpRequest ();
            request.open ("GET", url, false);
            request.send (null);
            if (request.status === 200){
                // type is one of (context.VERTEX_SHADER, context.FRAGMENT_SHADER)
                let tmpShader = context.createShader (type);
                context.shaderSource (tmpShader, request.responseText);
                context.compileShader (tmpShader);
                if (!context.getShaderParameter (tmpShader, context.COMPILE_STATUS)) {
                    console.log (context.getShaderInfoLog (tmpShader));
                } else {
                    compiledShader = tmpShader;
                }
            }
            return compiledShader;
        };

        // fetch and compile the shader components
        let vertexShader = fetchAndCompileShader (vertexShaderUrl, context.VERTEX_SHADER);
        let fragmentShader = fetchAndCompileShader (fragmentShaderUrl, context.FRAGMENT_SHADER);

        // create the shader program and attach the components
        let program = this.program = context.createProgram ();
        context.attachShader (program, vertexShader);
        context.attachShader (program, fragmentShader);
        context.linkProgram (program);
        if (!context.getProgramParameter (program, context.LINK_STATUS)) {
            console.log ("Could not initialise shaders");
            // XXX do we need to delete it?
        }

        // have to do this before collecting parameters, or else...
        context.useProgram (program);

        // add shader parameters
        for (let i = 0, end = context.getProgramParameter (program, context.ACTIVE_UNIFORMS); i < end; i++) {
            let shaderParameter = ShaderParameter.new (program, i);
            this["set" + Utility.uppercase (shaderParameter.name)] = function (value) {
                shaderParameter.set (value);
                return this;
            }
        }

        // to add shader attributes, we start by reversing the mapping
        let reverseAttributeMapping = Object.create (null);
        reverseAttributeMapping[attributeMapping.POSITION_ATTRIBUTE] = _.POSITION_ATTRIBUTE;
        reverseAttributeMapping[attributeMapping.NORMAL_ATTRIBUTE] = _.NORMAL_ATTRIBUTE;
        reverseAttributeMapping[attributeMapping.TEXTURE_ATTRIBUTE] = _.TEXTURE_ATTRIBUTE;

        // then we loop over the found active attributes, and map the ones we know about
        let attributes = this.attributes = Object.create (null);
        for (let i = 0, end = context.getProgramParameter (program, context.ACTIVE_ATTRIBUTES); i < end; i++) {
            let activeAttribute = context.getActiveAttrib (program, i);
            let name = activeAttribute.name;
            if (name in reverseAttributeMapping) {
                attributes[reverseAttributeMapping[name]] = ShaderAttribute.new (program, activeAttribute);
            }
        }

        return this;
    };

    let bindAttribute = function (which, buffer) {
        // not every shader uses every attribute, so don't bother to set them unless they will be used
        if (which in currentShader.attributes) {
            //LOG ("Bind " + which);
            context.bindBuffer (context.ARRAY_BUFFER, buffer);
            currentShader.attributes[which].bind ();
        }
        return Shader;
    };

    /**
     * Bind the POSITION attribute to the given buffer.
     *
     * @method bindPositionAttribute
     * @static
     * @param {Object} buffer WebGL buffer to bind
     * @return {Shader}
     */
    _.bindPositionAttribute = function (buffer) {
        return bindAttribute(_.POSITION_ATTRIBUTE, buffer);
    };

    /**
     * Bind the NORMAL attribute to the given buffer.
     *
     * @method bindNormalAttribute
     * @static
     * @param {Object} buffer WebGL buffer to bind
     * @return {Shader}
     */
    _.bindNormalAttribute = function (buffer) {
        return bindAttribute(_.NORMAL_ATTRIBUTE, buffer);
    };

    /**
     * Bind the TEXTURE attribute to the given buffer.
     *
     * @method bindTextureAttribute
     * @static
     * @param {Object} buffer WebGL buffer to bind
     * @return {Shader}
     */
    _.bindTextureAttribute = function (buffer) {
        return bindAttribute(_.TEXTURE_ATTRIBUTE, buffer);
    };

    /**
     * Fetch the shader currently in use.
     *
     * @method getCurrentShader
     * @static
     * @return {Shader}
     */
    _.getCurrentShader = function () {
        return currentShader;
    };

    /**
     * Set this as the current shader in the rendering context.
     *
     * @method use
     * @chainable
     */
    _.use = function () {
        if (currentShader !== this) {
            currentShader = this;
            context.useProgram (this.program);
        }
        return this;
    };

    /**
     * Get the name of this shader
     *
     * @method getName
     * @return {string} the name of this shader.
     */
    _.getName = function () {
        return this.name;
    };

    /**
     * Static method to create and construct a new Shader.
     *
     * @method new
     * @static
     * @param {string} name name to retrieve this shader
     * @param {string} vertexShaderUrl url to the vertex shader GLSL file
     * @param {string} fragmentShaderUrl url to the fragment shader GLSL file
     * @param {Object} attributeMapping maps POSITION, NORMAL, and TEXTURE attributes to the
     * attribute names in the shader. Defaults to:
     * * POSITION_ATTRIBUTE: "inputPosition"
     * * NORMAL_ATTRIBUTE: "inputNormal"
     * * TEXTURE_ATTRIBUTE: "inputTexture"
     * @return {Shader}
     */
    _.new = function (name, vertexShaderUrl, fragmentShaderUrl, attributeMapping) {
        attributeMapping = (typeof attributeMapping !== "undefined") ? attributeMapping : {
            POSITION_ATTRIBUTE: "inputPosition",
            NORMAL_ATTRIBUTE: "inputNormal",
            TEXTURE_ATTRIBUTE: "inputTexture"
        };
        return (shaders[name] = Object.create (_).construct (name, vertexShaderUrl, fragmentShaderUrl, attributeMapping));
    };

    /**
     * Fetch a shader by name.
     *
     * @method get
     * @static
     * @return {Shader}
     */
    _.get = function (name) {
        return shaders[name];
    };

    return _;
} ();
let ShaderParameter = function () {
    let _ = Object.create (null);

    _.construct = function (program, i) {
        let activeUniform = context.getActiveUniform (program, i);
        this.name = activeUniform.name;
        this.type = activeUniform.type;
        this.location = context.getUniformLocation (program, activeUniform.name);
        return this;
    };

    _.set = function (value) {
        // see https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.1 (5.14) for explanation
        switch (this.type) {
            case 0x1404:
                context.uniform1i (this.location, value);
                break;
            case 0x8B53:
                context.uniform2iv (this.location, value);
                break;
            case 0x8B54:
                context.uniform3iv (this.location, value);
                break;
            case 0x8B55:
                context.uniform4iv (this.location, value);
                break;

            case 0x1406:
                context.uniform1f (this.location, value);
                break;
            case 0x8B50:
                context.uniform2fv (this.location, value);
                break;
            case 0x8B51:
                context.uniform3fv (this.location, value);
                break;
            case 0x8B52:
                context.uniform4fv (this.location, value);
                break;

            case 0x8B5A:
                context.uniformMatrix2fv (this.location, false, value);
                break;
            case 0x8B5B:
                context.uniformMatrix3fv (this.location, false, value);
                break;
            case 0x8B5C:
                context.uniformMatrix4fv (this.location, false, value);
                break;
        }
    };

    _.new = function (program, i) {
        return Object.create (_).construct (program, i);
    };

    return _;
} ();
let ShaderAttribute = function () {
    let _ = Object.create (null);

    _.construct = function (program, activeAttribute) {
        this.name = activeAttribute.name;
        this.type = activeAttribute.type;
        this.location = context.getAttribLocation (program, this.name);
        context.enableVertexAttribArray (this.location);

        // set the bind function
        switch (this.type) {
            case 0x1404:
                this.bind = function () { context.vertexAttribPointer (this.location, 1, context.INT, false, 0, 0) };
                break;
            case 0x8B53:
                this.bind = function () { context.vertexAttribPointer (this.location, 2, context.INT, false, 0, 0) };
                break;
            case 0x8B54:
                this.bind = function () { context.vertexAttribPointer (this.location, 3, context.INT, false, 0, 0) };
                break;
            case 0x8B55:
                this.bind = function () { context.vertexAttribPointer (this.location, 4, context.INT, false, 0, 0) };
                break;
            case 0x1406:
                this.bind = function () { context.vertexAttribPointer (this.location, 1, context.FLOAT, false, 0, 0) };
                break;
            case 0x8B50:
                this.bind = function () { context.vertexAttribPointer (this.location, 2, context.FLOAT, false, 0, 0) };
                break;
            case 0x8B51:
                this.bind = function () { context.vertexAttribPointer (this.location, 3, context.FLOAT, false, 0, 0) };
                break;
            case 0x8B52:
                this.bind = function () { context.vertexAttribPointer (this.location, 4, context.FLOAT, false, 0, 0) };
                break;
        }
        return this;
    };

    _.new = function (program, activeAttribute) {
        return Object.create (_).construct (program, activeAttribute);
    };

    return _;
} ();
/**
 * A node in a scene graph.
 *
 * @class Node
 */
let Node = function () {
    let _ = Object.create (null);

    let nodes = Object.create (null);

    /**
     * The initializer for a scene graph node.
     *
     * @method construct
     * @param {Object} parameters an object with optional information to include in the node. The
     * possibilities are:
     * * name {string}: nodes can be named if they need to be retrieved later.
     * * transform {Float4x4}: a transformation matrix to apply before drawing or traversing children.
     * * state {function}: a parameter-less function to call before drawing or traversing children.
     * this function may set any render state needed.
     * * shape {string}: the name of a shape to draw.
     * * children: the node will have an array of children by default, but if the node is intended
     * to be a leaf, you can save the space and time associated with an empty list by setting this
     * value to "false".
     * @return {Node}
     */
    _.construct = function (parameters) {
        // we select the traverse function based on the feature requested for the node. these are
        // the bit flags to indicate the features and the value we accumulate them into. note that
        // some combinations are invalid
        let HAS_TRANSFORM = 1;
        let HAS_STATE = 2;
        let HAS_SHAPE = 4;
        let HAS_CHILDREN = 8;
        let traverseFunctionIndex = 0;

        // collect the parameters, and accumulate the flags for the features
        if (typeof parameters !== "undefined") {
            if ("name" in parameters) {
                this.name = parameters.name;
                nodes[this.name] = this;
            }

             if ("transform" in parameters) {
                 this.transform = parameters.transform;
                 traverseFunctionIndex += HAS_TRANSFORM;
             }

            if ("state" in parameters) {
                this.state = parameters.state;
                traverseFunctionIndex += HAS_STATE;
            }

            if ("shape" in parameters) {
                this.shape = Shape.get (parameters.shape);
                traverseFunctionIndex += HAS_SHAPE;
            }

            // children are special, the default is to include children, but we want a way to say
            // the current node is a leaf node, so { children: false } is the way to do that
            if ((!("children" in parameters)) || (parameters.children != false)) {
                this.children = [];
                traverseFunctionIndex += HAS_CHILDREN;
            }
        } else {
            // default is just a parent node
            this.children = [];
            traverseFunctionIndex += HAS_CHILDREN;
        }

        // now make a traverse function depending on the included features
        let INVALID_TRAVERSE = function (transform) { console.log ("WARNING: INVALID TRAVERSE"); };
        console.log ("Node (" + this.getName () + "): traverse (" + traverseFunctionIndex + ")");
        this.traverse = [
            // 0 nothing
            INVALID_TRAVERSE,
            // 1 transform only
            INVALID_TRAVERSE,
            // 2 state only
            INVALID_TRAVERSE,
            // 3 transform, state
            INVALID_TRAVERSE,
            // 4 shape only
            function (transform) {
                Shader.getCurrentShader ().setModelMatrix (transform);
                this.shape.draw ();
            },
            // 5 transform, shape
            function (transform) {
                transform = Float4x4.multiply (this.transform, transform);
                Shader.getCurrentShader ()
                    .setModelMatrix (transform)
                    .setNormalMatrix (Float4x4.transpose (Float4x4.inverse (transform)));
                this.shape.draw ();
            },
            // 6 state, shape
            function (transform) {
                this.state ();
                Shader.getCurrentShader ()
                    .setModelMatrix (transform)
                    .setNormalMatrix (Float4x4.transpose (Float4x4.inverse (transform)));
                this.shape.draw ();
            },
            // 7 transform, state, shape
            function (transform) {
                this.state ();
                transform = Float4x4.multiply (transform, this.transform);
                Shader.getCurrentShader ()
                    .setModelMatrix (transform)
                    .setNormalMatrix (Float4x4.transpose (Float4x4.inverse (transform)));
                this.shape.draw ();
            },
            // 8 children only
            function (transform) {
                for (let child of this.children) {
                    child.traverse (transform);
                }
            },
            // 9 transform, children
            function (transform) {
                transform = Float4x4.multiply (transform, this.transform);
                for (let child of this.children) {
                    child.traverse (transform);
                }
            },
            // 10 state, children
            function (transform) {
                this.state ();
                for (let child of this.children) {
                    child.traverse (transform);
                }
            },
            // 11 transform, state, children
            function (transform) {
                this.state ();
                transform = Float4x4.multiply (transform, this.transform);
                for (let child of this.children) {
                    child.traverse (transform);
                }
            },
            // 12 shape, children
            function (transform) {
                Shader.getCurrentShader ()
                    .setModelMatrix (transform)
                    .setNormalMatrix (Float4x4.transpose (Float4x4.inverse (transform)));
                this.shape.draw ();
                for (let child of this.children) {
                    child.traverse (transform);
                }
            },
            // 13 transform, shape, children
            function (transform) {
                transform = Float4x4.multiply (transform, this.transform);
                Shader.getCurrentShader ()
                    .setModelMatrix (transform)
                    .setNormalMatrix (Float4x4.transpose (Float4x4.inverse (transform)));
                this.shape.draw ();
                for (let child of this.children) {
                    child.traverse (transform);
                }
            },
            // 14 state, shape, children
            function (transform) {
                this.state ();
                Shader.getCurrentShader ()
                    .setModelMatrix (transform)
                    .setNormalMatrix (Float4x4.transpose (Float4x4.inverse (transform)));
                this.shape.draw ();
                for (let child of this.children) {
                    child.traverse (transform);
                }
            },
            // 15 transform, state, shape, children
            function (transform) {
                this.state ();
                transform = Float4x4.multiply (transform, this.transform);
                Shader.getCurrentShader ()
                    .setModelMatrix (transform)
                    .setNormalMatrix (Float4x4.transpose (Float4x4.inverse (transform)));
                this.shape.draw ();
                for (let child of this.children) {
                    child.traverse (transform);
                }
            }
        ][traverseFunctionIndex];

        return this;
    };

    /**
     * Add a child node (only applies to non-leaf nodes)
     *
     * @method addChild
     * @param {Node} node the node to add as a child.
     * @chainable
     */
    _.addChild = function (node) {
        if ("children" in this) {
            this.children.push (node);
        } else {
            console.log ("ERROR: Attempting to add child (" + node.getName () + ") to node (" + this.getName () + ") that is a leaf.");
        }
        return this;
    };

    /**
     * Get the name of this node (if it has one)
     *
     * @method getName
     * @return {string} the name of this node, or just "node".
     */
    _.getName = function () {
        return ("name" in this) ? this.name : "node";
    };

    /**
     * Get a node by name
     *
     * @method get
     * @param {string} name the name of the node to retrieve.
     * @return {Node}
     */
    _.get = function (name) {
        return nodes[name];
    };

    /**
     * Static method to create and construct a new scene graph node.
     *
     * @method new
     * @static
     * @param {Object} parameters an object with optional information to include in the node (see
     * "construct" for more information)
     * @return {Node}
     */
    _.new = function (parameters) {
        return Object.create (_).construct (parameters);
    };

    return _;
} ();
/**
 * A Cloud, a scene graph node for displaying points in space.
 *
 * @class Cloud
 */
let Cloud = function () {
    let _ = Object.create (Node);

    /**
     * Add a point to the cloud
     *
     * @method addPoint
     * @param {Float3} point the location of the new point.
     * @chainable
     */
    _.addPoint = function (point) {
        let transform = Float4x4.multiply (Float4x4.scale ([0.025, 0.025, 0.025]), Float4x4.translate (point));
        this.addChild (Node.new ({
            transform: transform,
            shape: "sphere",
            children: false
        }));
        return this;
    };

    /**
     * Static method to create and construct a new cloud node.
     *
     * @method new
     * @static
     * @param {Object} parameters an object with optional information to include in the node (see
     * "Node.construct" for more information)
     * @return {Cloud}
     */
    _.new = function (parameters) {
        // ensure that we have children enabled
        parameters.children = true;
        return Object.create (_).construct (parameters);
    };

    return _;
} ();
let Shape = function () {
    let _ = Object.create (null);

    let shapes = Object.create (null);
    let currentShape;

    _.construct = function (name, buffers) {
        this.name = name;

        let makeBuffer = function (bufferType, source, itemSize) {
            let buffer = context.createBuffer ();
            context.bindBuffer (bufferType, buffer);
            context.bufferData (bufferType, source, context.STATIC_DRAW);
            buffer.itemSize = itemSize;
            buffer.numItems = source.length / itemSize;
            return buffer;
        };

        // we will use the combination of input
        // 0 vertex only
        // 1 vertex, normal
        // 2 vertex, texture
        // 3 vertex, normal, texture
        // 4 vertex, index
        // 5 vertex, normal, index
        // 6 vertex, texture, index
        // 7 vertex, normal, texture, index

        // build the buffers
        let HAS_NORMAL = 1;
        let HAS_TEXTURE = 2;
        let HAS_INDEX = 4;
        let drawFunctionIndex = 0;
        if ("position" in buffers) {
            this.positionBuffer = makeBuffer (context.ARRAY_BUFFER, new Float32Array (buffers.position), 3);
        } else {
            console.log ("What you talking about willis?");
        }

        if ("normal" in buffers) {
            this.normalBuffer = makeBuffer (context.ARRAY_BUFFER, new Float32Array (buffers.normal), 3);
            drawFunctionIndex += HAS_NORMAL;
        }

        if ("texture" in buffers) {
            this.normalBuffer = makeBuffer (context.ARRAY_BUFFER, new Float32Array (buffers.texture), 2);
            drawFunctionIndex += HAS_TEXTURE;
        }

        if ("index" in buffers) {
            this.indexBuffer = makeBuffer (context.ELEMENT_ARRAY_BUFFER, new Uint16Array (buffers.index), 1);
            drawFunctionIndex += HAS_INDEX;
        }

        this.draw = [
            // 0 vertex only
            function () {
                if (this.setCurrentShape ()) {
                    Shader.bindPositionAttribute (this.positionBuffer);
                }
                context.drawArrays(context.TRIANGLES, 0, this.positionBuffer.numItems);
            },
            // 1 vertex, normal
            function () {
                if (this.setCurrentShape ()) {
                    Shader
                        .bindPositionAttribute (this.positionBuffer)
                        .bindNormalAttribute (this.normalBuffer);
                }
                context.drawArrays(context.TRIANGLES, 0, this.positionBuffer.numItems);
            },
            // 2 vertex, texture
            function () {
                if (this.setCurrentShape ()) {
                    Shader
                        .bindPositionAttribute (this.positionBuffer)
                        .bindTextureAttribute (this.textureBuffer);
                }
                context.drawArrays(context.TRIANGLES, 0, this.positionBuffer.numItems);
            },
            // 3 vertex, normal, texture
            function () {
                if (this.setCurrentShape ()) {
                    Shader
                        .bindPositionAttribute (this.positionBuffer)
                        .bindNormalAttribute (this.normalBuffer)
                        .bindTextureAttribute (this.textureBuffer);
                }
                context.drawArrays(context.TRIANGLES, 0, this.positionBuffer.numItems);
            },
            // 4 vertex, index
            function () {
                if (this.setCurrentShape ()) {
                    Shader.bindPositionAttribute (this.positionBuffer);
                    context.bindBuffer (context.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                }
                context.drawElements (context.TRIANGLES, this.indexBuffer.numItems, context.UNSIGNED_SHORT, 0);
            },
            // 5 vertex, normal, index
            function () {
                if (this.setCurrentShape ()) {
                    Shader
                        .bindPositionAttribute (this.positionBuffer)
                        .bindNormalAttribute (this.normalBuffer);
                    context.bindBuffer (context.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                }
                context.drawElements (context.TRIANGLES, this.indexBuffer.numItems, context.UNSIGNED_SHORT, 0);
            },
            // 6 vertex, texture, index
            function () {
                if (this.setCurrentShape ()) {
                    Shader
                        .bindPositionAttribute (this.positionBuffer)
                        .bindTextureAttribute (this.textureBuffer);
                    context.bindBuffer (context.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                }
                context.drawElements (context.TRIANGLES, this.indexBuffer.numItems, context.UNSIGNED_SHORT, 0);
            },
            // 7 vertex, normal, texture, index
            function () {
                if (this.setCurrentShape ()) {
                    Shader
                        .bindPositionAttribute (this.positionBuffer)
                        .bindNormalAttribute (this.normalBuffer)
                        .bindTextureAttribute (this.textureBuffer);
                    context.bindBuffer (context.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                }
                context.drawElements (context.TRIANGLES, this.indexBuffer.numItems, context.UNSIGNED_SHORT, 0);
            },
        ][drawFunctionIndex];

        return this;
    };

    _.setCurrentShape = function () {
        if (currentShape !== this) {
            currentShape = this;
            return true;
        }
        return false;
    };

    _.new = function (name, buffers) {
        return (shapes[name] = Object.create (_).construct (name, buffers ()));
    };

    _.get = function (name) {
        return shapes[name];
    };

    return _;
} ();
let ShapeBuilder = function () {
    let _ = Object.create (null);

    _.construct = function (precision) {
        this.precision = (typeof precision !== "undefined") ? precision : 7;
        this.vertexIndex = Object.create (null);
        this.vertices = [];
        this.faces = [];
        return this;
    };

    _.addVertex = function (vertex) {
        let str = Float3.str(vertex);
        if (str in this.vertexIndex) {
            return this.vertexIndex[str];
        } else {
            let index = this.vertices.length;
            this.vertices.push(vertex);
            this.vertexIndex[str] = index;
            return index;
        }
    };

    _.addFace = function (face) {
        this.faces.push(face);
    };

    _.makeBuffers = function () {
        return {
            position: Utility.flatten(this.vertices),
            index: Utility.flatten(this.faces)
        };
    };

    _.makeFacets = function () {
        let vertex = [];
        let normal = [];
        for (let face of this.faces) {
            // get the first three vertices of the face to compute the normal
            let a = this.vertices[face[0]];
            let b = this.vertices[face[1]];
            let c = this.vertices[face[2]];
            let ab = Float3.normalize(Float3.subtract(b, a));
            let bc = Float3.normalize(Float3.subtract(c, b));
            let n = Float3.cross(ab, bc);

            // now loop over all of the points to add them to the vertices
            for (let i = 0; i < face.length; ++i) {
                vertex.push(this.vertices[face[i]]);
                normal.push(n);
            }
        }
        return {
            position: Utility.flatten(vertex),
            normal: Utility.flatten(normal)
        };
    };

    _.new = function (precision) {
        return Object.create (ShapeBuilder).construct (precision);
    };

    return _;
} ();
let Primitive = function () {
    let _ = Object.create(null);

    _.getShapeBuilder = function () {
    };

    _.makeFromBuilder = function (name, builder) {
        name = (typeof name !== "undefined") ? name : this.name;
        return Shape.new(name, function () {
            return builder.makeFacets();
        });
    };

    _.make = function (name) {
        let builder = this.getShapeBuilder();
        return this.makeFromBuilder(name, builder);
    };

    return _;
}();
let Tetrahedron = function () {
    let _ = Object.create (Primitive);

    _.name = "tetrahedron";

    _.getShapeBuilder = function () {
        let builder = ShapeBuilder.new ();
        builder.addVertex([1, 1, 1]);
        builder.addVertex([-1, 1, -1]);
        builder.addVertex([-1, -1, 1]);
        builder.addVertex([1, -1, -1]);

        builder.addFace([0, 1, 2]);
        builder.addFace([1, 3, 2]);
        builder.addFace([2, 3, 0]);
        builder.addFace([3, 1, 0]);

        return builder;
    };

    return _;
} ();
let Hexahedron = function () {
    let _ = Object.create(Primitive);

    _.name = "cube";

    _.getShapeBuilder = function () {
        let builder = ShapeBuilder.new();

        builder.addVertex([-1, -1, -1]);
        builder.addVertex([-1, 1, -1]);
        builder.addVertex([1, 1, -1]);
        builder.addVertex([1, -1, -1]);
        builder.addVertex([-1, -1, 1]);
        builder.addVertex([-1, 1, 1]);
        builder.addVertex([1, 1, 1]);
        builder.addVertex([1, -1, 1]);

        builder.addFace([0, 1, 2, 0, 2, 3]); // Front face
        builder.addFace([7, 6, 5, 7, 5, 4]); // Back face
        builder.addFace([1, 5, 6, 1, 6, 2]); // Top face
        builder.addFace([4, 0, 3, 4, 3, 7]); // Bottom face
        builder.addFace([4, 5, 1, 4, 1, 0]); // Left face
        builder.addFace([3, 2, 6, 3, 6, 7]); // Right face

        return builder;
    };

    return _;
}();
let Octahedron = function () {
    let _ = Object.create(Primitive);

    _.name = "octahedron";

    _.getShapeBuilder = function () {
        let builder = ShapeBuilder.new();

        builder.addVertex([0, 1, 0]);
        builder.addVertex([1, 0, 0]);
        builder.addVertex([0, 0, 1]);
        builder.addVertex([-1, 0, 0]);
        builder.addVertex([0, 0, -1]);
        builder.addVertex([0, -1, 0]);

        builder.addFace([0, 2, 1]);
        builder.addFace([0, 3, 2]);
        builder.addFace([0, 4, 3]);
        builder.addFace([0, 1, 4]);


        builder.addFace([5, 1, 2]);
        builder.addFace([5, 2, 3]);
        builder.addFace([5, 3, 4]);
        builder.addFace([5, 4, 1]);

        return builder;
    };

    return _;
}();
let Icosahedron = function () {
    let _ = Object.create(Primitive);

    _.name = "icosahedron";

    _.getShapeBuilder = function () {
        let builder = ShapeBuilder.new();
        let t = (1.0 + Math.sqrt(5.0)) / 2.0;
        let s = 1 / t;
        t = 1;

        builder.addVertex([-s, t, 0]);
        builder.addVertex([s, t, 0]);
        builder.addVertex([-s, -t, 0]);
        builder.addVertex([s, -t, 0]);

        builder.addVertex([0, -s, t]);
        builder.addVertex([0, s, t]);
        builder.addVertex([0, -s, -t]);
        builder.addVertex([0, s, -t]);

        builder.addVertex([t, 0, -s]);
        builder.addVertex([t, 0, s]);
        builder.addVertex([-t, 0, -s]);
        builder.addVertex([-t, 0, s]);

        builder.addFace([0, 11, 5]);
        builder.addFace([0, 5, 1]);
        builder.addFace([0, 1, 7]);
        builder.addFace([0, 7, 10]);
        builder.addFace([0, 10, 11]);

        builder.addFace([1, 5, 9]);
        builder.addFace([5, 11, 4]);
        builder.addFace([11, 10, 2]);
        builder.addFace([10, 7, 6]);
        builder.addFace([7, 1, 8]);

        builder.addFace([3, 9, 4]);
        builder.addFace([3, 4, 2]);
        builder.addFace([3, 2, 6]);
        builder.addFace([3, 6, 8]);
        builder.addFace([3, 8, 9]);

        builder.addFace([4, 9, 5]);
        builder.addFace([2, 4, 11]);
        builder.addFace([6, 2, 10]);
        builder.addFace([8, 6, 7]);
        builder.addFace([9, 8, 1]);

        return builder;
    };

    return _;
}();
let Square = function () {
    let _ = Object.create(Primitive);

    _.name = "square";

    _.getShapeBuilder = function () {
        let builder = ShapeBuilder.new();

        builder.addVertex([-1, -1, 0]);
        builder.addVertex([-1, 1, 0]);
        builder.addVertex([1, 1, 0]);
        builder.addVertex([1, -1, 0]);

        builder.addFace([2, 1, 3, 1, 0, 3]);

        return builder;
    };

    return _;
}();
let Sphere = function () {
    let _ = Object.create (Primitive);

    _.name = "sphere";

    _.parameters = {
        baseShapeBuilderType: Icosahedron,
        subdivisions: 4
    };

    _.getShapeBuilder = function () {
        let builder = ShapeBuilder.new ();

        let addVertex = function (vertex) {
            return builder.addVertex (Float3.normalize (vertex));
        }

        let baseShapeBuilder = this.parameters.baseShapeBuilderType.getShapeBuilder ();

        // add all the vertices and faces from the baseShapeBuilder into ours...
        for (let vertex of baseShapeBuilder.vertices) {
            addVertex (vertex);
        }
        let vertices = builder.vertices;
        let faces = builder.faces = baseShapeBuilder.faces;

        // function to subdivide a face
        let subdivide = function () {
            // remove the triangle we want to subdivide, which is always the first one
            let tri = faces.splice (0, 1)[0];

            // compute three new vertices as the averages of each pair of vertices
            let v0 = addVertex (Float3.add (vertices[tri[0]], vertices[tri[1]]));
            let v1 = addVertex (Float3.add (vertices[tri[1]], vertices[tri[2]]));
            let v2 = addVertex (Float3.add (vertices[tri[2]], vertices[tri[0]]));

            // add 4 new triangles to replace the one we removed
            builder.addFace ([tri[0], v0, v2]);
            builder.addFace ([tri[1], v1, v0]);
            builder.addFace ([tri[2], v2, v1]);
            builder.addFace ([v0, v1, v2]);
        };

        // subdivide the triangles we already defined, do this the requested number of times (3
        // seems to be the minimum for a spherical appearance)
        for (let j = 0; j < this.parameters.subdivisions; ++j) {
            console.log ("Iteration " + j + " with " + vertices.length + " points in " + faces.length + " triangles");
            for (let i = 0, faceCount = faces.length; i < faceCount; ++i) {
                subdivide ();
            }
        }
        console.log ("Finished sphere with " + vertices.length + " points in " + faces.length + " triangles");
        return builder;
    };

    _.makeFromBuilder = function (name, builder) {
        name = (typeof name !== "undefined") ? name : this.name;
        return Shape.new (name, function () {
            let buffers = builder.makeBuffers ();
            buffers.normal = buffers.position;
            return buffers;
        });
    };

    return _;
} ();
let makeRevolve = function (name, outline, steps) {
    return Shape.new (name, function () {
        // outline is an array of Float2, and the axis of revolution is x = 0, we make a number of
        // wedges, from top to bottom, to complete the revolution. for each wedge, we will check to
        // see if the first and last x component is at 0, and if so we will generate a triangle
        // instead of a quad for that part of the wedge
        let vertices = [];
        let stepAngle = (2 * Math.PI) / steps;
        for (let i = 0; i < steps; ++i) {
            // this could be just i + 1, but doing the modulus might help prevent a crack
            let j = (i + 1) % steps;
            let iAngle = i * stepAngle;
            let jAngle = j * stepAngle;
            for (let m = 0, end = outline.length - 1; m < end; ++m) {
                // the line segment mn is now going to be swept over the angle range ij
                let n = m + 1;
                let vm = outline[m];
                let vn = outline[n];

                let vm0 = Float3.fixNum ([vm[0] * Math.cos (iAngle), vm[1], vm[0] * Math.sin (iAngle)]);
                let vm1 = Float3.fixNum ([vm[0] * Math.cos (jAngle), vm[1], vm[0] * Math.sin (jAngle)]);
                let vn0 = Float3.fixNum ([vn[0] * Math.cos (iAngle), vn[1], vn[0] * Math.sin (iAngle)]);
                let vn1 = Float3.fixNum ([vn[0] * Math.cos (jAngle), vn[1], vn[0] * Math.sin (jAngle)]);

                if (vm[0] == 0) {
                    // the top cap should be a triangle
                    vertices.push (vm0);
                    vertices.push (vn1);
                    vertices.push (vn0);
                } else if (vn[0] == 0) {
                    // the bottom cap should be a triangle
                    vertices.push (vn0);
                    vertices.push (vm0);
                    vertices.push (vm1);
                } else {
                    // the sweep is a quad (normal case)
                    vertices.push (vm0);
                    vertices.push (vn1);
                    vertices.push (vn0);

                    vertices.push (vn1);
                    vertices.push (vm0);
                    vertices.push (vm1);
                }
            }
        }
        console.log ("Revolved " + vertices.length + " points, for " + (vertices.length / 3) + " triangles.")

        // convert the triangle list to a point list with an index
        let pointIndex = Object.create (null);
        let points = [];
        let indices = [];
        for (let i = 0, end = vertices.length; i < end; ++i) {
            let str = Float3.str (vertices[i]);
            if (str in pointIndex) {
                indices.push(pointIndex[str]);
            } else {
                let index = points.length;
                points.push (vertices[i]);
                indices.push(index);
                pointIndex[str] = index;
            }
        }
        console.log ("Reduced to " + points.length + " points.");

        // return the flattened vertices, and indices
        return {
            position: Utility.flatten (points),
            index: indices
        };
    });
};
let makeBall = function (name, steps) {
    // generate an outline, and then revolve it
    let outline = [];
    let stepAngle = Math.PI / steps;
    for (let i = 0; i <= steps; ++i) {
        let angle = stepAngle * i;

        // using an angle setup so that 0 is (0, 1), and Pi is (0, -1) means switching (x, y) so we
        // get an outline that can be revolved around the x=0 axis
        outline.push (Float2.fixNum([Math.sin (angle), Math.cos (angle)]));
    }

    // revolve the surface, the outline is a half circle, so the revolved surface needs to be twice
    // as many steps to go all the way around
    return makeRevolve(name, outline, steps * 2);
};
/**
 * A collection of utility functions.
 *
 * @class Utility
 */
let Utility = function () {
    let _ = Object.create (null);

    /**
     * Convert an angle measured in degrees to radians.
     *
     * @method degreesToRadians
     * @param {float} degrees the degree measure to be converted
     * @return {float}
     */
    _.degreesToRadians = function (degrees) {
        return (degrees / 180) * Math.PI;
    };

    /**
     * Convert an angle measured in radians to degrees.
     *
     * @method radiansToDegrees
     * @param {float} radians the radian measure to be converted
     * @return {float}
     */
    _.radiansToDegrees = function (radians) {
        return (radians / Math.PI) * 180;
    };

    /**
     * Make the first letter of a string be upper case.
     *
     * @method uppercase
     * @param {string} string the text to convert to upper case
     * @return {string}
     */
    _.uppercase = function (string) {
        return string[0].toUpperCase () + string.slice (1);
    };

    /**
     * Make the first letter of a string be lower case.
     *
     * @method lowercase
     * @param {string} string the text to convert to lower case
     * @return {string}
     */
    _.lowercase = function (string) {
        return string[0].toLowerCase () + string.slice (1);
    };

    /**
     * Convert an array of arrays to a single array of values (in order).
     *
     * @method flatten
     * @param {Array} array the input array of arrays
     * @return {Array}
     */
    _.flatten = function (array) {
        let result = [];
        for (let element of array) {
            for (let value of element) {
                result.push (value);
            }
        }
        return result;
    };

    /**
     * truncate a number to a specific precision, equivalent to discretization
     *
     * @method fixNum
     * @param {float} number the number to discretize
     * @param {integer} precision how many decimal places to force
     * @return {number}
     */
    _.fixNum = function (number, precision) {
        let fix = (typeof precision !== "undefined") ? precision : 7;
        return Number.parseFloat (number.toFixed (fix));
    };


    return _;
} ();
var TestContainer = function () {
    var _ = Object.create (null);

    // test design philosophy is to be verbose on failure, and silent on pass
    let assertEquals = function (msg, a, b) {
        a = (!isNaN (a)) ? Utility.fixNum (a) : a;
        b = (!isNaN (b)) ? Utility.fixNum (b) : b;
        if (a != b) {
            console.log ("FAIL: " + msg + " (" + a + " == " + b + ")");
            return false;
        }
        return true;
    };

    let assertArrayEquals = function (msg, a, b) {
        if (a.length == b.length) {
            for (let i = 0; i < a.length; ++i) {
                if (!assertEquals(msg + "[" + i + "]", a[i], b[i])) {
                    return false;
                }
            }
            return true;
        } else {
            console.log (msg + " (mismatched arrays, FAIL)");
            return false;
        }
    };

    let tests = [
        function () {
            console.log ("Float4x4...");
            let viewMatrix = Float4x4.identity ();
            Float4x4.rotate (viewMatrix, Utility.degreesToRadians (27.5), [ 1, 0, 0 ]);
            viewMatrix = Float4x4.multiply (Float4x4.translate ([ 0, -1.5, -3.5 ]), viewMatrix);
            Float4x4.rotate (viewMatrix, Utility.degreesToRadians (10), [ 0, 1, 0 ]);
            viewMatrix = Float4x4.multiply (Float4x4.scale ([ 2, 2, 2 ]), viewMatrix);
            viewMatrix = Float4x4.multiply (Float4x4.translate ([ -0.5, -0.5, -0.5 ]), viewMatrix);

            let inverted = Float4x4.inverse(viewMatrix, Float4x4.create());
            let inverted2 = [
                0.49240389466285706, 1.7235358695799619e-9, 0.08682408928871155, 0,
                0.040090903639793396, 0.4435054361820221, -0.22736681997776031, 0,
                -0.07701390981674194, 0.23087431490421295, 0.4367676079273224, -0,
                0.1961156576871872, 1.25, 2.2234134674072266, 1
            ];
            assertArrayEquals("inverted == inverted2", inverted, inverted2)
        }
    ];

    _.runTests = function () {
        console.log ("Running Tests...");
        for (let test of tests) {
            console.log ("TEST");
            test ();
        }
        console.log ("Finished Running Tests.");
    };

    return _;
} ();

TestContainer.runTests();
