import { entity, persistence } from "simpler-state";

const userEntity = entity(null, [persistence('user', {
  storage: 'session'
})]);

export const getUser = () => userEntity.get();

export const updateUser = (user) => userEntity.set(user);