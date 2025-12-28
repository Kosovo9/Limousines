// RPC 1: top limousines
export async function getTopLimos(limit = 5) {
  const { data, error } = await supabase.rpc('top_limos', { lim: limit })
  if (error) throw error
  return data
}

// RPC 2: monthly revenue
export async function getMonthlyRevenue() {
  const { data, error } = await supabase.rpc('monthly_revenue')
  if (error) throw error
  return data
}

// RPC 3: driver ratings
export async function getDriverRatings(driverId) {
  const { data, error } = await supabase.rpc('driver_ratings', { did: driverId })
  if (error) throw error
  return data
}
