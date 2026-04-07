export interface ModalRegistryMap {
  profileDelete: {
    email: string;
    userId: string;
  };
}

export type ModalKey = Extract<keyof ModalRegistryMap, string>;
