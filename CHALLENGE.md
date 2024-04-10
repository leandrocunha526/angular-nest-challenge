# Descrição do desafio

## Requisitos Funcionais

- [x] Os usuários devem poder autenticar-se na aplicação para acessar as funcionalidades de gestão de dispositivos, a API ficará responsável por realizar a associação de um dispositivo ao usuário logado, criando o conceito de “proprietário”.
- [x] Os usuários devem ser capazes de cadastrar novos dispositivos IoT na plataforma. Deve ser possível visualizar uma lista de todos os dispositivos cadastrados na plataforma, incluindo a descrição e o fabricante do dispositivo.
- [x] Os usuários proprietários devem poder editar as informações dos dispositivos.
- [x] Deve ser possível aos usuários proprietários excluir dispositivos da plataforma.
- [x] A aplicação deve ser responsiva e funcionar adequadamente em diferentes dispositivos e tamanhos de tela, garantindo uma experiência consistente para os usuários em desktops, tablets e smartphones.
​

## Requisitos de Design

- [x] A interface do usuário deve ser intuitiva e fácil de usar, com navegação clara e fluxos de trabalho lógicos para as funcionalidades de gestão de dispositivos.
- [x] Utilize um design limpo e moderno, com uso adequado de cores, tipografia e espaçamento para criar uma experiência visualmente atraente e profissional.
- [x] Forneça feedback visual claro para as ações dos usuários, como confirmação de sucesso após o cadastro ou atualização de um dispositivo, ou mensagens de erro em caso de falha.
- [x] Utilize adequadamente os princípios de gerenciamento de estado no Angular para manter a consistência e a integridade dos dados da aplicação.
- [x] Implemente medidas de segurança adequadas para proteger os dados dos usuários e garantir a integridade das operações de gestão de dispositivos.

## Considerações

- Criado um template simples, intuitivo com alerts coloridos e funcional pensando em responsividade.
- Modificando framework já existente para agilizar o desenvolvimento da aplicação deixando com visual mais moderno.
- Desenvolvido pensando em segurança e confidencialidade, todos os dados não são vistos por outros usuários e há segurança entre rotas. Quem faz o trabalho de verificação do usuário é o backend desenvolvido.
- Há manipulação de erros e validação do que é inserido em formulários.
- Introduzido carregamento de página.
- Introduzido ORM e migrações para banco de dados relacionais.
- Auth guard para Angular e JWT Guard para Nest, Auth Guard para Angular e o JWT Guard para Nest são ambos mecanismos de segurança utilizados em aplicações web para proteger rotas e recursos de acesso não autorizado. O Auth Guard para Angular é uma funcionalidade que permite controlar o acesso às rotas da aplicação no lado do cliente. Ele verifica se o usuário possui as credenciais necessárias para acessar determinada rota e, caso contrário, redireciona o usuário para outra página, como uma página de login.
- Conceito de DTO e entidade:
1. Entidade:
No contexto de desenvolvimento de software, uma entidade é uma representação de um objeto do mundo real que é persistido em um banco de dados ou manipulado dentro de uma aplicação.
Uma entidade geralmente corresponde a uma tabela em um banco de dados relacional. Ela contém atributos (campos) que descrevem as características do objeto e métodos que definem seu comportamento.
Por exemplo, em um sistema de gerenciamento de alunos, uma entidade poderia ser "Aluno", com atributos como nome, idade, e curso.
2. DTO (Data Transfer Object):
Um DTO é um padrão de projeto usado para transferir dados entre subsistemas de um aplicativo.
Em vez de transferir entidades diretamente entre camadas ou componentes da aplicação, é comum usar DTOs para encapsular apenas os dados necessários para uma operação específica.
DTOs são frequentemente usados em arquiteturas em camadas, como no padrão MVC (Model-View-Controller) ou em aplicações cliente-servidor, para separar a lógica de negócios da lógica de apresentação e comunicação.
Por exemplo, ao enviar dados de um formulário HTML para o servidor, em vez de enviar a entidade diretamente, você pode criar um DTO específico para os dados do formulário e enviá-lo para o servidor. Isso permite maior flexibilidade e controle sobre quais dados estão sendo transferidos.

- A segurança foi reforçada em buscas que faz filtro por id de usuário.

