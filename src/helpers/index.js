import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
};

const formattedDate = (date) => {
    return new Date(date).toLocaleDateString();
}

export { uploadFileOnCloudinary, exportToExcel, formattedDate };