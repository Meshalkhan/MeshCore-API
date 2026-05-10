import { EmptyState } from './ui/EmptyState';

export const ApiKeysTable = ({ keys }: { keys: Array<{ id: string; name: string; key_prefix: string }> }) => (
  <section className="card panel" id="api-keys">
    <header className="panel-header">
      <h2>API keys</h2>
    </header>
    {keys.length === 0 ? (
      <EmptyState title="No API keys." />
    ) : (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Prefix</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key.id}>
                <td>{key.name}</td>
                <td>
                  <code className="mono">{key.key_prefix}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);
