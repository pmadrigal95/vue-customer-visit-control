import useSupabase from "@/composables/UseSupabase";

export default function UseVisitControl() {
    const { supabase } = useSupabase();

    /**
   * Count
   */
    const visitControlCount = async () => {
        const { count, error } = await supabase
            .from('visitControl')
            .select('id', { count: 'exact', head: true })
        if (error) throw error;
        return count;
    };


    return {
        visitControlCount
    };
}