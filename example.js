/**
 * Created by vovan on 1/10/15.
 */

'use strict';


(function () {
    var utils = require('./misc'),
        _ = require('underscore');

    // Invoke lambda from utils package
    utils.log.info(
        _.chain([1, 2, 3, 4, 5]).map(utils.l('x -> x * 2')).value()
    );

    // Invoke lambda mixed into underscore package
    utils.log.info(
        _.chain([1, 2, 3, 4, 5]).map(_.l('x -> x * 2')).value()
    );
}());
