import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qwcmbxmfluznhrqitqlp.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_F7JBtDbCG7OVxw8DvEPozg_RS36MJGv",
);
