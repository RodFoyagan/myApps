const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with your Google Client ID
const API_KEY = 'YOUR_API_KEY'; // Replace with your Google API Key
const SCOPES = 'https://www.googleapis.com/auth/drive';

document.getElementById('authorize-button').addEventListener('click', () => {
  gapi.load('client:auth2', initClient);
});

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: SCOPES,
  }).then(() => {
    gapi.auth2.getAuthInstance().signIn().then(listFiles);
  }).catch(err => {
    console.error('Error initializing client:', err);
    alert('Failed to initialize Google API. Check your credentials.');
  });
}

function listFiles() {
  gapi.client.drive.files.list({
    pageSize: 10,
    fields: 'files(id, name)',
  }).then(response => {
    const files = response.result.files;
    const fileList = document.getElementById('file-list');
    if (files.length === 0) {
      fileList.innerHTML = '<p>No files found.</p>';
    } else {
      fileList.innerHTML = files.map(file => `
        <div>
          <span>${file.name}</span>
          <button onclick="transferOwnership('${file.id}')">Transfer Ownership</button>
        </div>
      `).join('');
    }
  }).catch(err => {
    console.error('Error listing files:', err);
    alert('Failed to fetch files. Check console for details.');
  });
}

function transferOwnership(fileId) {
  const newOwnerEmail = prompt('Enter the email address of the new owner:');
  if (newOwnerEmail) {
    gapi.client.drive.permissions.create({
      fileId: fileId,
      resource: {
        role: 'owner',
        type: 'user',
        emailAddress: newOwnerEmail,
      },
      transferOwnership: true,
    }).then(() => {
      alert('Ownership transferred successfully!');
    }).catch(err => {
      console.error('Error transferring ownership:', err);
      alert('Failed to transfer ownership. Check console for details.');
    });
  } else {
    alert('Email address is required to transfer ownership.');
  }
}
