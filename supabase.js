// AMI SOLAR CRM — connexion Supabase
// 1. Crée ton projet sur https://supabase.com
// 2. Va dans Settings > API
// 3. Remplace les deux valeurs ci-dessous

const SUPABASE_URL = "https://TON-PROJET.supabase.co";
const SUPABASE_ANON_KEY = "TA_CLE_ANON_PUBLIC";

// Décommente quand tu as mis tes vraies clés Supabase :
// const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exemple de fonction prête pour plus tard :
// async function saveLeadToSupabase(lead) {
//   const { data, error } = await supabaseClient.from("leads").insert([lead]);
//   if (error) console.error(error);
//   return data;
// }
