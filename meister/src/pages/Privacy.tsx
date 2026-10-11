import { Pending } from '../components/Pending';
import { site } from '../content/site';

export default function Privacy() {
  return (
    <>
      <section className="art-hero surface-ink" aria-labelledby="page-title">
        <div className="container container--narrow">
          <p className="eyebrow">Privacy</p>
          <h1 id="page-title" className="h1 art-hero__title">
            개인정보 처리방침
          </h1>
          <p className="lead art-hero__lead">Meister 홈페이지 문의 폼을 통해 수집하는 개인정보에 대한 안내입니다.</p>
        </div>
      </section>
      <article className="section surface-paper art-body legal">
        <div className="container container--narrow">
          <p className="art-draft">초안입니다. 공개 전 법률 검토를 받아 확정하세요. 시행일과 책임자 정보가 필요합니다.</p>
          <h2>1. 수집 항목과 방법</h2>
          <p>홈페이지 문의 폼을 통해 이름, 회사명·소속, 이메일, 관심 서비스, 문의 내용을 수집합니다.</p>
          <h2>2. 이용 목적</h2>
          <p>협업 문의 내용 확인과 회신에만 이용하며, 그 밖의 목적(마케팅 등)으로 이용하지 않습니다.</p>
          <h2>3. 보유 및 이용 기간</h2>
          <p>문의 처리가 끝난 날로부터 1년간 보관한 뒤 지체 없이 파기합니다. 이용자가 요청하면 즉시 파기합니다.</p>
          <h2>4. 처리 위탁</h2>
          <p>
            문의 접수를 위해 외부 폼 수신 서비스를 이용할 수 있습니다. 수탁자와 위탁 업무: <Pending label="사용할 폼 서비스명 (예: Formspree)" />
          </p>
          <h2>5. 이용자의 권리</h2>
          <p>이용자는 언제든지 자신의 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다.</p>
          <h2>6. 개인정보 보호책임자</h2>
          <p>
            {site.privacyOfficer ?? <Pending label="책임자 성명 · 직책" />} / 연락처: {site.email ?? <Pending label="대표 이메일" />}
          </p>
          <h2>7. 시행일</h2>
          <p>
            <Pending label="시행일 (공개일)" />
          </p>
        </div>
      </article>
    </>
  );
}
