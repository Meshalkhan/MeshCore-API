export class AnalyticsService {
  summary(_tenantId: string) {
    return {
      tenantId: _tenantId,
      cards: [
        { metric: 'activeUsers', value: 42 },
        { metric: 'requests24h', value: 18420 },
        { metric: 'errorRate', value: '0.4%' },
        { metric: 'apiKeys', value: 5 }
      ]
    };
  }
}
