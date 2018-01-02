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
          <label>
            Full Name:
            <input type="text" name="name" />
          </label>

          <label>
            User Name:
            <input type="text" name="username" />
          </label>

          <label>
            Bio:
            <input type="text" name="bio" />
          </label>

          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}
export default Popup;
