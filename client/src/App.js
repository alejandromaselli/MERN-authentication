import React from 'react';
import Layout from './components/layout/Layout';
import { isAuth } from './components/auth/helpers'

const App = () => {
  return (
    <Layout>
      {
        isAuth() ? (
          <h1>Bienvenido Hermano {isAuth().name}!</h1>
        ) : <h1>Inicie sesión <b>POR LA GRAN PUTA</b></h1>
      }

    </Layout>
  )
}

export default App
