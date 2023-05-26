import axios from "axios";
export const UploadFileToPinata = async (data) => {
  // Create a FormData object
  const formData = new FormData();
  formData.append("file", data);
  // Replace with your own Pinata API credentials
  const API_KEY = "91e47c2b0c2fb1bfdb39";
  const API_SECRET ="79fa2ea950c421be5a727e0eeaf63581430a26f573458ece26f259da5ec521f9";
  // Set up the request headers
  const headers = {
    "Content-Type": "multipart/form-data",
    pinata_api_key: API_KEY,
    pinata_secret_api_key: API_SECRET,
  };
  try {
    // Send the POST request to Pinata
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers,
      }
    );
    // Handle the response
    const pinHash = response.data.IpfsHash;
    return pinHash;
  } catch (error) {
    console.log(error);
    return error;
  }
};
