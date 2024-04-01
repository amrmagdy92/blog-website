const validatePostData = (data) => {
    let validationErrors = {}
    if (!data.title) validationErrors.title = 'Title is required'
    if (!data.postText) validationErrors.postText = 'Post text is required'
    return validationErrors
}

export { validatePostData }