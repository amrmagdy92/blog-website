import { resolve } from "path"
import { validatePostData } from "../helpers/post.helpers"
import postModel from "../model/post.model"

const createPost = (post) => {
    return new Promise((resolve, reject) => {
        let errors = validatePostData(post)
        if (Object.keys(errors).length > 0) {
            reject({
                code: 400,
                msg: errors
            })
        } else {
            postModel.createPost()
            .then(data => resolve({
                code: 200,
                msg: data
            }))
            .catch(err => reject({
                code: 500,
                msg: err
            }))
        }
    })
}
const viewPost = (postID) => {
    return new Promise((resolve, reject) => {
        postModel.findById(postID)
        .then(data => {
            if (data) {
                resolve({
                    code: 200,
                    msg: data
                })
            } else {
                reject({
                    code: 404,
                    msg: 'Post not found'
                })
            }
        })
        .catch(err => {
            reject({
                code: 500,
                msg: err
            })
        })
    })
}
const listPosts = (resultsPerPage, pageNumber) => {
    return new Promise((resolve, reject) => {
        if (isNaN(resultsPerPage) || isNaN(pageNumber)) {
            reject({
                code: 400,
                msg: 'Invalid parameters'
            })
        } else {
            postModel.find({
                skip: resultsPerPage * (pageNumber - 1),
                limit: resultsPerPage
            })
            .then(results => {
                if (results.length > 0) {
                    resolve({
                        code: 200,
                        msg: results
                    })
                } else {
                    reject({
                        code: 404,
                        msg: "Posts not found"
                    })
                }
            })
        }
    })
}
const updatePost = (postID, updateData) => {
    return new Promise((resolve, reject) => {
        let errors = validatePostData(updateData)
        if (Object.keys(errors).length > 0) {
            reject({
                code: 400,
                msg: errors
            })
        } else {
            postModel.findByI(postID, updateData)
            .then(data => {
                if (data) {
                    resolve({
                        code: 200,
                        msg: data
                    })
                } else {
                    reject({
                        code: 404,
                        msg: 'Post not found'
                    })
                }
            })
            .catch(err => {
                reject({
                    code: 500,
                    msg: err
                })
            })
        }
    })
}
const deletePost = () => {}

export { createPost, viewPost, listPosts, updatePost, deletePost }