function exampleController($scope) {
  var ctrl = this;
  ctrl.onSignInSubmit = function() {
    var phoneNumber = "+1" + ctrl.user.mobile;
    var appVerifier = window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function(confirmationResult) {
        ctrl.hasCodeToVerify = true;
        console.log("confirmationResult", confirmationResult);
        window.confirmationResult = confirmationResult;
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };

  window.recaptchaVerifier = new firebase.auth
    .RecaptchaVerifier("phone-sign-in-recaptcha", {
    size: "invisible",
    callback: function(response) {
      // reCAPTCHA solved - will proceed with submit function
      console.log(response);
    },
    "expired-callback": function() {
      // Reset reCAPTCHA?
    }
  });
}

angular
  .module("example", ["firebase"])
  .config(function() {
    var config = {
      apiKey: "AIzaSyDLcUERmAo-h7uwJ5sxxOL1ZXUF1ie10vg",
      authDomain: "my-test-project-b566a.firebaseapp.com",
      databaseURL: "https://my-test-project-b566a.firebaseio.com",
      projectId: "my-test-project-b566a",
      storageBucket: "",
      messagingSenderId: "1097529355485"
    };
    firebase.initializeApp(config);
  })
  .controller("exampleController", exampleController);
