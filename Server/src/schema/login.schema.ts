import {string,object} from 'yup'

const loginSchema = object({
    body:object({
        email:string().required("Email is required").email("Email must be Valid"),
        password:string().required("Password is required").min(6,"Password must be at least 6 characters").matches(/^[a-zA-Z0-9_.-]*$/,"Password must contain only alphanumeric characters")
    })
})

export default loginSchema;