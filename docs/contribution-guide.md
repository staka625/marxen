# Contribution Guide: Development Environment Setup

This guide helps you set up your local environment for contributing to this project.

---

## ✅ Prerequisites

Before starting, make sure the following tools are installed on your system:

### 1. Node.js & pnpm

- [Install Node.js](https://nodejs.org/)
- Install `pnpm` globally:
  ```bash
  npm install -g pnpm
  ```

### 2. Rust (for Tauri backend)

- [Install Rust (via rustup)](https://www.rust-lang.org/tools/install):
  ```bash
  curl https://sh.rustup.rs -sSf | sh
  ```
- After installation, ensure the toolchain is set up:
  ```bash
  rustup update
  rustup target add wasm32-unknown-unknown
  ```

### 3. Tauri CLI

- Install globally:
  ```bash
  cargo install tauri-cli
  ```

### 4. Platform-specific dependencies

#### macOS

```bash
brew install libwebkit2gtk-4.0 cmake
```

#### Windows

- Install [Visual Studio 2022](https://visualstudio.microsoft.com/) with:
  - "Desktop development with C++" workload
- Ensure you have [WebView2 runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

#### Linux (Debian/Ubuntu)

```bash
sudo apt update
sudo apt install -y libwebkit2gtk-4.0-dev build-essential curl wget file libssl-dev libsoup-3.0-dev
```

---

## 📦 Project Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-tauri-react-project.git
   cd your-tauri-react-project
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the app in development mode**
   ```bash
   pnpm tauri dev
   ```

---

## 🧪 Running Tests (if applicable)

No Tests have been created yet.

```bash
pnpm test
```

---

## 🧼 Lint & Format

```bash
pnpm lint
pnpm format
```

---

## 🔧 Useful Scripts

| Script           | Description                |
| ---------------- | -------------------------- |
| `pnpm tauri dev` | Start development server   |
| `pnpm build`     | Build for production       |
| `pnpm test`      | Run tests                  |
| `pnpm lint`      | Run linter                 |
| `pnpm format`    | Format code using Prettier |

---

## 🙌 Contribution Tips

- Create a new branch for each feature/bugfix.
- Follow conventional commit messages if the project uses them.
- Before submitting a PR, ensure all checks pass (build, lint, tests).
- Don't forget to check for existing issues or discussions.

---
