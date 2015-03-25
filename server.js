var hapi = require('hapi');
var path = require('path');

var server = new hapi.Server();
//     {
//     connections: {
//         routes: {
//             files: {
//                 relativeTo: path.join(__dirname, 'public')
//             }
//         }
//     }
// });

server.connection({
    //host: 'localhost',
    port: 8080
});

server.route({
    method: 'GET',
    path: '/file/{filename*}',
    handler: {
        file: function (req) {
            return 'public/' + req.params.filename;
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (req, reply) {
        reply.file('public/index.html');
    }
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});
