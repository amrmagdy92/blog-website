import crypto from "crypto"
import { isValidObjectId } from "mongoose"

const makeSalt = () => {
    return Math.round(new Date().valueOf() * Math.random()).toString()
}
const encryptPassword = (password, salt) => {
    if (password == '' || password == null || password == undefined) return ''
    try {
        return crypto
            .createHmac(process.env.HASH_ALGORITHM, salt)
            .update(password)
            .digest(process.env.DIGEST)
    } catch (err) {
        return err
    }
}

const validateUser = (user) => {
    let errors = {}
    !user.firstName || user.firstName == ""? errors.firstName = "First name is required" : null
    !user.lastName || user.lastName == ""? errors.lastName = "Last name is required" : null
    !user.password || user.password == ""? errors.password = "Password is required" : null
    !user.email || user.email == "" || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)? errors.email = "User email is not valid" : null
    return errors
}

const validateUpdateData = (userID, userData) => {
    let errors = {}
    let validKeys = ["firstName", "lastName", "email"]
    !isValidObjectId(userID) ? errors.user_id = "Invalid user ID" : null
    for ( let i = 0; i < Object.keys(userData).length; i++ ) {
        !validKeys.includes(Object.keys(userData)[i]) ? errors.invalid_key = "An invalid key was found" : null
    }
    return errors
} 

const cleanUserData = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
}

// TODO: move this to a generic helper
const validateCriteria = (criteria) => {
    let errors = {}
    typeof criteria != Object? errors.type = "Invalid data format": null
    !Object.keys(criteria).includes("filter")? errors.filter = "Filter criteria is missing": null
    !Object.keys(criteria).includes("sort")? errors.sort = "Sort criteria is missing": null
    !Object.keys(criteria).includes("pageNumber")? errors.pageNumber = "Page number is missing": null
    !Object.keys(criteria).includes("resultsPerPage")? errors.resultsPerPage = "Results per page is missing": null
    return errors
}

export {
    makeSalt,
    encryptPassword,
    validateUser,
    validateUpdateData,
    cleanUserData
}