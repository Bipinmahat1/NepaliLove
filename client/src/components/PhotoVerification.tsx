import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, Check, X, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: (verificationPhoto: File) => void;
  profilePhoto: string;
}

export default function PhotoVerification({ 
  isOpen, 
  onClose, 
  onVerificationComplete, 
  profilePhoto 
}: PhotoVerificationProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user' // Front camera for selfie
        }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to verify your identity.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const dataURL = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedPhoto(dataURL);
    setIsCapturing(true);
  }, []);

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setIsCapturing(false);
  };

  const confirmVerification = async () => {
    if (!capturedPhoto) return;

    try {
      // Convert data URL to File
      const response = await fetch(capturedPhoto);
      const blob = await response.blob();
      const file = new File([blob], 'verification-photo.jpg', { type: 'image/jpeg' });

      onVerificationComplete(file);
      stopCamera();
      setCapturedPhoto(null);
      setIsCapturing(false);
      onClose();

      toast({
        title: "Identity Verified!",
        description: "Your photo has been verified successfully.",
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    stopCamera();
    setCapturedPhoto(null);
    setIsCapturing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Verify Your Identity</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-600">
            To prevent fake profiles, please take a selfie that matches your profile photo.
          </div>

          {/* Profile Photo Reference */}
          <div className="flex justify-center">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Your Profile Photo</p>
              <img 
                src={profilePhoto} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            </div>
          </div>

          {/* Camera View */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
            {!stream && !capturedPhoto && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Camera className="h-12 w-12 text-gray-400 mb-4" />
                <Button onClick={startCamera} className="bg-nepal-red text-white">
                  Start Camera
                </Button>
              </div>
            )}

            {stream && !capturedPhoto && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button
                    onClick={capturePhoto}
                    className="w-16 h-16 bg-white text-nepal-red rounded-full shadow-lg hover:bg-gray-50"
                  >
                    <Camera className="h-8 w-8" />
                  </Button>
                </div>
              </>
            )}

            {capturedPhoto && (
              <>
                <img 
                  src={capturedPhoto} 
                  alt="Captured" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <Button
                    onClick={retakePhoto}
                    variant="outline"
                    className="bg-white border-gray-300"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retake
                  </Button>
                  <Button
                    onClick={confirmVerification}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </div>
              </>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="text-xs text-gray-500 text-center">
            This helps maintain a safe community by preventing fake profiles.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}