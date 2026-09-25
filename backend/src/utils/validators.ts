import {ValidationChain, body, validationResult} from 'express-validator'
import {NextFunction, Request, Response} from 'express'

const validate = (validations:ValidationChain[]) => {
    return async (req:Request,res:Response,next:NextFunction) => {
        for (let validation of validations){
            const result  = await validation.run(req)
            if(!result.isEmpty()){
                break;
            }
          
        }
        const errors =  validationResult(req)
        if(errors.isEmpty()){
            return next()
        }
        res.status(422).json({error:errors.array()})
    }
}

const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage("Password should contain atleast 6 letters"),
]

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),...loginValidator
]

const chatValidator = [
    body("message").notEmpty().withMessage("Message is required")
]

export {validate,signupValidator,loginValidator,chatValidator}