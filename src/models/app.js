const DEFAULT_VIEWPORT = 'iPad Pro landscape';

const INITIAL_STATE = {
  isLoading: false,
  isReady: false,
  hasError: false,
  url: '',
  viewport: DEFAULT_VIEWPORT,
  isMobile: false,
};

export default {
  state: INITIAL_STATE,
  reducers: {
    setImageError(state) {
      return { ...state, hasError: true, isLoading: false };
    },

    setImageLoaded(state) {
      return { ...state, isReady: true, isLoading: false, hasError: false };
    },

    updateUrl(state, url) {
      return { ...state, url };
    },

    toggleMobile(state) {
      return { ...state, isMobile: !state.isMobile };
    },

    setLoading(state) {
      return { ...state, isLoading: true, hasError: false };
    },

    clear(state) {
      return { ...INITIAL_STATE, hasError: state.hasError };
    },
  },
};
