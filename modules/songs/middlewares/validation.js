// bring in express-validator tools
const { body, validationResult } = require('express-validator');

// rules for checking song fields
const songValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('artist').notEmpty().withMessage('Artist is required'),
  body('album').notEmpty().withMessage('Album is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('duration').isNumeric().withMessage('Duration must be a number'),
];

// check if any errors from rules
const validate = (req, res, next) => {
  const errors = validationResult(req);
  // if errors exist, send them back
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // else keep going
  next();
};

// export both so we can use in routes
module.exports = { songValidationRules, validate };
