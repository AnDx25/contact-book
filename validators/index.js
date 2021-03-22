const { body,check, validationResult } = require("express-validator");
exports.createPostValidator=[
    check("title")
    .notEmpty()
    .withMessage("title should not be empty")
    .isLength({
        min:4,
        max:150
    })
    .withMessage("title is too short"),
    check("body")
    .notEmpty()
    .withMessage("body should not be empty")
    .isLength({
        min:4,
        max:2000
    })
    .withMessage("body should be between 4 to 2000 chars"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({error: errors.array()[0].msg});
        next();
      },
]

exports.userSignupValidator=[
    check("name")
    .notEmpty()
    .withMessage("Name should not be empty")
    .isLength({
        min:2,
        max:30
    })
    .withMessage("Name should be between 2 to 10 chars"),
    check("email")
    .isEmail()
    .withMessage("Not a valid Email"),

    // check("phoneNumber")
    // .isMobilePhone()
    // .withMessage("Not a valid number"),

    check("password")
    .notEmpty()
    .withMessage("Dont Leave Password empty")
    .isLength({
        min:6
    })

    .matches(/\d/)
    .withMessage("Passwords must contain a number"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(403).json({error: errors.array()[0].msg});
        next();
      },

]
