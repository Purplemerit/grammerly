// Database types will be generated from Supabase schema
// This is a placeholder - will be updated after database setup

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string | null;
        };
      };
      // More tables will be added after schema setup
    };
  };
};

