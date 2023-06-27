import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import {Container} from './authentication.styles.jsx';


const Authentication=()=>{
    return (
        <Container>
            <SignInForm/>
            <SignUpForm/>
        </Container>
    );
}
export default Authentication;