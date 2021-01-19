import {Movie, TV} from '~/@types';

export const mixArray = (data: Movie[] | TV[]) => {
  const newData = [...data];
  const mixed = newData.sort(() => 0.5 - Math.random());
  return mixed;
};
