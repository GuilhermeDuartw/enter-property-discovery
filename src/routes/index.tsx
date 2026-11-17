import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Doce Forno — brownies e bolos feitos à mão" },
      { name: "description", content: "Brownies e bolos artesanais em São Paulo. Monte sua seleção e finalize o pedido pelo WhatsApp." },
      { property: "og:title", content: "Doce Forno — brownies e bolos feitos à mão" },
      { property: "og:description", content: "Brownies e bolos artesanais em São Paulo. Monte sua seleção e finalize o pedido pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "pt-BR", "style": { scrollBehavior: "smooth" } }, body: {  } } },
  component: Index,
});


const FOCUS = "[&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]";
const WHATSAPP = "https://wa.me/5511999999999";
const BROWNIE_PHOTO = "/site-assets/b88075489669e69a.webp";
const PENDING_GRADIENT = "linear-gradient(150deg, rgb(58, 42, 28), rgb(36, 22, 9))";

type Category = "Brownies" | "Bolos" | "Especiais";
type Size = { label: string; price: number };
type Dish = { id: string; name: string; category: Category; summary: string; tag: string; description: string; image?: string; sizes: Size[] };
type BasketLine = { dishId: string; size: number; qty: number };
type DialogState = { type: "dish"; id: string } | { type: "basket" } | null;

const DISHES: Dish[] = [
  { id: "brownie-tradicional", name: "Brownie Tradicional", category: "Brownies", image: BROWNIE_PHOTO, summary: "Cacau 70%, manteiga e o ponto exato: firme na borda, úmido no meio.", tag: "Casquinha fina, coração úmido", description: "Massa de cacau 70% com manteiga, ovos e açúcar mascavo. Casquinha fina por cima e centro úmido. Uma unidade serve uma pessoa. Contém ovos, leite e glúten.", sizes: [{ label: "Unidade", price: 12 }, { label: "Caixa com 4", price: 44 }, { label: "Caixa com 9", price: 92 }] },
  { id: "brownie-recheado", name: "Brownie Recheado", category: "Brownies", summary: "Recheio generoso de doce de leite e uma pitada de flor de sal.", tag: "Doce de leite e flor de sal", description: "Massa de cacau 70% recheada com doce de leite argentino, finalizada com flor de sal. Servido em quadrados de 7 cm. Contém ovos, leite e glúten.", sizes: [{ label: "Unidade", price: 16 }, { label: "Caixa com 4", price: 58 }, { label: "Caixa com 9", price: 124 }] },
  { id: "brownie-brigadeiro", name: "Brownie de Brigadeiro", category: "Brownies", summary: "Cobertura de brigadeiro cremoso e granulado de cacau.", tag: "O clássico em dobro", description: "Brownie de cacau 70% coberto com brigadeiro de cacau e finalizado com granulado amargo. O ponto do brigadeiro é feito na panela, em pequenas fornadas. Contém ovos, leite e glúten.", sizes: [{ label: "Unidade", price: 18 }, { label: "Caixa com 4", price: 66 }, { label: "Caixa com 9", price: 140 }] },
  { id: "brownie-nutella", name: "Brownie de Nutella", category: "Brownies", summary: "Recheio de creme de avelã e metade de avelã tostada por cima.", tag: "Avelã até a borda", description: "Brownie recheado com creme de avelã, coberto com ganache de chocolate ao leite e avelãs tostadas inteiras. Contém ovos, leite, glúten e avelã.", sizes: [{ label: "Unidade", price: 19 }, { label: "Caixa com 4", price: 70 }, { label: "Caixa com 9", price: 148 }] },
  { id: "brownies-especiais", name: "Brownies Especiais", category: "Especiais", summary: "Seis fatias da fornada do dia: caramelo salgado, nozes, chocolate branco e frutas vermelhas.", tag: "Seleção da casa", description: "Caixa degustação com seis brownies da produção do dia, escolhidos pela confeiteira. A composição muda conforme a fornada — sempre com pelo menos um de caramelo salgado e um de frutas vermelhas. Contém ovos, leite, glúten e castanhas.", sizes: [{ label: "Caixa com 6", price: 46 }, { label: "Caixa com 12", price: 86 }] },
  { id: "bolo-tradicional", name: "Bolo Tradicional", category: "Bolos", summary: "Pão de ló de cacau com creme de baunilha. Vendido em fatia ou inteiro.", tag: "Baunilha, cacau e café", description: "Pão de ló de cacau umedecido com calda de café, recheio de creme de baunilha e cobertura de açúcar de confeiteiro. A fatia é cortada na hora. Contém ovos, leite e glúten.", sizes: [{ label: "Fatia", price: 14 }, { label: "Inteiro · 1,4 kg", price: 98 }] },
  { id: "bolo-recheado", name: "Bolo Recheado", category: "Bolos", summary: "Pão de ló úmido, ganache meio amargo e doce de leite entre as camadas.", tag: "Três camadas, dois recheios", description: "Três camadas de pão de ló de cacau, ganache meio amargo e doce de leite, coberto com ganache batido. Inteiro de 1,6 kg, serve cerca de 12 fatias. A versão de encomenda tem 2,5 kg e mensagem escrita à mão. Contém ovos, leite e glúten.", sizes: [{ label: "Inteiro · 1,6 kg", price: 112 }, { label: "Encomenda · 2,5 kg", price: 168 }] },
  { id: "bolo-especial", name: "Bolo Especial", category: "Especiais", summary: "Bolo de festa com ganache espelhado, frutas vermelhas e mensagem à mão.", tag: "Para a ocasião", description: "Bolo de festa em três andares de massa, recheio escolhido por você (ganache, doce de leite ou frutas vermelhas) e acabamento com ganache espelhado, frutas frescas e mensagem escrita à mão. Encomenda com 48 horas de antecedência. Contém ovos, leite e glúten.", sizes: [{ label: "Encomenda · 3 kg", price: 168 }, { label: "Encomenda · 4,5 kg", price: 240 }] },
];
const FEATURED: string[] = ["brownie-tradicional", "bolo-recheado", "brownie-nutella"];
const CATEGORIES: Array<"Tudo" | Category> = ["Tudo", "Brownies", "Bolos", "Especiais"];
const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const money = (value: number) => BRL.format(value);
const dishById = (id: string): Dish => (DISHES.find((dish) => dish.id === id) ?? DISHES[0]) as Dish;
const sizeOf = (dish: Dish, index: number): Size => (dish.sizes[index] ?? dish.sizes[0]) as Size;

function buildOrderLink(lines: BasketLine[], notes: string) {
  const items = lines.map((line) => {
    const dish = dishById(line.dishId);
    const size = sizeOf(dish, line.size);
    return `• ${line.qty}x ${dish.name} (${size.label}) — ${money(size.price * line.qty)}`;
  });
  const total = lines.reduce((sum, line) => sum + sizeOf(dishById(line.dishId), line.size).price * line.qty, 0);
  const note = notes.trim() ? `*Observações:* ${notes.trim()}\n\n` : "";
  const text = `*Novo pedido — Doce Forno*\n\n${items.join("\n")}\n\n*Total: ${money(total)}*\n\n${note}Pode confirmar disponibilidade, prazo e entrega?`;
  return `${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

type Shop = {
  count: number;
  openBasket: () => void;
  openDish: (id: string) => void;
  addDish: (id: string, size?: number) => void;
};

function Index() {
  const [basket, setBasket] = useState<BasketLine[]>([]);
  const [notes, setNotes] = useState("");
  const [dialog, setDialog] = useState<DialogState>(null);
  const [detailSize, setDetailSize] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const count = basket.reduce((sum, line) => sum + line.qty, 0);

  const openDialog = (next: DialogState) => {
    if (!dialog && document.activeElement instanceof HTMLElement) returnFocus.current = document.activeElement;
    if (next?.type === "dish") setDetailSize(0);
    setMenuOpen(false);
    setDialog(next);
  };
  const closeDialog = () => {
    setDialog(null);
    returnFocus.current?.focus();
  };
  const addDish = (id: string, size = 0) => {
    setBasket((lines) => {
      const found = lines.find((line) => line.dishId === id && line.size === size);
      if (found) return lines.map((line) => (line === found ? { ...line, qty: line.qty + 1 } : line));
      return [...lines, { dishId: id, size, qty: 1 }];
    });
    setToast(dishById(id).name);
  };
  const changeQty = (target: BasketLine, delta: number) => {
    setBasket((lines) => lines.flatMap((line) => (line === target ? (line.qty + delta > 0 ? [{ ...line, qty: line.qty + delta }] : []) : [line])));
  };
  const shop: Shop = { count, openBasket: () => openDialog({ type: "basket" }), openDish: (id) => openDialog({ type: "dish", id }), addDish };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!dialog && !menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (dialog) closeDialog();
      else setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState(true);
  const [motionReady, setMotionReady] = useState(false);
  const assetsReady = useAssetsReady();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let show = !reduced;
    try {
      if (show && new URLSearchParams(window.location.search).get("abertura") !== "1") show = sessionStorage.getItem(INTRO_KEY) !== "seen";
    } catch {
      show = false;
    }
    if (!show) setIntro(false);
    setMotionReady(!reduced);
  }, []);
  useEffect(() => {
    if (!intro) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [intro]);
  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "seen");
    } catch {}
    setIntro(false);
  };
  useSiteMotion(rootRef, motionReady && !intro);

  const detail = dialog?.type === "dish" ? dishById(dialog.id) : null;
  const total = basket.reduce((sum, line) => sum + sizeOf(dishById(line.dishId), line.size).price * line.qty, 0);
  return (
    <>
      <style>{capturedCSS}</style>
      <div id="root">
        <div ref={rootRef} className={"bk-experience bk-motion-enabled isolate [&]:relative [overflow:clip] [width:100%]"}>
          <ScrollProgress />
          {intro && <OpeningIntro assetsReady={assetsReady} onFinish={finishIntro} />}
          <a className={"bk-skip p-[12px] no-underline top-[8px] [z-index:150] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#cardapio">Ir para o cardápio</a>
          <ImportedHeader shop={shop} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <main>
            <ImportedSectionBrownieBomFeitoComcalma />
            <ImportedSectionTemCoisaBoasaindoDo shop={shop} />
            <ImportedSectionCacauNoPontoPressa shop={shop} />
            <div className={"bk-ticker [&]:relative [z-index:2] [translate:none] [rotate:none] [scale:none]"} aria-hidden="true">
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
            <ChocolateScene />
            <ImportedSectionUmPoucoDeCacau />
            <ImportedSectionTemSempreumBoloEsperando shop={shop} />
            <ImportedSectionSemDVidaCom />
          </main>
          <ImportedFooter />
          {dialog && (
            <div className="bk-dialog-overlay" onClick={(event) => event.target === event.currentTarget && closeDialog()}>
              {detail ? (
                <div className="bk-dialog bk-dialog--wide" role="dialog" aria-modal="true" aria-labelledby="bk-dish-title">
                  <div className="bk-dialog__body">
                    <div className="bk-dialog__heading">
                      <span className="bk-eyebrow">DOCE FORNO · CARDÁPIO</span>
                      <button className={`bk-icon-button ${FOCUS}`} aria-label="Fechar janela" autoFocus onClick={closeDialog}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                      </button>
                    </div>
                    <h2 id="bk-dish-title">{detail.name}</h2>
                    <div className="bk-detail">
                      {detail.image ? (
                        <img alt={detail.name} src={detail.image} style={{ objectPosition: "center center" }} />
                      ) : (
                        <div className="bk-detail__placeholder"><span className="bk-dish__placeholder">Foto em produção</span></div>
                      )}
                      <div>
                        <span className="bk-feature__tag" style={{ color: "rgb(138, 103, 64)" }}>{detail.tag}</span>
                        <p>{detail.description}</p>
                        <div className="bk-sizes" role="group" aria-label="Escolha o tamanho">
                          {detail.sizes.map((size, index) => (
                            <button key={size.label} className={`${index === detailSize ? "is-active" : ""} ${FOCUS}`} aria-pressed={index === detailSize} onClick={() => setDetailSize(index)}>{size.label}</button>
                          ))}
                        </div>
                        <strong style={{ marginTop: 16 }}>{money(sizeOf(detail, detailSize).price)}<small>{sizeOf(detail, detailSize).label}</small></strong>
                        <button className={`bk-button bk-button--full ${FOCUS}`} onClick={() => { addDish(detail.id, detailSize); closeDialog(); }}>Quero esse <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg></button>
                        <button className={`bk-text-link ${FOCUS}`} style={{ marginTop: 10, fontSize: 11 }} onClick={() => openDialog({ type: "basket" })}>Ver minha seleção <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bk-dialog" role="dialog" aria-modal="true" aria-labelledby="bk-basket-title">
                  <div className="bk-dialog__body">
                    <div className="bk-dialog__heading">
                      <span className="bk-eyebrow">DOCE FORNO · SELEÇÃO</span>
                      <button className={`bk-icon-button ${FOCUS}`} aria-label="Fechar janela" autoFocus onClick={closeDialog}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                      </button>
                    </div>
                    <h2 id="bk-basket-title">Sua seleção</h2>
                    {basket.length === 0 ? (
                      <div className="bk-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0" /><path d="M3.103 6.034h17.794" /><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" /></svg>
                        <h3>Ainda está vazia.</h3>
                        <p>Escolha um brownie, um bolo ou uma caixa para dividir — a seleção fica aqui enquanto você navega.</p>
                        <button className={`bk-button ${FOCUS}`} onClick={() => { setDialog(null); document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" }); }}>Ver o cardápio <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
                      </div>
                    ) : (
                      <>
                        <p className="bk-dialog__intro">Confira os itens, escolha as quantidades e finalize pelo WhatsApp para combinar prazo e entrega.</p>
                        <div className="bk-basket-items">
                          {basket.map((line) => {
                            const dish = dishById(line.dishId);
                            const size = sizeOf(dish, line.size);
                            return (
                              <div className="bk-basket-item" key={`${line.dishId}-${line.size}`}>
                                {dish.image ? <img alt={dish.name} src={dish.image} /> : <span className="bk-basket-item__placeholder" aria-hidden="true" />}
                                <div>
                                  <h3>{dish.name}</h3>
                                  <span>{size.label} · {money(size.price)}</span>
                                  <div className="bk-quantity">
                                    <button className={FOCUS} aria-label={`Diminuir ${dish.name}`} onClick={() => changeQty(line, -1)}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /></svg></button>
                                    <span>{line.qty}</span>
                                    <button className={FOCUS} aria-label={`Aumentar ${dish.name}`} onClick={() => changeQty(line, 1)}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg></button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <label className="bk-field">Observações<textarea placeholder="Recheio preferido, mensagem no bolo, data de retirada…" value={notes} onChange={(event) => setNotes(event.target.value)} /></label>
                        <div className="bk-total"><span>Total</span><strong>{money(total)}</strong></div>
                        <a className={`bk-button bk-button--full ${FOCUS}`} href={buildOrderLink(basket, notes)} target="_blank" rel="noreferrer">Finalizar pelo WhatsApp <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg></a>
                        <p className="bk-local-note">O pedido é enviado pelo WhatsApp com este resumo. Pagamento, prazo e entrega são combinados por lá.</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {toast && (
            <div className="bk-toast" role="status" style={{ transform: "translateX(-50%)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
              <span>{toast} entrou na sua seleção.</span>
              <button className={FOCUS} onClick={() => { setToast(null); openDialog({ type: "basket" }); }}>Ver seleção <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div className={"bk-scroll-progress [&]:fixed [left:0px] [right:0px] [top:0px] [z-index:105] [translate:none] [rotate:none] [scale:none]"} style={{ transform: `scale(${progress}, 1)` }} aria-hidden="true" />;
}

const SCENE_PIN = 561;

function ChocolateScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(true);
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const canPin = !phone.matches && !reduced.matches;
      setPinned(!phone.matches);
      if (!canPin) return setProgress(phone.matches ? 0 : 1);
      const top = wrapper.current?.getBoundingClientRect().top ?? 0;
      setProgress(Math.min(1, Math.max(0, -top / SCENE_PIN)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div ref={wrapper} className={"[&]:relative [width:100%] [height:calc(max(min(820px,100svh),660px)+561px)] [@media(max-width:767px)]:[height:auto]"}>
      <ImportedSectionChocolatederretido progress={progress} pinned={pinned} />
    </div>
  );
}

function ImportedHeader({ shop, menuOpen, setMenuOpen }: { shop: Shop; menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <header className={"bk-header items-center justify-between [&]:absolute [left:0px] [z-index:80] [translate:none] [rotate:none] [scale:none]"}>
      <a className={"bk-brand bk-brand--light items-center gap-[7px] no-underline [flex-shrink:0] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Doce Forno — início" href="#inicio">
        <svg className="self-start mt-[4px] [flex-shrink:0] [@media(max-width:680px)]:w-[28px]" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2L3.8 16.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="bk-brand__name whitespace-nowrap [letter-spacing:-0.035em]">Doce Forno<span className="mt-[8px] [letter-spacing:0.16em]">BROWNIES E BOLOS</span></span>
      </a>
      <nav className={`bk-nav ${menuOpen ? "bk-nav--open" : ""} items-center`} id="bk-nav" aria-label="Navegação principal" onClick={(event) => (event.target as HTMLElement).closest("a") && setMenuOpen(false)}>
        <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#inicio">Início</a>
        <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#cardapio">Cardápio</a>
        <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#cozinha">A cozinha</a>
        <a className={"no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#casa">A casa</a>
      </nav>
      <div className="bk-header__actions items-center">
        <button className={"bk-basket-button min-h-[44px] min-w-[40px] [&]:relative [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label={`Abrir seleção, ${shop.count} itens`} onClick={shop.openBasket}>
          <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 10a4 4 0 0 1-8 0" />
            <path d="M3.103 6.034h17.794" />
            <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
          </svg>
          <span className={"place-items-center [&]:absolute right-[-2px] w-[16px] [top:0px]"}>{shop.count}</span>
        </button>
        <a className={"bk-button bk-button--small items-center isolate justify-center no-underline whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"} href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20encomendar%20um%20brownie%20ou%20um%20bolo%20com%20a%20Doce%20Forno." rel="noreferrer" target="_blank">Encomendar <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
        <button className={"bk-menu-toggle bk-icon-button place-items-center [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="bk-nav" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

function ImportedSectionBrownieBomFeitoComcalma() {
  return (
    <section className={"bk-hero bk-in-view [&]:relative [overflow:hidden] [scroll-margin-top:85px] [width:100%]"} id="inicio" aria-labelledby="bk-title">
      <picture className={"bk-hero__image [&]:absolute [translate:none] [rotate:none] [scale:none]"} data-site-import-responsive="30">
        <img className="object-cover [width:100%] [@media(max-width:680px)]:object-cover" alt="Pilha de brownies com ganache brilhante e flor de sal sobre mesa de madeira escura" width="1672" height="941" fetchPriority="high" src="/site-assets/6c6b089f6f2e8732.webp" />
      </picture>
      <div className={"bk-hero__shade pointer-events-none [&]:absolute [inset:0px]"} />
      <div className={"bk-hero__atmosphere pointer-events-none [&]:absolute [inset:0px] [overflow:hidden] [z-index:1]"} aria-hidden="true">
        <i className={"[&]:absolute w-[2px] [box-shadow:rgba(247,185,110,0.5)_0px_0px_10px]"} />
        <i className={"[&]:absolute w-[2px] [box-shadow:rgba(247,185,110,0.5)_0px_0px_10px]"} />
        <i className={"[&]:absolute w-[2px] [box-shadow:rgba(247,185,110,0.5)_0px_0px_10px]"} />
      </div>
      <div className={"bk-hero__copy [&]:relative [z-index:2] [translate:none] [rotate:none] [scale:none]"} data-site-import-responsive="37">
        <p className="bk-eyebrow bk-hero__eyebrow [translate:none] [rotate:none] [scale:none]">CACAU NOBRE. FORNO ACESO. FATIA GENEROSA.</p>
        <h1 id="bk-title">
          <span className="bk-hero__line [overflow:hidden]">
            <span className="[translate:none] [rotate:none] [scale:none]">Brownie bom.</span>
          </span>
          <span className="bk-hero__line [overflow:hidden]">
            <span className="[translate:none] [rotate:none] [scale:none]">Feito com</span>
          </span>
          <span className={"bk-hero__line bk-hero__line--script [&]:relative [letter-spacing:-0.055em] [overflow:visible]"}>
            <span className={"[&]:relative [translate:none] [rotate:none] [scale:none]"}>calma.<svg className={"fill-none left-[10%] [&]:absolute w-[105%] [flex-shrink:0] [stroke:var(--bk-caramel)] [stroke-linecap:round] [stroke-width:3px]"} viewBox="0 0 240 45" aria-hidden="true"><path className="[stroke-dashoffset:0px] [stroke-dasharray:401.376]" d="M8 25Q120 5 230 18M26 36Q130 23 204 27" /></svg></span>
          </span>
        </h1>
        <p className="bk-hero__description [translate:none] [rotate:none] [scale:none]">Casquinha fina, coração úmido e cacau de verdade. Do primeiro pedaço ao último café.</p>
        <div className="bk-hero__actions items-center [translate:none] [rotate:none] [scale:none]">
          <a className={"bk-button items-center isolate justify-center no-underline whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"} href="#cardapio">Ver o cardápio <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
          <a className={"bk-text-link items-center gap-[11px] min-h-[44px] no-underline [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} href="#casa">Conheça a casa <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
        </div>
        <div className="bk-hero__promises mt-[39px] [translate:none] [rotate:none] [scale:none]" data-site-import-responsive="58">
          <span><svg className="mb-[8px] w-[25px] [flex-shrink:0] [stroke-width:1.1px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>Cacau 70%<br />amargo na medida</span>
          <span><svg className="mb-[8px] w-[25px] [flex-shrink:0] [stroke-width:1.1px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" /><path d="M6 17h12" /></svg>Assado hoje<br />em pequenas fornadas</span>
          <span><svg className="mb-[8px] w-[25px] [flex-shrink:0] [stroke-width:1.1px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>Embalado<br />para presentear</span>
        </div>
      </div>
      <div className={"bk-hero__note [&]:absolute [z-index:2] [translate:none] [rotate:none] [scale:none]"} aria-hidden="true" data-site-import-responsive="72">É de comer<br />com os olhos.<svg className="fill-none w-[52px] [flex-shrink:0] [margin:7px_0px_0px_45px] [stroke:currentcolor] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2px]" viewBox="0 0 80 95"><path d="M12 4Q2 70 64 77M46 64L66 78L47 91" /></svg></div>
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

function ImportedSectionTemCoisaBoasaindoDo({ shop }: { shop: Shop }) {
  const [filter, setFilter] = useState<"Tudo" | Category>("Tudo");
  const visible = DISHES.filter((dish) => filter === "Tudo" || dish.category === filter);
  const tabs = useRef<Partial<Record<string, HTMLButtonElement | null>>>({});
  const [pill, setPill] = useState({ left: 0, top: 0, width: 0, height: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabs.current[filter];
      if (tab) setPill({ left: tab.offsetLeft, top: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [filter]);
  return (
    <section className="bk-menu-section bk-section [scroll-margin-top:85px]" id="cardapio" aria-labelledby="bk-menu-heading">
      <div className="bk-menu-heading items-end gap-[30px] justify-between">
        <div className="[translate:none] [rotate:none] [scale:none]">
          <span className="bk-eyebrow">ESCOLHA PELO OLHO. VOLTE PELO SABOR.</span>
          <h2 id="bk-menu-heading">Tem coisa boa<br /><em className="[letter-spacing:-0.035em]">saindo do forno.</em></h2>
        </div>
        <div className="bk-menu-heading__aside mb-[7px] [@media(max-width:680px)]:mt-[25px] [translate:none] [rotate:none] [scale:none]">
          <p>Um brownie de casquinha, um bolo de camadas generosas,<br />uma caixa para dividir. Qual é a sua vontade?</p>
          <span className="bk-demo-note">Produção artesanal · valores por unidade</span>
        </div>
      </div>
      <div className={"bk-categories [&]:relative [@media(max-width:680px)]:whitespace-nowrap [@media(max-width:680px)]:[overflow-x:auto] [@media(max-width:680px)]:[scrollbar-width:none]"} role="tablist" aria-label="Categorias do cardápio">
        <span className="bk-category-pill" aria-hidden="true" style={{ top: pill.top, left: 0, width: pill.width, height: pill.height, transform: `translateX(${pill.left}px)`, opacity: pill.width ? 1 : 0 }} />
        {CATEGORIES.map((category) => (
          <button key={category} ref={(node) => { tabs.current[category] = node; }} className={`${filter === category ? "is-active " : ""}isolate [&]:relative ${FOCUS} [translate:none] [rotate:none] [scale:none]`} role="tab" aria-selected={filter === category} onClick={() => setFilter(category)}>{category}</button>
        ))}
      </div>
      <div className="bk-menu-grid items-stretch [@media(max-width:680px)]:[overflow:auto_hidden] [@media(max-width:680px)]:[scroll-padding-inline:23px] [@media(max-width:680px)]:[scroll-snap-type:x_mandatory] [@media(max-width:680px)]:[scrollbar-color:rgb(189,155,98)_transparent] [@media(max-width:680px)]:[scrollbar-width:thin]">
        {visible.map((dish) => (
          <article key={dish.id} className={"bk-dish flex-col [&]:relative [overflow:hidden] [@media(max-width:680px)]:[scroll-snap-align:start]"}>
            <button className={`bk-dish__image [overflow:hidden] ${FOCUS}`} aria-label={`Ver ${dish.name}`} data-pending={dish.image ? undefined : "true"} onClick={() => shop.openDish(dish.id)}>
              {dish.image ? (
                <img className="object-cover [width:100%] [object-position:center_center]" alt={dish.name} loading="lazy" decoding="async" src={dish.image} />
              ) : (
                <span className={"bk-dish__placeholder p-[18px] place-items-center [&]:absolute text-center [&]:uppercase [inset:0px] [letter-spacing:0.18em]"}>Foto em produção</span>
              )}
              <span className={"bk-dish__category left-[13px] [&]:absolute top-[13px] [padding:4px_11px]"}>{dish.category}</span>
              <span className={"bk-dish__peek bottom-[14px] place-items-center [&]:absolute right-[15px] w-[34px] [z-index:2]"} aria-hidden="true">
                <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </span>
            </button>
            <div className="bk-dish__body flex-1 flex-col [translate:none] [rotate:none] [scale:none]">
              <h3>
                <button className={`text-left ${FOCUS}`} onClick={() => shop.openDish(dish.id)}>{dish.name}</button>
              </h3>
              <p>{dish.summary}</p>
              <div className="bk-dish__bottom items-center justify-between [margin-top:auto]">
                <strong className="whitespace-nowrap [letter-spacing:-0.04em]">{money(sizeOf(dish, 0).price)}<small className="mt-[5px] [letter-spacing:0px]">a partir de</small></strong>
                <button className={`bk-add items-center justify-center whitespace-nowrap ${FOCUS}`} aria-label={`Adicionar ${dish.name} à seleção`} onClick={() => shop.addDish(dish.id)}>
                  <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  <span>Quero esse</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="bk-menu-foot items-center justify-between [@media(max-width:680px)]:flex-wrap">
        <span className="items-center gap-[8px]">Escolha seus favoritos. A seleção é só sua.</span>
        <button className={"bk-text-link items-center gap-[11px] min-h-[44px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} onClick={shop.openBasket}>Ver minha seleção <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
      </div>
    </section>
  );
}

function ImportedSectionCacauNoPontoPressa({ shop }: { shop: Shop }) {
  const [featured, setFeatured] = useState<string>("brownie-tradicional");
  const dish = dishById(featured);
  const number = String(FEATURED.indexOf(featured) + 1).padStart(2, "0");
  return (
    <section className="bk-feature [overflow:hidden] [scroll-margin-top:85px] [@media(max-width:680px)]:flex-col" id="cozinha" aria-labelledby="bk-feature-title">
      <div className={"bk-feature__copy [&]:relative [z-index:2] [@media(max-width:680px)]:items-start [@media(max-width:680px)]:grid-cols-[1fr_auto] [@media(max-width:680px)]:[gap:0px_15px]"}>
        <span className="bk-eyebrow [@media(max-width:680px)]:[grid-column:1/-1] [translate:none] [rotate:none] [scale:none]">A NOSSA IDEIA DE FORNO</span>
        <h2 className="[translate:none] [rotate:none] [scale:none]" id="bk-feature-title">Cacau no ponto.<br /><em className="[letter-spacing:-0.035em]">Pressa nenhuma.</em></h2>
        <p className="[@media(max-width:680px)]:[grid-column:1/-1] [translate:none] [rotate:none] [scale:none]">Massa descansada na geladeira, forno baixo e tempo. É o que separa um brownie de um bolo de chocolate qualquer.</p>
        <div className="bk-dish-selector [@media(max-width:680px)]:[grid-column:1/-1]" role="tablist" aria-label="Destaques">
          {FEATURED.map((id, index) => {
            const item = dishById(id);
            return (
              <button key={id} className={`${featured === id ? "is-active " : ""}aspect-square [&]:relative [overflow:hidden] ${FOCUS} [translate:none] [rotate:none] [scale:none]`} role="tab" aria-selected={featured === id} aria-label={item.name} onClick={() => setFeatured(id)}>
                {item.image ? (
                  <img className="object-cover [filter:saturate(1)] [width:100%]" alt="" loading="lazy" decoding="async" src={item.image} />
                ) : (
                  <span className={"bottom-[5px] left-[7px] [&]:absolute [text-shadow:rgb(0,0,0)_0px_1px_4px] [width:100%]"} style={{ display: "block", height: "100%", borderRadius: "9px", background: PENDING_GRADIENT }} aria-hidden="true" />
                )}
                <span className={"bottom-[5px] left-[7px] [&]:absolute [text-shadow:rgb(0,0,0)_0px_1px_4px]"}>{String(index + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
        <div className="bk-feature__details [@media(max-width:680px)]:[grid-column:1/-1]">
          <span className="bk-feature__tag">{dish.tag}</span>
          <h3>{dish.name}</h3>
          <p className="max-w-[280px]">{dish.summary}</p>
          <button className={"bk-button items-center isolate justify-center whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"} onClick={() => shop.openDish(dish.id)}>Quero esse · {money(sizeOf(dish, 0).price)}<svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
        </div>
      </div>
      <div className={"bk-feature__art items-center justify-center [&]:relative [min-width:0px] [@media(max-width:680px)]:self-center [@media(max-width:680px)]:aspect-square [@media(max-width:680px)]:max-w-[450px] [@media(max-width:680px)]:[margin:20px_0px_4px] [@media(max-width:680px)]:[width:100%]"}>
        <div className={"bk-feature__ring bk-feature__ring--one aspect-square pointer-events-none [&]:absolute [translate:none] [rotate:none] [scale:none]"} />
        <div className={"bk-feature__ring bk-feature__ring--two aspect-square pointer-events-none [&]:absolute [translate:none] [rotate:none] [scale:none]"} />
        <div className={"bk-feature__frame [&]:relative [box-shadow:rgba(18,11,8,0.33)_0px_25px_45px] [overflow:hidden] [translate:none] [rotate:none] [scale:none]"}>
          {dish.image ? <img className="object-cover [width:100%]" alt={dish.name} loading="lazy" decoding="async" src={dish.image} /> : <span className="bk-dish__placeholder">Foto em produção</span>}
        </div>
        <span className={"bk-feature__annotation [&]:absolute"} aria-hidden="true">assado devagar<svg className="bk-scribble mt-[7px] [flex-shrink:0] [max-width:100%]" viewBox="0 0 220 66" fill="none"><path d="M5 39C44 6 152 6 210 26C241 37 119 67 33 48C-10 38 73 21 180 30M175 20L211 26L184 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span>
        <span className={"bk-feature__number pointer-events-none [&]:absolute [-webkit-text-stroke:1px_rgba(232,200,125,0.37)] [letter-spacing:-0.08em] [translate:none] [rotate:none] [scale:none]"} aria-hidden="true">{number}</span>
      </div>
    </section>
  );
}

function ImportedSectionChocolatederretido({ progress, pinned }: { progress: number; pinned: boolean }) {
  const eased = 1 - (1 - progress) ** 2;
  const rest = 1 - eased;
  return (
    <section className={"bk-scene [&]:sticky [top:0px] [width:100%] [overflow:hidden] [scroll-margin-top:85px] [translate:none] [rotate:none] [scale:none]"} id="forno" aria-labelledby="bk-scene-title" data-site-import-responsive="355">
      <img className={"bk-scene__image object-cover [&]:absolute [translate:none] [rotate:none] [scale:none]"} style={(pinned ? { clipPath: `inset(${8 * rest}% ${13 * rest}% round ${160 * rest}px)`, transform: `scale(${1 + 0.12 * rest})` } : { transform: "scale(1.06, 1.06)" }) as CSSProperties} alt="Brownies recém-saídos do forno, com ganache derretida" loading="lazy" decoding="async" src="/site-assets/6c6b089f6f2e8732.webp" data-site-import-responsive="356" />
      <div className={"bk-scene__shade [&]:absolute [inset:0px]"} />
      <div className={"bk-fire-atmosphere pointer-events-none [&]:absolute [inset:0px] [overflow:hidden]"} aria-hidden="true">
        <i className={"bottom-[-25%] [&]:absolute"} />
        <i className={"bottom-[-25%] [&]:absolute"} />
        <i className={"bottom-[-25%] [&]:absolute"} />
      </div>
      <span className={"bk-eyebrow bk-scene__eyebrow [&]:absolute"}>DO FORNO PARA A MESA</span>
      <h2 className={"pointer-events-none [&]:absolute [left:0px]"} id="bk-scene-title">
        <span className="bk-scene__word bk-scene__word--one text-center whitespace-nowrap [translate:none] [rotate:none] [scale:none]" style={{ transform: pinned ? `translate(${8 - 25 * eased}%, 0%)` : "none" }}>Chocolate</span>
        <span className="bk-scene__word bk-scene__word--two text-center whitespace-nowrap [translate:none] [rotate:none] [scale:none]" style={{ transform: pinned ? `translate(${-8 + 22 * eased}%, 0%)` : "none" }}>derretido.</span>
      </h2>
      <div className={"bk-scene__stamp items-center flex-col justify-center [&]:absolute text-center [outline:rgba(245,218,163,0.44)_dashed_1px] [outline-offset:-9px] [translate:none] [rotate:none] [scale:none]"} style={{ transform: pinned ? `rotate(${-23 + 43 * eased}deg) scale(${0.88 + 0.12 * eased})` : "rotate(-23deg) scale(0.88, 0.88)" }} data-site-import-responsive="366">
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
        <div className="bk-story__photo [overflow:hidden]">
          <img className="object-cover [width:100%]" alt="Brownies em uma mesa de madeira, com cacau e flor de sal ao redor" loading="lazy" decoding="async" src="/site-assets/6c6b089f6f2e8732.webp" />
        </div>
        <div className={"bk-story__note [&]:absolute [box-shadow:rgba(44,30,17,0.07)_5px_9px] [translate:none] [rotate:none] [scale:none]"} aria-hidden="true">assado devagar<svg className="bk-draw fill-none w-[90px] [flex-shrink:0] [margin:5px_0px_0px_45px] [stroke:currentcolor] [stroke-linecap:round] [stroke-width:2px]" viewBox="0 0 100 46"><path d="M4 8Q54 2 88 24M88 24L66 20M88 24L74 40" /></svg></div>
      </div>
      <div className="bk-story__copy [@media(max-width:680px)]:[width:100%]">
        <span className="bk-eyebrow">A NOSSA IDEIA DE CONFEITARIA</span>
        <h2 className="bk-reveal [translate:none] [rotate:none] [scale:none]" id="bk-story-title">Um pouco de cacau.<br /><em className="[letter-spacing:-0.035em]">Um tanto de afeto.</em></h2>
        <p className="bk-story__lead bk-reveal [translate:none] [rotate:none] [scale:none]">Uma casa para quem acredita que doce também é um jeito de cuidar.</p>
        <p className="bk-reveal [translate:none] [rotate:none] [scale:none]">A Doce Forno começou numa cozinha pequena, com uma forma de 20 cm e a teimosia de assar todo dia. Hoje são duas fornadas diárias, sempre em pequenas quantidades, porque brownie bom não espera a semana inteira.</p>
        <p className="bk-reveal [translate:none] [rotate:none] [scale:none]">Cacau de origem, manteiga de verdade, ovos de galinha caipira e o tempo que a massa precisa para descansar na geladeira antes de ir ao forno. Nenhum atalho: é isso que separa um brownie de um bolo de chocolate qualquer.</p>
        <a className={"bk-button items-center isolate justify-center mt-[25px] no-underline whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"} href="#cardapio">Encontre o seu doce <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
        <div className="bk-story__signature items-center"><svg className="[flex-shrink:0]" width="46" height="14" viewBox="0 0 46 14" fill="none" aria-hidden="true"><path d="M1 9c8-7 14 4 22-2s12 5 22-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>Doce Forno</div>
      </div>
    </section>
  );
}

function ImportedSectionTemSempreumBoloEsperando({ shop }: { shop: Shop }) {
  return (
    <section className={"bk-visit [&]:relative [overflow:hidden] [scroll-margin-top:85px] [@media(max-width:680px)]:flex-col"} id="encomenda" aria-labelledby="bk-visit-title">
      <div className={"bk-visit__copy [&]:relative [z-index:2]"}>
        <span className="bk-eyebrow mb-[20px] [translate:none] [rotate:none] [scale:none]">MUITO PRAZER. PODE CHEGAR.</span>
        <h2 className="[translate:none] [rotate:none] [scale:none]" id="bk-visit-title">Tem sempre<br /><em className="[letter-spacing:-0.035em]">um bolo esperando.</em></h2>
        <p className="[translate:none] [rotate:none] [scale:none]">Encomendas com 48 horas de antecedência, retirada no ateliê ou entrega na região. Escolha o recheio, a cobertura e a mensagem: a gente assa no dia.</p>
        <div className="bk-visit__buttons items-center [translate:none] [rotate:none] [scale:none]">
          <a className={"bk-button items-center isolate justify-center no-underline whitespace-nowrap [overflow:hidden] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px] [&:hover]:[box-shadow:rgba(158,102,46,0.22)_0px_7px_25px]"} href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20encomendar%20um%20brownie%20ou%20um%20bolo%20com%20a%20Doce%20Forno." rel="noreferrer" target="_blank">Pedir pelo WhatsApp <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg></a>
          <button className={"bk-text-link items-center gap-[11px] min-h-[44px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} onClick={shop.openBasket}>Montar seleção <svg className="[flex-shrink:0]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></button>
        </div>
        <span className="bk-visit__note">Encomendas sob medida · retirada e entrega a combinar</span>
      </div>
      <div className="bk-visit__photo [overflow:hidden]">
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
        <h2 className="bk-reveal [translate:none] [rotate:none] [scale:none]" id="bk-faq-title">Sem dúvida.<br /><em className="[letter-spacing:-0.035em]">Com vontade.</em></h2>
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
          <button className={"bk-footer__back items-center! gap-[6px] place-items-center w-[42px] [&:focus-visible]:[outline:3px_solid_var(--bk-script)] [&:focus-visible]:[outline-offset:5px]"} aria-label="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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

const INTRO_KEY = "doce-forno-abertura";
const HERO_PHOTO = "/site-assets/6c6b089f6f2e8732.webp";
const SPARKS: Array<[number, number]> = [[15, 35], [24, 65], [37, 20], [58, 16], [74, 34], [85, 56], [65, 76], [32, 78]];
const ARROW = <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>;

function useAssetsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const image = new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = HERO_PHOTO;
      if (img.complete) resolve();
    });
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, 3500));
    Promise.race([Promise.all([image, fonts]).then(() => undefined), timeout]).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return ready;
}

function OpeningIntro({ assetsReady, onFinish }: { assetsReady: boolean; onFinish: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const finished = useRef(false);
  const played = useRef(false);
  const ready = useRef(assetsReady);
  const finish = useRef(onFinish);
  ready.current = assetsReady;
  finish.current = onFinish;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const done = () => {
      if (finished.current) return;
      finished.current = true;
      finish.current();
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
    const phone = window.matchMedia("(max-width: 680px)").matches;
    const k = phone ? 0.84 : 1;
    const ctx = gsap.context(() => {
      const inks = element.querySelectorAll<SVGGeometryElement>(".bk-opening__ink");
      inks.forEach((ink) => {
        const length = ink.getTotalLength();
        gsap.set(ink, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap
        .timeline({ defaults: { ease: "power3.out" }, onComplete: () => { played.current = true; if (ready.current) done(); } })
        .from(".bk-opening__plate", { scale: 0.68, rotation: -52, duration: 1.2 * k }, 0)
        .to(inks, { strokeDashoffset: 0, duration: 1.05 * k, stagger: 0.045 }, 0.1 * k)
        .from(".bk-opening__letter", { yPercent: 125, rotation: (index: number) => (index % 2 ? 9 : -9), duration: 0.85 * k, stagger: 0.055 * k }, 0.18 * k)
        .from(".bk-opening__script", { clipPath: "inset(0 100% 0 0)", x: -20, rotation: -12, duration: 0.85 * k }, 0.62 * k)
        .from(".bk-opening__eyebrow", { opacity: 0, y: 10, duration: 0.5 * k }, 0.4 * k)
        .from(".bk-opening__ticket", { x: 35, y: 55, rotation: 18, opacity: 0, duration: 0.75 * k }, 0.75 * k)
        .fromTo(".bk-opening__spark", { y: 35, scale: 0, opacity: 0 }, { y: -65, scale: 1, opacity: 0.8, stagger: 0.06 * k, duration: 0.7 * k }, 0.65 * k)
        .to(".bk-opening__spark", { y: -115, opacity: 0, duration: 0.7, stagger: 0.025 }, 1.35 * k)
        .to(".bk-opening__status-track", { yPercent: -33.333, duration: 0.4 }, 0.9 * k)
        .to(".bk-opening__status-track", { yPercent: -66.666, duration: 0.4 }, 1.65 * k)
        .to(".bk-opening__progress > i", { scaleX: 1, duration: 2.8, ease: "none" }, 0)
        .to(".bk-opening__composition", { y: phone ? -35 : -75, scale: 0.94, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.9 * k)
        .to(".bk-opening__sheet", { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 100%)", duration: 0.72, ease: "power3.inOut" }, 2 * k)
        .to(".bk-opening__sheet", { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 0.56, ease: "power3.out" }, 2.62 * k)
        .to(".bk-opening__trail", { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 1.12, ease: "expo.inOut" }, 2.12 * k)
        .to(".bk-opening__footer", { opacity: 0, y: 12, duration: 0.25 }, 2 * k);
      gsap.delayedCall(4.8, done);
    }, element);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (assetsReady && played.current && !finished.current) {
      finished.current = true;
      finish.current();
    }
  }, [assetsReady]);

  return (
    <div ref={root} className="bk-opening" data-testid="cinematic-intro" aria-label="Abertura da Doce Forno">
      <div className="bk-opening__trail" />
      <div className="bk-opening__sheet">
        <div className="bk-opening__composition">
          <svg className="bk-opening__plate" viewBox="0 0 540 540" fill="none" aria-hidden="true">
            <circle className="bk-opening__ink" cx="270" cy="270" r="249" />
            <circle className="bk-opening__ink" cx="270" cy="270" r="230" />
            <path className="bk-opening__ink" d="M78 172Q47 154 53 124Q88 131 78 172ZM456 364Q491 351 490 321Q454 326 456 364ZM110 423L85 448M425 100L449 77M87 305L54 308M440 225L478 222" />
            <path className="bk-opening__ink bk-opening__steam" d="M244 133C215 108 267 91 245 65M271 130C247 107 293 88 272 62M298 133C275 109 318 96 304 72" />
          </svg>
          <span className="bk-opening__eyebrow">O FORNO ACENDE. A CASA CHEIRA.</span>
          <div className="bk-opening__word" aria-label="Cacau">
            {"CACAU".split("").map((letter, index) => (
              <span key={`${letter}-${index}`} className="bk-opening__letter" aria-hidden="true">{letter}</span>
            ))}
          </div>
          <span className="bk-opening__script">no ponto.</span>
          <div className="bk-opening__ticket">
            <span>Doce Forno</span>
            <small>BROWNIES E BOLOS.<br />ASSADOS TODO DIA.</small>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ARROW}</svg>
          </div>
          <div className="bk-opening__sparks" aria-hidden="true">
            {SPARKS.map(([left, top], index) => (
              <i key={`${left}-${top}`} className="bk-opening__spark" style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * 0.2}s` }} />
            ))}
          </div>
        </div>
        <div className="bk-opening__footer">
          <div>
            <div className="bk-opening__status">
              <div className="bk-opening__status-track">
                <span>O forno acende.</span>
                <span>A massa descansa.</span>
                <span>Pode chegar.</span>
              </div>
            </div>
            <div className="bk-opening__progress"><i /></div>
          </div>
          <button className={`bk-opening__skip ${FOCUS}`} onClick={() => { if (!finished.current) { finished.current = true; finish.current(); } }}>
            Pular abertura <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ARROW}</svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Entrance, scroll-reveal and hover motion ported from the original site.
// The "Chocolate derretido" pin and the scroll progress bar are driven by their own components.
function useSiteMotion(rootRef: RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;
    gsap.registerPlugin(ScrollTrigger);
    let alive = true;
    const ctx = gsap.context(() => {
      const small = window.matchMedia("(max-width: 899px)").matches;
      const hero = gsap.timeline({ defaults: { ease: "power4.out" } });
      hero
        .from(".bk-header", { y: -18, opacity: 0, duration: 0.8 }, 0.1)
        .from(".bk-hero__line > span", { yPercent: 115, rotation: small ? 0 : 3, duration: small ? 0.85 : 1.15, stagger: 0.105 }, 0.08)
        .from(".bk-hero__copy > p, .bk-hero__actions, .bk-hero__promises", { opacity: 0, y: small ? 14 : 25, duration: 0.75, stagger: 0.085 }, 0.42)
        .from(".bk-hero__note", { rotation: -20, scale: 0.82, opacity: 0, duration: 0.9 }, 0.65);
      gsap.fromTo(".bk-hero__image", { scale: small ? 1.025 : 1.055 }, { scale: 1, duration: small ? 1.35 : 1.9, ease: "power3.out" });
      const underline = root.querySelector<SVGPathElement>(".bk-hero__line--script path");
      if (underline) {
        const length = underline.getTotalLength();
        hero.fromTo(underline, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, 0.65);
      }

      gsap
        .timeline({ scrollTrigger: { trigger: ".bk-menu-heading", start: "top 90%", once: true }, defaults: { ease: "power3.out" } })
        .from(".bk-menu-heading > div:first-child", { y: small ? 24 : 45, clipPath: "inset(0% 0% 100% 0%)", duration: 1.1 })
        .from(".bk-menu-heading__aside", { x: small ? 0 : 30, y: small ? 18 : 0, opacity: 0, duration: 0.8 }, 0.25)
        .from(".bk-categories > button", { y: 16, opacity: 0, duration: 0.5, stagger: 0.055 }, 0.4);
      gsap.fromTo(".bk-dish__image", { clipPath: "inset(0% 0% 100% 0% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", stagger: small ? 0.075 : 0.12, duration: 0.95, ease: "power3.inOut", clearProps: "clipPath", scrollTrigger: { trigger: ".bk-menu-grid", start: "top 90%", once: true } });
      gsap.from(".bk-dish__body", { y: 25, opacity: 0, stagger: 0.08, duration: 0.8, scrollTrigger: { trigger: ".bk-menu-grid", start: "top 86%", once: true } });

      gsap
        .timeline({ scrollTrigger: { trigger: ".bk-feature", start: "top 87%", once: true }, defaults: { ease: "power3.out" } })
        .from(".bk-feature__copy > .bk-eyebrow, .bk-feature__copy > h2, .bk-feature__copy > p", { y: small ? 22 : 38, opacity: 0, stagger: 0.1, duration: 0.9 })
        .from(".bk-dish-selector > button", { y: 20, rotation: small ? 0 : -5, opacity: 0, duration: 0.55, stagger: 0.07, clearProps: "transform" }, 0.3)
        .from(".bk-feature__frame", { scale: small ? 0.94 : 0.86, rotation: small ? 0 : -7, opacity: 0, duration: 1.15 }, 0.1)
        .from(".bk-feature__annotation", { clipPath: "inset(0 100% 0 0)", duration: 0.85 }, 0.6);
      gsap.to(".bk-feature__ring--one", { rotation: 55, ease: "none", scrollTrigger: { trigger: ".bk-feature", start: "top bottom", end: "bottom top", scrub: small ? true : 0.6 } });
      gsap.to(".bk-feature__ring--two", { rotation: -35, ease: "none", scrollTrigger: { trigger: ".bk-feature", start: "top bottom", end: "bottom top", scrub: small ? true : 0.6 } });
      gsap.fromTo(".bk-feature__number", { y: 35 }, { y: -25, ease: "none", scrollTrigger: { trigger: ".bk-feature", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".bk-ticker", { rotation: -2.2, y: 12 }, { rotation: -0.6, y: -10, ease: "none", scrollTrigger: { trigger: ".bk-ticker", start: "top bottom", end: "bottom top", scrub: true } });

      gsap.utils.toArray<HTMLElement>(".bk-reveal").forEach((element) => {
        const heading = element.tagName === "H2";
        gsap.from(element, { y: small ? 20 : heading ? 38 : 26, opacity: 0, ...(heading ? { clipPath: "inset(0 0 100% 0)" } : {}), duration: heading ? 1.05 : 0.8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 93%", once: true } });
      });
      gsap.utils.toArray<SVGPathElement>(".bk-draw path").forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.35, ease: "power2.inOut", scrollTrigger: { trigger: path, start: "top 89%", once: true } });
      });
      gsap.fromTo(".bk-story__photo", { clipPath: small ? "inset(6% 5% 6% 5% round 100px)" : "inset(12% 8% 12% 8% round 180px)" }, { clipPath: "inset(0% 0% 0% 0% round 20px)", ease: "none", scrollTrigger: { trigger: ".bk-story", start: "top 90%", end: "center center", scrub: small ? true : 0.65 } });
      gsap.fromTo(".bk-story__note", { rotation: small ? -5 : -14, y: small ? 10 : 35 }, { rotation: small ? 3 : 5, y: small ? -8 : -20, ease: "none", scrollTrigger: { trigger: ".bk-story", start: "top bottom", end: "bottom top", scrub: small ? true : 0.6 } });
      gsap
        .timeline({ scrollTrigger: { trigger: ".bk-visit", start: "top 88%", once: true }, defaults: { ease: "power3.out" } })
        .from(".bk-visit__copy > .bk-eyebrow, .bk-visit__copy > h2, .bk-visit__copy > p, .bk-visit__buttons", { y: small ? 22 : 38, opacity: 0, duration: 0.9, stagger: 0.12 })
        .from(".bk-visit__photo", { clipPath: small ? "ellipse(10% 20% at 60% 82%)" : "ellipse(10% 20% at 80% 58%)", duration: 1.2 }, 0.12);

      const media = gsap.matchMedia();
      media.add("(min-width: 900px)", () => {
        gsap.to(".bk-hero__image", { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".bk-hero", start: "top top", end: "bottom top", scrub: 0.55 } });
        gsap.to(".bk-hero__copy", { y: -45, ease: "none", scrollTrigger: { trigger: ".bk-hero", start: "top top", end: "bottom top", scrub: 0.55 } });
      });
      media.add("(max-width: 767px)", () => {
        gsap.from(".bk-scene__word", { y: 28, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".bk-scene h2", start: "top 88%", once: true } });
      });
      media.add("(hover: hover) and (pointer: fine)", () => {
        const cleanups: Array<() => void> = [];
        root.querySelectorAll<HTMLElement>(".bk-button").forEach((button) => {
          const icon = button.querySelector("svg");
          if (!icon) return;
          const toX = gsap.quickTo(icon, "x", { duration: 0.3, ease: "power3.out" });
          const toY = gsap.quickTo(icon, "y", { duration: 0.3, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            const box = button.getBoundingClientRect();
            toX((event.clientX - box.left - box.width / 2) * 0.055);
            toY((event.clientY - box.top - box.height / 2) * 0.16);
          };
          const leave = () => {
            toX(0);
            toY(0);
          };
          button.addEventListener("pointermove", move);
          button.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            button.removeEventListener("pointermove", move);
            button.removeEventListener("pointerleave", leave);
          });
        });
        return () => cleanups.forEach((cleanup) => cleanup());
      });
    }, root);
    const refresh = () => alive && ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    const timer = window.setTimeout(refresh, 450);
    return () => {
      alive = false;
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [enabled, rootRef]);
}
