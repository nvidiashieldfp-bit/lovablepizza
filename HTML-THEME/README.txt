==========================================
 PIZZA BURGUER ALMEIRIM - TEMA HTML v3.1
==========================================

Website oficial: https://pizzaburguer.pt
Versão: 3.1
Data: Janeiro 2026
Desenvolvido por: Senior Frontend Web Developer

------------------------------------------
 ESTRUTURA DE FICHEIROS
------------------------------------------

HTML-THEME/
├── index.html          - Página principal (HTML5 semântico)
├── style.css           - Estilos CSS (Design System completo)
├── javascript.js       - Funcionalidades JavaScript (ES6+)
├── favicon.ico         - Ícone do site
├── favicon.png         - Ícone do site (PNG)
├── README.txt          - Este ficheiro
└── images/             - Pasta de imagens
    ├── logo.png            - Logo do restaurante
    ├── logo-site.png       - Pizza Clássica (do site)
    ├── pizzas-menu.png     - Pizza Bacon (do site)
    ├── pizzas-menu2.png    - Pizza Margarita (do site)
    ├── pizza-hero.jpg      - Imagem hero pizza
    ├── burger-hero.jpg     - Imagem hero hambúrguer
    ├── kebab-hero.jpg      - Imagem hero kebab
    ├── gallery-table.jpg   - Galeria: mesa
    ├── gallery-fries.jpg   - Galeria: batatas
    ├── gallery-pasta.jpg   - Galeria: massa
    ├── gallery-dessert.jpg - Galeria: sobremesa
    ├── menu1.png           - Imagem Menu 1
    ├── menu2.png           - Imagem Menu 2
    ├── menu3.png           - Imagem Menu 3
    ├── menu4.png           - Imagem Menu 4
    ├── menu5.png           - Imagem Menu 5
    └── menu6.png           - Imagem Menu 6 (Infantil)

------------------------------------------
 DADOS REAIS DO PIZZABURGUER.PT
------------------------------------------

TELEFONE:
243 046 828 / 914 962 991

WHATSAPP:
+351 243 046 828

LOCALIZAÇÃO:
Avenida Dom João I LT 48, 2080-014 Almeirim

HORÁRIO:
- Todos os dias: 12:00 - 15:00
- Todos os dias: 19:00 - 23:30
- Intervalo: 15:00 - 19:00 (fechado)
- Feriados: Encerrado

------------------------------------------
 FUNCIONALIDADES v3.1
------------------------------------------

FUNCIONALIDADES BASE:
✓ Slider automático no hero (5 segundos)
✓ Animações de scroll reveal
✓ Menu com categorias interativas
✓ Carousel de avaliações com auto-play
✓ Galeria de imagens com hover
✓ Botão WhatsApp fixo
✓ Design responsivo (mobile-first)
✓ Links de telefone clicáveis

SISTEMA DE HORÁRIO:
✓ Indicador Aberto/Fechado animado
✓ Sistema de feriados portugueses automático
✓ Feriados móveis (Páscoa, Sexta-feira Santa, Corpo de Deus)
✓ Contagem regressiva das 23:00 às 23:30
✓ Badge "Fecha em X min" no botão WhatsApp
✓ Botão WhatsApp oculto quando fechado

ACESSIBILIDADE (WCAG 2.1):
✓ Skip link para conteúdo principal
✓ ARIA labels em todos os elementos interativos
✓ Navegação por teclado completa
✓ Suporte para reduced motion
✓ Focus states visíveis
✓ Screen reader friendly
✓ Contraste de cores adequado

SEO:
✓ Schema.org JSON-LD completo
✓ Open Graph meta tags
✓ Twitter Card meta tags
✓ Meta keywords e description
✓ Texto SEO na página
✓ Imagens com alt descritivos
✓ HTML5 semântico

PERFORMANCE:
✓ Lazy loading de imagens
✓ CSS minificável
✓ JavaScript modular
✓ Fonts preconnect
✓ Icons via CDN com defer

------------------------------------------
 SISTEMA DE FERIADOS
------------------------------------------

O tema inclui automaticamente os feriados portugueses:

FERIADOS FIXOS (fechado):
- 1 Janeiro - Ano Novo
- 25 Abril - Dia da Liberdade
- 1 Maio - Dia do Trabalhador
- 10 Junho - Dia de Portugal
- 15 Agosto - Assunção de Nossa Senhora
- 5 Outubro - Implantação da República
- 1 Novembro - Dia de Todos os Santos
- 1 Dezembro - Restauração da Independência
- 8 Dezembro - Imaculada Conceição
- 25 Dezembro - Natal
- 26 Dezembro - Dia seguinte ao Natal

FERIADOS MÓVEIS (calculados automaticamente):
- Sexta-feira Santa (2 dias antes da Páscoa)
- Páscoa (Domingo)
- Corpo de Deus (60 dias após Páscoa)

PERSONALIZAR FERIADOS:
Edite o array FIXED_HOLIDAYS no ficheiro javascript.js:

const FIXED_HOLIDAYS = [
    { day: 1, month: 1, name: "Ano Novo", closed: true },
    // Adicione ou remova conforme necessário
];

Para NÃO fechar num feriado: closed: false

------------------------------------------
 CONTAGEM REGRESSIVA
------------------------------------------

Das 23:00 às 23:30, o sistema mostra automaticamente:
- "⏱️ Fecha em X min" no indicador de status
- Badge animado no botão WhatsApp flutuante
- Texto de urgência nos botões de encomenda

Objetivo: Incentivar pedidos antes do fecho.

------------------------------------------
 INSTALAÇÃO
------------------------------------------

1. Copie TODOS os ficheiros para o seu servidor web:
   - index.html
   - style.css
   - javascript.js
   - favicon.ico
   - favicon.png
   - images/ (pasta completa)

2. Certifique-se de que a pasta "images" contém todas
   as imagens listadas acima.

3. Personalize conforme necessário (ver secções abaixo).

4. Pronto! O site está funcional.

NOTA: Não são necessárias instalações adicionais.
      Tudo funciona com recursos externos via CDN.

------------------------------------------
 PERSONALIZAÇÃO DO HORÁRIO
------------------------------------------

Edite o objeto openingHours no ficheiro javascript.js:

const openingHours = {
    0: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Domingo
    1: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Segunda
    2: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Terça
    3: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Quarta
    4: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Quinta
    5: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Sexta
    6: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }]  // Sábado
};

Formato: { start: HORA_INICIO, end: HORA_FIM }
Use decimais para minutos: 23.5 = 23:30

------------------------------------------
 DEPENDÊNCIAS EXTERNAS (CDN)
------------------------------------------

O tema utiliza recursos externos via CDN:

1. Google Fonts (Poppins)
   https://fonts.googleapis.com
   
2. Lucide Icons
   https://unpkg.com/lucide@latest

Vantagens:
- Não é necessário instalar nada localmente
- Cache global (melhor performance)
- Sempre atualizado

------------------------------------------
 PERSONALIZAÇÃO DE CORES
------------------------------------------

Edite as variáveis CSS no ficheiro style.css (:root):

:root {
    --primary: hsl(24, 85%, 55%);       /* Laranja principal */
    --primary-hover: hsl(24, 85%, 48%); /* Laranja hover */
    --whatsapp: hsl(142, 70%, 45%);     /* Verde WhatsApp */
    --background: hsl(35, 80%, 96%);    /* Fundo creme */
    --foreground: hsl(20, 20%, 15%);    /* Texto escuro */
    /* ... mais variáveis disponíveis */
}

IMPORTANTE: Use formato HSL para manter consistência.

------------------------------------------
 NÚMEROS DE TELEFONE E WHATSAPP
------------------------------------------

Procure e substitua no index.html:

1. WhatsApp: 
   wa.me/351243046828
   (altere 351243046828 para o seu número)

2. Telefone:
   tel:+351243046828
   tel:+351914962991
   (altere para os seus números)

Formato do número WhatsApp:
- Código do país sem + (351 para Portugal)
- Número sem espaços ou traços
- Exemplo: 351912345678

------------------------------------------
 GOOGLE MAPS
------------------------------------------

Para alterar a localização do mapa:

1. Vá a Google Maps (maps.google.com)
2. Pesquise a sua morada
3. Clique em "Partilhar" → "Incorporar um mapa"
4. Copie o URL do iframe
5. Substitua o src="" do iframe no index.html

Localização atual:
Pizza Burger Almeirim, Avenida Dom João I, Almeirim

------------------------------------------
 ATUALIZAR O MENU
------------------------------------------

O menu está definido no objeto menuData no javascript.js.

Estrutura de um item:
{
    name: "Nome do Produto",
    description: "Descrição do produto",
    price: "9,90€",           // OU
    prices: [                  // Para pizzas com tamanhos
        { size: "P", price: "6,90€" },
        { size: "M", price: "8,90€" },
        { size: "F", price: "11,90€" }
    ],
    badge: "Popular"          // Opcional: "Popular", "Novo", "Promo"
}

Categorias disponíveis:
- pizzas
- hamburgueres
- kebab
- menus
- entradas
- massas
- saladas
- extras (bebidas)
- sobremesas

------------------------------------------
 ADICIONAR AVALIAÇÕES
------------------------------------------

Edite o array reviews no javascript.js:

const reviews = [
    { 
        text: "Texto da avaliação", 
        author: "Nome do Cliente", 
        rating: 5  // 1-5 estrelas
    },
    // Adicione mais avaliações...
];

------------------------------------------
 TESTES E DEBUGGING
------------------------------------------

Para testar o sistema de horário:

1. Abra a consola do browser (F12 → Console)
2. Execute: getBusinessHoursState()
3. Veja o estado atual do restaurante

Para simular feriado:
- Adicione a data atual ao FIXED_HOLIDAYS temporariamente

Para simular contagem regressiva:
- Altere o horário do computador para 23:00-23:30

------------------------------------------
 SUPORTE TÉCNICO
------------------------------------------

Website oficial: https://pizzaburguer.pt
Pizza Burguer Almeirim

Para questões técnicas sobre o tema:
- Verifique a consola do browser para erros
- Confirme que todos os ficheiros foram copiados
- Verifique os caminhos das imagens

------------------------------------------
 COMPATIBILIDADE
------------------------------------------

Browsers suportados:
✓ Chrome 90+
✓ Firefox 88+
✓ Safari 14+
✓ Edge 90+
✓ Opera 76+

Dispositivos:
✓ Desktop (1920px+)
✓ Laptop (1024px-1919px)
✓ Tablet (640px-1023px)
✓ Mobile (320px-639px)

------------------------------------------
 CHANGELOG
------------------------------------------

v3.1 (Janeiro 2026)
- Melhorias de acessibilidade (WCAG 2.1)
- Skip link para navegação
- ARIA labels completos
- Suporte para reduced motion
- Focus states melhorados
- Schema.org JSON-LD expandido
- Twitter Card meta tags
- Performance otimizada
- CSS Design System refinado
- JavaScript ES6+ strict mode
- Documentação expandida

v3.0 (2025)
- Sistema de feriados portugueses
- Contagem regressiva (23:00-23:30)
- Badge dinâmico no WhatsApp
- Botão oculto quando fechado

v2.0 (2024)
- Menu interativo com categorias
- Carousel de avaliações
- Indicador Aberto/Fechado

v1.0 (2023)
- Versão inicial

------------------------------------------
 LICENÇA
------------------------------------------

Este tema foi criado especificamente para o
Pizza Burguer Almeirim. Todos os direitos reservados.

© 2026 Pizza Burguer Almeirim

==========================================
