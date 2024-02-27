import { useEffect, useRef, useState } from "react";
import { InputInstruction } from "../other/InputInstruction/InputInstruction";
import { ButtonStandard } from "../ButtonStandard/ButtonStandard";
import { useDispatch } from "react-redux";
import { updateEmail } from "../../app/features/emailSlice";

import './index.css'
import { Navbar } from "./navbar";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Register = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    setErrMsg('');
  }, [email]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmail(e.target.value);
    // console.log(e.target.value);
    dispatch(updateEmail(e.target.value));
  };

  return (
    <div className="register__wrapper">
      <Navbar
        to={'/login'}
        tabIndex='1'
        label='Ir a la página de inicio de sesión'
        text='Crear Cuenta'
      />

      <section className="section__wrapper">
        <h1 className="section__title">¿Cuál es tu correo electrónico?</h1>
        <form className="register__form">
          <label htmlFor="email" className="register__label">
            Correo electrónico:
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onChange={handleChange}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              placeholder="Audn@music.com"
              tabIndex="2"
              className={`register__input ${validEmail ? "valid" : ""
                } ${validEmail || !email ? "" : "invalid"}`}
            />
            <InputInstruction
              id="emailnote"
              focus={emailFocus}
              refe={email}
              valid={validEmail}
            >
              Must be a valid email address.
            </InputInstruction>
            <p className="register__input-text">Deberás poder confirmarlo luego.</p>
          </div>
        </form>
        {/* el div con la clase section__button, 
        hacen que el buttonStandard se desplace hacia abajo,
        sin afectar el foco del mismo  */}
        <div className="section__button"></div>
        <ButtonStandard
          state={validEmail ? 'active' : 'disabled'}
          text="Continuar"
          tabIndex='3'
          to={validEmail ? "/register2" : null}
        />
        <div className="errRef">
          <p ref={errRef} className={`errmsg ${errMsg ? "visible" : ""}`} aria-live="assertive">
            {errMsg}
          </p>
        </div>
      </section>
    </div>
  );
};
