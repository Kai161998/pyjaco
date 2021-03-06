/**
  Copyright 2011-2013 Christian Iversen <chrivers@iversen-net.dk>

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
**/

__builtins__.PY$function = __inherit(object, "function");

var $function = __builtins__.PY$function;

$function.PY$__init__ = function(self, code) {
    self.PY$func_code = code;
};

$function.PY$__get__ = function(self, obj, type) {
    if (bool(obj) === True && !self.PY$func_code.__static) {
        return function() {
            return self.PY$func_code.apply(null, [obj].concat(Array.prototype.slice.call(arguments)));
        };
    } else {
        return function() {
            return self.PY$func_code.apply(null, arguments);
        };
    }
};

$function.PY$__getattribute__ = function(self, key) {

};

$function.PY$__repr__ = function(self) {
    return str("<function " + this.PY$func_code.name + " at 0x" + this.id.toString(16) + ">");
};

$function.PY$__str__ = $function.PY$__repr__;

$function.PY$__call__ = function(self) {
    return self.PY$func_code.apply({}, Array.prototype.slice.call(arguments, 1));
};