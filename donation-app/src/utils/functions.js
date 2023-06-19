export const ValidateRules = {
    required: { required: true, message: "Required Field" },
    maxlimit200: {
        max: 200,
        message: "Maximum 200 Character only",
    },
    alphaNumeric: {
        pattern: new RegExp(/^[A-Za-z0-9 ,.-\s]+$/),
        message: "AlphaNumeric only",
    },
    price: {
        pattern: new RegExp(/^[1-9]\d*[0-9]*(\.[0-9]*)?$/),
        message: "Price invalid",
    },

};