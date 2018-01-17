var express =  require('express');
var request = require('request');
var app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;

let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

app.post('/login', function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        "use strict";
        var obj = JSON.parse(body);
        console.log(obj)
        let sql = "SELECT * FROM Users where Name='"+obj.username+ "' AND Password='"+obj.password +"'";

            db.all(sql ,(err, rows) => {
                if (err) {
                    throw err;
                }

                if (rows!=null && rows.length>0) {
                    console.log(" user in database" );
                    var obj = {
                        name: rows[0].Name,
                        success: "success"
                    }
                    res.send(obj);

                }
                else{
                    console.log(" user not in database");

                }
        })
    })
});

app.get('/artists', function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    let sql = `SELECT id,name,gender,date,yearOfBirth,yearOfDeath,placeOfBirth,placeOfDeath,url FROM artists ORDER BY name`;

    var artists = [];

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach(function (row) {

            var artistData = {
                "id": row.id,
                "name": row.name,
                "gender": row.gender,
                "date": row.date,
                "yearOfBirth": row.yearOfBirth,
                "yearOfDeath": row.yearOfDeath,
                "placeOfBirth": row.placeOfBirth,
                "placeOfDeath": row.placeOfDeath,
                "url": row.url,
            }
            artists.push(artistData);
        });

        res.send(artists);
    });

});

app.get('/artwork', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    let sql = `SELECT id,accession_number,artist,artistRole,artistId,title,dateText,medium,creditLine,year,acquisitionYear,dimensions,width,height,depth,units,inscription,thumbnailCopyright,thumbnailUrl,url FROM artwork`;

    var artwork = [];

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach(function (row) {

            var artworkData = {
                "id": row.id,
                "artist": row.artist,
                "artistRole": row.artistRole,
                "artistId": row.artistId,
                "title": row.title,
                "dateText": row.dateText,
                "medium": row.medium,
                "year": row.year,
                "dimensions": row.dimensions,
                "width": row.width,
                "height": row.height,
                "thumbnailUrl": row.thumbnailUrl,
                "url": row.url,
                "price": (Math.random()*99+1).toFixed(2)
            }
            artwork.push(artworkData);
        });

        res.send(artwork);
    });

});

app.get('/artworkArtists', function(req, res, next) {

    let sql = `SELECT artist FROM artwork GROUP BY artist`;

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    var artwork = [];

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach(function (row) {

            var artworkData = {
                "artist": row.artist,
            }
            artwork.push(artworkData);
        });

        res.send(artwork);
    });

});

app.post('/newArtist', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var obj = JSON.parse(body);
        console.log(obj);

        let sql = `INSERT INTO artists(id,name,gender,date,yearOfBirth,yearOfDeath,placeOfBirth,placeOfDeath,url)` +
                                `VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.all(sql,[obj.id, obj.name,obj.gender,'NULL',obj.yearOfBirth,obj.yearOfDeath, 'NULL', 'NULL', obj.url], (err, rows) => {
            if (err) {
                throw err;
            }

            console.log("ADDED Artist : " + obj.name);
        });
        res.send("success");
    })

});

app.post('/newArtwork', function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    var body = '';
    req.on('data', function (data) {
        body += data;
    });


    req.on('end', function () {
        var obj = JSON.parse(body);
        console.log(obj);

        let sql = `INSERT INTO artwork(id,accession_number,artist,artistRole,artistId,title,dateText,medium,creditLine,year,acquisitionYear,dimensions,width,height,depth,units,inscription,thumbnailCopyright,thumbnailUrl,url)` +
            `VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
        db.all(sql,[obj.id,'00', obj.artist,'Artist', '11', obj.title,'00','NULL','NULL','NULL','NULL',obj.dimensions, 'NULL', 'NULL','NULL','NULL','NULL','NULL,' , obj.thumbnailUrl, '00'], (err, rows) => {
            if (err) {
                throw err;
            }

            console.log("ADDED PAINTING : " + obj.title);
        });

        res.send("success");
    })

});

app.post('/checkout', function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var obj = JSON.parse(body);
        console.log(obj);

        let sql = `INSERT INTO orders(user,price)` +
            `VALUES(?, ?)`;
        db.all(sql,[obj.user, obj.total], (err, rows) => {
            if (err) {
                throw err;
            }

            console.log("ORDER COMPLETE : " + obj.user);
        });

        res.send("success");
    })

});

app.get('/orders', function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    let sql = `SELECT * FROM orders ORDER BY user`;

    var artists = [];

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        res.send(rows);
    });

});

app.listen(port);
