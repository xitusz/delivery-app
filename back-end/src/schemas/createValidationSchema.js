const regexEmail = /\S+@\S+.\S+/;
const statusArray = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];

const createValidationSchema = {
  blank: (value) => (!value),

  incorrectFormat: (value) => !regexEmail.test(value),

  isLengthLessThan: (value, min) => (value.length < min),

  isLengthHigherThan: (value, max) => (value.length > max),

  isNotNumber: (array) => !array.every((value) => typeof (value) === 'number'),

  isNotStatus: (value) => !statusArray.some((status) => status === value),
};

module.exports = createValidationSchema;
