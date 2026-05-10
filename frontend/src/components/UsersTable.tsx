import { EmptyState } from './ui/EmptyState';

export const UsersTable = ({ users }: { users: Array<{ id: string; email: string; role: string }> }) => (
  <section className="card panel" id="users">
    <header className="panel-header">
      <h2>Users</h2>
    </header>
    {users.length === 0 ? (
      <EmptyState title="No users in this tenant." />
    ) : (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <span className="badge">{user.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);
