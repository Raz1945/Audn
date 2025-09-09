import './index.css'

export const Input_Checkbox = ({onChange}) => {
  return (
    <>
      <input type="checkbox" name="agree" id="check" className='check' onChange={onChange}/>

    </>
  )
}
