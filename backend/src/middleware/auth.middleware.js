import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protectRoute = async (req, res, next) => {
	try {
	  const accessToken = req.cookies.token;
	//   console.log("Cookies from client:", req.cookies);
	//   console.log("Access Token from cookies:", req.cookies.token);
	  if (!accessToken) {
		return res.status(401).json({ message: "Unauthorized - No access token provided" });
	  }
  
	  try {
		const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findById(decoded.userId).select("-password");
  
		if (!user) {
		  return res.status(401).json({ message: "User not found" });
		}
		// console.log("Cookies from client:", accessToken);
		req.user = user;
		next();
	  } catch (error) {
		if (error.name === "TokenExpiredError") {
		  return res.status(401).json({ message: "Unauthorized - Access token expired" });
		}
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	  }
	} catch (error) {
	  console.error("Error in protectRoute middleware:", error.message);
	  return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
  };

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};