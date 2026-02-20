import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="mesh-gradient">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      <section className="hero">
        <div className="badge">
          <span>✦</span> SaaS para Advogados
        </div>

        <h1 className="hero-title">
          Sua advocacia,<br />
          <span>elevada ao topo.</span>
        </h1>

        <p className="hero-subtitle">
          A plataforma definitiva para gestão jurídica.
          Segurança, velocidade e sofisticação para o seu escritório.
        </p>

        <Link to="/register" className="hero-button">
          <span>Começar Agora</span>

          <div className="button-glow"></div>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </div>
  );
}