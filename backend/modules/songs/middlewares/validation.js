const { body, validationResult } = require("express-validator");

const songValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("artist").notEmpty().withMessage("Artist is required"),
  body("album").notEmpty().withMessage("Album is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("duration")
    .isNumeric()
    .withMessage("Duration must be a number")
    .toFloat(),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { songValidationRules, validate };
