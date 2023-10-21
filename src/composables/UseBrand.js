import useSupabase from "@/composables/UseSupabase";

import { basePaginationHelper } from "@/helpers/basePaginationHelper";

import { selectMapper } from "@/infrastructure/mappers/selectMapper";

export default function UseBrand() {
  const { supabase } = useSupabase();

  /**
   * Count
   */
  const brandCount = async () => {
    const { count, error } = await supabase
      .from("Brand")
      .select("id", { count: "exact", head: true });
    if (error) throw error;
    return count;
  };

  /**
   * Filter
   */
  const brandFilter = async ({ query: { page = 0, limit = 10 } }) => {
    const { from, to } = basePaginationHelper.$_getPagination(page, limit);

    const { data, count, error } = await supabase
      .from("Brand")
      .select("id, name, description", { count: "exact" })
      .order("name", { ascending: true })
      .range(from, to);

    if (error) throw error;

    return {
      props: {
        data: data,
        count: count,
        page: +page,
      },
    };
  };

  /**
   * Select
   */
  const brandSelect = async () => {
    const { data, error } = await supabase
      .from("Brand")
      .select("id, name", { count: "exact" })
      .order("name", { ascending: true });

    if (error) throw error;

    return selectMapper.$_selectMapper({
      array: data,
      value: "id",
      name: "name",
    });
  };

  /**
   * Search
   */
  const brandSearch = async ({ query: { name } }) => {
    const { data, count, error } = await supabase
      .from("Brand")
      .select("id, name, description", { count: "exact" })
      .order("name", { ascending: true })
      .ilike("name", `%${name}%`);

    if (error) throw error;

    return {
      props: {
        data: data,
        count: count,
      },
    };
  };

  /**
   * Insert
   */
  const brandInsert = async ({ name, description }) => {
    const { error } = await supabase
      .from("Brand")
      .insert({ name, description });

    if (error) throw error;
  };

  /**
   * GetById
   */
  const getBrandById = async ({ id }) => {
    const { data, error } = await supabase
      .from("Brand")
      .select("id, name, description")
      .eq("id", id);

    if (error) throw error;

    return data[0];
  };

  /**
   * Update
   */
  const brandUpdate = async ({ id, name, description }) => {
    const { error } = await supabase
      .from("Brand")
      .update({ name: name, description: description })
      .eq("id", id);

    if (error) throw error;
  };

  /**
   * Delete
   */
  const brandDelete = async ({ id }) => {
    const { error } = await supabase.from("Brand").delete().eq("id", id);

    if (error) throw error;
  };

  return {
    brandCount,
    brandFilter,
    brandSearch,
    brandInsert,
    getBrandById,
    brandUpdate,
    brandDelete,
    brandSelect,
  };
}
