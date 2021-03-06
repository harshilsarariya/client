import member from "./member";

export const fetchallcomplaints = async (pageNo, limit) => {
  try {
    const { data } = await member(
      `/complaint/fetchComplaints?pageNo=${pageNo}&limit=${limit}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const updateComplaint = async (complaintId, fromData) => {
  try {
    const { data } = await member.put(
      `/complaint/updatecomplaint/${complaintId}`,
      fromData
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getComplaint = async (cid) => {
  try {
    const { data } = await member(`/complaint/searchById/${cid}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const deleteComplaint = async (complaintId) => {
  try {
    const { data } = await member.delete(
      `/complaint/deletecomplaint/${complaintId}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const searchComplaint = async (query) => {
  try {
    const { data } = await member(`/post/search?title=${query}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
export const searchByState = async (query, month) => {
  try {
    const { data } = await member(
      `/complaint/searchByState?state=${query}&month=${month}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
export const searchByPhoneNo = async (query, month) => {
  try {
    const { data } = await member(
      `/complaint/searchByPhoneNo?mobileNo=${query}&month=${month}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
export const searchByCompany = async (query) => {
  try {
    const { data } = await member(
      `/complaint/searchByCompany?brandName=${query}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
export const search = async (query, month) => {
  try {
    const { data } = await member(
      `/complaint/search?query=${query}&month=${month}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const deleteMember = async (memberId) => {
  try {
    const { data } = await member.delete(`/auth/deleteMember/${memberId}`);

    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getMembers = async () => {
  try {
    const { data } = await fetch(`/auth/getmembers`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getMember = async (mid) => {
  try {
    const { data } = await member(`/auth/getmember/${mid}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getMemberByEmail = async (query) => {
  try {
    const { data } = await member(`/auth/getMemberByEmail?email=${query}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const updateMember = async (memberId, fromData) => {
  try {
    const { data } = await member.put(
      `/auth/updateMember/${memberId}`,
      fromData
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
