import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().isEmail().withMessage("Email is required").trim(),
    body("password").isLength({ min: 5 }).withMessage("Password should contain at least 6 characters").trim()
];

const loginValidator = [
    body("email").notEmpty().isEmail().withMessage("Email is required").trim(),
    body("password").isLength({ min: 5 }).withMessage("Password should contain at least 6 characters").trim()
];

export { validate, signupValidator,loginValidator };
