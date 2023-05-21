import { chats } from "../data/data.js";

const accessChats = async (req, res) => {
  res.send("access chats");
};

const fetchChats = async (req, res) => {
  res.send("fetchChatas");
};

const createGroupChat = async (req, res) => {
  res.send("createGroupChat");
};
const renameGroup = async (req, res) => {
  res.send("renameGroup");
};
const removeFromGroup = async (req, res) => {
  res.send("removeFromGroup");
};
const addToGroup = async (req, res) => {
  res.send("addToGroup");
};
export {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
