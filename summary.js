const fs = require('fs');
const path = require('path');
const root = __dirname;

function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                if (stat && stat.isDirectory()) {

                    results.push(path.relative(root, file));

                    filewalker(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(path.relative(root, file));

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

filewalker(root, function(err, data){
    if(err){
        throw err;
    }

    console.log(data);
});
