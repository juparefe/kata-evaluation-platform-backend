import supabase from './SupaBaseClient';

export const Select = async (
    table: string,
    filters: Record<string, any> = {}
) => {
    const query = supabase.from(table).select("*");
    if (filters.email) query.eq("email", filters.email);

    const { data, error } = await query;

    if (error) {
        console.error("Error en Select:", error);
        return { error: true, message: error.message };
    }

    return data;
};

export const Insert = async (table: string, data: Record<string, any>) => {
    const { data: insertedData, error } = await supabase.from(table).insert([data]);

    if (error) {
        console.error("Error en Insert:", error);
        return { error: true, message: error.message };
    }

    return insertedData;
};

export const Update = async (table: string, data: Record<string, any>, filters: Record<string, any>) => {
    let query = supabase.from(table).update(data);

    for (const key in filters) {
        query = query.eq(key, filters[key]);
    }

    const { data: updatedData, error } = await query;

    if (error) {
        console.error("Error en Update:", error);
        return { error: true, message: error.message };
    }

    return updatedData;
};


export const Delete = async (table: string, filters: Record<string, any>) => {
    let query = supabase.from(table).delete();

    for (const key in filters) {
        query = query.eq(key, filters[key]);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error en Delete:", error);
        return { error: true, message: error.message };
    }

    return data;
};
