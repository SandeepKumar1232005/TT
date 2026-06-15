import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle 
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="footer" className="bg-[#030304] border-t border-gold/10 text-gray-400 relative z-10 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          
          {/* Col 1: Brand details */}
          <div className="space-y-6">
            <div>
              <div 
                className="flex items-center text-white text-2xl font-bold font-space tracking-wider cursor-pointer group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                VEDAN <span className="text-gold tracking-tight font-light font-sans ml-1 text-lg">TRAVELS</span>
              </div>
              <p className="text-xs font-mono text-gold-dark mt-1 tracking-widest uppercase">{language === 'ta' ? 'கோயம்புத்தூர் அவுட்ஸ்டேஷன் டாக்ஸி' : 'COIMBATORE OUTSTATION TAXI'}</p>
            </div>

            <p className="text-xs font-light text-gray-500 leading-relaxed">
              {language === 'ta' 
                ? 'நாங்கள் கோயம்புத்தூரிலிருந்து தமிழ்நாடு, கர்நாடகா, கேரளா, புதுச்சேரி மற்றும் தென்னிந்தியாவின் அனைத்துப் பகுதிகளுக்கும் பாதுகாப்பான மற்றும் வசதியான சொகுசு சொகுசு டாக்ஸி சேவைகளை வழங்குகிறோம்.'
                : 'We offer trusted, safe outstation travels from Coimbatore across Tamil Nadu, Karnataka, Kerala, Pondicherry, and other parts of India.'}
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/30 transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/30 transition-all cursor-pointer"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/30 transition-all cursor-pointer"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services quick scroll links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold pb-2 border-b border-white/5">
              {language === 'ta' ? 'எங்கள் சேவைகள்' : 'Our Services'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: language === 'ta' ? 'விமான நிலைய பிக்கப் & டிராப்' : 'Airport Pickup & Drop' },
                { name: language === 'ta' ? 'வெளியூர் அவுட்ஸ்டேஷன் சுற்றுலா' : 'Outstation Travels' },
                { name: language === 'ta' ? 'நிறுவனங்களின் அலுவல் பயணம்' : 'Corporate Travel' },
                { name: language === 'ta' ? 'ஆன்மீக ஆலய சுற்றுலாக்கள்' : 'Temple Tours' },
                { name: language === 'ta' ? 'குடும்ப இன்பச் சுற்றுலாக்கள்' : 'Family Trips' }
              ].map((serv, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScrollToSection('services')}
                    className="hover:text-gold transition-colors text-left cursor-pointer"
                  >
                    {serv.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold pb-2 border-b border-white/5">
              {language === 'ta' ? 'பயனுள்ள இணைப்புகள்' : 'Useful Links'}
            </h4>
            <ul className="space-y-2.5 text-xs font-space">
              {[
                { name: language === 'ta' ? 'முகப்பு' : 'Home', section: 'home' },
                { name: language === 'ta' ? 'பாதுகாப்பு & தர வாரியம்' : 'Why Choose Us', section: 'trust' },
                { name: language === 'ta' ? 'எங்கள் வாகனங்கள்' : 'View Vehicles', section: 'fleet' },
                { name: language === 'ta' ? 'இப்போதே பதிவு செய்' : 'Book Your Trip', section: 'booking' },
                { name: language === 'ta' ? 'ஓட்டுநர் கூட்டமைப்பு' : 'Driver Partner', section: 'partner' },
                { name: language === 'ta' ? 'கருத்துக்கள்' : 'Customer Reviews', section: 'reviews' }
              ].map((lnk, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScrollToSection(lnk.section)}
                    className="hover:text-gold transition-colors text-left cursor-pointer"
                  >
                    {lnk.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold pb-2 border-b border-white/5">
              {language === 'ta' ? 'தொடர்பு முகவரி' : 'Contact Details'}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>
                  {language === 'ta' 
                    ? 'வேதன் டிராவல்ஸ், அவினாசி ரோடு, கோயம்புத்தூர், தமிழ்நாடு - 641018' 
                    : 'Vedan Travels, Avinashi Road, Coimbatore, Tamil Nadu - 641018'}
                </span>
              </li>
              <li className="flex items-center space-x-2.5 font-mono">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+919363499428" className="hover:text-gold transition-colors">+91 93634 99428</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:vedantravels.booking@gmail.com" className="hover:text-gold transition-colors">vedantravels.booking@gmail.com</a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/919363499428?text=Hello%20Vedan%20Travels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded bg-green-500/10 border border-green-500/20 text-xs text-white hover:bg-green-500/20 transition-all font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>{language === 'ta' ? 'வாட்ஸ்அப் அரட்டை' : 'Chat on WhatsApp'}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower row: Copyright and terms details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div>
            <p>© {currentYear} {language === 'ta' ? 'வேதன் டிராவல்ஸ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' : 'VEDAN TRAVELS. All rights reserved.'}</p>
            <p className="text-[10px] text-gray-700 mt-1">{language === 'ta' ? 'கோயம்புத்தூர் அவுட்ஸ்டேஷன் டாக்ஸி மற்றும் பயண சேவைகள்.' : 'Coimbatore Outstation Taxi and Travel Service.'}</p>
          </div>
          
          <div className="flex space-x-6">
            <span className="hover:text-gold transition-colors cursor-pointer">{language === 'ta' ? 'பயன்பாட்டு விதிகள்' : 'Terms of Service'}</span>
            <span className="hover:text-gold transition-colors cursor-pointer">{language === 'ta' ? 'தனியுரிமை கொள்கை' : 'Privacy Policy'}</span>
            <span className="hover:text-gold transition-colors cursor-pointer">{language === 'ta' ? 'கேள்வி பதில்' : 'FAQ'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
