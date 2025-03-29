import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { attestPdf, readFileAsDataURL } from '../utils/pdfUtils';

const useAttestation = () => {
  // State variables
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(null);
  const [attestedPdfUrl, setAttestedPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [hasSignature, setHasSignature] = useState(false);
  const [applicationStarted, setApplicationStarted] = useState(false);
  
  // References
  const sigPad = useRef<SignatureCanvas>(null);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  // Start the application
  const startApplication = () => {
    setApplicationStarted(true);
  };
  
  // Navigation functions
  const goToNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Reset the process
  const resetProcess = () => {
    setFile(null);
    setUploadedSignature(null);
    setCurrentStep(0);
    setAttestedPdfUrl(null);
    if (sigPad.current) {
      sigPad.current.clear();
    }
    setHasSignature(false);
  };
  
  // Clear the signature
  const clearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
      setHasSignature(false);
    }
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };
  
  // Handle PDF drop
  const handlePDFDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };
  
  // Handle signature upload
  const handleSignatureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      try {
        const dataUrl = await readFileAsDataURL(selectedFile);
        setUploadedSignature(dataUrl);
      } catch (error) {
        console.error("Error reading signature file:", error);
      }
    }
  };
  
  // Handle signature drop
  const handleSignatureDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      try {
        const dataUrl = await readFileAsDataURL(droppedFile);
        setUploadedSignature(dataUrl);
      } catch (error) {
        console.error("Error reading signature file:", error);
      }
    }
  };
  
  // Handle signature drawing
  const handleSignatureEnd = () => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      setHasSignature(true);
    }
  };
  
  // Handle attestation
  const handleAttest = async () => {
    if (!file) return;
    
    let signatureDataUrl: string;
    
    if (uploadedSignature) {
      signatureDataUrl = uploadedSignature;
    } else if (sigPad.current && !sigPad.current.isEmpty()) {
      signatureDataUrl = sigPad.current.toDataURL('image/png');
    } else {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const url = await attestPdf(file, signatureDataUrl);
      setAttestedPdfUrl(url);
      setCurrentStep(2); // Move to download step
    } catch (error) {
      console.error("Error attesting document:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    darkMode,
    currentStep,
    file,
    uploadedSignature,
    attestedPdfUrl,
    isProcessing,
    showExplanation,
    hasSignature,
    applicationStarted,
    sigPad,
    toggleDarkMode,
    startApplication,
    goToNextStep,
    goToPreviousStep,
    resetProcess,
    clearSignature,
    handleFileChange,
    handlePDFDrop,
    handleSignatureUpload,
    handleSignatureDrop,
    handleAttest,
    handleSignatureEnd,
    setShowExplanation,
    setFile,
    setUploadedSignature,
    setHasSignature,
  };
};

export default useAttestation;
