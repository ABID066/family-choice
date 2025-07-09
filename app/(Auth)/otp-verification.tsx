import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams } from 'expo-router';

export default function OTPVerificationPage() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-verify when all 4 digits are entered
    if (newOtp.every(digit => digit !== '') && index === 3) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace to focus previous input
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = (otpCode: string) => {
    const correctOtp = '1234';
    
    if (otpCode === correctOtp) {
      setMessage('OTP verified successfully!');
      setMessageType('success');
      setTimeout(() => {
        router.push('/create-password');
      }, 1500);
    } else {
      setMessage('Invalid OTP. Please try again.');
      setMessageType('error');
      // Clear OTP inputs
      setOtp(['', '', '', '']);
      inputRefs[0].current?.focus();
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;
    
    setMessage('OTP sent successfully!');
    setMessageType('info');
    setCanResend(false);
    setResendTimer(60);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
           if (prev <= 1) {
             setCanResend(true);
             setMessage('');
             return 0;
           }
           return prev - 1;
         });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <View className="flex-1 bg-white px-6 ">
      {/* Header */}
      <Text className="text-2xl font-poppins-bold text-black text-center mt-20 mb-4">
        One time password
      </Text>
      
      {/* Description */}
      <Text className="text-sm font-poppins text-gray-600 text-center mb-12 px-4">
        Enter the OTP associated with your account and we&apos;ll send an SMS with instructions to reset your password.
      </Text>

      {/* Illustration */}
      <View className="items-center mb-12">
        <View className="mb-6">
          <Image 
            source={require('@/assets/OTP.png')} 
            className="w-64 h-48"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Check Your Email Section */}
      <View className="items-center mb-8">
        <Text className="text-lg font-poppins-bold text-black mb-2">
          Check Your Email
        </Text>
        <Text className="text-sm font-poppins text-gray-600 text-center mb-2">
           Enter the verification code sent to
         </Text>
         <Text className="text-sm font-poppins-medium text-gg text-center mb-6">
           {email || 'your email'}
         </Text>
      </View>

      {/* OTP Input Fields */}
      <View className="flex-row justify-center space-x-4 mb-8">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            className={`w-12 h-12 mx-2 border-2 ${otp[index] ? 'border-gg' : 'border-gray-300'} rounded-lg text-center text-lg font-poppins-bold text-black`}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>

        {/* Message Display */}
        {message ? (
          <View className="mb-4">
            <Text className={`text-sm font-poppins text-center ${
               messageType === 'success' ? 'text-gg' : 
               messageType === 'error' ? 'text-red-600' : 'text-gg'
             }`}>
              {message}
            </Text>
          </View>
        ) : null}

        {/* Resend 122Code */}
        <View className="items-center mb-8">
          <Text className="text-sm font-poppins text-gray-600 mb-2">
            Don&apos;t Receive the OTP ?
          </Text>
          <TouchableOpacity 
            onPress={handleResendCode}
            disabled={!canResend}
            className={`${!canResend ? 'opacity-50' : ''}`}
          >
            <Text className={`text-sm font-poppins-medium ${
              canResend ? 'text-gg' : 'text-gray-400'
            }`}>
              {canResend ? 'Resend Code' : `Resend Code (${resendTimer}s)`}
            </Text>
          </TouchableOpacity>
        </View>

  
    </View>
  );
}