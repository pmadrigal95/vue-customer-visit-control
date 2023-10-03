import useSupabase from "@/composables/UseSupabase";

export default function UseProduct() {
    const { supabase } = useSupabase();

    /**
   * Count
   */
    const productCount = async () => {
        const { count, error } = await supabase
            .from('Products')
            .select('id', { count: 'exact', head: true })
        if (error) throw error;
        return count;
    };


    return {
        productCount
    };
}