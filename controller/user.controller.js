import { isValidObjectId } from "mongoose"

import userModel from "../model/user.model"
import { validateUser, encryptPassword, makeSalt, validateUpdateData, cleanUserData } from "../helpers/user.helper"

const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        let validationErrors = validateUser(userData)
        if (Object.keys(validationErrors).length > 0) {
            reject({
                code: 400,
                msg: validationErrors
            })
        } else {
            const userSalt = makeSalt()
            userModel.create({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                hashedPassword: encryptPassword(userData.password, userSalt),
                userSalt: userSalt
            }).then( user => {
                let cleansedUser = cleanUserData(user)
                resolve({
                    code: 201,
                    msg: cleansedUser
                })
            }).catch( err => {
                reject({
                    code: 500,
                    msg: err
                })
            })
        }
    })
}
const getUser = (userID) => {
    if (!isValidObjectId(userID)) {
        reject({
            code: 400,
            msg: "Can not find this user"
        })
    } else {
        userModel.findById(userID)
        .then( user => {
            let cleansedUser = cleanUserData(user)
            resolve({
                code: 200,
                msg: cleansedUser
            })
        }).catch( err => {
            reject({
                code: 500,
                msg: err
            })
        })
    }
}
const updateUser = (userID, userData) => {
    if (!isValidObjectId(userID)) {
        reject({
            code: 400,
            msg: "Can not find this user"
        })
    } else {
        // TODO: validate user data first
        let errors = validateUpdateData(userID, userData)
        if (Object.keys(errors).length > 0) {
            reject({
                code: 400,
                msg: errors
            })
        } else {
            userModel.findByIdAndUpdate(userID, userData)
            .then( user => {
                let cleansedUser = cleanUserData(user)
                resolve({
                    code: 200,
                    msg: cleansedUser
                })
            }).catch( err => {
                reject({
                    code: 500,
                    msg: err
                })
            })
        }
    }
}
const deleteUser = (userID) => {
    return new Promise((resolve, reject) => {
        if (!isValidObjectId(userID)) {
            reject({
                code: 400,
                msg: "Can not find this user"
            })
        } else {
            userModel.findByIdAndDelete(userID)
            .then( user => {
                resolve({
                    code: 200,
                    msg: "User was deleted successfully"
                })
            }).catch( err => {
                reject({
                    code: 500,
                    msg: err
                })
            })
        }
    })
}
const listUsers = (resultsPerPage, pageNumber) => {
    return new Promise((resolve, reject) => {
        if (isNaN(resultsPerPage) || isNaN(pageNumber) || resultsPerPage < 1 || pageNumber < 1) {
            reject({
                code: 400,
                msg: "Invalid pagination parameters"
            })
        } else {
            userModel.find({
                skip: resultsPerPage * (pageNumber - 1),
                limit: resultsPerPage
            }).then( users => {
                let cleansedUsers = []
                for (let i = 0; i < users.length; i++) {
                    cleansedUsers.append(cleanUserData(users[i]))
                }
                resolve({
                    code: 200,
                    msg: cleansedUsers
                })
            })
        }
    })
}

export { createUser, getUser, updateUser, deleteUser, listUsers }