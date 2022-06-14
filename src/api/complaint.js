import member from "./member";

export const fetchallcomplaints = async (pageNo, limit) => {
  try {
    const { data } = await member(
      `/complaint/fetchComplaints?pageNo=${pageNo}&limit=${limit}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    console.log(response);
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
