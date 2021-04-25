import React from 'react'
import './Signup.css'

const Login = () => {
    return (
        <div>
            <div className="center">
              <table>
                <tbody><tr>
                    <td style={{width: '33.33%'}}>
                      <div className="dash" />
                    </td>
                    <td style={{padding: '0 6px'}}>
                      <h1>Login</h1>
                    </td>
                    <td style={{width: '33.33%'}}>
                      <div className="dash" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <p>Please enter your credentials.</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="email" placeholder="Email" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input placeholder="Password" type="password" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <input type="submit" defaultValue="Login" />
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

export default Login