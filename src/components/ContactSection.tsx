import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection = () => {
  const { isRtl } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '+213 ',
    email: '',
    subject: 'استفسار عام',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A24B]/15 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#C9A24B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
            {isRtl ? 'حرم مدرسة الأندلس' : 'Campus Directorate'}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6">
            {isRtl ? (
              <>تواصلوا معنا أو <span className="italic text-[#C9A24B]">تفضلوا بزيارتنا</span></>
            ) : (
              <>Visit the Sanctuary or <span className="italic text-[#C9A24B]">Get in Touch</span></>
            )}
          </h2>
          <p className="font-sans-ui text-[#F8F6F2]/75 text-base sm:text-lg leading-relaxed">
            {isRtl
              ? 'يسعد فريقنا البيداغوجي والإداري باستقبال استفساراتكم وترتيب زيارة استكشافية خاصة لأولياء الأمور.'
              : 'Our academic and admissions council welcomes prospective families for bespoke campus walkthroughs.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Campus Info Cards & GPS Map Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="p-8 rounded-3xl glass-panel border border-[#C9A24B]/30 bg-[#0E1526]/85 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#141B2D] border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-white font-medium mb-1">
                    {isRtl ? 'المقر والحرم المدرسي' : 'Campus Address'}
                  </h4>
                  <p className="font-sans-ui text-xs text-[#F8F6F2]/70 leading-relaxed">
                    {isRtl
                      ? 'طريق الساحل، هضبة حيدرة / الأبيار، الجزائر العاصمة، 16035'
                      : 'Plateau d’Hydra / El Biar, Algiers, Algeria 16035'}
                  </p>
                  <span className="text-[10px] font-mono-tech text-[#2FD6C8] block mt-1">
                    GPS: 36.7525° N, 3.0420° E
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#141B2D] border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-white font-medium mb-1">
                    {isRtl ? 'الهاتف والخطوط المباشرة' : 'Direct Telephone'}
                  </h4>
                  <p className="font-mono-tech text-xs text-[#C9A24B]">
                    +213 (0) 23 88 44 20 / +213 (0) 550 12 34 56
                  </p>
                  <span className="text-[10px] text-[#F8F6F2]/50 block mt-0.5">
                    {isRtl ? 'خط أمانة التسجيل والأمانة البيداغوجية' : 'Admissions & Academic Secretariat'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#141B2D] border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-white font-medium mb-1">
                    {isRtl ? 'البريد الإلكتروني الرسمي' : 'Official Inquiries'}
                  </h4>
                  <p className="font-mono-tech text-xs text-white">
                    contact@elandalus-academy.dz
                  </p>
                  <p className="font-mono-tech text-xs text-[#2FD6C8]">
                    admissions@elandalus-academy.dz
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#141B2D] border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-white font-medium mb-1">
                    {isRtl ? 'أوقات الاستقبال والدوام' : 'Visiting Hours'}
                  </h4>
                  <p className="font-sans-ui text-xs text-[#F8F6F2]/70">
                    {isRtl
                      ? 'الأحد إلى الخميس: 07:30 صباحاً – 16:30 زوالاً'
                      : 'Sunday to Thursday: 7:30 AM – 4:30 PM'}
                  </p>
                  <span className="text-[10px] font-mono-tech text-[#C9A24B] block mt-0.5">
                    {isRtl ? 'الجمعة والسبت: مغلق (حسب المواعيد الخاصة)' : 'Friday & Saturday: Closed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Accreditations Badge */}
            <div className="p-6 rounded-2xl bg-[#141B2D]/70 border border-[#C9A24B]/20 flex items-center justify-between text-xs font-mono-tech text-[#F8F6F2]/70">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2FD6C8]" />
                {isRtl ? 'مؤسسة معتمدة رسمياً لدى وزارة التربية الوطنية' : 'Accredited by National Ministry'}
              </span>
              <span className="text-[#C9A24B]">DZ-EDU-2026</span>
            </div>
          </div>

          {/* Right Column: Direct Message / Appointment Form */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-3xl glass-panel border border-[#C9A24B]/30 bg-[#0E1526]/90 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <h3 className="font-editorial text-2xl text-white mb-2">
                  {isRtl ? 'أرسل استفسارك للإدارة البيداغوجية' : 'Direct Council Message'}
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-[#F8F6F2]/70 mb-8">
                  {isRtl
                    ? 'سيقوم فريق الأندلس بالرد على رسالتكم في أقرب الآجال مع تزويدكم بكافة الوثائق المطلوبة.'
                    : 'We respond to all verified parental correspondence within one academic business day.'}
                </p>

                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-full bg-[#2FD6C8]/10 border border-[#2FD6C8] text-[#2FD6C8] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-editorial text-2xl text-white">
                      {isRtl ? 'تم استلام رسالتكم بنجاح' : 'Message Dispatched'}
                    </h4>
                    <p className="font-sans-ui text-sm text-[#F8F6F2]/70 max-w-sm mx-auto">
                      {isRtl
                        ? 'شكراً لاهتمامكم بمدرسة الأندلس. سيتواصل معكم أحد أعضاء الفريق قريباً.'
                        : 'Thank you for connecting with El Andalus Academy. A counselor will respond shortly.'}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-[#C9A24B] text-[#0B0F1A] font-bold text-xs font-mono-tech mt-4"
                    >
                      {isRtl ? 'إرسال رسالة أخرى' : 'Send Another'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                          {isRtl ? 'الاسم واللقب *' : 'Your Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={isRtl ? 'د. سليم بلحاج' : 'Dr. Salim'}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                          {isRtl ? 'رقم الهاتف (+213) *' : 'Phone Number (+213) *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                          {isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="parent@algeria.dz"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                          {isRtl ? 'الموضوع *' : 'Subject *'}
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#141B2D] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                        >
                          <option value="استفسار عام">{isRtl ? 'استفسار عام حول التسجيل' : 'General Admissions'}</option>
                          <option value="طلب زيارة">{isRtl ? 'طلب زيارة خاصة للحرم المدرسي' : 'Private Campus Walkthrough'}</option>
                          <option value="التحضيري">{isRtl ? 'استفسار عن الطور التحضيري (3–5)' : 'Preparatory Query'}</option>
                          <option value="الابتدائي">{isRtl ? 'استفسار عن الطور الابتدائي (6–10)' : 'Primary Query'}</option>
                          <option value="المتوسط">{isRtl ? 'استفسار عن الطور المتوسط (11–14)' : 'Middle School Query'}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                        {isRtl ? 'نص الرسالة *' : 'Message *'}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={isRtl ? 'اكتب استفسارك أو تفضيلات الموعد المطلوب هنا...' : 'State your question or availability...'}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B] resize-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-xl bg-[#C9A24B] hover:bg-[#d6b059] text-[#0B0F1A] font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-[#C9A24B]/20"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isRtl ? 'إرسال الرسالة' : 'Transmit Inquiry'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
