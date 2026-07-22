import api from '@/api/axios';
import { CreateTechnicianRequest, User } from '@/types';

export const createTechnician = async(
    data: CreateTechnicianRequest
): Promise<User> =>{
    const response = await api.post(
        "user/create-technician",
        data
    );

    return response.data;

};

export const getTechnicians = async (): Promise<User[]> => {

  const response = await api.get(
    "/users/technicians"
  );

  return response.data;
};
