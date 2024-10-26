import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Donate.css';

const Donate = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Basic validation for amount
    if (parseFloat(amount) <= 0) {
      setMessage('Please enter a valid donation amount.');
      return;
    }

    setIsProcessing(true);
    setMessage(''); // Clear previous messages

    try {
      // Create a payment intent by calling the backend
      const response = await fetch(`http://localhost:5000/api/donations/${id}/donate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          name,
          email,
          phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent.');
      }

      const { clientSecret } = await response.json();

      // Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
            phone,
          },
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // On successful payment, send donation info to backend to update campaign
        const completeResponse = await fetch(`http://localhost:5000/api/donations/${id}/donation-complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            name,
            email,
            phone,
          }),
        });

        if (!completeResponse.ok) {
          throw new Error('Failed to record donation.');
        }

        setMessage('Donation successful!');
      } else {
        setMessage('Payment processing failed.');
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Donate to Campaign</h2>

      <input
        type="number"
        placeholder="Donation amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Your phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <CardElement
        options={{
          style: {
            base: {
              color: '#32325d',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '16px',
              border: '1px solid #ccc', // Add border for visibility
              borderRadius: '4px', // Rounded corners
              padding: '10px', // Padding around text
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : 'Donate Now'}
      </button>

      {message && <div>{message}</div>}
    </form>
  );
};

export default Donate;
