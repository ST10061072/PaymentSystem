import { userState, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Register() {
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        // Regular expression patterns
        const namePattern = /^[A-Za-z\s]+$/; // Name pattern
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Email pattern
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/; // Password pattern
        const idPattern = /^\d{13}$/; // ID pattern 

        // Validate Name
        if (!namePattern.test(name)) {
            setError("Name can only contain letters and spaces.");
            return;
        }

        // Validate Email
        if (!emailPattern.test(email)) {
            setError("Invalid email format.");
            return;
        }

        // Validate Password
        if (!passwordPattern.test(password)) {
            setError("Password must be at least 8 characters long and contain at least one letter and one number.");
            return;
        }
        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        // Validate ID
        if (!idPattern.test(id)) {
            setError("ID must be a string of exactly 13 digits.");
            return;
        }
        // Clear the error if passwords match
        setError("");
        axios.post('https://localhost:3000/register', {
            name, surname, email, password, confirmPassword, id
        })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => {
                if (err.response && err.response.data.message) {
                    // Display the error message from the server
                    setError(err.response.data.message);
                } else {
                    // Fallback error message
                    setError(`An error occurred: ${err.message}`)
                    console.error('Error during user registration:', err);
                }
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25" style={{ minHeight: "400px" }}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Surname</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Surname"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0 "
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>ID</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter ID"
                            autoComplete="off"
                            name="id"
                            className="form-control rounded-0 "
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0 "
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Confirm password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already have account?</p>
                <Link to="/login" className="btn btn-default border w-100 rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Register;