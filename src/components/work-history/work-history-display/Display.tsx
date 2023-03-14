import { ReactNode, useState } from 'react';

import { IWorkExperience } from '@/types';

import { Item } from './Item';
import { Nav } from './Nav';
import { WorkHistoryContext } from './WorkHistoryContext';

export const Display = ({
  items,
  children,
}: {
  items: IWorkExperience[];
  children: ReactNode;
}) => {
  const [workHistory, setWorkHistory] = useState<IWorkExperience[]>(items);
  const [index, setIndex] = useState<number>(0);

  return (
    <WorkHistoryContext.Provider
      value={{
        workHistory,
        setWorkHistory,
        index,
        setIndex,
      }}
    >
      {children}
    </WorkHistoryContext.Provider>
  );
};

Display.Nav = Nav;
Display.Item = Item;
