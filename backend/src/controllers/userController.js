const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get Profile
const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider,
        role: req.user.role,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.name = name || user.name;
    user.avatar = avatar || user.avatar;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        provider: user.provider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Get My List
const getMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("myList");

    return res.status(200).json({
      success: true,
      myList: user.myList,
    });
  } catch (error) {
    console.error("Get My List Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Add to My List
const addToMyList = async (req, res) => {
  try {
    const { tmdbId, mediaType } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: {
          myList: {
            tmdbId: Number(tmdbId),
            mediaType,
          },
        },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Movie added to your list Successfully.",
      myList: user.myList,
    });
  } catch (error) {
    console.error("Add to My List Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Remove from My List
const removeFromMyList = async (req, res) => {
  try {
    const { tmdbId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          myList: {
            tmdbId: Number(tmdbId),
          },
        },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Movie removed from your list successfully.",
      myList: user.myList,
    });
  } catch (error) {
    console.error("Remove from My List Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Get Watch History
const getWatchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("watchHistory");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      watchHistory: user.watchHistory,
    });
  } catch (error) {
    console.error("Get Watch History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Add to Watch History
const addWatchHistory = async (req, res) => {
  try {
    const { tmdbId, mediaType } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove the previous entry if it exists to avoid duplicates
    user.watchHistory = user.watchHistory.filter(
      (movie) => movie.tmdbId !== Number(tmdbId),
    );

    // Add latest watch entry
    user.watchHistory.unshift({
      tmdbId: Number(tmdbId),
      mediaType,
      watchedAt: new Date(),
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Movie added to watch history successfully.",
      watchHistory: user.watchHistory,
    });
  } catch (error) {
    console.error("Add to Watch History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Get Continue Watching
const getContinueWatching = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("continueWatching");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      continueWatching: user.continueWatching,
    });
  } catch (error) {
    console.error("Get Continue Watching Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Save Continue Watching
const saveContinueWatching = async (req, res) => {
  try {
    const { tmdbId, mediaType, progress } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // If progress is 95% or more, remove the movie from continueWatching
    if (progress >= 95) {
      user.continueWatching = user.continueWatching.filter(
        (movie) => movie.tmdbId !== Number(tmdbId),
      );

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Movie removed from Continue Watching.",
        continueWatching: user.continueWatching,
      });
    }

    //  Check if the movie already exists in continueWatching
    const existingMovie = user.continueWatching.find(
      (movie) => movie.tmdbId === Number(tmdbId),
    );

    if (existingMovie) {
      // Update the progress and updatedAt timestamp
      existingMovie.progress = progress;
      existingMovie.updatedAt = new Date();
    } else {
      user.continueWatching.unshift({
        tmdbId: Number(tmdbId),
        mediaType,
        progress,
        updatedAt: new Date(),
      });
    }

    // Sort by latest updatedAt timestamp
    user.continueWatching.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
    );

    // Keep only the last 50 movies in continueWatching
    user.continueWatching = user.continueWatching.slice(0, 50);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Continue watching progress saved successfully.",
      continueWatching: user.continueWatching,
    });
  } catch (error) {
    console.error("Save Continue Watching Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getContinueWatching,
  saveContinueWatching,
  changePassword,
  getMyList,
  addToMyList,
  removeFromMyList,
  getWatchHistory,
  addWatchHistory,
};
