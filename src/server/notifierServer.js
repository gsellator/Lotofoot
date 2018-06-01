export default{
  post(req, res, io) {
    const { channel, data } = req.body;
    switch (channel) {
      case "message":
        io.emit("message", data);
      break;
      default:
        io.emit("update", data);
      break;
    };
    return res.sendStatus(200);
  }
};