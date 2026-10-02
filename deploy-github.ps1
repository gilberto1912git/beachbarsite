# ==============================================================================
# Script de Conexão e Publicação no GitHub - Bene Beach Bar
# Repositório: https://github.com/gilberto1912git/beachbarsite.git
# ==============================================================================

[CmdletBinding()]
param (
    [string]$Branch = "main",
    [string]$RemoteUrl = "https://github.com/gilberto1912git/beachbarsite.git"
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🌊 Bene Beach Bar - Conexão e Sincronização com o GitHub" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Verifica ou inicializa repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "📦 Inicializando repositório Git local..." -ForegroundColor Green
    git init
} else {
    Write-Host "✅ Repositório Git já inicializado localmente." -ForegroundColor Green
}

# 2. Configura identidade do autor
git config user.name "gilberto1912git"
git config user.email "gilberto1912git@users.noreply.github.com"

# 3. Configura a branch principal
Write-Host "🌿 Ajustando branch principal para '$Branch'..." -ForegroundColor Green
git branch -M $Branch

# 4. Configura ou atualiza o remote origin
$existingRemote = git remote get-url origin 2>$null
if ($null -eq $existingRemote -or $existingRemote -eq "") {
    Write-Host "🔗 Conectando ao repositório remoto: $RemoteUrl" -ForegroundColor Green
    git remote add origin $RemoteUrl
} else {
    Write-Host "🔄 Atualizando URL do repositório remoto para: $RemoteUrl" -ForegroundColor Green
    git remote set-url origin $RemoteUrl
}

# 5. Adiciona arquivos e verifica mudanças
Write-Host "📑 Preparando arquivos com .gitignore..." -ForegroundColor Green
git add .

$status = git status --porcelain
if ($status) {
    Write-Host "💾 Criando commit com as alterações..." -ForegroundColor Green
    git commit -m "feat: site oficial Bene Beach Bar - visual mar & pôr do sol, animações estabilizadas e integração WhatsApp"
} else {
    Write-Host "ℹ️ Não há novas alterações para commit." -ForegroundColor Cyan
}

# 6. Realiza o push para o GitHub
Write-Host "🚀 Enviando arquivos para o GitHub ($Branch)..." -ForegroundColor Yellow
git push -u origin $Branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Sucesso! Repositório publicado em: $RemoteUrl" -ForegroundColor Green
} else {
    Write-Host "⚠️ Erro ao realizar o push. Verifique suas credenciais de autenticação no GitHub." -ForegroundColor Red
}
