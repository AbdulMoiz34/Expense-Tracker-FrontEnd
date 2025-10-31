const uploadFileOnCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("upload_preset", 141424243);
    formData.append("file", file);

    try {

        const res = await fetch("https://api.cloudinary.com/v1_1/moiz34/image/upload", {
            body: formData,

            method: "POST"
        });
        const data = await res.json();

        return data.secure_url;
    } catch (err) {
        console.log(err)
    }
}

export { uploadFileOnCloudinary };