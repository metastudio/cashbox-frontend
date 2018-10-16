import { IAppState } from './types';

function selectIsSessionLoaded(state: { app: IAppState }): boolean {
  return state.app.isSessionLoaded;
}

export { selectIsSessionLoaded };
