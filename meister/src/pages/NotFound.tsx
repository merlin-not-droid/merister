import { ButtonLink } from '../components/Button';

export default function NotFound() {
  return (
    <section className="nf surface-ink grain" aria-labelledby="page-title">
      <div className="container nf__inner">
        <p className="nf__code display" aria-hidden="true">
          OFFSIDE
        </p>
        <h1 id="page-title" className="h2">
          찾으시는 페이지가 없습니다.
        </h1>
        <p className="lead">주소가 바뀌었거나 아직 준비 중인 페이지입니다. 홈에서 다시 시작해 주세요.</p>
        <div className="nf__ctas">
          <ButtonLink to="/">홈으로</ButtonLink>
          <ButtonLink to="/contact" variant="ghost">
            협업 문의
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
