import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { InputInstruction } from "../InputInstruction/InputInstruction";

import './index.css'
import { ArrowLeft } from "../icons/ArrowLeft";
// const REGISTER_URL = '/register';
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Register = () => {
  // const navigate = useNavigate();

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
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const nextQuestion = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    if (!v1) {
      setErrMsg("Email is required");
      return;
    }
    console.log("pasa a la siguiente pregunta");
  };


  return (
    <div className="wrapper">
      <div>
        <Link to={"/"}><ArrowLeft /></Link>
        <p>Crear Cuenta</p>
      </div>
      <section>
        <h1>¿Cuál es tu correo electrónico?</h1>

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
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              placeholder="Email"
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
            <span>Deberás poder confirmarlo luego.</span>
          </div>
        </form>
        <button type="buton" onClick={nextQuestion}>
          Continuar
        </button>

        <div className="errRef">
          <p ref={errRef} className={`errmsg ${errMsg ? "visible" : ""}`} aria-live="assertive">
            {errMsg}
          </p>
        </div>
      </section>
    </div>
  );
};
