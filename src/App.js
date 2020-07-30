import React from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';
import Content from './containers/Content/Content';

function App() {
  

  return (
    <div className="App">
      <Layout >  
        <Content />
      </Layout>
    </div>
  );
}

export default App;
