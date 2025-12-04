import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private supabase: SupabaseService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: async (data) => {
          // Only log mutations (POST, PUT, DELETE, PATCH)
          if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
            try {
              await this.supabase.getClient().from('audit_logs').insert({
                user_id: user?.id || null,
                action: `${method} ${url}`,
                entity_type: this.getEntityType(url),
                entity_id: data?.id || null,
                new_values: data || {},
                ip_address: ip,
                user_agent: userAgent,
                status: 'success',
                created_at: new Date().toISOString(),
              });
            } catch (error) {
              console.error('Failed to log audit:', error);
            }
          }
        },
        error: async (error) => {
          try {
            await this.supabase.getClient().from('audit_logs').insert({
              user_id: user?.id || null,
              action: `${method} ${url}`,
              entity_type: this.getEntityType(url),
              status: 'error',
              error_message: error.message,
              ip_address: ip,
              user_agent: userAgent,
              created_at: new Date().toISOString(),
            });
          } catch (logError) {
            console.error('Failed to log audit error:', logError);
          }
        },
      }),
    );
  }

  private getEntityType(url: string): string {
    if (url.includes('/users')) return 'user';
    if (url.includes('/documents')) return 'document';
    if (url.includes('/grammar')) return 'grammar_check';
    if (url.includes('/billing')) return 'billing';
    return 'unknown';
  }
}

