import useSupabase from "@/composables/UseSupabase";

export default function UseBrand() {
    const { supabase } = useSupabase();

    /**
   * Count
   */
    const brandCount = async () => {
        const { count, error } = await supabase
            .from('Brand')
            .select('id', { count: 'exact', head: true })
        if (error) throw error;
        return count;
    };


    return {
        brandCount
    };
}