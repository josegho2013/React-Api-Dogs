import {
  GET_All_DOGS,
  GET_DOGS_API,
  GET_DOGS_DB,
  GET_TEMPERAMENT,
  ADD_DOGS,
  SEARCH_BY_ID,
  SEARCH_BY_NAME,
  DOG_DELETE,
  FILTER_BY_TEMPERAMENT,
  GET_ORDER_ASC,
  GET_ORDER_DESC,
  GET_WEIGH_LIGHTER,
  GET_WEIGH_HIGHEST,
  GET_HEIGHT_LIGHTER,
  GET_HEIGHT_HIGHEST,
} from "../actions/actions";

const initialState = {
  dogsAll: [],
  addDogs: [],
  temperament: [],
  searchById: [],
  requestDogs: [],
  dogDelete: false,
  notFound: false,
  setPage: Number,
};
function RootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_All_DOGS:
      return {
        ...state,
        dogsAll: action.payload,
        requestDogs: action.payload,
      };
    case GET_DOGS_API:
    case GET_DOGS_DB:
      return {
        ...state,
        requestDogs: action.payload,
      };

    case GET_TEMPERAMENT:
      const temp = action.payload.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });
      return {
        ...state,
        temperament: temp,
      };
    case ADD_DOGS:
      return {
        ...state,
        addDogs: action.payload,
      };
    case SEARCH_BY_ID:
      return {
        ...state,
        searchById: action.payload,
      };
    case DOG_DELETE:
      return {
        ...state,
        requestDogs: state.dogsAll.filter((d) => d.id !== action.payload),
      };

    case SEARCH_BY_NAME:
      const imageUrl = state.dogsAll.filter((apiId) => {
        let element;
        for (let i = 0; i < action.payload.length; i++) {
          if (apiId.image.id === action.payload[i]) {
            return (element = apiId);
          }
        }
        return element;
      });

      return {
        ...state,
        requestDogs: imageUrl.length > 0 ? imageUrl : action.payload,
        notFound: imageUrl.length > 0 ? false : true,
        setPage: 1,
      };

    case FILTER_BY_TEMPERAMENT:
      if (action.payload === "All") {
        return {
          ...state,
          requestDogs: state.dogsAll,
          setPage: 1,
        };
      } else {
        return {
          ...state,
          requestDogs: state.dogsAll.filter((po) => {
            let prueba = po.temperaments.some((a) => {
              return a.name === action.payload;
            });
            return prueba;
          }),
          setPage: 1,
        };
      }

    case GET_ORDER_DESC:
    case GET_ORDER_ASC:
      const ascDescFilter =
        action.payload === "Ascendente" || action.payload === "All"
          ? state.dogsAll.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              } else {
                return -1;
              }
            })
          : state.dogsAll.sort((a, b) => {
              if (a.name < b.name) {
                return 1;
              } else {
                return -1;
              }
            });
      return {
        ...state,
        requestDogs: [...ascDescFilter],
        setPage: 1,
      };

    case GET_WEIGH_LIGHTER:
    case GET_WEIGH_HIGHEST:
      const filtered = state.dogsAll.filter((i) => {
        return !i.weight.includes("NaN");
      });
      const orderWeigh =
        action.payload === "menor"
          ? filtered.sort((a, b) => {
              if (
                Number(
                  a.weight.split(" - ")[0] > Number(b.weight.split(" - ")[0])
                )
              ) {
                return 1;
              } else {
                return -1;
              }
            })
          : filtered.sort((a, b) => {
              if (
                Number(a.weight.split(" - ")[0]) <
                Number(b.weight.split(" - ")[0])
              ) {
                return 1;
              } else {
                return -1;
              }
            });
      return {
        ...state,
        requestDogs: [...orderWeigh],
        setPage: 1,
      };
    
      case GET_HEIGHT_LIGHTER:
        case GET_HEIGHT_HIGHEST:
          // const filtere = state.dogsAll.filter((i) => {
          //   return !i.Height.includes("NaN");
          // });
          const orderHeigh =
            action.payload === "mayor"
              ? state.dogsAll.sort((a, b) => {
                  if (
                    Number(
                      a.height.split(" - ")[0] > Number(b.height.split(" - ")[0])
                    )
                  ) {
                    return 1;
                  } else {
                    return -1;
                  }
                })
              : state.dogsAll.sort((a, b) => {
                  if (
                    Number(a.height.split(" - ")[0]) <
                    Number(b.height.split(" - ")[0])
                  ) {
                    return 1;
                  } else {
                    return -1;
                  }
                });
          return {
            ...state,
            requestDogs: [...orderHeigh],
            
          };
    default:
      return state;
  }
}
export default RootReducer;