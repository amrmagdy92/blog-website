import { Router } from "express"

import { createUser, getUser, updateUser, deleteUser, listUsers } from "../controller/user.controller"

const router = Router()

router.route("/")
    .get((request, response) => {
        listUsers(request.query.resultsPerPage, request.query.pageNumber)
        .then(result => {
            let responseCode = result.code
            let resultData = result.msg
            response.status(responseCode).json({ msg: resultData })
        })
        .catch(err => {
            let responseCode = err.code
            let resultData = err.msg
            response.status(responseCode).json({ msg: resultData })
        })
    })
    .post((request, response) => {
        createUser(request.body.user)
        .then(result => {
            let responseCode = result.code
            let resultData = result.msg
            response.status(responseCode).json({ msg: resultData })
        })
        .catch(err => {
            let responseCode = err.code
            let resultData = err.msg
            response.status(responseCode).json({ msg: resultData })
        })
    })

router.route("/:id")
    .get((request, response) => {
        getUser(request.params.id)
        .then(result => {
            let responseCode = result.code
            let resultData = result.msg
            response.status(responseCode).json({ msg: resultData })
        })
        .catch(err => {
            let responseCode = err.code
            let resultData = err.msg
            response.status(responseCode).json({ msg: resultData })
        })
    })
    .patch((request, response) => {
        updateUser(request.params.id, request.body.user)
        .then(result => {
            let responseCode = result.code
            let resultData = result.msg
            response.status(responseCode).json({ msg: resultData })
        })
        .catch(err => {
            let responseCode = err.code
            let resultData = err.msg
            response.status(responseCode).json({ msg: resultData })
        })
    })
    .delete((request, response) => {
        deleteUser(request.params.id)
        .then(result => {
            let responseCode = result.code
            let resultData = result.msg
            response.status(responseCode).json({ msg: resultData })
        })
        .catch(err => {
            let responseCode = err.code
            let resultData = err.msg
            response.status(responseCode).json({ msg: resultData })
        })
    })

export default router