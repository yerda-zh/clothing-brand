import './form-input.styles.scss';

const FormInput=({ label, ...otherProbs })=>{
    return(
        <div className="group">
            <input className="form-input" {... otherProbs}/>
            {label && (
                <label 
                    className={`${
                        otherProbs.value.length ? 'shrink': ''
                    } form-input-label`}
                >
                    {label}
                </label>
            )}
            {/* if the user enters smth, use 'shrick' style */}
        </div>    
    )
}
export default FormInput;