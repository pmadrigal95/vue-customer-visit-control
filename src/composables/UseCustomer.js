import useSupabase from "@/composables/UseSupabase";

export default function UseCustomer() {
    const { supabase } = useSupabase();

    /**
   * Count
   */
    const customerCount = async () => {
        const { count, error } = await supabase
            .from('Customer')
            .select('id', { count: 'exact', head: true })
        if (error) throw error;
        return count;
    };


    return {
        customerCount
    };
}