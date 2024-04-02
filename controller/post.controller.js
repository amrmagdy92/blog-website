import { validatePostData } from "../helpers/post.helpers"
import postModel from "../model/post.model"
import { isValidObjectId } from "mongoose"

const createPost = (post) => {
    return new Promise((resolve, reject) => {
        let errors = validatePostData(post)
        if (Object.keys(errors).length > 0) {
            reject({
                code: 400,
                msg: errors
            })
        } else {
            postModel.create(post)
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
        if (!isValidObjectId(postID)) {
            reject({
                code: 400,
                msg: 'Invalid post'
            })
        } else {
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
        }
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
        if (!isValidObjectId(postID)) {
            reject({
                code: 400,
                msg: 'Invalid post'
            })
        } else {
            let errors = validatePostData(updateData)
            if (Object.keys(errors).length > 0) {
                reject({
                    code: 400,
                    msg: errors
                })
            } else {
                postModel.findById(postID, updateData)
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
        }
    })
}
const deletePost = (postID) => {
    return new Promise((resolve, reject) => {
        if (isValidObjectId(postID)) {
            postModel.findByIdAndDelete(postID)
            .then(() => {
                resolve({
                    code: 200,
                    msg: 'Post deleted successfully'
                })
            })
            .catch( error => {
                reject({
                    code: 500,
                    msg: error
                })
            })
        } else {
            reject({
                code: 400,
                msg: "Invalid post"
            })
        }
    })
}

export { createPost, viewPost, listPosts, updatePost, deletePost }