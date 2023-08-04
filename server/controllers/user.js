import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );
    return res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { friendId, id } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ err: "User not found" });
    }
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((userId) => userId !== friendId);
      friend.friends = friend.friends.filter((userId) => userId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
