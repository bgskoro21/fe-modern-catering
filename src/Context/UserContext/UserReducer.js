export const initialState = {
  user: {},
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "REMOVE_USER":
      return { user: {} };
    case "UPDATE_USER":
      return { user: { ...state.user, name: action.payload.name, no_hp: action.payload.no_hp, jenis_kelamin: action.payload.jenis_kelamin, tanggal_lahir: action.payload.tanggal_lahir, profile_picture: action.payload.profile_picture } };
    default:
      return state;
  }
};
