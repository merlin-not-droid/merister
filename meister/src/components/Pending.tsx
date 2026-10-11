/** 확정되지 않은 정보 자리 표시. 실제 자료가 들어오면 값으로 교체합니다. */
export function Pending({ label, block = false }: { label: string; block?: boolean }) {
  return (
    <span className={`pending ${block ? 'pending--block' : ''}`}>
      <span className="pending__tag">[자료 필요]</span>
      <span className="pending__label">{label}</span>
    </span>
  );
}

export function ProposalTag({ children = '제안' }: { children?: string }) {
  return <span className="tag tag--proposal">{children}</span>;
}
