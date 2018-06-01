export default{
  post(req, res, io) {
    const { channel, data } = req.body;
    switch (channel) {
      case "message":
        io.emit("message", data);
      break;
      case "game":
        io.emit("game", data);
      break;
    };
    return res.sendStatus(200);
  }
};