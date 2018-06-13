(function(isSocketEnabled) {
  if (!isSocketEnabled) throw new Error('Socket is not enabled');
  var socket = io(window.location.href);

  socket.on('availableRooms', function(rooms) {
    console.log(rooms);
  });
})(typeof io !== 'undefined');