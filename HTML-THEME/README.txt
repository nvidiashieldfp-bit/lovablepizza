==========================================
 PIZZA BURGUER ALMEIRIM - TEMA HTML
==========================================

Website oficial: https://pizzaburguer.pt
Versão: 3.0
Data: 2025

------------------------------------------
 ESTRUTURA DE FICHEIROS
------------------------------------------

HTML-THEME/
├── index.html          - Página principal
├── style.css           - Estilos CSS
├── javascript.js       - Funcionalidades JavaScript
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
    ├── gallery-table.jpg
    ├── gallery-fries.jpg
    ├── gallery-pasta.jpg
    ├── gallery-dessert.jpg
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
 FUNCIONALIDADES v3.0
------------------------------------------

✓ Slider automático no hero (5 segundos)
✓ Animações de scroll reveal
✓ Menu com categorias interativas
✓ Secção de Menus Especiais destacada
✓ Carousel de avaliações
✓ Galeria de imagens com hover
✓ Botão WhatsApp fixo
✓ Design responsivo (mobile-first)
✓ Links de telefone clicáveis
✓ Favicon personalizado com logo

NOVAS FUNCIONALIDADES:
✓ Indicador Aberto/Fechado animado com ping
✓ Sistema de feriados portugueses automático
✓ Contagem regressiva das 23:00 às 23:30
✓ Badge "Fecha em X min" no botão WhatsApp
✓ Feriados móveis (Páscoa, Sexta-feira Santa, Corpo de Deus)
✓ Botão WhatsApp oculto quando fechado

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
- Sexta-feira Santa
- Páscoa
- Corpo de Deus

Para ADICIONAR ou REMOVER feriados, edite o array
FIXED_HOLIDAYS no ficheiro javascript.js:

const FIXED_HOLIDAYS = [
    { day: 1, month: 1, name: "Ano Novo", closed: true },
    // ... adicione ou remova conforme necessário
];

Para NÃO fechar num feriado, altere closed: false

------------------------------------------
 CONTAGEM REGRESSIVA
------------------------------------------

Das 23:00 às 23:30, o sistema mostra:
- "⏱️ Fecha em X min" no indicador de status
- Badge animado no botão WhatsApp flutuante
- Texto de urgência nos botões de encomenda

Isto incentiva os clientes a fazerem pedidos
antes do fecho das encomendas.

------------------------------------------
 INSTALAÇÃO
------------------------------------------

1. Copie todos os ficheiros para o seu servidor web

2. As imagens já estão na pasta "images"

3. Personalize o conteúdo em index.html se necessário:
   - Altere os números de telefone
   - Altere a morada
   - Altere os horários (no javascript.js)
   - Atualize o link do Google Maps

4. O favicon já está configurado usando o logo

5. Pronto! O site está funcional.

------------------------------------------
 PERSONALIZAÇÃO DO HORÁRIO
------------------------------------------

Para alterar o horário de funcionamento, edite
o objeto openingHours no ficheiro javascript.js:

const openingHours = {
    0: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Domingo
    1: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Segunda
    // ... continua para todos os dias (0=Domingo a 6=Sábado)
};

Formato: { start: HORA_INICIO, end: HORA_FIM }
Use decimais para minutos (23.5 = 23:30)

------------------------------------------
 DEPENDÊNCIAS EXTERNAS (CDN)
------------------------------------------

O tema utiliza recursos externos via CDN:

1. Google Fonts (Poppins)
   https://fonts.googleapis.com

2. Lucide Icons
   https://unpkg.com/lucide@latest

Não é necessário instalar nada localmente.

------------------------------------------
 PERSONALIZAÇÃO DE CORES
------------------------------------------

As cores podem ser alteradas no ficheiro style.css,
nas variáveis CSS (:root):

- --primary: cor principal (laranja #FF6600)
- --whatsapp: cor do botão WhatsApp (verde)
- --background: cor de fundo
- --foreground: cor do texto
- etc.

------------------------------------------
 NÚMEROS DE TELEFONE E WHATSAPP
------------------------------------------

Para alterar os números, procure no index.html:

1. WhatsApp: 
   wa.me/351243046828
   (altere 351243046828 para o seu número)

2. Telefone:
   tel:+351243046828
   (altere para o seu número)

Formato do número WhatsApp:
- Código do país sem + (351 para Portugal)
- Número sem espaços ou traços

------------------------------------------
 GOOGLE MAPS
------------------------------------------

Para alterar a localização do mapa:

1. Vá a Google Maps
2. Pesquise a morada
3. Clique em "Partilhar"
4. Selecione "Incorporar um mapa"
5. Copie o URL do iframe
6. Substitua o URL no index.html na secção location

------------------------------------------
 SUPORTE
------------------------------------------

Website oficial: https://pizzaburguer.pt
Pizza Burguer Almeirim

------------------------------------------
 LICENÇA
------------------------------------------

Este tema foi criado especificamente para o
Pizza Burguer Almeirim. Todos os direitos reservados.

==========================================
