import { create } from "zustand";
import type { Filters, GroupId } from "@/lib/catalog";

export type ViewMode = "hierarchy" | "landscape" | "matrix";

type UIState = {
  filters: Filters;
  setFilter: <K extends keyof Filters>(k: K, v: Filters[K]) => void;
  setGroup: (g: GroupId) => void;
  resetFilters: () => void;
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
  vehicleId: string | null;
  openVehicle: (id: string | null) => void;
  compare: string[];
  toggleCompare: (id: string) => void;
  compareDiffOnly: boolean;
  setCompareDiffOnly: (v: boolean) => void;
  collapsedArch: Record<string, boolean>;
  collapsedPlat: Record<string, boolean>;
  toggleArch: (id: string) => void;
  togglePlat: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
};

const emptyFilters: Filters = {
  q: "",
  brand: "",
  pt: "",
  arch: "",
  showPh: true,
  group: "geely",
};

export const useUI = create<UIState>((set) => ({
  filters: emptyFilters,
  setFilter: (k, v) => set((s) => ({ filters: { ...s.filters, [k]: v } })),
  setGroup: (g) =>
    set((s) => ({
      filters: { ...emptyFilters, group: g, q: s.filters.q, showPh: true },
      compare: [],
      collapsedArch: {},
      collapsedPlat: {},
    })),
  resetFilters: () =>
    set((s) => ({ filters: { ...emptyFilters, group: s.filters.group } })),
  viewMode: "hierarchy",
  setViewMode: (m) => set({ viewMode: m }),
  vehicleId: null,
  openVehicle: (id) => set({ vehicleId: id }),
  compare: [],
  toggleCompare: (id) =>
    set((s) => {
      if (s.compare.includes(id)) {
        return { compare: s.compare.filter((x) => x !== id) };
      }
      const next = [...s.compare, id];
      if (next.length > 4) next.shift();
      return { compare: next };
    }),
  compareDiffOnly: false,
  setCompareDiffOnly: (v) => set({ compareDiffOnly: v }),
  collapsedArch: {},
  collapsedPlat: {},
  toggleArch: (id) =>
    set((s) => ({
      collapsedArch: { ...s.collapsedArch, [id]: !s.collapsedArch[id] },
    })),
  togglePlat: (id) =>
    set((s) => ({
      collapsedPlat: { ...s.collapsedPlat, [id]: !s.collapsedPlat[id] },
    })),
  expandAll: () => set({ collapsedArch: {}, collapsedPlat: {} }),
  collapseAll: () => {
    /* filled by caller with ids */
  },
  searchOpen: false,
  setSearchOpen: (v) => set({ searchOpen: v }),
}));
