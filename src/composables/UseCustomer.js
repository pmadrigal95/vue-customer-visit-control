import useSupabase from "@/composables/UseSupabase";

import { basePaginationHelper } from "@/helpers/basePaginationHelper";

export default function UseCustomer() {
  const { supabase } = useSupabase();

  /**
   * Count
   */
  const customerCount = async () => {
    const { count, error } = await supabase
      .from("Customer")
      .select("id", { count: "exact", head: true });
    if (error) throw error;
    return count;
  };

  /**
   * Filter
   */
  const customerFilter = async ({ query: { page = 0, limit = 10 } }) => {
    const { from, to } = basePaginationHelper.$_getPagination(page, limit);

    const { data, count, error } = await supabase
      .from("Customer")
      .select("id, name, address, phone, email, description", { count: "exact" })
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
   * Filter All
   */
    const customerFilterAll = async () => {
      const { data, count, error } = await supabase
        .from("Customer")
        .select("id, name, address, phone, email, description", { count: "exact" })
        .order("name", { ascending: true });
  
      if (error) throw error;
  
      return {
        props: {
          data: data,
          count: count,
        },
      };
    };

  /**
   * Search
   */
  const customerSearch = async ({ query: { name } }) => {
    const { data, count, error } = await supabase
      .from("Customer")
      .select("id, name, address, phone, email, description", { count: "exact" })
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
   * GetById
   */
  const getCustomerById = async ({ id }) => {
    const { data, error } = await supabase
      .from("Customer")
      .select("id, name, address, phone, email, description")
      .eq("id", id);

    if (error) throw error;

    return data[0];
  };

  /**
   * Insert
   */
  const customerInsert = async ({ name, address, phone, email, description }) => {
    const { data, error } = await supabase
      .from("Customer")
      .insert({ name, address, phone, email, description })
      .select();

    if (error) throw error;

    return data[0].id;
  };

  /**
   * Update
   */
  const customerUpdate = async ({ id, name, address, phone, email, description }) => {
    const { error } = await supabase
      .from("Customer")
      .update({ name, address, phone, email, description })
      .eq("id", id);

    if (error) throw error;
  };

  /**
   * Delete
   */
  const customerDelete = async ({ id }) => {
    const { error } = await supabase.from("Customer").delete().eq("id", id);

    if (error) throw error;
  };

  /**
   * Update or Insert
   */
  const customerInsertOrUpdate = async ({
    id,
    name,
    address,
    phone,
    description,
  }) => {
    if (id) {
      customerUpdate({ id, name, address, phone, description });
    } else {
      customerInsert({ name, address, phone, description });
    }
  };

  return {
    customerCount,
    customerFilter,
    customerFilterAll,
    customerSearch,
    getCustomerById,
    customerInsert,
    customerUpdate,
    customerDelete,
    customerInsertOrUpdate,
  };
}
