'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Clock, Video, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function BookingPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    type: 'online',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-light text-primary min-h-screen">
      {/* Header */}
      <section className="bg-primary py-24 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary z-10"></div>
        <div className="absolute inset-0 bg-[url('/GULF%20LEGAL%20CONSULTANT.jpeg')] opacity-10 object-cover mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md tracking-tight">
            {t('booking.title')}
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto mb-6"></div>
          <h2 className="text-xl md:text-2xl text-secondary mb-6 drop-shadow-sm font-medium">
            {t('booking.subtitle')}
          </h2>
        </div>
      </section>

      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Preparation Section */}
          <div className="bg-primary text-white p-8 md:p-10 rounded-sm mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-serif font-bold text-secondary mb-4">{t('booking.prepareTitle')}</h3>
            <p className="text-light/70 text-sm leading-relaxed mb-6">
              {t('booking.prepareDesc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                t('booking.prepareItem1'),
                t('booking.prepareItem2'),
                t('booking.prepareItem3'),
                t('booking.prepareItem4')
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-light/90">
                  <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex justify-between items-center relative min-w-[500px]">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-primary/10 -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-secondary -z-10 transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
            
            {[t('booking.step1'), t('booking.step2'), t('booking.step3'), t('booking.step4')].map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-light px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step > i + 1 ? 'bg-secondary text-primary' : step === i + 1 ? 'bg-primary text-secondary border-2 border-secondary' : 'bg-primary/10 text-primary/40'
                }`}>
                  {step > i + 1 ? <CheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= i + 1 ? 'text-primary' : 'text-primary/40'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 md:p-12 shadow-xl shadow-primary/5 rounded-sm border border-primary/5">
          
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h3 className="text-xl font-serif font-bold mb-4">{t('booking.selectService')}</h3>
                <select 
                  className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="" disabled>{t('booking.selectService')}...</option>
                  <option value="family">{t('services.family')}</option>
                  <option value="corporate">{t('services.corporate')}</option>
                  <option value="civil">{t('services.litigation')}</option>
                  <option value="contracts">{t('services.employment')}</option>
                  <option value="other">{t('services.intellectual')}</option>
                </select>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold mb-4">{t('booking.consultType')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'online'})}
                    className={`p-6 border rounded-sm flex flex-col items-center gap-4 transition-all ${
                      formData.type === 'online' 
                        ? 'border-secondary bg-secondary/5 text-primary' 
                        : 'border-primary/10 hover:border-primary/30 text-primary/60'
                    }`}
                  >
                    <Video className={`w-8 h-8 ${formData.type === 'online' ? 'text-secondary' : ''}`} />
                    <span className="font-bold uppercase tracking-wider text-sm">{t('booking.online')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'in-person'})}
                    className={`p-6 border rounded-sm flex flex-col items-center gap-4 transition-all ${
                      formData.type === 'in-person' 
                        ? 'border-secondary bg-secondary/5 text-primary' 
                        : 'border-primary/10 hover:border-primary/30 text-primary/60'
                    }`}
                  >
                    <MapPin className={`w-8 h-8 ${formData.type === 'in-person' ? 'text-secondary' : ''}`} />
                    <span className="font-bold uppercase tracking-wider text-sm">{t('booking.inPerson')}</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-primary/10">
                <button
                  onClick={handleNext}
                  disabled={!formData.service}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('booking.continue')}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-secondary" /> {t('booking.selectDate')}
                </h3>
                <input 
                  type="date" 
                  className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" /> {t('booking.selectTime')}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({...formData, time})}
                      className={`p-3 border rounded-sm text-center transition-all ${
                        formData.time === time 
                          ? 'border-secondary bg-secondary text-primary font-bold' 
                          : 'border-primary/10 hover:border-primary/30 text-primary/80'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-primary/10">
                <button
                  onClick={handleBack}
                  className="text-primary/60 hover:text-primary font-bold uppercase tracking-wider transition-colors px-4 py-3"
                >
                  {t('booking.back')}
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.date || !formData.time}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('booking.continue')}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-xl font-serif font-bold mb-4">{t('booking.detailsTitle')}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-primary/70 mb-2">{t('booking.fullName')}</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-primary/70 mb-2">{t('booking.email')}</label>
                  <input 
                    type="email" 
                    required
                    className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-primary/70 mb-2">{t('booking.phone')}</label>
                <input 
                  type="tel" 
                  required
                  className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-primary/70 mb-2">{t('booking.notes')}</label>
                <textarea 
                  rows={4}
                  className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                ></textarea>
              </div>

              <div className="bg-primary/5 p-4 rounded-sm border border-primary/10 flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-primary/70">
                  <strong className="text-primary block mb-1">{t('booking.paymentTitle')}</strong>
                  {t('booking.paymentDesc')}
                </p>
              </div>

              <div className="flex justify-between pt-6 border-t border-primary/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-primary/60 hover:text-primary font-bold uppercase tracking-wider transition-colors px-4 py-3"
                >
                  {t('booking.back')}
                </button>
                
                <div className="w-full max-w-[300px]">
                  <PayPalScriptProvider options={{ 
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                    currency: "USD",
                    intent: "capture"
                  }}>
                    <PayPalButtons
                      style={{ layout: "vertical", shape: "rect", label: "pay" }}
                      disabled={!formData.name || !formData.email || !formData.phone}
                      createOrder={async () => {
                        try {
                          const response = await fetch("/api/paypal/create-order", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ bookingData: formData }),
                          });
                          const order = await response.json();
                          if (order.id) return order.id;
                          throw new Error("Failed to create order");
                        } catch (err) {
                          console.error(err);
                          alert("Could not initiate PayPal checkout.");
                          return "";
                        }
                      }}
                      onApprove={async (data) => {
                        setIsSubmitting(true);
                        try {
                          const response = await fetch("/api/paypal/capture-order", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderId: data.orderID }),
                          });
                          const result = await response.json();
                          if (result.success) {
                            setStep(4);
                          } else {
                            throw new Error(result.error || "Payment capture failed");
                          }
                        } catch (err: any) {
                          alert(err.message);
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-primary mb-4">{t('booking.successTitle')}</h3>
              <p className="text-primary/70 text-lg mb-8 max-w-md mx-auto">
                {t('booking.successDesc')}
              </p>
              <div className="bg-light p-6 rounded-sm border border-primary/10 mb-8 text-left max-w-sm mx-auto">
                <p className="text-sm text-primary/60 mb-2 uppercase tracking-wider font-bold">{t('booking.confDetails')}</p>
                <p className="text-primary font-medium mb-1">{t('booking.confDate')}: <span className="font-normal">{formData.date}</span></p>
                <p className="text-primary font-medium mb-1">{t('booking.confTime')}: <span className="font-normal">{formData.time}</span></p>
                <p className="text-primary font-medium mb-1">{t('booking.confType')}: <span className="font-normal capitalize">{formData.type}</span></p>
                <p className="text-primary font-medium">{t('booking.confEmail')}: <span className="font-normal">{formData.email}</span></p>
              </div>
              <button
                onClick={() => router.push('/')}
                className="text-secondary font-bold uppercase tracking-wider hover:text-primary transition-colors"
              >
                {t('booking.returnHome')}
              </button>
            </div>
          )}

        </div>
        </div>
      </div>
    </div>
  );
}
