// import React, { Component } from 'react';

// export default class Popup extends Component {
//   render() {
//     return (
//       <div className="popup">
//         <h1> Form </h1>
//       </div>
//     );
//   }
// }

import React, { Component } from 'react';

class Popup extends Component {
  render() {
    return (
      <div className="popup">
        {/* <h1> Form </h1> */}
        <form>
          <div className="changeForm">
            <h3>Change Name and Bio</h3>
            <label>
              Full Name:
              <input type="text" name="name" />
            </label>
            <br />

            <label>
              User Name:
              <input type="text" name="username" />
            </label>
            <br />

            <label>
              Bio:
              <input type="text" name="bio" />
            </label>
            <br />

            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    );
  }
}
export default Popup;
