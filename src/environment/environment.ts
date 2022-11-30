import {EnvironmentDefinition} from "../app/shared/types/environtment.interface";

const apiHost = 'https://localhost:7260';

export const environment: EnvironmentDefinition = {
  production: false,
  apiURL: apiHost
};
