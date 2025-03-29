'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaCreditCard, FaMobile, FaVideo, FaComment } from 'react-icons/fa';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);

  // Session types with prices
  const sessionTypes = [
    {
      id: 'message',
      name: 'Text Chat',
      icon: <FaComment className="mr-2 text-blue-500" />,
      price: 51,
      duration: '30 min'
    },
    {
      id: 'zoom',
      name: 'Video Call',
      icon: <FaVideo className="mr-2 text-purple-500" />,
      price: 99,
      duration: '45 min'
    },
    {
      id: 'premium',
      name: 'Premium Call',
      icon: <FaVideo className="mr-2 text-green-500" />,
      price: 249,
      duration: '1.5 hours'
    }
  ];

  // Get booking details from URL params
  const mentorId = searchParams.get('mentorId');
  const initialMeetingType = searchParams.get('type');
  const date = searchParams.get('date');
  const time = searchParams.get('time');

  // Set initial session type
  useEffect(() => {
    const defaultSession = sessionTypes.find(session => session.id === initialMeetingType) || sessionTypes[0];
    setSelectedSession(defaultSession);
  }, [initialMeetingType]);

  const handlePayment = () => {
    // Validate payment details
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert('Please enter all card details');
      return;
    }
    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter UPI ID');
      return;
    }
    if (!selectedSession) {
      alert('Please select a session type');
      return;
    }

    // Redirect to confirmation with all details
    router.push({
      pathname: '/dashboard/confirmation',
      query: {
        mentorId,
        sessionType: selectedSession.id,
        sessionName: selectedSession.name,
        amount: selectedSession.price,
        duration: selectedSession.duration,
        date,
        time,
        paymentMethod
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">Complete Your Booking</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Select Session Type</h3>
          <div className="grid grid-cols-1 gap-3">
            {sessionTypes.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className={`flex items-center justify-between p-4 border rounded-lg ${selectedSession?.id === session.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
              >
                <div className="flex items-center">
                  {session.icon}
                  <div>
                    <p className="font-medium text-left">{session.name}</p>
                    <p className="text-sm text-gray-500">{session.duration}</p>
                  </div>
                </div>
                <p className="font-bold">₹{session.price}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Booking Summary</h3>
          {selectedSession && (
            <>
              <p>Session: <span className="capitalize">{selectedSession.name}</span></p>
              <p>Duration: {selectedSession.duration}</p>
            </>
          )}
          {/* <p>Date: {date}</p>
          <p>Time: {time}</p> */}
          <p className="mt-2 font-bold">Amount:
            <span className="text-green-600 ml-2">
              ₹{selectedSession?.price || '--'}
            </span>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Payment Method</h3>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center p-3 border rounded-lg ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            >
              <FaCreditCard className="mr-3 text-blue-500" />
              <span>Credit/Debit Card</span>
            </button>

            <button
              onClick={() => setPaymentMethod('upi')}
              className={`flex items-center p-3 border rounded-lg ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            >
              <FaMobile className="mr-3 text-purple-500" />
              <span>UPI Payment</span>
            </button>
          </div>
        </div>

        {paymentMethod === 'card' ? (
          <div className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">UPI ID</label>
            <input
              type="text"
              placeholder="yourname@upi"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">Example: name@oksbi, name@ybl, etc.</p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handlePayment}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors w-full"
            disabled={!selectedSession}
          >
            Pay ₹{selectedSession?.price || '--'}
          </button>
        </div>
      </div>
    </div>
  );
}