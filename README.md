# Ton API


## Description
O framework Nestjs foi escolhido por se tratar de uma pequena API Rest. Facilita bastante na construção de uma arquitetura limpa com injeções de dependencias, divisão de camadas (controller, use-case, service, repository) e isolamento de entidades. Além disso automatiza a construção do swagger e isola sa bibliotecas com baixo acoplamento. As entidades estão com suas validações centralizadas (class-validator, mongoose, e swagger annotations).
Os testes estão isolados em uma pasta à parte para não atrapalharem no build do projeto. Os testes unitários não cobrem todo o projeto porém estão cobrindo os pontos mais críticos onde concentram as regras de negócio. Os testes de integração estão marcados com *.2e2.spec.ts e carregam arquivos *.json na pasta seeds mockando os dados.
As exceptions estão sendo tratados por um catch global. Erros do tipo HttpException retornam mensagens customizadas através dos endpoints. O Sentry monitora os erros que eventualmente estourem em produção.
As configurações do webpack foram sugeridas pela propria documentação do Nestjs para ativar o modo (Hot-Module Replacement) permitindo rápido recarremento durante o desenvolvimento. O projeto foi hostado pelo Heruko.
O helmet intercepta os endpoints globalmente e traz medidas de segurança configuradas por default.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Test

```bash
# tests watch
$ npm run test:watch

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

```bash
# docker up
$ docker-compose up
```

## Deploy
https://ton-7653.herokuapp.com/docs