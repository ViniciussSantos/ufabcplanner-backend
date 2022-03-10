<h1 align="center">
	<!-- <img alt="Logo" src=".github/logo.png" width="200px" /> -->
  Logo da aplicação (Em construção)
</h1>

<h3 align="center">
  UFABCplanner - da UFABC para a UFABC.
</h3>

<p align="center">

<a href="https://github.com/ES-UFABC/UFABCplanner/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/ES-UFABC/UFABCplanner">
  </a>
  
  <a href="https://github.com/ES-UFABC/UFABCplanner/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/ES-UFABC/UFABCplanner">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/ES-UFABC/UFABCplanner">  
  
  <img alt="GitHub" src="https://img.shields.io/github/license/ES-UFABC/UFABCplanner">
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalando">Instalando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licenca">Licença</a>
</p>

## 👨🏻‍💻 Sobre o projeto

<p >O projeto é baseado na necessidade de um organizador de estudos voltado aos padrões de estudos da UFABC, comportando todo o sistema de quadrimestres, aulas quinzenais e avaliações.</p>

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/en/)
- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## 💻 Instalando

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

**Clone o repo e acesse a pasta**

```bash
$ git clone https://github.com/ES-UFABC/UFABCplanner.git && cd UFABCplanner
```

**Siga os passos abaixo**

### Backend

```bash
# Dentro da pasta root, vá para a pasta backend
$ cd backend

# Instale as dependências
$ yarn

# Suba um container do docker com uma instância do postgreSQL
$ docker-compose up

# Quando o container for criado com sucesso, rode as migrations
$ yarn migration:run

# para finalizar, inicie a API
$ yarn dev

# Parabéns, você iniciou o projeto!
```

### Frontend

_Obs.: Antes de continuar, verifique se a API foi iniciada_

```bash
# Dentro da pasta root, vá para a pasta frontend
$ cd frontend

# Instale as dependências
$ yarn

# Inicie o client
$ yarn start
```

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
