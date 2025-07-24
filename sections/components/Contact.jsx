'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FlipBtn from './FlipBtn';

const labelsStyle = 'md:text-xl uppercase font-bold rounded-t-md w-fit px-1';
const InputsStyle =
  'bg-primary font-bold text-secondary md:text-xl rounded-md p-1 md:p-2 px-1.5 md:px-3 focus:outline-none';
const wrapperStyle = 'flex flex-col';
const toastStyle =
  'fixed bottom-4 right-4 bg-primary text-secondary font-bold p-4 rounded-md shadow-lg max-w-xs';
const loadingStyle =
  'fixed top-5 right-5  w-8 h-8 border-4 border-primary border-t-transparent rounded-full';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
  });
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);
  const loadingRef = useRef(null);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name must contain only letters';
        return '';
      case 'number':
        if (!value) return 'Phone number is required';
        if (!/^\+?\d{8,15}$/.test(value))
          return 'Enter a valid phone number (e.g., +201258884500)';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
        return '';
      case 'message':
        if (!value) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name}=${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateField('name', formData.name),
      number: validateField('number', formData.number),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      console.log('Validation errors:', newErrors);
      setToast({
        message: 'Please fix the errors in the form.',
        type: 'error',
        visible: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '77c48e95-89fa-456d-8213-378d2c76b28e',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const result = await response.json();
      setIsLoading(false);
      if (result.success) {
        console.log('Form submitted successfully:', result);
        setFormData({ name: '', number: '', email: '', message: '' });
        setErrors({ name: '', number: '', email: '', message: '' });
        setToast({
          message: 'Message sent successfully!',
          type: 'success',
          visible: true,
        });
      } else {
        console.error('Submission failed:', result);
        setToast({
          message: 'Submission failed. Please try again.',
          type: 'error',
          visible: true,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      setToast({
        message: 'Error submitting form. Please try again.',
        type: 'error',
        visible: true,
      });
    }
  };

  useEffect(() => {
    if (toast.visible) {
      const toastEl = toastRef.current;
      gsap.fromTo(
        toastEl,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      const timer = setTimeout(() => {
        gsap.to(toastEl, {
          x: '100%',
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => setToast((prev) => ({ ...prev, visible: false })),
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  useEffect(() => {
    const loadingEl = loadingRef.current;
    if (isLoading) {
      gsap.to(loadingEl, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'linear',
      });
    } else {
      gsap.killTweensOf(loadingEl);
      gsap.set(loadingEl, { rotation: 0 });
    }
  }, [isLoading]);

  return (
    <div className="fixed z-0 w-full h-[100vh] text-primary bg-black/50 flex justify-end items-center">
      <div className={`bg-hint h-[100vh] w-[80vw] md:w-[40vw] flex flex-col justify-between p-10 md:p-15 `}>
        <form
          className="flex flex-col gap-5 md:gap-10 w-full"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="text-2xl md:text-5xl font-bold w-fit self-center">
            Contact Me
          </h2>
          <div className="flex flex-col gap-4">
            <div className={wrapperStyle}>
              <label className={labelsStyle} htmlFor="name">
                Name
              </label>
              {errors.name && (
                <span className="text-red-500 bg-primary p-1 -mb-1 rounded-t text-sm">{errors.name}</span>
              )}
              <input
                className={`${InputsStyle} ${errors.name ? 'border-red-500' : ''}`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div className={wrapperStyle}>
              <label className={labelsStyle} htmlFor="number">
                Number
              </label>
              {errors.number && (
                <span className="text-red-500 bg-primary p-1 -mb-1 rounded-t text-sm">{errors.number}</span>
              )}
              <input
                className={`${InputsStyle} ${errors.number ? 'border-red-500' : ''}`}
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="+1234567890"
              />
              
            </div>
            <div className={wrapperStyle}>
              <label className={labelsStyle} htmlFor="email">
                Email
              </label>
              {errors.email && (
                <span className="text-red-500 bg-primary p-1 -mb-1 rounded-t text-sm">{errors.email}</span>
              )}
              <input
                className={`${InputsStyle} ${errors.email ? 'border-red-500' : ''}`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
              
            </div>
            <div className={wrapperStyle}>
              <label className={labelsStyle} htmlFor="message">
                Request
              </label>
              {errors.message && (
                <span className="text-red-500 bg-primary p-1 -mb-1 rounded-t text-sm">{errors.message}</span>
              )}
              <textarea
                className={`${InputsStyle} ${errors.message ? 'border-red-500' : ''}`}
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your Request..."
                disabled={false}
              />
              
            </div>
          </div>
          <div className="relative">
            <FlipBtn
              type="submit"
              hoverStyle="bg-secondary text-primary font-bold text-xl md:text-3xl p-2 md:p-3 rounded-md"
              className="text-secondary bg-primary font-bold text-xl md:text-3xl p-2 md:p-3 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'SEND'}
            </FlipBtn>
            {isLoading && (
              <div ref={loadingRef} className={loadingStyle}></div>
            )}
          </div>
        </form>
        {toast.visible && (
          <div
            ref={toastRef}
            className={`${toastStyle} ${
              toast.type === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}