import { useNavigate } from "react-router-dom";
import "../styles/LogoutButton.css"
export function Logout({setCurrentUser}) {
    const nav = useNavigate()
    async function logout() {
        if (!confirm("Are you sure?")) {
            return;
        }
        const response = await fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=logout",{credentials: "include"}).then(response =>response.json());

        if (response["success"]) {
            setCurrentUser({});
            nav("/");
        } else {
            alert(response["message"]);
        }
    }
    return (
<button className="logout-button" onClick={logout}>
    <img
        src="https://img.icons8.com/ios-filled/50/logout-rounded.png"
        alt="Logout"
    />
</button>
    )
}