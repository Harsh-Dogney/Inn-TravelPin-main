import User from "../Models/User.model.js";
import bcrypt from "bcrypt";

export const userLogin = async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password!" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password!" });
    }

    // Send success response
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
