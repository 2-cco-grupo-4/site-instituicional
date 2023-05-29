import React from 'react';
import logo from '../../assets/img/picme.png';

const ContainerImg = () => {
  return (
    <div className="container-img">
      <div className="imagem">
        <img className="logo-form" src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default ContainerImg;
