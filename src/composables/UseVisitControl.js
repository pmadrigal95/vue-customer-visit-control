import useSupabase from "@/composables/UseSupabase";

import { baseDateHelper } from "@/helpers/baseDateHelper";

import { basePaginationHelper } from "@/helpers/basePaginationHelper";

import { visitControlMapper } from "@/infrastructure/mappers/visitControlMapper";

export default function UseVisitControl() {
  const { supabase } = useSupabase();

  /**
   * Count
   */
  const visitControlCount = async () => {
    const { count, error } = await supabase
      .from("visitControl")
      .select("id", { count: "exact", head: true });
    if (error) throw error;
    return count;
  };

  /**
   * Filter
   */
  const visitControlFilter = async ({ query: { page = 0, limit = 10 } }) => {
    const { from, to } = basePaginationHelper.$_getPagination(page, limit);

    const { data, count, error } = await supabase
      .from("visitControl")
      .select(
        "id, ProductsByCustomer (id, serialKey, customerId, nextMaintenance, Customer (id, name, email),  Products ( id, name, dynamicPercentage, Brand ( id, name ) )),visitDate, totalHours, chargingHours, pPsi, temperature, prp, engineStarts, loadRelay, loadPercentage, observations, notes, vsd020, vsd2040, vsd4060, vsd6080, vsd80100",
        { count: "exact" }
      )
      .order("visitDate", { ascending: false })
      .order("ProductsByCustomer(customerId)", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      props: {
        data: visitControlMapper.$_visitControlMapper({
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
  const visitControlSearch = async ({
    query: { customerName, initialDate, finalDate },
  }) => {
    const base = supabase
      .from("visitControl")
      .select(
        "id, ProductsByCustomer !inner (id, serialKey, customerId, nextMaintenance, Customer !inner (id, name, email),  Products ( id, name, dynamicPercentage, Brand ( id, name ) )),visitDate, totalHours, chargingHours, pPsi, temperature, prp, engineStarts, loadRelay, loadPercentage, observations, notes, vsd020, vsd2040, vsd4060, vsd6080, vsd80100",
        { count: "exact" }
      )
      .order("visitDate", { ascending: false })
      .order("ProductsByCustomer(customerId)", { ascending: false })
      .lt("visitDate", finalDate)
      .gt("visitDate", initialDate);

    const result = customerName
      ? base.filter(
          "ProductsByCustomer.Customer.name",
          "ilike",
          `%${customerName}%`
        )
      : base;

    const { data, count, error } = await result;

    if (error) throw error;

    return {
      props: {
        data: visitControlMapper.$_visitControlMapper({
          array: data,
        }),
        count: count,
      },
    };
  };

  /**
   * Dashboard
   */
  const visitControlDashboard = async () => {
    const { data, error } = await supabase
      .from("visitControl")
      .select(
        "id, ProductsByCustomer (id, serialKey, customerId, nextMaintenance, Customer (id, name, email),  Products ( id, name, dynamicPercentage, Brand ( id, name ) )),visitDate, totalHours, chargingHours, pPsi, temperature, prp, engineStarts, loadRelay, loadPercentage, observations, notes, vsd020, vsd2040, vsd4060, vsd6080, vsd80100",
        { count: "exact" }
      )
      .order("visitDate", { ascending: false })
      .order("ProductsByCustomer(customerId)", { ascending: false })
      .limit(5);

    if (error) throw error;

    return visitControlMapper.$_visitControlMapper({
      array: data,
    });
  };

  /**
   * Report Xlsx
   */
  const visitControlReport = async ({
    query: {
      initDate = baseDateHelper.$_getInitialDay(),
      endDate = baseDateHelper.$_getFinalDay(),
    },
  }) => {
    const { data, error } = await supabase
      .from("visitControl")
      .select(
        "id, ProductsByCustomer(id, serialKey, customerId, nextMaintenance, Customer (id, name, email),  Products ( id, name, dynamicPercentage, Brand ( id, name ) )),visitDate, totalHours, chargingHours, pPsi, temperature, prp, engineStarts, loadRelay, loadPercentage, observations, notes, vsd020, vsd2040, vsd4060, vsd6080, vsd80100",
        { count: "exact" }
      )
      .order("visitDate", { ascending: true })
      .order("ProductsByCustomer(customerId)", { ascending: true })
      .lt("visitDate", endDate)
      .gt("visitDate", initDate);

    if (error) throw error;

    return visitControlMapper.$_visitControlMapperReport({
      array: data,
    });
  };

  /**
   * Report Xlsx
   */
  const visitControlReportByCustomer = async ({
    query: { customerId, productId, initDate, endDate },
  }) => {
    const base = supabase
      .from("visitControl")
      .select(
        "id, ProductsByCustomer !inner(id, serialKey, customerId, nextMaintenance, Customer !inner(id, name, email),  Products ( id, name, dynamicPercentage, Brand ( id, name ) )),visitDate, totalHours, chargingHours, pPsi, temperature, prp, engineStarts, loadRelay, loadPercentage, observations, notes, vsd020, vsd2040, vsd4060, vsd6080, vsd80100",
        { count: "exact" }
      )
      .order("visitDate", { ascending: true })
      .order("ProductsByCustomer(customerId)", { ascending: true });

    let result = base;

    if (customerId) {
      result = result.eq("ProductsByCustomer.Customer.id", customerId);
    }

    if (productId) {
      result = result.eq("ProductsByCustomer.id", productId);
    }

    if (initDate && endDate) {
      result = result.lt("visitDate", endDate).gt("visitDate", initDate);
    }

    const { data, error } = await result;

    if (error) throw error;

    return visitControlMapper.$_visitControlMapperReport({
      array: data,
    });
  };

  /**
   * Delete
   */
  const visitControlDelete = async ({ id }) => {
    const { error } = await supabase.from("visitControl").delete().eq("id", id);

    if (error) throw error;
  };

  /**
   * GetById
   */
  const visitControlById = async ({ id }) => {
    const { data, error } = await supabase
      .from("visitControl")
      .select(
        "id, ProductsByCustomer (id, serialKey, nextMaintenance, Customer (id, name, email),  Products ( id, name, dynamicPercentage, Brand ( id, name ) )),visitDate, totalHours, chargingHours, pPsi, temperature, prp, engineStarts, loadRelay, loadPercentage, observations, notes, vsd020, vsd2040, vsd4060, vsd6080, vsd80100"
      )
      .eq("id", id);

    if (error) throw error;

    return visitControlMapper.$_visitControlMapper({
      array: data,
    })[0];
  };

  /**
   * Insert
   */
  const visitControlInsert = async ({
    productByCustomerId,
    visitDate,
    totalHours,
    chargingHours,
    pPsi,
    temperature,
    prp,
    engineStarts,
    observations,
    notes,
    loadRelay,
    loadPercentage,
    vsd020,
    vsd2040,
    vsd4060,
    vsd6080,
    vsd80100,
  }) => {
    const { data, error } = await supabase
      .from("visitControl")
      .insert({
        productByCustomerId,
        visitDate,
        totalHours,
        chargingHours,
        pPsi,
        temperature,
        prp,
        engineStarts,
        observations,
        notes,
        loadRelay,
        loadPercentage,
        vsd020,
        vsd2040,
        vsd4060,
        vsd6080,
        vsd80100,
      })
      .select();

    if (error) throw error;

    return data[0].id;
  };

  /**
   * Update
   */
  const visitControlUpdate = async ({
    id,
    productByCustomerId,
    visitDate,
    totalHours,
    chargingHours,
    pPsi,
    temperature,
    prp,
    engineStarts,
    observations,
    notes,
    loadRelay,
    loadPercentage,
    vsd020,
    vsd2040,
    vsd4060,
    vsd6080,
    vsd80100,
  }) => {
    const { error } = await supabase
      .from("visitControl")
      .update({
        productByCustomerId,
        visitDate,
        totalHours,
        chargingHours,
        pPsi,
        temperature,
        prp,
        engineStarts,
        observations,
        notes,
        loadRelay,
        loadPercentage,
        vsd020,
        vsd2040,
        vsd4060,
        vsd6080,
        vsd80100,
      })
      .eq("id", id);

    if (error) throw error;
  };

  return {
    visitControlCount,
    visitControlFilter,
    visitControlSearch,
    visitControlDashboard,
    visitControlDelete,
    visitControlReport,
    visitControlReportByCustomer,
    visitControlById,
    visitControlInsert,
    visitControlUpdate,
  };
}
