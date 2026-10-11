import { site } from '../content/site';

export type Inquiry = {
  name: string;
  company: string;
  email: string;
  services: string[];
  message: string;
  consent: boolean;
  /** 스팸 방지용 숨은 필드. 사람이 채울 일은 없습니다. */
  website: string;
  source?: string;
};

export type Errors = Partial<Record<'name' | 'company' | 'email' | 'services' | 'message' | 'consent', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v: Inquiry): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = '이름을 입력해 주세요.';
  if (!v.company.trim()) e.company = '회사명 또는 소속을 입력해 주세요. 개인이라면 ‘개인’이라고 적어 주세요.';
  if (!v.email.trim()) e.email = '회신받을 이메일을 입력해 주세요.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = '이메일 형식을 확인해 주세요. 예: name@company.com';
  if (!v.services.length) e.services = '관심 서비스를 하나 이상 선택해 주세요.';
  if (v.message.trim().length < 10) e.message = '문의 내용을 10자 이상 적어 주세요.';
  if (!v.consent) e.consent = '개인정보 수집·이용에 동의해야 문의를 보낼 수 있습니다.';
  return e;
}

export type SubmitResult = { status: 'sent' } | { status: 'demo'; mailto: string | null } | { status: 'error'; message: string };

/**
 * 문의 전송.
 * - VITE_FORM_ENDPOINT 가 있으면 JSON 으로 POST 합니다. (Formspree, Web3Forms, Getform, 자체 API 등)
 * - 없으면 데모 모드: 실제로 전송하지 않고, 대표 이메일이 있으면 메일 앱으로 보낼 수 있는 링크를 돌려줍니다.
 */
export async function submitInquiry(v: Inquiry): Promise<SubmitResult> {
  if (v.website) return { status: 'sent' }; // 봇으로 판단: 조용히 성공 처리
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
  const payload = {
    name: v.name.trim(),
    company: v.company.trim(),
    email: v.email.trim(),
    services: v.services.join(', '),
    message: v.message.trim(),
    consent: v.consent ? 'agreed' : 'no',
    source: v.source ?? '',
    _subject: `[Meister 문의] ${v.company.trim()} · ${v.name.trim()}`,
  };

  if (!endpoint) {
    const mailto = site.email
      ? `mailto:${site.email}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(
          `이름: ${payload.name}\n회사: ${payload.company}\n이메일: ${payload.email}\n관심 서비스: ${payload.services}\n\n${payload.message}`,
        )}`
      : null;
    await new Promise((r) => setTimeout(r, 700));
    return { status: 'demo', mailto };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(String(res.status));
    return { status: 'sent' };
  } catch {
    return { status: 'error', message: '전송 중 문제가 생겼습니다. 잠시 후 다시 시도하거나 이메일로 직접 연락해 주세요.' };
  }
}
