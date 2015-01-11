Various utilities.

Lambda example:

```javascript
(function () {
    var utils = require('./misc'),
        _ = require('underscore');

    utils.log.info(
        _.chain([1, 2, 3, 4, 5]).map(_.l('x -> x * 2')).value()
    );
}());

```

```
bash-3.2$ node example.js
1420964878160 [INFO]: 2,4,6,8,10
1420964878161 [INFO]: 2,4,6,8,10
```

