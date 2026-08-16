import { Link } from "react-router-dom"
import "../../styles/SignUp.css";
export function SignUp() {
    async function submitSignUp(e){
        e.preventDefault(); 
        const form = new FormData(e.currentTarget);
        const account = Object.fromEntries(form.entries());

        const response =  await fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=signup", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body: JSON.stringify(account)
        }).then(response => response.json())

        if (response["sucesss"]) {
            alert(response["message"]);
            e.currentTarget.reset();
        }else{
            alert(response["message"]);
        }
    }
    return (
        <>
            <div className="signup-page">
                <div className="signup-container">
                    <h1>Sign Up</h1>

                    <form onSubmit={(e)=> submitSignUp(e)}>
                        <label htmlFor="user_name">User Name</label>
                        <input
                            type="text"
                            name="user_name"
                            id="user_name"
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                        />

                        <button type="submit">Sign Up</button>
                    </form>

                    <p>
                        Have an account? <Link to="/">Log-In</Link>
                    </p>
                </div>
            </div>
        </>
    )
}