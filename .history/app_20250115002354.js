const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/drive';

document.getElementById('authorize-button').addEventListener('click', handleAuth);

function handleAuth() {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      scope: SCOPES,
    }).then(() => {
      gapi.auth2.getAuthInstance().signIn().then(listFiles);
    });
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
        <button onclick="transferFile('${file.id}')">Transfer</button>
      </div>
    `).join('');
  });
}

function transferFile(fileId) {
  const newOwnerEmail = prompt('Enter the email address of the new owner:');
  if (newOwnerEmail) {
    gapi.client.drive.permissions.create({
      fileId,
      resource: {
        role: 'owner',
        type: 'user',
        emailAddress: newOwnerEmail,
      },
      transferOwnership: true,
    }).then(() => alert('File ownership transferred successfully!'))
      .catch(err => console.error('Error transferring file:', err));
  }
}
