import useSupabase from "@/composables/UseSupabase";

import { selectMapper } from "@/infrastructure/mappers/selectMapper";

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
        "id, serialKey, description, isBorrowed, nextMaintenance, Customer (id, name),  Products ( id, name, dynamicPercentage, Brand ( id, name ) )",
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
        "id, serialKey, description, isBorrowed, nextMaintenance, Customer (id, name),  Products ( id, name, dynamicPercentage, Brand ( id, name ) )",
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
   * Select
   */
    const productsByCustomerSelect = async ({customerId}) => {
      const { data, error } = await supabase
      .from("ProductsByCustomer")
      .select(
        "id, serialKey, description, isBorrowed, Customer (id, name),  Products( id, name, Brand ( id, name ) )",
        { count: "exact" }
      )
      .eq("customerId", customerId)
      .order("id", { ascending: false });
  
      if (error) throw error;
  
      return selectMapper.$_selectMapper({
        array: productsByCustomerMapper.$_productsByCustomerMapper({
          array: data,
        }),
        value: "id",
        name: "productName",
      });
    };

    /**
   * GetById
   */
    const getProductsByCustomerById = async ({ id }) => {
      const { data, error } = await supabase
        .from("ProductsByCustomer")
        .select("id, serialKey, description, isBorrowed, nextMaintenance, Customer (id, name),  Products ( id, name, dynamicPercentage, Brand ( id, name ) )")
        .eq("id", id);
  
      if (error) throw error;
  
      return productsByCustomerMapper.$_productsByCustomerMapper({
        array: data,
      })[0];
    };

  /**
   * Insert
   */
  const productsByCustomerInsert = async ({ customerId, productId, serialKey, description, isBorrowed, nextMaintenance }) => {
    const { error } = await supabase
      .from("ProductsByCustomer")
      .insert({ customerId, productId, serialKey, description, isBorrowed, nextMaintenance });

    if (error) throw error;
  };


  /**
   * Update
   */
  const productsByCustomerUpdate = async ({ id, customerId, productId, serialKey, description, isBorrowed, nextMaintenance }) => {
    const { error } = await supabase
      .from("ProductsByCustomer")
      .update({ customerId, productId, serialKey, description, isBorrowed, nextMaintenance })
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
    productsByCustomerSelect,
    getProductsByCustomerById,
    productsByCustomerInsert,
    productsByCustomerUpdate,
    productsByCustomerDelete,
  };
}
