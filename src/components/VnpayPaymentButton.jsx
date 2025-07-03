// src/pages/Cart/components/VnpayPaymentButton.jsx

import axios from 'axios';

const VnpayPaymentButton = ({ orderId, amount }) => {
  const handleVnpayPayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/vnpay/create_payment', {
        orderId,
        amount
      });
      const { paymentUrl } = response.data;
      if (paymentUrl) {
        window.location.href = paymentUrl; // redirect sang VNPAY
      } else {
        alert('Không lấy được link thanh toán VNPAY');
      }
    } catch (err) {
      console.error('Lỗi gọi VNPAY:', err);
      alert('Lỗi gọi thanh toán VNPAY');
    }
  };

  return (
    <button onClick={handleVnpayPayment} className="bg-blue-600 px-4 py-2 text-white rounded">
      Thanh toán qua VNPAY
    </button>
  );
};

export default VnpayPaymentButton;
