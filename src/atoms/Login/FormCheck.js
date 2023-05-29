import React from 'react';

const FormCheck = () => {
  return (
    <div className="container-box">
      <div className="col-6">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">Manter-se conectado</label>
        </div>
      </div>
      <div className="recuperar-senha">
        <div className="esqueci-senha">
          Esqueci minha senha
        </div>
      </div>
    </div>
  );
};

export default FormCheck;
