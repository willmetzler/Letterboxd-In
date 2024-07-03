import Signup from "./Signup";
import Login from "./Login";

function UserPanel({ onLogin }) {
    return (
        <div>
            <Signup onLogin={onLogin} />
            <br />
            <br />
            <Login onLogin={onLogin} />
        </div>
    );
}

export default UserPanel;