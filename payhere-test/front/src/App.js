import { useEffect } from 'react';

function App() {
  // Load the PayHere script once when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openPayHere = async () => {
    try {
      // Call your backend to generate the hash
      const response = await fetch('http://localhost:3001/generate-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 1000,
          currency: 'LKR',
          order_id: 'order12345'
        }),
      });

      const { hash } = await response.json();

      // Build the payment object
      const payment = {
        sandbox: true,
        merchant_id: '1230682', // fallback if not using .env
        return_url: undefined,
        cancel_url: undefined,
        // notify_url: 'http://localhost:3001/notify',
        notify_url: 'https://67de-2402-4000-2340-6d17-c2b-9972-eb96-e1b6.ngrok-free.app/notify',
        order_id: 'order12345',
        items: 'Door bell wireless',
        amount: '1000.00',
        currency: 'LKR',
        hash: hash, // dynamically inserted
        first_name: 'Saman',
        last_name: 'Perera',
        email: 'samanp@gmail.com',
        phone: '0771234567',
        address: 'No.1, Galle Road',
        city: 'Colombo',
        country: 'Sri Lanka',
        delivery_address: 'No. 46, Galle road, Kalutara South',
        delivery_city: 'Kalutara',
        delivery_country: 'Sri Lanka',
        custom_1: '',
        custom_2: ''
      };

      // Register PayHere event callbacks
      window.payhere.onCompleted = (orderId) => {
        console.log('Payment completed. OrderID:', orderId);
      };

      window.payhere.onDismissed = () => {
        console.log('Payment dismissed');
      };

      window.payhere.onError = (error) => {
        console.error('Payment error:', error);
      };

      // Start payment
      window.payhere.startPayment(payment);

    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <div className="App">
      <h1>PayHere Payment Integration</h1>
      <button onClick={openPayHere}>PayHere Pay</button>
    </div>
  );
}

export default App;
