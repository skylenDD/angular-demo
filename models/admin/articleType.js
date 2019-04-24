var ArticalType = require('../../schema/admin/arcType.js');


module.exports = {
    findType: function(params, callback) {
        ArticalType.find(params, function(err, result) {
            callback(err, result);
        });
    }
}