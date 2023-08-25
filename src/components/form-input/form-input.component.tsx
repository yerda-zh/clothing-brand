import {Group, FormInputLabel, Input} from './form-input.styles';
import { InputHTMLAttributes, FC } from 'react';

type FormInputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps>=({ label, ...otherProps })=>{
    return(
        <Group>
            <Input {... otherProps}/>
            {label && (
                <FormInputLabel shrink={Boolean( otherProps.value && otherProps.value === 'string' && otherProps.value.length)}>
                    {label}
                </FormInputLabel>
            )}
            {/* if the user enters smth, use 'shrick' style */}
        </Group>    
    )
}
export default FormInput;