import { CompletedStatus } from '../../types/Status';

type Props = {
  query: string;
  changeStatus: (status: CompletedStatus) => void;
  changeQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  changeQuery,
  changeStatus,
}) => {
  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    changeStatus(event.target.value as CompletedStatus);
  }

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    changeQuery(event.target.value);
  }

  function handleClearQuery() {
    changeQuery('');
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
            <option value={CompletedStatus.all}>All</option>
            <option value={CompletedStatus.active}>Active</option>
            <option value={CompletedStatus.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleSearchInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
