const bcrypt = require("bcrypt");
import { Request, Response } from "express";
import User from "../models/user.model";
import { validateSchema } from "../helpers/ValidateSchema";
var nodemailer = require("nodemailer");

export async function createUser(req: Request, res: Response) {
  try {
    const saltRounds: number = 10;
    var body: any = req.body;
    const validSchema: boolean = validateSchema(body);
    var password: string = body.password;

    if (!validSchema) {
      //bcrypt function added to hash the password
      bcrypt.hash(
        password,
        saltRounds,
        async function (err: string, hash: string) {
          var newBody: any = { username: body.username, password: hash };
          const user = await User.create(newBody);
          res.status(200).json(user);
        }
      );
    } else {
      res.status(500).json({
        error: "Invalid Schema",
      });
    }
  } catch (error: any) {
    res.status(402).json({
      error: error.message,
    });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(402).json({
      error: error.message,
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(402).json({
      error: error.message,
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(402).json({
      error: error.message,
    });
  }
}

export async function sendMail(req: Request, res: Response) {
  var {toMail, mailSubject, mailText} = req.body;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ritik.agarwal707@gmail.com",
      pass: process.env.PASS,
    },
  });

  var mailOptions = {
    from: "ritik.agarwal707@gmail.com",
    to: toMail,
    subject: mailSubject,
    text: mailText,
  };

  transporter.sendMail(mailOptions, function (error: string, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error: any) {
    res.status(402).json({
      error: error.message,
    });
  }
}
