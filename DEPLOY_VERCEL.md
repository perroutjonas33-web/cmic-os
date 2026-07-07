# 🚀 Deploy no Vercel - 3 Passos

Seu sistema está pronto para usar! Faça isso agora:

---

## **PASSO 1: Criar Repositório no GitHub (1 min)**

1. Acesse: https://github.com/new
2. Nome do repositório: `cmic-os-system`
3. Descrição: `CMIC OS System - Ordens de Serviço`
4. Clique em **"Create repository"**

---

## **PASSO 2: Fazer Push do Código (2 min)**

Abra **PowerShell** ou **Terminal** e execute:

```powershell
cd "C:\Users\perro\Desktop\cmic-os-system"

git remote add origin https://github.com/SEU_USUARIO/cmic-os-system.git
git branch -M main
git push -u origin main
```

✅ Seu código está no GitHub!

---

## **PASSO 3: Deploy no Vercel (2 min)**

1. Acesse: https://vercel.com
2. Clique em **"Sign up"** (use GitHub)
3. Clique em **"Import Project"**
4. Selecione **"cmic-os-system"**
5. Clique em **"Continue"**

### Adicionar Variáveis de Ambiente:

6. Em **"Environment Variables"**, adicione estas 4:

```
SUPABASE_URL = https://rkawksswxwfuodtvrkmj.supabase.co

SUPABASE_ANON_KEY = sb_publishable_mwDKY4srtO8eoj8d03MHgw_bzEX-IA9

SUPABASE_SERVICE_KEY = seu_service_key_do_supabase_aqui

JWT_SECRET = cmic-secret-key-production-2024
```

7. Clique em **"Deploy"**

⏳ Aguarde 2-3 minutos...

---

## **✅ PRONTO!**

Quando terminar, Vercel vai te dar um link tipo:

```
https://cmic-os-system-seu-usuario.vercel.app
```

**Compartilhe esse link com sua empresa!** 🎉

---

## **Próximas Etapas (Opcional)**

- Criar primeiro usuário admin
- Integrar seu HTML original (index.html → dashboard.html)
- Customizações adicionais

---

**Qual é seu usuário do GitHub?** Me passa que confirmo tudo pronto!
