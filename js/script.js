/* Scroll reveal */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if(top < trigger){
      el.classList.add("active");
    }
  });
});


/* Menú móvil */
function attachMobileMenu(){
  const toggle = document.getElementById("toggle");
  const menu = document.getElementById("menu");
  if(!toggle || !menu) return;
  if(toggle.__menuHandlerAttached) return;
  toggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
  toggle.__menuHandlerAttached = true;
}

// Try to attach now and also after partials/dom ready
attachMobileMenu();
document.addEventListener('DOMContentLoaded', attachMobileMenu);
document.addEventListener('partialsLoaded', attachMobileMenu);


/* Simple carousel for partners-logos */
(function(){
  const carouselRoot = document.querySelector('.partners-logos.carousel');
  if(!carouselRoot) return;
  const track = carouselRoot.querySelector('.carousel-track');
  if(!track) return;

  // continuous marquee: clone children to make seamless loop
  const children = Array.from(track.children);
  if(children.length === 0) return;

  // wrap track in a container with overflow hidden (CSS should handle but ensure)
  carouselRoot.style.overflow = 'hidden';
  carouselRoot.style.position = 'relative';

  // duplicate items
  children.forEach(node => track.appendChild(node.cloneNode(true)));

  let speed = 40; // pixels per second
  let pos = 0;
  let rafId = null;

  // measure width (half of track since we've duplicated)
  function getResetWidth(){
    // width of the original set
    let total = 0;
    for(let i=0;i<children.length;i++){
      total += children[i].getBoundingClientRect().width;
    }
    return total;
  }

  let resetWidth = getResetWidth();

  function step(ts){
    // delta time
    if(!step.last) step.last = ts;
    const dt = (ts - step.last) / 1000;
    step.last = ts;

    pos -= speed * dt;
    if(Math.abs(pos) >= resetWidth){
      pos += resetWidth; // wrap
    }
    track.style.transform = `translateX(${pos}px)`;
    rafId = requestAnimationFrame(step);
  }

  function start(){
    if(rafId) cancelAnimationFrame(rafId);
    step.last = null;
    rafId = requestAnimationFrame(step);
  }

  function stop(){ if(rafId) cancelAnimationFrame(rafId); rafId = null; }

  // pause on hover
  carouselRoot.addEventListener('mouseenter', () => stop());
  carouselRoot.addEventListener('mouseleave', () => start());

  // restart/rescale on resize
  window.addEventListener('resize', () => {
    resetWidth = getResetWidth();
  });

  start();
})();

/* Simple i18n: toggle between Spanish and English using data-i18n attributes */
(function(){
  const i18n = {
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.cases": "Cases",
      "nav.contact": "Contact",
      "nav.dobleu": "Dobleu",
      "hero.title": "DOBLEU",
      "partners.text": "Discover everything DOBLEU offers",
      "card1.title": "DOBLEU Home",
      "card1.muted": "Intelligence for the home.",
      "card1.p": "We transform homes into intelligent environments: control access, devices and automations from your phone.",
      "card2.title": "DOBLEU Box",
      "card2.muted": "Smart management for any environment.",
      "card2.p": "Advanced IoT solution for your home. Monitor critical variables and manage infrastructure in real time.",
      "cta.h2": "Everything you need, wherever you are",
      "cta.h3": "From your favorite craving to that urgent errand, DOBLEU does it for you",
      "footer.desc": "Telecommunications, enterprise networks, cybersecurity and software development to empower industries in Latin America.",
      "footer.services": "Services",
      "footer.contact": "Contact",
      "footer.emailLabel": "Email:",
      "footer.email": "fermin.garcia@wontec.com.mx",
      "footer.hoursLabel": "Service hours:",
      "footer.hours": "Mon - Fri: 09:00 AM - 5:00 PM",
      "footer.phoneLabel": "Contact phone:",
      "footer.phone": "773 154 4230"
      ,
      "about.badge": "About Us",
      "about.h1": "We connect industries with secure, scalable technology",
      "about.p": "At WONTEC we design, implement and maintain solutions in telecommunications, enterprise networks, cybersecurity and software development for hotels, hospitals, industries and government.",
      "about.item1": "Networks & Fiber Optics",
      "about.item2": "Linux/Windows Servers",
      "about.item3": "Security & Firewalls",
      "about.item4": "24/7 Support",
      "services.badge": "Our Services",
      "services.h1": "Comprehensive Technology Solutions",
      "services.p": "We implement network infrastructure, security, servers and software development for companies that need stability, 24/7 monitoring and high performance.",
      "services.ti.title": "INFORMATION TECHNOLOGIES",
      "services.ti.p": "Telecommunications, web development and custom app development for businesses.",
      "services.sec.title": "CYBERSECURITY",
      "services.sec.p": "Fortinet, Cisco ASA, Ubiquiti/Unifi solutions and proactive monitoring.",
      "services.net.title": "COMMERCIAL & INDUSTRIAL NETWORKS",
      "services.net.p": "Linux/Windows servers, CCTV, IPTV, VoIP and robust industrial solutions.",
      "services.more": "More information",
      "cases.badge": "Case Studies",
      "cases.h1": "Recent Success Stories",
      "partners.title": "Our Partners",
      "partners.explore": "Explore",
      "footer.svc.ti": "Information Technologies",
      "footer.svc.cs": "Cybersecurity",
      "footer.svc.net": "Commercial & Industrial Networks",
      "service_ti.hero": "Information Technologies",
      "service_ti.badge1": "Information Technologies",
      "service_ti.h1_1": "Cross-platform Development",
      "service_ti.p1": "Native solutions for iOS and Android alongside optimized web systems to take your business management to the next level.",
      "service_ti.btn_consult": "Request Consulting",
      "service_ti.badge2": "Telecommunications",
      "service_ti.h1_2": "High Availability Connectivity",
      "service_ti.p2": "We guarantee stable and secure internet access in corporate and rural environments using state-of-the-art infrastructure.",
      "service_ti.btn_contract": "Purchase Plan",
      "service_ti.item1": "Scalable Architecture",
      "service_ti.item2": "Premium UX/UI Design",
      "service_ti.item3": "Cutting-edge Support",
      "service_ti.item4": "Full Geographic Reach",
      "service_ti.item5": "Proactive 24/7 Support",
      "service_ti.breadcrumb": "Information Technologies",
      "service_sec.hero": "Cybersecurity",
      "service_sec.badge1": "Cybersecurity",
      "service_sec.h1_1": "Comprehensive 360° Protection",
      "service_sec.p1": "We harden your infrastructure through the convergence of advanced physical security and robust cybersecurity.",
      "service_sec.btn_diag": "Request Diagnosis",
      "service_sec.badge2": "Firewalls",
      "service_sec.h1_2": "Advanced Network Protection",
      "service_sec.p2": "We protect your business infrastructure using next-gen firewalls that manage access and filter malicious traffic.",
      "service_sec.btn_impl": "Implement Security",
      "service_net.hero": "Commercial & Industrial Networks",
      "service_net.badge1": "Networks",
      "service_net.h1_1": "High-Performance Networks",
      "service_net.p1": "Design and implementation of robust network architectures for high-demand environments.",
      "service_net.btn_design": "Request Design",
      "service_net.badge2": "LAN & WiFi",
      "service_net.h1_2": "LAN & WiFi 6 Solutions",
      "service_net.p2": "We deploy unified networks that remove dead zones and ensure seamless transitions.",
      "service_net.btn_improve": "Improve Connectivity",
      "service_net.badge3": "IOT",
      "service_net.h1_3": "Autonomous Access Control",
      "service_net.p3": "We implement biometric and digital systems for intelligent management of pedestrian and vehicular flows.",
      "service_net.btn_quote": "Get Quote",
      "service_net.badge4": "CCTV",
      "service_net.h1_4": "AI Video Surveillance",
      "service_net.p4": "Advanced video systems with real-time data analysis for critical sectors.",
      "service_net.btn_consult": "Consult Solutions",
      "service_net.badge5": "Towers & Poles",
      "service_net.h1_5": "Infrastructure & Links",
      "service_net.p5": "Design and deployment of structures for telecommunications and urban links.",
      "service_net.btn_start": "Start Project",
      "service_net.badge6": "Servers",
      "service_net.h1_6": "Server Management & Directory",
      "service_net.p6": "Configuration and administration of corporate servers optimized with critical services.",
      "service_net.btn_support": "Purchase Support",
      "service_net.badge7": "IPTV",
      "service_net.h1_7": "Corporate IPTV Solutions",
      "service_net.p7": "Advanced IP television systems for hotels and WISPs with centralized distribution.",
      "service_net.btn_consult2": "Request Consulting",
      "service_net.breadcrumb": "Commercial & Industrial Networks",
      "service_net.voip.badge": "VOIP",
      "service_net.voip.h1": "Enterprise IP Telephony",
      "service_net.voip.p": "Scalable VoIP solutions designed to optimize communication in hotels and operations centers, integrating advanced features under centralized management.",
      "service_net.voip.btn": "Modernize Communications",
      "service_net.vpn.badge": "VPN",
      "service_net.vpn.h1": "Private VPN Networks",
      "service_net.vpn.p": "Implementation of encrypted tunnels to interconnect branches and remote users, ensuring a secure work environment and operational continuity from anywhere.",
      "service_net.vpn.btn": "Secure Connection",
      "service_net.maintenance.badge": "Maintenance",
      "service_net.maintenance.h1": "Critical Sites Maintenance",
      "service_net.maintenance.p": "Specialized service for managing and protecting data centers and communication systems, ensuring 24/7 operation of your most valuable infrastructure.",
      "service_net.maintenance.btn": "Protect Infrastructure",
      "service_net.cabling.badge": "Networks",
      "service_net.cabling.h1": "Structured Cabling & Racks",
      "service_net.cabling.p": "Engineering and deployment of physical networks under international standards, ensuring organized, certified systems ready for future expansions.",
      "service_net.cabling.btn": "Request Consulting",
      "service_net.telemetry.badge": "VOIP",
      "service_net.telemetry.h1": "Telemetry & Industrial Control",
      "service_net.telemetry.p": "Remote monitoring systems for critical variables in industrial processes, with robust hardware designed to operate in extreme conditions.",
      "service_net.telemetry.btn": "Modernize Communications",
      "service_net.hybrid.badge": "Communication Media",
      "service_net.hybrid.h1": "Hybrid Network Deployments",
      "service_net.hybrid.p": "Design and installation of fiber, copper and wireless infrastructures, selecting the optimal physical medium according to distance, environment and operational requirements.",
      "service_net.hybrid.btn": "Consult Engineering",
      "service_net.migration.badge": "Migration",
      "service_net.migration.h1": "Migration to Industry 4.0",
      "service_net.migration.p": "We transform legacy systems (RS232/RS485) to Ethernet/IP networks, integrating your industrial equipment with SCADA platforms and modern automation systems.",
      "service_net.migration.btn": "Modernize Plant",
      "service_net.redundant.badge": "Redundant Systems",
      "service_net.redundant.h1": "Fault-Tolerant Networks",
      "service_net.redundant.p": "We implement architectures with automatic failover and load balancing, ensuring your connectivity stays active even during critical hardware or provider failures.",
      "service_net.redundant.btn": "Guarantee Operation",
      "service_net.hotspot.badge": "HOTSPOT",
      "service_net.hotspot.h1": "Captive Portals & Managed WiFi",
      "service_net.hotspot.p": "Secure internet access solutions for the hospitality and commercial sector, with personalized welcome portals and granular user profile management.",
      "service_net.hotspot.btn": "Implement Hotspot",
      "contact.hero": "Contact Us",
      "contact.badge": "Contact Us",
      "contact.h1": "If you have any query, please contact us",
      "contact.form.name": "Your Name",
      "contact.form.email": "Your Email",
      "contact.form.subject": "Subject",
      "contact.form.message": "Message",
      "contact.form.submit": "Send Message",
      "buy_pro": "Buy Pro Version",
      "footer.terms": "Terms & Condition",
      "footer.privacy": "Privacy Policy",
      "footer.getInTouch": "Get In Touch",
      "footer.popular": "Popular Link",
      "footer.link.about": "About Us",
      "footer.link.contact": "Contact Us",
      "footer.link.privacy": "Privacy Policy",
      "footer.link.terms": "Terms & Condition",
      "footer.link.career": "Career",
      "footer.ourServices": "Our Services",
      "footer.service.link1": "Robotic Automation",
      "footer.service.link2": "Machine Learning",
      "footer.service.link3": "Predictive Analysis",
      "footer.service.link4": "Data Science",
      "footer.service.link5": "Robot Technology",
      "hero.badge": "WONTEC",
      "hero.h1": "Technology that empowers industries and connects regions.",
      "hero.p": "We are a team delivering complete telecommunications solutions tailored to diverse sectors.",
      "dobleu.feature1.title": "Your local world in one place",
      "dobleu.feature1.p": "The definitive platform for semi-urban areas that connects users with the best of their surroundings.",
      "dobleu.feature2.title": "Efficient logistics on the move",
      "dobleu.feature2.p": "Designed for our rider network. Optimize delivery routes and enable precise tracking to guarantee fast deliveries.",
      "dobleu.feature3.title": "Your business strategic ally",
      "dobleu.feature3.p": "We empower merchants and professionals to manage orders, appointments and digitize services with a productivity-focused interface.",
      "dobleu.cards.title": "More about DOBLEU",
      "dobleu.carousel.item1": "DOBLEU App",
      "dobleu.carousel.item2": "DOBLEU Partners",
      "dobleu.carousel.item3": "DOBLEU Rider",
      "dobleu.carousel.item4": "DOBLEU Home",
      "dobleu.carousel.item5": "DOBLEU Box",
      "dobleu.feature1.li1": "Food delivery: Your craving one click away.",
      "dobleu.feature1.li2": "Services: From repairs to laundry, everything inside the app.",
      "dobleu.feature1.li3": "Errands: Don't worry, we deliver it for you.",
      "dobleu.feature2.li1": "Deliveries: Bringing happiness to your home.",
      "dobleu.feature2.li2": "Teams: Build your crew and stay connected.",
      "dobleu.feature2.li3": "Support: We're with you for any issue.",
      "dobleu.feature3.li1": "Businesses: Your business, now one click away.",
      "dobleu.feature3.li2": "Services: Covering all your needs inside one app.",
      "dobleu.footer.svc1": "Information Technologies",
      "dobleu.footer.svc2": "Cybersecurity",
      "dobleu.footer.svc3": "Commercial & Industrial Networks",
      "cases.case1.cat": "Fiber Optics",
      "cases.case1.title": "Mitsuietco",
      "cases.case1.modalTitle": "Mitsuietco",
      "cases.case1.modalP": "Implementation of fiber-optic infrastructure to ensure high-speed connectivity. Solution that improved user experience and reduced latency in critical company operations.",
      "cases.case2.cat": "Machine learning",
      "cases.case2.title": "Network deployment at ATVM Atotonilco Plant",
      "cases.case2.modalTitle": "Network deployment at ATVM Plant",
      "cases.case2.modalP": "Installation and configuration of robust network infrastructure at the Atotonilco plant. Implementation included redundancy systems and 24/7 monitoring to ensure continuous availability in critical operations.",
      "cases.case3.cat": "Predictive Analysis",
      "cases.case3.title": "Proyecta",
      "cases.case3.modalTitle": "Proyecta",
      "cases.case3.modalP": "Development of a predictive analysis platform using machine learning for business data forecasting. Solution that optimized decision making and improved operational efficiency.",
      "service_page.badge": "Our Services",
      "service_page.h1": "Our Services",
      "service_page.h1_2": "Our Excellent AI Solutions for Your Business",
      "service_page.p": "Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit.",
      "service_page.read_more": "Read More",
      "service_page.item1.title": "Robotic Automation",
      "service_page.item1.p": "Erat ipsum justo amet duo et elitr dolor.",
      "service_page.item2.title": "Machine Learning",
      "service_page.item2.p": "Erat ipsum justo amet duo et elitr dolor.",
      "service_page.item3.title": "Education & Science",
      "service_page.item3.p": "Erat ipsum justo amet duo et elitr dolor.",
      "service_page.item4.title": "Predictive Analysis",
      "service_page.item4.p": "Erat ipsum justo amet duo et elitr dolor.",
      "project.badge": "Case Study",
      "project.h1": "Explore Our Recent AI Case Studies",
    },
    es: {
      "nav.home": "Inicio",
      "nav.about": "Conócenos",
      "nav.services": "Servicios",
      "nav.cases": "Casos de Éxito",
      "nav.contact": "Contacto",
      "nav.dobleu": "Dobleu",
      "hero.title": "DOBLEU",
      "partners.text": "Conoce todo lo que DOBLEU tiene para ofrecerte",
      "card1.title": "DOBLEU Home",
      "card1.muted": "Inteligencia aplicada al hogar.",
      "card1.p": "Transformamos viviendas en entornos inteligentes: controla accesos, dispositivos y automatizaciones desde tu celular.",
      "card2.title": "DOBLEU Box",
      "card2.muted": "Gestión inteligente para cualquier entorno.",
      "card2.p": "La solución IoT avanzada para tu hogar. Monitorea variables críticas y gestiona la infraestructura de tu hogar en tiempo real, elevando la experiencia del usuario y la eficiencia operativa.",
      "cta.h2": "Todo lo que necesitas, donde tú estes",
      "cta.h3": "Desde tu antojo favorito hasta ese mandadito urgente, DOBLEU lo hace por ti",
      "footer.desc": "Telecomunicaciones, redes empresariales, seguridad informática y desarrollo de software para impulsar industrias en Latinoamérica.",
      "footer.services": "Servicios",
      "footer.contact": "Contacto",
      "footer.emailLabel": "Correo:",
      "footer.email": "fermin.garcia@wontec.com.mx",
      "footer.hoursLabel": "Horario de servicio:",
      "footer.hours": "Lunes - Viernes: 09.00 AM - 5.00 PM",
      "footer.phoneLabel": "Telefono de contacto:",
      "footer.phone": "773 154 4230"
      ,
      "about.badge": "Conócenos",
      "about.h1": "Conectamos industrias con tecnología segura y escalable",
      "about.p": "En WONTEC diseñamos, implementamos y mantenemos soluciones en telecomunicaciones, redes empresariales, seguridad informática y desarrollo de software para hoteles, hospitales, industrias y gobierno.",
      "about.item1": "Redes & Fibra Óptica",
      "about.item2": "Servidores Linux/Windows",
      "about.item3": "Seguridad & Firewalls",
      "about.item4": "Soporte 24/7",
      "services.badge": "Nuestros Servicios",
      "services.h1": "Soluciones Tecnológicas Integrales",
      "services.p": "Implementamos infraestructura de redes, seguridad, servidores y desarrollo de software para empresas que necesitan estabilidad, monitoreo 24/7 y alto desempeño.",
      "services.ti.title": "TECNOLOGÍAS DE LA INFORMACIÓN",
      "services.ti.p": "Telecomunicaciones, desarrollo web y desarrollo de apps a medida para empresas.",
      "services.sec.title": "SEGURIDAD INFORMÁTICA",
      "services.sec.p": "Soluciones Fortinet, Cisco ASA, Ubiquiti/Unifi y monitoreo proactivo.",
      "services.net.title": "REDES COMERCIALES E INDUSTRIALES",
      "services.net.p": "Servidores Linux/Windows, CCTV, IPTV, VoIP y soluciones industriales robustas.",
      "services.more": "Más información",
      "cases.badge": "Casos de Éxito",
      "cases.h1": "Casos de Éxito Recientes",
      "partners.title": "Nuestros Partners",
      "partners.explore": "Explorar",
      "footer.svc.ti": "Tecnologías de la información",
      "footer.svc.cs": "Seguridad informática",
      "footer.svc.net": "Redes comerciales e industriales",
      "service_ti.hero": "Tecnologías de la información",
      "service_ti.badge1": "Tecnologías de la información",
      "service_ti.h1_1": "Desarrollo Multiplataforma",
      "service_ti.p1": "Soluciones nativas para iOS y Android junto a sistemas web optimizados para llevar la gestión de tu negocio al siguiente nivel tecnológico.",
      "service_ti.btn_consult": "Solicitar Consultoría",
      "service_ti.badge2": "Telecomunicaciones",
      "service_ti.h1_2": "Conectividad de Alta Disponibilidad",
      "service_ti.p2": "Garantizamos acceso a internet estable y seguro en entornos corporativos y zonas rurales.",
      "service_ti.btn_contract": "Contratar Plan",
      "service_ti.item1": "Arquitectura Escalable",
      "service_ti.item2": "Diseño UX/UI Premium",
      "service_ti.item3": "Soporte de Vanguardia",
      "service_ti.item4": "Alcance Geográfico Total",
      "service_ti.item5": "Soporte Proactivo 24/7",
      "service_ti.breadcrumb": "Tecnologías de la información",
      "service_sec.hero": "Seguridad informática",
      "service_sec.badge1": "Seguridad informática",
      "service_sec.h1_1": "Protección Integral 360°",
      "service_sec.p1": "Blindamos tu infraestructura mediante la convergencia de seguridad física avanzada y ciberseguridad robusta.",
      "service_sec.btn_diag": "Solicitar Diagnóstico",
      "service_sec.badge2": "Firewalls",
      "service_sec.h1_2": "Protección de Red Avanzada",
      "service_sec.p2": "Blindamos la infraestructura de tu negocio mediante firewalls de última generación.",
      "service_sec.btn_impl": "Implementar Seguridad",
      "service_net.hero": "Redes comerciales e industriales",
      "service_net.badge1": "Redes",
      "service_net.h1_1": "Redes de Alto Rendimiento",
      "service_net.p1": "Diseño e implementación de arquitecturas de red robustas para entornos de alta exigencia.",
      "service_net.btn_design": "Solicitar Diseño",
      "service_net.badge2": "LAN & WiFi",
      "service_net.h1_2": "Soluciones LAN & WiFi 6",
      "service_net.p2": "Desplegamos redes unificadas que eliminan puntos muertos y garantizan una transición fluida.",
      "service_net.btn_improve": "Mejorar Conectividad",
      "service_net.badge3": "IOT",
      "service_net.h1_3": "Control de Acceso Autónomo",
      "service_net.p3": "Implementamos sistemas biométricos y digitales de última generación para la gestión inteligente de flujos.",
      "service_net.btn_quote": "Cotizar Sistema",
      "service_net.badge4": "CCTV",
      "service_net.h1_4": "Videovigilancia con IA",
      "service_net.p4": "Sistemas de video avanzados con análisis de datos en tiempo real para sectores críticos.",
      "service_net.btn_consult": "Consultar Soluciones",
      "service_net.badge5": "Torres y posterias",
      "service_net.h1_5": "Infraestructura y Enlaces",
      "service_net.p5": "Diseño y despliegue de estructuras para telecomunicaciones y enlaces urbanos.",
      "service_net.btn_start": "Iniciar Proyecto",
      "service_net.badge6": "Servidores",
      "service_net.h1_6": "Gestión de Servidores y Directorio",
      "service_net.p6": "Configuración y administración de servidores corporativos optimizados con servicios críticos.",
      "service_net.btn_support": "Contratar Soporte",
      "service_net.badge7": "IPTV",
      "service_net.h1_7": "Soluciones de IPTV Corporativa",
      "service_net.p7": "Sistemas avanzados de televisión sobre IP para hoteles y WISP.",
      "service_net.btn_consult2": "Solicitar consultoria",
      "service_net.breadcrumb": "Redes comerciales e industriales",
      "service_net.voip.badge": "VOIP",
      "service_net.voip.h1": "Telefonía IP Empresarial",
      "service_net.voip.p": "Soluciones de voz sobre IP escalables diseñadas para optimizar la comunicación en hoteles y centros operativos, integrando funciones avanzadas bajo una administración centralizada.",
      "service_net.voip.btn": "Modernizar Comunicaciones",
      "service_net.vpn.badge": "VPN",
      "service_net.vpn.h1": "Redes Privadas VPN",
      "service_net.vpn.p": "Implementación de túneles cifrados para interconectar sucursales y usuarios remotos, garantizando un entorno de trabajo seguro y la continuidad operativa desde cualquier lugar.",
      "service_net.vpn.btn": "Asegurar Conexión",
      "service_net.maintenance.badge": "Mantenimiento",
      "service_net.maintenance.h1": "Mantenimiento de Critical Sites",
      "service_net.maintenance.p": "Servicio especializado en la gestión y protección de centros de datos y sistemas de comunicación, asegurando la operatividad 24/7 de tu infraestructura más valiosa.",
      "service_net.maintenance.btn": "Proteger Infraestructura",
      "service_net.cabling.badge": "Redes",
      "service_net.cabling.h1": "Cableado Estructurado y Racks",
      "service_net.cabling.p": "Ingeniería y despliegue de redes físicas bajo estándares internacionales, garantizando sistemas ordenados, certificados y preparados para futuras expansiones.",
      "service_net.cabling.btn": "Solicitar Consultoría",
      "service_net.telemetry.badge": "VOIP",
      "service_net.telemetry.h1": "Telemetría y Control Industrial",
      "service_net.telemetry.p": "Sistemas de monitoreo remoto en tiempo real para variables críticas en procesos industriales, con hardware robusto diseñado para operar en condiciones extremas.",
      "service_net.telemetry.btn": "Modernizar Comunicaciones",
      "service_net.hybrid.badge": "Medios de comunicación",
      "service_net.hybrid.h1": "Despliegue de Redes Híbridas",
      "service_net.hybrid.p": "Diseño e instalación de infraestructuras en fibra óptica, cobre y enlaces inalámbricos, seleccionando el medio físico óptimo según la distancia, el entorno y los requisitos de tu operación.",
      "service_net.hybrid.btn": "Consultar Ingeniería",
      "service_net.migration.badge": "Migración",
      "service_net.migration.h1": "Migración a Industria 4.0",
      "service_net.migration.p": "Transformamos sistemas legados (RS232/RS485) a redes Ethernet/IP, integrando tus equipos industriales con plataformas SCADA y sistemas de automatización modernos.",
      "service_net.migration.btn": "Modernizar Planta",
      "service_net.redundant.badge": "Sistemas redundantes",
      "service_net.redundant.h1": "Redes con Tolerancia a Fallos",
      "service_net.redundant.p": "Implementamos arquitecturas con failover automático y balanceo de carga, asegurando que tu conectividad permanezca activa incluso ante fallos críticos de hardware o proveedores.",
      "service_net.redundant.btn": "Garantizar Operación",
      "service_net.hotspot.badge": "HOTSPOT",
      "service_net.hotspot.h1": "Portales Cautivos y WiFi Gestionado",
      "service_net.hotspot.p": "Soluciones de acceso a internet seguro para el sector hotelero y comercial, con portales de bienvenida personalizados y administración granular de perfiles de usuario.",
      "service_net.hotspot.btn": "Implementar Hotspot",
      "contact.hero": "Contact Us",
      "contact.badge": "Contact Us",
      "contact.h1": "If You Have Any Query, Please Contact Us",
      "contact.form.name": "Your Name",
      "contact.form.email": "Your Email",
      "contact.form.subject": "Subject",
      "contact.form.message": "Message",
      "contact.form.submit": "Send Message",
      "buy_pro": "Comprar Versión Pro",
      "footer.terms": "Términos y Condiciones",
      "footer.privacy": "Política de Privacidad",
      "footer.getInTouch": "Contáctanos",
      "footer.popular": "Enlaces Populares",
      "footer.link.about": "Sobre Nosotros",
      "footer.link.contact": "Contáctanos",
      "footer.link.privacy": "Política de Privacidad",
      "footer.link.terms": "Términos y Condiciones",
      "footer.link.career": "Carreras",
      "footer.ourServices": "Nuestros Servicios",
      "footer.service.link1": "Automatización Robótica",
      "footer.service.link2": "Machine Learning",
      "footer.service.link3": "Análisis Predictivo",
      "footer.service.link4": "Ciencia de Datos",
      "footer.service.link5": "Tecnología Robótica",
      "hero.badge": "WONTEC",
      "hero.h1": "Tecnología que impulsa industrias y conecta regiones.",
      "hero.p": "Somos un equipo que ofrece soluciones completas en telecomunicaciones, adaptadas a diversos sectores.",
      "dobleu.feature1.title": "Tu mundo local en un solo lugar",
      "dobleu.feature1.p": "La plataforma definitiva para zonas semiurbanas que conecta a los usuarios con lo mejor de su entorno.",
      "dobleu.feature2.title": "Logística eficiente en movimiento",
      "dobleu.feature2.p": "Diseñada para nuestra red de mensajeros. Optimiza rutas de entrega y permite un seguimiento preciso.",
      "dobleu.feature3.title": "El aliado estratégico de tu negocio",
      "dobleu.feature3.p": "Potenciamos comercios y profesionales para gestionar pedidos, agendas y digitalizar servicios.",
      "dobleu.cards.title": "Mas sobre DOBLEU",
      "dobleu.carousel.item1": "DOBLEU App",
      "dobleu.carousel.item2": "DOBLEU Partners",
      "dobleu.carousel.item3": "DOBLEU Rider",
      "dobleu.carousel.item4": "DOBLEU Home",
      "dobleu.carousel.item5": "DOBLEU Box",
      "dobleu.feature1.li1": "Comida a domicilio: Tu antojo al alcance de un clic.",
      "dobleu.feature1.li2": "Servicios: Desde una reparación hasta lavandería, todo eso y más dentro de la app.",
      "dobleu.feature1.li3": "Mandaditos: No te preocupes, nosotros lo llevamos.",
      "dobleu.feature2.li1": "Entregas: Llevando la felicidad a tu casa.",
      "dobleu.feature2.li2": "Equipos: Forma tu team y mantente conectado.",
      "dobleu.feature2.li3": "Soporte: Estaremos contigo ante cualquier problemática.",
      "dobleu.feature3.li1": "Negocios: Tu negocio, ahora disponible a un clic.",
      "dobleu.feature3.li2": "Servicios: Cubriendo todas tus necesidades dentro de una app.",
      "dobleu.footer.svc1": "Tecnologías de la información",
      "dobleu.footer.svc2": "Seguridad informática",
      "dobleu.footer.svc3": "Redes comerciales e industriales",
      "cases.case1.cat": "Fibra Óptica",
      "cases.case1.title": "Mitsuietco",
      "cases.case1.modalTitle": "Mitsuietco",
      "cases.case1.modalP": "Implementación de infraestructura de fibra óptica para garantizar conectividad de alta velocidad. Solución que permitió mejorar la experiencia del usuario y reducir latencia en las operaciones críticas de la empresa.",
      "cases.case2.cat": "Machine learning",
      "cases.case2.title": "Implementación de red en Planta ATVM Atotonilco",
      "cases.case2.modalTitle": "Implementación de red en Planta ATVM",
      "cases.case2.modalP": "Instalación y configuración de infraestructura de red robusta en la planta de Atotonilco. Implementación que incluyó sistemas de redundancia y monitoreo 24/7 para garantizar disponibilidad continua en operaciones críticas.",
      "cases.case3.cat": "Predictive Analysis",
      "cases.case3.title": "Proyecta",
      "cases.case3.modalTitle": "Proyecta",
      "cases.case3.modalP": "Desarrollo de plataforma de análisis predictivo que utiliza machine learning para forecasting de datos empresariales. Solución que permitió optimizar toma de decisiones y mejorar la eficiencia operacional.",
      "service_page.badge": "Nuestros Servicios",
      "service_page.h1": "Nuestros Servicios",
      "service_page.h1_2": "Nuestras Excelentes Soluciones de IA para tu Empresa",
      "service_page.p": "Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit.",
      "service_page.read_more": "Leer más",
      "service_page.item1.title": "Automatización Robótica",
      "service_page.item1.p": "Erat ipsum justo amet duo et elitr dolor.",
      "service_page.item2.title": "Machine Learning",
      "service_page.item2.p": "Erat ipsum justo amet duo et elitr dolor.",
      "service_page.item3.title": "Educación & Ciencia",
      "service_page.item3.p": "Erat ipsum justo amet duo et elitr dolor.",
      "service_page.item4.title": "Análisis Predictivo",
      "service_page.item4.p": "Erat ipsum justo amet duo et elitr dolor.",
      "project.badge": "Casos",
      "project.h1": "Explora nuestros casos de IA más recientes",
    }
  };

  function applyLang(lang){
    // First, apply explicit data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const txt = (i18n[lang] && i18n[lang][key]) ? i18n[lang][key] : null;
      if(txt !== null){
        el.textContent = txt;
      }
    });

    // Conservative fallback: translate elements without data-i18n by matching their exact text
    // Only apply to elements without child elements (to avoid breaking HTML structure)
    const srcLang = (lang === 'es') ? 'en' : 'es';
    const srcDict = i18n[srcLang] || {};
    const tgtDict = i18n[lang] || {};

    document.querySelectorAll('body *').forEach(el => {
      if(el.hasAttribute('data-i18n')) return; // already handled
      if(el.children && el.children.length > 0) return; // skip containers
      // ignore inputs, images, SVGs, and buttons with HTML
      const tag = el.tagName.toLowerCase();
      if(['img','svg','input','textarea','select'].includes(tag)) return;

      const text = el.textContent && el.textContent.trim();
      if(!text) return;

      // attempt to find a key whose srcLang value equals the current text
      for(const k in srcDict){
        if(!Object.prototype.hasOwnProperty.call(srcDict,k)) continue;
        const srcVal = srcDict[k];
        if(typeof srcVal !== 'string') continue;
        if(srcVal.trim() === text){
          const tgtVal = tgtDict[k];
          if(tgtVal) el.textContent = tgtVal;
          break;
        }
      }
    });
    localStorage.setItem('site_lang', lang);
    updateActiveButtons(lang);
  }

  function updateActiveButtons(lang){
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  // attach handlers
  // Use event delegation so buttons injected later (partials) still work
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if(btn){
      e.preventDefault();
      const l = btn.getAttribute('data-lang');
      applyLang(l);
    }
  });

  // Ensure translations are applied now and whenever partials are injected
  const saved = localStorage.getItem('site_lang') || 'es';
  try{ applyLang(saved); } catch(e){ console.warn('i18n applyLang failed on init', e); }

  // always re-apply when partials load (listener registered immediately)
  document.addEventListener('partialsLoaded', function(){
    applyLang(localStorage.getItem('site_lang') || saved);
  });

  // also re-apply on DOMContentLoaded in case resources were not ready
  document.addEventListener('DOMContentLoaded', function(){
    applyLang(localStorage.getItem('site_lang') || saved);
  });
})();
