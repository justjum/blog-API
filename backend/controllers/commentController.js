const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const PrismaClient = require("@prisma/client").PrismaClient;

exports.getAllComments = async function (req, res, next) {};

exports.getComment = async function (req, res, next) {};

exports.postComment = async function (req, res, next) {};

exports.updateComment = async function (req, res, next) {};

exports.deleteComment = async function (req, res, next) {};
