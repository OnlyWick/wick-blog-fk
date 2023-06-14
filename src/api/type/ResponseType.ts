import Response from "@/interfaces/Response";
import { AxiosResponse } from "axios";

export type ResponseType<T> = AxiosResponse<Response<T>>;
