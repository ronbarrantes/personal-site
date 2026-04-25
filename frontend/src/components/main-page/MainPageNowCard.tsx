import { Icon } from "@/components/icon";
import type { NowData } from "@/hooks/use-api";
import { formatDate } from "@/utils/time";

type MainPageNowCardProps = {
  item: NowData;
  isAuth: boolean;
  onDelete: (item: NowData) => void;
};

export const MainPageNowCard = ({
  item,
  isAuth,
  onDelete,
}: MainPageNowCardProps) => {
  return (
    <div className="box p-4">
      <div
        className="tag mb-2"
        style={{ background: "var(--accent)", color: "var(--alt)" }}
      >
        ///
      </div>
      {isAuth && (
        <button
          type="button"
          aria-label={`Delete ${item.title}`}
          className="tag absolute top-2 right-2 cursor-pointer"
          style={{ background: "var(--ink)", color: "var(--bg)" }}
          onClick={() => onDelete(item)}
        >
          ×
        </button>
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
