import type { RootState } from "@redux/stores/all-reducer";
import type { AppDispatch } from "@redux/stores/store";
import {
  createListenerMiddleware,
  type TypedStartListening,
} from "@reduxjs/toolkit";

export const listenerMiddleware = createListenerMiddleware();
const startAppListening =
  listenerMiddleware.startListening as TypedStartListening<
    RootState,
    AppDispatch
  >;
type StartAppListening = typeof startAppListening;

export const takeLatestListeners =
  (withLoading?: boolean): StartAppListening =>
  // @ts-ignore
  (startListeningOption: any) => {
    return startAppListening({
      ...startListeningOption,
      effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        await listenerApi.delay(15);
        if (withLoading) {
          // listenerApi.dispatch(appActions.onStartProcess());
        }
        await startListeningOption.effect(action, listenerApi);
        if (withLoading) {
          // listenerApi.dispatch(appActions.onEndProcess());
        }
      },
    });
  };
export const takeLeadingListeners =
  (withLoading?: boolean): StartAppListening =>
  // @ts-ignore
  (startListeningOption: any) => {
    return startAppListening({
      ...startListeningOption,
      effect: async (action, listenerApi) => {
        listenerApi.unsubscribe();
        if (withLoading) {
          // listenerApi.dispatch(appActions.onStartProcess());
        }
        await startListeningOption.effect(action, listenerApi);
        if (withLoading) {
          //listenerApi.dispatch(appActions.onEndProcess());
        }
        listenerApi.subscribe();
      },
    });
  };

export const debounceListeners =
  (msDuration: number, withLoading?: boolean): StartAppListening =>
  // @ts-ignore
  (startListeningOption: any) => {
    return startAppListening({
      ...startListeningOption,
      effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        await listenerApi.delay(msDuration);
        if (withLoading) {
          // listenerApi.dispatch(appActions.onStartProcess());
        }
        await startListeningOption.effect(action, listenerApi);
        if (withLoading) {
          // listenerApi.dispatch(appActions.onEndProcess());
        }
      },
    });
  };

export const throttleListeners =
  (msDuration: number, withLoading?: boolean): StartAppListening =>
  // @ts-ignore
  (startListeningOption: any) => {
    return startAppListening({
      ...startListeningOption,
      effect: async (action, listenerApi) => {
        listenerApi.unsubscribe();
        if (withLoading) {
          // listenerApi.dispatch(appActions.onStartProcess());
        }
        await startListeningOption.effect(action, listenerApi);
        if (withLoading) {
          // listenerApi.dispatch(appActions.onEndProcess());
        }
        await listenerApi.delay(msDuration);
        listenerApi.subscribe();
      },
    });
  };
