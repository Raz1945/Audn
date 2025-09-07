import SvgIcon from '@mui/material/SvgIcon';

const DefaultIcon = (props) => (
  <SvgIcon {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 4H14C17.3137 4 20 6.68629 20 10V20H10C6.68629 20 4 17.3137 4 14V4Z"
        fill="currentColor" // Para usar el color actual del componente
      />
    </svg>
  </SvgIcon>
);

export default DefaultIcon;