const request = require('supertest');
const User = require('../../src/models/User');
const host = 'http://localhost:443';
let token = null;

const userData = {
    name: 'teste',
    email: 'arturgpr2@hotmail.com',
    password: '1291829',
    cpf: 12345678911,
    cellphone: 12128119182
};

const adminData = {
    name: 'teste admin',
    email: 'asdasdasd@asdadasd.com',
    password: '1291829',
    cpf: 12345678912,
    cellphone: 12128119182
};

describe('Usuários', () => {
    it('Usuário Externo -> deve criar um usuário', async () => {
        const response = await request(host)
            .post('/usuarios/cadastrar')
            .send(userData);

        expect(response.status).toBe(200);
    });

    it('Usuário Externo -> deve falhar ao cadastrar com cpf inválido', async () => {
        const response = await request(host)
            .post('/usuarios/cadastrar')
            .send({
                ...userData,
                cpf: 121121
            });

        expect(response.status).toBe(400);
    });

    it('Usuário Externo -> deve falhar ao duplicar e-mail e/ou cpf', async () => {
        const response = await request(host)
            .post('/usuarios/cadastrar')
            .send(userData);

        expect(response.status).toBe(400);
    });

    it('Usuário Externo -> deve autenticar', async () => {
        const response = await request(host)
            .post('/usuarios/entrar')
            .send({
                email: userData.email,
                password: userData.password
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('Usuário Externo -> deve falhar ao autenticar com senha incorreta', async () => {
        const response = await request(host)
            .post('/usuarios/entrar')
            .send({
                email: userData.email,
                password: '232322323'
            });

        expect(response.status).toBe(401);
        expect(response.body.token).toBeUndefined();
    });

    it('Usuário Externo -> deve falhar ao acesar função do diretor financeiro', async () => {
        const response = await request(host)
            .get('/usuarios/listar/?offset=0&limit=100');

        expect(response.status).toBe(401);
    });

    // it('Usuário Externo -> deve ter sucesso ao recuperar senha', async () => {
    //     const response = await request(host)
    //         .post('/usuarios/recuperar')
    //         .send({
    //             email: userData.email,
    //             cpf: userData.cpf
    //         });

    //     expect(response.status).toBe(200);
    // }, 15000);

    it('Diretor Financeiro -> deve criar um usuário', async () => {
        const response = await request(host)
            .post('/usuarios/cadastrar')
            .send(adminData);

        expect(response.status).toBe(200);

        const updated = await User.update({
            admin: true
        }, {
            where: {
                email: adminData.email,
                cpf: adminData.cpf
            }
        });

        expect(updated[0]).toBe(1);
    });

    it('Diretor Financeiro -> deve autenticar', async () => {
        const response = await request(host)
            .post('/usuarios/entrar')
            .send({
                email: adminData.email,
                password: adminData.password
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });

    it('Diretor Financeiro -> deve ter sucesso ao listar usuários', async () => {
        const response = await request(host)
            .get('/usuarios/listar/?offset=0&limit=100')
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('Diretor Financeiro -> desativar usuário', async () => {
        const userTeste = await User.findOne({
            where: {
                cpf: userData.cpf,
                email: userData.email
            }
        });

        const response = await request(host)
            .post('/usuarios/alterarPermissao/' + userTeste.id)
            .send({
                'admin': true
            }).set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });
});

describe('Configurações', () => {
    it('Atualizar SMTP', async () => {
        const response = await request(host)
            .post('/configuracoes/editarSmtp')
            .send({
                user: 'teste',
                password: 'teste',
                port: 587,
                host: 'smtp-mail.outlook.com'
            }).set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });
});

describe('Contas a Pagar', () => {
    const data = {
        identification: "testeabcdedggasdhasiud",
        due_date: '20/11/2021',
        paid: false,
        payday: null,
        amount: null
    };
    let id = null;

    it('Criar', async () => {
        const response = await request(host)
            .post('/contasPagar')
            .send(data)
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('Listar', async () => {
        const response = await request(host)
            .get('/contasPagar/listar')
            .send()
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
        response.body.data.forEach((conta) => {
            if (conta.identification === data.identification) {
                id = conta.id;
                return;
            }
        });
    });

    it('Atualizar', async () => {
        const response = await request(host)
            .put(`/contasPagar/${id}`)
            .send({
                ...data,
                paid: true,
                payday: '20/05/2021',
                amount: 1.00
            }).set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('Deletar', async () => {
        const response = await request(host)
            .delete(`/contasPagar/${id}`)
            .send()
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });
});

describe('Contas a Receber', () => {
    const data = {
        identification: "testeabcdedggasdhasiud",
        due_date: '20/11/2021',
        paid: false,
        payday: null,
        amount: null
    };
    let id = null;

    it('Criar', async () => {
        const response = await request(host)
            .post('/contasReceber')
            .send(data)
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('Listar', async () => {
        const response = await request(host)
            .get('/contasReceber/listar')
            .send()
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
        response.body.data.forEach((conta) => {
            if (conta.identification === data.identification) {
                id = conta.id;
                return;
            }
        });
    });

    it('Atualizar', async () => {
        const response = await request(host)
            .put(`/contasReceber/${id}`)
            .send({
                ...data,
                paid: true,
                payday: '20/05/2021',
                amount: 1.00
            }).set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('Deletar', async () => {
        const response = await request(host)
            .delete(`/contasReceber/${id}`)
            .send()
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });
});

describe('Eventos', () => {
    const eventData = {
        name: 'Evento teste',
        date: '15/12/2021',
        local: 'Unisinos'
    };
    let id = null;

    it('Criar', async () => {
        const response = await request(host)
            .post('/eventos')
            .send(eventData)
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('Listar', async () => {
        const response = await request(host)
            .get('/eventos/listar')
            .send()
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
        response.body.data.forEach((evento) => {
            if (evento.name === evento.name) {
                id = evento.id;
                return;
            }
        });
    });

    it('Atualizar', async () => {
        const response = await request(host)
            .put(`/eventos/${id}`)
            .send({
                ...eventData,
                date: '26/12/2021'
            }).set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('Deletar', async () => {
        const response = await request(host)
            .delete(`/eventos/${id}`)
            .send()
            .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });
});

describe('Finalização', () => {
    it('Excluir usuários usados', async () => {
        await User.destroy({
            where: {
                name: userData.name,
                email: userData.email,
                cpf: userData.cpf,
                cellphone: userData.cellphone
            }
        });

        await User.destroy({
            where: {
                email: adminData.email,
                cpf: adminData.cpf
            }
        });
    });
});
