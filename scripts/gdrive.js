define(['jquery'], function($) {

  var clientId = '498918469690-v1rl3r9lj2ie58b7r4rt107noiaefj17.apps.googleusercontent.com',
      apiKey = 'AIzaSyDVOa-rqMfk8MO3abpfH1_lyHpmYOcNNiQ',
      scopes = 'https://www.googleapis.com/auth/drive.file';

  window.handleClientLoad = function() {
    console.log('handleClientLoad called.');
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
  };

  function checkAuth() {
    gapi.auth.authorize({
      client_id: clientId,
      scope: scopes,
      immediate: true
    }, handleAuthResult);
  }

  function handleAuthResult(authResult) {
    $('#authButton').hide();
    $('#filePicker').hide();
    if (authResult && !authResult.error) {
      $('#filePicker').show();
    } else {
      $('#authButton').show();
      $('#authButton').click(function() {
        gapi.auth.authorize({
          client_id: clientId,
          scope: scopes,
          immediate: false
        }, handleAuthResult);
      });
    }
  }

  // now load the API
  require(['drive-api']);

});
