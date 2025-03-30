import { useState, useRef, useCallback } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { attestPdf, AttestationResult } from '../utils/pdfUtils';

const useAttestation = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(null);
  const [attestedDocument, setAttestedDocument] = useState<AttestationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [applicationStarted, setApplicationStarted] = useState(false);
  const [signatureMode, setSignatureMode] = useState<'draw' | 'upload' | 'text'>('draw');
  const [textSignature, setTextSignature] = useState<string>('');
  
  const sigPad = useRef<SignatureCanvas>(null);
  
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  const startApplication = useCallback(() => {
    setApplicationStarted(true);
  }, []);
  
  const goToNextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 2));
  }, []);
  
  const goToPreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);
  
  const resetProcess = useCallback(() => {
    setCurrentStep(0);
    setFile(null);
    setUploadedSignature(null);
    setAttestedDocument(null);
    setHasSignature(false);
    if (sigPad.current) {
      sigPad.current.clear();
    }
  }, []);
  
  const clearSignature = useCallback(() => {
    if (sigPad.current) {
      sigPad.current.clear();
      setHasSignature(false);
    }
    setUploadedSignature(null);
    setTextSignature('');
  }, []);
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/'))) {
      setFile(selectedFile);
    }
  }, []);
  
  const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.startsWith('image/'))) {
      setFile(droppedFile);
    }
  }, []);
  
  const handleSignatureUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedSignature(result);
        setHasSignature(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  
  const handleSignatureDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedSignature(result);
        setHasSignature(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  
  const handleSignatureEnd = useCallback(() => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      setHasSignature(true);
    }
  }, []);
  
  const handleAttest = useCallback(async () => {
    if (!file) return;
    
    let signatureDataUrl: string | null = null;
    
    if (signatureMode === 'upload' && uploadedSignature) {
      signatureDataUrl = uploadedSignature;
    } else if (signatureMode === 'draw' && sigPad.current && !sigPad.current.isEmpty()) {
      signatureDataUrl = sigPad.current.toDataURL('image/png');
    } else if (signatureMode === 'text' && textSignature.trim()) {
      // Create a canvas to render the text signature
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.fillStyle = darkMode ? 'white' : 'black';
        ctx.font = 'italic 48px cursive';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(textSignature, canvas.width / 2, canvas.height / 2);
        signatureDataUrl = canvas.toDataURL('image/png');
      }
    }
    
    if (!signatureDataUrl) return;
    
    setIsProcessing(true);
    
    try {
      const attestationResult = await attestPdf(file, signatureDataUrl);
      setAttestedDocument(attestationResult);
      setCurrentStep(2);
    } catch (error) {
      console.error('Error attesting document:', error);
      // Handle error
    } finally {
      setIsProcessing(false);
    }
  }, [file, uploadedSignature, signatureMode, textSignature, darkMode]);
  
  return {
    darkMode,
    currentStep,
    file,
    uploadedSignature,
    attestedDocument,
    isProcessing,
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
    handleFileDrop,
    handleSignatureUpload,
    handleSignatureDrop,
    handleAttest,
    handleSignatureEnd,
    setFile,
    setUploadedSignature,
    signatureMode,
    setSignatureMode,
    textSignature,
    setTextSignature,
  };
};

export default useAttestation;
