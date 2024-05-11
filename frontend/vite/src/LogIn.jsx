import { useEffect, useState } from "react";

function Login({onLogedIn}) {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    
    

        const handleSubmit = async () => {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName.trim(),
                    password: password.trim()
                }),
            });
            const answer = await response.json();
           setLoggedIn(answer)
           onLogedIn()
        };

  
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}

export default Login;
