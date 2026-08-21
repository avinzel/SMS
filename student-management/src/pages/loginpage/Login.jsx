import { Link,useNavigate } from "react-router-dom"
import "../../styles/Login.css"
export function Login( {setCurrentUser}) {
    const navigate = useNavigate();
    async function submitLogin(e){
        e.preventDefault();
        const formEl = e.currentTarget;
        const form = new FormData(formEl);
        const account = Object.fromEntries(form.entries()) ;
        
        const response = await fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(account),
            credentials: "include"
        }).then(response => response.json())

        if (response["success"]) {
            console.log(response["account"]);
            alert(response["message"]);
            setCurrentUser(response["account"])
            formEl.reset();
            navigate("/students");
        }else{
            alert(response["message"]);
        }
    }  

    return (
        <>
            <section className="login-page">
                <div className="login-form-container">
                    <h1>Log In</h1>

                    <form onSubmit={(e) => submitLogin(e)}>
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

                        <button type="submit">Log In</button>
                    </form>

                    <p>
                        No account? <Link to="/signup">Sign-Up</Link>
                    </p>
                </div>
            </section>
        </>
    )
}