var apiParametri = {
    streznik: "http://localhost:" + (process.env.PORT || 3000),
};
if (process.env.NODE_ENV === "production") {
    apiParametri.streznik = "https://goodmeets.herokuapp.com/";
}
const axios = require("axios").create({
    baseURL: apiParametri.streznik,
    timeout: 5000,
});


const getChat = (req, res) => {

    const currentUserId = req.params.userId;
    const eventId = req.query.eventId;

    axios.get("/api/chat/" + currentUserId).then((odgovor) => {

        chatRenderWithUserId(req, res, odgovor.data, currentUserId, eventId);
    });
};

const chatRenderWithUserId = (req, res, chats, currentUserId, eventId) => {

    const selectedChat = chats.find(({ dogodekId }) => dogodekId._id === eventId);

    res.render("specific_chat", {
        title: 'Klepet',
        layout: 'layout',
        chats: chats,
        selectedChat: selectedChat,
        trenutniUporabnik: currentUserId
    });
};

const updateChat = (req, res) => {
    const idChat = req.params.idChat;

    axios.put("/api/chat/" + idChat, req.body)
        .then((odgovor) => {
            res.status(200).json(odgovor.data);
        }).catch(error => {
            res.status(error.response.status).json(error.response.data);
        });
};

const deleteMessage = (req, res) => {
    const chatId = req.params.chatId;
    const messageId = req.params.messageId;

    axios.delete("/api/chat/" + chatId + "/message/" + messageId)
        .then((odgovor) => {
            res.end();
        });
};

const showError = (req, res, e) => {
    let title = "Something went wrong!"
    let message = e.isAxiosError ? "Error when trying to access the database" : undefined;
    message =
        message != undefined && e.response && e.response.data["message"] ? e.response.data["message"] : message;
    message =
        message == undefined ? "Something went wrong." : message;
    res.render("error", {
        title: title,
        message: message,
        error: e,
        status: e.response.status
    });

}

module.exports = {
    getChat,
    updateChat,
    deleteMessage
};

