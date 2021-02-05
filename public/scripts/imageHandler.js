const url = 'YOUR_CLOUDINARY_URL';

export default (image) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('api_key', 'YOUR_API_KEY');
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data.url);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
