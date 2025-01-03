import React, {useRef, useState} from 'react';
import {Viewer, Worker} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
// @ts-ignore
import SignatureCanvas from 'react-signature-canvas';
import {PDFDocument} from 'pdf-lib';
import { Analytics } from "@vercel/analytics/react"
function App() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadedSignature, setUploadedSignature] = useState<string | null>(null);
    const [darkMode, setDarkMode] = useState(false); // State for light/dark mode
    const sigPad = useRef<SignatureCanvas>(null);

    // Toggle light/dark mode
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    // Handles PDF file upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile && uploadedFile.type === 'application/pdf') {
            setFile(uploadedFile);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    // Clears the drawn signature
    const clearSignature = () => {
        sigPad.current?.clear();
    };

    // Handles signature upload
    const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile && uploadedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setUploadedSignature(e.target.result as string);
                }
            };
            reader.readAsDataURL(uploadedFile);
        } else {
            alert('Please upload a valid image file.');
        }
    };

    // Handles "Attest" functionality
    const handleAttest = async () => {
        if (!file || (!sigPad.current && !uploadedSignature)) {
            alert('Please upload a PDF and provide a signature first.');
            return;
        }

        try {
            const fileArrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileArrayBuffer);
            const newPdfDoc = await PDFDocument.create();

            const originalPages = pdfDoc.getPages();
            for (let i = 0; i < originalPages.length; i++) {
                const originalPage = originalPages[i];
                const {width, height} = originalPage.getSize();

                const isLastPage = i === originalPages.length - 1;
                const extraHeight = isLastPage ? 100 : 0;

                const newPage = newPdfDoc.addPage([width, height + extraHeight]);
                const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
                const embeddedPage = await newPdfDoc.embedPage(copiedPage);
                newPage.drawPage(embeddedPage, {x: 0, y: extraHeight, width, height});

                if (isLastPage) {
                    let signatureImageBytes;

                    if (uploadedSignature) {
                        if (!uploadedSignature.startsWith('data:image')) {
                            alert('Invalid signature image format.');
                            return;
                        }
                        signatureImageBytes = await fetch(uploadedSignature).then((res) =>
                            res.arrayBuffer()
                        );
                    } else {
                        const signatureImage = sigPad.current?.toDataURL('image/png');
                        signatureImageBytes = await fetch(signatureImage!).then((res) =>
                            res.arrayBuffer()
                        );
                    }

                    const signatureImageEmbed = await newPdfDoc.embedPng(signatureImageBytes);
                    newPage.drawImage(signatureImageEmbed, {
                        x: 50,
                        y: 20,
                        width: 200,
                        height: 50,
                    });
                }
            }

            const pdfBytes = await newPdfDoc.save();
            const blob = new Blob([pdfBytes], {type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'attested-document.pdf';
            link.click();
        } catch (error) {
            console.error('Error while attesting the document:', error);
        }
    };

    const handlePDFDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    // Handles drag-and-drop for Signature
    const handleSignatureDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setUploadedSignature(e.target.result as string);
                }
            };
            reader.readAsDataURL(droppedFile);
        } else {
            alert('Please upload a valid image file.');
        }
    };


    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: darkMode ? '#121212' : '#f0f0f0',
                color: darkMode ? '#ffffff' : '#000000',
                minHeight: '100vh', // Ensures the body occupies the full viewport
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Centers the content horizontally
                justifyContent: 'flex-start', // Ensures content starts at the top
                boxSizing: 'border-box',
            }}
        >
            {/* Dark Mode Toggle */}
            <div style={{textAlign: 'right', marginBottom: '20px', width: '100%'}}>
                <button
                    onClick={toggleDarkMode}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: darkMode ? '#ffffff' : '#121212',
                        color: darkMode ? '#121212' : '#ffffff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'inline-block',
                        fontSize: '16px',
                        marginTop: '20px'
                    }}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>

            <h1>Document Attestation with Signature</h1>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handlePDFDrop}
                style={{
                    padding: '20px',
                    border: `2px dashed ${darkMode ? '#ffffff' : '#ccc'}`,
                    borderRadius: '10px',
                    textAlign: 'center',
                    width: '80%',
                    backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                }}
            >
                <p>Drag and drop your document to be attested here or click to upload. (Only .pdf files)</p>

                <label
                    style={{
                        padding: '10px 20px',
                        backgroundColor: darkMode ? '#ffffff' : '#121212',
                        color: darkMode ? '#121212' : '#ffffff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'inline-block',
                        textAlign: 'center',
                    }}
                >
                    Upload PDF
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        style={{
                            display: 'none', // Hide the default input
                        }}
                    />
                </label>
            </div>

            <div
                style={{
                    margin: '20px 0',
                    border: `1px solid ${darkMode ? '#ffffff' : '#ccc'}`,
                    // not more than 70% of the view port

                    width: '80%', // Ensures responsive design
                    overflow: 'auto',
                    backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                }}
            >
                {file && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer fileUrl={URL.createObjectURL(file)}/>
                    </Worker>
                )
                }
            </div>

            <h2>Provide Your Signature</h2>

            {/* Draw Signature */}
            <div
                style={{
                    border: `2px dashed ${darkMode ? '#ffffff' : '#ccc'}`,
                    padding: '10px',
                    maxWidth: '500px',
                    maxHeight: '150px',
                    backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                }}
            >
                <SignatureCanvas
                    ref={sigPad}
                    penColor="black"
                    canvasProps={{
                        width: 300,
                        height: 120,
                        className: 'sigCanvas',
                    }}
                />
            </div>
            <div style={{margin: '10px 0'}}>
                <button onClick={clearSignature} style={{
                    padding: '10px 20px',
                    backgroundColor: darkMode ? '#ffffff' : '#121212',
                    color: darkMode ? '#121212' : '#ffffff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    fontSize: '16px',
                }}>Clear Signature
                </button>
            </div>
            <h2>Or Upload Signature</h2>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleSignatureDrop}
                style={{
                    padding: '20px',
                    border: `2px dashed ${darkMode ? '#ffffff' : '#ccc'}`,
                    borderRadius: '10px',
                    textAlign: 'center',
                    width: '80%',
                    backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                }}
            >
                <p>Drag and drop your signature image here or click to upload. (Only .png file)</p>
                <label
                    style={{
                        padding: '10px 20px',
                        backgroundColor: darkMode ? '#ffffff' : '#121212',
                        color: darkMode ? '#121212' : '#ffffff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'inline-block',
                    }}
                >
                    Upload Signature
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleSignatureUpload}
                        style={{
                            display: 'none',
                        }}
                    />
                </label>
            </div>
            {uploadedSignature && (
                <div>
                    <p>Uploaded Signature Preview:</p>
                    <img src={uploadedSignature} alt="Uploaded Signature" style={{width: '200px'}}/>
                </div>
            )}

            <button onClick={handleAttest} style={{
                padding: '10px 20px',
                backgroundColor: darkMode ? '#ffffff' : '#121212',
                color: darkMode ? '#121212' : '#ffffff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'inline-block',
                fontSize: '16px',
                marginTop: '20px'
            }}>
                Attest and Download
            </button>

            {/* Author Information */}
            <p style={{
                marginTop: '20px',
                fontSize: '14px',
                color: darkMode ? '#ffffff' : '#000000',
                textAlign: 'center',
            }}>
                Author: <a
                href="https://www.linkedin.com/in/derrick-dsouza-007"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: darkMode ? '#4da6ff' : '#0066cc', textDecoration: 'none' }}
            >
                Derrick Dsouza
            </a>
            </p>
            <Analytics />
        </div>
    );
}



export default App;