import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Pending } from '../components/Pending';
import { services } from '../content/services';
import { site } from '../content/site';
import { submitInquiry, validate, type Errors, type Inquiry, type SubmitResult } from '../lib/inquiry';

const serviceOptions = [...services.map((s) => ({ id: s.id, label: s.ko, en: s.en })), { id: 'other', label: '기타 · 아직 정하지 못함', en: 'Other' }];

const steps = [
  { t: '문의 접수', d: '폼 또는 이메일로 내용을 남겨주세요.' },
  { t: '회신', d: '영업일 기준 2일 안에 담당자가 회신합니다.' },
  { t: '첫 미팅', d: '목표·일정·예산 범위를 30분 정도 함께 정리합니다.' },
  { t: '제안', d: '진행 범위와 산출물, 일정을 담은 제안서를 드립니다.' },
];

export default function Contact() {
  const [params] = useSearchParams();
  const initialService = params.get('service');
  const from = params.get('from') ?? '';

  const [values, setValues] = useState<Inquiry>({
    name: '',
    company: '',
    email: '',
    services: [],
    message: '',
    consent: false,
    website: '',
    source: '',
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Errors, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  // 프리렌더된 HTML 과 첫 렌더를 맞추기 위해, 주소의 ?service= 값은 마운트 후에 반영합니다.
  useEffect(() => {
    const valid = initialService && serviceOptions.some((o) => o.id === initialService);
    setValues((v) => ({ ...v, source: from, services: valid && !v.services.includes(initialService) ? [initialService] : v.services }));
  }, [initialService, from]);

  const errors = useMemo(() => validate(values), [values]);
  const show = (k: keyof Errors) => (submitted || touched[k]) && errors[k];
  const set = <K extends keyof Inquiry>(k: K, val: Inquiry[K]) => setValues((v) => ({ ...v, [k]: val }));
  const blur = (k: keyof Errors) => () => setTouched((t) => ({ ...t, [k]: true }));

  const toggleService = (id: string) => {
    setValues((v) => ({ ...v, services: v.services.includes(id) ? v.services.filter((s) => s !== id) : [...v.services, id] }));
    setTouched((t) => ({ ...t, services: true }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setSending(true);
    const r = await submitInquiry({ ...values, services: values.services.map((id) => serviceOptions.find((o) => o.id === id)?.label ?? id) });
    setSending(false);
    setResult(r);
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const reset = () => {
    setValues({ name: '', company: '', email: '', services: [], message: '', consent: false, website: '', source: '' });
    setTouched({});
    setSubmitted(false);
    setResult(null);
  };

  const errCount = Object.keys(errors).length;
  const describe = (k: keyof Errors, extra?: string) => [extra, show(k) ? `err-${k}` : null].filter(Boolean).join(' ') || undefined;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        en={"Let's Talk\n*Game Plan.*"}
        title="협업 문의"
        lead={<p>스폰서십, 스포츠 이벤트, 선수 매니지먼트 등 어떤 단계의 고민이든 괜찮습니다. 아래 내용을 남겨주시면 영업일 기준 2일 안에 회신드립니다.</p>}
      />

      <section className="section surface-paper contact" aria-label="문의 양식">
        <div className="container contact__grid">
          <aside className="contact__aside">
            <h2 className="contact__h mono">Direct</h2>
            <ul role="list" className="contact__direct">
              <li>
                <Mail size={18} aria-hidden="true" />
                {site.email ? (
                  <a href={`mailto:${site.email}`} className="link">
                    {site.email}
                  </a>
                ) : (
                  <Pending label="대표 이메일" />
                )}
              </li>
              {site.social.map((s) => (
                <li key={s.label}>
                  <ArrowUpRight size={18} aria-hidden="true" />
                  {s.href ? (
                    <a href={s.href} className="link" target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  ) : (
                    <span>
                      {s.label} <Pending label="계정" />
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <h2 className="contact__h mono">Process</h2>
            <ol role="list" className="contact__steps">
              {steps.map((s, i) => (
                <li key={s.t}>
                  <span className="mono">0{i + 1}</span>
                  <div>
                    <strong>{s.t}</strong>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          <div className="contact__main">
            {result && result.status !== 'error' ? (
              <div ref={resultRef} tabIndex={-1} className="form-result" role="status">
                <CheckCircle2 size={40} aria-hidden="true" />
                {result.status === 'sent' ? (
                  <>
                    <h2 className="h3">문의가 접수되었습니다.</h2>
                    <p>보내주신 내용을 확인한 뒤 {values.email || '입력하신 이메일'}로 영업일 기준 2일 안에 회신드리겠습니다.</p>
                  </>
                ) : (
                  <>
                    <h2 className="h3">입력 내용이 확인되었습니다. (데모 모드)</h2>
                    <p>
                      아직 문의 수신 서비스가 연결되지 않아 실제로 전송되지는 않았습니다. 운영 전 <code>VITE_FORM_ENDPOINT</code>를 설정하면 이 화면에서 바로 접수됩니다.
                    </p>
                    {result.mailto ? (
                      <a className="btn btn--primary" href={result.mailto}>
                        <span className="btn__label">메일 앱으로 보내기</span>
                      </a>
                    ) : (
                      <p>
                        <Pending label="대표 이메일이 등록되면 메일 앱으로 보내기 버튼이 표시됩니다" />
                      </p>
                    )}
                  </>
                )}
                <button type="button" className="btn btn--ghost" onClick={reset}>
                  <span className="btn__label">새 문의 작성</span>
                </button>
              </div>
            ) : (
              <form className="form" noValidate onSubmit={onSubmit} aria-describedby="form-required-note">
                <p id="form-required-note" className="form__note">
                  <span aria-hidden="true">*</span> 표시는 필수 항목입니다.
                </p>

                {submitted && errCount > 0 && (
                  <div ref={summaryRef} tabIndex={-1} className="form__summary" role="alert">
                    <AlertCircle size={18} aria-hidden="true" />
                    <span>입력하지 않았거나 확인이 필요한 항목이 {errCount}개 있습니다.</span>
                  </div>
                )}
                {result?.status === 'error' && (
                  <div className="form__summary" role="alert">
                    <AlertCircle size={18} aria-hidden="true" />
                    <span>{result.message}</span>
                  </div>
                )}

                <div className="form__row">
                  <Field id="name" label="이름" error={show('name')}>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => set('name', e.target.value)}
                      onBlur={blur('name')}
                      aria-invalid={!!show('name')}
                      aria-describedby={describe('name')}
                      required
                    />
                  </Field>
                  <Field id="company" label="회사명 · 소속" error={show('company')}>
                    <input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={values.company}
                      onChange={(e) => set('company', e.target.value)}
                      onBlur={blur('company')}
                      aria-invalid={!!show('company')}
                      aria-describedby={describe('company')}
                      required
                    />
                  </Field>
                </div>

                <Field id="email" label="이메일" error={show('email')}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={values.email}
                    onChange={(e) => set('email', e.target.value)}
                    onBlur={blur('email')}
                    aria-invalid={!!show('email')}
                    aria-describedby={describe('email')}
                    required
                  />
                </Field>

                <fieldset className={`field field--chips ${show('services') ? 'has-error' : ''}`} aria-describedby={describe('services')}>
                  <legend className="field__label">
                    관심 서비스 <span aria-hidden="true">*</span>
                    <small> 여러 개 선택 가능</small>
                  </legend>
                  <div className="chips">
                    {serviceOptions.map((o) => (
                      <label key={o.id} className={`chip ${values.services.includes(o.id) ? 'is-on' : ''}`}>
                        <input type="checkbox" name="services" value={o.id} checked={values.services.includes(o.id)} onChange={() => toggleService(o.id)} />
                        <span className="chip__en mono">{o.en}</span>
                        <span>{o.label}</span>
                      </label>
                    ))}
                  </div>
                  {show('services') && (
                    <p id="err-services" className="field__error">
                      {errors.services}
                    </p>
                  )}
                </fieldset>

                <Field id="message" label="문의 내용" error={show('message')} hint={`${values.message.trim().length}자 · 목표, 일정, 예상 규모를 적어주시면 더 정확히 답변드릴 수 있습니다.`}>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={(e) => set('message', e.target.value)}
                    onBlur={blur('message')}
                    aria-invalid={!!show('message')}
                    aria-describedby={describe('message', 'hint-message')}
                    required
                  />
                </Field>

                <div className="form__hp" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website', e.target.value)} />
                </div>

                <div className={`consent ${show('consent') ? 'has-error' : ''}`}>
                  <div className="consent__box">
                    <p className="consent__title">개인정보 수집·이용 안내</p>
                    <dl>
                      <div>
                        <dt>수집 항목</dt>
                        <dd>이름, 회사명·소속, 이메일, 관심 서비스, 문의 내용</dd>
                      </div>
                      <div>
                        <dt>이용 목적</dt>
                        <dd>협업 문의 확인 및 회신</dd>
                      </div>
                      <div>
                        <dt>보유 기간</dt>
                        <dd>문의 처리 완료 후 1년 보관 뒤 파기 (요청 시 즉시 파기)</dd>
                      </div>
                    </dl>
                    <p className="consent__small">
                      동의하지 않을 수 있으며, 동의하지 않으면 문의를 접수할 수 없습니다. 자세한 내용은{' '}
                      <Link to="/privacy" className="link">
                        개인정보 처리방침
                      </Link>
                      을 확인해 주세요.
                    </p>
                  </div>
                  <label className="consent__check">
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => {
                        set('consent', e.target.checked);
                        setTouched((t) => ({ ...t, consent: true }));
                      }}
                      aria-invalid={!!show('consent')}
                      aria-describedby={describe('consent')}
                    />
                    <span className="consent__mark" aria-hidden="true" />
                    <span>
                      개인정보 수집·이용에 동의합니다. <span aria-hidden="true">*</span>
                    </span>
                  </label>
                  {show('consent') && (
                    <p id="err-consent" className="field__error">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn btn--primary form__submit" disabled={sending} aria-busy={sending}>
                  <span className="btn__label">{sending ? '보내는 중…' : '문의 보내기'}</span>
                  {sending && <Loader2 className="spin" size={18} aria-hidden="true" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string | false; hint?: string; children: ReactNode }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label} <span aria-hidden="true">*</span>
      </label>
      {children}
      {hint && (
        <p id={`hint-${id}`} className="field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`err-${id}`} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}
