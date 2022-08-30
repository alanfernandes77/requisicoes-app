# Sistema de Requisições
#### *Angular CLI 13.3.6*

## Como configurar
Crie a pasta **environments** dentro de src e inclua o arquivo environment.ts com a sua chave de aplicação do firebase.

O arquivo **environment.ts** deve exportar uma constante contendo as informações que obtidas nas configurações de projeto do Console do Firebase.

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  }
};
```

## Servindo a aplicação
No terminal, instale as dependências do node_modules pelo npm.

```
npm install
```

Sirva a aplicação através da Angular CLI.

```
ng serve --o
```

A flag --o sinaliza à CLI para abrir a aplicação no seu navegador padrão.
