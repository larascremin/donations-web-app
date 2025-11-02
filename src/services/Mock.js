import ong1 from "../assets/images/ong1.jpg";
import ong2 from "../assets/images/ong2.jpg";
import ong3 from "../assets/images/ong3.png";
import ong4 from "../assets/images/ong4.jpg";
import ong5 from "../assets/images/ong5.png";

export const mockUsers = {
  doadores: [
    {
      id: 1,
      nome: "Lara Mendes",
      email: "lscreminmendes@gmail.com",
      senha: "123456",
      role: "DOADOR",
      doacoesRealizadas: [
        { id: 1, confirmado: true },
        { id: 2, confirmado: false },
      ],
    },
    {
      id: 2,
      nome: "Daniel Arceno",
      email: "danielarceno@gmail.com",
      senha: "senha123",
      role: "DOADOR",
      doacoesRealizadas: [{ id: 9, confirmado: true }],
    },
  ],

  organizacoes: [
    {
      id: 1,
      nome: "Casa do Bem",
      role: "INSTITUIÇÃO",
      email: "contato@casadobem.org",
      telefone: "(11) 99888-1234",
      cidade: "São Paulo",
      rua: "Rua das Flores",
      bairro: "Centro",
      numero: 120,
      senha: "casabem2025",
      imagem: ong1,
      doacoesSolicitadas: [
        {
          id: 1,
          titulo: "Agasalhos de Inverno",
          descricao:
            "Com a chegada das baixas temperaturas, muitas famílias em situação de rua ou em extrema vulnerabilidade enfrentam o frio sem a proteção adequada. Estamos arrecadando agasalhos de inverno — como casacos, jaquetas, moletons, cachecóis, luvas e cobertores — em bom estado de conservação e limpos. As doações serão distribuídas por meio de nossas equipes de campo que atuam diretamente em abrigos e nas ruas da cidade, garantindo que o calor chegue a quem mais precisa. Sua contribuição pode fazer a diferença entre uma noite de frio e uma noite de esperança.",
          categoria: "VESTUARIO",
          pontoDeArrecadamento: "Panificadora Phillipe, Rua das Rosas, nº 253",
          dataCriacao: "12-08-2025",
        },
        {
          id: 2,
          titulo: "Kits de higiene pessoal",
          descricao:
            "A falta de acesso a itens básicos de higiene afeta diretamente a saúde e a dignidade de muitas pessoas em situação de vulnerabilidade. Estamos montando kits de higiene pessoal compostos por sabonete, escova e pasta de dente, shampoo, desodorante e papel higiênico. Esses kits são entregues regularmente a famílias em abrigos, comunidades carentes e pessoas em situação de rua. Toda doação, mesmo que pequena, contribui para melhorar as condições de vida e autoestima de quem mais precisa.",
          categoria: "HIGIENE",
          pontoDeArrecadamento:
            "Escola Comunitária São João, Rua Bela Vista, nº 89",
          dataCriacao: "05-09-2025",
        },
      ],
    },
    {
      id: 2,
      nome: "Alimente o Futuro",
      role: "INSTITUIÇÃO",
      email: "contato@alimenteofuturo.org",
      telefone: "(11) 97777-4567",
      cidade: "Campinas",
      rua: "Av. das Palmeiras",
      bairro: "Jardim Novo",
      numero: 342,
      senha: "futuro2025",
      imagem: ong2,
      doacoesSolicitadas: [
        {
          id: 3,
          titulo: "Cestas básicas",
          descricao:
            "Nosso projeto visa garantir que famílias em situação de vulnerabilidade social tenham acesso à alimentação de qualidade. Estamos arrecadando alimentos não perecíveis, como arroz, feijão, macarrão, óleo, açúcar, farinha, leite em pó e enlatados, para compor cestas básicas que serão distribuídas mensalmente. Cada cesta é preparada com atenção para atender às necessidades de uma família média por uma semana, ajudando a combater a fome e a insegurança alimentar que ainda afetam tantas pessoas",
          categoria: "ALIMENTO",
          pontoDeArrecadamento: "Supermercado BomPreço, Av. Brasil, nº 400",
          dataCriacao: "20-07-2025",
        },
      ],
    },
    {
      id: 3,
      nome: "Mãos Solidárias",
      role: "INSTITUIÇÃO",
      email: "contato@maossolidarias.org",
      telefone: "(48) 98877-2121",
      cidade: "Florianópolis",
      rua: "Rua da Esperança",
      bairro: "Trindade",
      numero: 58,
      senha: "maos2025",
      imagem: ong3,
      doacoesSolicitadas: [
        {
          id: 4,
          titulo: "Utensílios de cozinha",
          descricao:
            "Muitas famílias que recomeçam suas vidas após situações de perda, despejo ou calamidade pública carecem de utensílios domésticos básicos. Estamos arrecadando panelas, pratos, copos, talheres, frigideiras e outros itens de cozinha em bom estado, que serão destinados a essas famílias. As doações ajudam a restaurar a autonomia e o conforto do lar, permitindo que possam preparar suas próprias refeições com dignidade e segurança.",
          categoria: "MOBILIA",
          pontoDeArrecadamento: "Padaria Central, Rua das Oliveiras, nº 90",
          dataCriacao: "01-10-2025",
        },
        {
          id: 5,
          titulo: "Alimentos infantis",
          descricao:
            "Nosso programa de apoio à primeira infância busca garantir nutrição adequada a crianças de até dois anos de idade. Estamos arrecadando leite em pó, papinhas, cereais infantis e fórmulas lácteas, que serão distribuídos a famílias de baixa renda e creches comunitárias. Cada doação contribui para o desenvolvimento saudável das crianças e ajuda a reduzir a desnutrição infantil nas comunidades atendidas.",
          categoria: "ALIMENTO",
          pontoDeArrecadamento: "Igreja São Pedro, Av. Central, nº 33",
          dataCriacao: "22-09-2025",
        },
      ],
    },
    {
      id: 4,
      nome: "Rede da Esperança",
      role: "INSTITUIÇÃO",
      email: "contato@rededaesperanca.org",
      telefone: "(41) 96555-7788",
      cidade: "Curitiba",
      rua: "Rua das Violetas",
      bairro: "Boa Vista",
      numero: 204,
      senha: "esperanca2025",
      imagem: ong4,
      doacoesSolicitadas: [
        {
          id: 9,
          titulo: "Cobertores e mantas",
          descricao:
            "Durante o inverno rigoroso, centenas de pessoas em situação de rua enfrentam noites geladas sem qualquer proteção térmica. Por isso, estamos promovendo uma campanha de arrecadação de cobertores, mantas e edredons em bom estado. As doações são higienizadas e distribuídas por voluntários em diferentes pontos da cidade, especialmente em locais com grande concentração de pessoas desabrigadas. Junte-se a nós e ajude a aquecer o coração e o corpo de quem mais precisa.",
          categoria: "VESTUARIO",
          pontoDeArrecadamento: "Mercado Central, Rua das Araucárias, nº 80",
          dataCriacao: "15-08-2025",
        },
      ],
    },
    {
      id: 5,
      nome: "Lar da Vida",
      role: "INSTITUIÇÃO",
      email: "contato@lardavida.org",
      telefone: "(21) 98123-4567",
      cidade: "Rio de Janeiro",
      rua: "Rua da Luz",
      bairro: "Tijuca",
      numero: 450,
      senha: "vida2025",
      imagem: ong5,
      doacoesSolicitadas: [
        {
          id: 10,
          titulo: "Móveis usados",
          descricao:
            "O Lar da Vida apoia famílias reassentadas que perderam seus lares em enchentes e deslizamentos. Para ajudar na reconstrução de suas moradias, estamos recebendo doações de móveis usados em bom estado, como camas, colchões, sofás, mesas, cadeiras e guarda-roupas. Cada item arrecadado é cuidadosamente revisado e destinado a famílias previamente cadastradas, ajudando-as a recomeçar com dignidade e conforto.",
          categoria: "MOBILIA",
          pontoDeArrecadamento: "Loja Solidária, Rua Alegre, nº 12",
          dataCriacao: "10-09-2025",
        },
      ],
    },
  ],
};
