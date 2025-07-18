const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  messages: [
    {
      content: String,

      date: {
        type: String,
        default: () => new Date().toISOString().split("T")[0],
      },
    },
  ],
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
