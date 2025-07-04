import React from 'react';

interface PaymentButtonProps {
  serviceType: string;
  serviceName: string;
  serviceDetails: string;
  amount: number;
  serviceData: any;
  buttonText: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  buttonText
}) => {
  const handlePayment = () => {
    alert(`Payment of ${amount} BDT - Coming soon!`);
  };

  return (
    <button 
      onClick={handlePayment}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%'
      }}
    >
      {buttonText}
    </button>
  );
};

export default PaymentButton;