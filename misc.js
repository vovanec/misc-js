
'use strict';

var _ = require('underscore');


var log = {
    debug: console.log.bind(console),
    info:  console.log.bind(console),
    warn:  console.log.bind(console),
    error: console.log.bind(console)
};


var construct = function (constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
};


var LambdaDefinitionError = function (message) {
    Error.apply(this, arguments);
    this.name = 'LambdaDefinitionError';
    this.message = message;
};

LambdaDefinitionError.prototype = Error.prototype;
LambdaDefinitionError.prototype.constructor = LambdaDefinitionError;


var lambda = function (definition) {
    var lambda_expr_parts = definition.match(/^(.+)\s*->\s*(.+)$/);
    if (!lambda_expr_parts || lambda_expr_parts.length !== 3) {
        throw new LambdaDefinitionError(
            'Invalid lambda definition: ' + definition
        );
    }
    var func_args = _.filter(
        lambda_expr_parts[1].trim().split(/\s+/),
        function (elem) {
            return !_.isEmpty(elem);
        }
    );

    if (func_args.length === 0) {
        throw new LambdaDefinitionError(
            'Lambda function arguments list is empty'
        );
    }

    var func_body = lambda_expr_parts[2].trim();
    if (!func_body) {
        throw new LambdaDefinitionError(
            'Lambda function body is empty'
        );
    }

    func_args.push('return ' + func_body);
    return construct(Function, func_args);
};

exports.log = log;
exports.construct = construct;
exports.lambda = exports.l = lambda;
exports.LambdaDefinitionError = LambdaDefinitionError;


(function () {
    require('underscore').mixin({'lambda': lambda, 'l': lambda});
}());