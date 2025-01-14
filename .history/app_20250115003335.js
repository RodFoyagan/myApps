const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
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
  });
}

function listFiles() {
  gapi.client.drive.files.list({
    pageSize: 10,
    fields: 'files(id, name)',
  }).then(response => {
    const files = response.result.files;
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = files.map(file => `
      <div>
        <span>${file.name}</span>
        <button onclick="transferOwnership('${file.id}')">Transfer Ownership</button>
      </div>
    `).join('');
  });
}

function transferOwnership(fileId) {
  const newOwner = prompt('Enter the email of the new owner:');
  if (newOwner) {
    gapi.client.drive.permissions.create({
      fileId,
      resource: {
        role: 'owner',
        type: 'user',
        emailAddress: newOwner,
      },
      transferOwnership: true,
    }).then(() => {
      alert('Ownership transferred successfully!');
    }).catch(err => {
      console.error('Error transferring ownership:', err);
      alert('Error transferring ownership. Check console for details.');
    });
  }
}
