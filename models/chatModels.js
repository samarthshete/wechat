import mongoose from "mongoose";

const chatModel = new mongoose.Schema(
  {
    chatName: {
      type: "String",
    },
    isGroupChat: {
      type: "Boolean",
      default: false,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatModel);
