const mongoose = require("mongoose");
const Chat = mongoose.model("Chat");
const Uporabnik = mongoose.model("Uporabnik");

const pridobiChat = (req, res) => {
    if (!req.params.userId) {
        return res.status(404).json({
            sporočilo: "userId je obvezen parameter",
        });
    }

    Uporabnik.findById(req.params.userId).exec((napaka, uporabnik) => {
        if (!uporabnik) {
            return res.status(404).json({
                sporočilo:
                    "Ne najdem uporabnika s podanim enoličnim identifikatorjem userId.",
            });
        } else if (napaka) {
            return res.status(500).json(napaka);
        } else {
            var dogodki = uporabnik.joined.concat(uporabnik.created);
            Chat.find({ dogodekId: { $in: dogodki } })
                .populate("dogodekId", ["title", "eventImage"])
                .populate("sporocila.userId", ["uporabniskoIme", "slika"])
                .exec((napaka, chat) => {
                    if (!chat) {
                        return res.status(404).json({
                            sporočilo:
                                "Ne najdem chatov za uporabnika s podanim id-jem.",
                        });
                    } else if (napaka) {
                        return res.status(500).json(napaka);
                    }
                    res.status(200).json(chat);
                });
        }

    });

};

// dodaj sporočilo v chat in posodobi last active
const sporociloKreiraj = (req, res) => {
    const idChata = req.params.chatId;
    if (!idChata) {
        return res.status(404).json({
            sporočilo: "Ne najdem chat z podanim id-jem, chatId je obvezen parameter.",
        });
    }
    Chat.findById(idChata)
        .select("sporocila")
        .exec((napaka, chat) => {
            if (!chat) {
                return res.status(404).json({ sporočilo: "Ni izbranega dogodka." });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            var date = new Date();

            chat.zadnjaAktivnost = date,

                chat.sporocila.push({
                    datum: date,
                    vsebina: req.body.vsebina,
                    userId: req.body.userId
                });

            chat.save((napaka, chat) => {
                if (napaka) {
                    res.status(400).json(napaka);
                } else {
                    const dodanoSporocilo = chat.sporocila.slice(-1).pop();
                    res.status(201).json(dodanoSporocilo);
                }
            });
        });
};

const odstraniChatDogodka = (req, res) => {
    const chatId = req.params.chatId;
    const sporociloId = req.params.messageId;

    if (!chatId) {
        return res.status(404).json({
            sporočilo: "Ne najdem pogovora, chatId je obvezen parameter.",
        });
    } else {
        Chat.findById(chatId)
            .select("sporocila")
            .exec((napaka, chat) => {
                if (!chat) {
                    return res.status(404).json({ sporočilo: "Ne najdem chata." });
                } else if (napaka) {
                    return res.status(500).json(napaka);
                }
                if (chat.sporocila && chat.sporocila.length > 0) {
                    if (!chat.sporocila.id(sporociloId)) {
                        return res.status(404).json({ sporočilo: "Ne najdem sporocila." });
                    } else {
                        chat.sporocila.id(sporociloId).remove();
                        chat.save((napaka) => {
                            if (napaka) {
                                return res.status(500).json(napaka);
                            } else {
                                res.status(200).json({ status: "uspešno" });
                            }
                        });
                    }
                } else {
                    res.status(404).json({ sporočilo: "Ni sporočila za brisanje." });
                }
            });
    }



};

module.exports = {
    pridobiChat,
    sporociloKreiraj,
    odstraniChatDogodka
};