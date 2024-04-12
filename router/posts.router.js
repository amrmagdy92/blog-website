import { Router } from "express"

import { createPost, deletePost, fetchDevPosts, updatePost, viewPost } from "../controller/post.controller"

const router = Router()

router.route("/")
    .get((request,response) => {
        fetchDevPosts(request.query.resultsPerPage, request.query.pageNumber)
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
        createPost(request.body.post)
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
        viewPost(request.params.id)
        .then( result => {
            let responseCode = result.code
            let responseData = result.msg
            response.status(responseCode).json({ msg: responseData })
        })
        .catch(err => {
            let responseCode = err.code
            let resultData = err.msg
            response.status(responseCode).json({ msg: resultData })
        })
    })
    .patch((request, response) => {
        updatePost(request.params.id, request.body.post)
        .then( result => {
            let responseCode = result.code
            let responseData = result.msg
            response.status(responseCode).json({ msg: responseData })
        })
        .catch(err => {
            let responseCode = err.code
            let resultData = err.msg
            response.status(responseCode).json({ msg: resultData })
        })
    })
    .delete((request, response) => {
        deletePost(request.params.id)
        .then( result => {
            let responseCode = result.code
            let responseData = result.msg
            response.status(responseCode).json({ msg: responseData })
        })
        .catch(err => {
            let responseCode = err.code
            let resultData = err.msg
            response.status(responseCode).json({ msg: resultData })
        })
    })

export default router