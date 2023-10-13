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
        "id, ProductsByCustomer (id, serialKey, Customer (id, name),  Products ( id, name, Brand ( id, name ) )),visitDate, totalHours, chargingHours, pPsi, temperature, prp, engineStarts, loadRelay, observations, notes",
        { count: "exact" }
      )
      .order("id", { ascending: false })
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
   * Dashboard
   */
  const visitControlDashboard = async () => {

    const { data, error } = await supabase
      .from("visitControl")
      .select(
        "id, ProductsByCustomer (id, serialKey, Customer (id, name),  Products ( id, name, Brand ( id, name ) )),visitDate, totalHours, chargingHours, pPsi, temperature, prp, engineStarts, loadRelay, observations, notes",
        { count: "exact" }
      )
      .order("id", { ascending: false })
      .limit(5);

    if (error) throw error;

    return visitControlMapper.$_visitControlMapper({
        array: data,
      });
  };


  /**
   * Report Xlsx
   */
  const visitControlReport = async ({ query: { initDate = baseDateHelper.$_getInitialDay(), endDate = baseDateHelper.$_getFinalDay(), } }) => {
    const { data, error } = await supabase
      .from("visitControl")
      .select(
        "id, ProductsByCustomer (id, serialKey, Customer (id, name),  Products ( id, name, Brand ( id, name ) )),visitDate, totalHours, chargingHours, pPsi, temperature, prp, engineStarts, loadRelay, observations, notes",
        { count: "exact" }
      )
      .order("visitDate", { ascending: false })
      .lt('visitDate', endDate)
      .gt('visitDate', initDate);

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

  return {
    visitControlCount,
    visitControlFilter,
    visitControlDashboard,
    visitControlDelete,
    visitControlReport,
  };
}
