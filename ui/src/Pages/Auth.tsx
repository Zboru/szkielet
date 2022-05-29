import { useState } from "react";
import LogInForm from "../Components/Auth/LogInForm";
import RegisterForm from "../Components/Auth/RegisterForm";

export default function Auth() {
    const [componentState, setComponent] = useState(false);

    return (
        <div>
            {componentState
                ? <LogInForm handleRegisterClick={() => setComponent(false)} />
                : <RegisterForm handleLoginClick={() => setComponent(true)} />
            }
        </div>
    )
}