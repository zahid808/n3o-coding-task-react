export const ValidateRules = {
    required: { required: true, message: "Required Field" },
    alphabets: {
        pattern: new RegExp(/^[a-zA-Z]+( [a-zA-Z]+)*$/g),
        message: "Alphabets only",
    },
    alphaNumeric: {
        pattern: new RegExp(/^[A-Za-z0-9\s]+$/),
        message: "AlphaNumeric only",
    },
    number: {
        pattern: new RegExp(/^[0-9]+$/g),
        message: "Numbers only",
    },
    password: {
        pattern: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/),
        message: `Minimum eight characters, at least one uppercase letter, 
      one special character,  one lowercase letter and one number`,
    },
};