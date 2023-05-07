// importing axios
import axios from "axios";

const saveToIPFS = async (file) => {
  // create a new multipart form data
  const formData = new FormData();
  // add file to the form data
  formData.append("file", file);

  var config = {
    method: "post",
    url: "https://api.web3.storage/upload",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYyMjMwMTA3MjViRjdjZjZENWMxNEM4MjI1YzQxQ2NBNmE0YTBjRTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODM0MjA2MDgwMTQsIm5hbWUiOiJZb3VUdWJlIn0.lmJkunklOEfjfyuVjtANCOYPQp1uullZrIpQcbxQSCY`,
      "Content-Type": "text/plain",
    },
    data: formData,
  };

  // Posting the form data to the IPFS API
  const response = await axios(config);
  // returning the CID
  return response.data.cid;
};

export default saveToIPFS;
