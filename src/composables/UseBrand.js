import useSupabase from "@/composables/UseSupabase";

import { basePaginationHelper } from "@/helpers/basePaginationHelper";

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
   * Search
   */
  const brandSearch = async ({ query: { name } }) => {
    const { data, count, error } = await supabase
      .from("Brand")
      .select("id, name, description", { count: "exact" })
      .order("name", { ascending: true })
      .ilike('name', `%${name}%`)

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
    const brandInsert = async ({ name , description }) => {
      const { error } = await supabase
      .from('Brand')
      .insert({ name , description })
  
      if (error) throw error;
    };




  return {
    brandCount,
    brandFilter,
    brandSearch,
    brandInsert,
  };
}
