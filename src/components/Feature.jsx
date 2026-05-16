import Icon from './Icon.jsx';

/**
 * Magazine-style "cover story" block highlighting Overflow.guru with a stylized in-app preview.
 */
export default function Feature() {
  return (
    <section id="work" className="reveal">
      <div className="section-head">
        <div>
          <div className="section-num">01 / featured release</div>
          <h2 className="section-title">A new tool, just shipped.</h2>
        </div>
        <p className="section-desc">A guided budget app written in a weekend, polished over a month, now public.</p>
      </div>

      <div className="feature">
        <div className="feature-visual">
          <div className="feature-brand">overflow.guru · v1.0</div>

          <div className="feature-screen" aria-hidden="true">
            <div className="feature-screen-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="og-mock-mobile">
              <div className="og-mockm-topbar">
                <span className="og-mockm-side-btn">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M9 4v16" />
                  </svg>
                </span>
                <span className="og-mockm-new">+ Novo lançamento</span>
              </div>
              <div className="og-mockm-head">
                <h4>Análise · Maio</h4>
                <span className="og-mockm-sub">Atualizado agora · 15 dias restantes no mês</span>
                <p className="og-mockm-desc">Como o seu mês está fluindo. Sem culpa, só padrões. Toque em qualquer cartão para ver detalhes.</p>
              </div>
              <div className="og-mockm-cards">
                <div className="og-mockm-card">
                  <span className="lbl">RECEITA ATÉ AGORA</span>
                  <strong className="hidden-val">●●●●●</strong>
                  <small>Recebido este mês</small>
                </div>
                <div className="og-mockm-card">
                  <span className="lbl">GASTO ATÉ AGORA</span>
                  <strong className="hidden-val">●●●●●</strong>
                  <small>Lançamentos realizados</small>
                </div>
                <div className="og-mockm-card">
                  <span className="lbl">TAXA DE POUPANÇA</span>
                  <strong className="hidden-val">●●●●●</strong>
                  <small>guardados este mês</small>
                </div>
                <div className="og-mockm-card highlight">
                  <span className="lbl">CATEGORIAS ESTOURADAS</span>
                  <strong className="hidden-val">●●●●●</strong>
                  <small>Tudo sob controle</small>
                </div>
              </div>
              <div className="og-mockm-banner">
                <span className="check">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span>Bom progresso este mês.</span>
              </div>
            </div>
            <div className="og-mock">
              <aside className="og-mock-side">
                <div className="og-mock-side-header">
                  <div className="og-logo">OG</div>
                  <span className="og-mock-side-period">MAIO 2026</span>
                </div>
                <div className="og-mock-side-section">ESPAÇO</div>
                <div className="og-mock-side-link">Plano</div>
                <div className="og-mock-side-link active">Análise</div>
                <div className="og-mock-side-link">Todas as contas</div>
                <div className="og-mock-side-link">
                  Metas <span className="badge">20</span>
                </div>
                <div className="og-mock-side-section">CONTAS</div>
                <div className="og-mock-side-row">
                  <span>Nubank</span>
                  <span className="val">●●●</span>
                </div>
                <div className="og-mock-side-row">
                  <span>Nu Roxinho</span>
                  <span className="val">●●●</span>
                </div>
                <div className="og-mock-side-row">
                  <span>Saldo sep.</span>
                  <span className="val">●●●</span>
                </div>
                <div className="og-mock-side-row">
                  <span>Itaú</span>
                  <span className="val">●●●</span>
                </div>
                <div className="og-mock-side-row total">
                  <span>Total</span>
                  <span className="val">●●●</span>
                </div>
                <div className="og-mock-side-foot">
                  <div className="og-mock-avatar">IC</div>
                  <span>iago.calazans</span>
                </div>
              </aside>
              <main className="og-mock-main">
                <div className="og-mock-header">
                  <div>
                    <h4>Análise · Maio</h4>
                    <span className="og-mock-sub">Atualizado agora · 16 dias restantes</span>
                  </div>
                  <div className="og-mock-destiny">
                    <span>CADA REAL COM SEU DESTINO</span>
                    <strong className="hidden-val">●●●</strong>
                  </div>
                </div>
                <div className="og-mock-kpis">
                  <div className="og-mock-kpi">
                    <span>RECEITA</span>
                    <strong className="hidden-val">●●●</strong>
                  </div>
                  <div className="og-mock-kpi">
                    <span>GASTO</span>
                    <strong className="hidden-val">●●●</strong>
                  </div>
                  <div className="og-mock-kpi">
                    <span>POUPANÇA</span>
                    <strong className="hidden-val">●●●</strong>
                  </div>
                  <div className="og-mock-kpi">
                    <span>ESTOURADAS</span>
                    <strong className="hidden-val">●●●</strong>
                  </div>
                </div>
                <div className="og-mock-banner">
                  <span className="check">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span>Bom progresso este mês.</span>
                </div>
                <div className="og-mock-grid2">
                  <div className="og-mock-block">
                    <span className="lbl">CARTÕES DE CRÉDITO</span>
                    <div className="og-mock-card-row">
                      <span>Nubank Roxinho</span>
                      <span className="val">●●●</span>
                    </div>
                    <div className="og-mock-progress">
                      <i style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div className="og-mock-block">
                    <span className="lbl">ONDE O DINHEIRO FOI</span>
                    <div className="og-mock-bar-row">
                      <span>Compras</span>
                      <i style={{ width: '92%' }} />
                    </div>
                    <div className="og-mock-bar-row">
                      <span>Material</span>
                      <i style={{ width: '70%' }} />
                    </div>
                    <div className="og-mock-bar-row">
                      <span>Médica</span>
                      <i style={{ width: '50%' }} />
                    </div>
                    <div className="og-mock-bar-row">
                      <span>Pessoal</span>
                      <i style={{ width: '48%' }} />
                    </div>
                    <div className="og-mock-bar-row">
                      <span>Mercado</span>
                      <i style={{ width: '33%' }} />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        <div className="feature-body">
          <div className="feature-kicker">
            <span className="pulse" />
            New · public beta
          </div>
          <h3 className="feature-name">
            overflow<span className="tld">.guru</span>
          </h3>
          <div className="feature-pt">Orçamento guiado com inteligência</div>
          <p className="feature-desc">
            Personal finance tools assume you already know how to budget. Overflow walks you through it: answer a
            handful of questions and it builds a category plan tuned to how you actually spend, then tracks the gap
            between intent and reality.
          </p>
          <ul className="feature-bullets">
            <li>Conversational onboarding</li>
            <li>Brazilian-real first, multi-currency next</li>
            <li>Local-first, no bank scraping</li>
            <li>PWA, mobile-shaped</li>
          </ul>
          <div className="feature-cta">
            <a className="btn btn-primary" href="https://overflow.guru" target="_blank" rel="noopener noreferrer">
              Visit overflow.guru <Icon name="arrow" size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
