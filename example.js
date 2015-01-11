/**
 * Created by vovan on 1/10/15.
 */

'use strict';


(function () {
    var utils = require('./misc'),
        _ = require('underscore');

    utils.log.info(
        _.chain([1, 2, 3, 4, 5]).map(_.l('x -> x * 2')).value()
    );
    utils.log.info(
        _.chain([1, 2, 3, 4, 5]).map(utils.l('x -> x * 2')).value()
    );
}());
