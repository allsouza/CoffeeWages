export const sendError = error => {
    return $.ajax({
        url: '/api/errors',
        method: "POST",
        data: {subject: error.subject, body: error.body}
    })
}
