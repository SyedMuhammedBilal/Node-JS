import React from 'react'
import './Signup.css'

const Signup = () => {
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
                        <input placeholder="First Name" type="text" /> <span><input placeholder="Last Name" style={{float: 'right'}} type="text" /></span>
                      </div>
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
                        <input placeholder="Confirm Password" type="password" />
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