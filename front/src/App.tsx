import React from 'react';
import './App.css';
import Task from './Componentes/tasks'

// const deafultUser = {
//   name: 'Default User',
//   email: "default@user.com",
//   password: "Senha"
// };

const checkUser = () => {
  const defaultUser = {
    name: "Default User",
    email: "defaulto@user.com",
    password: "Senha"
  };

  const requestOptions1 = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  const resposta = fetch('http://localhost:5000/user/' + defaultUser.email, requestOptions1).then(response => {

    if (response.status === 200) {
      return response
    } else {


      const requestOptions2 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultUser)
      }
      console.log({ body: requestOptions2.body })

      fetch('http://localhost:5000/user', requestOptions2).then(response => {
        return response
      })

    }
  })


  const requestOptions2 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(defaultUser)
  }
  console.log({ body: requestOptions2.body })

  fetch('http://localhost:5000/user', requestOptions2).then(response => {
    return response
  })
  return resposta;
}


function App() {
  const teste = checkUser();
  console.log({ teste: teste });

  return (

    <div className="App">
      <Task />
    </div>
  );
}

export default App;
