import type { NowData } from "@/hooks/use-api";
import { formatShortDate } from "@/utils/time";

type MainPageNowCardProps = {
  item: NowData;
  isAuth: boolean;
  onEdit: (item: NowData) => void;
  onDelete: (item: NowData) => void;
};

export const MainPageNowCard = ({
  item,
  isAuth,
  onEdit,
  onDelete,
}: MainPageNowCardProps) => {
  return (
    <article className="cell c-3 now-item">
      <time dateTime={item.created_at}>{formatShortDate(item.created_at)}</time>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      {isAuth && (
        <div className="item-actions">
          <button
            type="button"
            className="btn o sm"
            aria-label={`Edit ${item.title}`}
            onClick={() => onEdit(item)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn o sm"
            aria-label={`Delete ${item.title}`}
            onClick={() => onDelete(item)}
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
};
