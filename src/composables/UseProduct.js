import useSupabase from "@/composables/UseSupabase";

import { basePaginationHelper } from "@/helpers/basePaginationHelper";

import { productMapper } from "@/infrastructure/mappers/productMapper";

export default function UseProduct() {
  const { supabase } = useSupabase();

  /**
   * Count
   */
  const productCount = async () => {
    const { count, error } = await supabase
      .from("Products")
      .select("id", { count: "exact", head: true });
    if (error) throw error;
    return count;
  };

  /**
   * Filter
   */
  const productFilter = async ({ query: { page = 0, limit = 10 } }) => {
    const { from, to } = basePaginationHelper.$_getPagination(page, limit);

    const { data, count, error } = await supabase
      .from("Products")
      .select("id, name, description, Brand ( id, name )", { count: "exact" })
      .order("id", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      props: {
        data: productMapper.$_productMapper({ array: data }),
        count: count,
        page: +page,
      },
    };
  };

  /**
   * Search
   */
  const productSearch = async ({ query: { name } }) => {
    const { data, count, error } = await supabase
      .from("Products")
      .select("id, name, description, Brand ( id, name )", { count: "exact" })
      .order("name", { ascending: true })
      .ilike("name", `%${name}%`);

    if (error) throw error;

    return {
      props: {
        data: productMapper.$_productMapper({ array: data }),
        count: count,
      },
    };
  };

  /**
   * GetById
   */
  const getProductById = async ({ id }) => {
    const { data, error } = await supabase
      .from("Products")
      .select("id, name, description, brandId")
      .eq("id", id);

    if (error) throw error;

    return data[0];
  };

  /**
   * Insert
   */
  const productInsert = async ({ name, description, brandId }) => {
    const { data, error } = await supabase
      .from("Products")
      .insert({ name, description, brandId })
      .select();

    if (error) throw error;

    return data[0].id;
  };

  /**
   * Update
   */
  const productUpdate = async ({ id, name, description, brandId }) => {
    const { error } = await supabase
      .from("Products")
      .update({ name, description, brandId })
      .eq("id", id);

    if (error) throw error;
  };

  /**
   * Delete
   */
  const productDelete = async ({ id }) => {
    const { error } = await supabase.from("Products").delete().eq("id", id);

    if (error) throw error;
  };

  /**
   * Update or Insert
   */
  const productInsertOrUpdate = async ({ id, name, description, brandId }) => {
    if (id) {
      customerUpdate({ id, name, description, brandId });
    } else {
      customerInsert({ name, description, brandId });
    }
  };

  return {
    productCount,
    productFilter,
    productSearch,
    getProductById,
    productInsert,
    productUpdate,
    productDelete,
    productInsertOrUpdate,
  };
}
