import useSupabase from "@/composables/UseSupabase";

import { basePaginationHelper } from "@/helpers/basePaginationHelper";

import { productMapper } from "@/infrastructure/mappers/productMapper";

import { selectMapper } from "@/infrastructure/mappers/selectMapper";

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
      .select("id, name, dynamicPercentage, description, Brand ( id, name )", { count: "exact" })
      .order("name", { ascending: true })
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
      .select("id, name, dynamicPercentage, description, Brand ( id, name )", { count: "exact" })
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
   * Select
   */
  const productSelect = async ({ brandId }) => {
    const { data, error } = await supabase
      .from("Products")
      .select("id, name", { count: "exact" })
      .order("name", { ascending: true })
      .eq("brandId", brandId);

    if (error) throw error;

    return selectMapper.$_selectMapper({
      array: data,
      value: "id",
      name: "name",
    });
  };

  /**
   * GetById
   */
  const getProductById = async ({ id }) => {
    const { data, error } = await supabase
      .from("Products")
      .select("id, name, description, brandId, dynamicPercentage")
      .eq("id", id);

    if (error) throw error;

    return data[0];
  };

  /**
   * Insert
   */
  const productInsert = async ({ name, description, brandId, dynamicPercentage }) => {
    const { error } = await supabase
      .from("Products")
      .insert({ name, description, brandId, dynamicPercentage });

    if (error) throw error;
  };

  /**
   * Update
   */
  const productUpdate = async ({ id, name, description, brandId, dynamicPercentage }) => {
    const { error } = await supabase
      .from("Products")
      .update({ name, description, brandId, dynamicPercentage })
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
  const productInsertOrUpdate = async ({ id, name, description, brandId, dynamicPercentage }) => {
    if (id) {
      customerUpdate({ id, name, description, brandId, dynamicPercentage });
    } else {
      customerInsert({ name, description, brandId, dynamicPercentage });
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
    productSelect,
  };
}
