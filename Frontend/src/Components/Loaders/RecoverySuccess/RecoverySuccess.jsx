import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from "../Loader/Loader";
import './index.css'


export const RecoverySuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/recoveryMsg');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div className="loader__screen">
        <div className="loader__pulse"></div>
        <Loader />
      </div>
    </>
  );
};
