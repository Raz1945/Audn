import { useEffect, useRef, useState } from "react";
import { InputInstruction } from "../other/InputInstruction/InputInstruction";
import { useDispatch } from "react-redux";
import { updateEmail } from "../../app/features/emailSlice";

import './index.css'
import '../../validate.css'

import { Navbar } from "../other/Navbar/Navbar";

import { ButtonLink } from "../ButtonLink/ButtonLink";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Register = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();

  // Auto-focus en el campo de email al cargar
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // Validación del correo electrónico
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);

    if (!result && email) {
      setErrMsg('Correo electrónico no válido.');
    } else {
      setErrMsg('');
    }
  }, [email]);

  // Manejar cambios en el input y actualizar el estado global
  const handleChange = (e) => {
    setEmail(e.target.value);
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
              className={`register__input ${validEmail ? "valid" : ""} ${validEmail || !email ? "" : "invalid"}`}
            />

            {validEmail ? (
              <p className="register__input-text">Deberás poder confirmarlo luego.</p>) :
              <InputInstruction
                id="emailnote"
                focus={!emailFocus}
                refe={email}
                valid={validEmail}
              >
                Debe ser una dirección de correo electrónico válida.
              </InputInstruction>
            }
          </div>

          <div className="section__button">
            <ButtonLink
              state={validEmail ? 'active' : 'disabled'}
              text="Continuar"
              tabIndex={validEmail ? '3' : '-1'}
              to={validEmail ? "/register2" : null}
            />
          </div>
        </form>

        {/* // No es necesario aca */}
        {/* 
          <div className="errRef">
            <p ref={errRef} className={`errmsg ${errMsg ? "visible" : ""}`} aria-live="assertive">
              {errMsg}
            </p>
          </div> 
        */}
      </section>
    </div>
  );
};
