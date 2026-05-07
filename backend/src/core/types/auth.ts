export type Role = 'platform_admin' | 'tenant_admin' | 'manager' | 'viewer';
export interface JwtPayload { sub: string; email: string; role: Role; tenantId: string; }
