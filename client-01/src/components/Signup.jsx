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

    return (
        <div>
            <div className="center">
              <table>
                <tbody><tr>
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
                        <input name="name" onChange={handleInputs} value={user.name} placeholder="First Name" type="email" /> 
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input name="email" onChange={handleInputs} value={user.email} type="email" placeholder="Email" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input name="phone" onChange={handleInputs} value={user.phone} type="email" placeholder="Phone" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input name="work" onChange={handleInputs} value={user.work} type="email" placeholder="Profession" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input name="password" onChange={handleInputs} value={user.password} placeholder="Password" type="password" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input name="cPassword" onChange={handleInputs} value={user.cPassword} placeholder="Confirm Password" type="password" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="terms">
                        <input id="checkid2" type="checkbox" defaultValue="test" /> <label htmlFor="checkid2">I accept the <a>Terms of Use</a> &amp; <a>Privacy Policy.</a></label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="submit" defaultValue="Register Now" />
                      </div>
                    </td>
                  </tr>
                </tbody></table>
              <footer>
                <p>Already have an account? <animate>Sign in</animate></p>
              </footer>
            </div>
        </div>
    )
}

export default Signup