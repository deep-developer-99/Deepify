const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minLength: 6,
      select: false, // Password by default return nahi hoga
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    avatar: {
      type: String,
      default: "",
    },
    myList: [
      {
        tmdbId: {
          type: Number,
          required: true,
        },
        mediaType: {
          type: String,
          enum: ["movie", "tv"],
          required: true,
        },
      },
    ],

    watchHistory: [
      {
        tmdbId: {
          type: Number,
          required: true,
        },
        mediaType: {
          type: String,
          enum: ["movie", "tv"],
          required: true,
        },
        watchedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    continueWatching: [
      {
        tmdbId: {
          type: Number,
          required: true,
        },
        mediaType: {
          type: String,
          enum: ["movie", "tv"],
          required: true,
        },
        progress: {
          type: Number,
          default: 0,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", UserSchema);
