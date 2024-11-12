import React from 'react';
import SiderbarMenu from '../../organisms/siderbarMenu/SiderbarMenu';

export const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SiderbarMenu />
      <div style={{ marginLeft: '250px', padding: '1rem', width: '100%' }}>
        Home Content
      </div>
    </div>
  );
};

export default Home;
