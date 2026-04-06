export interface ModalRegistryMap {
  profileDelete: {
    email: string;
  };
}

export type ModalKey = Extract<keyof ModalRegistryMap, string>;
