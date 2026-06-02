import { Icon } from "@/components/icon";
import type { NowData } from "@/hooks/use-api";
import { formatDate } from "@/utils/time";

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
    <div className="box p-4">
      <div
        className="tag mb-2"
        style={{ background: "var(--accent)", color: "var(--alt)" }}
      >
        {"///"}
      </div>
      {isAuth && (
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <button
            type="button"
            aria-label={`Edit ${item.title}`}
            className="tag cursor-pointer"
            style={{ background: "var(--accent)", color: "var(--alt)" }}
            onClick={() => onEdit(item)}
          >
            EDIT
          </button>
          <button
            type="button"
            aria-label={`Delete ${item.title}`}
            className="tag cursor-pointer"
            style={{ background: "var(--ink)", color: "var(--bg)" }}
            onClick={() => onDelete(item)}
          >
            ×
          </button>
        </div>
      )}
      <h3 className="mb-2 text-2xl">{item.title}</h3>
      <p className="mb-3 text-sm">{item.desc}</p>
      <div className="text-[10px] uppercase opacity-70">
        <Icon name="clock" className="mr-1 inline size-3" />
        {formatDate(item.created_at)}
      </div>
    </div>
  );
};
