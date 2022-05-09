var express = require('express');
var router = express.Router();

const ctrlOther = require("../controllers/other");
const ctrlEvents = require("../controllers/events");
const ctrlChat = require("../controllers/chats")

/* other */
router.get('/', ctrlOther.homepage);
router.get('/events', ctrlEvents.events);
router.get('/eventsFilter', ctrlEvents.eventsFilter);

router.get('/login', ctrlOther.login);
router.post("/login/authenticate", ctrlOther.loginAuthentication);

router.get('/signup', ctrlOther.signup);
router.post("/signup/authenticate", ctrlOther.signupAuthentication);
router.post("/signup/email", ctrlOther.signupEmail);

router.get('/account_settings', ctrlOther.accountSettings);
router.post("/account_settings/authenticate", ctrlOther.changeSettingsAuthentication);


router.get('/admin_dogodki', ctrlOther.adminDogodki);
router.get('/admin_uporabniki', ctrlOther.adminUporabniki);

/* events */
router.get('/create_event', ctrlEvents.createEvent);
router.get('/created_events/:id', ctrlEvents.createdEvents);
router.get('/joined_events/:id', ctrlEvents.joinedEvents);

router.get('/admin_dogodki', ctrlOther.adminDogodki);
router.get('/admin_uporabniki', ctrlOther.adminUporabniki);

router.delete('/admin_uporabniki/:id', ctrlOther.deleteUser);


//hmm?
router.get('/edit_event/:id', ctrlEvents.getEvent);

router.post("/dogodek/pridruzi", ctrlEvents.joinEvent);
router.post('/create_event', ctrlEvents.addEvent);

router.put('/edit_event/:id', ctrlEvents.updateEvent);

router.delete('/edit_event/:id', ctrlEvents.deleteEvent);
router.delete("/dogodek/pridruzi", ctrlEvents.leaveEvent);

/* chat */
//router.post('/event_chat', ctrlChat.eventChat);

//router.get('/event_chat', ctrlChat.eventChat);
router.get('/event_chat/:userId', ctrlChat.getChat);

// todo change to idUser
router.put('/event_chat/:idChat', ctrlChat.updateChat)

router.delete('/event_chat/:chatId/message/:messageId', ctrlChat.deleteMessage);

router.get('/db', ctrlOther.db);
router.get('/db/podatki/vnos', ctrlOther.dbVnos);
router.get('/db/podatki/odstranitev', ctrlOther.dbOdstranitev);

module.exports = router;
