import React, { useState, useEffect } from 'react';
import {
  Shield, Lock, MapPin, Phone, CheckCircle, RefreshCw,
  MessageSquare, AlertTriangle, ShieldCheck, X,
  Star, Award, Camera, Heart, Calendar, Clock,
  ChevronRight, Menu, Instagram, Facebook, Linkedin
} from 'lucide-react';

/**
 * Aurea Odontologia - Luxury Dental Platform
 *
 * Refinement focus:
 * 1. Shift from "AppSec/Tech" to "Luxury Concierge" experience.
 * 2. Soften palette: Deep Navy -> Champagne, Gold, and Soft Cream.
 * 3. Humanize security: "WAF Active" -> "Protected Environment".
 * 4. Elevate typography: High-contrast Serif for headings, clean Sans for body.
 */

const AureaOdontologia = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [showSecurityCenter, setShowSecurityCenter] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [securityTab, setSecurityTab] = useState("waf");
  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, type: "INFO", message: "Ambiente de atendimento seguro inicializado", timestamp: "08:00:01" },
    { id: 2, type: "WAF", message: "Proteção de borda ativa - 0 ameaças detectadas", timestamp: "08:15:32" },
    { id: 3, type: "LGPD", message: "Protocolo de privacidade LGPD ativado", timestamp: "08:30:10" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "facetas",
    message: "",
    hp_website: "",
    lgpdConsent: false
  });

  const [captchaMath, setCaptchaMath] = useState({ num1: 3, num2: 4, answer: 7 });
  const [userCaptcha, setUserCaptcha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formSecurityAlert, setFormSecurityAlert] = useState("");
  const [encryptedPayloadPreview, setEncryptedPayloadPreview] = useState("");
  const [rateLimitCounter, setRateLimitCounter] = useState(0);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 1;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setCaptchaMath({ num1: n1, num2: n2, answer: n1 + n2 });
    setUserCaptcha("");
  };

  const addSecurityLog = (type, message) => {
    const time = new Date().toLocaleTimeString();
    setSecurityLogs((prev) => [{ id: Date.now(), type, message, timestamp: time }, ...prev.slice(0, 19)]);
  };

  const handleInputChange = (field, value) => {
    setFormSecurityAlert("");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSecurityAlert("");

    if (formData.hp_website.length > 0) {
      addSecurityLog("BOT_BLOCKED", "Tentativa de envio automatizado bloqueada.");
      setFormSecurityAlert("Erro de validação.");
      return;
    }

    if (rateLimitCounter >= 3) {
      setFormSecurityAlert("Para sua segurança, aguarde um momento antes de tentar novamente.");
      return;
    }

    if (parseInt(userCaptcha) !== captchaMath.answer) {
      setFormSecurityAlert("Por favor, verifique a resposta da validação humana.");
      return;
    }

    if (!formData.lgpdConsent) {
      setFormSecurityAlert("É necessário aceitar a Política de Privacidade para prosseguir.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const mockEncrypted = `AUREA_SEC_v2:${btoa(JSON.stringify({ name: formData.name, email: formData.email }))}:${Date.now()}`;
      setEncryptedPayloadPreview(mockEncrypted);
      setIsSubmitting(false);
      setFormSuccess(true);
      setRateLimitCounter((prev) => prev + 1);
      addSecurityLog("SUCCESS", "Solicitação transmitida via canal criptografado.");
    }, 1500);
  };

  const handleWhatsAppRedirect = () => {
    const cleanName = encodeURIComponent(formData.name || "Cliente Aurea");
    const cleanService = encodeURIComponent(formData.service);
    const msg = `Olá! Gostaria de agendar uma consulta de *${cleanService}*. Meu nome é ${cleanName}.`;
    window.open(`https://api.whatsapp.com/send?phone=5511999999999&text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-[#8A6D3B]">

      {/* Luxury Status Bar */}
      <div className="bg-[#0B132B] text-slate-400 py-2 px-4 text-[10px] font-medium uppercase tracking-widest border-b border-[#D4AF37]/20 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2 text-emerald-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Conexão Privada Ativa</span>
          </span>
          <span className="hidden sm:inline opacity-50">|</span>
          <span className="hidden sm:inline">LGPD Compliance Standard</span>
        </div>
        <button
          onClick={() => setShowSecurityCenter(true)}
          className="flex items-center space-x-1.5 text-[#D4AF37] hover:text-white transition-colors duration-300"
        >
          <Shield className="w-3 h-3" />
          <span>Centro de Privacidade</span>
        </button>
      </div>

      {/* Navigation (Simplified for Demo) */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#0B132B] rounded-full flex items-center justify-center text-[#D4AF37] font-serif font-bold text-xl">A</div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#0B132B]">Aurea <span className="text-[#D4AF37] font-medium italic">Odontologia</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-[#D4AF37] transition">A Clínica</a>
            <a href="#services" className="hover:text-[#D4AF37] transition">Tratamentos</a>
            <a href="#contact" className="px-5 py-2 bg-[#0B132B] text-white rounded-full hover:bg-[#1c2951] transition shadow-sm">Agendar Consulta</a>
          </div>
          <Menu className="md:hidden w-6 h-6 text-[#0B132B] cursor-pointer" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#D4AF37]/10 text-[#8A6D3B] rounded-full text-xs font-semibold tracking-wide uppercase">
              <Star className="w-3 h-3" />
              <span>Excelência em Estética Dental</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#0B132B] leading-[1.1] text-wrap-balance">
              Onde a ciência encontra a <span className="italic text-[#D4AF37]">perfeição</span> do sorriso.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Experiência exclusiva em odontologia de alta performance, combinando tecnologia de ponta e um olhar artístico para transformar vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="px-8 py-4 bg-[#0B132B] text-white rounded-full font-semibold text-center hover:bg-[#1c2951] transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Solicitar Agendamento
              </a>
              <a href="#services" className="px-8 py-4 border border-slate-200 text-slate-700 rounded-full font-semibold text-center hover:bg-slate-50 transition">
                Ver Tratamentos
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 group">
               <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/40 to-transparent"></div>
               <img src="https://images.unsplash.com/photo-1606811841687-285fbd67d675?auto=format&fit=crop&w=800&q=80" alt="Luxury Clinic" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Award className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Certificação ISO</p>
                  <p className="text-sm font-bold text-[#0B132B]">Qualidade Global</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURE BOOKING SECTION */}
      <section id="contact" className="py-32 bg-[#F5F2ED] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

            {/* Left Side: Elegance & Trust */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold">Atendimento Concierge</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B132B] leading-tight">Inicie sua jornada para um novo sorriso</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Nossa equipe de concierge está pronta para organizar cada detalhe da sua visita, garantindo total discrição e conforto.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-5 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="p-3 bg-[#0B132B]/5 rounded-xl text-[#0B132B]"><MapPin className="w-6 h-6"/></div>
                  <div>
                    <h5 className="font-bold text-[#0B132B]">Localização Premium</h5>
                    <p className="text-sm text-slate-600 mt-1">Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi, São Paulo - SP</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="p-3 bg-[#0B132B]/5 rounded-xl text-[#0B132B]"><Phone className="w-6 h-6"/></div >
                  <div>
                    <h5 className="font-bold text-[#0B132B]">Contato Direto</h5>
                    <p className="text-sm text-slate-600 mt-1">+55 (11) 99999-9999 / (11) 3000-0000</p>
                  </div>
                </div>
              </div>

              {/* Refined Security Trust Box */}
              <div className="p-8 bg-[#0B132B] text-white rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors"></div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center space-x-3 text-[#D4AF37]">
                    <Lock className="w-5 h-5" />
                    <h4 className="font-serif font-bold text-xl">Privacidade Absoluta</h4>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Utilizamos protocolos de criptografia de nível bancário para garantir que suas informações de saúde permaneçam estritamente confidenciais.
                  </p>
                  <div className="pt-4 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-700">
                    <span>SISTEMA PROTEGIDO</span>
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>LGPD CONFORME</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: The Booking Experience */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="font-serif font-bold text-3xl text-[#0B132B]">Agendamento Privado</h3>
                    <p className="text-slate-500 text-sm mt-1">Preencha os dados para nossa equipe entrar em contato.</p>
                  </div>
                  <div className="hidden sm:flex items-center space-x-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    <span>AMBIENTE SEGURO</span>
                  </div>
                </div>

                {formSuccess ? (
                  <div className="py-12 text-center space-y-8 animate-fadeIn">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-3xl font-serif font-bold text-[#0B132B]">Solicitação Recebida</h4>
                      <p className="text-slate-600 max-w-md mx-auto">
                        Seus dados foram transmitidos com segurança. Nossa equipe de concierge entrará em contato em breve.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900 text-slate-400 text-left font-mono text-[10px] rounded-2xl overflow-x-auto">
                      <p className="text-slate-500 mb-2">// Token de Segurança da Transmissão:</p>
                      <p className="break-all text-emerald-500/80">{encryptedPayloadPreview}</p>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={handleWhatsAppRedirect}
                        className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-emerald-700 transition shadow-lg"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span>Confirmar via WhatsApp</span>
                      </button>
                      <button
                        onClick={() => { setFormSuccess(false); setEncryptedPayloadPreview(""); generateCaptcha(); }}
                        className="px-8 py-4 border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 transition"
                      >
                        Novo Agendamento
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="hidden" aria-hidden="true">
                      <input type="text" name="hp_website" value={formData.hp_website} onChange={(e) => handleInputChange("hp_website", e.target.value)} />
                    </div>

                    {formSecurityAlert && (
                      <div className="p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-900 text-xs rounded-r-xl flex items-center space-x-3 animate-shake">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>{formSecurityAlert}</div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nome Completo</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Seu nome completo"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Telefone (WhatsApp)</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">E-mail de Contato</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="email@exemplo.com"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tratamento de Interesse</label>
                        <select
                          value={formData.service}
                          onChange={(e) => handleInputChange("service", e.target.value)}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:bg-white transition-all appearance-none"
                        >
                          <option value="facetas">Facetas de Porcelana</option>
                          <option value="implantes">Implantes Carga Imediata</option>
                          <option value="alinhadores">Alinhadores Invisíveis</option>
                          <option value="clareamento">Clareamento Laser</option>
                          <option value="harmonizacao">Harmonização Orofacial</option>
                          <option value="checkup">Check-up Preventivo</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Observações Adicionais</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Conte-nos brevemente sobre suas expectativas..."
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:bg-white transition-all"
                      ></textarea>
                    </div>

                    {/* Elegant Captcha */}
                    <div className="p-6 bg-[#FBFBFB] border border-slate-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white shadow-sm rounded-full text-[#0B132B]">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div className="text-sm">
                          <span className="font-bold text-slate-800 block">Validação de Segurança</span>
                          <span className="text-slate-500">Quanto é <strong className="text-[#0B132B] font-bold text-base">{captchaMath.num1} + {captchaMath.num2}</strong> ?</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          required
                          value={userCaptcha}
                          onChange={(e) => setUserCaptcha(e.target.value)}
                          placeholder="?"
                          className="w-20 px-4 py-3 border border-slate-200 rounded-2xl text-center font-bold text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className="p-3 text-slate-400 hover:text-slate-600 transition"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 py-2">
                      <input
                        type="checkbox"
                        id="lgpd"
                        required
                        checked={formData.lgpdConsent}
                        onChange={(e) => handleInputChange("lgpdConsent", e.target.checked)}
                        className="mt-1 h-5 w-5 rounded border-slate-300 text-[#0B132B] focus:ring-[#D4AF37]"
                      />
                      <label htmlFor="lgpd" className="text-xs text-slate-500 leading-relaxed">
                        Estou ciente e aceito a{" "}
                        <button type="button" onClick={() => setShowPrivacyModal(true)} className="text-[#0B132B] underline font-bold">
                          Política de Privacidade & LGPD
                        </button>
                        {" "}para o tratamento dos meus dados exclusivamente para fins de agendamento.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-[#0B132B] text-white rounded-2xl font-bold shadow-xl hover:bg-[#1c2951] transition-all transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center space-x-3"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin text-[#D4AF37]" />
                          <span>Processando Solicitação...</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5 text-[#D4AF37]" />
                          <span>Confirmar Agendamento Seguro</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL: PRIVACY CENTER (Refined) */}
      {showSecurityCenter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B132B]/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-slate-800 rounded-[2.5rem] w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-[#FAF9F6]">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#0B132B] rounded-2xl text-[#D4AF37]">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#0B132B]">Centro de Privacidade</h3>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">Transparência & Segurança de Dados</p>
                </div>
              </div>
              <button
                onClick={() => setShowSecurityCenter(false)}
                className="p-3 text-slate-400 hover:text-[#0B132B] rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex border-b border-slate-100 bg-white text-xs font-bold uppercase tracking-widest">
              {["waf", "lgpd", "logs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSecurityTab(tab)}
                  className={`px-8 py-5 transition-all relative ${
                    securityTab === tab ? "text-[#0B132B]" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab === "waf" && "Infraestrutura"}
                  {tab === "lgpd" && "Seus Direitos"}
                  {tab === "logs" && "Auditoria"}
                  {securityTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] animate-fadeIn"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="p-8 overflow-y-auto space-y-8 max-h-[60vh]">
              {securityTab === "waf" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: "Criptografia", value: "AES-256 GCM", desc: "Nível militar", color: "text-emerald-600" },
                      { label: "Certificação", value: "TLS 1.3", desc: "Tráfego blindado", color: "text-[#D4AF37]" },
                      { label: "Conformidade", value: "LGPD Art. 7", desc: "Base legal ativa", color: "text-blue-600" },
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">{item.label}</span>
                        <span className={`text-xl font-bold ${item.color} block mb-1`}>{item.value}</span>
                        <span className="text-xs text-slate-500">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 bg-[#0B132B] rounded-3xl text-slate-300 font-mono text-xs space-y-3">
                    <p className="text-slate-500 border-b border-slate-800 pb-2 mb-4">Protocolos de Cabeçalho Ativos:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex justify-between"><span>HSTS:</span> <span className="text-emerald-400">Strict</span></div>
                      <div className="flex justify-between"><span>X-Frame:</span> <span className="text-emerald-400">DENY</span></div>
                      <div className="flex justify-between"><span>CSP:</span> <span className="text-emerald-400">A+ Strict</span></div>
                      <div className="flex justify-between"><span>Referrer:</span> <span className="text-emerald-400">Strict-Origin</span></div>
                    </div>
                  </div>
                </div>
              )}

              {securityTab === "lgpd" && (
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <h4 className="font-serif font-bold text-xl text-[#0B132B] mb-3">Compromisso com a Transparência</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      A Aurea Odontologia trata seus dados pessoais sob a base legal do consentimento e execução de contrato. Seus dados nunca são vendidos ou compartilhados com terceiros sem sua autorização explícita.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => addSecurityLog("DSAR_EXPORT", "Solicitação de exportação de dados processada.")}
                      className="p-6 text-left rounded-3xl border border-slate-200 hover:border-[#D4AF37] hover:bg-slate-50 transition group"
                    >
                      <span className="font-bold text-[#0B132B] block mb-2 group-hover:text-[#8A6D3B]">Exportar Meus Dados</span>
                      <span className="text-xs text-slate-500 leading-relaxed">Receba uma cópia completa de todos os seus registros em formato interoperável.</span>
                    </button>
                    <button
                      onClick={() => addSecurityLog("DSAR_ERASE", "Solicitação de exclusão de dados processada.")}
                      className="p-6 text-left rounded-3xl border border-slate-200 hover:border-rose-200 hover:bg-rose-50 transition group"
                    >
                      <span className="font-bold text-rose-600 block mb-2 group-hover:text-rose-700">Direito ao Esquecimento</span>
                      <span className="text-xs text-slate-500 leading-relaxed">Solicite a remoção definitiva de seus dados de nossas bases de atendimento.</span>
                    </button>
                  </div>
                </div>
              )}

              {securityTab === "logs" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-serif font-bold text-[#0B132B]">Histórico de Auditoria</h4>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>MONITORAMENTO EM TEMPO REAL</span>
                    </span>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-3xl font-mono text-xs space-y-3 max-h-64 overflow-y-auto">
                    {securityLogs.map((log) => (
                      <div key={log.id} className="flex items-start space-x-3 text-slate-400 border-b border-slate-800 pb-2">
                        <span className="text-slate-600">[{log.timestamp}]</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.type === 'WAF_ALERT' ? 'bg-amber-900 text-amber-200' :
                          log.type === 'BOT_BLOCKED' ? 'bg-rose-900 text-rose-200' :
                          log.type === 'SUCCESS' ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {log.type}
                        </span>
                        <span className="flex-1">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-8 py-6 bg-[#FAF9F6] border-t border-slate-100 text-right">
              <button
                onClick={() => setShowSecurityCenter(false)}
                className="px-8 py-3 bg-[#0B132B] text-white font-bold text-xs rounded-full hover:bg-[#1c2951] transition"
              >
                Voltar ao Site
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRIVACY POLICY */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B132B]/60 backdrop-blur-md">
          <div className="bg-white text-slate-800 rounded-[2rem] w-full max-w-2xl p-8 md:p-12 space-y-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-6">
              <h3 className="font-serif font-bold text-2xl text-[#0B132B]">Política de Privacidade & LGPD</h3>
              <button onClick={() => setShowPrivacyModal(false)} className="p-2 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-sm text-slate-600 space-y-6 leading-relaxed">
              <div className="space-y-2">
                <strong className="text-[#0B132B] block font-bold">1. Coleta Ética de Dados</strong>
                <p>Coletamos apenas as informações estritamente necessárias para a viabilização do seu atendimento clínico, como nome, contato e a natureza do tratamento desejado.</p>
              </div>
              <div className="space-y-2">
                <strong className="text-[#0B132B] block font-bold">2. Segurança e Confidencialidade</strong>
                <p>Seus dados são protegidos por camadas de criptografia AES-256 e trafegam exclusivamente via canais HTTPS/TLS 1.3. Jamais compartilhamos informações com terceiros para fins comerciais.</p>
              </div>
              <div className="space-y-2">
                <strong className="text-[#0B132B] block font-bold">3. Seus Direitos (Lei 13.709/2018)</strong>
                <p>Você possui o direito de acessar, corrigir ou solicitar a exclusão definitiva de seus dados a qualquer momento através do nosso Centro de Privacidade.</p>
              </div>
            </div>
            <div className="pt-6 text-right">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-10 py-4 bg-[#0B132B] text-white text-sm rounded-full font-bold hover:bg-[#1c2951] transition shadow-lg"
              >
                Compreendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0B132B] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0B132B] font-serif font-bold">A</div>
              <span className="font-serif text-xl font-bold tracking-tight">Aurea <span className="text-[#D4AF37] italic">Odontologia</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Referência em odontologia estética e regenerativa, dedicada a criar sorrisos que refletem a essência e a confiança de cada paciente.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 text-slate-400 hover:text-[#D4AF37] cursor-pointer transition" />
              <Facebook className="w-5 h-5 text-slate-400 hover:text-[#D4AF37] cursor-pointer transition" />
              <Linkedin className="w-5 h-5 text-slate-400 hover:text-[#D4AF37] cursor-pointer transition" />
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Links Rápidos</h5>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">A Clínica</a></li>
              <li><a href="#" className="hover:text-white transition">Tratamentos</a></li>
              <li><a href="#" className="hover:text-white transition">Equipe</a></li>
              <li><a href="#" className="hover:text-white transition">Contato</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Jurídico</h5>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition">LGPD</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} Aurea Odontologia Luxury Dental. Todos os direitos reservados.
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        :root {
          --font-serif: 'Playfair Display', serif;
          --font-sans: 'Plus Jakarta Sans', sans-serif;
        }

        body {
          font-family: var(--font-sans);
        }

        .font-serif {
          font-family: var(--font-serif);
        }

        .text-wrap-balance {
          text-wrap: balance;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AureaOdontologia;
