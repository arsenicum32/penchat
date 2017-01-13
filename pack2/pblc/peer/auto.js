String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var sock = {
  name: 0,
  room: 'test',
  changeroom: function(room, callback){
    socket.emit('leave', this.room);
    this.room = room;
    socket.emit('join', room);
  },
  connect: function(o){
    socket.emit('snd',{room: this.room , userseed: this.name , id: o });
  }
}

var peer = {

}

$(document).ready(function(){

        socket = io.connect('http://85.143.209.210:1280/', { 'connect timeout': 5000 }); //{'transports': ['xhr-polling']});

        socket.on('connect_error', function(){});

        socket.on('reconnect',function(){
          location.reload();
        });

        socket.on('connect', function () {
          socket.emit('join', sock.room );

          socket.on('log', function(msg){
            console.log(msg);
          })

          socket.on('res', function(msg){
            console.log(msg);
            callb(msg);
          })
        });


        var peer = new Peer({
          // Set API key for cloud server (you don't need this if you're running your
          // own.
          key: 'x7fwx2kavpy6tj4i',

          // Set highest debug level (log everything!).
          debug: 3,

          // Set a logging function:
          logFunction: function() {
            var copy = Array.prototype.slice.call(arguments).join(' ');
            $('.log').append(copy + '<br>');
          }
        });
        var connectedPeers = {};

        // Show this peer's ID.
        peer.on('open', function(id){
          $('#pid').text(id);
          sock.connect(id);
        });

        // Await connections from others
        peer.on('connection', connect);

        peer.on('error', function(err) {
          console.log(err);
        })

        // Handle a connection object.
        function connect(c) {
          // Handle a chat connection.
          if (c.label === 'chat') {
            var chatbox = $('<div></div>').addClass('connection').addClass('active').attr('id', c.peer);
            var header = $('<h1></h1>').html('Chat with <strong>' + c.peer + '</strong>');
            var messages = $('<div><em>Peer connected.</em></div>').addClass('messages');
            chatbox.append(header);
            chatbox.append(messages);

            // Select connection handler.
            chatbox.on('click', function() {
              if ($(this).attr('class').indexOf('active') === -1) {
                $(this).addClass('active');
              } else {
                $(this).removeClass('active');
              }
            });
            $('.filler').hide();
            $('#connections').append(chatbox);

            c.on('data', function(data) {
              messages.append('<div><span class="peer">' + c.peer + '</span>: ' + data +
                '</div>');
                });
                c.on('close', function() {
                  alert(c.peer + ' has left the chat.');
                  chatbox.remove();
                  if ($('.connection').length === 0) {
                    $('.filler').show();
                  }
                  delete connectedPeers[c.peer];
                });
          } else if (c.label === 'file') {
            c.on('data', function(data) {
              // If we're getting a file, create a URL for it.
              if (data.constructor === ArrayBuffer) {
                var dataView = new Uint8Array(data);
                var dataBlob = new Blob([dataView]);
                var url = window.URL.createObjectURL(dataBlob);
                $('#' + c.peer).find('.messages').append('<div><span class="file">' +
                    c.peer + ' has sent you a <a target="_blank" href="' + url + '">file</a>.</span></div>');
              }
            });
          }
          connectedPeers[c.peer] = 1;
        }

        var box = $('#box');
        box.on('dragenter', doNothing);
        box.on('dragover', doNothing);
        box.on('drop', function(e){
        e.originalEvent.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0];
          eachActiveConnection(function(c, $c) {
            if (c.label === 'file') {
              c.send(file);
              $c.find('.messages').append('<div><span class="file">You sent a file.</span></div>');
            }
          });
        });
          function doNothing(e){
            e.preventDefault();
            e.stopPropagation();
          }

          window.callb = function(m){
            var requestedPeer = m.id;
            if (!connectedPeers[requestedPeer] && $('#pid').text() != requestedPeer ) {
              // Create 2 connections, one labelled chat and another labelled file.
              var c = peer.connect(requestedPeer, {
                label: 'chat',
                serialization: 'none',
                metadata: {message: 'hi i want to chat with you!'}
              });
              c.on('open', function() {
                connect(c);
              });
              c.on('error', function(err) { alert(err); });
              var f = peer.connect(requestedPeer, { label: 'file', reliable: true });
              f.on('open', function() {
                connect(f);
              });
              f.on('error', function(err) { alert(err); });
            }
            connectedPeers[requestedPeer] = 1;
          }




          // Connect to a peer
          $('#connect').click(function() {
            var requestedPeer = $('#rid').val();
            if (!connectedPeers[requestedPeer]) {
              // Create 2 connections, one labelled chat and another labelled file.
              var c = peer.connect(requestedPeer, {
                label: 'chat',
                serialization: 'none',
                metadata: {message: 'hi i want to chat with you!'}
              });
              c.on('open', function() {
                connect(c);
              });
              c.on('error', function(err) { alert(err); });
              var f = peer.connect(requestedPeer, { label: 'file', reliable: true });
              f.on('open', function() {
                connect(f);
              });
              f.on('error', function(err) { alert(err); });
            }
            connectedPeers[requestedPeer] = 1;
          });

          // Close a connection.
          $('#close').click(function() {
            eachActiveConnection(function(c) {
              c.close();
            });
          });

          // Send a chat message to all active connections.
          $('#send').submit(function(e) {
            e.preventDefault();
            // For each active connection, send the message.
            var msg = $('#text').val();
            eachActiveConnection(function(c, $c) {
              if (c.label === 'chat') {
                c.send(msg);
                $c.find('.messages').append('<div><span class="you">You: </span>' + msg
                  + '</div>');
              }
            });
            $('#text').val('');
            $('#text').focus();
          });

          // Goes through each active peer and calls FN on its connections.
          function eachActiveConnection(fn) {
            var actives = $('.active');
            var checkedIds = {};
            actives.each(function() {
              var peerId = $(this).attr('id');

              if (!checkedIds[peerId]) {
                var conns = peer.connections[peerId];
                for (var i = 0, ii = conns.length; i < ii; i += 1) {
                  var conn = conns[i];
                  fn(conn, $(this));
                }
              }

              checkedIds[peerId] = 1;
            });
          }

          // Show browser version
          $('#browsers').text(navigator.userAgent);

        // Make sure things clean up properly.

        window.onunload = window.onbeforeunload = function(e) {
          if (!!peer && !peer.destroyed) {
            peer.destroy();
          }
        };

});
