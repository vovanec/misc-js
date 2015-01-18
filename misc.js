/* Copyright (c) 2015 year, Volodymyr Kuznetsov

 Permission to use, copy, modify, and/or distribute this software for any
 purpose with or without fee is hereby granted, provided that the above
 copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE. */


'use strict';

var _ = require('underscore');


var _make_logger = function (level) {
    return function (message) {
        console.log(Date.now().toString() + ' [' + level + ']: ' + message);
    };
};


var log = {
    trace:    _make_logger('DEBUG'),
    debug:    _make_logger('DEBUG'),
    info:     _make_logger('INFO'),
    warn:     _make_logger('WARNING'),
    warning:  _make_logger('WARNING'),
    error:    _make_logger('ERROR'),
    critical: _make_logger('CRITICAL')
};


var construct = function (constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
};


var LambdaExpressionError = function (message) {
    Error.apply(this, arguments);
    this.name = 'LambdaExpressionError';
    this.message = message;
};

LambdaExpressionError.prototype = Error.prototype;
LambdaExpressionError.prototype.constructor = LambdaExpressionError;


var lambda = function (definition) {
    var lambda_expr_parts = definition.match(/^(.+)\s*->\s*(.+)$/);
    if (!lambda_expr_parts || lambda_expr_parts.length !== 3) {
        throw new LambdaExpressionError(
            'Invalid lambda definition: ' + definition
        );
    }
    var lambda_args = _.filter(lambda_expr_parts[1].split(/\s+/),
        function (arg) {
            return !_.isEmpty(arg);
        });

    if (lambda_args.length === 0) {
        throw new LambdaExpressionError(
            'Lambda function arguments list is empty'
        );
    }

    var lambda_body = lambda_expr_parts[2].trim();
    if (!lambda_body) {
        throw new LambdaExpressionError(
            'Lambda function body is empty'
        );
    }

    return construct(Function, lambda_args.concat(['return ' + lambda_body]));
};


(function () {
    _.mixin({'lambda': lambda, 'l': lambda});
    _.extend(exports, {
        log: log,
        construct: construct,
        lambda: lambda,
        l: lambda,
        LambdaExpressionError: LambdaExpressionError
    });
}());