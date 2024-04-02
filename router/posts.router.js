import { Router } from "express"

import { listPosts } from "../controller/post.controller"

const router = Router()

router.get("/", (request,response) => {
    listPosts(request.body.resultsPerPage, request.body.pageNumber)
    .then(result => {
        let responseCode = result.code
        let resultData = result.msg
        response.status(responseCode).json({ msg: resultData })
    })
})

export default router