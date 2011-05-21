/* Python built-in functions */

hasattr = Function(function(obj, name) {
    return defined(obj[name]);
});

getattr = Function(function(obj, name, value) {
    var _value = obj[name];

    if (defined(_value)) {
        return _value;
    } else {
        if (defined(value)) {
            return value;
        } else {
            throw py_builtins.AttributeError.__call__(obj, name);
        }
    }
});

setattr = Function(function(obj, name, value) {
    obj[name] = value;
});

hash = Function(function(obj) {
    if (hasattr(obj, '__hash__')) {
        return obj.__hash__();
    } else if (typeof(obj) == 'number') {
        return obj == -1 ? -2 : obj;
    } else {
        throw py_builtins.AttributeError.__call__(obj, '__hash__');
    }
});

len = Function(function(obj) {
    if (hasattr(obj, '__len__')) {
        return obj.__len__();
    } else {
        throw py_builtins.AttributeError.__call__(obj, '__name__');
    }
});

dir = Function(function(obj) {
    var res = list.__call__();
    for (var i in obj) {
        res.append.call(res, str.__call__(i));
    }
    return res;
});

repr = Function(function(obj) {
    if (!defined(obj)) {
        return "None";
    } else if (hasattr(obj, '__repr__')) {
        return obj.__repr__.call(obj);
    } else if (hasattr(obj, '__str__')) {
        return obj.__str__.call(obj);
    } else {
        throw py_builtins.AttributeError.__call__('__repr__ or __str__ not found');
    }
});

range = Function(function(start, end, step) {
    if (!defined(end)) {
        end = start;
        start = 0;
    }

    if (!defined(step)) {
        step = 1;
    }

    var seq = [];

    for (var i = start; i < end; i += step) {
        seq.push(i);
    }

    if (py_builtins.__python3__)
        return iter.__call__(seq);
    else
        return list.__call__(seq);
});

xrange = Function(function(start, end, step) {
    return iter.__call__(range(start, end, step));
});

map = Function(function() {
    if (arguments.length < 2) {
        throw py_builtins.TypeError.__call__("map() requires at least two args");
    }

    if (arguments.length > 2) {
        throw py_builtins.NotImplementedError.__call__("only one sequence allowed in map()");
    }

    var func = arguments[0];
    var seq = iter.__call__(arguments[1]);

    var items = list.__call__();

    iterate(seq, function(item) {
        items.append(func(item));
    });

    if (py_builtins.__python3__)
        return iter.__call__(items);
    else
        return items;
});

zip = Function(function() {
    if (!arguments.length) {
        return list.__call__();
    }

    var iters = list.__call__();
    var i;

    for (i = 0; i < arguments.length; i++) {
        iters.append(iter.__call__(arguments[i]));
    }

    var items = list.__call__();

    while (true) {
        var item = list.__call__();

        for (i = 0; i < arguments.length; i++) {
            try {
                var value = iters.__getitem__(i).next();
            } catch (exc) {
                if (isinstance.__call__(exc, py_builtins.StopIteration)) {
                    return items;
                } else {
                    throw exc;
                }
            }

            item.append(value);
        }

        items.append(tuple.__call__(item));
    }
});

isinstance = Function(function(obj, cls) {
    if (cls.__class__ == tuple) {
        var length = cls.__len__();

        if (length == 0) {
            return false;
        }

        for (var i = 0; i < length; i++) {
            var _cls = cls.__getitem__(i);

            if (isinstance.__call__(obj, _cls)) {
                return true;
            }
        }

        return false;
    } else {
        if (defined(obj.__class__)) {
            return obj.__class__ == cls;
        } else {
            if (defined(cls.__call__)) {
                return obj instanceof cls.__call__;
            } else {
                return obj instanceof cls;
            }
        }
    }
});

py_builtins.bool = function(a) {
    if ((a != null) && defined(a.__bool__))
        return a.__bool__();
    else {
        if (a)
            return true;
        else
            return false;
    }
};

py_builtins.eq = function(a, b) {
    if ((a != null) && defined(a.__eq__))
        return a.__eq__(b);
    else if ((b != null) && defined(b.__eq__))
        return b.__eq__(a);
    else
        return a == b;
};

py_builtins._int = Function(function(value) {
    var s = value.toString();
    if (s.match(/^[-+0-9.]+$/)) {
        return parseInt(value);
    } else {
        throw py_builtins.ValueError.__call__("Invalid integer: " + value);
    }
});

py_builtins._float = Function(function(value) {
    return value;
});

py_builtins.max = Function(function(list) {
    if (len(list) == 0)
        throw py_builtins.ValueError.__call__("max() arg is an empty sequence");
    else {
        var result = null;

        iterate(iter.__call__(list), function(item) {
                if ((result == null) || (item > result))
                    result = item;
        });

        return result;
    }
});

py_builtins.min = Function(function(list) {
    if (len(list) == 0)
        throw py_builtins.ValueError.__call__("min() arg is an empty sequence");
    else {
        var result = null;

        iterate(iter.__call__(list), function(item) {
                if ((result == null) || (item < result))
                    result = item;
        });

        return result;
    }
});

py_builtins.sum = Function(function(list) {
    var result = 0;

    iterate(iter.__call__(list), function(item) {
        result += item;
    });

    return result;
});

py_builtins.print = function(s) {
    if (typeof(console) != "undefined" && defined(console.log)) {
        console.log(js(str.__call__(s)));
    } else {
        if (arguments.length <= 1) {
            if (defined(s))
                print(s);
            else
                print("");
        } else {
            var args = tuple.__call__(to_array(arguments));
            print(str.__call__(" ").join(args));
        }
    }
};

py_builtins.filter = Function(function(f, l) {
   res = list.__call__();
   iterate(iter.__call__(l), function(item) {
     if (py_builtins.bool(f(item))) {
       res.append(item);
     };
   });
   return res;
});

py_builtins.reduce = Function(function(func, seq) {
    var initial;
    if (arguments.length == 3) {
        initial = arguments[2];
    } else {
        initial = null;
    }
    if (len(seq) < 2) {
        return initial;
    }
    if (arguments.length == 3) {
        var accum = initial;
        var start = 0;
    } else {
        var accum = func(seq.__getitem__(0), seq.__getitem__(1));
        var start = 2;
    }
    for (var i = start; i < len(seq); i++) {
        accum = func(accum, seq.__getitem__(i));
    }
    return accum;
});
