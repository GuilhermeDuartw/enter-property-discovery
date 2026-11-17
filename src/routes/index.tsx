import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Doce Forno — brownies e bolos feitos à mão" }] }),
  staticData: { importedDocument: { html: { "lang": "pt-BR", "style": { scrollBehavior: "smooth" } }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <>
      <style>{capturedCSS}</style>
      <div id="root">
        <div className={"bk-experience bk-motion-enabled isolate [&]:relative [overflow:clip] [width:100%]"}>
          <div className={"bk-scroll-progress [&]:fixed [left:0px] [right:0px] [top:0px] [z-index:105] [translate:none] [rotate:none] [scale:none]"} style={{ transform: "scale(0, 1)" }} aria-hidden="true" />
          <a className={"bk-skip p-[12px] no-underline top-[8px] [z-index:150] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#cardapio">Ir para o cardápio</a>
          <ImportedHeader />
          <main>
            <ImportedSectionBrownieBomFeitoComcalma />
            <ImportedSectionTemCoisaBoasaindoDo />
            <ImportedSectionCacauNoPontoPressa />
            <div className={"bk-ticker [&]:relative [z-index:2] [translate:none] [rotate:none] [scale:none]"} style={{ transform: "translate(0px, 12px) rotate(-2.2deg) scale(1.02, 1.02)" }} aria-hidden="true">
              <div className="bk-marquee [overflow:hidden]">
                <div className="bk-marquee__group items-center [flex-shrink:0] [gap:var(--bk-gap)] [@media(prefers-reduced-motion:reduce)]:flex-wrap">
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="whitespace-nowrap [letter-spacing:-0.04em]">feito à mão</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="bk-script whitespace-nowrap [letter-spacing:-0.04em]">cacau nobre</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="whitespace-nowrap [letter-spacing:-0.04em]">fatia generosa</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="bk-script whitespace-nowrap [letter-spacing:-0.04em]">direto do forno</span>
                </div>
                <div className="bk-marquee__group items-center [flex-shrink:0] [gap:var(--bk-gap)] [@media(prefers-reduced-motion:reduce)]:flex-wrap">
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="whitespace-nowrap [letter-spacing:-0.04em]">feito à mão</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="bk-script whitespace-nowrap [letter-spacing:-0.04em]">cacau nobre</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="whitespace-nowrap [letter-spacing:-0.04em]">fatia generosa</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="bk-script whitespace-nowrap [letter-spacing:-0.04em]">direto do forno</span>
                </div>
                <div className="bk-marquee__group items-center [flex-shrink:0] [gap:var(--bk-gap)] [@media(prefers-reduced-motion:reduce)]:flex-wrap">
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="whitespace-nowrap [letter-spacing:-0.04em]">feito à mão</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="bk-script whitespace-nowrap [letter-spacing:-0.04em]">cacau nobre</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="whitespace-nowrap [letter-spacing:-0.04em]">fatia generosa</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="bk-script whitespace-nowrap [letter-spacing:-0.04em]">direto do forno</span>
                </div>
                <div className="bk-marquee__group items-center [flex-shrink:0] [gap:var(--bk-gap)] [@media(prefers-reduced-motion:reduce)]:flex-wrap">
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="whitespace-nowrap [letter-spacing:-0.04em]">feito à mão</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="bk-script whitespace-nowrap [letter-spacing:-0.04em]">cacau nobre</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="whitespace-nowrap [letter-spacing:-0.04em]">fatia generosa</span>
                  <svg className="[flex-shrink:0] [stroke-width:1.2px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="bk-script whitespace-nowrap [letter-spacing:-0.04em]">direto do forno</span>
                </div>
              </div>
            </div>
            <div className={"[order:0] [place-self:auto] [grid-area:auto] z-auto float-none shrink [margin:0px] [inset:0px] [&]:relative [flex-basis:auto] [overflow:visible] w-[1521px] [padding:0px_0px_561px]"} style={{ display: "block", boxSizing: "border-box", height: "1381px" }}>
              <ImportedSectionChocolatederretido />
            </div>
            <ImportedSectionUmPoucoDeCacau />
            <ImportedSectionTemSempreumBoloEsperando />
            <ImportedSectionSemDVidaCom />
          </main>
          <ImportedFooter />
        </div>
      </div>
      <a className="items-center no-underline [z-index:2147483647]" href="https://enter.converge.ai" id="enter-badge" target="_blank">
        <div className="build-with-container items-center gap-[1.2em] [box-shadow:rgba(0,0,0,0.1)_0px_4px_6px_-1px,rgba(0,0,0,0.1)_0px_2px_4px_-2px] [padding:0.53em_0.53em_0.53em_0.8em]">
          <div className={"\x63ontent-wrapper items-center gap-[0.61em]"}><span className="build-with">Build with</span><img className="wordmark [width:auto] aspect-[364_/_117]" alt="Enter" width="37" height="12" /></div>
          <div className="close-button items-center aspect-square justify-center w-[1.07em] [flex-shrink:0]" id="enter-badge-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <mask className="[mask-type:luminance]" id="mask0_9401_50408" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                <rect width="16" height="16" fill="white" />
              </mask>
              <g mask="url(#mask0_9401_50408)">
                <path d="M4.26683 12.6673L3.3335 11.734L7.06683 8.00065L3.3335 4.26732L4.26683 3.33398L8.00016 7.06732L11.7335 3.33398L12.6668 4.26732L8.9335 8.00065L12.6668 11.734L11.7335 12.6673L8.00016 8.93398L4.26683 12.6673Z" fill="white" fillOpacity="0.7" />
              </g>
            </svg>
          </div>
        </div>
      </a>
    </>
  );
}

function ImportedHeader() {
  return (
    <header className={"bk-header items-center justify-between [&]:absolute [left:0px] [z-index:80] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
      <a className={"bk-brand bk-brand--light items-center gap-[7px] no-underline [flex-shrink:0] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Doce Forno — início" href="#inicio">
        <svg className="self-start mt-[4px] [flex-shrink:0] [@media(max-width:680px)]:w-[28px]" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2L3.8 16.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="bk-brand__name whitespace-nowrap [letter-spacing:-0.035em]">Doce Forno<span className="mt-[8px] [letter-spacing:0.16em]">BROWNIES E BOLOS</span></span>
      </a>
      <nav className="bk-nav items-center" id="bk-nav" aria-label="Navegação principal">
        <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#inicio">Início</a>
        <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#cardapio">Cardápio</a>
        <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#cozinha">A cozinha</a>
        <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#casa">A casa</a>
      </nav>
      <div className="bk-header__actions items-center">
        <button className={"bk-basket-button min-h-[44px] min-w-[40px] [&]:relative [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Abrir seleção, 0 itens">
          <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 10a4 4 0 0 1-8 0" />
            <path d="M3.103 6.034h17.794" />
            <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
          </svg>
          <span className={"place-items-center [&]:absolute right-[-2px] w-[16px] [top:0px]"}>0</span>
        </button>
        <a className={"bk-button bk-button--small items-center isolate justify-center no-underline whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"} href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20encomendar%20um%20brownie%20ou%20um%20bolo%20com%20a%20Doce%20Forno." rel="noreferrer" target="_blank">Encomendar <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
        <button className={"bk-menu-toggle bk-icon-button place-items-center [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Abrir menu" aria-expanded="false" aria-controls="bk-nav">
          <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h16" />
            <path d="M4 18h16" />
            <path d="M4 6h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function ImportedSectionBrownieBomFeitoComcalma() {
  return (
    <section className={"bk-hero bk-in-view [&]:relative [overflow:hidden] [scroll-margin-top:85px] [width:100%]"} id="inicio" aria-labelledby="bk-title">
      <picture className={"bk-hero__image [&]:absolute [translate:none] [rotate:none] [scale:none]"} style={{ transform: "translate(0px, 0px)" }} data-site-import-responsive="30">
        <img className="object-cover [width:100%] [@media(max-width:680px)]:object-cover" alt="Pilha de brownies com ganache brilhante e flor de sal sobre mesa de madeira escura" width="1672" height="941" fetchPriority="high" src="/site-assets/6c6b089f6f2e8732.webp" />
      </picture>
      <div className={"bk-hero__shade pointer-events-none [&]:absolute [inset:0px]"} />
      <div className={"bk-hero__atmosphere pointer-events-none [&]:absolute [inset:0px] [overflow:hidden] [z-index:1]"} aria-hidden="true">
        <i className={"[&]:absolute w-[2px] [box-shadow:rgba(247,185,110,0.5)_0px_0px_10px]"} />
        <i className={"[&]:absolute w-[2px] [box-shadow:rgba(247,185,110,0.5)_0px_0px_10px]"} />
        <i className={"[&]:absolute w-[2px] [box-shadow:rgba(247,185,110,0.5)_0px_0px_10px]"} />
      </div>
      <div className={"bk-hero__copy [&]:relative [z-index:2] [translate:none] [rotate:none] [scale:none]"} style={{ transform: "translate(0px, 0px)" }} data-site-import-responsive="37">
        <p className="bk-eyebrow bk-hero__eyebrow [translate:none] [rotate:none] [scale:none]" style={{ transform: "translate(0px, 0px)", opacity: "1" }}>CACAU NOBRE. FORNO ACESO. FATIA GENEROSA.</p>
        <h1 id="bk-title">
          <span className="bk-hero__line [overflow:hidden]">
            <span className="[translate:none] [rotate:none] [scale:none]" style={{ transform: "translate(0px, 0px)" }}>Brownie bom.</span>
          </span>
          <span className="bk-hero__line [overflow:hidden]">
            <span className="[translate:none] [rotate:none] [scale:none]" style={{ transform: "translate(0px, 0px)" }}>Feito com</span>
          </span>
          <span className={"bk-hero__line bk-hero__line--script [&]:relative [letter-spacing:-0.055em] [overflow:visible]"}>
            <span className={"[&]:relative [translate:none] [rotate:none] [scale:none]"} style={{ transform: "rotate(-7deg)" }}>calma.<svg className={"fill-none left-[10%] [&]:absolute w-[105%] [flex-shrink:0] [stroke:var(--bk-caramel)] [stroke-linecap:round] [stroke-width:3px]"} viewBox="0 0 240 45" aria-hidden="true"><path className="[stroke-dashoffset:0px] [stroke-dasharray:401.376]" d="M8 25Q120 5 230 18M26 36Q130 23 204 27" /></svg></span>
          </span>
        </h1>
        <p className="bk-hero__description [translate:none] [rotate:none] [scale:none]" style={{ transform: "translate(0px, 0px)", opacity: "1" }}>Casquinha fina, coração úmido e cacau de verdade. Do primeiro pedaço ao último café.</p>
        <div className="bk-hero__actions items-center [translate:none] [rotate:none] [scale:none]" style={{ transform: "translate(0px, 0px)", opacity: "1" }}>
          <a className={"bk-button items-center isolate justify-center no-underline whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"} href="#cardapio">Ver o cardápio <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
          <a className={"bk-text-link items-center gap-[11px] min-h-[44px] no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#casa">Conheça a casa <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
        </div>
        <div className="bk-hero__promises mt-[39px] [translate:none] [rotate:none] [scale:none]" style={{ transform: "translate(0px, 0px)", opacity: "1" }} data-site-import-responsive="58">
          <span><svg className="mb-[8px] w-[25px] [flex-shrink:0] [stroke-width:1.1px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>Cacau 70%<br />amargo na medida</span>
          <span><svg className="mb-[8px] w-[25px] [flex-shrink:0] [stroke-width:1.1px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" /><path d="M6 17h12" /></svg>Assado hoje<br />em pequenas fornadas</span>
          <span><svg className="mb-[8px] w-[25px] [flex-shrink:0] [stroke-width:1.1px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>Embalado<br />para presentear</span>
        </div>
      </div>
      <div className={"bk-hero__note [&]:absolute [z-index:2] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "rotate(-10.0001deg)" }} aria-hidden="true" data-site-import-responsive="72">É de comer<br />com os olhos.<svg className="fill-none w-[52px] [flex-shrink:0] [margin:7px_0px_0px_45px] [stroke:currentcolor] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2px]" viewBox="0 0 80 95"><path d="M12 4Q2 70 64 77M46 64L66 78L47 91" /></svg></div>
      <a className={"bk-hero__scroll items-center gap-[12px] no-underline [letter-spacing:0.03em] [z-index:2] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [@media(max-width:680px)]:whitespace-nowrap [@media(max-width:680px)]:[backdrop-filter:blur(6px)] [@media(max-width:680px)]:[padding:7px_13px]"} href="#cardapio">
        <span>O próximo pedaço está aqui</span>
        <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </a>
      <span className={"bk-hero__demo [&]:absolute [letter-spacing:0.1em] [@media(max-width:680px)]:text-center [@media(max-width:680px)]:[left:0px]"}>PRODUÇÃO DA CASA · FOTOGRAFIA ILUSTRATIVA</span>
    </section>
  );
}

function ImportedSectionTemCoisaBoasaindoDo() {
  return (
    <section className="bk-menu-section bk-section [scroll-margin-top:85px]" id="cardapio" aria-labelledby="bk-menu-heading">
      <div className="bk-menu-heading items-end gap-[30px] justify-between">
        <div className="[translate:none] [rotate:none] [scale:none] [clip-path:none]" style={{ transform: "translate(0px, 0px)" }}>
          <span className="bk-eyebrow">ESCOLHA PELO OLHO. VOLTE PELO SABOR.</span>
          <h2 id="bk-menu-heading">Tem coisa boa<br /><em className="[letter-spacing:-0.035em]">saindo do forno.</em></h2>
        </div>
        <div className="bk-menu-heading__aside mb-[7px] [@media(max-width:680px)]:mt-[25px] [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
          <p>Um brownie de casquinha, um bolo de camadas generosas,<br />uma caixa para dividir. Qual é a sua vontade?</p>
          <span className="bk-demo-note">Produção artesanal · valores por unidade</span>
        </div>
      </div>
      <div className={"bk-categories [&]:relative [@media(max-width:680px)]:whitespace-nowrap [@media(max-width:680px)]:[overflow-x:auto] [@media(max-width:680px)]:[scrollbar-width:none]"} role="tablist" aria-label="Categorias do cardápio">
        <button className={"is-active isolate [&]:relative [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "translate(0px, 0px)" }} role="tab" aria-selected="true"><span className={"bk-category-pill [&]:absolute [inset:0px] [z-index:-1]"} style={{ opacity: "1" }} />Tudo</button>
        <button className={"isolate [&]:relative [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "translate(0px, 0px)" }} role="tab" aria-selected="false">Brownies</button>
        <button className={"isolate [&]:relative [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "translate(0px, 0px)" }} role="tab" aria-selected="false">Bolos</button>
        <button className={"isolate [&]:relative [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "translate(0px, 0px)" }} role="tab" aria-selected="false">Especiais</button>
      </div>
      <div className="bk-menu-grid items-stretch [@media(max-width:680px)]:[overflow:auto_hidden] [@media(max-width:680px)]:[scroll-padding-inline:23px] [@media(max-width:680px)]:[scroll-snap-type:x_mandatory] [@media(max-width:680px)]:[scrollbar-color:rgb(189,155,98)_transparent] [@media(max-width:680px)]:[scrollbar-width:thin]">
        <article className={"bk-dish flex-col [&]:relative [overflow:hidden] [@media(max-width:680px)]:[scroll-snap-align:start]"} style={{ opacity: "1", transform: "none" }}>
          <button className={"bk-dish__image [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Ver Brownie Tradicional">
            <img className="object-cover [width:100%] [object-position:center_center]" alt="Brownie Tradicional" loading="lazy" decoding="async" src="/site-assets/b88075489669e69a.webp" />
            <span className={"bk-dish__category left-[13px] [&]:absolute top-[13px] [padding:4px_11px]"}>Brownies</span>
            <span className={"bk-dish__peek bottom-[14px] place-items-center [&]:absolute right-[15px] w-[34px] [z-index:2]"} aria-hidden="true">
              <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
          <div className="bk-dish__body flex-1 flex-col [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
            <h3>
              <button className={"text-left [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Brownie Tradicional</button>
            </h3>
            <p>Cacau 70%, manteiga e o ponto exato: firme na borda, úmido no meio.</p>
            <div className="bk-dish__bottom items-center justify-between [margin-top:auto]">
              <strong className="whitespace-nowrap [letter-spacing:-0.04em]">R$ 12,00<small className="mt-[5px] [letter-spacing:0px]">a partir de</small></strong>
              <button className={"bk-add items-center justify-center whitespace-nowrap [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Adicionar Brownie Tradicional à seleção">
                <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span>Quero esse</span>
              </button>
            </div>
          </div>
        </article>
        <article className={"bk-dish flex-col [&]:relative [overflow:hidden] [@media(max-width:680px)]:[scroll-snap-align:start]"} style={{ opacity: "1", transform: "none" }}>
          <button className={"bk-dish__image [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Ver Brownie Recheado" data-pending="true">
            <span className={"bk-dish__placeholder p-[18px] place-items-center [&]:absolute text-center [&]:uppercase [inset:0px] [letter-spacing:0.18em]"}>Foto em produção</span>
            <span className={"bk-dish__category left-[13px] [&]:absolute top-[13px] [padding:4px_11px]"}>Brownies</span>
            <span className={"bk-dish__peek bottom-[14px] place-items-center [&]:absolute right-[15px] w-[34px] [z-index:2]"} aria-hidden="true">
              <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
          <div className="bk-dish__body flex-1 flex-col [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
            <h3>
              <button className={"text-left [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Brownie Recheado</button>
            </h3>
            <p>Recheio generoso de doce de leite e uma pitada de flor de sal.</p>
            <div className="bk-dish__bottom items-center justify-between [margin-top:auto]">
              <strong className="whitespace-nowrap [letter-spacing:-0.04em]">R$ 16,00<small className="mt-[5px] [letter-spacing:0px]">a partir de</small></strong>
              <button className={"bk-add items-center justify-center whitespace-nowrap [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Adicionar Brownie Recheado à seleção">
                <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span>Quero esse</span>
              </button>
            </div>
          </div>
        </article>
        <article className={"bk-dish flex-col [&]:relative [overflow:hidden] [@media(max-width:680px)]:[scroll-snap-align:start]"} style={{ opacity: "1", transform: "none" }}>
          <button className={"bk-dish__image [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Ver Brownie de Brigadeiro" data-pending="true">
            <span className={"bk-dish__placeholder p-[18px] place-items-center [&]:absolute text-center [&]:uppercase [inset:0px] [letter-spacing:0.18em]"}>Foto em produção</span>
            <span className={"bk-dish__category left-[13px] [&]:absolute top-[13px] [padding:4px_11px]"}>Brownies</span>
            <span className={"bk-dish__peek bottom-[14px] place-items-center [&]:absolute right-[15px] w-[34px] [z-index:2]"} aria-hidden="true">
              <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
          <div className="bk-dish__body flex-1 flex-col [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
            <h3>
              <button className={"text-left [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Brownie de Brigadeiro</button>
            </h3>
            <p>Cobertura de brigadeiro cremoso e granulado de cacau.</p>
            <div className="bk-dish__bottom items-center justify-between [margin-top:auto]">
              <strong className="whitespace-nowrap [letter-spacing:-0.04em]">R$ 18,00<small className="mt-[5px] [letter-spacing:0px]">a partir de</small></strong>
              <button className={"bk-add items-center justify-center whitespace-nowrap [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Adicionar Brownie de Brigadeiro à seleção">
                <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span>Quero esse</span>
              </button>
            </div>
          </div>
        </article>
        <article className={"bk-dish flex-col [&]:relative [overflow:hidden] [@media(max-width:680px)]:[scroll-snap-align:start]"} style={{ opacity: "1", transform: "none" }}>
          <button className={"bk-dish__image [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Ver Brownie de Nutella" data-pending="true">
            <span className={"bk-dish__placeholder p-[18px] place-items-center [&]:absolute text-center [&]:uppercase [inset:0px] [letter-spacing:0.18em]"}>Foto em produção</span>
            <span className={"bk-dish__category left-[13px] [&]:absolute top-[13px] [padding:4px_11px]"}>Brownies</span>
            <span className={"bk-dish__peek bottom-[14px] place-items-center [&]:absolute right-[15px] w-[34px] [z-index:2]"} aria-hidden="true">
              <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
          <div className="bk-dish__body flex-1 flex-col [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
            <h3>
              <button className={"text-left [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Brownie de Nutella</button>
            </h3>
            <p>Recheio de creme de avelã e metade de avelã tostada por cima.</p>
            <div className="bk-dish__bottom items-center justify-between [margin-top:auto]">
              <strong className="whitespace-nowrap [letter-spacing:-0.04em]">R$ 19,00<small className="mt-[5px] [letter-spacing:0px]">a partir de</small></strong>
              <button className={"bk-add items-center justify-center whitespace-nowrap [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Adicionar Brownie de Nutella à seleção">
                <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span>Quero esse</span>
              </button>
            </div>
          </div>
        </article>
        <article className={"bk-dish flex-col [&]:relative [overflow:hidden] [@media(max-width:680px)]:[scroll-snap-align:start]"} style={{ opacity: "1", transform: "none" }}>
          <button className={"bk-dish__image [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Ver Brownies Especiais" data-pending="true">
            <span className={"bk-dish__placeholder p-[18px] place-items-center [&]:absolute text-center [&]:uppercase [inset:0px] [letter-spacing:0.18em]"}>Foto em produção</span>
            <span className={"bk-dish__category left-[13px] [&]:absolute top-[13px] [padding:4px_11px]"}>Especiais</span>
            <span className={"bk-dish__peek bottom-[14px] place-items-center [&]:absolute right-[15px] w-[34px] [z-index:2]"} aria-hidden="true">
              <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
          <div className="bk-dish__body flex-1 flex-col [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
            <h3>
              <button className={"text-left [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Brownies Especiais</button>
            </h3>
            <p>Seis fatias da fornada do dia: caramelo salgado, nozes, chocolate branco e frutas vermelhas.</p>
            <div className="bk-dish__bottom items-center justify-between [margin-top:auto]">
              <strong className="whitespace-nowrap [letter-spacing:-0.04em]">R$ 46,00<small className="mt-[5px] [letter-spacing:0px]">a partir de</small></strong>
              <button className={"bk-add items-center justify-center whitespace-nowrap [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Adicionar Brownies Especiais à seleção">
                <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span>Quero esse</span>
              </button>
            </div>
          </div>
        </article>
        <article className={"bk-dish flex-col [&]:relative [overflow:hidden] [@media(max-width:680px)]:[scroll-snap-align:start]"} style={{ opacity: "1", transform: "none" }}>
          <button className={"bk-dish__image [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Ver Bolo Tradicional" data-pending="true">
            <span className={"bk-dish__placeholder p-[18px] place-items-center [&]:absolute text-center [&]:uppercase [inset:0px] [letter-spacing:0.18em]"}>Foto em produção</span>
            <span className={"bk-dish__category left-[13px] [&]:absolute top-[13px] [padding:4px_11px]"}>Bolos</span>
            <span className={"bk-dish__peek bottom-[14px] place-items-center [&]:absolute right-[15px] w-[34px] [z-index:2]"} aria-hidden="true">
              <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
          <div className="bk-dish__body flex-1 flex-col [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
            <h3>
              <button className={"text-left [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Bolo Tradicional</button>
            </h3>
            <p>Pão de ló de cacau com creme de baunilha. Vendido em fatia ou inteiro.</p>
            <div className="bk-dish__bottom items-center justify-between [margin-top:auto]">
              <strong className="whitespace-nowrap [letter-spacing:-0.04em]">R$ 14,00<small className="mt-[5px] [letter-spacing:0px]">a partir de</small></strong>
              <button className={"bk-add items-center justify-center whitespace-nowrap [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Adicionar Bolo Tradicional à seleção">
                <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span>Quero esse</span>
              </button>
            </div>
          </div>
        </article>
        <article className={"bk-dish flex-col [&]:relative [overflow:hidden] [@media(max-width:680px)]:[scroll-snap-align:start]"} style={{ opacity: "1", transform: "none" }}>
          <button className={"bk-dish__image [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Ver Bolo Recheado" data-pending="true">
            <span className={"bk-dish__placeholder p-[18px] place-items-center [&]:absolute text-center [&]:uppercase [inset:0px] [letter-spacing:0.18em]"}>Foto em produção</span>
            <span className={"bk-dish__category left-[13px] [&]:absolute top-[13px] [padding:4px_11px]"}>Bolos</span>
            <span className={"bk-dish__peek bottom-[14px] place-items-center [&]:absolute right-[15px] w-[34px] [z-index:2]"} aria-hidden="true">
              <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
          <div className="bk-dish__body flex-1 flex-col [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
            <h3>
              <button className={"text-left [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Bolo Recheado</button>
            </h3>
            <p>Pão de ló úmido, ganache meio amargo e doce de leite entre as camadas.</p>
            <div className="bk-dish__bottom items-center justify-between [margin-top:auto]">
              <strong className="whitespace-nowrap [letter-spacing:-0.04em]">R$ 112,00<small className="mt-[5px] [letter-spacing:0px]">a partir de</small></strong>
              <button className={"bk-add items-center justify-center whitespace-nowrap [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Adicionar Bolo Recheado à seleção">
                <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span>Quero esse</span>
              </button>
            </div>
          </div>
        </article>
        <article className={"bk-dish flex-col [&]:relative [overflow:hidden] [@media(max-width:680px)]:[scroll-snap-align:start]"} style={{ opacity: "1", transform: "none" }}>
          <button className={"bk-dish__image [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Ver Bolo Especial" data-pending="true">
            <span className={"bk-dish__placeholder p-[18px] place-items-center [&]:absolute text-center [&]:uppercase [inset:0px] [letter-spacing:0.18em]"}>Foto em produção</span>
            <span className={"bk-dish__category left-[13px] [&]:absolute top-[13px] [padding:4px_11px]"}>Especiais</span>
            <span className={"bk-dish__peek bottom-[14px] place-items-center [&]:absolute right-[15px] w-[34px] [z-index:2]"} aria-hidden="true">
              <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
          <div className="bk-dish__body flex-1 flex-col [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
            <h3>
              <button className={"text-left [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Bolo Especial</button>
            </h3>
            <p>Bolo de festa com ganache espelhado, frutas vermelhas e mensagem à mão.</p>
            <div className="bk-dish__bottom items-center justify-between [margin-top:auto]">
              <strong className="whitespace-nowrap [letter-spacing:-0.04em]">R$ 168,00<small className="mt-[5px] [letter-spacing:0px]">a partir de</small></strong>
              <button className={"bk-add items-center justify-center whitespace-nowrap [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Adicionar Bolo Especial à seleção">
                <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span>Quero esse</span>
              </button>
            </div>
          </div>
        </article>
      </div>
      <div className="bk-menu-foot items-center justify-between [@media(max-width:680px)]:flex-wrap">
        <span className="items-center gap-[8px]">Escolha seus favoritos. A seleção é só sua.</span>
        <button className={"bk-text-link items-center gap-[11px] min-h-[44px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Ver minha seleção <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
      </div>
    </section>
  );
}

function ImportedSectionCacauNoPontoPressa() {
  return (
    <section className="bk-feature [overflow:hidden] [scroll-margin-top:85px] [@media(max-width:680px)]:flex-col" id="cozinha" aria-labelledby="bk-feature-title">
      <div className={"bk-feature__copy [&]:relative [z-index:2] [@media(max-width:680px)]:items-start [@media(max-width:680px)]:grid-cols-[1fr_auto] [@media(max-width:680px)]:[gap:0px_15px]"}>
        <span className="bk-eyebrow [@media(max-width:680px)]:[grid-column:1/-1] [translate:none] [rotate:none] [scale:none]" style={{ opacity: "0.9769", transform: "translate(0px, 0px)" }}>A NOSSA IDEIA DE FORNO</span>
        <h2 className="[translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }} id="bk-feature-title">Cacau no ponto.<br /><em className="[letter-spacing:-0.035em]">Pressa nenhuma.</em></h2>
        <p className="[@media(max-width:680px)]:[grid-column:1/-1] [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>Massa descansada na geladeira, forno baixo e tempo. É o que separa um brownie de um bolo de chocolate qualquer.</p>
        <div className="bk-dish-selector [@media(max-width:680px)]:[grid-column:1/-1]" role="tablist" aria-label="Destaques">
          <button className={"is-active aspect-square [&]:relative [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "translate(0px, 20px) rotate(-5.0002deg) scale(1.00001, 1.00001)" }} role="tab" aria-selected="true" aria-label="Brownie Tradicional">
            <img className="object-cover [filter:saturate(1)] [width:100%]" alt="" loading="lazy" decoding="async" src="/site-assets/b88075489669e69a.webp" />
            <span className={"bottom-[5px] left-[7px] [&]:absolute [text-shadow:rgb(0,0,0)_0px_1px_4px]"}>01</span>
          </button>
          <button className={"aspect-square [&]:relative [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "translate(0px, 20px) rotate(-5.0002deg) scale(1.00001, 1.00001)" }} role="tab" aria-selected="false" aria-label="Bolo Recheado">
            <span className={"bottom-[5px] left-[7px] [&]:absolute [text-shadow:rgb(0,0,0)_0px_1px_4px] [width:100%]"} style={{ display: "block", height: "100%", borderRadius: "9px", background: "linear-gradient(150deg, rgb(58, 42, 28), rgb(36, 22, 9))" }} aria-hidden="true" />
            <span className={"bottom-[5px] left-[7px] [&]:absolute [text-shadow:rgb(0,0,0)_0px_1px_4px]"}>02</span>
          </button>
          <button className={"aspect-square [&]:relative [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "translate(0px, 20px) rotate(-5.0002deg) scale(1.00001, 1.00001)" }} role="tab" aria-selected="false" aria-label="Brownie de Nutella">
            <span className={"bottom-[5px] left-[7px] [&]:absolute [text-shadow:rgb(0,0,0)_0px_1px_4px] [width:100%]"} style={{ display: "block", height: "100%", borderRadius: "9px", background: "linear-gradient(150deg, rgb(58, 42, 28), rgb(36, 22, 9))" }} aria-hidden="true" />
            <span className={"bottom-[5px] left-[7px] [&]:absolute [text-shadow:rgb(0,0,0)_0px_1px_4px]"}>03</span>
          </button>
        </div>
        <div className="bk-feature__details [@media(max-width:680px)]:[grid-column:1/-1]">
          <span className="bk-feature__tag">Casquinha fina, coração úmido</span>
          <h3>Brownie Tradicional</h3>
          <p className="max-w-[280px]">Cacau 70%, manteiga e o ponto exato: firme na borda, úmido no meio.</p>
          <button className={"bk-button items-center isolate justify-center whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"}>Quero esse · R$ 12,00<svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
        </div>
      </div>
      <div className={"bk-feature__art items-center justify-center [&]:relative [min-width:0px] [@media(max-width:680px)]:self-center [@media(max-width:680px)]:aspect-square [@media(max-width:680px)]:max-w-[450px] [@media(max-width:680px)]:[margin:20px_0px_4px] [@media(max-width:680px)]:[width:100%]"}>
        <div className={"bk-feature__ring aspect-square pointer-events-none [&]:absolute [translate:none] [rotate:none] [scale:none]"} style={{ transform: "rotate(-11.9999deg)" }} />
        <div className={"bk-feature__ring bk-feature__ring--two aspect-square pointer-events-none [&]:absolute [translate:none] [rotate:none] [scale:none]"} style={{ transform: "rotate(13.9998deg)" }} />
        <div className={"bk-feature__frame [&]:relative [box-shadow:rgba(18,11,8,0.33)_0px_25px_45px] [overflow:hidden] [translate:none] [rotate:none] [scale:none]"} style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
          <img className="object-cover [width:100%]" alt="Brownie Tradicional" loading="lazy" decoding="async" src="/site-assets/b88075489669e69a.webp" />
        </div>
        <span className={"bk-feature__annotation [&]:absolute"} style={{ clipPath: "none" } as CSSProperties} aria-hidden="true">assado devagar<svg className="bk-scribble mt-[7px] [flex-shrink:0] [max-width:100%]" viewBox="0 0 220 66" fill="none"><path d="M5 39C44 6 152 6 210 26C241 37 119 67 33 48C-10 38 73 21 180 30M175 20L211 26L184 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span>
        <span className={"bk-feature__number pointer-events-none [&]:absolute [-webkit-text-stroke:1px_rgba(232,200,125,0.37)] [letter-spacing:-0.08em] [translate:none] [rotate:none] [scale:none]"} style={{ transform: "translate(0px, 35px)" }} aria-hidden="true">01</span>
      </div>
    </section>
  );
}

function ImportedSectionChocolatederretido() {
  return (
    <section className={"bk-scene [&]:relative [overflow:hidden] [scroll-margin-top:85px] [translate:none] [rotate:none] [scale:none]"} style={{ inset: "0px auto auto 0px", margin: "0px", maxWidth: "1521px", width: "1521px", maxHeight: "820px", height: "820px", padding: "0px", transform: "translate(0px, 0px)" }} id="forno" aria-labelledby="bk-scene-title" data-site-import-responsive="355">
      <img className={"bk-scene__image object-cover [&]:absolute [translate:none] [rotate:none] [scale:none]"} style={{ clipPath: "inset(8% 13% round 160px)", transform: "scale(1.12, 1.12)" } as CSSProperties} alt="Brownies recém-saídos do forno, com ganache derretida" loading="lazy" decoding="async" src="/site-assets/6c6b089f6f2e8732.webp" data-site-import-responsive="356" />
      <div className={"bk-scene__shade [&]:absolute [inset:0px]"} />
      <div className={"bk-fire-atmosphere pointer-events-none [&]:absolute [inset:0px] [overflow:hidden]"} aria-hidden="true">
        <i className={"bottom-[-25%] [&]:absolute"} />
        <i className={"bottom-[-25%] [&]:absolute"} />
        <i className={"bottom-[-25%] [&]:absolute"} />
      </div>
      <span className={"bk-eyebrow bk-scene__eyebrow [&]:absolute"}>DO FORNO PARA A MESA</span>
      <h2 className={"pointer-events-none [&]:absolute [left:0px]"} id="bk-scene-title">
        <span className="bk-scene__word bk-scene__word--one text-center whitespace-nowrap [translate:none] [rotate:none] [scale:none]" style={{ transform: "translate(8%, 0%)" }}>Chocolate</span>
        <span className="bk-scene__word bk-scene__word--two text-center whitespace-nowrap [translate:none] [rotate:none] [scale:none]" style={{ transform: "translate(-8%, 0%)" }}>derretido.</span>
      </h2>
      <div className={"bk-scene__stamp items-center flex-col justify-center [&]:absolute text-center [outline:rgba(245,218,163,0.44)_dashed_1px] [outline-offset:-9px] [translate:none] [rotate:none] [scale:none]"} style={{ transform: "rotate(-23deg) scale(0.88, 0.88)" }} data-site-import-responsive="366">
        <svg className="[flex-shrink:0]" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2L3.8 16.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span className="[letter-spacing:0.02em]">feito<br />na casa</span>
        <small className="[letter-spacing:0.14em]">ASSADO NO DIA</small>
      </div>
      <p className={"[&]:absolute"}>Nada de mistura pronta: cacau, manteiga, ovos e tempo. O resto é conversa.</p>
      <span className={"bk-scene__caption [&]:absolute [letter-spacing:0.14em]"}>IMAGEM ILUSTRATIVA · PRODUÇÃO DA CASA</span>
    </section>
  );
}

function ImportedSectionUmPoucoDeCacau() {
  return (
    <section className="bk-story bk-section items-center [scroll-margin-top:85px] [@media(max-width:680px)]:flex-col" id="casa" aria-labelledby="bk-story-title">
      <div className={"[&]:relative [min-width:0px] [@media(max-width:680px)]:[width:100%]"}>
        <div className="bk-story__photo [overflow:hidden]" style={{ clipPath: "inset(12% 8% round 180px)" } as CSSProperties}>
          <img className="object-cover [width:100%]" alt="Brownies em uma mesa de madeira, com cacau e flor de sal ao redor" loading="lazy" decoding="async" src="/site-assets/6c6b089f6f2e8732.webp" />
        </div>
        <div className={"bk-story__note [&]:absolute [box-shadow:rgba(44,30,17,0.07)_5px_9px] [translate:none] [rotate:none] [scale:none]"} style={{ transform: "translate(0px, 35px) rotate(-14deg)" }} aria-hidden="true">assado devagar<svg className="fill-none w-[90px] [flex-shrink:0] [margin:5px_0px_0px_45px] [stroke:currentcolor] [stroke-linecap:round] [stroke-width:2px]" viewBox="0 0 100 46"><path className="[stroke-dashoffset:0px] [stroke-dasharray:130.926]" d="M4 8Q54 2 88 24M88 24L66 20M88 24L74 40" /></svg></div>
      </div>
      <div className="bk-story__copy [@media(max-width:680px)]:[width:100%]">
        <span className="bk-eyebrow">A NOSSA IDEIA DE CONFEITARIA</span>
        <h2 className="[translate:none] [rotate:none] [scale:none]" style={{ clipPath: "none", opacity: "1", transform: "translate(0px, 0px)" } as CSSProperties} id="bk-story-title">Um pouco de cacau.<br /><em className="[letter-spacing:-0.035em]">Um tanto de afeto.</em></h2>
        <p className="bk-story__lead [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>Uma casa para quem acredita que doce também é um jeito de cuidar.</p>
        <p className="[translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>A Doce Forno começou numa cozinha pequena, com uma forma de 20 cm e a teimosia de assar todo dia. Hoje são duas fornadas diárias, sempre em pequenas quantidades, porque brownie bom não espera a semana inteira.</p>
        <p className="[translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>Cacau de origem, manteiga de verdade, ovos de galinha caipira e o tempo que a massa precisa para descansar na geladeira antes de ir ao forno. Nenhum atalho: é isso que separa um brownie de um bolo de chocolate qualquer.</p>
        <a className={"bk-button items-center isolate justify-center mt-[25px] no-underline whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"} href="#cardapio">Encontre o seu doce <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
        <div className="bk-story__signature items-center"><svg className="[flex-shrink:0]" width="46" height="14" viewBox="0 0 46 14" fill="none" aria-hidden="true"><path d="M1 9c8-7 14 4 22-2s12 5 22-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>Doce Forno</div>
      </div>
    </section>
  );
}

function ImportedSectionTemSempreumBoloEsperando() {
  return (
    <section className={"bk-visit [&]:relative [overflow:hidden] [scroll-margin-top:85px] [@media(max-width:680px)]:flex-col"} id="encomenda" aria-labelledby="bk-visit-title">
      <div className={"bk-visit__copy [&]:relative [z-index:2]"}>
        <span className="bk-eyebrow mb-[20px] [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>MUITO PRAZER. PODE CHEGAR.</span>
        <h2 className="[translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }} id="bk-visit-title">Tem sempre<br /><em className="[letter-spacing:-0.035em]">um bolo esperando.</em></h2>
        <p className="[translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>Encomendas com 48 horas de antecedência, retirada no ateliê ou entrega na região. Escolha o recheio, a cobertura e a mensagem: a gente assa no dia.</p>
        <div className="bk-visit__buttons items-center [translate:none] [rotate:none] [scale:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }}>
          <a className={"bk-button items-center isolate justify-center no-underline whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"} href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20encomendar%20um%20brownie%20ou%20um%20bolo%20com%20a%20Doce%20Forno." rel="noreferrer" target="_blank">Pedir pelo WhatsApp <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg></a>
          <button className={"bk-text-link items-center gap-[11px] min-h-[44px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Montar seleção <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></button>
        </div>
        <span className="bk-visit__note">Encomendas sob medida · retirada e entrega a combinar</span>
      </div>
      <div className="bk-visit__photo [overflow:hidden]" style={{ clipPath: "ellipse(82% 80% at 80% 58%)" } as CSSProperties}>
        <img className={"object-cover [&]:absolute [inset:0px] [width:100%]"} alt="Brownies prontos para entrega sobre a bancada" loading="lazy" decoding="async" src="/site-assets/6c6b089f6f2e8732.webp" />
        <span className={"[&]:absolute [text-shadow:rgba(0,0,0,0.6)_0px_2px_15px] [z-index:2]"}>feito pra você</span>
        <svg className={"fill-none [&]:absolute [flex-shrink:0] [stroke:rgb(255,230,176)] [stroke-width:2px] [z-index:2]"} viewBox="0 0 100 90" aria-hidden="true">
          <path d="M6 8Q10 66 78 58M58 44L80 58L62 78" />
        </svg>
      </div>
    </section>
  );
}

function ImportedSectionSemDVidaCom() {
  return (
    <section className="bk-faq bk-section [scroll-margin-top:85px]" id="duvidas" aria-labelledby="bk-faq-title">
      <div>
        <span className="bk-eyebrow">ANTES DE PEDIR</span>
        <h2 className="[translate:none] [rotate:none] [scale:none] [clip-path:none]" style={{ opacity: "1", transform: "translate(0px, 0px)" }} id="bk-faq-title">Sem dúvida.<br /><em className="[letter-spacing:-0.035em]">Com vontade.</em></h2>
      </div>
      <div>
        <details className="[interpolate-size:allow-keywords]">
          <summary className={"items-center gap-[20px] justify-between list-none min-h-[25px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Como faço meu pedido?<svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg></summary>
          <p className="max-w-[500px]">Monte sua seleção, escolha os tamanhos e finalize pelo WhatsApp. Por lá combinamos prazo, forma de pagamento e entrega. Nenhum pagamento é feito pelo site.</p>
        </details>
        <details className="[interpolate-size:allow-keywords]">
          <summary className={"items-center gap-[20px] justify-between list-none min-h-[25px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Vocês entregam?<svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg></summary>
          <p className="max-w-[500px]">Retirada no ateliê ou entrega na região, combinada pelo WhatsApp. O valor depende do endereço e é informado antes de fechar o pedido.</p>
        </details>
        <details className="[interpolate-size:allow-keywords]">
          <summary className={"items-center gap-[20px] justify-between list-none min-h-[25px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Fazem bolo por encomenda?<svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg></summary>
          <p className="max-w-[500px]">Sim. Bolos de festa com 48 horas de antecedência, personalizados com recheio, cobertura e mensagem escrita à mão.</p>
        </details>
        <details className="[interpolate-size:allow-keywords]">
          <summary className={"items-center gap-[20px] justify-between list-none min-h-[25px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"}>Quanto tempo dura o brownie?<svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg></summary>
          <p className="max-w-[500px]">Cinco dias fora da geladeira, em recipiente fechado, ou quinze dias congelado. Aquecido por vinte segundos no micro-ondas, volta a ficar úmido como no dia.</p>
        </details>
      </div>
    </section>
  );
}

function ImportedFooter() {
  return (
    <footer className="bk-footer">
      <div className="bk-footer__top items-center justify-between [@media(max-width:680px)]:flex-wrap">
        <a className={"bk-brand items-center gap-[7px] no-underline [flex-shrink:0] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Doce Forno — início" href="#inicio">
          <svg className="self-start mt-[4px] [flex-shrink:0] [@media(max-width:680px)]:w-[28px]" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2L3.8 16.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="bk-brand__name whitespace-nowrap [letter-spacing:-0.035em]">Doce Forno<span className="mt-[8px] [letter-spacing:0.16em]">BROWNIES E BOLOS</span></span>
        </a>
        <div className="items-center [@media(max-width:680px)]:justify-between [@media(max-width:680px)]:[order:3]">
          <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#cardapio">Cardápio</a>
          <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#cozinha">A cozinha</a>
          <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#casa">A casa</a>
          <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#encomenda">Encomendas</a>
          <button className={"bk-footer__back items-center! gap-[6px] place-items-center w-[42px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Voltar ao topo">
            <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="bk-footer__bottom justify-between [@media(max-width:680px)]:flex-col">
        <span>© 2026 Doce Forno · brownies e bolos · São Paulo</span>
        <span>Ter – Dom · 9h às 19h · Encomendas com 48h de antecedência · Fotos ilustrativas</span>
      </div>
    </footer>
  );
}
