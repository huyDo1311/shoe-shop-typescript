import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, http, settings, USER_LOGIN } from '../../util/config';
import { UserLoginModel } from '../../pages/Login/Login';


/* userProfile */

export interface UserProfile {
    ordersHistory: OrdersHistory[];
    email:         string;
    name:          string;
    password:      null;
    gender:        boolean;
    phone:         string;
    facebookId:    string;
    deleted:       boolean;
    avatar:        string;
    image:         string;
}



export interface OrdersHistory {
    orderDetail: OrderDetail[];
    id:          number;
    date:        Date;
    status:      null;
    email:       string;
    alias:       string;
}

export interface OrderDetail {
    name:             string;
    alias:            string;
    shortDescription: string;
    quantity:         number;
    price:            number;
    image:            string;
    description:      string;
}

/* userLogin */
export interface UserLoginResult {
    email:string,
    accessToken:string
}

export interface UserState {
    userLogin: UserLoginResult,
    userProfile: UserProfile | null

}


const initialState:UserState = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null,
  
    userProfile: null
}

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginAsyncApi.fulfilled, (state:UserState,action:PayloadAction<UserLoginResult>) => {
        state.userLogin = action.payload;
        settings.setStorageJson(USER_LOGIN,action.payload.email);
        settings.setCookieJson(USER_LOGIN,action.payload.email,30);
        settings.setStorageJson(ACCESS_TOKEN,action.payload.accessToken);
        settings.setCookieJson(ACCESS_TOKEN,action.payload.accessToken,30);
    });
  }
});

export const {} = UserReducer.actions

export default UserReducer.reducer

export const loginAsyncApi = createAsyncThunk('userReducer/loginAsyncApi',
    async (userLogin:UserLoginModel):Promise<UserLoginResult> => {
        const response = await http.post(`/api/Users/signin`,userLogin);
        return response.data.content;

    }
)

export const getProfileAsyncApi = createAsyncThunk('userReducer/getProfileAsyncApi',
    async () => {
        
    }
)

