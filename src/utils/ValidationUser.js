module.exports = {
    validationAddUserResult: {
      username: {
        isLength: {
          options: {  // Perhatikan penulisan "options" bukan "Option"
            min: 3,
            max: 10
          },
          errorMessage: "Username must be between 3 and 10 characters"
        },
        isString: {
          errorMessage: "Please enter a string"
        },
        notEmpty: {
          errorMessage: "Please enter username"
        }
      }
    }
  };
  