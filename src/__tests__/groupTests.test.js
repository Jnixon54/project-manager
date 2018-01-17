import * as userReducer from './../ducks/reducers/userReducer'

describe('User Redux Testing: ', () => {
   
    test("should update action object for username", () => {
    expect(
      userReducer.updateUserInputField("Testing Username")
     
    ).toEqual({"payload": "Testing Username", "type": "UPDATE_USER_INPUT_FIELD"});
  });
  
  test("should update action object for password", () => {
    expect(
      userReducer.updatePasswordInputField("Testing Password")
     
    ).toEqual({"payload": "Testing Password", "type": "UPDATE_PASSWORD_INPUT_FIELD"});
  });
  
  test("should update action object for updating username", () => {
    expect(
      userReducer.updateDisplayNameField("Testing Update User")
     
    ).toEqual({"payload": "Testing Update User", "type": "UPDATE_DISPLAY_NAME_FIELD"});
  });
  
  test("should update action object for updating email", () => {
    expect(
      userReducer.updateEmailField("Testing Email")
     
    ).toEqual({"payload": "Testing Email", "type": "UPDATE_EMAIL_FIELD"});
  });
  
  
  test("should update action object for updating bio", () => {
    expect(
      userReducer.updateBioField("Testing Bio")
     
    ).toEqual({"payload": "Testing Bio", "type": "UPDATE_BIO_FIELD"});
  });
})