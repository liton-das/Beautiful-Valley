import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const roomApi = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:`http://localhost:8080/`,credentials:'include'}),
    endpoints:(builder)=>({
        // login
        login:builder.mutation({
            query:(data)=>({
                url:'auth/v1/login',
                method:'POST',
                body:data
            })
        }),
        // get room lists
        getRooms:builder.query({
            query:(page=1, limit=10)=>({
                url:`blog/v1/get-room-lists?page=${page}&limit=${limit}`,
                method:'GET'
            })
        })     
    })
});


export const {useLoginMutation, useGetRoomsQuery} = roomApi