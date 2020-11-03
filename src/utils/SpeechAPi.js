export function authenticate() {
  return gapi.auth2.getAuthInstance()
    .signIn({
      scope: "https://www.googleapis.com/auth/cloud-platform"
    })
    .then(function () {
        console.log("Sign-in successful");
      },
      function (err) {
        console.error("Error signing in", err);
      });
}

export function loadClient() {
  gapi.client.setApiKey("YOUR_API_KEY");
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/speech/v1/rest")
    .then(function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      });
}

export function execute() {
  return gapi.client.speech.speech.recognize({
      "resource": {
        "audio": {
          "uri": "https://file-examples-com.github.io/uploads/2017/11/file_example_WAV_1MG.wav"
        }
      }
    })
    .then(function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      });
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({
    client_id: "YOUR_CLIENT_ID"
  });
});
// Make sure the client is loaded and sign-in is complete before calling this method.
