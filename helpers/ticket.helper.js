const cleanseTicket = (ticket) => {
    return {
        sender: ticket.sender,
        subject: ticket.subject,
        message: ticket.message
    }
}

export { cleanseTicket }