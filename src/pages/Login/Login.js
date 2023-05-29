import "../../login.css";
import React from 'react';
import logo from '../../assets/img/picme.png';
import backgroundImage from '../../assets/img/fotografo.jpg';
import ContainerImg from '../../atoms/Login/ContainerImg';
import DivBgLogin from '../../atoms/Login/DivBgLogin';
import EmailInput from '../../atoms/Login/EmailInput';
import FormCheck from '../../atoms/Login/FormCheck';
import InstagramConnect from '../../atoms/Login/InstagramConnect';
import Labels from '../../atoms/Login/Labels';
import LoginButton from '../../atoms/Login/LoginButton';
import PasswordInput from '../../atoms/Login/PasswordInput';
import RegisterLink from '../../atoms/Login/RegisterLink';

const Login1 = () => {

    const emailLabelText = 'Email:';
    const senhaLabelText = 'Senha:';

    return (
        <div className='tela-login'>
            <div className='row-login'>
                <DivBgLogin />

                <div className='div-form-login'>
                    <div className="container">
                        <div className='form-login'>
                            <ContainerImg  />
                            <h1 className="login">Login</h1>
                            <div className="dados-login"></div>
                            <Labels text={emailLabelText} />
                            <EmailInput />
                            <Labels text={senhaLabelText} />
                            <PasswordInput />
                            <FormCheck />
                            <LoginButton />
                            <InstagramConnect />
                            <RegisterLink />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login1;