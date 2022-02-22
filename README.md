# Ton API


## Description
O framework <strong>Nestjs</strong> foi escolhido por se tratar de uma pequena <strong>API Rest</strong>. Facilita bastante na construção de uma arquitetura limpa com injeções de dependencias, divisão de camadas <strong>(controller, use-case, service, repository)</strong> e isolamento de entidades. Além disso automatiza a construção do <strong>Aswagger</strong>A e isola sa bibliotecas com baixo acoplamento. As entidades estão com suas validações centralizadas <strong>(class-validator, mongoose, e swagger annotations).</strong> <br>
Os testes estão isolados em uma pasta à parte para não atrapalharem no build do projeto. Os testes unitários não cobrem todo o projeto porém estão cobrindo os pontos mais críticos onde concentram as regras de negócio. Os testes de integração estão marcados com <strong>*.2e2.spec.ts</strong> e carregam arquivos <strong>*.json</strong> na pasta <strong>seeds</strong> mockando os dados.<br>
As exceptions estão sendo tratados por um catch global. Erros do tipo <strong>HttpException</strong> retornam mensagens customizadas através dos endpoints. O <strong>Sentry</strong> monitora os erros que eventualmente estourem em produção.<br>
As configurações do webpack foram sugeridas pela propria documentação do Nestjs para ativar o modo <strong>(Hot-Module Replacement)</strong> permitindo rápido recarremento durante o desenvolvimento.<br>
O projeto está hostado pelo <strong>Heruko</strong>.<br>
O <strong>helmet</strong> intercepta os endpoints globalmente e traz medidas de segurança configuradas por default.

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
