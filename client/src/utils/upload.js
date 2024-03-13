import axios from "axios";

const upload = async (data) => {
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dw3bphpot/image/upload",
      data,
      {
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const { url } = res.data;
    console.log(url);
    return url;
  } catch (err) {
    console.log(err);
  }
  console.log(data);
};

// const handleFile1 = async (e) => {
//   e.preventDefault();

//   const files = e.target?.files;
//   if (files?.length > 0) {
//     const data = new FormData();
//     for (const file of files) {
//       data.append("file", file);
//     }
//     data.append("upload_preset", "fiverr");
//     const url = await upload(data);
//     setImageUrl([...imageUrl, url]);
//     // console.log("url", profileImage);
//   }
//   toast.success("File Uploaded");
// };

export default upload;
