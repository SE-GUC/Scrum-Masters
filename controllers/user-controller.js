const Joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenKey = require("../config/tokenKey");
var Company = require("../models/company");
var Notification = require("../models/Notification");

function validateUser(user, creating) {
  const schema = {
    firstName: Joi.string()
      .max(30)
      .required(),
    lastName: Joi.string()
      .max(30)
      .required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .required(),
    gender: Joi.string()
      .valid(["male", "female"])
      .required()
  };
  if (creating) {
    Object.assign(schema, {
      email: Joi.string()
        .email()
        .required(),
      type: Joi.string()
        .valid(["investor", "lawyer", "reviewer", "admin"])
        .required()
    });
  }

  return Joi.validate(user, schema);
}

exports.listAllUsers = (req, res) => {
  User.find({}, { _id: true })
    .then(users => {
      return res.json({ data: users });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).send("User not found");
      return res.json(user);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.createUser = (req, res) => {
  const { error } = validateUser(req.body, true);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res
          .status(400)
          .send("A user is already registered with this email");
      }
      var user = req.body;
      User.create(user)
        .then(user => {
          return res.json({ msg: "User created", data: user });
        })
        .catch(err => {
          console.log(err);
          return res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.updateUser = (req, res) => {
  const { error } = validateUser(req.body, false);
  if (error) return res.status(400).send(error.details[0].message);

  User.findByIdAndUpdate(req.params.id, req.body, { new: false })
    .then(user => {
      if (!user) return res.status(404).send("User not found");
      return res.json({ msg: "User updated", data: user });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) return res.status(404).send("User not found");
      return res.json({ msg: "User deleted", data: user });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

// This is a helper method which will be used whenever a notification needs to be created
exports.createNotificationForUser = async notification => {
  try {
    console.log(notification);
    const notif_obj = await Notification.create(notification);
    if (!notif_obj) return undefined;

    await User.findOneAndUpdate(
      { _id: notif_obj.owner_id },
      { $push: { notifications: notif_obj._id } }
    );
    return notif_obj;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

exports.getNotifications = async (req, res) => {
  User.findById(req.params.id)
    .populate({
      path: "notifications",
      model: "notification"
    })
    .then(user => {
      if (!user) return res.status(404).send({ error: "User not found" });
      return res.json(user.notifications);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.setNotificationViewed = async (req, res) => {
  Notification.findByIdAndUpdate(req.params.id, { viewed: true }, { new: true })
    .then(notification => {
      if (!notification)
        return res.status(404).send({ error: "Notification not found" });
      return res.json({ msg: "Success", data: notification });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.notificationTestCreate = async (req, res) => {
  const notif = await exports.createNotificationForUser(req.body);
  if (!notif) res.sendStatus(500);
  return res.json(notif);
};

exports.viewApplicationFees = async (req, res) => {
  const targetId = req.params.id;
  const targetApplication = await Company.findById(targetId);
  if (!targetApplication)
    return res.status(404).send({ error: "Application not found" });

  const applicationFees = targetApplication.fees;
  if (!applicationFees)
    return res.send({ error: "The fees is not calculated yet" });

  return res.send({ Fees: applicationFees });
};

exports.assignReviewer = async (req, res) => {
  const targetId = req.params.app_id;
  const reviewer_id = req.params.rev_id;

  var targetApplication = await Company.findById(targetId);

  if (!targetApplication)
    return res.status(404).send({ error: "Application not found" });

  var targetReviewer = await User.findById(reviewer_id);

  if (!targetReviewer)
    return res.status(404).send({ error: "Reviewer not found" });
  if (targetReviewer.type != "reviewer")
    return res
      .status(404)
      .send({ error: "the assigned user should be reviewer" });
  if (targetApplication.reviewed_statusreviewer)
    return res.send({ error: "this application is already reviewed" });

  const targetApplicationup = await Company.findByIdAndUpdate(
    targetId,
    { review_reviewer: reviewer_id },
    { new: true }
  );

  return res.send(targetApplicationup);
};
exports.assignLaywer = async (req, res) => {
  const appId = req.params.appId;
  const lawyerId = req.params.lawyerId;

  var application = await Company.findById(appId);
  if (!application)
    return res.status(404).send({ error: "Application not found" });

  var lawyer = await User.findById(lawyerId);
  if (!lawyer) return res.status(404).send({ error: "Lawyer not found" });
  if (lawyer.type != "lawyer")
    return res
      .status(400)
      .send({ error: "the user you are assigning is not of type (lawyer)" });

  if (application.review_lawyer)
    return res.status(400).send({
      error: "A lawyer is already assigned to this application"
    });
  const updatedApplication = await Company.findByIdAndUpdate(
    appId,
    { review_lawyer: lawyerId },
    { new: true }
  );
  
  return res.json(updatedApplication);

  /*
  notification = {};
  notification.owner_id = lawyerId;
  notification.target_type = "company";
  notification.target_id = appId;
  notification.notif_text = "You Were Assigned To An Application";

  Notification.create(notification)
    .then(notification => {
      User.findOneAndUpdate(
        { _id: lawyerId },
        { $push: { notifications: notification._id } }
      )
        .then(() => {
          return res.json(updatedApplication);
        })
        .catch(err => {
          console.log(
            "Internal server error while adding comment to company list: \n",
            err,
            "\n\n"
          );
          return res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(
        "Internal server error while creating commnet: \n",
        err,
        "\n\n"
      );
      return res.sendStatus(500);
    });
    */
};

exports.getassignedlawyer = async (req, res) => {
  const company = await Company.findOne({ _id: req.params.companyid });
  if (!company) return res.status(404).send({ error: "No such Company." });
  if (!company.review_lawyer)
    return res
      .status(404)
      .send({ error: "No lawyer was assigned to this application yet." });
  const laywer = await User.findOne(
    { _id: company.review_lawyer },
    { _id: false, firstName: true, lastName: true, email: true }
  );
  if (!laywer) return res.status(404).send({ error: "No such lawyer" });
  return res.json(laywer);
};

exports.publishPaidApplication = async (req, res) => {
  const appId = req.params.appId;
  const adminId = req.params.adminId;

  var targetApplication = await Company.findById(appId);

  if (!targetApplication)
    return res.status(404).send({ error: "Application not found" });

  var targetAdmin = await User.findById(adminId);

  if (!targetAdmin) return res.status(404).send({ error: "Admin not found" });

  if (targetApplication.established == true)
    return res.send({ error: "This application is already established" });

  if (targetApplication.ispaid == false)
    return res.send({ error: "This application is not paid yet" });

  if (targetAdmin.type != "admin")
    return res
      .status(404)
      .send({ error: "User should be of type admin to publish a company" });

  const published = await Company.findByIdAndUpdate(
    appId,
    { established: true },
    { new: true }
  );

  return res.send(published);
};

exports.unassignReviewer = async (req, res) => {
  try {
    const targetId = req.params.appId;

    var targetApplication = await Company.findById(targetId);

    if (!targetApplication) {
      return res.status(404).send({ error: "Application not found" });
    }

    if (targetApplication.reviewed_reviewer === null) {
      return res.send({ error: "This application is already unreviewed" });
    }

    const targetApplicationup = await Company.findByIdAndUpdate(
      targetId,
      { review_reviewer: undefined, reviewed_statusreviewer: undefined },
      { new: true }
    );

    return res.send(targetApplicationup);
  } catch (error) {
    console.log(error);
  }
};

exports.unassignLaywer = async (req, res) => {
  try {
    const appId = req.params.appId;

    var application = await Company.findById(appId);
    if (!application) {
      return res.status(404).send({ error: "Application not found" });
    }

    if (application.review_lawyer === null) {
      return res.status(400).send({
        error: "The lawyer is already unassigned to this application"
      });
    }
    const updatedApplication = await Company.findByIdAndUpdate(
      appId,
      { review_lawyer: undefined, reviewed_statuslawyer: undefined },
      { new: true }
    );
    return res.json(updatedApplication);
  } catch (error) {
    console.log(error);
  }
};

exports.lawyerReviewCompany = async (req, res) => {
  try {
    const userId = req.params.userId;
    const appId = req.params.appId;
    var user = await User.findById(userId);
    if (!user) return res.status(404).send({ error: "Invalid User Id" });
    if (user.type) var app = await Company.findById(appId);
    if (!app) return res.status(404).send({ error: "Invalid Application Id" });
    if (app.review_lawyer != userId)
      return res
        .status(400)
        .send({ error: "You are not assigned to this application" });
    if (app.reviewed_statuslawyer == true)
      return res
        .status(400)
        .send({ error: "This application is already reviewed" });
    const updatedApp = await Company.findByIdAndUpdate(
      appId,
      {
        reviewed_statuslawyer: req.body.review_status,
        review_lawyer: undefined
      },
      { new: true }
    );
    
    notification = {
      notif_text: "Your company application has been reviewed by a lawyer",
      target_type: "company",
      target_id: appId,
      owner_id: app.owner
    }
    await exports.createNotificationForUser(notification)
    
    return res.json(updatedApp);
  } catch (error) {
    console.log(error);
  }
};

exports.reviewerReviewCompany = async (req, res) => {
  try {
    const userId = req.params.userId;
    const appId = req.params.appId;
    var user = await User.findById(userId);
    if (!user) return res.status(404).send({ error: "Invalid User Id" });
    if (user.type) var app = await Company.findById(appId);
    if (!app) return res.status(404).send({ error: "Invalid Application Id" });
    if (app.reviewed_statuslawyer == false)
      return res.status(400).send({
        error: "This application has to be reviewed by a lawyer first"
      });
    if (app.review_reviewer != userId)
      return res
        .status(400)
        .send({ error: "You are not assigned to this application" });
    if (app.reviewed_statusreviewer == true)
      return res
        .status(400)
        .send({ error: "This application is already reviewed" });
    const updatedApp = await Company.findByIdAndUpdate(
      appId,
      {
        reviewed_statusreviewer: req.body.review_status,
        review_reviewer: undefined
      },
      { new: true }
    );
    
    notfication = {
      notif_text: "Your company application has been reviewed by a reviewer",
      target_type: "company",
      target_id: appId,
      owner_id: app.owner
    }
    await exports.createNotificationForUser(notification)
    
    return res.json(updatedApp);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ email: "Email does not exist" });
    const match = bcrypt.compareSync(password, user.password);

    if (match) {
      const payload = {
        id: user._id,
        email: user.email,
        type: user.type
      };
      const token = jwt.sign(payload, tokenKey.key, { expiresIn: "1h" });
      return res.json({ token: `Bearer ${token}`, user: payload });
    } else return res.status(400).send({ password: "Wrong password" });
  } catch (e) {
    console.log(e);
    return res.json({ msg: "Can't log in " });
  }
};

exports.register = async (req, res) => {
  try {
    const { error } = validateUser(req.body, true);
    if (error) return res.status(400).send(error.details[0].message);
    const { firstName, lastName, email, password, gender, type } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ email: "Email already exists" });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      type
    });
    await User.create(newUser);
    res.json({ msg: "User created successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(422).send({ error: "Can not register right now" });
  }
};
