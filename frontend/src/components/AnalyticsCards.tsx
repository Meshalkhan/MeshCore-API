const metricTitle: Record<string, string> = {
  activeUsers: 'Active users',
  requests24h: 'Requests (24h)',
  errorRate: 'Error rate',
  apiKeys: 'API keys'
};

export const AnalyticsCards = ({ cards }: { cards: Array<{ metric: string; value: string | number }> }) => (
  <section className="cards analytics-grid" id="analytics" aria-label="Summary metrics">
    {cards.map((card) => (
      <article key={card.metric} className="card metric-card">
        <p className="metric-label">{metricTitle[card.metric] ?? card.metric}</p>
        <p className="metric-value">{card.value}</p>
      </article>
    ))}
  </section>
);
