const crypto = require('crypto');

module.exports = {
    array_sum: array_sum,
    md5_crypto: function md5_crypto(str) {
        let md5 = crypto.createHash('md5');
        return md5.update(str).digest("hex")
    },
    obj_equals: isObjectValueEqual,
    Array_contains: inArray,
    compare: function compare(property) {
        return function (a, b) {
            if (a[property] >= b[property]) {
                return -1
            } else {
                return 1
            }
        }
    },
    sleep: function sleep(time = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    },
    isEmptyObject: function isEmptyObject(obj) {
        return !Object.keys(obj).length;
    }
};

function isObjectValueEqual(x, y) {
    if (x === y) {
        return true;
    } else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length !== Object.keys(y).length) {
            return false;
        }

        for (let prop in x) {
            if (Array.isArray(x) && Array.isArray(y)) {
                if (!inArray(x[prop], y)) {
                    return false;
                }
            } else {
                if (y.hasOwnProperty(prop)) {
                    if (!isObjectValueEqual(x[prop], y[prop])) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }

}

function inArray(search, array) {
    for (let i in array) {
        if (isObjectValueEqual(array[i], search)) {
            return true;
        }
    }
    return false;
}

function array_sum(arr, lo, hi) {
    if (lo === hi) return arr[lo];
    let mi = parseInt((lo + hi) / 2);
    return array_sum(arr, lo, mi) + array_sum(arr, mi + 1, hi);
}


Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length !== array.length)
        return false;

    for (let i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        } else if (!isObjectValueEqual(this[i],array[i])) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});