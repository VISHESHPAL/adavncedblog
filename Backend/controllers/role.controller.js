import User from "../models/user.model.js";

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    console.log(role);
    const targetUserId = req.params.id;
    const adminId = req.user.id;

    if (!["author", "reader"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role ! Admin role cannot be assigned.",
      });
    }

    if (targetUserId === adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin cannot change own role",
      });
    }

    const user = await User.findById(targetUserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found ! ",
      });
    }

    user.role = role;
    await user.save();

    return res.status(201).json({
      success: true,
      message: `User role Updated Successfully ! ${role}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in the changing the User ! ",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      success: true,
      message: "All Users got it ! ",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting all the User ! ",
    });
  }
};
