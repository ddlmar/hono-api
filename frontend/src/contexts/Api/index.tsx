import React, { useContext, createContext } from 'react'

import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

interface RequestConfig extends AxiosRequestConfig {
  method: Method
  url: string
}

type ApiRequest = <Type>(config: RequestConfig) => Promise<AxiosResponse<Type>>

interface ApiContextValues {
  request: ApiRequest
}

const ApiContext = createContext<ApiContextValues>({} as ApiContextValues)

interface ApiProviderProps {
  children: React.ReactNode
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: `application/json`,
    },
    withCredentials: true,
  })

  return (
    <ApiContext.Provider
      value={{
        request: axiosInstance.request,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApi = () => {
  const context = useContext(ApiContext)
  return context
}
