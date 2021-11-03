const validator = require('validator');
const BadRequestError = require('../errors/bad-request-error');

const linkValidator = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  // eslint-disable-next-line no-else-return
  } else {
    throw new BadRequestError('Ссылка некорректна');
  }
};

module.exports = linkValidator;
