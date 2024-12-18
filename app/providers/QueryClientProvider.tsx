import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function QueryProvider({ children }: any) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
