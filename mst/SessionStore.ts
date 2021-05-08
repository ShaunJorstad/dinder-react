import { types } from "mobx-state-tree";

export const SessionModel = types
  .model({
    distance: types.number,
    price: types.number,
    timeLimit: types.number,
    code: types.string,
  })
  .actions((store) => ({
    setDistance(val: number) {
      store.distance = val;
    },
    setPrice(val: number) {
      store.price = val;
    },
    setTimeLimit(val: number) {
      store.timeLimit = val;
    },
    setCode(val: string) {
      store.code = val;
    },
  }));

let _Session: any;
export const useSession = () => {
  if (!_Session) {
    _Session = SessionModel.create({
      distance: 1,
      price: 1,
      timeLimit: 5,
      code: "00000",
    });
  }
  return _Session;
};
