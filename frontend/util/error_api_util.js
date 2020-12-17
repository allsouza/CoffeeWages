export const sendError = error => {
    debugger
    return $.ajax({
        url: '/api/errors',
        method: "POST",
        data: {subject: error.subject, body: error.body}
    })
}