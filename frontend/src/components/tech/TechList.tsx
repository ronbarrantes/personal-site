import { Icon } from "@/components/icon";
import { getIconLabel } from "@/components/icon/icon-labels";
import type { IconsLisType } from "@/components/icon/icons-list-files";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TechListProps = {
  tools: IconsLisType[];
  label?: string;
};

// Square tech badges. The name is always available to screen readers and
// shows in a tooltip on hover (not focusable, to avoid dozens of tab stops).
export const TechList = ({ tools, label = "Tools used" }: TechListProps) => {
  return (
    <ul className="tech-list" aria-label={label}>
      {tools.map((tool) => {
        const name = getIconLabel(tool);

        return (
          <li key={tool} className="tech">
            <Tooltip>
              <TooltipTrigger asChild>
                <span role="img" aria-label={name}>
                  <Icon name={tool} />
                </span>
              </TooltipTrigger>
              <TooltipContent>{name}</TooltipContent>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
};
