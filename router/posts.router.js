import { Router } from "express"

import { createPost, listPosts, viewPost } from "../controller/post.controller"

const router = Router()

router.route("/")
    .get((request,response) => {
        listPosts(request.body.resultsPerPage, request.body.pageNumber)
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

export default router