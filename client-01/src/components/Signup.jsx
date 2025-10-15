import React,{ useState } from 'react'
import './Signup.css'

const Signup = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        work: '',
        password: '',
        cPassword: ''
    })

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]:value })
    }

    const PostData = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const { name, email, phone, work, password, cPassword } = user

        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cPassword
            })
        })

        const data = await res.json();

        if(res.status === 422 || !data) { // Check res.status for proper error handling
            window.alert('Invalid Registration')
            console.log('Invalid Registration')
        } else {
            window.alert('Successful Registration')
            console.log('Successful Registration')
        }
    }

    return (
        <div>
            <form method="POST" className="center">
              <table>
                <tbody>
                  <tr>
                    <td style={{width: '33.33%'}}>
                      <div className="dash" />
                    </td>
                    <td style={{padding: '0 6px'}}>
                      <h1>Register</h1>
                    </td>
                    <td style={{width: '33.33%'}}>
                      <div className="dash" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <p>Create your account. It's free and only takes a minute.</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="text" name="name" value={user.name} onChange={handleInputs} placeholder="Your Name" required="true" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="email" name="email" value={user.email} onChange={handleInputs} placeholder="Email" required="true" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="text" name="phone" value={user.phone} onChange={handleInputs} placeholder="Phone" required="true" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="text" name="work" value={user.work} onChange={handleInputs} placeholder="Your Profession" required="true" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="password" name="password" value={user.password} onChange={handleInputs} placeholder="Password" required="true" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="password" name="cPassword" value={user.cPassword} onChange={handleInputs} placeholder="Confirm Password" required="true" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="terms">
                        <input type="checkbox" name="checkbox" />
                        <label htmlFor="checkbox">I accept the Terms of Use &amp; Privacy Policy.</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={PostData} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <footer>
                        <p>Already have an account? <a href="/signin">Sign in</a></p>
                      </footer>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
        </div>
    )
}

export default Signup