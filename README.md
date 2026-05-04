# AMI SOLAR CRM — prêt à déployer

## Déploiement Vercel

1. Va sur https://vercel.com
2. Connecte-toi
3. Clique "Add New Project"
4. Upload ce dossier
5. Clique Deploy
6. Tu obtiens une URL publique

## Connexion Supabase

1. Va sur https://supabase.com
2. Crée un nouveau projet
3. Va dans Settings > API
4. Copie :
   - Project URL
   - anon public key
5. Colle-les dans `supabase.js`

## Tables Supabase conseillées

Table `leads` :
- id uuid primary key
- name text
- city text
- power text
- source text
- status text
- created_at timestamp

Table `clients` :
- id uuid primary key
- name text
- city text
- phone text
- email text
- installation text
- amount_ttc numeric
- status text
- created_at timestamp

Table `quotes` :
- id uuid primary key
- client_id uuid
- kwc numeric
- price_ttc numeric
- pose_cost numeric
- material_cost numeric
- commission numeric
- margin numeric
- status text
- created_at timestamp
