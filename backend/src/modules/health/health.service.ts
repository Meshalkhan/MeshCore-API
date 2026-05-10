export class HealthService {
  getStatus() {
    return { status: 'ok' as const, service: 'meshcore-api' };
  }
}
