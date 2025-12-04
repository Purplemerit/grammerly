import { Module } from '@nestjs/common';
import { GrammarController } from './grammar.controller';
import { GrammarService } from './grammar.service';
import { UsersModule } from '../users/users.module';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [UsersModule, SupabaseModule],
  controllers: [GrammarController],
  providers: [GrammarService],
  exports: [GrammarService],
})
export class GrammarModule {}

