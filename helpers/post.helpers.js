const validatePostData = (data) => {
    let errors = {}
    !data.title || data.title == ""? errors.title = 'Title is required' : null
    !data.postText || data.postText == ""? errors.postText = 'Post text is required' : null
    !data.authorID || data.authorID == "" ? errors.authorID = 'Author ID is required' : null
    return errors
}

export { validatePostData }