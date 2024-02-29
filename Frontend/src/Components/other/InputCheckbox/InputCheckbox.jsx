import './index.css'

export const InputCheckbox = ({onChange}) => {
  return (
    <>
      <input type="checkbox" name="agree" id="check" className='check' onChange={onChange}/>

    </>
  )
}
