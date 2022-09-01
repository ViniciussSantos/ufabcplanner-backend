<h1 align="center">
	<img alt="Logo" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  UFABCplanner - da UFABC para a UFABC.
</h3>

<p align="center">

<a href="https://github.com/UFABCplanner/ufabcplanner-backend/commits/dev">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/UFABCplanner/ufabcplanner-backend">
  </a>

  <a href="https://github.com/UFABCplanner/ufabcplanner-backend/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/UFABCplanner/ufabcplanner-backend">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/UFABCplanner/ufabcplanner-backend">

  <img alt="GitHub" src="https://img.shields.io/github/license/UFABCplanner/ufabcplanner-backend">
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalando">Instalando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Licença">Licença</a>
</p>

## 👨🏻‍💻 Sobre o projeto

<p >O projeto é baseado na necessidade de um organizador de estudos voltado aos padrões da UFABC, comportando todo o sistema de quadrimestres, aulas quinzenais e avaliações.</p>

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)

## 💻 Instalando

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

**Clone o repo e acesse a pasta**

```bash
$ git clone https://github.com/UFABCplanner/ufabcplanner-backend.git && cd UFABCplanner
```

**Siga os passos abaixo**

### Backend

```bash

# Instale as dependências
$ yarn install

# Suba um container do docker com uma instância do postgreSQL
$ docker-compose up

# Após a criação do container, rodamos os teste de integração
$ yarn test

# Com os testes realizados, rode as migrations
$ yarn dev:migration

# para finalizar, inicie a API
$ yarn dev

# Parabéns, você iniciou o projeto!
```

## 🤔 Como Contribuir

**Faça um fork do repo**

```bash
# Fork usando a CLI oficial do  GitHub
# Se você não tem a CLI do github instalada, utilize o site.

$ gh repo fork UFABCplanner/ufabcplanner-backend
```

**Siga os passos abaixo**

```bash
# Clone seu fork
$ git clone your-fork-url && cd NOME_DO_REPO

# Crie uma branch
$ git checkout -b NOME_BRANCH

# Faça um commit com as suas mudanças
$ git commit -m 'mensagem de commit'

# faça o push para a origin
$ git push origin NOME_BRANCH
```

Depois que o seu pull request for mergeado, você pode deletar a sua branch

## 📝 Licença

Este projeto está licenciado sobre a licença MIT - Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/marinhomateus">
        <img src="https://github.com/marinhomateus.png" width="100px;"/><br>
        <sub>
          <b>Mateus Marinho</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/wendellhichard">
        <img src="https://github.com/wendellhichard.png" width="100px;"/><br>
        <sub>
          <b>Hichard Wendell</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ViniciussSantos">
        <img src="https://github.com/ViniciussSantos.png" width="100px;"/><br>
        <sub>
          <b>Vinicius Santos</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/lucasajs">
        <img src="https://github.com/lucasajs.png" width="100px;"/><br>
        <sub>
          <b>Lucas Santos</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/estevesHERE">
        <img src="https://github.com/estevesHERE.png" width="100px;"/><br>
        <sub>
          <b>Leonardo Esteves</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/abacchi00">
        <img src="https://github.com/abacchi00.png" width="100px;"/><br>
        <sub>
          <b>André Bacchi</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
