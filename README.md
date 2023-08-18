# App 

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-in realizados pelo usuario logado;
- [x] Deve ser possivel o usuario obter o historico de check-in;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar uma academias pelo nome;
- [x] Deve ser possivel o usaurio relizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negocio)

- [x] O usuario não deve poder se cadastrar com um email duplicado;
- [x] O usuario não pode fazer 2 check-in no mesmo dia;
- [x] O usuario não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSql
- [x] Todas as listas devem estar listadas com 20 itens por pagina
- [ ] O usuario deve ser identificado por um JWT (JSON WEB TOKEN)