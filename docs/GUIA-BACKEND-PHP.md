# Guia do código — Doce Forno

Este guia explica como o site está organizado e onde um backend em PHP pode se encaixar.

## Onde está cada coisa

| Arquivo | O que tem |
| --- | --- |
| `src/routes/index.tsx` | A página inteira: lista de produtos, carrinho, pedido no WhatsApp, seções, animações. Tem um índice comentado no topo. |
| `src/styles/site.css` | Visual do site (cores, tamanhos, efeitos). Todas as regras ficam dentro de `.bk-experience`. |
| `src/styles.css` | Estilos globais (inclui a regra que esconde a marca do Lovable). |
| `src/routes/__root.tsx` | Estrutura comum a todas as páginas (título, fontes). |
| `public/site-assets/` | Fotos do site. |

Procure por `BACKEND:` dentro de `src/routes/index.tsx` para achar os pontos de ligação.

## Como a loja funciona hoje (sem backend)

1. Os produtos estão fixos na lista `DISHES`.
2. O carrinho fica só na memória do navegador. Ele some ao recarregar a página.
3. "Finalizar pelo WhatsApp" chama `buildOrderLink`, que escreve o pedido numa mensagem e abre o WhatsApp.
4. Nenhum dado é salvo em lugar nenhum.

## Formato dos dados

### Produto (`Dish`)

```json
{
  "id": "brownie-tradicional",
  "name": "Brownie Tradicional",
  "category": "Brownies",
  "summary": "Texto curto do cartão",
  "tag": "Frase pequena de destaque",
  "description": "Texto completo da janela do produto",
  "image": "/site-assets/b88075489669e69a.webp",
  "sizes": [
    { "label": "Unidade", "price": 12 },
    { "label": "Caixa com 4", "price": 44 }
  ]
}
```

- `category` precisa ser exatamente `Brownies`, `Bolos` ou `Especiais` (são as abas de filtro).
- `price` é um número em reais, sem "R$".
- `image` é opcional. Sem ela, aparece "Foto em produção".

### Linha do carrinho (`BasketLine`)

```json
{ "dishId": "brownie-tradicional", "size": 1, "qty": 2 }
```

`size` é a **posição** do tamanho na lista `sizes`, começando em 0. No exemplo, `1` = "Caixa com 4".

## Sugestão de endpoints em PHP

São só sugestões de nome e formato:

**`GET /api/produtos.php`** devolve a lista de produtos no formato acima:

```php
<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://enter-property-discovery.lovable.app');
$produtos = []; // buscar do banco de dados
echo json_encode($produtos, JSON_UNESCAPED_UNICODE);
```

**`POST /api/pedidos.php`** recebe o carrinho para salvar o pedido:

```json
{
  "lines": [{ "dishId": "brownie-recheado", "size": 0, "qty": 3 }],
  "notes": "Entregar depois das 18h"
}
```

Cuidados importantes:
- **Recalcule o total no PHP** usando os preços do banco. Nunca confie num preço ou total vindo do navegador.
- Valide `dishId`, `size` (precisa existir) e `qty` (número inteiro maior que 0).
- O site e o PHP vão ficar em endereços diferentes, então o PHP precisa liberar o acesso (o cabeçalho `Access-Control-Allow-Origin`) e responder ao pedido `OPTIONS` que o navegador manda antes do `POST`.

## Onde trocar no código (quando forem integrar)

- **Produtos:** trocar a lista fixa `DISHES` por uma busca em `/api/produtos.php`. Hoje vários trechos leem `DISHES` direto (`dishById`, o cardápio e o destaque "Cacau no ponto"). Por isso essa troca precisa ser feita com cuidado, de preferência numa mudança só.
- **Pedido:** antes de abrir o WhatsApp no botão "Finalizar pelo WhatsApp", enviar `basket` e `notes` para `/api/pedidos.php`.
- **Número do WhatsApp:** a constante `WHATSAPP`. Ele também aparece escrito direto em dois botões "Encomendar / Pedir pelo WhatsApp" (procure por `wa.me`).

## Observação sobre a hospedagem

Este site é feito em React (TypeScript) e é publicado pelo Lovable. Ele não roda PHP. O backend PHP precisa ficar numa hospedagem própria, e o site conversa com ele pelos endereços `/api/...` acima.
