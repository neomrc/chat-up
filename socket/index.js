module.exports = io => {
  if (typeof io === 'undefined') throw "Socket is not connected";

  const guid = () => {
    const char4 = () => {
      return Math.random().toString(16).slice(11);
    }
    return char4() + char4() + '-' + char4() + '-' + char4() + '-' + char4() + '-' + char4() + char4() + char4();
  }

  io.on('connection', socket => {
    console.log("Someone connected");
    socket.room = null;
    socket.name = "Someone";

    // login user
    socket.on('login', name => {
      socket.name = name;

      // display all available rooms that the user can join in
      socket.emit('availableRooms', io.sockets.adapter.rooms);
    });

    // logout user
    socket.on('disconnect', () => {
      console.log("Someone left");
      socket.leave(socket.room);
    });

    // create room
    socket.on('createRoom', () => {
      socket.room = guid();
      socket.join(socket.room);
    });

    socket.on('joinRoom', roomID => {
      socket.room = roomID;
      socket.join(socket.room);
    });
  });
}
