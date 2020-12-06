import React from 'react';
import axios from 'axios';
import Layout from './Layout';

const Admin = () => {

axios({
    method: 'GET',
    url: `S{process.env.REACT_APP_API}/`
})

    return (
        <Layout>
            <h1>Admin Page</h1>
        </Layout>
    );
};

export default Admin;
