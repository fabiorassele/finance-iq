# FinTrack.ai

**FinTrack.ai** é uma aplicação web inovadora para o gerenciamento financeiro pessoal. Criado com tecnologias modernas e funcionalidades avançadas, o FinTrack.ai é projetado para ajudar você a organizar suas finanças, gerar relatórios detalhados com inteligência artificial e gerenciar assinaturas de maneira eficiente.

## Funcionalidades

- **Gerenciamento de Despesas e Receitas**: Registre, classifique e acompanhe transações financeiras.
- **Relatórios Inteligentes**: Integração com o ChatGPT para geração de relatórios financeiros personalizados e insights detalhados.
- **Autenticação Segura**: Implementação completa de autenticação e gerenciamento de usuários utilizando o Clerk.
- **Processamento de Pagamentos**: Integração com o Stripe para gerenciamento de pagamentos e planos premium.
- **Interface Responsiva e Elegante**: Utilização de componentes da biblioteca ShadCN para design moderno e consistente.
- **Análise de Dados**: Visualização interativa de despesas e receitas por meio de gráficos e dashboards.
- **Infraestrutura Sólida**: Gerenciamento de dados com Prisma e banco de dados NeonDB.

## Tecnologias Utilizadas

- **Frontend**: Next.js e Tailwind CSS para desenvolvimento responsivo e eficiente.
- **Backend**: Prisma como ORM para manipulação de banco de dados.
- **Autenticação**: Clerk para gerenciamento seguro de autenticação e usuários.
- **Pagamentos**: Stripe para processamento de pagamentos e planos de assinatura.
- **Relatórios com IA**: Integração com o OpenAI (ChatGPT) para geração de relatórios financeiros automatizados.
- **Banco de Dados**: NeonDB para armazenamento confiável e escalável.
- **TypeScript**: Garantia de segurança e tipagem estática no desenvolvimento.

## Configuração de Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente no arquivo `.env`:

```plaintext
# NeonDB
DATABASE_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe
STRIPE_PREMIUM_PLAN_PRICE_ID=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# OpenAI
OPENAI_API_KEY=
```

Essas variáveis são essenciais para que a aplicação funcione corretamente.

## Instalação e Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/fabiorassele/fintrack.ai.git
   ```

2. **Entre no diretório do projeto**:
   ```bash
   cd fintrack.ai
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente**:  
   Crie um arquivo `.env` na raiz do projeto e preencha os valores com as chaves apropriadas.

5. **Execute as migrações do banco de dados**:
   ```bash
   npx prisma migrate dev
   ```

6. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

   Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Deploy

A aplicação está disponível online no seguinte endereço:  
[https://fintrackai.fabiorassele.dev](https://fintrackai.fabiorassele.dev)

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade:
   ```bash
   git checkout -b minha-nova-feature
   ```
3. Faça suas alterações e crie commits:
   ```bash
   git commit -m "Descrição da minha funcionalidade"
   ```
4. Envie sua branch para o repositório remoto:
   ```bash
   git push origin minha-nova-feature
   ```
5. Abra um Pull Request detalhado descrevendo suas alterações.

## Licença

Este projeto está licenciado sob a [licença MIT](LICENSE). Sinta-se à vontade para usá-lo, modificá-lo e distribuí-lo, desde que os devidos créditos sejam mantidos.

## Contato

Para dúvidas ou sugestões, entre em contato com:

Fabio Rassele  
Email: [fabiorassele.dev@gmail.com](mailto:fabiorassele.dev@gmail.com)  
LinkedIn: [linkedin.com/in/fabiorassele](www.linkedin.com/in/fabiorassele)

---

**FinTrack.ai** — Simplificando o gerenciamento financeiro para todos.
