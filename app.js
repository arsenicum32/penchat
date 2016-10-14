var sdk = require("matrix-js-sdk");
var myUserId = "@example:localhost";
var myAccessToken = "QGV4YW1wbGU6bG9jYWxob3N0.qPEvLuYfNBjxikiCjP";
var matrixClient = sdk.createClient({
       baseUrl: "http://localhost:8008",
       accessToken: myAccessToken,
       userId: myUserId
});

matrixClient.on("RoomMember.membership", function(event, member) {
      if (member.membership === "invite" && member.userId === myUserId) {
          matrixClient.joinRoom(member.roomId).done(function() {
              console.log("Auto-joined %s", member.roomId);
          });
      }
  });

  matrixClient.on("RoomState.members", function(event, state, member) {
       var room = matrixClient.getRoom(state.roomId);
       if (!room) {
           return;
       }
       var memberList = state.getMembers();
       console.log(room.name);
       console.log(Array(room.name.length + 1).join("="));  // underline
       for (var i = 0; i < memberList.length; i++) {
           console.log(
               "(%s) %s",
               memberList[i].membership,
               memberList[i].name
           );
       }
   });

   matrixClient.startClient();

matrixClient.startClient();
