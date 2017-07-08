'use strict';

const Promise = require('promise');

module.exports = class PidorGenerator {
    constructor(PidorRepository, UserChatRepository) {
        this.PidorRepository = PidorRepository;
        this.UserChatRepository = UserChatRepository;
    }

    get(msg) {
        const chat = msg.chat.id;
        let pr = this.PidorRepository;
        let ucr = this.UserChatRepository;
        return new Promise(function (fulfill, reject) {
            pr.get(chat).then(function (res) {
                console.log(res);
                if (res.length > 0) {
                    fulfill(res[0].dataValues.user);
                } else {
                    ucr.getActiveUser(chat).then(users => {
                        if (users.length > 0) {
                            let user = users[Math.floor(Math.random() * users.length)];
                            pr.store(msg, user.dataValues.user);
                            fulfill(user.dataValues.user);
                        } else {
                            reject('Rej 2');
                        }

                    });
                }
            }).catch(function (res) {
                console.log(res);
            });
        });
    }
};