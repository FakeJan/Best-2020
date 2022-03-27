process.env.NODE_ENV = 'production';
let mongoose = require('../src/node_modules/mongoose');
let chai = require('../src/node_modules/chai');
let chaiHttp = require('../src/node_modules/chai-http');
let server = require('../src/app');
let expect = chai.expect;
let kupiDelnico = require('../src/app_server/controllers/kupiDelnico');
let prodajDelnico = require('../src/app_server/controllers/prodajDelnico');
let zadrziDelnico = require('../src/app_server/controllers/zadrziDelnico');
let trgovanjeBota = require('../src/app_server/controllers/trgovanjeBota');
let Bot = require('../src/app_server/models/shema-boti');
let Uporabnik = require('../src/app_server/models/shema-uporabniki');

chai.use(chaiHttp);
describe('testni podatki', () => {
    describe('izbris testnih podatkov iz baze', () => {
        it('izbris', (done) => {
            chai.request(server)
                .delete('/api/db/izbrisi')
                .end((napaka, odgovor) => {
                    expect(odgovor.body).to.deep.equal({obvestilo: 'Uspesen izbris'});
                    done();
                });
        });
    });

    describe('vnos testnih podatkov v bazo', () => {
        it('vnos', (done) => {
            chai.request(server)
                .post('/api/db/vstavi')
                .end((napaka, odgovor) => {
                    expect(odgovor.body).to.deep.equal({obvestilo: 'Uspešno dodani podatki'});
                    done();
                })
        })
    });
});

describe('avtentikacija uporabnika', () => {
    describe('registracija novega uporabnika', () => {
        it('registracija brez vseh podatkov', (done) => {
            let novUporabnik = {
                uporabniskoIme: "test",
                geslo: "123456"
            };
            chai.request(server)
                .post('/api/registracija')
                .send(novUporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(400);
                    expect(odgovor.body).to.deep.equal({sporočilo: "Zahtevani so vsi podatki"});
                    done();
                })
        });

        // it('registracija ze obstojecega uporabnika', (done) => {
        //     let novUporabnik = {
        //         ime: "Aljaz",
        //         priimek: "Smaljcelj",
        //         email: "aljaz@gmail.com",
        //         vloga: 0,
        //         uporabniskoIme: "alko",
        //         ocena: "2",
        //         denar: 14,
        //         datumPrijave: new Date(),
        //         geslo: "12345678",
        //     };
        //     chai.request(server)
        //         .post('/api/registracija')
        //         .send(novUporabnik)
        //         .end((napaka, odgovor) => {
        //             odgovor.should.have.status(409);
        //             expect(odgovor.body).to.deep.equal({"sporočilo": "Uporabnik že obstaja."});
        //         });
        // });

        it('registracija z vsemi podatki', (done) => {
            let novUporabnik = {
                ime: "test",
                priimek: "priimek",
                email: "test@gmail.com",
                vloga: 0,
                uporabniskoIme: "testniUporabnik",
                ocena: 4,
                denar: 1000,
                datumPrijave: new Date(),
                geslo: "12345678",
            };
            chai.request(server)
                .post('/api/registracija')
                .send(novUporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(200);
                    odgovor.body.should.have.property('žeton');
                    done();
                })

        })
    });

    describe('prijava uporabnika', () => {
        it('prijava z napačnimi podatki', (done) => {
            let uporabnik = {
                email: "email@email.si",
                geslo: "geslo"
            };
            chai.request(server)
                .post('/api/prijava')
                .send(uporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(401);
                    done();
                })
        });

        it('prijava brez vseh podatkov', (done) => {
            let uporabnik = {
                email: "email@email.si"
            };
            chai.request(server)
                .post('/api/prijava')
                .send(uporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(400);
                    expect(odgovor.body).to.deep.equal({"sporočilo": "Zahtevani so vsi podatki"});
                    done();
                });
        });

        it('prijava s pravimi podatki', (done) => {
            let uporabnik = {
                email: "test@gmail.com",
                geslo: "12345678"
            };
            chai.request(server)
                .post('/api/prijava')
                .send(uporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(200);
                    odgovor.body.should.have.property('žeton');
                    done();
                });
        });
    });
});

describe('delnice', () => {
    describe('/GET delnice', () => {
        it('vrni vsa podjetja, ki jih hranimo v bazi', (done) => {
            chai.request(server)
                .get('/api/domaca-stran')
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(200);
                    odgovor.body.should.be.a('array');
                    odgovor.body.length.should.be.eql(504);
                    done();
                })
        });
    });

    describe('/GET zgodovinske podatke delnice AAPL', () => {
        it('vrni zgodovinske podatke podjetja AAPL', (done) => {
            chai.request(server)
                .get('/api/delnice/AAPL')
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(200);
                    odgovor.body.should.be.a('array');
                    done();
                })
        })
    });

});

describe('boti', () => {
    it('vrni vse bote', (done) => {
        chai.request(server)
            .get('/api/boti')
            .end((napaka, odgovor) => {
                odgovor.should.have.status(200);
                odgovor.body.should.be.a('array');
                odgovor.body.length.should.be.eql(3);
                done();
            })
    })
});

describe('trgovanje', () => {
    it('simuliraj nakup delnice izmisljenega bota', async () => {
        let botObjet = {
            bot: {
                ime: "bot123",
                izgubljeniDenar: 0,
                parameterInvesticije: 10000
            }
        };
        await kupiDelnico(botObjet, 'MRK')
            .then(function (data) {
                expect(data).to.equal();
            });
    });

    it('simuliraj prodajo delnice izmisljenega bota', async () => {
        let botObject = {
            bot: {
                ime: "bot123",
                pridobljeniDenar: 10,
                parameterInvesticije: 1000
            }
        };
        await prodajDelnico(botObject, 'MRK')
            .then(function (data) {
                expect(data).to.equal();
            });
    });

    it('simuliraj zadrzitev delnice izmisljenega bota', async () => {
        let botObject = {
            bot: {
                ime: "bot123"
            }
        };
        await zadrziDelnico(botObject, 'MRK');
    });

    describe('sprozi trgovanje', () => {
        it('aktiviraj bota bot1', (done) => {
            Bot.findOne({ime: "Bot1"})
                .exec((napaka, bot) => {
                    let body = {
                        bot: {
                            _id: bot._id
                        },
                        parameterInvesticije: 1000
                    };
                    chai.request(server)
                        .post('/api/trgovanje/zazeni')
                        .send(body)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(200);
                            expect(odgovor.body).to.deep.equal({odgovor: "Bot uspesno zagnan"});
                            done();
                        })
                });
        });

        it('sprozi trgovanje za vsakega zagnanega bota', async () => {
            await trgovanjeBota.sproziTrgovanje();
        });

        it('ustavi bota', (done) => {
            Bot.findOne({ime: "Bot1"})
                .exec((napaka, bot) => {
                    let body = {
                        _id: bot._id
                    };
                    chai.request(server)
                        .post('/api/trgovanje/zaustavi')
                        .send(body)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(201);
                            expect(odgovor.body).to.deep.equal({obvestilo: "bot uspesno ustavjen"});
                            done();
                        })
                });
        });
    });

    describe('posodobi napovedi', () => {
        it('posodobi napovedi', async () => {
            await trgovanjeBota.posodobiNapovedi();
        });

        it('klic za posodobitev napovedi', (done) => {
            let body = {
                podatki: [
                    {
                        high: 10,
                        low: 1
                    }
                ]
            };
            chai.request(server)
                .post('/api-napovedi/napovedi')
                .send(body)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(200);
                    odgovor.body.should.be.a('object');
                    done();
                })
        })
    });
});

describe('uporabniki', () => {
    it('pridobi vse uporabnike', (done) => {
        chai.request(server)
            .get('/api/uporabniki')
            .end((napaka, odgovor) => {
                odgovor.should.have.status(200);
                odgovor.body.length.should.be.eql(3);
                done();
            })
    });

    describe('pridobi uporabnika', () => {
        it('pridobi uporabnika z imenom Aljaz', (done) => {
            Uporabnik.findOne({ime: "Aljaz"})
                .exec((napaka, uporabnik) => {
                    chai.request(server)
                        .get('/api/uporabniki/' + uporabnik._id)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(200);
                            odgovor.body.should.be.a('object');
                            done();
                        })
                });
        })
    });

    describe('posodobi uporabnika', () => {
        it('posodobi email uporabniku testniUporabnik', (done) => {
            let posodobljeniUporabnik = {
                uporabniskoIme: "testniUporabnik",
                email: "test123@gmail.com"
            };
            Uporabnik.findOne({ime: "test"})
                .exec((napaka, uporabnik) => {
                    chai.request(server)
                        .put('/api/uporabniki/' + uporabnik._id)
                        .send(posodobljeniUporabnik)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(200);
                            odgovor.body.should.be.a('object');
                            done();
                        })
                })
        });
    });

    describe('posodobi sredstva', () => {
        it('dodamo sredstva uporabniku testniUporabnik', (done) => {
            Uporabnik.findOne({ime: "test"})
                .exec((napaka, uporabnik) => {
                    let posodobljeniUporabnik = {
                        denar: uporabnik.denar + 1000
                    };
                    chai.request(server)
                        .put('/api/uporabniki/' + uporabnik._id + '/denar')
                        .send(posodobljeniUporabnik)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(200);
                            odgovor.body.should.be.a('object');
                            done();
                        })
                });
        })
    });

    describe('nakup bota', () => {
        it('uporabnik testniUporabnik kupi bota Bot1', (done) => {
            Uporabnik.findOne({ime: "test"})
                .exec(async (napaka, uporabnik) => {
                    let bot = await Bot.findOne({ime: "Bot1"}).exec();
                    let posodobljeniUporabnik = {
                        denar: 1000,
                        seznamBotov: [bot._id]
                    };
                    chai.request(server)
                        .put('/api/uporabniki/' + uporabnik._id + '/nakup')
                        .send(posodobljeniUporabnik)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(200);
                            odgovor.body.should.be.a('object');
                            done();
                        })
                })
        })
    });

    describe('nadgradnja uporabnika', () => {
        it('uporabnika testniUporabnika nadgradimo v super uporabnika', (done) => {
            Uporabnik.findOne({ime: "test"})
                .exec((napaka, uporabnik) => {
                    let posodobljeniUporabnik = {
                        vloga: 1
                    };
                    chai.request(server)
                        .put('/api/uporabniki/' + uporabnik._id + '/vloga')
                        .send(posodobljeniUporabnik)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(200);
                            odgovor.body.should.be.a('object');
                            done();
                        })
                });
        });
    });

    describe('izbris bota iz osebne knjiznice', () => {
        it('uporabniku testniUporabnik odstranimo bota Bot1 iz knjiznice', (done) => {
            Uporabnik.findOne({ime: "test"})
                .exec((napaka, uporabnik) => {
                    let posodobljeniUporabnik = {
                        seznamBotov: []
                    };
                    chai.request(server)
                        .put('/api/uporabniki/' + uporabnik._id + '/knjiznica/izbris')
                        .send(posodobljeniUporabnik)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(200);
                            odgovor.body.should.be.a('object');
                            done();
                        })
                });
        })
    });

    describe('geslo', () => {
        it('preveri geslo uporabnika testniUporabnik - napacno geslo', (done) => {
            Uporabnik.findOne({ime: "test"})
                .exec((napaka, uporabnik) => {
                    let body = {
                        geslo: "123"
                    };
                    chai.request(server)
                        .post('/api/uporabniki/' + uporabnik._id + '/preveri-geslo')
                        .send(body)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(401);
                            odgovor.body.should.be.a('object');
                            done();
                        })
                });
        });

        it('preveri geslo uporabnika testniUporabnik - pravo geslo', (done) => {
            Uporabnik.findOne({ime: "test"})
                .exec((napaka, uporabnik) => {
                    let body = {
                        geslo: "12345678"
                    };
                    chai.request(server)
                        .post('/api/uporabniki/' + uporabnik._id + '/preveri-geslo')
                        .send(body)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(200);
                            odgovor.body.should.be.a('object');
                            done();
                        })
                });
        });

        it('spremeni geslo uporabniku testniUporabnik', (done) => {
            Uporabnik.findOne({ime: "test"})
                .exec((napaka, uporabnik) => {
                    let body = {
                        geslo: "123456789"
                    };
                    chai.request(server)
                        .post('/api/uporabniki/' + uporabnik._id + '/spremeni-geslo')
                        .send(body)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(200);
                            odgovor.body.should.be.a('object');
                            done();
                        })
                });
        })
    });

    describe('izbris uporabnika', () => {
        it('izbris uporabnika testniUporabnik', (done) => {
            Uporabnik.findOne({ime: "test"})
                .exec((napaka, uporabnik) => {
                    chai.request(server)
                        .delete('/api/uporabniki/' + uporabnik._id)
                        .end((napaka, odgovor) => {
                            odgovor.should.have.status(204);
                            done();
                        })
                });
        });
    })
});
