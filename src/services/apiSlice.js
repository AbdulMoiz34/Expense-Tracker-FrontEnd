import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../utils/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      try {
        const raw = localStorage.getItem("auth");
        const auth = raw ? JSON.parse(raw) : null;
        if (auth?.token) headers.set("authorization", `Bearer ${auth.token}`);
      } catch {}
      return headers;
    },
  }),
  tagTypes: ["Income", "Expense", "Auth"],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),

    // Income
    getIncomes: builder.query({
      query: () => ({ url: "/income" }),
      providesTags: (result = []) => [
        { type: "Income", id: "LIST" },
        ...result.map((x) => ({ type: "Income", id: x._id })),
      ],
    }),
    addIncome: builder.mutation({
      query: (payload) => ({ url: "/income", method: "POST", body: payload }),
      invalidatesTags: [{ type: "Income", id: "LIST" }],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({ url: `/income/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Income", id }, { type: "Income", id: "LIST" }],
    }),

    // Expense
    getExpenses: builder.query({
      query: () => ({ url: "/expenses" }),
      providesTags: (result = []) => [
        { type: "Expense", id: "LIST" },
        ...result.map((x) => ({ type: "Expense", id: x._id })),
      ],
    }),
    addExpense: builder.mutation({
      query: (payload) => ({ url: "/expenses", method: "POST", body: payload }),
      invalidatesTags: [{ type: "Expense", id: "LIST" }],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({ url: `/expenses/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Expense", id }, { type: "Expense", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetIncomesQuery,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
} = apiSlice;


