const CommentService = require("../services/comment");
const UserService = require("../services/user");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connect successful: ", socket.id);

    socket.on("join", (room) => {
      socket.join(room);
    });

    socket.on("leave", (room) => {
      socket.leave(room);
    });

    socket.on("comment", async (comment, room, sender) => {
      console.log("Receiver new comment");
      let newComment;
      try {
        newComment = await CommentService.createComment({
          content: comment,
          belong_to: room,
          sender: sender,
          parent: null,
        });

        const foundSender = await UserService.getUserInfo({ userId: sender });
        const senderInfoObject = {
          _id: foundSender._id,
          full_name: foundSender.full_name,
          avatar: foundSender.avatar,
        };

        newComment.sender = senderInfoObject;
      } catch (e) {
        console.log(e);
      }
      io.in(room).emit("newComment", newComment);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnect");
    });
  });
};

module.exports = socketHandler;
