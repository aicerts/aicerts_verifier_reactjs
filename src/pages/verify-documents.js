import React, { useState } from 'react';
import UploadCertificate from './upload-certificate';

const VerifyDocuments = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState({
        message: "",
        detailsQR: {}
    });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // @ts-ignore: Implicit any for children prop
    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (selectedFile) {
            try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append('pdfFile', selectedFile);

                const response = await fetch(`${apiUrl}/api/verify`, {
                    method: "POST",
                    body: formData,
                });

                const responseData = await response.json(); // Assuming response is in JSON format

                console.log("The Verification Data", responseData);
                setApiData(responseData);

            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            <UploadCertificate
                // @ts-ignore: Implicit any for children prop
                handleFileChange={handleFileChange}
                isLoading={isLoading}
                apiUrl={apiUrl}
                setApiData={setApiData}
                apiDataVerify={apiData}
            />
        </div>
    );
}

export default VerifyDocuments;
