# Délle Doces — Cardápio online

## Marcar produto como disponível ou indisponível

1. Abra o arquivo `script.js`.
2. No começo do arquivo, localize o produto pelo `name` ou `id`.
3. Altere apenas o campo `available`:

```js
available: true,  // Disponível — pode entrar no pedido
available: false, // Indisponível — aparece no cardápio, mas não pode ser pedido
```

Exemplo para marcar o bolo Matilda como indisponível:

```js
{
    id: 6,
    name: "Matilda",
    description: "Sabor: Muito gostoso rsrs.",
    price: 20,
    available: false,
    category: "bolos",
    categoryName: "bolos",
    image: "matilda.jpg",
    emoji: "🍰"
},
```

Cada produto tem um `available` próprio. No cardápio, os disponíveis exibem selo verde e botão `+`. Os indisponíveis exibem selo vermelho, foto suavizada e botão desativado. Produtos indisponíveis não podem entrar no carrinho ou finalizar pedido.

**Importante:** como o site é estático (GitHub Pages), altere o `script.js` e publique a mudança no repositório para que o novo status seja visto por todos. Não existe painel administrativo em tempo real nem banco de dados neste projeto. Se desejar controlar a disponibilidade por um painel sem editar código, será necessário usar um serviço de armazenamento compartilhado/backend.
