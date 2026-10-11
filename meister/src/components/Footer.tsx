import { Link } from 'react-router-dom';
import { nav, site } from '../content/site';
import { services } from '../content/services';
import { Pending } from './Pending';

export function Footer() {
  return (
    <footer className="footer surface-ink">
      <div className="container">
        <div className="footer__top">
          <p className="footer__statement">
            스포츠의 감동을
            <br />
            사람들에게 전달합니다.
          </p>
          <div className="footer__cols">
            <div>
              <h2 className="footer__h">Menu</h2>
              <ul role="list">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="link">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="footer__h">Services</h2>
              <ul role="list">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services#${s.id}`} className="link">
                      {s.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="footer__h">Contact</h2>
              <ul role="list">
                <li>{site.email ? <a href={`mailto:${site.email}`} className="link">{site.email}</a> : <Pending label="대표 이메일" />}</li>
                {site.social.map((s) => (
                  <li key={s.label}>
                    {s.href ? (
                      <a href={s.href} className="link" target="_blank" rel="noreferrer">
                        {s.label}
                      </a>
                    ) : (
                      <span className="footer__muted">
                        {s.label} <Pending label="계정 주소" />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__word display" aria-hidden="true">
          Meister
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} Meister. {site.legalName ?? <Pending label="법인명" />} · 사업자등록번호{' '}
            {site.businessNumber ?? <Pending label="설립 후 기재" />}
          </p>
          <p className="footer__links">
            <Link to="/privacy" className="link">
              개인정보 처리방침
            </Link>
            <span className="footer__ft mono" aria-hidden="true">
              90:00 — FULL TIME. 끝까지 봐주셔서 고맙습니다.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
