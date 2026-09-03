import { useNavigate, useSearch } from "@tanstack/react-router";
import { parseGroup, type Filters, type GroupId } from "@/lib/catalog";
import { parseMarket, type MarketId } from "@/data/markets";
import { useUI } from "@/lib/store";

export type AppSearch = {
  g?: GroupId;
  v?: string;
  id?: string;
  vs?: string;
  m?: MarketId;
};

export function useAppSearch(): AppSearch {
  return useSearch({ strict: false }) as AppSearch;
}

export function useGroup(): GroupId {
  return parseGroup(useAppSearch().g);
}

export function useVehicleParam(): string | undefined {
  const { v } = useAppSearch();
  return v || undefined;
}

export function useMarket(): MarketId {
  return parseMarket(useAppSearch().m);
}

export function useSetMarket() {
  const navigate = useNavigate();
  return (m: MarketId) => {
    void navigate({
      search: (prev: AppSearch) => ({ ...prev, m: m === "CN" ? undefined : m }),
    } as never);
  };
}

/** URL `g` wins over the zustand singleton (SSR-safe, per-request). */
export function useFilters(): Filters {
  const filters = useUI((s) => s.filters);
  const group = useGroup();
  return filters.group === group ? filters : { ...filters, group };
}

export function useOpenVehicle() {
  const navigate = useNavigate();
  return (id: string | null) => {
    void navigate({
      search: (prev: AppSearch) => ({ ...prev, v: id || undefined }),
    } as never);
  };
}

export function groupSearch(prev: AppSearch, id: GroupId): AppSearch {
  return {
    ...prev,
    g: id === "geely" ? undefined : id,
    v: undefined,
  };
}
