# 🏥 Sistema de Consultas Médicas

Um aplicativo móvel desenvolvido em React Native com Expo para gerenciamento de consultas médicas, permitindo agendamento, acompanhamento e administração de consultas entre pacientes, médicos e administradores.

## 📱 Sobre o Projeto

O Sistema de Consultas Médicas é uma aplicação completa que oferece uma interface intuitiva para:

- **Pacientes**: Agendar consultas, visualizar histórico e gerenciar perfil
- **Médicos**: Visualizar agenda, gerenciar consultas e atualizar perfil profissional  
- **Administradores**: Gerenciar usuários, supervisionar sistema e relatórios

### 🎯 Funcionalidades Principais

- ✅ **Autenticação Multi-Perfil**: Login diferenciado para pacientes, médicos e administradores
- ✅ **Agendamento de Consultas**: Interface intuitiva para marcar consultas com médicos disponíveis
- ✅ **Gerenciamento de Perfis**: Visualização e edição de informações pessoais e profissionais
- ✅ **Dashboard Personalizado**: Telas específicas para cada tipo de usuário
- ✅ **Sistema de Navegação**: Navegação fluida entre telas com React Navigation
- ✅ **Identidade Visual Médica**: Marca **MedConnect** com paleta de cores e tipografia profissional

### 🏗️ Arquitetura Modular

O projeto segue um padrão modular avançado para melhor organização e manutenibilidade:

```text
src/screens/[NomeDaTela]/
├── index.tsx           # Componente principal
├── styles.ts          # Estilos organizados
├── components/        # Componentes específicos
├── hooks/            # Hooks customizados
├── services/         # Lógica de negócio
└── models/           # Tipos e interfaces
```

**Telas Refatoradas (Padrão Modular):**

- `CreateAppointmentScreen/` - Sistema de agendamento modular
- `ProfileScreen/` - Gerenciamento de perfil componentizado  
- `LoginScreen/` - Autenticação com validações separadas

## 👥 Integrantes

| Nome | RM |
|------|-----|
| Leonardo de Oliveira Ruiz | RM98901 |
| Guilherme Alves | RM550433 |
| Bruno Venturi Lopes Vieira | RM99431 |
| João Gabriel Dias | RM99092 |
| Ricardo Mattos | RM95906 |

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento e build
- **TypeScript** - Tipagem estática para JavaScript
- **React Navigation** - Navegação entre telas
- **Styled Components** - Estilização CSS-in-JS
- **AsyncStorage** - Persistência local de dados
- **React Native Elements** - Biblioteca de componentes UI

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Expo CLI

### Passos para execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/leooruiz/consultas_medicas.git
   cd consultas_medicas
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o projeto**

   ```bash
   npx expo start
   ```

4. **Abra no dispositivo**
   - Escaneie o QR Code com o app Expo Go (Android/iOS)
   - Ou use um emulador Android/iOS
   - Ou execute no navegador web

## 🔐 Credenciais de Teste

### Administrador

- **Email**: `admin@example.com`
- **Senha**: `123456`

### Médicos

- **Dr. João Silva**: `joao@example.com` / `123456`
- **Dra. Maria Santos**: `maria@example.com` / `123456`  
- **Dr. Pedro Oliveira**: `pedro@example.com` / `123456`

### Pacientes

Crie uma conta através da tela de registro ou entre em contato com um administrador.

## 📁 Estrutura do Projeto

```text
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # Context API (AuthContext)
├── navigation/         # Configuração de rotas
├── screens/           # Telas da aplicação
│   ├── LoginScreen/           # 🔧 Modular
│   ├── ProfileScreen/         # 🔧 Modular  
│   ├── CreateAppointmentScreen/ # 🔧 Modular
│   └── [outras-telas].tsx     # Formato tradicional
├── services/          # Serviços e APIs
├── styles/           # Temas e estilos globais
└── types/           # Definições TypeScript
```

## 🎨 Identidade Visual e Design System

### 🏥 **Marca: MedConnect**

- **Nome**: MedConnect - "Conectando cuidados, transformando vidas"
- **Logotipo**: Cruz médica estilizada com círculo de proteção
- **Filosofia**: Confiança, profissionalismo e cuidado humanizado

### 🎨 **Paleta de Cores Médica**

- **Azul Médico Primário**: `#1E88E5` - Confiança e profissionalismo
- **Verde Saúde Secundário**: `#43A047` - Vida e bem-estar  
- **Azul Turquesa Accent**: `#00ACC1` - Clareza e higiene
- **Neutros Profissionais**: Escala de cinzas para legibilidade

### ✍️ **Tipografia Hierárquica**

- **Família**: System (Roboto/SF Pro)
- **Pesos**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Contextos Médicos**: Estilos específicos para nomes de pacientes, médicos e especialidades

### 📏 **Sistema de Espaçamento**

- **Escala 8pt**: 4px, 8px, 16px, 24px, 32px, 48px
- **Componentes**: Cards, botões e inputs com bordas arredondadas
- **Sombras**: Sistema de elevação para hierarquia visual

## 🔄 Funcionalidades Futuras

- [ ] Notificações push para lembretes
- [ ] Integração com calendário do dispositivo
- [ ] Chat entre médico e paciente
- [ ] Histórico médico completo
- [ ] Integração com sistemas hospitalares
- [ ] Telemedicina (consultas por vídeo)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de desenvolvimento mobile.
