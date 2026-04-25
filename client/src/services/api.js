import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const roomApi = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:`http://localhost:8080/auth/v1/`,credentials:'include'}),
    endpoints:(builder)=>({
        // get all room lists 
        getAllRoomLists: builder.query({
            query:()=>`get-single-user`
        })
    })
})

export const {useGetAllRoomListsQuery} = roomApi