import useSupabase from "@/composables/UseSupabase";

import { basePaginationHelper } from "@/helpers/basePaginationHelper";

import { productsByCustomerMapper } from "@/infrastructure/mappers/productsByCustomerMapper";

export default function UseProductsByCustomer() {
  const { supabase } = useSupabase();

  /**
   * Filter
   */
  const productsByCustomerFilter = async ({
    query: { page = 0, limit = 10 },
  }) => {
    const { from, to } = basePaginationHelper.$_getPagination(page, limit);

    const { data, count, error } = await supabase
      .from("ProductsByCustomer")
      .select(
        "id, serialKey, description, isBorrowed, Customer (id, name),  Products ( id, name, Brand ( id, name ) )",
        { count: "exact" }
      )
      .order("id", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      props: {
        data: productsByCustomerMapper.$_productsByCustomerMapper({
          array: data,
        }),
        count: count,
        page: +page,
      },
    };
  };

  /**
   * Search
   */
  const productsByCustomerSearch = async ({
    query: { page = 0, limit = 10, customerId },
  }) => {
    const { from, to } = basePaginationHelper.$_getPagination(page, limit);

    const { data, count, error } = await supabase
      .from("ProductsByCustomer")
      .select(
        "id, serialKey, description, isBorrowed, Customer (id, name),  Products ( id, name, Brand ( id, name ) )",
        { count: "exact" }
      )
      .eq("customerId", customerId)
      .order("id", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      props: {
        data: productsByCustomerMapper.$_productsByCustomerMapper({
          array: data,
        }),
        count: count,
        page: +page,
      },
    };
  };

    /**
   * GetById
   */
    const getProductsByCustomerById = async ({ id }) => {
      const { data, error } = await supabase
        .from("ProductsByCustomer")
        .select("id, serialKey, description, isBorrowed, Customer (id, name),  Products ( id, name, Brand ( id, name ) )")
        .eq("id", id);
  
      if (error) throw error;
  
      return productsByCustomerMapper.$_productsByCustomerMapper({
        array: data,
      })[0];
    };

  /**
   * Insert
   */
  const productsByCustomerInsert = async ({ customerId, productId, serialKey, description, isBorrowed }) => {
    const { error } = await supabase
      .from("ProductsByCustomer")
      .insert({ customerId, productId, serialKey, description, isBorrowed });

    if (error) throw error;
  };


  /**
   * Update
   */
  const productsByCustomerUpdate = async ({ id, customerId, productId, serialKey, description, isBorrowed }) => {
    const { error } = await supabase
      .from("ProductsByCustomer")
      .update({ customerId, productId, serialKey, description, isBorrowed })
      .eq("id", id);

    if (error) throw error;
  };


  /**
   * Delete
   */
  const productsByCustomerDelete = async ({ id }) => {
    const { error } = await supabase.from("ProductsByCustomer").delete().eq("id", id);

    if (error) throw error;
  };

  return {
    productsByCustomerFilter,
    productsByCustomerSearch,
    getProductsByCustomerById,
    productsByCustomerInsert,
    productsByCustomerUpdate,
    productsByCustomerDelete,
  };
}
