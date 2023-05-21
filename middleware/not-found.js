import { StatusCodes } from "http-status-codes";
const NotFound = (req, res) => {
  res.status(StatusCodes.BAD_REQUEST).send("Route does not exist");
};

export default NotFound;
