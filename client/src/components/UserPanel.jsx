import Signup from "./Signup";
import Login from "./Login";

function UserPanel({ onLogin }) {
    return (
        <div className='userpanel'>
            <div className="form-container">
                <Signup onLogin={onLogin} />
            </div>
            <div className="form-container">
                <Login onLogin={onLogin} />
            </div>
        </div>
    );
}

export default UserPanel;