import { Link } from "react-router-dom"
import "../../styles/Login.css"
export function Login() {

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