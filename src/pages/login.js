import React, { useEffect, useState } from 'react';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bypass, setBypass] = useState(false); /** ---------J4F---------*/

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    document.body.style.backgroundImage = 'url(./background/bg.jpg)'; //Add background image to <body>
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const isSubmitDisabled = !((username && password) || bypass/** ---------J4F---------*/);
  const isInputDisabled = bypass; /** ---------J4F---------*/

  return (
    <div className="login animated bounceInLeft">
      <div className="logo">
        <h2>G&nbsp;</h2>
        <i className="fa-solid fa-dumbbell"></i>
        <h2>&nbsp;M</h2>
      </div>
      <div className="login-title">Đăng Nhập</div>
      <form className="login-form" method="POST" onSubmit={handleSubmit}>
        <input
          className="form-text"
          type="text"
          placeholder="Tên Đăng Nhập"
          value={username}
          disabled={isInputDisabled} /** ---------J4F---------*/
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-text"
          type="password"
          placeholder="Mật Khẩu"
          value={password}
          disabled={isInputDisabled} /** ---------J4F---------*/
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="checkbox">
          <input type="checkbox" id="bypass" onChange={(e) => setBypass(e.target.checked)}/>
          <label htmlFor="bypass"> Bypass Login</label> 
        </div>
        <input className="btn btn-submit" type="submit" value="Log In" disabled={isSubmitDisabled}/>
      </form>
    </div>
  );
};

export default Login;