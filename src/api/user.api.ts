import IUser from "@/interfaces/DTO/IUser";
import { axios } from "./base";
import { ResponseType } from "./type/ResponseType";

export const whoAmI = async (): Promise<ResponseType<IUser>> => {
  return axios({
    url: "user/whoAmI",
    method: "get",
    withCredentials: true,
  });
};
