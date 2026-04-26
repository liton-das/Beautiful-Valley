import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const roomApi = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:`http://localhost:8080/auth/v1/`,credentials:'include'}),
    endpoints:(builder)=>({
        // login
        login:builder.mutation({
            query:(data)=>({
                url:'login',
                method:'POST',
                body:data
            })
        })
    })
});

export const {useLoginMutation} = roomApi