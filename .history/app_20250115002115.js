<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google File Transfer App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Google File Transfer</h1>
    <button id="login-button">Login with Google</button>
    <button id="logout-button" style="display:none;">Logout</button>

    <div id="file-list" style="display:none;">
      <h2>Select a File to Transfer</h2>
      <ul id="files"></ul>
      <label for="recipient-email">Recipient Email:</label>
      <input type="email" id="recipient-email" placeholder="Enter recipient email">
      <button id="transfer-button">Transfer File</button>
    </div>
  </div>

  <script src="https://apis.google.com/js/api.js"></script>
  <script src="https://apis.google.com/js/platform.js" async defer></script>
  <script src="app.js"></script>
</body>
</html>
